-- Phase 3: guest prepaid checkout, atomic inventory lifecycle, and Stripe event idempotency.

ALTER TABLE public.orders ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE public.stock_reservations ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE public.orders ADD COLUMN stripe_checkout_session_id TEXT UNIQUE;

CREATE TABLE public.stripe_webhook_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- Reserves one warehouse's available stock for every order variant or fails as a unit.
CREATE OR REPLACE FUNCTION public.reserve_order_inventory(p_order_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  item RECORD;
  level RECORD;
  order_customer UUID;
BEGIN
  SELECT customer_id INTO order_customer FROM public.orders WHERE id = p_order_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'order_not_found'; END IF;
  IF EXISTS (SELECT 1 FROM public.stock_reservations WHERE order_id = p_order_id AND status = 'active') THEN RETURN; END IF;

  FOR item IN
    SELECT variant_id, SUM(quantity)::INTEGER AS quantity
    FROM public.order_items WHERE order_id = p_order_id GROUP BY variant_id ORDER BY variant_id
  LOOP
    IF item.variant_id IS NULL THEN RAISE EXCEPTION 'order_item_missing_variant'; END IF;
    SELECT * INTO level FROM public.inventory_levels
    WHERE variant_id = item.variant_id AND quantity_on_hand - quantity_reserved >= item.quantity
    ORDER BY warehouse_id FOR UPDATE LIMIT 1;
    IF NOT FOUND THEN RAISE EXCEPTION 'insufficient_inventory for variant %', item.variant_id; END IF;
    UPDATE public.inventory_levels SET quantity_reserved = quantity_reserved + item.quantity
    WHERE warehouse_id = level.warehouse_id AND variant_id = item.variant_id;
    INSERT INTO public.stock_reservations (customer_id, warehouse_id, variant_id, order_id, quantity, expires_at)
    VALUES (order_customer, level.warehouse_id, item.variant_id, p_order_id, item.quantity, NOW() + INTERVAL '30 minutes');
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.release_order_reservations(p_order_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE reservation RECORD;
BEGIN
  FOR reservation IN SELECT * FROM public.stock_reservations WHERE order_id = p_order_id AND status = 'active' FOR UPDATE LOOP
    UPDATE public.inventory_levels SET quantity_reserved = quantity_reserved - reservation.quantity
    WHERE warehouse_id = reservation.warehouse_id AND variant_id = reservation.variant_id;
    UPDATE public.stock_reservations SET status = 'released', released_at = NOW() WHERE id = reservation.id;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.fulfill_order_reservations(p_order_id UUID, p_amount INTEGER, p_payment_id TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE reservation RECORD;
  expected_amount INTEGER;
BEGIN
  SELECT grand_total INTO expected_amount FROM public.orders WHERE id = p_order_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'order_not_found'; END IF;
  IF expected_amount <> p_amount THEN RAISE EXCEPTION 'payment_amount_mismatch'; END IF;

  FOR reservation IN SELECT * FROM public.stock_reservations WHERE order_id = p_order_id AND status = 'active' FOR UPDATE LOOP
    UPDATE public.inventory_levels SET
      quantity_on_hand = quantity_on_hand - reservation.quantity,
      quantity_reserved = quantity_reserved - reservation.quantity
    WHERE warehouse_id = reservation.warehouse_id AND variant_id = reservation.variant_id;
    UPDATE public.stock_reservations SET status = 'fulfilled' WHERE id = reservation.id;
  END LOOP;
  UPDATE public.orders SET status = 'confirmed', placed_at = COALESCE(placed_at, NOW()) WHERE id = p_order_id;
  UPDATE public.payments SET status = 'paid', provider_payment_id = p_payment_id, collected_at = COALESCE(collected_at, NOW())
  WHERE order_id = p_order_id AND method = 'stripe' AND status <> 'paid';
END;
$$;

-- Stores the event ID and applies its effect in the same transaction.
CREATE OR REPLACE FUNCTION public.apply_stripe_order_event(
  p_event_id TEXT, p_event_type TEXT, p_order_id UUID, p_amount INTEGER DEFAULT NULL, p_payment_id TEXT DEFAULT NULL
) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.stripe_webhook_events (id, event_type, order_id)
  VALUES (p_event_id, p_event_type, p_order_id) ON CONFLICT (id) DO NOTHING;
  IF NOT FOUND THEN RETURN FALSE; END IF;

  IF p_event_type = 'checkout.session.completed' THEN
    PERFORM public.fulfill_order_reservations(p_order_id, p_amount, p_payment_id);
  ELSIF p_event_type IN ('checkout.session.expired', 'payment_intent.payment_failed') THEN
    PERFORM public.release_order_reservations(p_order_id);
    UPDATE public.orders SET status = 'cancelled', cancelled_at = COALESCE(cancelled_at, NOW())
    WHERE id = p_order_id AND status = 'pending_payment';
    UPDATE public.payments SET status = CASE WHEN p_event_type = 'checkout.session.expired' THEN 'cancelled'::public.payment_status ELSE 'failed'::public.payment_status END
    WHERE order_id = p_order_id AND status <> 'paid';
  ELSIF p_event_type = 'charge.refunded' THEN
    UPDATE public.orders SET status = 'refunded' WHERE id = p_order_id;
    UPDATE public.payments SET status = 'refunded' WHERE order_id = p_order_id AND status = 'paid';
  END IF;
  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.reserve_order_inventory(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.release_order_reservations(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_order_reservations(UUID, INTEGER, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.apply_stripe_order_event(TEXT, TEXT, UUID, INTEGER, TEXT) FROM PUBLIC;

-- Phase 4: account order actions, admin order operations, and audit trail.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS requested_action public.order_status;

-- Return requests capture the customer's reason and are resolved by admin.
CREATE TABLE IF NOT EXISTS public.return_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(profile_id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'requested',
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;

-- Audit log for admin mutations and privileged commerce events.
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customers select own return requests"
  ON public.return_requests FOR SELECT TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "customers insert own return requests"
  ON public.return_requests FOR INSERT TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "admins manage return requests"
  ON public.return_requests FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins read audit log"
  ON public.admin_audit_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admins can read/update every operational row.
CREATE POLICY "admins manage orders"
  ON public.orders FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins manage shipments"
  ON public.shipments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins manage payments"
  ON public.payments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Set the customer_id on return requests automatically from the auth context.
CREATE OR REPLACE FUNCTION public.ensure_return_request_customer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.customer_id IS DISTINCT FROM auth.uid() THEN
    NEW.customer_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER return_requests_ensure_customer
  BEFORE INSERT ON public.return_requests
  FOR EACH ROW EXECUTE FUNCTION public.ensure_return_request_customer();

-- Safely adjusts on-hand inventory (used when a return is accepted).
CREATE OR REPLACE FUNCTION public.adjust_inventory_on_hand(p_warehouse_id UUID, p_variant_id UUID, p_delta INTEGER)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.inventory_levels
  SET quantity_on_hand = GREATEST(0, quantity_on_hand + p_delta), updated_at = NOW()
  WHERE warehouse_id = p_warehouse_id AND variant_id = p_variant_id;
END;
$$;

REVOKE ALL ON FUNCTION public.adjust_inventory_on_hand(UUID, UUID, INTEGER) FROM PUBLIC;

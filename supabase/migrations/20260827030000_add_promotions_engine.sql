-- Phase 5: server-side promotion eligibility and Stripe coupon reuse.

ALTER TABLE public.promotions
  ADD COLUMN IF NOT EXISTS applies_to_category TEXT,
  ADD COLUMN IF NOT EXISTS first_order_only BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS stripe_coupon_id TEXT;

-- Counts redemptions so usage caps can be evaluated without a separate counter column.
CREATE OR REPLACE FUNCTION public.promotion_redemption_count(p_promotion_id UUID)
RETURNS INTEGER LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COUNT(*)::INTEGER FROM public.promotion_redemptions WHERE promotion_id = p_promotion_id;
$$;

CREATE OR REPLACE FUNCTION public.promotion_redemption_count_for_customer(p_promotion_id UUID, p_customer_id UUID)
RETURNS INTEGER LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COUNT(*)::INTEGER FROM public.promotion_redemptions WHERE promotion_id = p_promotion_id AND customer_id = p_customer_id;
$$;

REVOKE ALL ON FUNCTION public.promotion_redemption_count(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.promotion_redemption_count_for_customer(UUID, UUID) FROM PUBLIC;

-- Seed the legacy codes as real, enforceable promotions.
INSERT INTO public.promotions (code, type, value, minimum_order_amount, applies_to_category, is_active)
VALUES
  ('WELCOME10', 'percentage', 10, 0, NULL, TRUE),
  ('GLOW15', 'percentage', 15, 200000, NULL, TRUE),
  ('RITUAL20', 'percentage', 20, 400000, 'Gift Sets', TRUE)
ON CONFLICT (code) DO UPDATE SET
  type = EXCLUDED.type,
  value = EXCLUDED.value,
  minimum_order_amount = EXCLUDED.minimum_order_amount,
  applies_to_category = EXCLUDED.applies_to_category,
  is_active = EXCLUDED.is_active;

-- Link a promotion to the order that used it, and allow guest redemptions.
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS promotion_code TEXT;
ALTER TABLE public.promotion_redemptions ALTER COLUMN customer_id DROP NOT NULL;

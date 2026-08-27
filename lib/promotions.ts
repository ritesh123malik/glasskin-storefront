import "server-only";

import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type PromoLine = { variantId: string; quantity: number };

type Promotion = {
  id: string;
  code: string;
  type: "percentage" | "fixed_amount" | "free_shipping";
  value: number;
  minimum_order_amount: number;
  applies_to_category: string | null;
  first_order_only: boolean;
  usage_limit: number | null;
  stripe_coupon_id: string | null;
  starts_at: string | null;
  ends_at: string | null;
};

export type PromoEvaluation =
  | { valid: true; discountAmount: number; promotion: Promotion }
  | { valid: false; message: string };

/**
 * Validates a promotion server-side against the authoritative catalog and
 * order context. Never trust client-provided discount amounts.
 */
export async function evaluatePromo(
  code: string,
  lines: PromoLine[],
  subtotal: number,
  customerId?: string | null
): Promise<PromoEvaluation> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: promotion } = await supabaseAdmin
    .from("promotions")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .eq("is_active", true)
    .maybeSingle();

  if (!promotion) return { valid: false, message: "Invalid promo code." };
  const promo = promotion as unknown as Promotion;

  const now = Date.now();
  if (promo.starts_at && new Date(promo.starts_at).getTime() > now) {
    return { valid: false, message: "This promo is not active yet." };
  }
  if (promo.ends_at && new Date(promo.ends_at).getTime() < now) {
    return { valid: false, message: "This promo has expired." };
  }
  if (promo.minimum_order_amount && subtotal < promo.minimum_order_amount) {
    return { valid: false, message: `Promo requires a minimum order of ₹${(promo.minimum_order_amount / 100).toLocaleString("en-IN")}.` };
  }

  if (promo.usage_limit != null) {
    const { data: count } = await supabaseAdmin.rpc("promotion_redemption_count", { p_promotion_id: promo.id });
    if (typeof count === "number" && count >= promo.usage_limit) {
      return { valid: false, message: "This promo code has reached its usage limit." };
    }
  }

  if (promo.first_order_only && customerId) {
    const { count } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("customer_id", customerId)
      .in("status", ["confirmed", "processing", "shipped", "delivered", "refunded"]);
    if (count && count > 0) return { valid: false, message: "This promo is for first-time orders only." };
  }

  if (promo.applies_to_category) {
    const ids = lines.map((line) => line.variantId);
    const { data: variants } = await supabaseAdmin
      .from("product_variants")
      .select("product_id")
      .in("id", ids);
    const { data: products } = await supabaseAdmin
      .from("products")
      .select("category")
      .in("id", (variants ?? []).map((v) => v.product_id));
    const matches = (products ?? []).some((p) => p.category === promo.applies_to_category);
    if (!matches) {
      return { valid: false, message: `This promo applies to ${promo.applies_to_category} only.` };
    }
  }

  let discountAmount = 0;
  if (promo.type === "percentage") discountAmount = Math.floor((subtotal * promo.value) / 100);
  else if (promo.type === "fixed_amount") discountAmount = Math.min(promo.value, subtotal);
  else if (promo.type === "free_shipping") discountAmount = 0; // shipping discount applied at checkout build

  if (discountAmount <= 0 && promo.type !== "free_shipping") {
    return { valid: false, message: "This promo does not apply to your cart." };
  }

  return { valid: true, discountAmount, promotion: promo };
}

/** Returns a cached Stripe coupon id for the promotion, creating it once. */
export async function getStripeCouponId(promotion: Promotion): Promise<string> {
  if (promotion.stripe_coupon_id) return promotion.stripe_coupon_id;
  const stripe = getStripe();
  const couponParams: Stripe.CouponCreateParams = {
    duration: "once",
    name: promotion.code,
    metadata: { promotion_id: promotion.id },
  };
  if (promotion.type === "percentage") couponParams.percent_off = promotion.value;
  else if (promotion.type === "fixed_amount") couponParams.amount_off = promotion.value;
  else return ""; // free_shipping uses checkout shipping options, no Stripe coupon

  const coupon = await stripe.coupons.create(couponParams);
  await getSupabaseAdmin()
    .from("promotions")
    .update({ stripe_coupon_id: coupon.id })
    .eq("id", promotion.id);
  return coupon.id;
}

/** Records a redemption only after the order is paid. */
export async function recordRedemption(orderId: string, code: string, amount: number, customerId?: string | null) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: promotion } = await supabaseAdmin.from("promotions").select("id").eq("code", code).maybeSingle();
  if (!promotion) return;
  await supabaseAdmin.from("promotion_redemptions").insert({
    promotion_id: promotion.id,
    customer_id: customerId ?? null,
    order_id: orderId,
    amount,
  });
}

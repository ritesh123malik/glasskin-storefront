import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { evaluatePromo, getStripeCouponId } from "@/lib/promotions";
import { attachStripeSession, cancelPendingOrder, createPendingStripeOrder } from "@/lib/orders";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";

const checkoutSchema = z.object({
  items: z.array(z.object({ variantId: z.string().uuid(), quantity: z.number().int().min(1).max(20) })).min(1).max(20),
  promoCode: z.string().trim().max(64).optional(),
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (siteUrl && !/^https?:\/\//.test(siteUrl)) throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL.");

export async function POST(req: NextRequest) {
  let orderId: string | undefined;
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`checkout:${clientIp}`, 10, 60_000)) {
      return NextResponse.json({ error: "Too many checkout attempts. Please try again shortly." }, { status: 429 });
    }
    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
    if (!siteUrl) return NextResponse.json({ error: "Checkout is not configured." }, { status: 503 });

    const lines = Array.from(
      parsed.data.items.reduce((map, item) => map.set(item.variantId, (map.get(item.variantId) ?? 0) + item.quantity), new Map<string, number>())
    ).map(([variantId, quantity]) => ({ variantId, quantity }));
    if (lines.some((line) => line.quantity > 20)) return NextResponse.json({ error: "Invalid item quantity." }, { status: 400 });

    const pending = await createPendingStripeOrder(lines, 0);
    orderId = pending.order.id;

    let discountTotal = 0;
    let couponId: string | undefined;
    let promotionCode: string | undefined;

    if (parsed.data.promoCode) {
      const evaluation = await evaluatePromo(parsed.data.promoCode, lines, pending.subtotal);
      if (!evaluation.valid) {
        await cancelPendingOrder(pending.order.id);
        orderId = undefined;
        return NextResponse.json({ error: evaluation.message }, { status: 400 });
      }
      discountTotal = evaluation.discountAmount;
      promotionCode = evaluation.promotion.code;
      couponId = await getStripeCouponId(evaluation.promotion);
      if (discountTotal > 0) {
        await cancelPendingOrder(pending.order.id);
        const discounted = await createPendingStripeOrder(lines, discountTotal);
        orderId = discounted.order.id;
        return await createSession(discounted, couponId, siteUrl, promotionCode);
      }
    }

    return await createSession(pending, couponId, siteUrl, promotionCode);
  } catch (error) {
    if (orderId) await cancelPendingOrder(orderId);
    const message = error instanceof Error ? error.message : "Could not start checkout.";
    const bad = message.includes("available") || message.includes("Promo") || message.includes("minimum");
    return NextResponse.json({ error: message }, { status: bad ? 400 : 500 });
  }
}

async function createSession(
  order: Awaited<ReturnType<typeof createPendingStripeOrder>>,
  couponId: string | undefined,
  baseUrl: string,
  promotionCode?: string
) {
  const orderId = order.order.id;
  if (promotionCode) {
    await getSupabaseAdmin().from("orders").update({ promotion_code: promotionCode }).eq("id", orderId);
  }
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "upi", "netbanking"],
    mode: "payment",
    line_items: order.variants.map((variant) => {
      const quantity = order.lines.find((line) => line.variantId === variant.id)!.quantity;
      return {
        price_data: {
          currency: variant.currency.toLowerCase(),
          product_data: {
            name: `${variant.products[0]?.name ?? "Product"} - ${variant.title}`,
            images: variant.products[0]?.image ? [variant.products[0].image] : [],
          },
          unit_amount: variant.price,
        },
        quantity,
      };
    }),
    shipping_address_collection: { allowed_countries: ["IN"] },
    phone_number_collection: { enabled: true },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: order.shipping, currency: order.currency.toLowerCase() },
          display_name: order.shipping ? "Standard Shipping" : "Complimentary Express Shipping",
        },
      },
    ],
    discounts: couponId ? [{ coupon: couponId }] : undefined,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    metadata: { order_id: orderId, promotion_code: promotionCode ?? "" },
    payment_intent_data: { metadata: { order_id: orderId, promotion_code: promotionCode ?? "" } },
  });
  await attachStripeSession(orderId, session.id);
  return NextResponse.json({ sessionId: session.id, url: session.url });
}

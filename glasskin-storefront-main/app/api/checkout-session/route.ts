import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductsFromSupabase } from "@/lib/supabase";
import { lookupPromo } from "@/lib/promos";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartLineItem {
  productId: string;
  quantity: number;
}

interface CheckoutBody {
  items: CartLineItem[];
  promoCode?: string;
  shippingName?: string;
}

const FREE_SHIPPING_THRESHOLD_PAISE = 99900; // ₹999 in paise
const SHIPPING_PAISE = 9900; // ₹99 flat

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, promoCode } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ── 1. Validate every item against server-side product catalog ─────────────
    // IMPORTANT: Never trust prices from the client. We look up the price
    // from our server-side product data source (lib/products.ts here;
    // replace with a DB query in production).
    const lineItems: {
      price_data: {
        currency: string;
        product_data: { name: string; images: string[]; description: string };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    let subtotalPaise = 0;
    const products = await getProductsFromSupabase();

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${item.productId}` },
          { status: 400 }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `${product.name} is currently sold out` },
          { status: 400 }
        );
      }

      if (item.quantity < 1 || item.quantity > 20) {
        return NextResponse.json(
          { error: `Invalid quantity for ${product.name}` },
          { status: 400 }
        );
      }

      const unitAmountPaise = product.price * 100; // INR → paise
      subtotalPaise += unitAmountPaise * item.quantity;

      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
            description: product.description,
          },
          unit_amount: unitAmountPaise,
        },
        quantity: item.quantity,
      });
    }

    // ── 2. Validate promo code server-side ─────────────────────────────────────
    let discounts: { coupon: string }[] = [];

    if (promoCode) {
      const promo = lookupPromo(promoCode);
      if (!promo) {
        return NextResponse.json(
          { error: "Invalid promo code" },
          { status: 400 }
        );
      }
      if (promo.minSubtotal && subtotalPaise < promo.minSubtotal) {
        const minINR = (promo.minSubtotal / 100).toLocaleString("en-IN");
        return NextResponse.json(
          { error: `Promo requires a minimum order of ₹${minINR}` },
          { status: 400 }
        );
      }

      // Create a one-time Stripe coupon for this session
      const coupon = await getStripe().coupons.create({
        percent_off: promo.percentOff,
        duration: "once",
        name: promo.description,
      });
      discounts = [{ coupon: coupon.id }];
    }

    // ── 3. Shipping line item ─────────────────────────────────────────────────
    const isFreeShipping = subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE;
    const shippingOptions = isFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 0, currency: "inr" },
              display_name: "Complimentary Express Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 3 },
                maximum: { unit: "business_day" as const, value: 5 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: SHIPPING_PAISE, currency: "inr" },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 4 },
                maximum: { unit: "business_day" as const, value: 7 },
              },
            },
          },
        ];

    // ── 4. Create Stripe Checkout Session ─────────────────────────────────────
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      discounts: discounts.length > 0 ? discounts : undefined,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: shippingOptions,
      phone_number_collection: { enabled: true },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        promo_code: promoCode ?? "",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("[checkout-session]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

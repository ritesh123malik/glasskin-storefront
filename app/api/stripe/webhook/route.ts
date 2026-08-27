import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendOrderConfirmation } from "@/lib/email";
import { recordRedemption } from "@/lib/promotions";

function orderId(metadata: Stripe.Metadata | null | undefined) {
  return metadata?.order_id && /^[0-9a-f-]{36}$/i.test(metadata.order_id) ? metadata.order_id : null;
}

async function apply(event: Stripe.Event, id: string, amount?: number | null, paymentId?: string | null) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.rpc("apply_stripe_order_event", { p_event_id: event.id, p_event_type: event.type, p_order_id: id, p_amount: amount ?? null, p_payment_id: paymentId ?? null });
  if (error) throw new Error(error.message);
  return Boolean(data);
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  let event: Stripe.Event;
  try { event = getStripe().webhooks.constructEvent(await request.text(), signature, secret); }
  catch { return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 }); }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const id = orderId(session.metadata);
      if (!id || session.payment_status !== "paid" || session.amount_total === null) throw new Error("Invalid completed checkout session.");
      await supabaseAdmin.from("orders").update({ customer_email: session.customer_details?.email ?? "checkout@unknown.invalid", customer_phone: session.customer_details?.phone ?? null, shipping_address: session.customer_details?.address ?? {} }).eq("id", id).eq("stripe_checkout_session_id", session.id);
      const applied = await apply(event, id, session.amount_total, typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id);
      if (applied && session.customer_details?.email) {
        const { data: order } = await supabaseAdmin.from("orders").select("order_number, promotion_code, discount_total, customer_id").eq("id", id).single();
        if (order) {
          await sendOrderConfirmation(session.customer_details.email, order.order_number);
          if (order.promotion_code) {
            await recordRedemption(id, order.promotion_code, order.discount_total ?? 0, order.customer_id ?? null);
          }
        }
      }
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session; const id = orderId(session.metadata); if (id) await apply(event, id);
    } else if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object as Stripe.PaymentIntent; const id = orderId(intent.metadata); if (id) await apply(event, id);
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const intent = charge.payment_intent ? await getStripe().paymentIntents.retrieve(typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent.id) : null;
      const id = orderId(intent?.metadata); if (id) await apply(event, id);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[stripe-webhook]", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}

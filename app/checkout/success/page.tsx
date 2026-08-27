import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { orderForStripeSession, getOrderConfirmation } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: { session_id?: string; order?: string } }) {
  let title = "We are confirming your payment";
  let subtitle = "This usually takes a few moments. Refresh this page shortly; do not place the order again.";
  let orderNumber: string | null = null;
  let badge = "Payment Confirmation";

  if (searchParams.order) {
    const order = await getOrderConfirmation(searchParams.order);
    if (order) {
      orderNumber = order.order_number;
      const confirmed = order.status !== "pending_payment";
      badge = "Order Placed";
      title = order.payment_method === "cash_on_delivery" ? "Cash on Delivery order placed" : "Thank you for your order";
      subtitle =
        order.payment_method === "cash_on_delivery"
          ? "Please keep the exact amount ready at delivery. Our courier partner will collect payment on arrival."
          : confirmed
            ? "Your order is being prepared with care. A confirmation email is on its way."
            : "We are confirming your payment. Refresh shortly; do not place the order again.";
    }
  } else if (searchParams.session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(searchParams.session_id);
      if (session.metadata?.order_id) {
        const order = await orderForStripeSession(session.id);
        if (order) {
          orderNumber = order.order_number;
          const confirmed = order.status === "confirmed" || order.status === "processing" || order.status === "shipped" || order.status === "delivered";
          badge = confirmed ? "Order Confirmed" : "Payment Confirmation";
          title = confirmed ? "Thank you for your order" : "We are confirming your payment";
          subtitle = confirmed
            ? "Your order is being prepared with care. A confirmation email is on its way."
            : "This usually takes a few moments. Refresh this page shortly; do not place the order again.";
        }
      }
    } catch { /* Do not expose an order based on an arbitrary query string. */ }
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center px-6 py-32">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-8">
          <Clock3 size={38} className="text-brand-accent" />
        </div>
        <span className="sticker bg-brand-mint text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">{badge}</span>
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mb-4">{title}</h1>
        <p className="text-sm text-brand-text/60 leading-relaxed mb-3">{subtitle}</p>
        {orderNumber && (
          <p className="text-[10px] text-brand-text/45 uppercase tracking-widest mb-10">
            Order <span className="font-mono">#{orderNumber}</span>
          </p>
        )}
        <Link href="/shop" className="btn-play-solid bg-brand-accent px-8 py-3.5 text-[11px]">
          <span>Continue Shopping</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

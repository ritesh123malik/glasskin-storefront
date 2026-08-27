import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? "";

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-32">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={38} className="text-brand-accent stroke-[1.25]" />
        </div>

        {/* Heading */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
          Order Confirmed
        </span>
        <h1 className="font-serif text-4xl font-light tracking-wide mb-4">
          Thank you for your order
        </h1>
        <p className="text-sm text-brand-text/60 leading-relaxed mb-3">
          Your Ritual Bag is on its way to being packed with care. You&apos;ll receive a
          confirmation email shortly.
        </p>

        {/* Order reference */}
        {sessionId && (
          <p className="text-[10px] text-brand-text/35 uppercase tracking-widest mb-10">
            Reference:{" "}
            <span className="font-mono text-brand-text/50">
              {sessionId.slice(-12).toUpperCase()}
            </span>
          </p>
        )}

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-brand-accent text-brand-bg hover:bg-brand-secondary px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            Continue Shopping
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-brand-text/15 text-brand-text hover:border-brand-text px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-sm transition-all duration-300"
          >
            <Package size={14} />
            Track Order
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-brand-text/5 pt-8 text-[11px] text-brand-text/40 leading-relaxed">
          <p>Need help? Email us at <strong className="text-brand-accent">care@glassskin.com</strong></p>
          <p className="mt-1">© 2026 GLASSSKIN · Radiance, Ritualized.</p>
        </div>
      </div>
    </div>
  );
}

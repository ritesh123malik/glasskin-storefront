import React from "react";
import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-32">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-text/5 flex items-center justify-center mx-auto mb-8">
          <XCircle size={38} className="text-brand-text/30 stroke-[1.25]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text/40 font-semibold block mb-4">
          Payment Cancelled
        </span>
        <h1 className="font-serif text-4xl font-light tracking-wide mb-4">
          No worries — your bag is saved
        </h1>
        <p className="text-sm text-brand-text/60 leading-relaxed mb-10">
          Your items are still in your bag. Return whenever you&apos;re ready to complete
          your ritual.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-brand-accent text-brand-bg hover:bg-brand-secondary px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <ShoppingBag size={14} />
            Return to Bag
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-brand-text/15 text-brand-text hover:border-brand-text px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-sm transition-all duration-300 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}

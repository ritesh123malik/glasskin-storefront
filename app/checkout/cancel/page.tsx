import React from "react";
import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-32 overflow-hidden">
      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-brand-yellow/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-brand-pink/25 blur-3xl" />
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-yellow border-[3px] border-brand-text flex items-center justify-center mx-auto mb-8 shadow-btn">
          <XCircle size={36} className="text-brand-text/60" strokeWidth={1.5} />
        </div>

        <span className="sticker bg-brand-yellow text-brand-text -rotate-2 mb-5 inline-flex shadow-btn">
          Payment Cancelled
        </span>

        <h1 className="heading-section text-brand-text mt-3 mb-4"
            style={{ fontSize: "var(--type-h2)" }}>
          No worries —{" "}
          <span className="text-brand-accent">your bag is saved</span>
        </h1>

        <p className="font-rounded text-sm md:text-base text-brand-text/55 font-medium leading-relaxed mb-10 max-w-sm mx-auto">
          Your items are still in your bag. Return whenever you&apos;re ready
          to complete your ritual.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cart"
            className="btn-play bg-brand-accent text-white text-[0.7rem] px-8 py-4"
          >
            <ShoppingBag size={15} />
            Return to Bag
          </Link>
          <Link
            href="/shop"
            className="btn-play bg-white text-brand-text border-brand-text text-[0.7rem] px-8 py-4"
          >
            <ArrowLeft size={14} />
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}

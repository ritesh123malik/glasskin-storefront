import React from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export const dynamic = "force-static";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-32" id="main-content">

        <div className="bg-brand-pink/25 border-b-[3px] border-brand-text/10 py-14 md:py-18 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-magenta/70 block mb-3">
              Last updated: 27 Aug 2026
            </span>
            <span className="sticker bg-brand-pink text-brand-text -rotate-1 mb-4 inline-flex shadow-btn">
              Legal
            </span>
            <h1 className="heading-section text-brand-text mt-3"
                style={{ fontSize: "var(--type-h2)" }}>
              Refund &amp; Cancellation Policy
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 mt-12 space-y-6">
          <p className="font-rounded text-base text-brand-text/65 leading-relaxed">
            At GLASSSKIN we want you to be happy with every purchase.
            If something isn&apos;t right, here&apos;s how we handle refunds and cancellations.
          </p>

          {[
            {
              title: "1. Cancellations",
              bg: "bg-brand-yellow/15",
              content: [
                `You may cancel an order before it is dispatched. To cancel, visit your account order page or email <a href="mailto:care@glassskin.in" class="text-brand-blue underline hover:text-brand-accent">care@glassskin.in</a>. Cancelled prepaid orders are refunded in full within 5–7 business days to the original payment method.`,
                "Cash on Delivery orders may be cancelled before dispatch; the courier will not collect payment if the order is already cancelled.",
              ],
            },
            {
              title: "2. Returns Eligibility",
              bg: "bg-brand-mint/15",
              content: [
                "We accept returns within <strong>30 days</strong> of delivery if:<br/>• The product is sealed and unused.<br/>• The product arrived damaged, defective, or incorrect.<br/>• You received the wrong item.",
                "Opened or used skincare products cannot be returned for hygiene reasons unless they are defective or cause an adverse reaction.",
              ],
            },
            {
              title: "3. Adverse Reactions",
              bg: "bg-brand-sky/15",
              content: [
                `If you experience an adverse reaction, stop use immediately and contact us at <a href="mailto:care@glassskin.in" class="text-brand-blue underline hover:text-brand-accent">care@glassskin.in</a> with your order number and a description of symptoms. We may request photos or a medical consultation letter. Eligible cases receive a full refund or replacement.`,
              ],
            },
            {
              title: "4. Refund Process",
              bg: "bg-brand-lilac/20",
              content: [
                "Once a return is approved, refunds are processed within 5–7 business days to the original payment method. For COD orders, refunds are made via bank transfer; you will be asked to provide account details.",
              ],
            },
            {
              title: "5. Damaged in Transit",
              bg: "bg-brand-pink/15",
              content: [
                "If your order arrives damaged, contact us within 48 hours with photos of the damage. We will arrange a replacement or full refund at no extra cost.",
              ],
            },
            {
              title: "6. Non-Refundable Items",
              bg: "bg-brand-yellow/15",
              content: [
                "Gift cards and promotional bundles sold at a discount are not eligible for partial refunds. Free gifts must be returned with the main item to receive a full refund.",
              ],
            },
            {
              title: "7. Contact",
              bg: "bg-brand-mint/15",
              content: [
                `For refund or return requests, email <a href="mailto:care@glassskin.in" class="text-brand-blue underline hover:text-brand-accent">care@glassskin.in</a> with your order number. Our team responds within 24 hours on business days.`,
              ],
            },
          ].map(({ title, bg, content }) => (
            <div
              key={title}
              className={`${bg} rounded-2xl border-[3px] border-brand-text/10 p-6 md:p-8`}
            >
              <h2 className="font-display text-lg uppercase text-brand-text mb-3">{title}</h2>
              {content.map((para, i) => (
                <p
                  key={i}
                  className="font-rounded text-sm text-brand-text/65 leading-relaxed mb-2 last:mb-0"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          ))}

          <div className="pt-4 flex flex-wrap gap-3">
            <Link href="/legal/privacy" className="btn-play bg-brand-sky text-brand-text text-[0.65rem] px-6 py-3">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="btn-play bg-brand-yellow text-brand-text text-[0.65rem] px-6 py-3">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

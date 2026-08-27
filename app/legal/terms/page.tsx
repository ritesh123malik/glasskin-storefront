import React from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export const dynamic = "force-static";

const sections = [
  {
    title: "1. Products & Orders",
    bg: "bg-brand-yellow/15",
    text: "All product images are representative. Actual packaging, texture, or shade may differ slightly. We reserve the right to limit order quantities and to refuse or cancel orders that appear reseller-driven.",
  },
  {
    title: "2. Pricing & Taxes",
    bg: "bg-brand-sky/15",
    text: "All prices are in Indian Rupees and inclusive of applicable GST unless explicitly stated. Prices may change without prior notice, but confirmed orders are honoured at the price displayed at checkout.",
  },
  {
    title: "3. Payments",
    bg: "bg-brand-mint/15",
    text: "Prepaid orders are processed securely via Stripe. Cash on Delivery is offered at courier discretion in select pin codes and may require OTP verification at delivery.",
  },
  {
    title: "4. Shipping & Delivery",
    bg: "bg-brand-pink/15",
    text: "Estimated delivery timelines begin from the date of dispatch, not order placement. Delays caused by force majeure, courier issues, or incomplete addresses are beyond our control. Free standard shipping is offered on prepaid orders above ₹999.",
  },
  {
    title: "5. Returns, Cancellations & Refunds",
    bg: "bg-brand-lilac/20",
    text: `Please refer to our separate <a href="/legal/refund-policy" class="text-brand-blue underline hover:text-brand-accent">Refund & Cancellation Policy</a> for details on eligibility, process, and timelines.`,
    html: true,
  },
  {
    title: "6. Intellectual Property",
    bg: "bg-brand-yellow/15",
    text: "All content on this site — text, images, logos, layouts, and code — is owned by or licensed to GLASSSKIN. Reproduction without prior written consent is prohibited.",
  },
  {
    title: "7. Limitation of Liability",
    bg: "bg-brand-sky/15",
    text: "To the maximum extent permitted by law, GLASSSKIN shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability does not exceed the amount paid for the product in question.",
  },
  {
    title: "8. Governing Law",
    bg: "bg-brand-mint/15",
    text: "These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of courts in New Delhi, India.",
  },
  {
    title: "9. Contact",
    bg: "bg-brand-pink/15",
    text: `For questions about these terms, email <a href="mailto:legal@glassskin.in" class="text-brand-blue underline hover:text-brand-accent">legal@glassskin.in</a> or write to: GLASSSKIN Skincare LLP, New Delhi 110001, India.`,
    html: true,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-32" id="main-content">

        <div className="bg-brand-yellow/25 border-b-[3px] border-brand-text/10 py-14 md:py-18 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-accent/70 block mb-3">
              Last updated: 27 Aug 2026
            </span>
            <span className="sticker bg-brand-yellow text-brand-text -rotate-1 mb-4 inline-flex shadow-btn">
              Legal
            </span>
            <h1 className="heading-section text-brand-text mt-3"
                style={{ fontSize: "var(--type-h2)" }}>
              Terms of Service
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 mt-12 space-y-6">
          <p className="font-rounded text-base text-brand-text/65 leading-relaxed">
            GLASSSKIN (the "Brand", "we", "us") provides this website and related services.
            By accessing or purchasing through this site you agree to the following terms.
          </p>

          {sections.map(({ title, bg, text, html }) => (
            <div
              key={title}
              className={`${bg} rounded-2xl border-[3px] border-brand-text/10 p-6 md:p-8`}
            >
              <h2 className="font-display text-lg uppercase text-brand-text mb-3">{title}</h2>
              {html ? (
                <p
                  className="font-rounded text-sm text-brand-text/65 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : (
                <p className="font-rounded text-sm text-brand-text/65 leading-relaxed">{text}</p>
              )}
            </div>
          ))}

          <div className="pt-4 flex flex-wrap gap-3">
            <Link href="/legal/privacy" className="btn-play bg-brand-sky text-brand-text text-[0.65rem] px-6 py-3">
              Privacy Policy
            </Link>
            <Link href="/legal/refund-policy" className="btn-play bg-brand-pink text-brand-text text-[0.65rem] px-6 py-3">
              Refund Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

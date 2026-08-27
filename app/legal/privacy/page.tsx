import React from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-32" id="main-content">

        {/* Hero band */}
        <div className="bg-brand-sky/20 border-b-[3px] border-brand-text/10 py-14 md:py-18 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-blue/70 block mb-3">
              Last updated: 27 Aug 2026
            </span>
            <span className="sticker bg-brand-sky text-brand-text -rotate-1 mb-4 inline-flex shadow-btn">
              Legal
            </span>
            <h1 className="heading-section text-brand-text mt-3"
                style={{ fontSize: "var(--type-h2)" }}>
              Privacy Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 mt-12 space-y-8">

          <p className="font-rounded text-base text-brand-text/70 leading-relaxed">
            GLASSSKIN ("we", "us") is committed to protecting your privacy. This policy describes
            how we collect, use, and share personal information when you visit our website or place an order.
          </p>

          {[
            {
              title: "1. Information We Collect",
              bg: "bg-brand-sky/15",
              content: [
                "<strong>Account & checkout data:</strong> name, email, phone number, shipping address, and order history — collected when you create an account, checkout, or contact support.",
                "<strong>Payment data:</strong> Card details are processed entirely by Stripe and never stored on our servers. COD orders collect no payment data until delivery.",
                "<strong>Technical data:</strong> IP address, browser type, and page interaction data, collected via cookies for site functionality and analytics.",
              ],
            },
            {
              title: "2. How We Use Your Information",
              bg: "bg-brand-mint/15",
              content: [
                "To fulfil orders, send transactional emails (order confirmation, shipping updates), respond to support requests, improve our website, and (with your consent) send marketing communications.",
              ],
            },
            {
              title: "3. Sharing Your Information",
              bg: "bg-brand-pink/15",
              content: [
                "We share data only with service providers necessary to operate: Stripe (payments), Supabase (hosting/database), Resend (transactional email), and our courier partners (shipping). We do not sell or rent personal data.",
              ],
            },
            {
              title: "4. Cookies",
              bg: "bg-brand-yellow/20",
              content: [
                "We use essential cookies to keep your cart and session functional. Optional analytics cookies help us understand site usage. You may decline analytics cookies at any time via the cookie banner.",
              ],
            },
            {
              title: "5. Data Retention",
              bg: "bg-brand-lilac/20",
              content: [
                "Account data is retained while your account is active. Order records are retained for at least 7 years to comply with Indian tax and legal requirements. You may request deletion of non-essential data by emailing privacy@glassskin.in.",
              ],
            },
            {
              title: "6. Your Rights",
              bg: "bg-brand-sky/15",
              content: [
                "You may access, correct, or request deletion of your personal data at any time by contacting us. You may also opt out of marketing emails via the unsubscribe link.",
              ],
            },
            {
              title: "7. Security",
              bg: "bg-brand-mint/15",
              content: [
                "We implement reasonable administrative and technical safeguards. However, no method of transmission over the Internet is 100% secure.",
              ],
            },
            {
              title: "8. Contact",
              bg: "bg-brand-pink/15",
              content: [
                "For privacy-related requests, email <a href=\"mailto:privacy@glassskin.in\" class=\"text-brand-blue underline hover:text-brand-accent\">privacy@glassskin.in</a> or write to: GLASSSKIN Skincare LLP, New Delhi 110001, India.",
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
            <Link href="/legal/terms" className="btn-play bg-brand-yellow text-brand-text text-[0.65rem] px-6 py-3">
              Terms of Service
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

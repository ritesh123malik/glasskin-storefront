"use client";

import { LegalLayout, LegalSection } from "../LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout
      kicker="Read before you shop"
      kickerColor="bg-brand-sky"
      title="Terms of"
      titleAccent="Service"
      subtitle="The small print that keeps everything fair for both of us — buying, pricing, and using this site."
    >
      <LegalSection title="1. Products & Orders">
        <p>All product images are representative. Actual packaging, texture, or shade may differ slightly. We reserve the right to limit order quantities and to refuse or cancel orders that appear reseller-driven.</p>
      </LegalSection>

      <LegalSection title="2. Pricing & Taxes">
        <p>All prices are in Indian Rupees and inclusive of applicable GST unless explicitly stated. Prices may change without prior notice, but confirmed orders are honoured at the price displayed at checkout.</p>
      </LegalSection>

      <LegalSection title="3. Payments">
        <p>Prepaid orders are processed securely via Stripe. Cash on Delivery is offered at courier discretion in select pin codes and may require OTP verification at delivery.</p>
      </LegalSection>

      <LegalSection title="4. Shipping & Delivery">
        <p>Estimated delivery timelines begin from the date of dispatch, not order placement. Delays caused by force majeure, courier issues, or incomplete addresses are beyond our control. Free standard shipping is offered on prepaid orders above ₹999.</p>
      </LegalSection>

      <LegalSection title="5. Returns, Cancellations & Refunds">
        <p>Please refer to our separate <a href="/legal/refund-policy" className="underline hover:text-brand-accent">Refund &amp; Cancellation Policy</a> for details on eligibility, process, and timelines.</p>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>All content on this site — text, images, logos, layouts, and code — is owned by or licensed to GLASSSKIN. Reproduction without prior written consent is prohibited.</p>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <p>To the maximum extent permitted by law, GLASSSKIN shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability does not exceed the amount paid for the product in question.</p>
      </LegalSection>

      <LegalSection title="8. Governing Law">
        <p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of courts in New Delhi, India.</p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>For questions about these terms, email <a href="mailto:legal@glasskin.in" className="underline hover:text-brand-accent">legal@glasskin.in</a> or write to: GLASSSKIN Skincare LLP, [Registered Address], New Delhi 110001, India.</p>
      </LegalSection>
    </LegalLayout>
  );
}

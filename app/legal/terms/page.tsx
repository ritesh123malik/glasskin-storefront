export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-sm text-brand-text/70 leading-relaxed space-y-6">
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold">Last updated: 27 Aug 2026</span>
      <h1 className="font-serif text-3xl text-brand-text">Terms of Service</h1>
      <p>GLASSSKIN (the “Brand”, “we”, “us”) provides this website and related services. By accessing or purchasing through this site you agree to the following terms.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">1. Products &amp; Orders</h2>
      <p>All product images are representative. Actual packaging, texture, or shade may differ slightly. We reserve the right to limit order quantities and to refuse or cancel orders that appear reseller-driven.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">2. Pricing &amp; Taxes</h2>
      <p>All prices are in Indian Rupees and inclusive of applicable GST unless explicitly stated. Prices may change without prior notice, but confirmed orders are honoured at the price displayed at checkout.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">3. Payments</h2>
      <p>Prepaid orders are processed securely via Stripe. Cash on Delivery is offered at courier discretion in select pin codes and may require OTP verification at delivery.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">4. Shipping &amp; Delivery</h2>
      <p>Estimated delivery timelines begin from the date of dispatch, not order placement. Delays caused by force majeure, courier issues, or incomplete addresses are beyond our control. Free standard shipping is offered on prepaid orders above ₹999.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">5. Returns, Cancellations &amp; Refunds</h2>
      <p>Please refer to our separate <a href="/legal/refund-policy" className="underline hover:text-brand-accent">Refund &amp; Cancellation Policy</a> for details on eligibility, process, and timelines.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">6. Intellectual Property</h2>
      <p>All content on this site — text, images, logos, layouts, and code — is owned by or licensed to GLASSSKIN. Reproduction without prior written consent is prohibited.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, GLASSSKIN shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability does not exceed the amount paid for the product in question.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">8. Governing Law</h2>
      <p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of courts in New Delhi, India.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">9. Contact</h2>
      <p>For questions about these terms, email <a href="mailto:legal@glasskin.in" className="underline hover:text-brand-accent">legal@glasskin.in</a> or write to: GLASSSKIN Skincare LLP, [Registered Address], New Delhi 110001, India.</p>
    </main>
  );
}

export const dynamic = "force-static";

export default function RefundPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-sm text-brand-text/70 leading-relaxed space-y-6">
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold">Last updated: 27 Aug 2026</span>
      <h1 className="font-serif text-3xl text-brand-text">Refund &amp; Cancellation Policy</h1>
      <p>At GLASSSKIN we want you to be happy with every purchase. If something isn’t right, here’s how we handle refunds and cancellations.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">1. Cancellations</h2>
      <p>You may cancel an order before it is dispatched. To cancel, visit your account order page or email <a href="mailto:support@glasskin.in" className="underline hover:text-brand-accent">support@glasskin.in</a>. Cancelled prepaid orders are refunded in full within 5–7 business days to the original payment method.</p>
      <p>Cash on Delivery orders may be cancelled before dispatch; the courier will not collect payment if the order is already cancelled.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">2. Returns Eligibility</h2>
      <p>We accept returns within <strong>30 days</strong> of delivery if:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The product is sealed and unused.</li>
        <li>The product arrived damaged, defective, or incorrect.</li>
        <li>You received the wrong item.</li>
      </ul>
      <p>Opened or used skincare products cannot be returned for hygiene reasons unless they are defective or cause an adverse reaction.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">3. Adverse Reactions</h2>
      <p>If you experience an adverse reaction, stop use immediately and contact us at <a href="mailto:support@glasskin.in" className="underline hover:text-brand-accent">support@glasskin.in</a> with your order number and a description of symptoms. We may request photos or a medical consultation letter. Eligible cases receive a full refund or replacement.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">4. Refund Process</h2>
      <p>Once a return is approved, refunds are processed within 5–7 business days to the original payment method. For COD orders, refunds are made via bank transfer; you will be asked to provide account details.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">5. Damaged in Transit</h2>
      <p>If your order arrives damaged, contact us within 48 hours with photos of the damage. We will arrange a replacement or full refund at no extra cost.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">6. Non-Refundable Items</h2>
      <p>Gift cards and promotional bundles sold at a discount are not eligible for partial refunds. Free gifts must be returned with the main item to receive a full refund.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">7. Contact</h2>
      <p>For refund or return requests, email <a href="mailto:support@glasskin.in" className="underline hover:text-brand-accent">support@glasskin.in</a> with your order number. Our team responds within 24 hours on business days.</p>
    </main>
  );
}

export const dynamic = "force-static";

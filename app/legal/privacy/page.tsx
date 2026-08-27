export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-sm text-brand-text/70 leading-relaxed space-y-6">
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold">Last updated: 27 Aug 2026</span>
      <h1 className="font-serif text-3xl text-brand-text">Privacy Policy</h1>
      <p>GLASSSKIN (“we”, “us”) is committed to protecting your privacy. This policy describes how we collect, use, and share personal information when you visit our website or place an order.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">1. Information We Collect</h2>
      <p><strong>Account &amp; checkout data:</strong> name, email, phone number, shipping address, and order history — collected when you create an account, checkout, or contact support.</p>
      <p><strong>Payment data:</strong> Card details are processed entirely by Stripe and never stored on our servers. COD orders collect no payment data until delivery.</p>
      <p><strong>Technical data:</strong> IP address, browser type, and page interaction data, collected via cookies for site functionality and analytics.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">2. How We Use Your Information</h2>
      <p>To fulfil orders, send transactional emails (order confirmation, shipping updates), respond to support requests, improve our website, and (with your consent) send marketing communications.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">3. Sharing Your Information</h2>
      <p>We share data only with service providers necessary to operate: Stripe (payments), Supabase (hosting/database), Resend (transactional email), and our courier partners (shipping). We do not sell or rent personal data.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">4. Cookies</h2>
      <p>We use essential cookies to keep your cart and session functional. Optional analytics cookies help us understand site usage. You may decline analytics cookies at any time via the cookie banner.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">5. Data Retention</h2>
      <p>Account data is retained while your account is active. Order records are retained for at least 7 years to comply with Indian tax and legal requirements. You may request deletion of non-essential data by emailing <a href="mailto:privacy@glasskin.in" className="underline hover:text-brand-accent">privacy@glasskin.in</a>.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">6. Your Rights</h2>
      <p>You may access, correct, or request deletion of your personal data at any time by contacting us. You may also opt out of marketing emails via the unsubscribe link.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">7. Security</h2>
      <p>We implement reasonable administrative and technical safeguards. However, no method of transmission over the Internet is 100% secure.</p>

      <h2 className="font-serif text-xl text-brand-text pt-4">8. Contact</h2>
      <p>For privacy-related requests, email <a href="mailto:privacy@glasskin.in" className="underline hover:text-brand-accent">privacy@glasskin.in</a> or write to: GLASSSKIN Skincare LLP, [Registered Address], New Delhi 110001, India.</p>
    </main>
  );
}

export const dynamic = "force-static";

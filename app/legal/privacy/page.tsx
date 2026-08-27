"use client";

import { LegalLayout, LegalSection } from "../LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout
      kicker="Your data, our promise"
      kickerColor="bg-brand-magenta"
      title="Privacy"
      titleAccent="Policy"
      subtitle="How we collect, use, and protect your personal information when you visit or shop with us."
    >
      <LegalSection title="1. Information We Collect">
        <p><strong>Account &amp; checkout data:</strong> name, email, phone number, shipping address, and order history — collected when you create an account, checkout, or contact support.</p>
        <p><strong>Payment data:</strong> Card details are processed entirely by Stripe and never stored on our servers. COD orders collect no payment data until delivery.</p>
        <p><strong>Technical data:</strong> IP address, browser type, and page interaction data, collected via cookies for site functionality and analytics.</p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>To fulfil orders, send transactional emails (order confirmation, shipping updates), respond to support requests, improve our website, and (with your consent) send marketing communications.</p>
      </LegalSection>

      <LegalSection title="3. Sharing Your Information">
        <p>We share data only with service providers necessary to operate: Stripe (payments), Supabase (hosting/database), Resend (transactional email), and our courier partners (shipping). We do not sell or rent personal data.</p>
      </LegalSection>

      <LegalSection title="4. Cookies">
        <p>We use essential cookies to keep your cart and session functional. Optional analytics cookies help us understand site usage. You may decline analytics cookies at any time via the cookie banner.</p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>Account data is retained while your account is active. Order records are retained for at least 7 years to comply with Indian tax and legal requirements. You may request deletion of non-essential data by emailing <a href="mailto:privacy@glasskin.in" className="underline hover:text-brand-accent">privacy@glasskin.in</a>.</p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>You may access, correct, or request deletion of your personal data at any time by contacting us. You may also opt out of marketing emails via the unsubscribe link.</p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>We implement reasonable administrative and technical safeguards. However, no method of transmission over the Internet is 100% secure.</p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>For privacy-related requests, email <a href="mailto:privacy@glasskin.in" className="underline hover:text-brand-accent">privacy@glasskin.in</a> or write to: GLASSSKIN Skincare LLP, [Registered Address], New Delhi 110001, India.</p>
      </LegalSection>
    </LegalLayout>
  );
}

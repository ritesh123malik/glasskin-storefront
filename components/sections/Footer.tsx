"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─── Inline Social Icons ──────────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1-.32z"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

/* ─── Link columns data ─────────────────────────────────────────────────── */
const shopLinks = [
  { label: "Cleansers", href: "/shop?category=cleansers" },
  { label: "Serums", href: "/shop?category=serums" },
  { label: "Moisturizers", href: "/shop?category=moisturizers" },
  { label: "SPF", href: "/shop?category=spf" },
  { label: "Gift Sets", href: "/shop?category=gift-sets" },
  { label: "New Arrivals", href: "/shop" },
];
const aboutLinks = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Ingredients", href: "/about/ingredients" },
  { label: "Sustainability", href: "/about/sustainability" },
  { label: "Press", href: "/about/press" },
  { label: "Careers", href: "/about/careers" },
];
const supportLinks = [
  { label: "FAQ", href: "/support/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Order Tracking", href: "/support/order-tracking" },
  { label: "Returns & Exchanges", href: "/legal/refund-policy" },
  { label: "Store Locator", href: "/support/store-locator" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-brand-bg border-t border-brand-text/8 text-brand-text">

      {/* ── Top: Logo + Tagline + Email signup ─────────────────────────────── */}
      <div className="py-20 px-6 md:px-12 border-b-4 border-brand-yellow/70 text-center flex flex-col items-center gap-6">
        {/* Brand wordmark */}
        <Link href="/" className="font-display text-3xl md:text-5xl tracking-wide uppercase text-brand-text hover:text-brand-accent transition-colors select-none">
          Glass<span className="text-brand-accent">Skin</span>
        </Link>

        {/* Tagline */}
        <p className="font-rounded italic text-base md:text-lg font-extrabold tracking-wide text-brand-text/60">
          Radiance, Deliciously Simple.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-1 bg-brand-accent/40 rounded-full" />
          <span className="text-brand-accent text-lg">✦</span>
          <div className="flex-1 h-1 bg-brand-accent/40 rounded-full" />
        </div>

        {/* Email signup */}
        <div className="w-full max-w-md">
          <span className="sticker bg-brand-yellow text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
            Get 10% off your first order
          </span>
          {submitted ? (
            <p className="font-rounded text-sm font-extrabold text-brand-magenta py-3">
              Welcome to the glow. Your code is on its way! ✦
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <div className="flex gap-0 rounded-full overflow-hidden border-4 border-brand-text bg-white focus-within:border-brand-accent transition-colors duration-300 shadow-play">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="your@email.com"
                  aria-label="Email address for 10% discount"
                  className="flex-1 bg-transparent px-5 py-3 text-sm text-brand-text placeholder:text-brand-text/40 outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-accent text-white hover:bg-brand-magenta px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-extrabold transition-colors duration-300 whitespace-nowrap font-rounded"
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <p className="text-[10px] text-red-600 text-left font-medium">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="text-[9px] text-brand-text/35 mt-2 tracking-wide">
            No spam. Unsubscribe at any time. Terms apply.
          </p>
        </div>
      </div>

      {/* ── Middle: Link columns + Social ──────────────────────────────────── */}
      <div className="py-16 px-6 md:px-12 border-b-4 border-brand-yellow/70">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">

          {/* Shop */}
          <div>
            <h4 className="font-rounded text-xs uppercase tracking-widest font-extrabold text-brand-magenta mb-5">Shop</h4>
            <ul className="flex flex-col gap-3">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm font-medium text-brand-text/60 hover:text-brand-blue transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-rounded text-xs uppercase tracking-widest font-extrabold text-brand-magenta mb-5">About</h4>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm font-medium text-brand-text/60 hover:text-brand-blue transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-rounded text-xs uppercase tracking-widest font-extrabold text-brand-magenta mb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm font-medium text-brand-text/60 hover:text-brand-blue transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="font-rounded text-xs uppercase tracking-widest font-extrabold text-brand-magenta mb-5">Follow</h4>
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <Link href="https://instagram.com/glassskin" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border-4 border-brand-text text-brand-text hover:bg-brand-accent hover:text-white transition-colors duration-200 shadow-play"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </Link>
                {/* TikTok */}
                <Link href="https://tiktok.com/@glassskin" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border-4 border-brand-text text-brand-text hover:bg-brand-sky hover:text-white transition-colors duration-200 shadow-play"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </Link>
                {/* Pinterest */}
                <Link href="https://pinterest.com/glassskin" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border-4 border-brand-text text-brand-text hover:bg-brand-magenta hover:text-white transition-colors duration-200 shadow-play"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </Link>
              </div>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="font-rounded text-xs uppercase tracking-widest font-extrabold text-brand-magenta mb-5">Legal</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", href: "/legal/privacy" },
                  { label: "Terms of Service", href: "/legal/terms" },
                  { label: "Refund & Cancellation", href: "/legal/refund-policy" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm font-medium text-brand-text/60 hover:text-brand-blue transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className="py-6 px-6 md:px-12 bg-brand-text text-brand-bg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.1em]">
          <p className="font-rounded">© 2026 GLASSSKIN. All rights reserved.</p>
          <p className="font-rounded">
            Crafted with care in India ✦ Powered by{" "}
            <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:text-brand-accent transition-colors duration-200">
              Next.js
            </Link>
          </p>
        </div>
      </div>

    </footer>
  );
}

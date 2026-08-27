"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ── Social icons ── */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1-.32z" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

/* ── Link data ── */
const cols = [
  {
    title: "Shop",
    color: "text-brand-magenta",
    bg: "bg-brand-pink/30",
    links: [
      { label: "Cleansers",    href: "/shop?category=cleansers"    },
      { label: "Serums",       href: "/shop?category=serums"       },
      { label: "Moisturizers", href: "/shop?category=moisturizers" },
      { label: "SPF",          href: "/shop?category=spf"          },
      { label: "Gift Sets",    href: "/shop?category=gift-sets"    },
      { label: "New Arrivals", href: "/shop"                       },
    ],
  },
  {
    title: "About",
    color: "text-brand-blue",
    bg: "bg-brand-sky/20",
    links: [
      { label: "Our Story",      href: "#"       },
      { label: "Ingredients",    href: "#"       },
      { label: "Sustainability", href: "#"       },
      { label: "Press",          href: "#"       },
      { label: "Careers",        href: "#"       },
    ],
  },
  {
    title: "Support",
    color: "text-brand-green",
    bg: "bg-brand-mint/20",
    links: [
      { label: "FAQ",                   href: "#"                    },
      { label: "Contact Us",            href: "/contact"             },
      { label: "Order Tracking",        href: "/order"               },
      { label: "Returns & Exchanges",   href: "/legal/refund-policy" },
      { label: "Store Locator",         href: "#"                    },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy",        href: "/legal/privacy"        },
  { label: "Terms of Service",      href: "/legal/terms"          },
  { label: "Refund & Cancellation", href: "/legal/refund-policy"  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/glassskin", icon: <InstagramIcon />, hover: "hover:bg-brand-magenta hover:border-brand-magenta" },
  { label: "TikTok",    href: "https://tiktok.com/@glassskin",   icon: <TikTokIcon />,    hover: "hover:bg-brand-blue hover:border-brand-blue"       },
  { label: "Pinterest", href: "https://pinterest.com/glassskin", icon: <PinterestIcon />, hover: "hover:bg-brand-red hover:border-brand-red"          },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-brand-bg text-brand-text" aria-label="Site footer">

      {/* ── Email signup banner — yellow bg like Partake ── */}
      <div className="bg-brand-yellow border-y-[3px] border-brand-text py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-4xl md:text-6xl uppercase tracking-[0.05em] text-brand-text hover:text-brand-accent transition-colors select-none"
          >
            Glass<span className="text-brand-accent">Skin</span>
          </Link>

          <p className="font-rounded text-base md:text-lg font-extrabold text-brand-text/70 italic max-w-sm">
            Radiance, Deliciously Simple.
          </p>

          {/* Divider dots */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {["bg-brand-accent", "bg-brand-magenta", "bg-brand-blue"].map((c) => (
              <div key={c} className={`w-3 h-3 rounded-full ${c} border-2 border-brand-text`} />
            ))}
          </div>

          {/* Newsletter */}
          <div className="w-full">
            <span className="sticker bg-brand-accent text-white rotate-1 mb-4 inline-flex shadow-btn">
              Get 10% off your first order
            </span>
            {submitted ? (
              <p className="font-rounded text-sm md:text-base font-extrabold text-brand-text py-3">
                🎉 Welcome to the glow! Your discount code is on its way.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div className="flex rounded-full overflow-hidden border-[3px] border-brand-text bg-white focus-within:border-brand-accent shadow-btn transition-all duration-200">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address for 10% discount
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent px-5 py-3 text-sm font-rounded font-medium text-brand-text placeholder:text-brand-text/40 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-text text-brand-bg font-rounded font-extrabold uppercase text-[0.65rem] tracking-wide px-6 py-3 hover:bg-brand-accent transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                {error && (
                  <p role="alert" className="text-[0.65rem] text-red-700 text-left font-semibold">
                    {error}
                  </p>
                )}
              </form>
            )}
            <p className="text-[0.6rem] text-brand-text/45 mt-2 tracking-wide font-rounded">
              No spam ever. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div className="py-16 md:py-20 px-6 md:px-12 border-b-[3px] border-brand-text/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {cols.map((col) => (
            <div key={col.title}>
              <div className={`inline-block rounded-xl border-[2.5px] border-brand-text px-3 py-1.5 mb-5 ${col.bg}`}>
                <h4 className={`font-rounded text-[0.6rem] uppercase tracking-widest font-extrabold ${col.color}`}>
                  {col.title}
                </h4>
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm font-rounded font-medium text-brand-text/60 hover:text-brand-accent transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + Legal */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-block rounded-xl border-[2.5px] border-brand-text px-3 py-1.5 mb-5 bg-brand-lilac/30">
                <h4 className="font-rounded text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-purple">
                  Follow
                </h4>
              </div>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map(({ label, href, icon, hover }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 flex items-center justify-center rounded-full bg-white border-[3px] border-brand-text text-brand-text hover:text-white transition-all duration-200 shadow-btn ${hover}`}
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="inline-block rounded-xl border-[2.5px] border-brand-text px-3 py-1.5 mb-5 bg-brand-peach/40">
                <h4 className="font-rounded text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-accent">
                  Legal
                </h4>
              </div>
              <ul className="flex flex-col gap-3">
                {legalLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm font-rounded font-medium text-brand-text/60 hover:text-brand-accent transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="py-5 px-6 md:px-12 bg-brand-text">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-rounded text-[0.65rem] uppercase tracking-widest font-extrabold text-brand-bg/70">
            © 2026 GLASSSKIN. All rights reserved.
          </p>
          <p className="font-rounded text-[0.65rem] uppercase tracking-widest font-extrabold text-brand-bg/70">
            Crafted with care in India{" "}
            <span className="text-brand-yellow">✦</span>{" "}
            Powered by{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:text-brand-accent transition-colors"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>

    </footer>
  );
}

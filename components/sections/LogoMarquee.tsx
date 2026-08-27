"use client";

import React from "react";

/* ── Press logos (text-based to avoid missing images) ── */
const pressLogos = [
  { name: "Vogue India",     abbr: "VOGUE"       },
  { name: "Elle",            abbr: "ELLE"        },
  { name: "Harper's Bazaar", abbr: "BAZAAR"      },
  { name: "Nykaa",           abbr: "NYKAA"       },
  { name: "Cosmopolitan",    abbr: "COSMO"       },
  { name: "Forbes",          abbr: "FORBES"      },
  { name: "Vogue Beauty",    abbr: "VB BEAUTY"   },
  { name: "Allure",          abbr: "ALLURE"      },
];

export default function LogoMarquee() {
  return (
    <section
      className="relative overflow-hidden bg-brand-text py-10 md:py-12"
      aria-label="As seen in press"
    >
      {/* Section label */}
      <div className="text-center mb-6">
        <span
          className="sticker bg-brand-yellow text-brand-text -rotate-1 text-[0.6rem] inline-flex"
          aria-hidden="true"
        >
          ✦ As Seen In ✦
        </span>
      </div>

      {/* Marquee track */}
      <div className="flex overflow-hidden" aria-label="Featured press logos">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="animate-marquee-slow flex shrink-0 gap-0 items-center"
            aria-hidden={copy === 1}
          >
            {pressLogos.map((logo) => (
              <span
                key={logo.name}
                className="flex items-center shrink-0 px-8 md:px-12"
              >
                <span
                  className="font-display text-xl md:text-2xl uppercase tracking-widest text-white/25 hover:text-brand-yellow transition-colors duration-300 select-none cursor-default"
                  title={logo.name}
                >
                  {logo.abbr}
                </span>
                <span
                  className="mx-6 md:mx-8 text-brand-yellow/30 text-lg select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

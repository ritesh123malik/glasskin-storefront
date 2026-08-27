"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

/* ── UGC placeholder items ── */
const ugcItems = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/images/social/social-${i + 1}.svg`,
  alt: `Customer glass-skin moment ${i + 1}`,
  handle: `@glassskin_fan${i + 1}`,
}));

/* ── Accent color cycle for border accents ── */
const borderColors = [
  "border-brand-yellow",
  "border-brand-magenta",
  "border-brand-sky",
  "border-brand-mint",
  "border-brand-pink",
  "border-brand-accent",
  "border-brand-yellow",
  "border-brand-blue",
  "border-brand-lilac",
];

export default function SocialProof() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Social proof — customer posts"
    >
      {/* Section top stripe */}
      <div className="h-4 bg-brand-accent w-full" aria-hidden="true" />

      <div className="bg-section-warm py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-14">
            <div>
              <span className="sticker bg-brand-magenta text-white rotate-1 mb-4 inline-flex">
                #GlassSkinGlow
              </span>
              <h2 className="heading-section text-brand-text"
                  style={{ fontSize: "var(--type-h2)" }}>
                The glow is{" "}
                <span className="text-brand-accent underline-squiggle">real</span>
              </h2>
            </div>
            <Link
              href="https://instagram.com/glassskin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-play bg-brand-magenta text-white text-[0.65rem] px-6 py-3 self-start sm:self-auto shrink-0"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={14} />
              Follow @glassskin
            </Link>
          </div>

          {/* UGC grid */}
          <div
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4"
            aria-label="Customer posts on social media"
          >
            {ugcItems.map((item, i) => (
              <div
                key={item.id}
                className={`relative aspect-square rounded-2xl overflow-hidden border-[3px] ${borderColors[i % borderColors.length]} group cursor-pointer shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200`}
              >
                {/* Fallback colorful gradient if SVG fails */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 40) % 360},70%,85%) 0%, hsl(${(i * 40 + 60) % 360},80%,75%) 100%)`,
                  }}
                />
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 18vw"
                  className="object-cover"
                  onError={() => {}} // fallback handled by bg
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/40 transition-colors duration-200 flex items-center justify-center">
                  <Instagram
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow"
                  />
                </div>
                {/* Handle tag */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="sticker bg-white text-brand-text text-[0.55rem] px-2.5 py-1 w-full justify-start truncate shadow-btn">
                    {item.handle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="font-rounded text-sm font-extrabold text-brand-text/50 mb-4">
              Share your glow with <span className="text-brand-magenta">#GlassSkinGlow</span>
            </p>
            <Link
              href="https://instagram.com/glassskin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-play bg-white text-brand-text text-[0.65rem] px-7 py-3 border-brand-text"
            >
              <Instagram size={13} />
              See all posts
            </Link>
          </div>

        </div>
      </div>

      {/* Section bottom stripe */}
      <div className="h-4 bg-brand-blue w-full" aria-hidden="true" />
    </section>
  );
}

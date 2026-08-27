"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

/* ── Spinning badge (Partake's signature floating sticker) ── */
function SpinBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      className={`sticker w-24 h-24 md:w-32 md:h-32 bg-brand-yellow text-brand-text flex-col text-[9px] md:text-[10px] text-center leading-tight shadow-btn border-2 border-brand-text ${className}`}
      aria-hidden="true"
    >
      {text.split("·").map((t, i) => (
        <span key={i} className="block">{t.trim()}</span>
      ))}
    </motion.div>
  );
}

const stats = [
  { value: "10k+", label: "Happy Devotees",  color: "text-brand-accent" },
  { value: "100%", label: "Clean Formulas",  color: "text-brand-blue"   },
  { value: "4.9★", label: "Avg. Rating",     color: "text-brand-magenta"},
];

const badges = [
  { label: "100% Cruelty-Free",       bg: "bg-brand-yellow",   rotate: "-rotate-2" },
  { label: "Dermatologist Tested",    bg: "bg-brand-mint",     rotate: "rotate-1"  },
  { label: "Allergy Friendly",        bg: "bg-brand-pink",     rotate: "-rotate-1" },
];

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col overflow-hidden bg-brand-bg pt-16 lg:pt-20"
      aria-label="Hero"
    >
      {/* ── Top section: main hero content ── */}
      <div className="relative flex flex-col lg:flex-row min-h-[88svh] lg:min-h-[85vh] items-stretch w-full">

        {/* Decorative background blobs */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-brand-pink/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-brand-mint/30 blur-3xl" />
        </div>

        {/* ── LEFT: Text & CTA ── */}
        <div className="relative z-10 w-full lg:w-[58%] flex flex-col justify-center px-6 py-14 md:px-12 lg:px-16 xl:px-20 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Pill badges row */}
            <div className="flex flex-wrap gap-2 mb-7" aria-label="Product claims">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className={`sticker ${b.bg} text-brand-text ${b.rotate} text-[0.6rem] md:text-[0.65rem] px-3.5 py-1.5`}
                >
                  {b.label}
                </span>
              ))}
            </div>

            {/* Main headline — ultra-bold Partake size */}
            <h1 className="heading-display text-brand-text mb-5 leading-[0.88]"
                style={{ fontSize: "var(--type-hero)" }}>
              Grab life<br />
              by the{" "}
              <span
                className="relative inline-block text-brand-accent"
                aria-label="glow"
              >
                glow
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8 C 50 2, 100 10, 198 5"
                    stroke="#FFD000"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="font-rounded text-base md:text-lg lg:text-xl text-brand-text/75 font-semibold max-w-md mb-8 leading-relaxed">
              Real science, deliciously simple. Our clean formulas melt into skin
              to refine, plump &amp; illuminate —{" "}
              <span className="text-brand-magenta font-extrabold">
                so you can partake in daily sweetness
              </span>
              .
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
              <Link
                href="#shop-carousel"
                className="btn-play bg-brand-accent text-white px-7 py-3.5 text-[0.7rem] md:text-xs"
              >
                Shop the Glow
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/skin-quiz"
                className="btn-play bg-brand-yellow text-brand-text px-7 py-3.5 text-[0.7rem] md:text-xs"
              >
                Find My Ritual
              </Link>
            </div>

            {/* Social proof stats */}
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && (
                    <div className="w-px h-8 bg-brand-text/15 hidden xs:block" />
                  )}
                  <div className="flex flex-col">
                    <span className={`font-display text-2xl md:text-3xl leading-none font-black ${s.color}`}>
                      {s.value}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-text/50 mt-0.5">
                      {s.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ── RIGHT: Lifestyle image ── */}
        <motion.div
          className="w-full lg:w-[42%] relative min-h-[52vw] sm:min-h-[420px] lg:min-h-auto order-1 lg:order-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* Hero image */}
          <Image
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
            alt="Radiant glass-skin ritual products on a warm cream background"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />

          {/* Colorful overlay gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-brand-bg/40 lg:via-transparent lg:to-transparent"
          />

          {/* Floating spin badge */}
          <div className="absolute top-5 right-5 md:top-8 md:right-8">
            <SpinBadge text="Certified · Tasty · ✨" />
          </div>

          {/* Bottom sticker pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute bottom-5 left-5 md:bottom-8 md:left-8 sticker bg-brand-magenta text-white text-[0.6rem] px-5 py-2 rotate-3 shadow-btn"
          >
            Allergy Friendly
          </motion.div>

          {/* Review stars card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="absolute bottom-16 right-4 md:bottom-20 md:right-6 bg-white rounded-2xl border-[3px] border-brand-text px-4 py-3 shadow-btn flex items-center gap-2.5"
          >
            <div className="flex gap-0.5 text-brand-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span className="text-[0.6rem] font-extrabold uppercase tracking-wide text-brand-text font-rounded">
              4.9 / 5 · 3k+ Reviews
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Marquee strip (Partake signature) ── */}
      <div className="w-full overflow-hidden bg-brand-blue py-4 md:py-5 select-none" aria-hidden="true">
        <div className="flex">
          {/* Two copies for seamless loop */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="animate-marquee flex shrink-0 gap-0 text-[0.65rem] md:text-xs font-extrabold uppercase tracking-widest text-white font-rounded"
              style={{ willChange: "transform" }}
            >
              {[
                "Dermatologist Tested",
                "Clean Formulas",
                "Cruelty-Free",
                "Made in Small Batches",
                "Allergy Friendly",
                "Glass-Skin Guarantee",
                "Free of Sulphates & Parabens",
                "Vegan & Kind",
              ].map((item) => (
                <span key={item} className="flex items-center shrink-0">
                  <span className="px-3 md:px-5">{item}</span>
                  <span className="text-brand-yellow mr-3 md:mr-5">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

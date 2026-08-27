"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  author: string;
  concern: string;
  accentColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote: "The Glaze Serum is actual magic. My stubborn dark spots have faded, and my skin has a dewy, transparent finish I haven't seen since my twenties.",
    author: "Sophia K.",
    concern: "Hyperpigmentation & Glow",
    accentColor: "bg-brand-yellow",
  },
  {
    id: 2,
    rating: 5,
    quote: "I was skeptical about oil cleansing, but the Rice Bran oil melts away makeup instantly without stripping. My barrier feels calm, hydrated, and completely balanced.",
    author: "Aria M.",
    concern: "Sensitive Skin & Redness",
    accentColor: "bg-brand-mint",
  },
  {
    id: 3,
    rating: 5,
    quote: "The Barrier Melting Cream is the only moisturizer that saves my skin in dry weather. It has a gorgeous whipped soufflé texture that locks in hydration all day.",
    author: "Elena R.",
    concern: "Dry Skin & Dehydration",
    accentColor: "bg-brand-pink",
  },
  {
    id: 4,
    rating: 5,
    quote: "Invisible Dew SPF is a game-changer. Absolutely zero white cast, feels like a lightweight serum, and leaves a beautiful velvet finish under my makeup.",
    author: "Chloe T.",
    concern: "Daily Sun Protection",
    accentColor: "bg-brand-sky",
  },
  {
    id: 5,
    rating: 5,
    quote: "My skincare routine has gone from ten chaotic steps to just three GLASSSKIN essentials. My redness is gone, and my skin feels genuinely healthy.",
    author: "Jessica L.",
    concern: "Skin Barrier Restructuring",
    accentColor: "bg-brand-lilac",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [startTimer]);

  const goTo = (idx: number) => {
    if (timer.current) clearInterval(timer.current);
    setActiveIdx(idx);
    setTimeout(startTimer, 10_000);
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Customer testimonials"
    >
      {/* Top stripe */}
      <div className="h-4 w-full bg-brand-magenta" aria-hidden="true" />

      <div className="bg-section-sky py-20 md:py-32 px-6 md:px-12 relative">
        {/* Decorative large quote mark */}
        <div
          aria-hidden="true"
          className="absolute top-8 right-8 md:top-12 md:right-12 text-brand-blue/10 pointer-events-none select-none"
        >
          <Quote size={160} strokeWidth={1} />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <span className="sticker bg-brand-yellow text-brand-text -rotate-2 mb-6">
            Real Reviews
          </span>

          <h2 className="heading-section text-brand-text mb-12 md:mb-16"
              style={{ fontSize: "var(--type-h2)" }}>
            Totally sweet{" "}
            <span className="text-brand-magenta">on us</span>
          </h2>

          {/* ── Testimonial card ── */}
          <div className="w-full relative min-h-[280px] md:min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-3xl border-[3px] border-brand-text ${current.accentColor} p-8 md:p-12 shadow-btn`}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={20} fill="#FFD000" stroke="#FFD000" className="drop-shadow-sm" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-rounded text-lg md:text-xl lg:text-2xl font-extrabold text-brand-text leading-snug max-w-2xl mx-auto mb-8">
                  "{current.quote}"
                </blockquote>

                {/* Author pill */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="sticker bg-brand-text text-brand-bg text-[0.6rem] px-4 py-1.5">
                    {current.author}
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-text/55 font-rounded">
                    Concern: {current.concern}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Dot navigation ── */}
          <div className="flex items-center gap-2.5 mt-8" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Testimonial ${i + 1} by ${t.author}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIdx
                    ? "w-8 bg-brand-magenta"
                    : "w-2.5 bg-brand-text/25 hover:bg-brand-text/50"
                }`}
              />
            ))}
          </div>

          {/* Review count bar */}
          <div className="mt-10 flex items-center gap-3 text-brand-text/60">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFD000" stroke="#FFD000" />
              ))}
            </div>
            <span className="text-xs font-rounded font-extrabold uppercase tracking-wide">
              4.9 average · 3,000+ verified reviews
            </span>
          </div>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="h-4 w-full bg-brand-yellow" aria-hidden="true" />
    </section>
  );
}

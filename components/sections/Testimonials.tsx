"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  author: string;
  concern: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote: "The Glaze Serum is actual magic. My stubborn dark spots have faded, and my skin has a dewy, transparent finish I haven't seen since my twenties.",
    author: "Sophia K.",
    concern: "Concern: Hyperpigmentation & Glow"
  },
  {
    id: 2,
    rating: 5,
    quote: "I was skeptical about oil cleansing, but the Rice Bran oil melts away makeup instantly without stripping. My barrier feels calm, hydrated, and completely balanced.",
    author: "Aria M.",
    concern: "Concern: Sensitive Skin & Redness"
  },
  {
    id: 3,
    rating: 5,
    quote: "The Barrier Melting Cream is the only moisturizer that saves my skin in dry weather. It has a gorgeous whipped soufflé texture that locks in hydration all day.",
    author: "Elena R.",
    concern: "Concern: Dry Skin & Dehydration"
  },
  {
    id: 4,
    rating: 5,
    quote: "Invisible Dew SPF is a game-changer. Absolutely zero white cast, feels like a lightweight serum, and leaves a beautiful velvet finish under my makeup.",
    author: "Chloe T.",
    concern: "Concern: Daily Sun Protection"
  },
  {
    id: 5,
    rating: 5,
    quote: "My skincare routine has gone from ten chaotic steps to just three simple GLASSSKIN essentials. My redness is gone, and my skin feels genuinely healthy.",
    author: "Jessica L.",
    concern: "Concern: Skin Barrier Restructuring"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 6000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleDotClick = (index: number) => {
    stopAutoplay();
    setActiveIndex(index);
    // Restart autoplay after 10s of inactivity
    setTimeout(() => {
      startAutoplay();
    }, 10000);
  };

  return (
    <section className="py-28 px-6 md:px-12 bg-brand-sky/60 border-y-4 border-brand-sky select-none relative overflow-hidden">
      {/* Background soft circular accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/20 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <span className="sticker bg-brand-yellow text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
          Reviews
        </span>
        <h2 className="heading-display text-brand-text text-3xl md:text-5xl mb-12">
          Totally sweet <span className="text-brand-magenta">on us</span>
        </h2>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[220px] md:min-h-[180px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-brand-yellow">
                {Array.from({ length: mockTestimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="stroke-[1.5] drop-shadow" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-rounded text-lg md:text-xl lg:text-2xl font-extrabold text-brand-text leading-snug max-w-2xl mx-auto text-center mb-8">
                “{mockTestimonials[activeIndex].quote}”
              </blockquote>

              {/* Author & Detail */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider font-extrabold text-brand-text font-rounded">
                  {mockTestimonials[activeIndex].author}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-text/60 font-extrabold mt-1">
                  {mockTestimonials[activeIndex].concern}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center gap-2.5 mt-12">
          {mockTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-brand-accent w-6 rounded-full" 
                  : "bg-brand-text/20 w-2 rounded-full hover:bg-brand-text/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

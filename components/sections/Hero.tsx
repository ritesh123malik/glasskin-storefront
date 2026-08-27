"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col pt-16 lg:pt-20 bg-brand-bg overflow-hidden">
      {/* Hero Content Area */}
      <div className="w-full flex flex-col lg:flex-row min-h-[75vh] items-stretch relative">
        {/* Fun background blobs */}
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-brand-yellow/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-8 w-72 h-72 bg-brand-sky/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 w-40 h-40 bg-brand-pink/60 rounded-full blur-2xl pointer-events-none" />

        {/* Left: Text & CTA */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-start px-6 py-16 md:px-12 lg:px-16 order-2 lg:order-1 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="sticker bg-brand-yellow text-brand-text text-[10px] md:text-xs px-4 py-1.5 -rotate-3 shadow-play">
                100% Cruelty-Free
              </span>
              <span className="sticker bg-brand-mint text-brand-text text-[10px] md:text-xs px-4 py-1.5 rotate-2 shadow-play hidden sm:inline-flex">
                Dermatologist-Tested
              </span>
            </div>

            <h1 className="heading-display text-brand-text text-[13vw] sm:text-6xl md:text-[4.6rem] mb-4">
              Grab life
              <br />
              by the <span className="text-brand-accent">glow</span>
            </h1>

            <p className="font-rounded text-base md:text-lg text-brand-text/80 font-semibold max-w-md mb-8 leading-snug">
              Real science, deliciously simple. Our clean, feel-good formulas melt
              into skin to refine, plump &amp; illuminate — so you can{" "}
              <span className="text-brand-magenta font-extrabold">partake in daily sweetness</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#shop-carousel"
                className="btn-play-solid bg-brand-accent text-[11px] md:text-xs px-9 py-8"
              >
                Shop the Glow
              </Link>
              <Link
                href="/skin-quiz"
                className="btn-play bg-white text-brand-text border-4 border-brand-text px-9 py-8 text-[11px] md:text-xs hover:bg-brand-yellow"
              >
                Find My Ritual
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-10">
              <div>
                <p className="font-display text-3xl text-brand-blue">10k+</p>
                <p className="text-[10px] uppercase tracking-widest font-extrabold text-brand-text/60">Happy Devotees</p>
              </div>
              <div className="w-px h-9 bg-brand-text/15" />
              <div>
                <p className="font-display text-3xl text-brand-blue">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-extrabold text-brand-text/60">Clean Formulas</p>
              </div>
              <div className="w-px h-9 bg-brand-text/15" />
              <div>
                <p className="font-display text-3xl text-brand-blue">4.9★</p>
                <p className="text-[10px] uppercase tracking-widest font-extrabold text-brand-text/60">Loved By All</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Product / Lifestyle visual */}
        <div className="w-full lg:w-[45%] relative min-h-[350px] lg:min-h-auto order-1 lg:order-2">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=85"
              alt="Glasskin product bottles with white pump, towel, pink tulips, and candle"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            {/* Rotating sticker badge */}
            <div className="absolute top-6 right-6 w-28 h-28 md:w-32 md:h-32 sticker bg-brand-yellow text-brand-text text-[10px] md:text-xs rotate-12 shadow-play select-none">
              <span className="text-center leading-tight">Certified<br/>Tasty<br/>✨</span>
            </div>
            {/* Small colour drop shape */}
            <div className="absolute -bottom-6 left-6 w-24 h-24 bg-brand-magenta rounded-[40%] rotate-12 shadow-play hidden md:flex items-center justify-center sticker text-white text-[10px]">
              Allergy-Friendly
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Strip */}
      <div className="w-full overflow-hidden bg-brand-blue py-8 flex items-center select-none relative z-10">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-css {
            animation: marquee 25s linear infinite;
            width: 200%;
            display: flex;
          }
        `}} />
        <div className="flex w-full">
          <div className="animate-marquee-css whitespace-nowrap gap-4 text-lg md:text-2xl font-extrabold uppercase tracking-wider text-white font-rounded">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span>Made in Small Batches</span>
                <span className="mx-4">✦</span>
                <span>Cruelty-Free</span>
                <span className="mx-4">✦</span>
                <span>Dermatologist Tested</span>
                <span className="mx-4">✦</span>
                <span>Clean Formulas</span>
                <span className="mx-4">✦</span>
                <span>Cruelty-Free</span>
                <span className="mx-4">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

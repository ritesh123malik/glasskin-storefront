"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col pt-16 lg:pt-20 bg-brand-bg">
      {/* Hero Content Area */}
      <div className="w-full flex flex-col lg:flex-row min-h-[75vh] items-stretch border-b border-brand-text/5">
        {/* Left: Text & CTA (45% on desktop, order-2 on mobile so it is stacked below image) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start px-6 py-16 md:px-12 lg:px-16 order-2 lg:order-1 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <span className="text-[10px] text-brand-accent uppercase tracking-[0.25em] font-semibold block mb-4">
              Premium Skincare Essentials
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6.5xl font-serif font-light leading-[1.15] mb-6 tracking-wide text-brand-text">
              Glass Skin <br />
              <span className="font-serif italic font-normal text-brand-accent">Starts Here</span>
            </h1>
            <p className="text-sm text-brand-text/75 font-sans font-light leading-relaxed max-w-md mb-8 tracking-wide">
              Experience the ritual of intense clarity. Formulated with mineral-rich bio-actives, our signature treatments melt into the skin to refine, plump, and deeply illuminate.
            </p>
            <Link
              href="#shop-carousel"
              className="inline-flex bg-brand-accent text-brand-bg hover:bg-brand-secondary hover:-translate-y-0.5 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Shop the Ritual
            </Link>
          </motion.div>
        </div>

        {/* Right: Lifestyle Image (55% on desktop, order-1 on mobile so it sits at the top) */}
        <div className="w-full lg:w-[55%] relative min-h-[350px] lg:min-h-auto order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-brand-text/5 bg-brand-text/[0.02]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero_lifestyle.svg"
              alt="Luxury Skincare Art"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Strip */}
      <div className="w-full overflow-hidden bg-brand-bg border-y border-brand-text/10 py-4 flex items-center select-none">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-css {
            animation: marquee 25s linear infinite;
          }
        `}} />
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-css flex whitespace-nowrap gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-brand-text/70" style={{ fontVariant: "all-small-caps" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span>Dermatologist Tested</span>
                <span className="text-brand-accent mx-4 font-normal">•</span>
                <span>Clean Formulas</span>
                <span className="text-brand-accent mx-4 font-normal">•</span>
                <span>Cruelty-Free</span>
                <span className="text-brand-accent mx-4 font-normal">•</span>
                <span>Made in Small Batches</span>
                <span className="text-brand-accent mx-4 font-normal">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

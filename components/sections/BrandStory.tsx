"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Leaf, Heart, FlaskConical, ArrowRight } from "lucide-react";

export default function BrandStory() {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5 stroke-[1.5]" />,
      label: "Dermatologist Tested"
    },
    {
      icon: <Leaf className="w-5 h-5 stroke-[1.5]" />,
      label: "Clean Ingredients"
    },
    {
      icon: <Heart className="w-5 h-5 stroke-[1.5]" />,
      label: "Cruelty-Free"
    },
    {
      icon: <FlaskConical className="w-5 h-5 stroke-[1.5]" />,
      label: "Small Batch"
    }
  ];

  return (
    <section id="brand-story" className="py-32 px-6 md:px-12 bg-brand-bg border-b border-brand-text/5 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Illustrated Collage */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Box 1: Cleanser Texture */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-sm">
              <Image 
                src="/images/products/cleanser_hover.svg" 
                alt="Formulation Texture" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Box 2: Serum Dropper (Offset) */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-md translate-y-6">
              <Image 
                src="/images/products/serum.svg" 
                alt="Glaze Serum bottle" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Box 3: Cream Jar (Offset) */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-md -translate-y-6">
              <Image 
                src="/images/products/moisturizer.svg" 
                alt="Melting Cream Jar" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Box 4: Serum Texture */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-sm">
              <Image 
                src="/images/products/serum_hover.svg" 
                alt="Droplets texture Close-up" 
                fill 
                className="object-cover"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Story Copy & Badges */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
          <span className="text-[10px] text-brand-accent uppercase tracking-[0.25em] font-semibold block mb-3">
            Our Origin
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide mb-6 leading-tight">
            Crafted for <span className="font-serif italic font-normal text-brand-accent">translucent</span> skin integrity.
          </h2>
          
          <p className="text-sm text-brand-text/75 font-sans font-light leading-relaxed max-w-xl mb-6 tracking-wide">
            GLASSSKIN was founded in 2026 out of a desire to simplify the complexity of skincare. Our formulas strip away synthetic fillers, focusing exclusively on active bio-compatible botanicals and essential lipids that harmonize with your skin’s biological barrier.
          </p>
          
          <p className="text-sm text-brand-text/75 font-sans font-light leading-relaxed max-w-xl mb-10 tracking-wide">
            Working directly in micro-batches with dermatologists and phytochemists, we source raw, cold-pressed rice bran, oat extracts, and copper peptides. We prioritize absolute transparency and circular, recyclable glass packaging in every product we release.
          </p>

          {/* Row of 4 Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full py-8 border-y border-brand-text/10 mb-8">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-start gap-2.5">
                <div className="text-brand-accent">
                  {badge.icon}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text/80 leading-snug">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Founder Quote & Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
            <div>
              <p className="text-[11px] font-serif font-semibold italic text-brand-text/80">“Your skin barrier is a living shield—treat it with respect.”</p>
              <p className="text-[9px] uppercase tracking-widest text-brand-text/40 font-bold mt-1">— Ritesh, Founder of GLASSSKIN</p>
            </div>
            
            <Link
              href="#about"
              className="relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent pb-1 group"
            >
              <span>Learn More</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-bottom-right scale-x-0 bg-brand-accent transition-transform duration-300 group-hover:origin-bottom-left group-hover:scale-x-100" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

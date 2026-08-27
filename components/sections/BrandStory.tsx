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
    <section id="brand-story" className="py-32 px-6 md:px-12 bg-brand-pink/40 border-y-4 border-brand-pink/70 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Illustrated Collage */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Box 1: Cleanser Texture */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-sm">
              {/* TODO: replace with GLASSSKIN's actual product photography */}
              <Image 
                src="https://images.unsplash.com/photo-1608248597359-00f73b6aa8a8?auto=format&fit=crop&w=800&q=80" 
                alt="Silky cleansing oil formulation texture" 
                fill 
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
            
            {/* Box 2: Serum Dropper (Offset) */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-md translate-y-6">
              {/* TODO: replace with GLASSSKIN's actual product photography */}
              <Image 
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80" 
                alt="Glass Skin Glaze Serum glass bottle" 
                fill 
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>

            {/* Box 3: Cream Jar (Offset) */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-md -translate-y-6">
              {/* TODO: replace with GLASSSKIN's actual product photography */}
              <Image 
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" 
                alt="Ceramide Melting Barrier Cream pot" 
                fill 
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>

            {/* Box 4: Luminous Skin Texture */}
            <div className="relative aspect-[4/5] rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden shadow-sm">
              {/* TODO: replace with GLASSSKIN's actual product photography */}
              <Image 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" 
                alt="Radiant, translucent dewy skin close-up" 
                fill 
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Story Copy & Badges */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
          <span className="sticker bg-brand-mint text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
            Our Origin
          </span>
          <h2 className="heading-display text-brand-text text-4xl md:text-6xl mb-6">
            A recipe for{" "}
            <span className="text-brand-magenta">sweeter</span> skin
          </h2>
          
          <p className="font-rounded text-base md:text-lg text-brand-text/80 font-medium leading-relaxed max-w-xl mb-6">
            GLASSSKIN was founded out of a desire to simplify the complexity of skincare.
            Our formulas strip away synthetic fillers and focus on active bio-compatible
            botanicals and essential lipids that harmonize with your skin’s barrier.
          </p>
          
          <p className="font-rounded text-base md:text-lg text-brand-text/80 font-medium leading-relaxed max-w-xl mb-10">
            Working in micro-batches with dermatologists and phytochemists, we source
            cold-pressed rice bran, oat extracts, and copper peptides — always in circular,
            recyclable glass.
          </p>

          {/* Row of 4 Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full py-8 border-y-4 border-brand-text/10 mb-8">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-start gap-2.5 bg-white rounded-2xl p-4 shadow-play border-4 border-white">
                <div className="text-brand-accent">
                  {badge.icon}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-text leading-snug font-rounded">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Founder Quote & Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
            <div>
              <p className="text-sm font-rounded font-extrabold italic text-brand-text">“Your skin barrier is a living shield — treat it with respect.”</p>
              <p className="text-[10px] uppercase tracking-widest text-brand-text/50 font-extrabold mt-1">— Ritesh, Founder of GLASSSKIN</p>
            </div>
            
            <Link
              href="#about"
              className="btn-play bg-brand-sky text-white border-4 border-brand-text px-7 py-3 text-[10px]"
            >
              <span>Learn More</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

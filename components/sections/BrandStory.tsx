"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Heart, FlaskConical } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Dermatologist\nTested",   bg: "bg-brand-sky",    rot: "-rotate-2" },
  { icon: Leaf,        label: "Clean\nIngredients",     bg: "bg-brand-mint",   rot: "rotate-1"  },
  { icon: Heart,       label: "Cruelty-\nFree",         bg: "bg-brand-pink",   rot: "-rotate-1" },
  { icon: FlaskConical,label: "Small\nBatch",           bg: "bg-brand-yellow", rot: "rotate-2"  },
];

const images = [
  { src: "https://images.unsplash.com/photo-1608248597359-00f73b6aa8a8?auto=format&fit=crop&w=800&q=80", alt: "Silky cleansing oil texture", rotate: "-rotate-2" },
  { src: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80", alt: "Glass Skin Glaze Serum dropper bottle", rotate: "rotate-3"  },
  { src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", alt: "Ceramide barrier cream pot", rotate: "-rotate-1" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", alt: "Dewy glass-skin close-up", rotate: "rotate-2"  },
];

export default function BrandStory() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      aria-labelledby="brand-story-heading"
    >
      {/* ── Top colorful stripe divider ── */}
      <div className="w-full h-4 bg-brand-yellow" aria-hidden="true" />

      {/* ── Main section body ── */}
      <div className="bg-section-pink py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ── Left: Collage grid ── */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-brand-text shadow-card ${img.rotate} transition-transform duration-300 hover:rotate-0 hover:scale-105`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Big decorative quote bubble */}
            <div className="mt-6 bg-brand-yellow border-[3px] border-brand-text rounded-2xl shadow-btn px-6 py-5">
              <p className="font-rounded text-sm font-extrabold italic text-brand-text leading-snug">
                "Your skin barrier is a living shield — treat it with respect and it will reward you with glass-like radiance."
              </p>
              <p className="text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-text/55 mt-3">
                — Ritesh, Founder of GLASSSKIN
              </p>
            </div>
          </motion.div>

          {/* ── Right: Copy & badges ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="sticker bg-brand-mint text-brand-text -rotate-2 mb-5">
              Our Origin
            </span>

            <h2
              id="brand-story-heading"
              className="heading-section text-brand-text mb-6"
              style={{ fontSize: "var(--type-h2)" }}
            >
              A recipe for{" "}
              <span className="text-brand-magenta relative">
                sweeter
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 10" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6 C 50 1, 100 8, 198 4"
                    stroke="#FFD000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              skin
            </h2>

            <p className="font-rounded text-base md:text-lg text-brand-text/75 font-medium leading-relaxed max-w-xl mb-5">
              GLASSSKIN was founded out of a desire to simplify the complexity of skincare.
              Our formulas strip away synthetic fillers and focus on active bio-compatible
              botanicals and essential lipids that harmonize with your skin's barrier.
            </p>
            <p className="font-rounded text-base md:text-lg text-brand-text/75 font-medium leading-relaxed max-w-xl mb-10">
              Working in micro-batches with dermatologists and phytochemists, we source
              cold-pressed rice bran, oat extracts, and copper peptides — always in circular,
              recyclable glass.
            </p>

            {/* 4 trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-10">
              {badges.map(({ icon: Icon, label, bg, rot }) => (
                <div
                  key={label}
                  className={`${bg} ${rot} rounded-2xl border-[3px] border-brand-text p-4 flex flex-col items-start gap-2.5 shadow-btn hover:rotate-0 hover:scale-105 transition-all duration-200`}
                >
                  <Icon className="w-5 h-5 stroke-[2.5] text-brand-text shrink-0" />
                  <span className="text-[0.6rem] uppercase tracking-wide font-extrabold text-brand-text leading-snug font-rounded whitespace-pre-line">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="#shop-carousel"
              className="btn-play bg-brand-accent text-white text-xs px-8 py-4"
            >
              Start Your Ritual
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom colorful stripe divider ── */}
      <div className="w-full h-4 bg-brand-blue" aria-hidden="true" />
    </section>
  );
}

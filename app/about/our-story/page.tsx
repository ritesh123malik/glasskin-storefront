"use client";

import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Kicker */}
        <span className="sticker bg-brand-pink text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
          How We Began
        </span>
        
        {/* Hero Title */}
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
          Our <span className="text-brand-magenta">Story</span>
        </h1>
        
        <p className="text-sm text-brand-text/60 leading-relaxed mb-12 max-w-2xl">
          Glasskin was born from a simple belief: skincare should be as nourishing for the soul as it is for the skin. No complexities, no compromises — just pure, delicious effectiveness.
        </p>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="heading-display text-brand-text text-2xl md:text-3xl mb-8">
            The Journey <span className="text-brand-blue">So Far</span>
          </h2>
          
          <div className="space-y-8">
            {/* 2020 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-brand-accent font-rounded font-extrabold text-lg">2020</span>
              </div>
              <div className="flex-1 pt-2 border-t-2 border-dashed border-brand-text/15 group-hover:border-brand-accent/40 transition-colors">
                <div className="bg-brand-bg p-6 rounded-2xl shadow-play border border-brand-text/8">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">The Spark</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    Two beauty enthusiasts, frustrated with overcomplicated routines, dreamed of creating something simpler. In a tiny Mumbai apartment, the first Glasskin formulas were mixed — always with real fruit extracts, always without the fluff.
                  </p>
                </div>
              </div>
            </div>

            {/* 2021 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-brand-magenta font-rounded font-extrabold text-lg">2021</span>
              </div>
              <div className="flex-1 pt-2 border-t-2 border-dashed border-brand-text/15 group-hover:border-brand-magenta/40 transition-colors">
                <div className="bg-brand-bg p-6 rounded-2xl shadow-play border border-brand-text/8">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">First Launch</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    Our debut collection — a cleanser, serum, and moisturizer — launched online to rave reviews. Customers loved the results but adored the sensory experience: the textures, the fragrances, the tiny moments of joy each product delivered.
                  </p>
                </div>
              </div>
            </div>

            {/* 2022 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-brand-sky font-rounded font-extrabold text-lg">2022</span>
              </div>
              <div className="flex-1 pt-2 border-t-2 border-dashed border-brand-text/15 group-hover:border-brand-sky/40 transition-colors">
                <div className="bg-brand-bg p-6 rounded-2xl shadow-play border border-brand-text/8">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Growth & Recognition</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    Featured in Vogue India and Cosmopolitan, Glasskin became synonymous with &quot;clean beauty that doesn&apos;t take itself too seriously.&quot; We expanded to 50+ retail partners across India.
                  </p>
                </div>
              </div>
            </div>

            {/* 2023 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-brand-yellow font-rounded font-extrabold text-lg">2023</span>
              </div>
              <div className="flex-1 pt-2 border-t-2 border-dashed border-brand-text/15 group-hover:border-brand-yellow/40 transition-colors">
                <div className="bg-brand-bg p-6 rounded-2xl shadow-play border border-brand-text/8">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">SPF Revolution</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    We launched our now cult-favorite Dewy SPF 50+, proving that sunscreen could be luxurious, non-greasy, and something you actually look forward to wearing. It sold out in 3 days.
                  </p>
                </div>
              </div>
            </div>

            {/* 2024 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-brand-cyan font-rounded font-extrabold text-lg">2024</span>
              </div>
              <div className="flex-1 pt-2 border-t-2 border-dashed border-brand-text/15 group-hover:border-brand-cyan/40 transition-colors">
                <div className="bg-brand-bg p-6 rounded-2xl shadow-play border border-brand-text/8">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Global Expansion</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    Glasskin went international, shipping to the UAE, Singapore, and the UK. We opened our first flagship store in Bandra, Mumbai — a candy-coloured haven that perfectly embodies our playful ethos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Note */}
        <section className="mb-16">
          <h2 className="heading-display text-brand-text text-2xl md:text-3xl mb-8">
            A Note From <span className="text-brand-accent">Our Founder</span>
          </h2>
          
          <div className="bg-gradient-to-r from-brand-pink/20 to-brand-mint/20 p-8 md:p-12 rounded-3xl shadow-play border-4 border-brand-yellow/40">
            <blockquote className="text-lg text-brand-text/80 leading-relaxed italic mb-6">
              &ldquo;We started Glasskin because we believed skincare could be simpler, more joyful, and more effective all at once. Every product we create is a love letter to your skin — and to the child within you who still believes in a little magic.&rdquo;
            </blockquote>
            <p className="font-rounded font-extrabold text-brand-text text-sm">
              — RITESH MALIK, FOUNDER & CEO
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="heading-display text-brand-text text-2xl md:text-3xl mb-8">
            What We <span className="text-brand-red">Stand For</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-pink/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Real Results</h3>
              <p className="text-sm text-brand-text/60">
                Formulas backed by science, powered by nature. No empty promises.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-mint/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Sensory Joy</h3>
              <p className="text-sm text-brand-text/60">
                Skincare that feels as good as it works. Every texture is a delight.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-sky/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Clean Ethics</h3>
              <p className="text-sm text-brand-text/60">
                Cruelty-free, vegan-friendly, sustainably sourced. Always.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-yellow/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Inclusivity</h3>
              <p className="text-sm text-brand-text/60">
                Products for every skin type, every skin tone, every person.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-lilac/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Transparency</h3>
              <p className="text-sm text-brand-text/60">
                No hidden ingredients. No hidden agendas. Just honest skincare.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-peach/30 text-center">
              <span className="text-3xl mb-4 block">✦</span>
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Playfulness</h3>
              <p className="text-sm text-brand-text/60">
                Because skincare should spark joy, not stress.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="heading-display text-brand-text text-2xl md:text-3xl mb-8">
            Meet The <span className="text-brand-magenta">Team</span>
          </h2>
          
          <p className="text-sm text-brand-text/60 leading-relaxed mb-8">
            A diverse group of skincare obsessives, formulators, designers, and dreamers — all united by the mission to make your skincare routine a daily celebration.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-accent to-brand-magenta border-4 border-white shadow-play" />
            ))}
            <span className="text-sm text-brand-text/50 font-medium">+20 more glasskin lovers</span>
          </div>
        </section>

      </main>
      
      <Footer />
      <CartDrawer />
    </div>
  );
}

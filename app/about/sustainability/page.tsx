"use client";
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Leaf, Recycle, Heart, TreePine, Droplet, Sun, Wind, Trash2, Package, Factory, Truck } from "lucide-react";

export default function SustainabilityPage() {
  
  // Sustainability Stats
  const stats = [
    { number: "100%", label: "Vegan & Cruelty-Free", icon: <Leaf className="w-8 h-8" /> },
    { number: "50%+", label: "Recycled Materials", icon: <Recycle className="w-8 h-8" /> },
    { number: "0", label: "Carbon Neutral Shipping", icon: <TreePine className="w-8 h-8" /> },
    { number: "1M+", label: "Trees Planted", icon: <TreePine className="w-8 h-8" /> },
  ];

  // Initiatives
  const initiatives = [
    {
      title: "Clean Formulas",
      description: "All Glasskin products are free from parabens, sulfates, phthalates, synthetic fragrances, and over 2,000 other harmful ingredients. We believe in beauty that doesn't harm.",
      icon: <Droplet className="w-10 h-10" />,
      color: "from-brand-cyan to-brand-sky",
    },
    {
      title: "Eco-Conscious Packaging",
      description: "Our bottles are made from 50% post-consumer recycled plastic, and we\'re working towards 100%. Our boxes are FSC-certified and printed with soy-based inks.",
      icon: <Package className="w-10 h-10" />,
      color: "from-brand-mint to-brand-cyan",
    },
    {
      title: "Refill & Recycle",
      description: "Bring back your empty Glasskin bottles to any of our retail partners and receive a discount on your next purchase. We clean, sanitize, and reuse or recycle every returned container.",
      icon: <Recycle className="w-10 h-10" />,
      color: "from-brand-lilac to-brand-pink",
    },
    {
      title: "Carbon Neutral Operations",
      description: "We've partnered with trusted organizations to offset 100% of our carbon footprint. From manufacturing to delivery, your Glasskin order is carbon neutral.",
      icon: <Wind className="w-10 h-10" />,
      color: "from-brand-peach to-brand-yellow",
    },
    {
      title: "Ethical Sourcing",
      description: "We work directly with farmers and cooperatives to source our ingredients ethically and sustainably. Fair wages, safe conditions, and long-term relationships are non-negotiable.",
      icon: <Heart className="w-10 h-10" />,
      color: "from-brand-pink to-brand-magenta",
    },
    {
      title: "Give Back Program",
      description: "A portion of every Glasskin sale goes to environmental and social causes. In 2024, we've planted over 1 million trees and funded education for 500+ children.",
      icon: <TreePine className="w-10 h-10" />,
      color: "from-brand-green to-brand-mint",
    },
  ];

  // Goals
  const goals = [
    { year: "2025", target: "100% PCR Plastic", status: "On Track" },
    { year: "2026", target: "Zero Waste Manufacturing", status: "In Progress" },
    { year: "2027", target: "Waterless Formulas", status: "Research" },
    { year: "2030", target: "Carbon Negative", status: "Planned" },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-green text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            Planet First
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Sustainability
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            At Glasskin, we believe that beautiful skin and a beautiful planet go hand in hand. We're committed to reducing our environmental impact at every stage — from formulation to delivery and beyond.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-mint/20 text-center"
              >
                <div className="text-brand-mint mb-3">{stat.icon}</div>
                <h3 className="font-rounded font-extrabold text-brand-text text-2xl mb-1">{stat.number}</h3>
                <p className="text-xs text-brand-text/50 uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Our <span className="text-brand-green">Commitment</span>
          </h2>
          
          <div className="bg-gradient-to-r from-brand-green/5 to-brand-mint/5 p-8 md:p-12 rounded-3xl shadow-play border-4 border-brand-green/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                  <strong className="text-brand-text font-bold">We recognize that the beauty industry has a significant environmental impact.</strong> From plastic waste to carbon emissions from manufacturing and shipping, the status quo is unsustainable.
                </p>
                <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                  That's why we've made sustainability a core pillar of Glasskin. It's not just about what we put in our bottles, but how those bottles are made, how they reach you, and what happens to them after use.
                </p>
                <p className="text-sm text-brand-text/60 leading-relaxed">
                  Our goal is simple: to prove that luxury beauty and environmental responsibility aren't mutually exclusive. In fact, we believe they should always go together.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20 p-8 rounded-2xl">
                <span className="text-6xl font-display text-brand-green/30">G</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Initiatives */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Our <span className="text-brand-blue">Initiatives</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl shadow-play border-4 border-brand-text/8 bg-gradient-to-br ${initiative.color}/10`}
              >
                <div className="text-brand-text mb-4">{initiative.icon}</div>
                <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-3">{initiative.title}</h3>
                <p className="text-sm text-brand-text/60 leading-relaxed">{initiative.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packaging Deep Dive */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Packaging <span className="text-brand-yellow">Deep Dive</span>
          </h2>
          
          <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-text/8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-brand-bg rounded-2xl">
                <Package className="w-12 h-12 text-brand-sky mx-auto mb-4" />
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Bottles</h3>
                <p className="text-sm text-brand-text/60">
                  50% Post-Consumer Recycled plastic. Fully recyclable. Working towards 100% PCR by 2025.
                </p>
              </div>
              <div className="text-center p-6 bg-brand-bg rounded-2xl">
                <Leaf className="w-12 h-12 text-brand-mint mx-auto mb-4" />
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Boxes</h3>
                <p className="text-sm text-brand-text/60">
                  FSC-certified paperboard. Soy-based inks. 100% recyclable and biodegradable.
                </p>
              </div>
              <div className="text-center p-6 bg-brand-bg rounded-2xl">
                <Recycle className="w-12 h-12 text-brand-green mx-auto mb-4" />
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Shipping</h3>
                <p className="text-sm text-brand-text/60">
                  Compostable mailers. Recycled filler. Carbon-neutral delivery partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supply Chain */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Ethical <span className="text-brand-magenta">Supply Chain</span>
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-pink/20">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="flex justify-center">
                  <Factory className="w-10 h-10 text-brand-pink" />
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Manufacturing</h3>
                  <p className="text-sm text-brand-text/60">
                    Our manufacturing partners adhere to strict environmental and ethical standards. We regularly audit their facilities to ensure fair labor practices and minimal environmental impact.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-cyan/20">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="flex justify-center">
                  <Truck className="w-10 h-10 text-brand-cyan" />
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Distribution</h3>
                  <p className="text-sm text-brand-text/60">
                    We work with logistics partners who share our commitment to sustainability. All our shipping within India is carbon-neutral, and we\'re expanding this globally.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-mint/20">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="flex justify-center">
                  <Recycle className="w-10 h-10 text-brand-mint" />
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">End of Life</h3>
                  <p className="text-sm text-brand-text/60">
                    We've established partnerships with recycling facilities across India to ensure our packaging has a second life. Our refill program incentivizes customers to return empty containers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Goals */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Our <span className="text-brand-accent">2030 Goals</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-text/8">
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-6">Sustainability Roadmap</h3>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 border-b border-brand-text/5 last:border-0">
                    <span className="font-bold text-brand-accent text-xl">{goal.year}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-brand-text">{goal.target}</p>
                      <p className="text-xs text-brand-text/40 uppercase tracking-widest">{goal.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-brand-peach/10 to-brand-citron/10 p-8 rounded-3xl border-4 border-brand-yellow/30">
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">Join Our Mission</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                Sustainability is a journey, and we\'re committed to continuous improvement. We regularly review our practices, set ambitious new targets, and publish transparent progress reports.
              </p>
              <p className="text-sm text-brand-text/60 leading-relaxed">
                Have questions or suggestions? We'd love to hear from you at <a href="mailto:sustainability@glasskin.in" className="text-brand-accent underline">sustainability@glasskin.in</a>
              </p>
            </div>
          </div>
        </section>

        {/* How You Can Help */}
        <section>
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            How You Can <span className="text-brand-green">Help</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-sky/20">
              <Recycle className="w-8 h-8 text-brand-sky mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Recycle Right</h3>
              <p className="text-sm text-brand-text/60">
                Clean and dry your empty Glasskin containers before recycling. Remove pumps and caps if your local facility requires it.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-mint/20">
              <Package className="w-8 h-8 text-brand-mint mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Refill & Return</h3>
              <p className="text-sm text-brand-text/60">
                Participate in our refill program. Return empty bottles to any Glasskin retailer for a discount on your next purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-green/20">
              <Trash2 className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Reduce Waste</h3>
              <p className="text-sm text-brand-text/60">
                Buy only what you need. Our multi-use products reduce the need for multiple single-purpose items.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-yellow/20">
              <Sun className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Conserve Energy</h3>
              <p className="text-sm text-brand-text/60">
                Store your Glasskin products in a cool, dry place away from direct sunlight to preserve their potency and reduce energy waste.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-pink/20">
              <Heart className="w-8 h-8 text-brand-pink mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Spread the Word</h3>
              <p className="text-sm text-brand-text/60">
                Share your Glasskin experience. The more people who choose sustainable beauty, the bigger our collective impact.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-cyan/20">
              <Leaf className="w-8 h-8 text-brand-cyan mb-3" />
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">Stay Informed</h3>
              <p className="text-sm text-brand-text/60">
                Follow us on social media for tips on sustainable living and updates on our latest sustainability initiatives.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

"use client";

import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export function LegalLayout({
  kicker,
  kickerColor = "bg-brand-mint",
  title,
  titleAccent,
  subtitle,
  children,
}: {
  kicker: string;
  kickerColor?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <span className={`sticker ${kickerColor} text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play`}>
          {kicker}
        </span>
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
          {title} {titleAccent && <span className="text-brand-magenta">{titleAccent}</span>}
        </h1>
        {subtitle && <p className="text-sm text-brand-text/60 leading-relaxed mb-10">{subtitle}</p>}

        <div className="space-y-6">
          {React.Children.map(children, (child) => (
            <section className="border border-brand-text/8 rounded-2xl p-6 bg-brand-bg shadow-play">
              {child}
            </section>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold mt-10">
          Last updated: 27 Aug 2026
        </p>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="heading-display text-brand-text text-lg md:text-xl mb-3">{title}</h2>
      <div className="text-sm text-brand-text/70 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

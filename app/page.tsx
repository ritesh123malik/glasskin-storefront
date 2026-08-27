"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import ProductCarousel from "@/components/sections/ProductCarousel";
import LogoMarquee from "@/components/sections/LogoMarquee";
import FeaturesMarquee from "@/components/ui/FeaturesMarquee";
import BrandStory from "@/components/sections/BrandStory";
import Testimonials from "@/components/sections/Testimonials";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

// Elegant reusable section fade-up animation wrapper
function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-x-hidden selection:bg-brand-accent/20 selection:text-brand-text">
        {/* 1. Sticky Header & Announcement Bar */}
        <Header />

        {/* 2. Hero Component */}
        <Hero />

        {/* 3. Product Carousel */}
        <FadeInSection>
          <ProductCarousel />
        </FadeInSection>

        {/* 4. Logo Marquee (As Seen In) */}
        <FadeInSection>
          <LogoMarquee />
        </FadeInSection>

        {/* 4.5. Features Marquee */}
        <FeaturesMarquee />

        {/* 5. Brand Story & Trust Badges */}
        <FadeInSection>
          <BrandStory />
        </FadeInSection>

        {/* 6. Testimonials Carousel */}
        <FadeInSection>
          <Testimonials />
        </FadeInSection>

        {/* 7. Social Proof UGC Strip */}
        <FadeInSection>
          <SocialProof />
        </FadeInSection>

        {/* 8. Luxury Editorial Footer */}
        <Footer />

        {/* Slide-in Cart Drawer (Activated on Header Cart click or Add to Bag) */}
        <CartDrawer />
    </div>
  );
}

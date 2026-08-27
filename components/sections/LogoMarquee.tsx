"use client";

import React from "react";

const logos = [
  {
    name: "VOGUE",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="35" fontFamily="Didot, Bodoni MT, serif" fontSize="28" fontWeight="bold" letterSpacing="4" textAnchor="middle">VOGUE</text>
      </svg>
    )
  },
  {
    name: "ELLE",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="35" fontFamily="Didot, Bodoni MT, serif" fontSize="28" fontWeight="normal" letterSpacing="8" textAnchor="middle">ELLE</text>
      </svg>
    )
  },
  {
    name: "BAZAAR",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="35" fontFamily="Didot, Bodoni MT, Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="3" textAnchor="middle">BAZAAR</text>
      </svg>
    )
  },
  {
    name: "VANITY FAIR",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="32" fontFamily="Georgia, Times New Roman, serif" fontSize="15" fontWeight="light" letterSpacing="5" textAnchor="middle">VANITY FAIR</text>
      </svg>
    )
  },
  {
    name: "GLAMOUR",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="34" fontFamily="Futura, Century Gothic, sans-serif" fontSize="22" fontWeight="bold" letterSpacing="3" textAnchor="middle">GLAMOUR</text>
      </svg>
    )
  },
  {
    name: "ALLURE",
    svg: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" fill="currentColor">
        <text x="50%" y="36" fontFamily="Playfair Display, serif" fontSize="26" fontStyle="italic" letterSpacing="1" textAnchor="middle">allure</text>
      </svg>
    )
  }
];

export default function LogoMarquee() {
  // Duplicate the array 3 times to ensure seamless infinite looping on wider displays
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-brand-yellow/30 border-y-4 border-brand-yellow/70 select-none overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes logo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-logo-marquee {
          animation: logo-marquee 30s linear infinite;
        }
        .animate-logo-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <span className="sticker bg-brand-text text-white text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
          Press Mentions
        </span>
        <h2 className="heading-display text-brand-text text-2xl md:text-3xl">
          Loved by 10,000+ Glow Devotees &amp; As Seen In
        </h2>
      </div>

      {/* Marquee Track Container */}
      <div className="w-full flex items-center relative py-4">
        {/* Soft fading edges overlay */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FFF3D6] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FFF3D6] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-full overflow-hidden">
          <div className="animate-logo-marquee flex items-center gap-16 md:gap-24 w-max">
            {marqueeLogos.map((logo, idx) => (
              <div 
                key={`${logo.name}-${idx}`} 
                className="w-28 md:w-36 h-12 text-brand-text/30 hover:text-brand-accent transition-colors duration-300 flex items-center justify-center cursor-pointer"
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

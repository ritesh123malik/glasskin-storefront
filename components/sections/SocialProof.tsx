"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Inline Instagram icon — lucide-react version bundled may not include it
function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

// TODO: replace with GLASSSKIN's actual product photography
const socialPhotos = [
  { id: 1, src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", alt: "Whipped barrier cream swirl texture" },
  { id: 2, src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", alt: "Radiant glass skin luminous glow close-up" },
  { id: 3, src: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80", alt: "Amber glass peptide dropper vial" },
  { id: 4, src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", alt: "Minimalist skincare morning ritual bottles" },
  { id: 5, src: "https://images.unsplash.com/photo-1512290903422-9218d6e326aa?auto=format&fit=crop&w=800&q=80", alt: "Botanical extracts and skincare ingredients" },
  { id: 6, src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80", alt: "Sunlit dewy skin glow ritual" },
  { id: 7, src: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80", alt: "Macro glass serum droplet reflecting light" },
  { id: 8, src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", alt: "Ceramide melting cream jar on linen" },
  { id: 9, src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80", alt: "Complete ritual set collection flatlay" },
];

// Triple the array for a seamless infinite loop
const marqueePhotos = [...socialPhotos, ...socialPhotos, ...socialPhotos];

export default function SocialProof() {
  return (
    <section className="py-20 bg-brand-citron/40 border-y-4 border-brand-yellow/70 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes social-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .social-track {
          animation: social-scroll 40s linear infinite;
        }
        /* Pause the whole track when any child tile is hovered */
        .social-track:hover {
          animation-play-state: paused;
        }
      ` }} />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="sticker bg-brand-accent text-white text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
            Community
          </span>
          <h2 className="heading-display text-brand-text text-3xl md:text-4xl">
            Tag{" "}
            <Link
              href="https://instagram.com/glassskin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-magenta hover:text-brand-blue transition-colors duration-200"
            >
              @glassskin
            </Link>
            {" "}<span className="text-brand-blue">For A Feature</span>
          </h2>
        </div>
        <Link
          href="https://instagram.com/glassskin"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-play bg-white text-brand-text border-4 border-brand-text px-6 py-3 text-[10px] self-start sm:self-auto"
        >
          <InstagramIcon size={14} />
          Follow Us
        </Link>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        {/* Soft fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="social-track flex gap-4 w-max">
            {marqueePhotos.map((photo, idx) => (
              <div
                key={`${photo.id}-${idx}`}
                className="
                  relative flex-none w-52 h-52 md:w-64 md:h-64
                  rounded overflow-hidden cursor-pointer
                  border border-brand-text/5
                  transition-transform duration-500 ease-out
                  hover:scale-105 hover:shadow-xl hover:z-10
                "
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 208px, 256px"
                />
                {/* Hover overlay with Instagram icon */}
                <div className="absolute inset-0 bg-brand-text/0 hover:bg-brand-text/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <InstagramIcon size={28} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

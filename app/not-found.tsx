import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-brand-pink/30 blur-3xl" />
      </div>

      {/* 404 big number */}
      <div
        className="font-display text-[clamp(6rem,25vw,18rem)] leading-none font-black text-brand-text/8 select-none mb-0 relative z-0"
        aria-hidden="true"
      >
        404
      </div>

      {/* Content card */}
      <div className="relative z-10 -mt-8 md:-mt-16 flex flex-col items-center gap-5">
        <span className="sticker bg-brand-yellow text-brand-text -rotate-2 shadow-btn">
          Page Not Found
        </span>
        <h1 className="heading-section text-brand-text"
            style={{ fontSize: "var(--type-h2)" }}>
          Formulation{" "}
          <span className="text-brand-magenta underline-squiggle">uncharted</span>
        </h1>
        <p className="font-rounded text-sm md:text-base text-brand-text/55 font-medium max-w-sm leading-relaxed">
          The ritual you&apos;re looking for doesn&apos;t exist or has been relocated.
          Let&apos;s get you back to the good stuff.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link
            href="/shop"
            className="btn-play bg-brand-accent text-white text-[0.7rem] px-8 py-4"
          >
            Explore Shop
          </Link>
          <Link
            href="/"
            className="btn-play bg-white text-brand-text border-brand-text text-[0.7rem] px-8 py-4"
          >
            <ArrowLeft size={14} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

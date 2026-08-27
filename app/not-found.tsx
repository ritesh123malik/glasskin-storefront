import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-6">
        <Sparkles size={32} />
      </div>
      <span className="sticker bg-brand-yellow text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
        404 — Page Not Found
      </span>
      <h1 className="heading-display text-brand-text text-4xl md:text-6xl mb-4">
        Formulation <span className="text-brand-magenta">uncharted</span>
      </h1>
      <p className="font-rounded text-sm text-brand-text/60 font-semibold max-w-md leading-snug mb-8">
        The ritual or glow you are seeking does not exist or has been relocated.
      </p>

      <Link
        href="/shop"
        className="btn-play-solid bg-brand-accent px-8 py-3.5 text-[11px]"
      >
        <ArrowLeft size={16} />
        Explore Shop
      </Link>
    </div>
  );
}

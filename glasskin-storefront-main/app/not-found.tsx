import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-6">
        <Sparkles size={32} />
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-2">
        404 — Page Not Found
      </span>
      <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-4">
        Formulation Uncharted
      </h1>
      <p className="text-xs text-brand-text/60 max-w-md leading-relaxed mb-8">
        The ritual or formulation page you are seeking does not exist or has been relocated.
      </p>

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 bg-brand-accent text-brand-bg hover:bg-brand-secondary px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300 shadow"
      >
        <ArrowLeft size={14} />
        Explore Shop
      </Link>
    </div>
  );
}

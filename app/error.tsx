"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <span className="sticker bg-brand-pink text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
        Something went wrong
      </span>
      <h1 className="heading-display text-brand-text text-4xl md:text-5xl mb-4">
        Oops, we spilled the serum!
      </h1>
      <p className="text-xs text-brand-text/60 max-w-md leading-relaxed mb-8">
        We encountered an unexpected error while preparing your ritual experience. Please try refreshing or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="btn-play-solid bg-brand-accent px-6 py-3 text-[11px]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-brand-text/20 hover:border-brand-text px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300"
        >
          <Home size={14} />
          Return Home
        </Link>
      </div>
    </div>
  );
}

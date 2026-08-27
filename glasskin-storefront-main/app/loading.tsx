import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-text/80 animate-pulse">
          GLASSSKIN
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-brand-accent/80 font-medium">
          Preparing Formulations...
        </span>
      </div>
    </div>
  );
}

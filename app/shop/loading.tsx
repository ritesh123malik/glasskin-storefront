import React from "react";

export default function ShopSkeletonLoading() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      {/* Header Skeleton */}
      <div className="border-b border-brand-text/5 py-14 px-6 md:px-12 animate-pulse">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="h-3 w-20 bg-brand-text/10 rounded" />
          <div className="h-10 w-72 bg-brand-text/10 rounded" />
          <div className="h-4 w-96 bg-brand-text/10 rounded" />
        </div>
      </div>

      {/* Filter Skeleton */}
      <div className="border-b border-brand-text/5 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-24 bg-brand-text/10 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-4 animate-pulse">
            <div className="aspect-[4/5] bg-brand-text/10 rounded-md" />
            <div className="h-3 w-1/3 bg-brand-text/10 rounded" />
            <div className="h-4 w-3/4 bg-brand-text/10 rounded" />
            <div className="h-8 w-full bg-brand-text/10 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}

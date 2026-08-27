import React from "react";

export default function ProductDetailSkeletonLoading() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-brand-text/10 rounded-lg" />
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-brand-text/10 rounded" />
              <div className="w-20 h-20 bg-brand-text/10 rounded" />
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="space-y-6">
            <div className="h-4 w-24 bg-brand-text/10 rounded" />
            <div className="h-10 w-3/4 bg-brand-text/10 rounded" />
            <div className="h-6 w-32 bg-brand-text/10 rounded" />
            <div className="h-20 w-full bg-brand-text/10 rounded" />
            <div className="h-12 w-full bg-brand-text/10 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}

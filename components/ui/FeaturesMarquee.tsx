"use client";

import React from "react";

export default function FeaturesMarquee() {
  const features = [
    "Dermatologist Tested",
    "Clean Formulas",
    "Cruelty-Free",
    "Made in Small Batches",
    "Dermatologist Tested",
    "Clean Formulas",
    "Cruelty-Free",
    "Made in Small Batches",
  ];

  return (
    <section className="w-full bg-brand-blue text-white py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <span className="text-sm md:text-base font-extrabold uppercase tracking-wider px-6 py-2">
              {feature}
            </span>
            {index < features.length - 1 && (
              <span className="text-sm md:text-base px-2">✦</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

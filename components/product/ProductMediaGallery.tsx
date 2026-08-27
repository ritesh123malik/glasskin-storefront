"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Media = { id: string; url: string; alt_text: string | null; media_type: string };

export default function ProductMediaGallery({ images, name }: { images: Media[]; name: string }) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  function prev() { setActive((a) => (a === 0 ? images.length - 1 : a - 1)); }
  function next() { setActive((a) => (a === images.length - 1 ? 0 : a + 1)); }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-brand-text/5 rounded-sm overflow-hidden group">
        <Image
          src={images[active].url}
          alt={images[active].alt_text ?? name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                i === active ? "border-brand-accent" : "border-transparent"
              }`}
            >
              <Image src={img.url} alt={img.alt_text ?? name} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

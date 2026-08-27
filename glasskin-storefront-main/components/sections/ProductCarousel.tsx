"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/products";
import { getProductsFromSupabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";

export default function ProductCarousel() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsFromSupabase().then((data) => setProducts(data));
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    loop: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="shop-carousel" className="py-24 px-6 md:px-12 bg-brand-bg border-b border-brand-text/5 select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Controls */}
        <div className="flex items-end justify-between mb-12">
          <div className="text-left">
            <span className="text-[10px] text-brand-accent uppercase tracking-[0.25em] font-semibold block mb-2">
              Signature Rituals
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide">
              Shop by Formulation
            </h2>
          </div>

          {/* Embla Controls (Prev/Next + Counter) */}
          <div className="flex items-center gap-6">
            {/* Counter */}
            <div className="text-xs uppercase tracking-widest font-medium text-brand-text/50">
              <span className="text-brand-text font-bold">{selectedIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{scrollSnaps.length}</span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className={`p-2 rounded-full border border-brand-text/10 flex items-center justify-center transition-colors ${
                  prevBtnDisabled 
                    ? "opacity-30 cursor-not-allowed" 
                    : "hover:border-brand-text hover:text-brand-accent text-brand-text"
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className={`p-2 rounded-full border border-brand-text/10 flex items-center justify-center transition-colors ${
                  nextBtnDisabled 
                    ? "opacity-30 cursor-not-allowed" 
                    : "hover:border-brand-text hover:text-brand-accent text-brand-text"
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Embla Viewport (supports ArrowLeft and ArrowRight keyboard navigation) */}
        <div 
          className="embla overflow-hidden focus:outline-none focus:ring-1 focus:ring-brand-accent/50 rounded" 
          ref={emblaRef}
          tabIndex={0}
          role="region"
          aria-label="Product carousel"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollPrev();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollNext();
            }
          }}
        >
          <div className="embla__container flex gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="embla__slide flex-none w-[78vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18.2vw] flex flex-col group relative"
              >
                {/* Images Wrapper — clicking navigates to PDP */}
                <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] rounded overflow-hidden mb-4 bg-brand-text/5 border border-brand-text/5">
                  
                  {/* Default Image */}
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 30vw, 20vw"
                    className={`object-cover transition-all duration-700 ease-in-out group-hover:opacity-0 ${
                      !product.inStock ? "grayscale opacity-60" : ""
                    }`}
                  />

                  {/* Hover Image */}
                  <Image 
                    src={product.hoverImage}
                    alt={`${product.name} texture and lifestyle swatch`}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 30vw, 20vw"
                    className={`object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 ${
                      !product.inStock ? "grayscale opacity-0" : ""
                    }`}
                  />

                  {/* Sold Out Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-text/5">
                      <span className="bg-brand-text text-brand-bg text-[9px] font-bold uppercase tracking-[0.25em] py-2 px-4 rounded-sm shadow-md">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                </Link>

                {/* Info */}
                <div className="text-left flex-grow flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-brand-text/40 font-semibold">
                      {product.category}
                    </span>
                    <span className="text-xs font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link href={`/product/${product.id}`}>
                  <h3 className="font-serif text-sm font-light tracking-wide text-brand-text group-hover:text-brand-accent transition-colors leading-relaxed mb-3">
                    {product.name}
                  </h3>
                  </Link>

                  {/* Quick Add Button or Sold Out state */}
                  <button 
                    disabled={!product.inStock}
                    onClick={() => product.inStock && addItem(product)}
                    className={`mt-auto w-full py-2.5 text-[9px] uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 ${
                      product.inStock
                        ? "bg-brand-text text-brand-bg hover:bg-brand-accent active:scale-[0.99]"
                        : "bg-brand-text/5 text-brand-text/30 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Bag" : "Temporarily Sold Out"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop All Button Below */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex bg-brand-accent text-brand-bg hover:bg-brand-secondary hover:-translate-y-0.5 px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded transition-all duration-300 shadow-sm flex items-center gap-2 group"
          >
            Shop All Formulations
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

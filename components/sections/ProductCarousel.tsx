"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/lib/products";
import { getProductsFromSupabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";

/* ── Color map: each product category gets its own candy card accent ── */
const categoryColors: Record<string, { bg: string; btn: string; tag: string }> = {
  cleanser:     { bg: "bg-brand-sky/20",    btn: "bg-brand-sky",    tag: "bg-brand-sky"    },
  serum:        { bg: "bg-brand-mint/20",   btn: "bg-brand-mint",   tag: "bg-brand-mint"   },
  moisturizer:  { bg: "bg-brand-pink/30",   btn: "bg-brand-pink",   tag: "bg-brand-pink"   },
  spf:          { bg: "bg-brand-yellow/30", btn: "bg-brand-yellow", tag: "bg-brand-yellow" },
  "gift-set":   { bg: "bg-brand-lilac/30",  btn: "bg-brand-lilac",  tag: "bg-brand-lilac"  },
};
function getColors(category = "") {
  const key = Object.keys(categoryColors).find((k) =>
    category.toLowerCase().includes(k)
  );
  return categoryColors[key ?? ""] ?? { bg: "bg-brand-peach/30", btn: "bg-brand-peach", tag: "bg-brand-peach" };
}

export default function ProductCarousel() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getProductsFromSupabase().then((data) => setProducts(data));
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    loop: false,
    dragFree: true,
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIdx(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
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

  const toggleWishlist = (id: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section
      id="shop-carousel"
      className="py-20 md:py-28 bg-brand-bg border-b-[3px] border-brand-text/8 overflow-hidden"
      aria-label="Featured products"
    >
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="sticker bg-brand-pink text-brand-text -rotate-2 mb-4 inline-flex">
              Signature Rituals
            </span>
            <h2 className="heading-section text-brand-text"
                style={{ fontSize: "var(--type-h2)" }}>
              Shop your{" "}
              <span className="text-brand-magenta underline-squiggle">
                daily
              </span>{" "}
              rotation
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-rounded font-bold text-brand-text/40 uppercase tracking-widest">
              <span className="text-brand-text font-extrabold">{selectedIdx + 1}</span>
              {" / "}
              {scrollSnaps.length || "—"}
            </span>
            <div className="flex gap-2">
              {[
                { fn: scrollPrev, disabled: prevDisabled, label: "Previous" },
                { fn: scrollNext, disabled: nextDisabled, label: "Next"     },
              ].map(({ fn, disabled, label }, i) => (
                <button
                  key={label}
                  onClick={fn}
                  disabled={disabled}
                  aria-label={`${label} slide`}
                  className={`w-10 h-10 rounded-full border-[3px] border-brand-text flex items-center justify-center transition-all duration-150 ${
                    disabled
                      ? "opacity-25 cursor-not-allowed"
                      : "hover:bg-brand-yellow hover:shadow-btn"
                  }`}
                >
                  {i === 0
                    ? <ChevronLeft  size={16} strokeWidth={3} />
                    : <ChevronRight size={16} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Embla carousel ── */}
        <div
          ref={emblaRef}
          className="overflow-hidden"
          role="region"
          aria-label="Product carousel — swipe or use arrow keys"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft")  { e.preventDefault(); scrollPrev(); }
            if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
          }}
        >
          <div className="flex gap-4 md:gap-5">
            {products.map((product) => {
              const colors = getColors(product.category);
              const wished  = wishlistedIds.has(product.id);

              return (
                <article
                  key={product.id}
                  className="embla__slide flex-none w-[72vw] xs:w-[58vw] sm:w-[42vw] md:w-[30vw] lg:w-[22vw] xl:w-[19vw] 2xl:w-[16vw] flex flex-col group"
                >
                  {/* Product image */}
                  <Link
                    href={`/product/${product.id}`}
                    className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-brand-text mb-4 block ${colors.bg}`}
                    aria-label={`View ${product.name}`}
                  >
                    {/* Default image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 22vw"
                      className={`object-cover transition-opacity duration-500 group-hover:opacity-0 ${
                        !product.inStock ? "grayscale opacity-50" : ""
                      }`}
                    />
                    {/* Hover image */}
                    <Image
                      src={product.hoverImage}
                      alt={`${product.name} — texture view`}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 22vw"
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Sold out overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="sticker bg-brand-text text-brand-bg rotate-3 text-[0.6rem]">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full border-[2.5px] border-brand-text flex items-center justify-center transition-all duration-150 ${
                        wished
                          ? "bg-brand-magenta text-white"
                          : "bg-white text-brand-text hover:bg-brand-pink"
                      }`}
                    >
                      <Heart size={13} fill={wished ? "currentColor" : "none"} />
                    </button>
                  </Link>

                  {/* Product info */}
                  <div className="flex flex-col flex-grow px-0.5">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`sticker ${colors.tag} text-brand-text text-[0.55rem] px-2.5 py-1`}>
                        {product.category}
                      </span>
                      {product.inStock && (
                        <span className="text-[0.55rem] font-extrabold text-brand-text/40 uppercase tracking-wider font-rounded">
                          In Stock
                        </span>
                      )}
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-rounded font-extrabold text-sm md:text-base text-brand-text group-hover:text-brand-blue transition-colors leading-snug mb-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="font-display text-lg font-black text-brand-text">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        disabled={!product.inStock}
                        onClick={() => product.inStock && addItem(product)}
                        aria-label={product.inStock ? `Add ${product.name} to bag` : "Out of stock"}
                        className={`btn-play text-[0.6rem] px-4 py-2.5 gap-1.5 ${
                          product.inStock
                            ? `${colors.btn} text-brand-text`
                            : "bg-brand-text/8 text-brand-text/30 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0"
                        }`}
                      >
                        <ShoppingBag size={12} />
                        {product.inStock ? "Add" : "N/A"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Dot pagination ── */}
        {scrollSnaps.length > 1 && (
          <div className="flex gap-2 justify-center mt-8" aria-label="Carousel pagination">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIdx
                    ? "w-6 bg-brand-accent"
                    : "w-2 bg-brand-text/20 hover:bg-brand-text/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* ── Shop All CTA ── */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/shop"
            className="btn-play bg-brand-blue text-white text-xs px-10 py-4"
          >
            Shop All Formulations
            <ChevronRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}

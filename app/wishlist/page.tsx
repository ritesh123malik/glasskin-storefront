"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, Check, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

/* ── Accent colors for each wishlist row ── */
const rowColors = [
  "bg-brand-sky/20",
  "bg-brand-mint/20",
  "bg-brand-pink/20",
  "bg-brand-yellow/20",
  "bg-brand-lilac/20",
];

export default function WishlistPage() {
  const { items, removeItem, totalItems } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleAddToCart(item: (typeof items)[0]) {
    addItem({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      category: "",
      description: "",
      hoverImage: item.image,
      inStock: true,
      features: [],
    });
    setAddedIds((prev) => new Set(prev).add(item.productId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.productId);
        return next;
      });
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="pt-24 pb-32" id="main-content">
        {/* ── Page hero band ── */}
        <div className="bg-brand-pink/40 border-b-[3px] border-brand-text/10 py-14 md:py-20 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="sticker bg-brand-magenta text-white -rotate-2 mb-5 inline-flex shadow-btn">
              Your Wishlist
            </span>
            <h1 className="heading-section text-brand-text mt-3"
                style={{ fontSize: "var(--type-h2)" }}>
              Saved for{" "}
              <span className="text-brand-magenta underline-squiggle">later</span>
            </h1>
            {totalItems > 0 && (
              <p className="font-rounded text-sm font-extrabold text-brand-text/50 mt-3 uppercase tracking-wide">
                {totalItems} item{totalItems !== 1 ? "s" : ""} saved
              </p>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 mt-12">
          {totalItems === 0 ? (
            /* ── Empty state ── */
            <div className="text-center py-24 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-full border-[3px] border-brand-text/15 flex items-center justify-center">
                <Heart size={32} className="text-brand-text/20" />
              </div>
              <div>
                <p className="font-rounded font-extrabold text-base text-brand-text/45 mb-1">
                  Your wishlist is empty
                </p>
                <p className="text-sm text-brand-text/35 font-rounded">
                  Save products you love and come back to them anytime.
                </p>
              </div>
              <Link
                href="/shop"
                className="btn-play bg-brand-accent text-white text-[0.7rem] px-8 py-3.5"
              >
                Browse Products
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            /* ── Wishlist items ── */
            <div className="flex flex-col gap-4">
              {items.map((item, i) => {
                const isAdded = addedIds.has(item.productId);
                return (
                  <div
                    key={item.productId}
                    className={`flex gap-4 md:gap-5 items-center rounded-2xl border-[3px] border-brand-text p-4 md:p-5 ${rowColors[i % rowColors.length]} shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover`}
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border-[2.5px] border-brand-text/20"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-rounded font-extrabold text-sm md:text-base text-brand-text hover:text-brand-blue transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="font-display text-base font-black text-brand-text mt-0.5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded}
                        aria-label={isAdded ? "Added to bag" : `Add ${item.name} to bag`}
                        className={`btn-play text-[0.6rem] px-4 py-2.5 gap-1.5 ${
                          isAdded
                            ? "bg-brand-green text-white border-brand-green"
                            : "bg-brand-accent text-white border-brand-accent hover:bg-brand-magenta hover:border-brand-magenta"
                        }`}
                      >
                        {isAdded
                          ? <><Check size={11} />Added</>
                          : <><ShoppingBag size={11} />Add</>
                        }
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name} from wishlist`}
                        className="w-9 h-9 rounded-full border-[2.5px] border-brand-text/20 flex items-center justify-center text-brand-text/45 hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-150"
                      >
                        <X size={13} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* CTA to continue shopping */}
              <div className="mt-6 pt-6 border-t-2 border-brand-text/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm font-rounded font-extrabold text-brand-text/45">
                  Want to find more?
                </p>
                <Link
                  href="/shop"
                  className="btn-play bg-brand-yellow text-brand-text text-[0.65rem] px-7 py-3"
                >
                  Keep Shopping
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

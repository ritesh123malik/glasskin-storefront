"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export default function WishlistPage() {
  const { items, removeItem, totalItems } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleAddToCart(item: (typeof items)[0]) {
    addItem({ id: item.productId, name: item.name, price: item.price, image: item.image, category: "", description: "", hoverImage: item.image, inStock: true, features: [] });
    setAddedIds((prev) => new Set(prev).add(item.productId));
    setTimeout(() => setAddedIds((prev) => { const next = new Set(prev); next.delete(item.productId); return next; }), 1800);
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <span className="sticker bg-brand-pink text-brand-text text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">Your Wishlist</span>
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-10">Saved for <span className="text-brand-magenta">later</span></h1>

        {totalItems === 0 ? (
          <div className="text-center py-20">
            <Heart size={40} className="mx-auto text-brand-text/20 mb-4" />
            <p className="text-sm text-brand-text/50 mb-6">Your wishlist is empty.</p>
            <Link href="/shop" className="btn-play-solid bg-brand-accent px-8 py-3.5 text-[11px]">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-6 border-b border-brand-text/5 pb-6">
                <Link href={`/product/${item.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-brand-text/5">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-rounded text-base font-extrabold tracking-wide hover:text-brand-blue transition-colors truncate">{item.name}</h3>
                  </Link>
                  <p className="text-sm font-semibold mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addedIds.has(item.productId)}
                      className="flex items-center gap-1.5 bg-brand-accent text-white px-4 py-2 text-[10px] uppercase tracking-widest font-extrabold font-rounded rounded-full shadow-play hover:bg-brand-magenta hover:-translate-y-0.5 transition-all disabled:opacity-60"
                    >
                      <ShoppingBag size={12} />
                      {addedIds.has(item.productId) ? "Added" : "Add to Bag"}
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-brand-text/40 hover:text-red-600 transition-colors p-2"
                      aria-label="Remove from wishlist"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

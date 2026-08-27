"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import { mockCategories, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "@/components/ui/CartDrawer";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] rounded overflow-hidden mb-4 bg-brand-text/5 border border-brand-text/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className={`object-cover transition-all duration-700 ease-in-out ${hovered ? "opacity-0" : "opacity-100"} ${!product.inStock ? "grayscale opacity-60" : ""}`}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} — lifestyle texture`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className={`object-cover transition-all duration-700 ease-in-out ${hovered ? "opacity-100" : "opacity-0"} ${!product.inStock ? "grayscale opacity-0" : ""}`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-text/5">
              <span className="bg-brand-text text-brand-bg text-[9px] font-bold uppercase tracking-[0.25em] py-2 px-4 rounded-sm shadow-md">
                Sold Out
              </span>
            </div>
          )}
          <div className={`absolute inset-x-0 bottom-0 py-3 flex items-center justify-center bg-brand-bg/90 backdrop-blur-sm transition-all duration-300 ${hovered && product.inStock ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-brand-text">View Details →</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col flex-grow text-left">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] uppercase tracking-wider text-brand-text/40 font-semibold">{product.category}</span>
          <span className="text-xs font-semibold text-brand-text">₹{product.price.toLocaleString("en-IN")}</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-rounded text-base font-extrabold tracking-wide text-brand-text hover:text-brand-blue transition-colors leading-snug mb-3">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 2).map((f) => (
            <span key={f} className="text-[8px] uppercase tracking-wider text-brand-text/70 bg-brand-pink/60 border-2 border-brand-text/10 px-2 py-0.5 rounded-full font-extrabold font-rounded">
              {f}
            </span>
          ))}
        </div>
        <button
          disabled={!product.inStock}
          onClick={handleAdd}
          className={`mt-auto w-full py-3 text-[10px] uppercase tracking-[0.15em] font-extrabold font-rounded rounded-full transition-all duration-300 ${
            !product.inStock
              ? "bg-brand-text/5 text-brand-text/30 cursor-not-allowed"
              : added
              ? "bg-brand-magenta text-white scale-[0.98]"
              : "bg-brand-accent text-white hover:bg-brand-magenta hover:-translate-y-0.5 shadow-play active:scale-[0.99]"
          }`}
        >
          {!product.inStock ? "Sold Out" : added ? "✓ Added to Bag" : "Add to Bag"}
        </button>
      </div>
    </article>
  );
}

const FILTER_CATEGORIES = [
  { id: "all", name: "All Products" },
  ...mockCategories,
  { id: "toners", name: "Toners" },
];

function FilterBar({ active, onChange }: { active: string; onChange: (cat: string) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTER_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold rounded-full border transition-all duration-200 ${
            active === cat.id
              ? "bg-brand-text text-brand-bg border-brand-text"
              : "bg-transparent text-brand-text border-brand-text/20 hover:border-brand-text"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

function ShopContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawCategory = searchParams.get("category") ?? "all";
  const [activeFilter, setActiveFilter] = useState(rawCategory);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => { setActiveFilter(rawCategory); }, [rawCategory]);

  function handleFilterChange(catId: string) {
    setActiveFilter(catId);
    const params = new URLSearchParams(searchParams.toString());
    if (catId === "all") { params.delete("category"); } else { params.set("category", catId); }
    router.replace(`/shop${params.toString() ? "?" + params.toString() : ""}`, { scroll: false });
  }

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === activeFilter);

  const activeLabel =
    activeFilter === "all"
      ? "All Products"
      : (FILTER_CATEGORIES.find((c) => c.id === activeFilter)?.name ?? activeFilter);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      <div className="border-b border-brand-text/5 py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="sticker bg-brand-yellow text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">The Edit</span>
          <h1 className="heading-display text-brand-text text-5xl md:text-7xl mb-4">Shop the <span className="text-brand-accent">good stuff</span></h1>
          <p className="font-rounded text-base md:text-lg text-brand-text/70 font-semibold max-w-lg leading-snug">Each formula is a study in restraint — only what your skin needs, nothing it doesn&apos;t. All the tasty, none of the FOMO.</p>
        </div>
      </div>

      <div className="sticky top-[57px] z-30 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-text/5 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block flex-1">
            <FilterBar active={activeFilter} onChange={handleFilterChange} />
          </div>
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="text-xs font-semibold uppercase tracking-widest">
              {activeLabel}
              {activeFilter !== "all" && <span className="ml-2 text-brand-text/40">({filteredProducts.length})</span>}
            </span>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold border border-brand-text/20 rounded-full px-3 py-1.5 hover:border-brand-text transition-colors"
              aria-label="Open category filters"
            >
              <SlidersHorizontal size={12} />
              Filter
            </button>
          </div>
          <span className="hidden md:block text-[10px] uppercase tracking-widest text-brand-text/40 whitespace-nowrap shrink-0">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-brand-bg z-50 rounded-t-2xl p-6 pb-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold uppercase tracking-widest">Filter by Category</span>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:text-brand-accent transition-colors" aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              <FilterBar active={activeFilter} onChange={(cat) => { handleFilterChange(cat); setMobileFiltersOpen(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4">
              <ShoppingBag size={36} className="text-brand-text/20" />
              <p className="text-sm text-brand-text/40 uppercase tracking-widest font-extrabold font-rounded">No products in this category yet</p>
              <button onClick={() => handleFilterChange("all")}
                className="btn-play bg-white border-4 border-brand-text text-brand-text px-5 py-2 text-[10px] mt-2 hover:bg-brand-yellow">
                View All
              </button>
            </motion.div>
          ) : (
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
              {filteredProducts.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ShopClient({ initialProducts, catalogError }: { initialProducts: Product[]; catalogError?: string }) {
  if (catalogError) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold mb-3">Catalog unavailable</p>
            <h1 className="heading-display text-brand-text text-3xl mb-4">We could not load the shop</h1>
            <p className="text-sm text-brand-text/60 max-w-md">{catalogError}</p>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <ShopContent products={initialProducts} />
        </Suspense>
        <Footer />
        <CartDrawer />
    </div>
  );
}

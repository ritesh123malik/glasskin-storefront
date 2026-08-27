"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ShoppingBag, Heart, Check } from "lucide-react";
import { mockCategories, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "@/components/ui/CartDrawer";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/* ── Category color map ── */
const catColors: Record<string, string> = {
  all:           "bg-brand-yellow text-brand-text border-brand-text",
  cleansers:     "bg-brand-sky    text-brand-text border-brand-text",
  serums:        "bg-brand-mint   text-brand-text border-brand-text",
  moisturizers:  "bg-brand-pink   text-brand-text border-brand-text",
  spf:           "bg-brand-citron text-brand-text border-brand-text",
  "gift-sets":   "bg-brand-lilac  text-brand-text border-brand-text",
};

const imgBgs: Record<string, string> = {
  cleanser:     "bg-brand-sky/20",
  serum:        "bg-brand-mint/20",
  moisturizer:  "bg-brand-pink/25",
  spf:          "bg-brand-yellow/25",
  "gift-set":   "bg-brand-lilac/25",
};
function getImgBg(cat = "") {
  const k = Object.keys(imgBgs).find((k) => cat.toLowerCase().includes(k));
  return imgBgs[k ?? ""] ?? "bg-brand-peach/20";
}

/* ── Product Card ── */
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock || added) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="group flex flex-col" aria-label={product.name}>
      {/* Image block */}
      <Link href={`/product/${product.id}`} className="block relative mb-4">
        <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-brand-text ${getImgBg(product.category)}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            className={`object-cover transition-opacity duration-500 group-hover:opacity-0 ${!product.inStock ? "grayscale opacity-50" : ""}`}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} — detail view`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Sold out badge */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="sticker bg-brand-text text-brand-bg rotate-3 text-[0.55rem]">Sold Out</span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full border-[2.5px] border-brand-text flex items-center justify-center transition-all duration-150 ${
              wished ? "bg-brand-magenta text-white border-brand-magenta" : "bg-white text-brand-text hover:bg-brand-pink"
            }`}
          >
            <Heart size={12} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        {/* Category tag */}
        <span className={`sticker ${catColors[product.category?.toLowerCase().replace(/\s+/g, "-")] ?? "bg-brand-peach text-brand-text"} text-[0.55rem] mb-2 self-start`}>
          {product.category}
        </span>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-rounded font-extrabold text-sm md:text-base text-brand-text group-hover:text-brand-blue transition-colors leading-snug mb-1.5">
            {product.name}
          </h3>
        </Link>

        {/* Feature pills */}
        {product.features?.slice(0, 2).map((f) => (
          <span
            key={f}
            className="inline-block text-[0.55rem] uppercase tracking-wide font-rounded font-extrabold text-brand-text/55 mb-0.5"
          >
            · {f}
          </span>
        ))}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 gap-2">
          <span className="font-display text-lg font-black text-brand-text leading-none">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            disabled={!product.inStock}
            onClick={handleAdd}
            aria-label={product.inStock ? `Add ${product.name} to bag` : "Sold out"}
            className={`btn-play text-[0.6rem] px-4 py-2.5 gap-1 min-w-[5.5rem] justify-center ${
              !product.inStock
                ? "bg-brand-text/8 text-brand-text/30 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0 border-brand-text/10"
                : added
                ? "bg-brand-green text-white border-brand-green"
                : "bg-brand-accent text-white hover:bg-brand-magenta border-brand-accent hover:border-brand-magenta"
            }`}
          >
            {added
              ? <><Check size={11} /> Added</>
              : <><ShoppingBag size={11} /> {product.inStock ? "Add" : "N/A"}</>
            }
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Filter bar ── */
const FILTERS = [
  { id: "all",          name: "All Products" },
  ...mockCategories,
  { id: "toners",       name: "Toners"       },
];

function FilterBar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Category filters">
      {FILTERS.map((f) => {
        const isActive = active === f.id;
        const colorClass = catColors[f.id] ?? "bg-brand-peach text-brand-text border-brand-text";
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            aria-pressed={isActive}
            className={`px-4 py-1.5 text-[0.6rem] uppercase tracking-widest font-extrabold font-rounded rounded-full border-[2.5px] transition-all duration-150 ${
              isActive
                ? `${colorClass} shadow-btn`
                : "bg-transparent text-brand-text border-brand-text/20 hover:border-brand-text/60"
            }`}
          >
            {f.name}
          </button>
        );
      })}
    </div>
  );
}

/* ── Shop content ── */
function ShopContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawCat = searchParams.get("category") ?? "all";
  const [active, setActive] = useState(rawCat);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setActive(rawCat); }, [rawCat]);

  function changeFilter(id: string) {
    setActive(id);
    const p = new URLSearchParams(searchParams.toString());
    id === "all" ? p.delete("category") : p.set("category", id);
    router.replace(`/shop${p.toString() ? "?" + p.toString() : ""}`, { scroll: false });
  }

  const filtered = active === "all"
    ? products
    : products.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === active);

  const activeLabel = FILTERS.find((f) => f.id === active)?.name ?? active;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32" id="main-content">

      {/* ── Shop hero band ── */}
      <div className="bg-brand-yellow border-b-[3px] border-brand-text py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="sticker bg-brand-accent text-white -rotate-2 mb-5 inline-flex shadow-btn">
            The Edit
          </span>
          <h1 className="heading-section text-brand-text mb-4"
              style={{ fontSize: "var(--type-h2)" }}>
            Shop the{" "}
            <span className="text-brand-magenta">good stuff</span>
          </h1>
          <p className="font-rounded text-base md:text-lg text-brand-text/70 font-semibold max-w-lg leading-snug">
            Each formula is a study in restraint — only what your skin needs,
            nothing it doesn&apos;t.
          </p>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[57px] z-30 bg-brand-bg/97 backdrop-blur-sm border-b-[3px] border-brand-text/10 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Desktop filters */}
          <div className="hidden md:block flex-1">
            <FilterBar active={active} onChange={changeFilter} />
          </div>

          {/* Mobile filter toggle */}
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="text-xs font-rounded font-extrabold uppercase tracking-widest">
              {activeLabel}
              {active !== "all" && (
                <span className="ml-2 text-brand-text/40">({filtered.length})</span>
              )}
            </span>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open filters"
              aria-expanded={mobileOpen}
              className="btn-play bg-white text-brand-text border-brand-text text-[0.6rem] px-4 py-2"
            >
              <SlidersHorizontal size={12} />
              Filter
            </button>
          </div>

          <span className="hidden md:block text-[0.6rem] uppercase tracking-widest text-brand-text/40 shrink-0 font-rounded font-extrabold">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Mobile filter sheet ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-brand-text z-[60] cursor-pointer"
              aria-label="Close filters"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 bg-brand-bg z-[70] rounded-t-3xl border-t-[3px] border-brand-text p-6 pb-10 shadow-2xl"
            >
              <div className="w-10 h-1.5 bg-brand-text/20 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-rounded font-extrabold uppercase tracking-widest">Filter</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              <FilterBar
                active={active}
                onChange={(id) => { changeFilter(id); setMobileOpen(false); }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Product grid ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-5"
            >
              <ShoppingBag size={40} className="text-brand-text/20" />
              <p className="text-sm font-rounded font-extrabold uppercase tracking-widest text-brand-text/40">
                No products in this category yet
              </p>
              <button
                onClick={() => changeFilter("all")}
                className="btn-play bg-brand-yellow text-brand-text text-[0.65rem] px-6 py-3"
              >
                View All
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
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

/* ── Shell export ── */
export default function ShopClient({
  initialProducts,
  catalogError,
}: {
  initialProducts: Product[];
  catalogError?: string;
}) {
  if (catalogError) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text">
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-6 text-center">
          <div>
            <span className="sticker bg-brand-red text-white mb-4 inline-flex">
              Shop Unavailable
            </span>
            <h1 className="heading-section text-brand-text mt-4 mb-3 text-3xl">
              We couldn&apos;t load the shop
            </h1>
            <p className="text-sm text-brand-text/55 max-w-md font-rounded">{catalogError}</p>
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

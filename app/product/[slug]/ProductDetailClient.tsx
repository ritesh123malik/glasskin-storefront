"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import CartDrawer from "@/components/ui/CartDrawer";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ProductReviewsSection from "@/components/product/ProductReviewsSection";

/* ── Trust pillars ── */
const TRUST_PILLARS = [
  { icon: Truck,        label: "Free shipping on orders over ₹999" },
  { icon: RotateCcw,    label: "30-day easy returns"               },
  { icon: ShieldCheck,  label: "Dermatologist tested & approved"    },
];

/* ── Color coding per category ── */
const CAT_COLORS: Record<string, string> = {
  cleanser:     "bg-brand-sky",
  serum:        "bg-brand-mint",
  moisturizer:  "bg-brand-pink",
  spf:          "bg-brand-yellow",
  "gift-set":   "bg-brand-lilac",
};
function getCatColor(cat = "") {
  const k = Object.keys(CAT_COLORS).find((k) => cat.toLowerCase().includes(k));
  return CAT_COLORS[k ?? ""] ?? "bg-brand-peach";
}

/* ── Related card ── */
function RelatedCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <article className="group flex flex-col">
      <Link href={`/product/${product.id}`} className="block mb-4">
        <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-brand-text ${getCatColor(product.category)}/20`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, 22vw"
            className={`object-cover transition-opacity duration-500 group-hover:opacity-0 ${!product.inStock ? "grayscale opacity-50" : ""}`}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} texture`}
            fill
            sizes="(max-width: 640px) 90vw, 22vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="sticker bg-brand-text text-brand-bg rotate-3 text-[0.55rem]">Sold Out</span>
            </div>
          )}
        </div>
      </Link>
      <span className={`sticker ${getCatColor(product.category)} text-brand-text text-[0.55rem] mb-1.5 self-start`}>
        {product.category}
      </span>
      <Link href={`/product/${product.id}`}>
        <h3 className="font-rounded text-sm md:text-base font-extrabold text-brand-text hover:text-brand-blue transition-colors leading-snug mb-2">
          {product.name}
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="font-display text-lg font-black text-brand-text">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        <button
          disabled={!product.inStock}
          onClick={() => {
            if (!product.inStock || added) return;
            addItem(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className={`btn-play text-[0.6rem] px-4 py-2.5 gap-1 ${
            !product.inStock
              ? "bg-brand-text/8 text-brand-text/30 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0 border-brand-text/10"
              : added
              ? "bg-brand-green text-white border-brand-green"
              : "bg-brand-accent text-white border-brand-accent hover:bg-brand-magenta hover:border-brand-magenta"
          }`}
        >
          {added ? <><Check size={11} />Added</> : <><ShoppingBag size={11} />{product.inStock ? "Add" : "N/A"}</>}
        </button>
      </div>
    </article>
  );
}

/* ── Inner detail ── */
function ProductDetailInner({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem, openCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: inWishlist } = useWishlist();

  const gallery = [product.image, product.hoverImage];
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToBag() {
    if (!product.inStock) return;
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  const catColor = getCatColor(product.category);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32" id="main-content">

      {/* ── Breadcrumb ── */}
      <div className="px-6 md:px-12 py-4 border-b-[3px] border-brand-text/8">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-brand-text/40 font-rounded font-extrabold flex-wrap">
          {[
            { href: "/",     label: "Home"           },
            { href: "/shop", label: "Shop"           },
            { href: `/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`, label: product.category },
          ].map((crumb, i, arr) => (
            <React.Fragment key={crumb.href}>
              <Link href={crumb.href} className="hover:text-brand-accent transition-colors">
                {crumb.label}
              </Link>
              {i < arr.length - 1 && <span className="text-brand-text/20">/</span>}
            </React.Fragment>
          ))}
          <span className="text-brand-text/20">/</span>
          <span className="text-brand-text/70 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Gallery ── */}
          <div className="flex flex-col gap-4">
            <motion.div
              key={galleryIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={`relative aspect-square rounded-3xl overflow-hidden border-[3px] border-brand-text ${catColor}/15`}
            >
              <Image
                src={gallery[galleryIdx]}
                alt={galleryIdx === 0 ? product.name : `${product.name} — lifestyle`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-text/25">
                  <span className="sticker bg-brand-text text-brand-bg text-xs rotate-3 shadow-btn">
                    Sold Out
                  </span>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIdx(i)}
                  aria-label={i === 0 ? "Product view" : "Lifestyle view"}
                  className={`relative aspect-square w-20 flex-shrink-0 rounded-xl overflow-hidden border-[3px] transition-all duration-150 ${
                    galleryIdx === i
                      ? "border-brand-accent shadow-btn"
                      : "border-brand-text/20 hover:border-brand-text/60"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Info panel ── */}
          <div className="flex flex-col">
            {/* Back */}
            <Link
              href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/40 hover:text-brand-accent transition-colors mb-5 w-fit group"
            >
              <ChevronLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to {product.category}
            </Link>

            {/* Category sticker */}
            <span className={`sticker ${catColor} text-brand-text text-[0.6rem] mb-4 self-start shadow-btn`}>
              {product.category}
            </span>

            {/* Stars */}
            {(product.review_count ?? 0) > 0 && (
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={s <= Math.round(product.avg_rating ?? 0)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "fill-brand-yellow/25 text-brand-yellow/25"}
                    />
                  ))}
                </div>
                <span className="text-[0.6rem] text-brand-text/45 font-rounded font-extrabold uppercase tracking-wide">
                  {(product.avg_rating ?? 0).toFixed(1)} · {product.review_count} review{(product.review_count ?? 0) !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/* Product name */}
            <h1 className="font-rounded text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-brand-text">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-2xl font-black text-brand-text">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-brand-text/35 line-through font-rounded">
                ₹{Math.round(product.price * 1.25).toLocaleString("en-IN")}
              </span>
              <span className="sticker bg-brand-green text-white text-[0.55rem]">Save 25%</span>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base font-rounded font-medium text-brand-text/65 leading-relaxed mb-7 border-l-[3px] border-brand-accent pl-4">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <span className="sticker bg-brand-mint text-brand-text text-[0.6rem] mb-3 inline-flex -rotate-1 shadow-btn">
                Key Benefits
              </span>
              <ul className="flex flex-col gap-2 mt-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-rounded font-medium text-brand-text/75">
                    <Check size={13} className="text-brand-accent shrink-0 stroke-[3]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Bag */}
            <div className="flex items-stretch gap-3 mb-6 flex-wrap">
              {/* Quantity stepper */}
              <div className="flex items-center border-[3px] border-brand-text rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="px-4 py-3 hover:bg-brand-yellow/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={13} strokeWidth={3} />
                </button>
                <span className="px-4 text-sm font-extrabold font-rounded select-none border-x-[3px] border-brand-text/20 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(q + 1, 10))}
                  disabled={quantity === 10}
                  aria-label="Increase quantity"
                  className="px-4 py-3 hover:bg-brand-yellow/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={13} strokeWidth={3} />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToBag}
                disabled={!product.inStock}
                className={`flex-1 btn-play text-[0.65rem] md:text-xs py-3.5 justify-center gap-2 min-w-[10rem] ${
                  !product.inStock
                    ? "bg-brand-text/8 text-brand-text/30 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0 border-brand-text/10"
                    : added
                    ? "bg-brand-green text-white border-brand-green"
                    : "bg-brand-accent text-white border-brand-accent hover:bg-brand-magenta hover:border-brand-magenta"
                }`}
              >
                <ShoppingBag size={15} />
                {!product.inStock ? "Sold Out" : added ? "Added to Bag ✓" : "Add to Bag"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() =>
                  inWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist({ productId: product.id, name: product.name, price: product.price, image: product.image, slug: product.id })
                }
                aria-label={inWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-12 h-12 flex-shrink-0 rounded-full border-[3px] flex items-center justify-center transition-all duration-150 ${
                  inWishlist(product.id)
                    ? "bg-brand-magenta text-white border-brand-magenta"
                    : "border-brand-text bg-white text-brand-text hover:bg-brand-pink hover:border-brand-magenta"
                }`}
              >
                <Heart size={16} fill={inWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust pillars */}
            <div className="mt-2 p-5 rounded-2xl border-[3px] border-brand-text/10 bg-brand-yellow/10 flex flex-col gap-3">
              {TRUST_PILLARS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[0.7rem] font-rounded font-semibold text-brand-text/70">
                  <Icon size={14} className="text-brand-accent shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <ProductReviewsSection slug={product.id} />
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t-[3px] border-brand-text/8" aria-label="You may also like">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="sticker bg-brand-mint text-brand-text -rotate-1 mb-4 inline-flex shadow-btn">
                  Complete the Ritual
                </span>
                <h2 className="heading-section text-brand-text mt-3"
                    style={{ fontSize: "var(--type-h3)" }}>
                  You May Also Like
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/45 hover:text-brand-accent transition-colors flex items-center gap-1 group"
              >
                View All
                <ChevronLeft size={11} className="rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RelatedCard product={rp} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ── Shell ── */
export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <ProductDetailInner product={product} relatedProducts={relatedProducts} />
      <Footer />
      <CartDrawer />
    </div>
  );
}

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

// ─── Trust pillars ─────────────────────────────────────────────────────────────
const TRUST_PILLARS = [
  { icon: Truck, label: "Free shipping over ₹999" },
  { icon: RotateCcw, label: "30-day easy returns" },
  { icon: ShieldCheck, label: "Dermatologist tested" },
];

// ─── Related Product Card ──────────────────────────────────────────────────────
function RelatedCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

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
            sizes="(max-width: 640px) 90vw, 25vw"
            className={`object-cover transition-all duration-700 ${hovered ? "opacity-0" : "opacity-100"} ${!product.inStock ? "grayscale opacity-60" : ""}`}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} texture`}
            fill
            sizes="(max-width: 640px) 90vw, 25vw"
            className={`object-cover transition-all duration-700 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-text/5">
              <span className="bg-brand-text text-brand-bg text-[9px] font-bold uppercase tracking-[0.25em] py-1.5 px-3 rounded-sm">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] uppercase tracking-wider text-brand-text/40 font-semibold">
          {product.category}
        </span>
        <span className="text-xs font-semibold">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
      </div>
      <Link href={`/product/${product.id}`}>
        <h3 className="font-rounded text-base font-extrabold tracking-wide text-brand-text hover:text-brand-blue transition-colors leading-snug mb-3">
          {product.name}
        </h3>
      </Link>
      <button
        disabled={!product.inStock}
        onClick={() => {
          if (product.inStock) {
            addItem(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }
        }}
        className={`mt-auto w-full py-3 text-[10px] uppercase tracking-[0.15em] font-extrabold font-rounded rounded-full transition-all duration-300 ${
          !product.inStock
            ? "bg-brand-text/5 text-brand-text/30 cursor-not-allowed"
            : added
            ? "bg-brand-magenta text-white"
            : "bg-brand-accent text-white hover:bg-brand-magenta hover:-translate-y-0.5 shadow-play"
        }`}
      >
        {!product.inStock ? "Sold Out" : added ? "✓ Added" : "Add to Bag"}
      </button>
    </article>
  );
}

function ProductDetailInner({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const { addItem, openCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: inWishlist } = useWishlist();

  const related = relatedProducts;

  const gallery = [product.image, product.hoverImage];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToBag() {
    if (!product.inStock) return;
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-5 border-b border-brand-text/5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-text/40 flex-wrap">
          <Link href="/" className="hover:text-brand-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-accent transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-brand-accent transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-brand-text truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* ── Left: Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <motion.div
              key={activeGalleryIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square rounded-lg overflow-hidden bg-brand-text/5 border border-brand-text/5"
            >
              <Image
                src={gallery[activeGalleryIndex]}
                alt={
                  activeGalleryIndex === 0
                    ? product.name
                    : `${product.name} — lifestyle`
                }
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-text/10">
                  <span className="bg-brand-text text-brand-bg text-[10px] font-bold uppercase tracking-[0.25em] py-2.5 px-6 rounded-sm shadow-lg">
                    Sold Out
                  </span>
                </div>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryIndex(i)}
                  className={`relative aspect-square w-20 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    activeGalleryIndex === i
                      ? "border-brand-accent"
                      : "border-transparent hover:border-brand-text/30"
                  }`}
                  aria-label={i === 0 ? "Product front view" : "Lifestyle texture view"}
                >
                  <Image
                    src={src}
                    alt={i === 0 ? product.name : "Lifestyle texture"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info panel ── */}
          <div className="flex flex-col">
            {/* Back link */}
            <Link
              href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand-text/40 hover:text-brand-accent transition-colors mb-6 group w-fit"
            >
              <ChevronLeft
                size={12}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              {product.category}
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3" aria-label={`${product.avg_rating ?? 0} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={
                    s <= Math.round(product.avg_rating ?? 0)
                      ? "fill-brand-accent text-brand-accent"
                      : "fill-brand-accent/30 text-brand-accent/30"
                  }
                />
              ))}
              <span className="text-[10px] text-brand-text/40 ml-1">
                ({product.review_count ?? 0} review{(product.review_count ?? 0) !== 1 ? "s" : ""})
              </span>
            </div>

            {/* Name */}
            <h1 className="font-rounded text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-brand-text/40 line-through">
                ₹{Math.round(product.price * 1.25).toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-sm">
                Save 25%
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-brand-text/70 leading-relaxed mb-8 border-l-2 border-brand-accent/30 pl-4 italic">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <span className="sticker bg-brand-lilac text-brand-text text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play mb-3">Key Benefits</span>
              <ul className="flex flex-col gap-2.5">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-brand-text/80"
                  >
                    <Check size={14} className="text-brand-accent shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Bag */}
            <div className="flex items-stretch gap-3 mb-6">
              {/* Stepper */}
              <div className="flex items-center border border-brand-text/20 rounded-sm overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  disabled={quantity === 1}
                  className="px-3 py-3 hover:bg-brand-text/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="px-4 py-3 text-sm font-semibold min-w-[40px] text-center border-x border-brand-text/10 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(q + 1, 10))}
                  disabled={quantity === 10}
                  className="px-3 py-3 hover:bg-brand-text/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to Bag + Wishlist */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddToBag}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.15em] font-extrabold font-rounded rounded-full transition-all duration-300 ${
                    !product.inStock
                      ? "bg-brand-text/10 text-brand-text/30 cursor-not-allowed"
                      : added
                      ? "bg-brand-magenta text-white scale-[0.99]"
                      : "bg-brand-accent text-white hover:bg-brand-magenta hover:-translate-y-0.5 shadow-play active:scale-[0.99]"
                  }`}
                >
                  <ShoppingBag size={14} />
                  {!product.inStock
                    ? "Sold Out"
                    : added
                    ? "Added to Bag ✓"
                    : "Add to Bag"}
                </button>
                <button
                  onClick={() =>
                    inWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist({ productId: product.id, name: product.name, price: product.price, image: product.image, slug: product.id })
                  }
                  className={`px-3 py-3 rounded-sm border transition-all duration-300 ${
                    inWishlist(product.id)
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-brand-text/20 hover:border-brand-accent text-brand-text/40 hover:text-brand-accent"
                  }`}
                  aria-label={inWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={16} className={inWishlist(product.id) ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            {/* Trust pillars */}
            <div className="border-t border-brand-text/5 pt-6 flex flex-col gap-3">
              {TRUST_PILLARS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-xs text-brand-text/60"
                >
                  <Icon size={14} className="text-brand-accent shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8">
        <ProductReviewsSection slug={product.id} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 mt-8 pt-16 border-t border-brand-text/5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="sticker bg-brand-mint text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">Complete the Ritual</span>
              <h2 className="heading-display text-brand-text text-3xl md:text-4xl">
                You May Also Like
              </h2>
            </div>
            <Link
              href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 hover:text-brand-accent transition-colors flex items-center gap-1 group"
            >
              View All
              <ChevronLeft
                size={11}
                className="rotate-180 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {related.map((rp, i) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <RelatedCard product={rp} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function ProductDetailClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <ProductDetailInner product={product} relatedProducts={relatedProducts} />
        <Footer />
        <CartDrawer />
    </div>
  );
}

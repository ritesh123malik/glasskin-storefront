"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

// ─── Trust pillars ─────────────────────────────────────────────────────────────
const TRUST = [
  { icon: Truck, label: "Free shipping over ₹999" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: RotateCcw, label: "30-day returns" },
];

// ─── Promo banner hints (shown below the input, never exposing server codes) ──
const PROMO_HINT = "Have a code? Enter it below.";

function CartPageInner() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<
    { state: "idle" } | { state: "valid"; discount: number; label: string } | { state: "invalid"; message: string }
  >({ state: "idle" });
  const [promoLoading, setPromoLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Cash on Delivery
  const [codOpen, setCodOpen] = useState(false);
  const [codLoading, setCodLoading] = useState(false);
  const [codError, setCodError] = useState("");
  const [cod, setCod] = useState({ name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  // Discount calculation (client-side preview only — server re-validates)
  const discountAmount =
    promoStatus.state === "valid"
      ? Math.round((subtotal * promoStatus.discount) / 100)
      : 0;
  const total = subtotal - discountAmount + shipping;

  // ─── Validate promo via API ──────────────────────────────────────────────────
  async function handleApplyPromo() {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoStatus({ state: "idle" });

    try {
      const itemsPayload = items
        .filter((i) => i.product.variantId)
        .map((i) => ({ variantId: i.product.variantId as string, quantity: i.quantity }));
      if (itemsPayload.length === 0) {
        setPromoStatus({ state: "invalid", message: "Add a product before applying a code." });
        return;
      }
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoInput.trim(), items: itemsPayload }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setPromoStatus({ state: "invalid", message: data.message ?? "That code can't be applied." });
      } else {
        setPromoStatus({ state: "valid", discount: data.percent, label: data.label });
      }
    } finally {
      setPromoLoading(false);
    }
  }

  // ─── Start Stripe checkout ─────────────────────────────────────────────────
  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.product.variantId, quantity: i.quantity })),
          promoCode: promoStatus.state === "valid" ? promoInput.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      // Redirect to Stripe-hosted checkout
      window.location.href = data.url;
    } catch {
      setCheckoutError("Network error. Please check your connection and try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  // ─── Cash on Delivery ────────────────────────────────────────────────────────
  async function handleCodCheckout() {
    if (!cod.name.trim() || !cod.email.trim() || !cod.phone.trim() || !cod.line1.trim() || !cod.city.trim() || !cod.state.trim() || !cod.pincode.trim()) {
      setCodError("Please complete all delivery details.");
      return;
    }
    setCodLoading(true);
    setCodError("");
    try {
      const itemsPayload = items
        .filter((i) => i.product.variantId)
        .map((i) => ({ variantId: i.product.variantId as string, quantity: i.quantity }));
      const res = await fetch("/api/checkout/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsPayload,
          promoCode: promoStatus.state === "valid" ? promoInput.trim() : undefined,
          email: cod.email,
          name: cod.name,
          phone: cod.phone,
          address: { line1: cod.line1, line2: cod.line2, city: cod.city, state: cod.state, pincode: cod.pincode },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCodError(data.error ?? "Could not place your order.");
        return;
      }
      window.location.href = `/checkout/success?order=${data.orderNumber}`;
    } catch {
      setCodError("Network error. Please try again.");
    } finally {
      setCodLoading(false);
    }
  }

  // ─── Empty state ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-brand-yellow flex items-center justify-center mb-8 shadow-play">
          <ShoppingBag size={38} className="text-brand-text stroke-[2]" />
        </div>
        <h1 className="heading-display text-brand-text text-4xl mb-3 text-center">
          Your bag is empty!
        </h1>
        <p className="font-rounded text-sm text-brand-text/60 font-semibold max-w-xs text-center leading-snug mb-10">
          Fill it with delicious, feel-good formulas your skin barrier will love.
        </p>
        <Link
          href="/shop"
          className="btn-play-solid bg-brand-accent px-10 py-4 text-[11px]"
        >
          Continue Shopping
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>
    );
  }

  // ─── Filled cart ─────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      {/* Page header */}
      <div className="border-b border-brand-text/5 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand-text/40 hover:text-brand-accent transition-colors mb-4 group"
          >
            <ChevronLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl">
            Your Glow Bag
          </h1>
          <p className="text-sm text-brand-text/50 mt-1.5">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {/* Free shipping progress */}
      {remaining > 0 && (
        <div className="bg-brand-secondary/10 border-b border-brand-text/5 px-6 md:px-12 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-brand-text/70">
                Add{" "}
                <strong className="text-brand-accent">
                  ₹{remaining.toLocaleString("en-IN")}
                </strong>{" "}
                more for complimentary shipping
              </span>
              <span className="text-brand-text/40 text-[10px] font-semibold uppercase tracking-wider">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-brand-text/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingProgress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-brand-accent rounded-full"
              />
            </div>
          </div>
        </div>
      )}
      {remaining === 0 && (
        <div className="bg-brand-accent/8 border-b border-brand-accent/15 px-6 md:px-12 py-3.5">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-brand-text">
            <Sparkles size={15} className="text-brand-accent" />
            Complimentary express shipping unlocked!
          </div>
        </div>
      )}

      {/* Main content grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

        {/* ── Left: Cart items ── */}
        <div>
          <ul className="divide-y divide-brand-text/5" role="list">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBlock: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 flex gap-5 first:pt-0"
                >
                  {/* Product image */}
                  <Link href={`/product/${item.product.id}`} className="flex-none">
                    <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded overflow-hidden bg-brand-text/5 border border-brand-text/5 hover:opacity-90 transition-opacity">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-brand-accent font-semibold block mb-0.5">
                          {item.product.category}
                        </span>
                        <Link href={`/product/${item.product.id}`}>
                          <h2 className="font-rounded text-base font-extrabold text-brand-text leading-snug hover:text-brand-blue transition-colors">
                            {item.product.name}
                          </h2>
                        </Link>
                        <p className="text-xs text-brand-text/50 mt-1 leading-relaxed line-clamp-2">
                          {item.product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-brand-text/30 hover:text-red-500 transition-colors p-1 flex-none mt-0.5"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-brand-text/15 rounded-sm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-2 hover:bg-brand-text/5 text-brand-text/70 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-3 text-xs font-semibold select-none min-w-[32px] text-center border-x border-brand-text/10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-2 hover:bg-brand-text/5 text-brand-text/70 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Line price */}
                      <div className="text-right">
                        <span className="text-sm font-semibold block">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-brand-text/40">
                            ₹{item.product.price.toLocaleString("en-IN")} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* ── Right: Order summary sidebar ── */}
        <div className="lg:sticky lg:top-28">
          <div className="border border-brand-text/8 rounded-lg overflow-hidden">
            {/* Summary header */}
            <div className="bg-brand-text/2 px-6 py-4 border-b border-brand-text/8">
              <h2 className="text-sm font-semibold uppercase tracking-widest">Order Summary</h2>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Promo code */}
              <div>
                <label
                  htmlFor="promo-code"
                  className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 flex items-center gap-1.5 mb-2"
                >
                  <Tag size={11} />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value.toUpperCase());
                      if (promoStatus.state !== "idle") setPromoStatus({ state: "idle" });
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                    placeholder="e.g. WELCOME10"
                    autoComplete="off"
                    spellCheck={false}
                    className="flex-1 border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/25 tracking-widest font-medium uppercase"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoLoading || !promoInput.trim()}
                    className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-extrabold font-rounded bg-brand-text text-brand-bg rounded-full hover:bg-brand-accent transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {promoLoading ? "..." : "Apply"}
                  </button>
                </div>

                {/* Promo feedback */}
                <AnimatePresence mode="wait">
                  {promoStatus.state === "valid" && (
                    <motion.p
                      key="valid"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-green-700 mt-2 flex items-center gap-1.5"
                    >
                      <Sparkles size={11} />
                      {promoStatus.label} applied!
                    </motion.p>
                  )}
                  {promoStatus.state === "invalid" && (
                    <motion.p
                      key="invalid"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-red-600 mt-2"
                    >
                      {promoStatus.message}
                    </motion.p>
                  )}
                  {promoStatus.state === "idle" && (
                    <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-brand-text/35 mt-1.5">
                      {PROMO_HINT}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Price breakdown */}
              <div className="border-t border-brand-text/5 pt-5 space-y-2.5 text-sm">
                <div className="flex justify-between text-brand-text/70">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-text">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span className="flex items-center gap-1.5">
                      <Tag size={12} />
                      Discount ({promoStatus.state === "valid" ? promoStatus.discount : 0}%)
                    </span>
                    <span className="font-medium">
                      −₹{discountAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-brand-text/70">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-brand-accent font-semibold text-[11px] uppercase tracking-wider">
                        Free
                      </span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold border-t border-brand-text/10 pt-3 mt-1">
                  <span>Estimated Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {checkoutError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2.5"
                  >
                    {checkoutError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-brand-accent hover:bg-brand-secondary text-brand-bg py-4 rounded-sm text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-wait"
              >
                {checkoutLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-brand-bg/40 border-t-brand-bg rounded-full animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              {/* Cash on Delivery */}
              {process.env.NEXT_PUBLIC_COD_ENABLED !== "false" && (
              <div className="pt-1">
                {!codOpen ? (
                  <button
                    onClick={() => setCodOpen(true)}
                    className="w-full border border-brand-text/20 text-brand-text py-3.5 rounded-sm text-[11px] uppercase tracking-[0.2em] font-semibold hover:border-brand-accent hover:text-brand-accent transition-colors"
                  >
                    Pay by Cash on Delivery
                  </button>
                ) : (
                  <div className="space-y-3 border border-brand-text/15 rounded-sm p-4">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50">Cash on Delivery</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input value={cod.name} onChange={(e) => setCod({ ...cod, name: e.target.value })} placeholder="Full name" className="col-span-2 border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.email} onChange={(e) => setCod({ ...cod, email: e.target.value })} placeholder="Email" className="border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.phone} onChange={(e) => setCod({ ...cod, phone: e.target.value })} placeholder="Phone" className="border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.line1} onChange={(e) => setCod({ ...cod, line1: e.target.value })} placeholder="Address line 1" className="col-span-2 border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.line2} onChange={(e) => setCod({ ...cod, line2: e.target.value })} placeholder="Address line 2 (optional)" className="col-span-2 border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.city} onChange={(e) => setCod({ ...cod, city: e.target.value })} placeholder="City" className="border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.state} onChange={(e) => setCod({ ...cod, state: e.target.value })} placeholder="State" className="border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                      <input value={cod.pincode} onChange={(e) => setCod({ ...cod, pincode: e.target.value })} placeholder="Pincode" className="col-span-2 border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
                    </div>
                    {codError && <p className="text-xs text-red-600">{codError}</p>}
                    <button
                      onClick={handleCodCheckout}
                      disabled={codLoading}
                      className="w-full btn-play-solid bg-brand-accent py-3.5 rounded-full text-[11px] hover:bg-brand-magenta disabled:opacity-60 disabled:cursor-wait"
                    >
                      {codLoading ? "Placing order…" : "Place COD Order"}
                    </button>
                  </div>
                )}
              </div>
              )}

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                {TRUST.map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1 text-[10px] text-brand-text/40 uppercase tracking-wider">
                    <Icon size={11} className="text-brand-accent" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Payment icons note */}
          <p className="text-[10px] text-brand-text/30 text-center mt-4 tracking-wide">
            Powered by Stripe · Visa · Mastercard · UPI · NetBanking
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function CartPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <CartPageInner />
        <Footer />
        <CartDrawer />
    </div>
  );
}

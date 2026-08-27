"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
  ShieldCheck,
  Truck,
  Tag,
  Sparkles,
  ChevronLeft,
  ShoppingBag,
} from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    hint: "Visa · Mastercard · RuPay",
    icon: CreditCard,
  },
  {
    id: "upi",
    label: "UPI",
    hint: "GPay · PhonePe · Paytm",
    icon: Smartphone,
  },
  {
    id: "netbanking",
    label: "NetBanking",
    hint: "All major banks",
    icon: Lock,
  },
] as const;

type PaymentMethod = "card" | "upi" | "netbanking";

function CheckoutPageInner() {
  const router = useRouter();
  const { items, subtotal, totalItems, clearCart } = useCart();

  const [contact, setContact] = useState({ email: "", phone: "", name: "" });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", pincode: "" });
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [cod, setCod] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<
    { state: "idle" } | { state: "valid"; discount: number; label: string } | { state: "invalid"; message: string }
  >({ state: "idle" });
  const [promoLoading, setPromoLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const discountAmount =
    promoStatus.state === "valid"
      ? Math.round((subtotal * promoStatus.discount) / 100)
      : 0;
  const total = subtotal - discountAmount + shipping;

  const canOrder = useMemo(
    () =>
      contact.name.trim() &&
      contact.email.trim() &&
      contact.phone.trim() &&
      address.line1.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.pincode.trim() &&
      (cod || payment) &&
      items.length > 0,
    [contact, address, cod, payment, items.length]
  );

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

  async function placeOrder() {
    if (!canOrder) {
      setError("Please complete your contact, delivery, and payment details.");
      return;
    }
    setLoading(true);
    setError("");

    const addressPayload = {
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };

    if (cod) {
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
            email: contact.email,
            name: contact.name,
            phone: contact.phone,
            address: addressPayload,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Could not place your order.");
          return;
        }
        clearCart();
        router.push(`/checkout/success?order=${data.orderNumber}`);
        return;
      } catch {
        setError("Network error. Please try again.");
        return;
      } finally {
        setLoading(false);
      }
    }

    // Stripe (card / UPI / netbanking all route through Stripe checkout)
    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.product.variantId, quantity: i.quantity })),
          promoCode: promoStatus.state === "valid" ? promoInput.trim() : undefined,
          customer: { email: contact.email },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full border border-brand-text/15 rounded-sm px-3.5 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/25";
  const labelCls = "text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-1.5 block";

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-brand-mint flex items-center justify-center mb-8 shadow-play">
          <ShoppingBag size={38} className="text-brand-text stroke-[2]" />
        </div>
        <h1 className="heading-display text-brand-text text-4xl mb-3 text-center">Nothing to check out</h1>
        <p className="font-rounded text-sm text-brand-text/60 font-semibold max-w-xs text-center leading-snug mb-10">
          Your glow bag is empty. Add some feel-good formulas first.
        </p>
        <Link href="/shop" className="btn-play-solid bg-brand-accent px-10 py-4 text-[11px]">
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      {/* Page header */}
      <div className="border-b border-brand-text/5 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand-text/40 hover:text-brand-accent transition-colors mb-3 group"
          >
            <ChevronLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to bag
          </Link>
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl">Checkout</h1>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] uppercase tracking-widest text-brand-text/40">
            <Lock size={11} className="text-brand-accent" /> Secure checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 xl:gap-16 items-start">
        {/* ── Left: form ── */}
        <div className="space-y-8">
          {/* Contact */}
          <section className="border border-brand-text/8 rounded-lg p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-accent text-brand-bg text-[11px] font-extrabold flex items-center justify-center">1</span>
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelCls}>Full name</label>
                <input className={inputCls} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Priya Sharma" autoComplete="name" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" className={inputCls} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@email.com" autoComplete="email" />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" className={inputCls} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+91 98765 43210" autoComplete="tel" />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="border border-brand-text/8 rounded-lg p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-accent text-brand-bg text-[11px] font-extrabold flex items-center justify-center">2</span>
              Delivery address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelCls}>Address line 1</label>
                <input className={inputCls} value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="Flat, house no., street" autoComplete="address-line1" />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Address line 2 (optional)</label>
                <input className={inputCls} value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} placeholder="Area, landmark" autoComplete="address-line2" />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input className={inputCls} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Mumbai" autoComplete="address-level2" />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <input className={inputCls} value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="Maharashtra" autoComplete="address-level1" />
              </div>
              <div>
                <label className={labelCls}>Pincode</label>
                <input className={inputCls} value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} placeholder="400001" autoComplete="postal-code" />
              </div>
              <div className="flex items-end">
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-brand-accent font-semibold">
                  <Truck size={12} /> Free over ₹999
                </span>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="border border-brand-text/8 rounded-lg p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-accent text-brand-bg text-[11px] font-extrabold flex items-center justify-center">3</span>
              Payment method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map(({ id, label, hint, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setCod(false); setPayment(id); }}
                  className={`border rounded-sm p-4 text-left transition-all ${
                    !cod && payment === id
                      ? "border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent"
                      : "border-brand-text/15 hover:border-brand-text/30"
                  }`}
                >
                  <Icon size={18} className="text-brand-accent mb-2" />
                  <div className="text-xs font-bold font-rounded">{label}</div>
                  <div className="text-[10px] text-brand-text/45 mt-0.5">{hint}</div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCod(true)}
                className={`border rounded-sm p-4 text-left transition-all ${
                  cod ? "border-brand-magenta bg-brand-magenta/5 ring-1 ring-brand-magenta" : "border-brand-text/15 hover:border-brand-text/30"
                }`}
              >
                <Banknote size={18} className="text-brand-magenta mb-2" />
                <div className="text-xs font-bold font-rounded">Cash on Delivery</div>
                <div className="text-[10px] text-brand-text/45 mt-0.5">Pay at your doorstep</div>
              </button>
            </div>

            <p className="text-[10px] text-brand-text/35 tracking-wide mt-4 flex items-center gap-1.5">
              <ShieldCheck size={11} className="text-brand-accent" />
              Card, UPI and NetBanking are processed securely by Stripe. COD is collected on delivery.
            </p>
          </section>
        </div>

        {/* ── Right: order summary ── */}
        <div className="lg:sticky lg:top-28">
          <div className="border border-brand-text/8 rounded-lg overflow-hidden">
            <div className="bg-brand-text/2 px-6 py-4 border-b border-brand-text/8">
              <h2 className="text-sm font-semibold uppercase tracking-widest">Order Summary</h2>
              <p className="text-[10px] text-brand-text/40 mt-0.5">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
            </div>

            <div className="px-6 py-6">
              {/* Items preview */}
              <ul className="space-y-3 mb-5">
                {items.slice(0, 3).map((item) => (
                  <li key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded overflow-hidden bg-brand-text/5 flex-none border border-brand-text/5">
                      <Image src={item.product.image} alt={item.product.name} fill sizes="48px" className="object-cover" />
                      <span className="absolute -top-0 -right-0 w-4 h-4 bg-brand-accent text-brand-bg text-[9px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold font-rounded truncate">{item.product.name}</p>
                      <p className="text-[10px] text-brand-text/40">₹{item.product.price.toLocaleString("en-IN")} each</p>
                    </div>
                    <span className="text-xs font-semibold">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                  </li>
                ))}
                {items.length > 3 && (
                  <li className="text-[10px] text-brand-text/40 text-center">+{items.length - 3} more items</li>
                )}
              </ul>

              {/* Promo */}
              <div className="flex gap-2 mb-5">
                <input
                  value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); if (promoStatus.state !== "idle") setPromoStatus({ state: "idle" }); }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  placeholder="Promo code"
                  className="flex-1 border border-brand-text/15 rounded-sm px-3 py-2 text-xs bg-transparent focus:outline-none focus:border-brand-accent transition-colors uppercase tracking-widest placeholder:normal-case placeholder:text-brand-text/25"
                />
                <button onClick={handleApplyPromo} disabled={promoLoading || !promoInput.trim()} className="px-4 py-2 text-[10px] uppercase tracking-widest font-extrabold font-rounded bg-brand-text text-brand-bg rounded-full hover:bg-brand-accent transition-all disabled:opacity-40">
                  {promoLoading ? "..." : "Apply"}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {promoStatus.state === "valid" && (
                  <motion.p key="valid" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] text-green-700 mb-4 flex items-center gap-1.5">
                    <Sparkles size={11} /> {promoStatus.label} applied!
                  </motion.p>
                )}
                {promoStatus.state === "invalid" && (
                  <motion.p key="invalid" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] text-red-600 mb-4">
                    {promoStatus.message}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Breakdown */}
              <div className="border-t border-brand-text/5 pt-5 space-y-2.5 text-sm">
                <div className="flex justify-between text-brand-text/70"><span>Subtotal</span><span className="font-medium text-brand-text">₹{subtotal.toLocaleString("en-IN")}</span></div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700"><span className="flex items-center gap-1.5"><Tag size={12} /> Discount ({promoStatus.state === "valid" ? promoStatus.discount : 0}%)</span><span className="font-medium">−₹{discountAmount.toLocaleString("en-IN")}</span></div>
                )}
                <div className="flex justify-between text-brand-text/70"><span>Shipping</span><span>{shipping === 0 ? <span className="text-brand-accent font-semibold text-[11px] uppercase tracking-wider">Free</span> : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-base font-semibold border-t border-brand-text/10 pt-3 mt-1"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2.5 mt-4">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={placeOrder}
                disabled={!canOrder || loading}
                className="mt-5 w-full btn-play-solid bg-brand-accent hover:bg-brand-magenta py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-brand-bg/40 border-t-brand-bg rounded-full animate-spin" />
                    {cod ? "Placing order…" : "Redirecting to payment…"}
                  </>
                ) : (
                  <>
                    {cod ? "Place COD Order" : "Pay Now"}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <button
                onClick={() => router.push("/cart")}
                className="mt-3 w-full flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-text/40 hover:text-brand-text transition-colors"
              >
                <ArrowLeft size={11} /> Back to bag
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 mt-2 border-t border-brand-text/5">
                <span className="flex items-center gap-1 text-[10px] text-brand-text/40 uppercase tracking-wider"><ShieldCheck size={11} className="text-brand-accent" /> Secure checkout</span>
                <span className="text-[10px] text-brand-text/30 uppercase tracking-wider">Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <CheckoutPageInner />
      <Footer />
      <CartDrawer />
    </div>
  );
}

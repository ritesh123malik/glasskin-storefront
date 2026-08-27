"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalItems, subtotal } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ── Keyboard trap + ESC ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeCart(); return; }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        drawerRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close cart"]')?.focus();
      }, 60);
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const freeProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining   = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping    = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-text cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="w-screen max-w-[420px] bg-brand-bg flex flex-col shadow-[−8px_0_40px_rgba(0,0,0,0.20)] border-l-[3px] border-brand-text"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-heading"
            >

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-6 py-5 bg-brand-yellow border-b-[3px] border-brand-text">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="stroke-[2.5]" />
                  <h2
                    id="cart-heading"
                    className="font-display uppercase text-lg tracking-wide"
                  >
                    Your Glow Bag
                  </h2>
                  {totalItems > 0 && (
                    <span className="sticker bg-brand-text text-brand-bg text-[0.55rem]">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-9 h-9 rounded-full bg-brand-text text-brand-bg flex items-center justify-center hover:bg-brand-accent transition-colors"
                >
                  <X size={15} strokeWidth={3} />
                </button>
              </div>

              {/* ── Free shipping progress ── */}
              {items.length > 0 && (
                <div className="px-6 py-3.5 bg-brand-yellow/20 border-b-2 border-brand-text/10">
                  <div className="flex items-center justify-between text-[0.65rem] font-rounded font-extrabold mb-2">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="flex items-center gap-1.5 text-brand-green">
                        <Sparkles size={12} />
                        Free shipping unlocked! 🎉
                      </span>
                    ) : (
                      <span className="text-brand-text/70">
                        Add{" "}
                        <strong className="text-brand-accent">
                          ₹{remaining.toLocaleString("en-IN")}
                        </strong>{" "}
                        for free shipping
                      </span>
                    )}
                    <span className="text-brand-text/45 uppercase tracking-wider">
                      {Math.round(freeProgress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-brand-text/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${freeProgress}%` }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="h-full bg-brand-accent rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* ── Items / Empty state ── */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-5">
                    <div className="w-24 h-24 rounded-full bg-brand-yellow border-[3px] border-brand-text flex items-center justify-center shadow-btn">
                      <ShoppingBag size={34} className="stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display uppercase text-2xl text-brand-text mb-2">
                        Your bag is empty!
                      </h3>
                      <p className="font-rounded text-sm text-brand-text/55 font-medium max-w-[240px] leading-snug">
                        Fill it with delicious, feel-good formulas your skin will love.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="btn-play bg-brand-accent text-white text-[0.65rem] px-8 py-3.5"
                    >
                      Start Shopping
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <ul className="flex flex-col divide-y-2 divide-brand-text/8" role="list">
                    {items.map((item) => (
                      <li
                        key={item.product.id}
                        className="py-4 flex gap-4 first:pt-0 last:pb-0"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 flex-none rounded-xl overflow-hidden border-[2.5px] border-brand-text/20 bg-brand-peach/20">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[0.55rem] uppercase tracking-widest font-rounded font-extrabold text-brand-accent block mb-0.5">
                                {item.product.category}
                              </span>
                              <h4 className="font-rounded text-sm font-extrabold text-brand-text leading-snug">
                                {item.product.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="p-1.5 rounded-full hover:bg-brand-red/10 text-brand-text/35 hover:text-brand-red transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2.5">
                            {/* Stepper */}
                            <div className="flex items-center border-[2.5px] border-brand-text/20 rounded-full overflow-hidden bg-white">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                className="px-3 py-1.5 hover:bg-brand-yellow/30 transition-colors text-brand-text/70"
                              >
                                <Minus size={11} strokeWidth={3} />
                              </button>
                              <span className="px-3 text-xs font-extrabold font-rounded select-none min-w-[2rem] text-center border-x-2 border-brand-text/15">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                className="px-3 py-1.5 hover:bg-brand-yellow/30 transition-colors text-brand-text/70"
                              >
                                <Plus size={11} strokeWidth={3} />
                              </button>
                            </div>

                            {/* Line price */}
                            <span className="font-display text-base font-black text-brand-text">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ── Footer / checkout ── */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t-[3px] border-brand-text bg-brand-yellow/15 space-y-4">
                  {/* Price breakdown */}
                  <div className="space-y-1.5 text-xs font-rounded font-semibold">
                    <div className="flex justify-between text-brand-text/60">
                      <span>Subtotal</span>
                      <span className="text-brand-text font-extrabold">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-brand-text/60">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-brand-green font-extrabold uppercase tracking-wide text-[0.6rem]">
                            Free
                          </span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold pt-2 border-t-2 border-brand-text/10 text-brand-text">
                      <span>Total</span>
                      <span>₹{(subtotal + shipping).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn-play bg-brand-accent text-white w-full text-[0.65rem] py-4 justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight size={15} />
                  </Link>

                  <div className="flex items-center justify-center gap-3 text-[0.6rem] text-brand-text/40 font-rounded font-extrabold uppercase tracking-wide">
                    <ShieldCheck size={12} className="text-brand-accent" />
                    Secure Checkout · Plastic-Free Packaging
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

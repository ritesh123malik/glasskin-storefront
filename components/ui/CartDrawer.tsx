"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
  } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeCart]);

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-brand-bg text-brand-text shadow-2xl flex flex-col justify-between border-l border-brand-text/10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-heading"
            >
              {/* Top Header */}
              <div className="p-6 border-b border-brand-text/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="stroke-[1.5] text-brand-accent" />
                  <h2 id="cart-heading" className="font-serif text-lg tracking-wide font-medium">
                    Your Ritual Bag
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-full hover:bg-brand-text/5 text-brand-text/60 hover:text-brand-text transition-colors"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-brand-secondary/15 px-6 py-3.5 border-b border-brand-text/5">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="font-medium text-brand-text flex items-center gap-1.5">
                      <Sparkles size={13} className="text-brand-accent" />
                      Complimentary express shipping unlocked!
                    </span>
                  ) : (
                    <span className="text-brand-text/75">
                      Add <strong className="text-brand-accent font-semibold">₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong> more for complimentary shipping
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/50">
                    {Math.round(freeShippingProgress)}%
                  </span>
                </div>
                <div className="w-full bg-brand-text/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-brand-accent rounded-full"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-brand-text/5 flex items-center justify-center text-brand-text/40 mb-4">
                      <ShoppingBag size={24} className="stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-lg font-light mb-2 text-brand-text">Your ritual bag is empty</h3>
                    <p className="text-xs text-brand-text/60 max-w-xs mb-8 font-light">
                      Nurture your skin barrier with our handcrafted botanicals and peptide formulas.
                    </p>
                    <button
                      onClick={closeCart}
                      className="bg-brand-accent text-brand-bg hover:bg-brand-secondary px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-colors duration-300"
                    >
                      Explore Formulations
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-brand-text/5" role="list">
                    {items.map((item) => (
                      <li key={item.product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                        {/* Image */}
                        <div className="relative aspect-square w-20 h-20 rounded bg-brand-text/5 border border-brand-text/5 overflow-hidden flex-none">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-brand-accent font-semibold block">
                                  {item.product.category}
                                </span>
                                <h4 className="font-serif text-sm font-light text-brand-text leading-snug">
                                  {item.product.name}
                                </h4>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-brand-text/40 hover:text-red-500 transition-colors p-1"
                                aria-label={`Remove ${item.product.name} from cart`}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-brand-text/15 rounded bg-brand-bg">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-brand-text/5 text-brand-text/70 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 text-xs font-semibold select-none min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-brand-text/5 text-brand-text/70 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-xs font-semibold">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Drawer Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-brand-text/10 bg-brand-bg/80 backdrop-blur-sm space-y-4">
                  {/* Subtotal & Free Shipping breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-brand-text/70">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-text">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-brand-text/70">
                      <span>Shipping</span>
                      <span>
                        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                          <span className="text-brand-accent font-semibold uppercase text-[10px] tracking-wider">Free</span>
                        ) : (
                          "₹99"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t border-brand-text/5">
                      <span>Estimated Total</span>
                      <span>
                        ₹{(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => alert("Redirecting to secure luxury checkout...")}
                    className="w-full bg-brand-accent hover:bg-brand-secondary text-brand-bg py-3.5 px-6 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-brand-text/45 uppercase tracking-wider pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-brand-accent" />
                      Secure Checkout
                    </span>
                    <span>•</span>
                    <span>Plastic-Free Packaging</span>
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

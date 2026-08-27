"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Search, User, ShoppingBag, Heart,
  ChevronDown, ArrowRight, Sparkles,
} from "lucide-react";
import { mockCategories } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import SearchModal from "@/components/ui/SearchModal";

/* ── Announcement bar copy — rotates every 4s ── */
const announcements = [
  "🎉 Free shipping on orders over ₹999 — no code needed",
  "✨ 3 free samples packed with every ritual order",
  "💛 New drop: Invisible Dew SPF 50 — limited batch",
];

/* ── Category color coding (Partake-style) ── */
const categoryColors: Record<string, string> = {
  cleansers:    "bg-brand-sky",
  serums:       "bg-brand-mint",
  moisturizers: "bg-brand-pink",
  spf:          "bg-brand-yellow",
  "gift-sets":  "bg-brand-lilac",
};

export default function Header() {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  const { totalItems: cartCount, openCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  /* Persist dismissal */
  useEffect(() => {
    const dismissed = sessionStorage.getItem("ann-dismissed");
    if (dismissed === "true") setShowAnnouncement(false);
  }, []);

  /* Rotate announcements */
  useEffect(() => {
    if (!showAnnouncement) return;
    const t = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(t);
  }, [showAnnouncement]);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Trap body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const dismissAnn = () => {
    setShowAnnouncement(false);
    sessionStorage.setItem("ann-dismissed", "true");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full">

        {/* ── Announcement bar ── */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative w-full overflow-hidden bg-brand-magenta text-white"
            >
              <div className="py-2.5 px-10 text-center min-h-[2.4rem] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={announcementIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="text-[0.65rem] md:text-xs font-rounded font-extrabold tracking-wide uppercase"
                  >
                    {announcements[announcementIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <button
                onClick={dismissAnn}
                aria-label="Dismiss announcement"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main nav bar ── */}
        <div
          className={`w-full flex items-center justify-between px-4 md:px-8 lg:px-12 transition-all duration-400 ${
            isScrolled
              ? "bg-brand-bg/97 backdrop-blur-md border-b-[3px] border-brand-yellow shadow-sm py-3"
              : "bg-brand-bg/90 backdrop-blur-sm border-b-[3px] border-transparent py-4"
          }`}
        >
          {/* Left: hamburger + desktop nav */}
          <div className="flex items-center gap-4 lg:gap-7 flex-1">
            {/* Hamburger (always visible) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              className="p-1.5 rounded-full hover:bg-brand-yellow/30 transition-colors"
            >
              <Menu size={22} className="stroke-[2.5]" />
            </button>

            {/* Desktop nav links */}
            <nav
              className="hidden lg:flex items-center gap-7"
              aria-label="Primary navigation"
            >
              {/* Shop mega dropdown */}
              <div
                ref={shopRef}
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  onClick={() => setShopOpen((p) => !p)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 text-[0.65rem] uppercase tracking-widest font-extrabold font-rounded hover:text-brand-accent transition-colors py-2"
                >
                  Shop
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-3 w-[720px] z-50"
                    >
                      <div className="bg-brand-bg border-[3px] border-brand-text rounded-2xl shadow-btn p-6 grid grid-cols-5 gap-4">
                        {mockCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            className="group flex flex-col items-center text-center gap-2"
                          >
                            <div
                              className={`relative w-full aspect-square rounded-xl overflow-hidden border-[2.5px] border-brand-text group-hover:scale-105 transition-transform duration-200 ${
                                categoryColors[cat.id] ?? "bg-brand-peach"
                              }`}
                            >
                              <Image
                                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=75"
                                alt={cat.name}
                                fill
                                sizes="120px"
                                className="object-cover mix-blend-multiply opacity-70"
                              />
                            </div>
                            <span className="text-[0.6rem] font-extrabold tracking-wider uppercase font-rounded group-hover:text-brand-accent transition-colors">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                        <div className="col-span-5 pt-3 border-t-2 border-brand-text/10">
                          <Link
                            href="/shop"
                            className="btn-play bg-brand-accent text-white text-[0.6rem] px-5 py-2.5 inline-flex"
                          >
                            Shop All Products
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { href: "#rituals", label: "Rituals" },
                { href: "#about",   label: "About"   },
                { href: "/skin-quiz", label: "Skin Quiz" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.65rem] uppercase tracking-widest font-extrabold font-rounded hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Wordmark */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl uppercase tracking-[0.07em] text-brand-text hover:text-brand-accent transition-colors select-none flex-none"
            aria-label="GLASSSKIN home"
          >
            Glass<span className="text-brand-accent">Skin</span>
          </Link>

          {/* Right: icon actions */}
          <div
            className="flex items-center justify-end gap-2 md:gap-3 flex-1"
            aria-label="Account and cart actions"
          >
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="p-2 rounded-full hover:bg-brand-yellow/30 transition-colors hidden sm:flex"
            >
              <Search size={19} className="stroke-[2]" />
            </button>
            <Link
              href="/account"
              aria-label="Your account"
              className="p-2 rounded-full hover:bg-brand-yellow/30 transition-colors hidden sm:flex"
            >
              <User size={19} className="stroke-[2]" />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist — ${wishlistCount} item${wishlistCount !== 1 ? "s" : ""}`}
              className="p-2 rounded-full hover:bg-brand-yellow/30 transition-colors relative hidden sm:flex"
            >
              <Heart size={19} className="stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-magenta text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label={`Shopping bag — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              className="relative p-2 rounded-full hover:bg-brand-yellow/30 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag size={19} className="stroke-[2]" />
              {cartCount > 0 && (
                <>
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-accent text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Search Modal ── */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-brand-text/50 z-[60] cursor-pointer"
              aria-label="Close menu"
            />

            {/* Drawer panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 bottom-0 left-0 w-[min(88vw,380px)] bg-brand-bg z-[70] flex flex-col overflow-y-auto shadow-[8px_0_32px_rgba(0,0,0,0.18)]"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b-[3px] border-brand-yellow bg-brand-yellow/20">
                <Link
                  href="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className="font-display text-xl uppercase tracking-wide text-brand-text"
                >
                  Glass<span className="text-brand-accent">Skin</span>
                </Link>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full bg-brand-text text-brand-bg hover:bg-brand-accent transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Categories section */}
              <div className="px-6 py-6 border-b-2 border-brand-text/10">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] font-extrabold text-brand-text/40 mb-4">
                  Shop by Category
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {mockCategories.map((cat, i) => {
                    const colors = [
                      "bg-brand-sky",
                      "bg-brand-mint",
                      "bg-brand-pink",
                      "bg-brand-yellow",
                      "bg-brand-lilac",
                    ];
                    return (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`${colors[i % colors.length]} rounded-xl border-[2.5px] border-brand-text p-3 flex items-center gap-2 group hover:shadow-btn transition-all duration-150`}
                      >
                        <Sparkles size={13} className="opacity-60 shrink-0" />
                        <span className="text-[0.65rem] font-extrabold uppercase tracking-wide font-rounded truncate group-hover:text-brand-accent">
                          {cat.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Main links */}
              <div className="flex flex-col px-6 py-5 gap-1">
                {[
                  { href: "/shop",      label: "Shop All Products", accent: true  },
                  { href: "/skin-quiz", label: "Skin Quiz",         accent: false },
                  { href: "#rituals",   label: "Curated Rituals",   accent: false },
                  { href: "#about",     label: "Our Philosophy",    accent: false },
                  { href: "/account",   label: "My Account",        accent: false },
                  { href: "/wishlist",  label: "Wishlist",          accent: false },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center justify-between py-3 border-b border-brand-text/8 text-sm font-rounded font-extrabold uppercase tracking-wide group ${
                      link.accent ? "text-brand-accent" : "text-brand-text hover:text-brand-accent"
                    } transition-colors`}
                  >
                    {link.label}
                    <ArrowRight
                      size={15}
                      className="opacity-0 group-hover:opacity-100 text-brand-accent transition-opacity"
                    />
                  </Link>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="mt-auto px-6 py-6 bg-brand-yellow/15 border-t-2 border-brand-yellow/40">
                <p className="text-[0.6rem] text-brand-text/50 tracking-wide font-rounded">
                  care@glassskin.com • © 2026 GLASSSKIN
                </p>
                <p className="text-[0.6rem] text-brand-text/35 tracking-wide font-rounded mt-1">
                  Crafted with care in India ✦
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

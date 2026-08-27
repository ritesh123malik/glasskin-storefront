"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  User, 
  ShoppingBag, 
  Heart,
  ChevronDown, 
  ArrowRight 
} from "lucide-react";
import { mockCategories } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import SearchModal from "@/components/ui/SearchModal";

export default function Header() {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { totalItems: cartCount, openCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Persist announcement dismissal in sessionStorage
  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed === "true") {
      setIsAnnouncementVisible(false);
    }
  }, []);

  const dismissAnnouncement = () => {
    setIsAnnouncementVisible(false);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  // Scroll listener for background opacity transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
        {/* Announcement Bar */}
        <AnimatePresence>
          {isAnnouncementVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full bg-brand-magenta text-white py-2.5 px-12 text-xs font-bold tracking-widest text-center uppercase flex items-center justify-center z-50 overflow-hidden"
            >
              <span className="font-rounded tracking-wide">Complimentary shipping on orders over ₹999 • 3 samples with every ritual</span>
              <button 
                onClick={dismissAnnouncement}
                className="absolute right-4 p-1 hover:opacity-85 transition-opacity"
                aria-label="Dismiss announcement"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Header */}
        <div
          className={`w-full py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-500 border-b-4 ${
            isScrolled
              ? "bg-brand-bg/95 backdrop-blur-md border-brand-yellow/60 shadow-sm py-4"
              : "bg-transparent border-transparent py-6"
          }`}
        >
          {/* Left: Hamburger & Desktop Navigation */}
          <div className="flex items-center gap-6 flex-1">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 hover:text-brand-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} className="stroke-[2]" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-extrabold font-rounded">
              <div 
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsShopDropdownOpen(false);
                }}
              >
                <button 
                  onClick={() => setIsShopDropdownOpen((prev) => !prev)}
                  onFocus={() => setIsShopDropdownOpen(true)}
                  aria-expanded={isShopDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 hover:text-brand-accent transition-colors py-2 focus:outline-none focus:text-brand-accent"
                >
                  Shop
                  <ChevronDown size={12} className={`transition-transform duration-300 ${isShopDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Desktop Dropdown Mega Menu */}
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-2 w-[800px] z-50"
                    >
                      <div className="bg-brand-bg border border-brand-text/5 rounded-lg shadow-xl p-8 grid grid-cols-5 gap-6">
                        {mockCategories.map((category) => (
                          <Link 
                            key={category.id} 
                            href={`/shop?category=${category.id}`}
                            className="group flex flex-col items-start text-left"
                          >
                            <div className="relative aspect-square w-full bg-brand-text/5 rounded overflow-hidden mb-3 group-hover:shadow-sm transition-shadow">
                              <Image
                                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80"
                                alt={category.name}
                                fill
                                sizes="140px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-brand-text/5 group-hover:bg-transparent transition-colors" />
                            </div>
                            <span className="text-[11px] font-bold tracking-widest uppercase mb-1 block group-hover:text-brand-accent transition-colors">
                              {category.name}
                            </span>
                            <span className="text-[10px] text-brand-text/60 lowercase italic line-clamp-2 leading-relaxed">
                              {category.description}
                            </span>
                          </Link>
                        ))}
                        {/* Shop all row */}
                        <div className="col-span-5 border-t border-brand-text/5 pt-4 mt-2">
                          <Link
                            href="/shop"
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-brand-accent hover:gap-2.5 transition-all duration-200"
                          >
                            Shop All Products
                            <ChevronDown size={11} className="-rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="#rituals" className="hover:text-brand-accent transition-colors">
                Rituals
              </Link>
              <Link href="#about" className="hover:text-brand-accent transition-colors">
                About
              </Link>
              <Link href="/skin-quiz" className="hover:text-brand-accent transition-colors">
                Skin Quiz
              </Link>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-none text-center">
            <Link 
              href="/" 
              className="font-display text-lg md:text-2xl tracking-['0.08em'] uppercase text-brand-text hover:text-brand-blue transition-colors select-none"
              style={{ WebkitTextStroke: "0px" }}
            >
              Glass<span className="text-brand-accent">Skin</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-brand-accent transition-colors hidden sm:block" 
              aria-label="Search products"
            >
              <Search size={20} className="stroke-[1.5]" />
            </button>
            <Link 
              href="/account"
              className="p-1.5 hover:text-brand-accent transition-colors hidden sm:block" 
              aria-label="User account"
            >
              <User size={20} className="stroke-[1.5]" />
            </Link>
            <Link 
              href="/wishlist"
              className="p-1.5 hover:text-brand-accent transition-colors relative hidden sm:block" 
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart size={20} className="stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-play">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button 
              onClick={openCart}
              className="p-1.5 hover:text-brand-accent transition-colors relative" 
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag size={20} className="stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-play">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Drawer Mega Menu (Slide-in left side menu) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-full max-w-[380px] bg-brand-bg text-brand-text z-50 p-8 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-12">
                  <span className="font-display text-lg uppercase tracking-wide">Glass<span className="text-brand-accent">Skin</span></span>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 hover:text-brand-accent transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Links list */}
                <nav className="flex flex-col gap-6 text-sm uppercase tracking-widest font-semibold">
                  <div className="border-b border-brand-text/10 pb-4">
                    <span className="text-[10px] text-brand-text/40 tracking-[0.2em] uppercase mb-4 block">Categories</span>
                    <div className="flex flex-col gap-4 pl-2">
                      {mockCategories.map((category) => (
                        <Link 
                          key={category.id} 
                          href={`/shop?category=${category.id}`} 
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center justify-between group hover:text-brand-accent transition-colors font-medium text-xs"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform" />
                            {category.name}
                          </span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href="/shop" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:text-brand-accent transition-colors py-2 border-b border-brand-text/10 text-brand-accent"
                  >
                    Shop All Products →
                  </Link>
                  <Link 
                    href="/account" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:text-brand-accent transition-colors py-2 border-b border-brand-text/10 flex items-center justify-between"
                  >
                    <span>Client Portal / Account</span>
                    <User size={16} className="text-brand-accent" />
                  </Link>
                  <Link 
                    href="/wishlist" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:text-brand-accent transition-colors py-2 border-b border-brand-text/10 flex items-center justify-between"
                  >
                    <span>Wishlist</span>
                    <Heart size={16} className="text-brand-accent" />
                  </Link>
                  <Link 
                    href="#rituals" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:text-brand-accent transition-colors py-2 border-b border-brand-text/10"
                  >
                    Curated Rituals
                  </Link>
                  <Link 
                    href="#about" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="hover:text-brand-accent transition-colors py-2 border-b border-brand-text/10"
                  >
                    Our Philosophy
                  </Link>
                </nav>
              </div>

              {/* Drawer footer info */}
              <div className="mt-12 text-[10px] text-brand-text/50 tracking-wider flex flex-col gap-3">
                <p>Support: care@glassskin.com</p>
                <p>© 2026 GLASSSKIN Storefront. Editorial Luxury.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

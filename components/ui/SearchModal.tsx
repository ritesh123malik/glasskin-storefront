"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/products";
import { getProductsFromSupabase } from "@/lib/supabase";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Load products from Supabase helper on mount or open
  useEffect(() => {
    if (isOpen && products.length === 0) {
      getProductsFromSupabase().then((data) => {
        setProducts(data);
      });
    }
  }, [isOpen, products.length]);

  // Handle live filtering
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }
    const q = query.toLowerCase();
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setFilteredProducts(results);
  }, [query, products]);

  // Handle Cmd+K / Ctrl+K and Escape key shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl mx-auto bg-brand-bg text-brand-text rounded-xl shadow-2xl overflow-hidden border border-brand-text/10"
          >
            {/* Input Header */}
            <div className="flex items-center px-6 py-4 border-b border-brand-text/10 gap-3">
              <Search size={20} className="text-brand-accent shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search formulations, categories, or benefits... (Cmd+K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-brand-text placeholder-brand-text/40 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-brand-text/40 hover:text-brand-text transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold text-brand-text/40 bg-brand-text/5 border border-brand-text/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Results / Suggestions Body */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {!query.trim() ? (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-accent block mb-3">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Glass Skin", "Cleansing Oil", "SPF 50", "Ceramides", "Serums"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs bg-brand-text/5 hover:bg-brand-accent/15 hover:text-brand-accent border border-brand-text/10 px-3.5 py-1.5 rounded-full transition-all duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-text/40 block mb-3">
                    Featured Formulations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.slice(0, 4).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-brand-text/5 hover:border-brand-accent/30 hover:bg-brand-text/5 transition-all duration-200 group"
                      >
                        <div className="relative aspect-square w-12 rounded overflow-hidden bg-brand-text/5 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase tracking-wider text-brand-accent font-semibold block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-rounded font-extrabold text-brand-text group-hover:text-brand-blue transition-colors truncate">
                            {product.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-brand-text/60">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles size={28} className="mx-auto text-brand-text/20 mb-3" />
                  <p className="text-sm text-brand-text/60 font-light mb-1">
                    No formulations found for &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-brand-text/40">
                    Try searching for cleansers, serums, ceramides, or SPF.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-brand-text/40 font-semibold mb-2">
                    <span>Results ({filteredProducts.length})</span>
                    <span>Click to view</span>
                  </div>
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-lg border border-brand-text/5 hover:border-brand-accent/40 hover:bg-brand-text/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative aspect-square w-12 rounded overflow-hidden bg-brand-text/5 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-brand-accent font-semibold block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-rounded font-extrabold text-brand-text group-hover:text-brand-blue transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-brand-text/50 truncate">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-xs font-semibold text-brand-text">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-brand-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-6 py-3 bg-brand-text/5 border-t border-brand-text/10 flex items-center justify-between text-[10px] text-brand-text/50">
              <span>Press <kbd className="font-semibold text-brand-text/70">ESC</kbd> to close</span>
              <Link
                href="/shop"
                onClick={onClose}
                className="hover:text-brand-accent transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider"
              >
                View full catalog →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

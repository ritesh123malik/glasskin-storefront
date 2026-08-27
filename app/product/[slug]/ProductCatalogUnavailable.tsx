"use client";

import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function ProductCatalogUnavailable({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-6 text-center">
        <div>
          <span className="sticker bg-brand-pink text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">Catalog unavailable</span>
          <h1 className="heading-display text-brand-text text-3xl md:text-5xl mb-4">We could not load this product</h1>
          <p className="text-sm text-brand-text/60 max-w-md">{message}</p>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

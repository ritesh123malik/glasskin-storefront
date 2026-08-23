"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Package,
  LogOut,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

// Stub order history data
const MOCK_ORDERS = [
  {
    id: "GLS-98421",
    date: "August 18, 2026",
    status: "Delivered",
    total: 4398,
    items: [
      {
        name: "Glass Skin Glaze Serum",
        category: "Serums",
        price: 2499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Gentle Rice Bran Cleansing Oil",
        category: "Cleansers",
        price: 1899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "GLS-74102",
    date: "July 02, 2026",
    status: "Delivered",
    total: 4999,
    items: [
      {
        name: "The Glass Skin Ritual Trio",
        category: "Gift Sets",
        price: 4999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

function AccountContent() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Fetch initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Send Magic Link using Supabase Auth
  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setAuthLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
        },
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setAuthSent(true);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred while sending login link.";
      setAuthError(errorMsg);
    } finally {
      setAuthLoading(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setAuthSent(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center pt-24">
        <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* If user is NOT logged in: Show Magic Link Authentication Form */}
        {!session ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4 text-brand-accent">
                <User size={30} className="stroke-[1.5]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-2">
                Client Portal
              </span>
              <h1 className="font-serif text-3xl font-light tracking-wide mb-2">
                Sign In to GLASSSKIN
              </h1>
              <p className="text-xs text-brand-text/60 leading-relaxed">
                Enter your email address to receive a secure, passwordless magic link to access your order history and skin profile.
              </p>
            </div>

            <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6 sm:p-8 shadow-sm">
              {authSent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <Mail size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-medium">Check your inbox</h3>
                  <p className="text-xs text-brand-text/70 leading-relaxed">
                    We sent a magic login link to <strong className="text-brand-text font-semibold">{email}</strong>. Click the link in your email to instantly sign in.
                  </p>
                  <button
                    onClick={() => setAuthSent(false)}
                    className="text-[10px] uppercase tracking-widest font-semibold text-brand-accent hover:underline pt-2 block mx-auto"
                  >
                    Use a different email address
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email-input"
                      className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/60 block mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email-input"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-bg border border-brand-text/20 rounded-lg px-4 py-3 text-xs text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  {authError && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-3">
                      {authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading || !email.trim()}
                    className="w-full bg-brand-accent hover:bg-brand-secondary text-brand-bg py-3.5 px-6 rounded-lg text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {authLoading ? (
                      <span className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-3 text-[10px] text-brand-text/40">
                    <ShieldCheck size={12} className="text-brand-accent" />
                    <span>Passwordless & Secure Authentication via Supabase</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* If user IS logged in: Show Account Dashboard & Order History */
          <div className="space-y-10">
            {/* User Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-text/10 pb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-1">
                  Welcome Back
                </span>
                <h1 className="font-serif text-3xl font-light tracking-wide">
                  {session.user.email}
                </h1>
                <p className="text-xs text-brand-text/50 mt-1">
                  Client ID: <span className="font-mono">{session.user.id.slice(0, 8)}...</span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border border-brand-text/20 hover:border-red-500 hover:text-red-500 px-4 py-2.5 rounded-lg transition-colors w-fit"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6">
                <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold block mb-2">
                  Membership Tier
                </span>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-accent" />
                  <h3 className="font-serif text-xl">De Luxe Society</h3>
                </div>
                <p className="text-xs text-brand-text/60 mt-2 leading-relaxed">
                  Enjoy complimentary express shipping and early access to new formulation drops.
                </p>
              </div>

              <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6">
                <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold block mb-2">
                  Total Orders
                </span>
                <h3 className="font-serif text-3xl">{MOCK_ORDERS.length}</h3>
                <p className="text-xs text-brand-text/60 mt-2">
                  Last order placed on August 18, 2026
                </p>
              </div>

              <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6">
                <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold block mb-2">
                  Skin Concierge
                </span>
                <h3 className="font-serif text-xl">Active Care</h3>
                <p className="text-xs text-brand-text/60 mt-2">
                  Concierge available 24/7 at <strong className="text-brand-text font-medium">care@glassskin.com</strong>
                </p>
              </div>
            </div>

            {/* Order History Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-light tracking-wide">Order History</h2>
                  <p className="text-xs text-brand-text/50">View your past purchases and shipment statuses.</p>
                </div>
                <Package size={20} className="text-brand-accent" />
              </div>

              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-text/10 pb-4 gap-2 text-xs">
                      <div>
                        <span className="font-bold tracking-wider">{order.id}</span>
                        <span className="text-brand-text/40 mx-2">•</span>
                        <span className="text-brand-text/60">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {order.status}
                        </span>
                        <span className="font-semibold text-sm">
                          ₹{order.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y divide-brand-text/5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative aspect-square w-12 rounded overflow-hidden bg-brand-text/5 shrink-0">
                              <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                            </div>
                            <div>
                              <h4 className="font-serif text-sm font-light text-brand-text">{item.name}</h4>
                              <span className="text-[10px] text-brand-text/50 uppercase tracking-wider">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <AccountContent />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

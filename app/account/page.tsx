"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

type OrderItem = {
  product_name: string;
  variant_title: string;
  quantity: number;
  unit_price: number;
};

type OrderShipment = {
  status: string | null;
  carrier: string | null;
  tracking_number: string | null;
};

type AccountOrder = {
  id: string;
  order_number: number;
  status: string;
  grand_total: number;
  created_at: string;
  items: OrderItem[];
  shipments: OrderShipment[] | null;
};

function AccountContent() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestingId, setRequestingId] = useState<string | null>(null);

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

  // Fetch the signed-in customer's real orders (RLS restricts to their own).
  useEffect(() => {
    if (!session) {
      setOrders([]);
      return;
    }
    let active = true;
    setOrdersLoading(true);
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_number, status, grand_total, created_at, items:order_items(product_name, variant_title, quantity, unit_price), shipments(status, carrier, tracking_number)")
        .order("created_at", { ascending: false });
      if (active) setOrders((data as unknown as AccountOrder[]) ?? []);
      if (active) setOrdersLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [session]);

  async function handleRequest(orderId: string, type: "cancel" | "return") {
    setRequestError("");
    setRequestingId(orderId);
    try {
      const res = await fetch(`/api/account/orders/${orderId}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          reason: type === "cancel" ? "Requested cancellation from account page." : "Requested return from account page.",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setRequestError(data.error ?? "Request failed.");
      } else {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, status: type === "cancel" ? "cancelled" : order.status }
              : order
          )
        );
      }
    } catch {
      setRequestError("Network error. Please try again.");
    } finally {
      setRequestingId(null);
    }
  }

  // Send Magic Link using Supabase Auth (server-validated + rate-limited route)
  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAuthError(data.error ?? "Could not send login link.");
      } else {
        setAuthSent(true);
      }
    } catch {
      setAuthError("An error occurred while sending login link.");
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
              <span className="sticker bg-brand-sky text-white text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
                Client Portal
              </span>
              <h1 className="heading-display text-brand-text text-3xl md:text-5xl mb-2">
                Welcome to the <span className="text-brand-magenta">glow club</span>
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
                  <div className="w-12 h-12 rounded-full bg-brand-mint text-brand-text flex items-center justify-center mx-auto shadow-play">
                    <Mail size={22} />
                  </div>
                  <h3 className="font-rounded text-xl font-extrabold">Check your inbox</h3>
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
                        className="w-full bg-brand-bg border border-brand-text/20 rounded-full px-5 py-3 text-xs text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-accent transition-colors"
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
                    className="btn-play-solid bg-brand-accent w-full py-4 text-xs uppercase tracking-[0.2em]"
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
                <span className="sticker bg-brand-mint text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-4 inline-flex shadow-play">
                  Welcome Back
                </span>
                <h1 className="heading-display text-brand-text text-3xl">
                  {session.user.email}
                </h1>
                <p className="text-xs text-brand-text/50 mt-1">
                  Client ID: <span className="font-mono">{session.user.id.slice(0, 8)}...</span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-brand-text/20 hover:border-red-500 hover:text-red-500 px-4 py-2.5 rounded-full transition-colors w-fit"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-4 border-brand-yellow rounded-3xl p-6 shadow-play">
                <span className="sticker bg-brand-yellow text-brand-text text-[10px] px-4 py-1 -rotate-2 mb-3 inline-flex shadow-play">
                  Membership Tier
                </span>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-accent" />
                  <h3 className="font-rounded text-xl font-extrabold">De Luxe Society</h3>
                </div>
                <p className="font-rounded text-sm text-brand-text/60 font-semibold mt-2 leading-snug">
                  Enjoy complimentary express shipping and early access to new glow drops.
                </p>
              </div>

              <div className="bg-white border-4 border-brand-sky rounded-3xl p-6 shadow-play">
                <span className="sticker bg-brand-sky text-white text-[10px] px-4 py-1 -rotate-2 mb-3 inline-flex shadow-play">
                  Total Orders
                </span>
                <h3 className="font-display text-4xl">{orders.length}</h3>
                <p className="font-rounded text-sm text-brand-text/60 font-semibold mt-2">
                  {orders.length > 0
                    ? `Last order on ${new Date(orders[0].created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`
                    : "No orders yet"}
                </p>
              </div>

              <div className="bg-white border-4 border-brand-pink rounded-3xl p-6 shadow-play">
                <span className="sticker bg-brand-magenta text-white text-[10px] px-4 py-1 -rotate-2 mb-3 inline-flex shadow-play">
                  Skin Concierge
                </span>
                <h3 className="font-rounded text-xl font-extrabold">Active Care</h3>
                <p className="font-rounded text-sm text-brand-text/60 font-semibold mt-2">
                  Concierge available 24/7 at <strong className="text-brand-text font-bold">care@glassskin.com</strong>
                </p>
              </div>
            </div>

            {/* Order History Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="heading-display text-brand-text text-2xl md:text-3xl">Your Orders</h2>
                  <p className="text-xs text-brand-text/50">View your past purchases and shipment statuses.</p>
                </div>
                <Package size={20} className="text-brand-accent" />
              </div>

              <div className="space-y-6">
                {ordersLoading ? (
                  <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6 text-xs text-brand-text/50">
                    Loading your orders…
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-brand-text/5 border border-brand-text/10 rounded-xl p-6 text-xs text-brand-text/50">
                    You haven&apos;t placed any orders yet.
                  </div>
                ) : (
                  orders.map((order) => {
                    const shipment = order.shipments?.[0];
                    const canRequest =
                      order.status === "confirmed" ||
                      order.status === "processing" ||
                      order.status === "shipped";
                    return (
                      <div
                        key={order.id}
                        className="bg-brand-text/5 border border-brand-text/10 rounded-2xl p-6 space-y-4 shadow-play"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-text/10 pb-4 gap-2 text-xs">
                          <div>
                            <span className="font-bold tracking-wider">#{order.order_number}</span>
                            <span className="text-brand-text/40 mx-2">•</span>
                            <span className="text-brand-text/60">
                              {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              order.status === "cancelled" || order.status === "refunded"
                                ? "bg-brand-red text-brand-bg"
                                : order.status === "delivered"
                                  ? "bg-brand-mint text-brand-text"
                                  : "bg-brand-accent/15 text-brand-text"
                            }`}>
                              {order.status.replace(/_/g, " ")}
                            </span>
                            <span className="font-semibold text-sm">
                              ₹{order.grand_total.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="divide-y divide-brand-text/5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-3 flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                <h4 className="font-rounded text-sm font-extrabold text-brand-text">{item.product_name}</h4>
                                <span className="text-[10px] text-brand-text/50 uppercase tracking-wider">
                                  {item.variant_title} · Qty: {item.quantity}
                                </span>
                              </div>
                              <span className="text-xs font-semibold">
                                ₹{item.unit_price.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>

                        {shipment?.tracking_number && (
                          <p className="text-[11px] text-brand-text/60">
                            {shipment.carrier}: <span className="font-mono">{shipment.tracking_number}</span> ({shipment.status})
                          </p>
                        )}

                        {canRequest && (
                          <div className="flex items-center gap-3 pt-1">
                            <button
                              onClick={() => handleRequest(order.id, "return")}
                              disabled={requestingId === order.id}
                              className="text-[10px] uppercase tracking-widest font-semibold border border-brand-text/20 hover:border-brand-accent px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                              Request Return
                            </button>
                            <button
                              onClick={() => handleRequest(order.id, "cancel")}
                              disabled={requestingId === order.id}
                              className="text-[10px] uppercase tracking-widest font-semibold border border-brand-text/20 hover:border-red-500 hover:text-red-500 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                              Cancel Order
                            </button>
                          </div>
                        )}
                        <Link
                          href={`/order/${order.order_number}`}
                          className="text-[10px] uppercase tracking-widest font-semibold text-brand-accent hover:underline inline-flex items-center gap-1"
                        >
                          Track Order <ArrowRight size={11} />
                        </Link>
                      </div>
                    );
                  })
                )}
                {requestError && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-3">{requestError}</p>
                )}
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
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <Header />
        <AccountContent />
        <Footer />
        <CartDrawer />
    </div>
  );
}

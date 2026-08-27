"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  Check,
  Truck,
  Clock3,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

type Step = { label: string; time?: string; done: boolean; state: string };
type Order = {
  order_number: string;
  status: string;
  payment_method: string;
  currency: string;
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  grand_total: number;
  created_at: string;
  shipping_address: Record<string, string>;
  items?: {
    product_name: string;
    variant_title: string;
    sku: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[];
  shipments?: { carrier?: string; tracking_number?: string }[];
};

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  confirmed: "Order confirmed",
  processing: "Being prepared",
  shipped: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const CURRENCY_SYMBOL: Record<string, string> = { INR: "₹", USD: "$", GBP: "£", EUR: "€" };

function OrderTracking() {
  const params = useParams();
  const raw = params.number;
  const number = Array.isArray(raw) ? raw[0] : typeof raw === "string" ? raw : "";

  const [lookup, setLookup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<Step[]>([]);

  async function fetchOrder(num: string) {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(num)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "We could not find that order.");
        return;
      }
      setOrder(data.order);
      setTimeline(data.timeline);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (number) fetchOrder(number);
  }, [number]);

  const symbol = CURRENCY_SYMBOL[order?.currency ?? "INR"] ?? "₹";
  const statusLabel = order ? STATUS_LABEL[order.status] ?? order.status : "";

  const inputCls =
    "w-full border border-brand-text/15 rounded-sm px-3.5 py-3 text-xs bg-transparent focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/30 uppercase tracking-wider";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!lookup.trim()) return;
    fetchOrder(lookup.trim());
  }

  const selectedStep =
    timeline.find((s) => s.state === "active" || s.state === "cancelled") ?? timeline[timeline.length - 1];

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-24 pb-32">
      {/* Header */}
      <div className="border-b border-brand-text/5 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center mx-auto mb-6 shadow-play -rotate-6">
            <Package size={30} className="text-brand-text stroke-[2]" />
          </div>
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mb-3">Track your order</h1>
          <p className="text-sm text-brand-text/55 max-w-md mx-auto leading-relaxed">
            Enter your order number to see the latest status of your GLASSSKIN delivery.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-2 mb-12">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text/30" />
            <input
              value={lookup}
              onChange={(e) => setLookup(e.target.value)}
              placeholder="e.g. GS-XXXXXX"
              className={`${inputCls} pl-10`}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 text-[10px] uppercase tracking-widest font-extrabold font-rounded bg-brand-accent text-brand-bg rounded-full hover:bg-brand-magenta transition-colors flex items-center gap-1.5"
          >
            Track <ArrowRight size={12} />
          </button>
        </form>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-brand-text/40 text-xs uppercase tracking-widest py-16">
            <Loader2 size={16} className="animate-spin" /> Looking up order…
          </div>
        )}

        {error && (
          <div className="max-w-lg mx-auto text-center bg-red-50 border border-red-200 rounded-lg px-6 py-10">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <X size={22} className="text-red-500" />
            </div>
            <p className="text-sm font-semibold text-red-700 mb-1">Order not found</p>
            <p className="text-xs text-red-600/70">{error}</p>
          </div>
        )}

        {order && !loading && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
              {/* Left: timeline + summary */}
              <div>
                {/* Status card */}
                <div className="border border-brand-text/8 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-text/45 mb-1">Order</p>
                      <p className="font-mono text-sm font-bold">#{order.order_number}</p>
                    </div>
                    <span
                      className={`sticker inline-flex text-[10px] px-4 py-1 shadow-play ${
                        order.status === "cancelled" || order.status === "refunded"
                          ? "bg-brand-red text-brand-bg"
                          : order.status === "pending_payment"
                            ? "bg-brand-yellow text-brand-text"
                            : order.status === "delivered"
                              ? "bg-brand-mint text-brand-text"
                              : "bg-brand-accent text-brand-bg"
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* Timeline */}
                  <div className="relative pl-1">
                    {timeline.map((step, index) => {
                      const isLast = index === timeline.length - 1;
                      const done = step.state === "complete";
                      const isActive = step.state === "active";
                      const isCancelled = step.state === "cancelled";
                      return (
                        <div key={step.label} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                done
                                  ? "bg-brand-accent border-brand-accent text-brand-bg"
                                  : isActive
                                    ? "bg-brand-yellow border-brand-yellow text-brand-text"
                                    : isCancelled
                                      ? "bg-brand-red border-brand-red text-brand-bg"
                                      : "border-brand-text/15 text-brand-text/30"
                              }`}
                            >
                              {done ? <Check size={14} /> : isActive ? <Clock3 size={14} /> : isCancelled ? <X size={14} /> : <span className="w-1.5 h-1.5 rounded-full bg-brand-text/20" />}
                            </div>
                            {!isLast && <div className={`w-0.5 h-10 ${done ? "bg-brand-accent" : "bg-brand-text/10"}`} />}
                          </div>
                          <div className="pb-8">
                            <p className={`text-sm font-bold font-rounded ${done || isActive ? "text-brand-text" : "text-brand-text/35"}`}>{step.label}</p>
                            {step.time && (
                              <p className="text-[10px] text-brand-text/40 mt-0.5 uppercase tracking-wider">
                                {new Date(step.time).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectedStep?.label && !loading && (
                      <p className="text-[11px] text-brand-text/55 mt-1">
                        {selectedStep.label === "Cancelled"
                          ? "This order was cancelled."
                          : `Your order is at: ${selectedStep.label.toLowerCase()}.`}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="border border-brand-text/8 rounded-lg overflow-hidden">
                  <div className="bg-brand-text/2 px-6 py-4 border-b border-brand-text/8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest">Items</h2>
                  </div>
                  <ul className="divide-y divide-brand-text/5">
                    {(order.items ?? []).map((item, index) => (
                      <li key={index} className="px-6 py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold font-rounded truncate">{item.product_name}</p>
                          <p className="text-[11px] text-brand-text/45 mt-0.5">{item.variant_title} · Qty {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold flex-none">{symbol}{item.line_total.toLocaleString("en-IN")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: totals + delivery */}
              <div>
                <div className="border border-brand-text/8 rounded-lg overflow-hidden lg:sticky lg:top-28">
                  <div className="bg-brand-text/2 px-6 py-4 border-b border-brand-text/8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest">Summary</h2>
                  </div>
                  <div className="px-6 py-5 space-y-2.5 text-sm">
                    <div className="flex justify-between text-brand-text/70"><span>Subtotal</span><span>{symbol}{order.subtotal.toLocaleString("en-IN")}</span></div>
                    {order.discount_total > 0 && (
                      <div className="flex justify-between text-green-700"><span>Discount</span><span>−{symbol}{order.discount_total.toLocaleString("en-IN")}</span></div>
                    )}
                    <div className="flex justify-between text-brand-text/70"><span>Shipping</span><span>{order.shipping_total === 0 ? "Free" : symbol + order.shipping_total.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-base font-semibold border-t border-brand-text/10 pt-3 mt-1">
                      <span>Total</span><span>{symbol}{order.grand_total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="border-t border-brand-text/8 px-6 py-4">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2 flex items-center gap-1.5">
                      <Truck size={11} className="text-brand-accent" /> Delivery to
                    </p>
                    <p className="text-xs text-brand-text/75 leading-relaxed">
                      {order.shipping_address?.name && <><span className="font-semibold">{order.shipping_address.name}</span><br /></>}
                      {order.shipping_address?.line1}
                      {order.shipping_address?.line2 ? `, ${order.shipping_address.line2}` : ""}
                      <br />
                      {order.shipping_address?.city}{order.shipping_address?.state ? `, ${order.shipping_address.state}` : ""} {order.shipping_address?.pincode ?? ""}
                    </p>
                    {order.shipments?.[0]?.tracking_number && (
                      <p className="text-[11px] text-brand-text/50 mt-3">
                        Tracking: <span className="font-mono">{order.shipments[0].tracking_number}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!order && !error && !loading && (
          <div className="text-center text-brand-text/40 text-xs uppercase tracking-widest py-8">
            Enter an order number above to track your delivery.
          </div>
        )}

        {/* Trust */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-16">
          <span className="flex items-center gap-1.5 text-[10px] text-brand-text/40 uppercase tracking-wider"><ShieldCheck size={11} className="text-brand-accent" /> Secure order lookup</span>
          <span className="flex items-center gap-1.5 text-[10px] text-brand-text/40 uppercase tracking-wider"><RotateCcw size={11} className="text-brand-accent" /> 30-day returns</span>
          <Link href="/contact" className="flex items-center gap-1.5 text-[10px] text-brand-text/40 uppercase tracking-wider hover:text-brand-accent"><Clock3 size={11} className="text-brand-accent" /> Need help? Contact support</Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <OrderTracking />
      <Footer />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type AdminOrderRow = {
  id: string;
  order_number: number;
  status: string;
  grand_total: number;
  currency: string;
  customer_email: string;
  created_at: string;
};

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/admin/orders${status ? `?status=${status}` : ""}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error ?? "Failed to load orders.");
        return res.json();
      })
      .then((data) => active && setOrders(data.orders))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [status]);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text px-6 md:px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="heading-display text-brand-text text-3xl md:text-5xl mb-6">Orders</h1>

        <div className="flex items-center gap-2 mb-6">
          {["", "pending_payment", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-full border transition-colors ${
                status === s ? "bg-brand-text text-brand-bg border-brand-text" : "border-brand-text/20 hover:border-brand-text"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4">{error}</p>}
        {loading ? (
          <p className="text-sm text-brand-text/50">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-brand-text/50">No orders found.</p>
        ) : (
          <div className="border border-brand-text/10 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-brand-text/5 text-brand-text/60">
                <tr>
                  <th className="text-left p-3">Order</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Total</th>
                  <th className="text-right p-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-text/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-text/5">
                    <td className="p-3 font-semibold">#{order.order_number}</td>
                    <td className="p-3">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="p-3">{order.customer_email}</td>
                    <td className="p-3 uppercase tracking-wider">{order.status.replace(/_/g, " ")}</td>
                    <td className="p-3 text-right">₹{order.grand_total.toLocaleString("en-IN")}</td>
                    <td className="p-3 text-right">
                      <Link href={`/admin/orders/${order.id}`} className="text-brand-accent hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

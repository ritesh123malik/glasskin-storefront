"use client";

import React, { useEffect, useState } from "react";

type OrderPayload = {
  id: string;
  order_number: number;
  status: string;
  grand_total: number;
  currency: string;
  customer_email: string;
  admin_notes: string | null;
  items: { product_name: string; variant_title: string; quantity: number; unit_price: number }[];
  payments: { method: string; status: string; amount: number }[];
  shipments: { status: string | null; carrier: string | null; tracking_number: string | null }[];
  return_requests: { id: string; reason: string; status: string }[];
};

export default function AdminOrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderPayload | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [note, setNote] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [restock, setRestock] = useState(false);

  async function load() {
    const res = await fetch(`/api/admin/orders/${orderId}`);
    if (!res.ok) {
      setError((await res.json()).error ?? "Failed to load order.");
      return;
    }
    const data = await res.json();
    setOrder(data.order);
    setNote(data.order.admin_notes ?? "");
  }

  useEffect(() => {
    load().catch(() => setError("Failed to load order."));
  }, [orderId]);

  async function act(body: unknown, successMessage: string) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Action failed.");
      } else {
        setMessage(successMessage);
        await load();
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  if (error && !order) return <main className="min-h-screen flex items-center justify-center text-brand-text"><p className="text-sm text-red-600">{error}</p></main>;
  if (!order) return <main className="min-h-screen flex items-center justify-center text-brand-text"><p className="text-sm">Loading…</p></main>;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="heading-display text-brand-text text-3xl md:text-4xl">Order #{order.order_number}</h1>
          <span className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold ${
            order.status === "cancelled" || order.status === "refunded"
              ? "bg-brand-red text-brand-bg"
              : order.status === "delivered"
                ? "bg-brand-mint text-brand-text"
                : "bg-brand-accent text-brand-bg"
          }`}>
            {order.status.replace(/_/g, " ")}
          </span>
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</p>}
        {message && <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded p-3">{message}</p>}

        <section className="border border-brand-text/10 rounded-2xl p-6 shadow-play">
          <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-4">Items</h2>
          <ul className="divide-y divide-brand-text/5 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="py-3 flex justify-between gap-4">
                <span className="min-w-0">{item.product_name} · {item.variant_title} · ×{item.quantity}</span>
                <span className="font-semibold flex-none">₹{item.unit_price.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-semibold mt-4">Total ₹{order.grand_total.toLocaleString("en-IN")}</p>
        </section>

        <section className="border border-brand-text/10 rounded-2xl p-6 space-y-4 shadow-play">
          <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2">Fulfilment</h2>
          <div className="flex flex-wrap gap-2">
            {(["processing", "shipped", "delivered", "cancelled"] as const).map((s) => (
              <button
                key={s}
                disabled={busy}
                onClick={() => act({ action: "state", status: s }, `Order marked ${s}.`)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-colors disabled:opacity-50 ${
                  s === "cancelled"
                    ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-bg"
                    : "border-brand-text/20 hover:border-brand-accent hover:text-brand-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Carrier"
              className="flex-1 bg-transparent border border-brand-text/20 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-accent"
            />
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Tracking number"
              className="flex-1 bg-transparent border border-brand-text/20 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-accent"
            />
            <button
              disabled={busy || !carrier || !trackingNumber}
              onClick={() => act({ action: "tracking", carrier, trackingNumber }, "Tracking added.")}
              className="btn-play-solid bg-brand-text text-brand-bg px-5 py-2 text-[10px] disabled:opacity-50"
            >
              Add Tracking
            </button>
          </div>

          {order.shipments?.[0] && (
            <p className="text-[11px] text-brand-text/60">
              Current: {order.shipments[0].carrier} {order.shipments[0].tracking_number} ({order.shipments[0].status})
            </p>
          )}
        </section>

        {order.payments?.some((p) => p.method === "cash_on_delivery" && p.status === "cod_pending_collection") && (
          <section className="border border-brand-text/10 rounded-2xl p-6 space-y-3 shadow-play">
            <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2">Cash on Delivery</h2>
            <p className="text-[11px] text-brand-text/60">Payment is due at delivery.</p>
            <button
              disabled={busy}
              onClick={() => act({ action: "collect_cod" }, "COD payment collected; order moved to processing.")}
              className="btn-play-solid bg-brand-mint text-brand-text px-5 py-2 text-[10px] disabled:opacity-50"
            >
              Mark COD Collected
            </button>
          </section>
        )}

        <section className="border border-brand-text/10 rounded-2xl p-6 space-y-3 shadow-play">
          <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2">Note</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full bg-transparent border border-brand-text/20 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-accent"
          />
          <button
            disabled={busy}
            onClick={() => act({ action: "note", note }, "Note saved.")}
            className="px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full border border-brand-text/20 hover:border-brand-accent hover:text-brand-accent disabled:opacity-50"
          >
            Save Note
          </button>
        </section>

        <section className="border border-brand-text/10 rounded-2xl p-6 space-y-3 shadow-play">
          <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2">Refund</h2>
          <p className="text-[11px] text-brand-text/60">
            Payments: {order.payments.map((p) => `${p.method} · ${p.status} · ₹${p.amount.toLocaleString("en-IN")}`).join(", ")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              placeholder="Amount (empty = full)"
              inputMode="numeric"
              className="flex-1 bg-transparent border border-brand-text/20 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-accent"
            />
            <label className="flex items-center gap-2 text-xs text-brand-text/60">
              <input type="checkbox" checked={restock} onChange={(e) => setRestock(e.target.checked)} />
              Restock inventory
            </label>
            <button
              disabled={busy}
              onClick={() =>
                act(
                  { action: "refund", amount: refundAmount ? Number(refundAmount) : undefined, restock },
                  "Refund processed."
                )
              }
              className="btn-play-solid bg-brand-red text-brand-bg px-5 py-2 text-[10px] disabled:opacity-50"
            >
              Refund
            </button>
          </div>
        </section>

        {order.return_requests?.length > 0 && (
          <section className="border border-brand-text/10 rounded-2xl p-6 shadow-play">
            <h2 className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 mb-2">Return Requests</h2>
            <ul className="text-xs space-y-2">
              {order.return_requests.map((r) => (
                <li key={r.id} className="text-brand-text/70">
                  {r.status}: {r.reason}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

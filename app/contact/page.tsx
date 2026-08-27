"use client";

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <span className="sticker bg-brand-sky text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">Get in touch</span>
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">Let&apos;s <span className="text-brand-blue">chat</span></h1>
        <p className="text-sm text-brand-text/60 leading-relaxed mb-10">
          Have a question about an order, a product, or our ingredients? We respond within 24 hours on business days.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center gap-2">
            <Mail size={20} className="text-brand-accent" />
            <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50">Email</p>
            <a href="mailto:support@glasskin.in" className="text-xs hover:text-brand-accent">support@glasskin.in</a>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Phone size={20} className="text-brand-accent" />
            <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50">Phone</p>
            <a href="tel:+911145678900" className="text-xs hover:text-brand-accent">+91 11 4567 8900</a>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <MapPin size={20} className="text-brand-accent" />
            <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50">Office</p>
            <p className="text-xs">[Registered Address], New Delhi 110001</p>
          </div>
        </div>

        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center">
            <p className="text-sm text-green-800">Thank you! We&apos;ll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent" />
            </div>
            <select name="subject" value={form.subject} onChange={handleChange} required className="w-full border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent">
              <option value="">Subject…</option>
              <option value="order">Order enquiry</option>
              <option value="product">Product question</option>
              <option value="return">Return / refund</option>
              <option value="wholesale">Wholesale / press</option>
              <option value="other">Other</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help?" className="w-full border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent resize-none" />
            {status === "error" && <p className="text-xs text-red-600">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === "sending"} className="btn-play-solid bg-brand-accent px-8 py-3.5 text-[11px] disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

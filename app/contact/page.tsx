"use client";

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "care@glassskin.com",
    href: "mailto:care@glassskin.com",
    bg: "bg-brand-sky/30",
    color: "text-brand-blue",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 11 4567 8900",
    href: "tel:+911145678900",
    bg: "bg-brand-mint/30",
    color: "text-brand-green",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "New Delhi, India 110001",
    href: undefined,
    bg: "bg-brand-pink/30",
    color: "text-brand-magenta",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
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

      <main className="pt-24 pb-32" id="main-content">
        {/* ── Page hero ── */}
        <div className="bg-brand-sky/25 border-b-[3px] border-brand-text/10 py-14 md:py-20 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="sticker bg-brand-sky text-brand-text -rotate-2 mb-5 inline-flex shadow-btn">
              Get in Touch
            </span>
            <h1 className="heading-section text-brand-text mt-3 mb-4"
                style={{ fontSize: "var(--type-h2)" }}>
              Let&apos;s{" "}
              <span className="text-brand-blue underline-squiggle">chat</span>
            </h1>
            <p className="font-rounded text-base text-brand-text/65 font-medium max-w-md leading-relaxed">
              Questions about an order, our ingredients, or want to partner with us?
              We reply within 24 hours on business days.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 mt-12">
          {/* ── Contact cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {contactInfo.map(({ icon: Icon, label, value, href, bg, color }) => (
              <div
                key={label}
                className={`${bg} rounded-2xl border-[3px] border-brand-text p-5 flex flex-col items-center text-center gap-3 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200`}
              >
                <Icon size={22} className={`${color} stroke-[2.5]`} />
                <p className="text-[0.6rem] uppercase tracking-widest font-extrabold text-brand-text/45 font-rounded">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className={`text-xs font-rounded font-extrabold ${color} hover:underline`}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-xs font-rounded font-medium text-brand-text/70">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ── Form ── */}
          {status === "sent" ? (
            <div className="bg-brand-mint/30 border-[3px] border-brand-green rounded-2xl p-10 text-center flex flex-col items-center gap-4 shadow-card">
              <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center shadow-btn">
                <Check size={24} className="text-white stroke-[3]" />
              </div>
              <h2 className="font-display text-2xl uppercase text-brand-text">
                Message Received!
              </h2>
              <p className="text-sm font-rounded text-brand-text/65">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white border-[3px] border-brand-text rounded-3xl p-7 md:p-10 shadow-card space-y-5"
            >
              <h2 className="font-display text-xl uppercase text-brand-text mb-1">
                Send a Message
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/50">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="input-play text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/50">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="input-play text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/50">
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="input-play text-sm appearance-none bg-white"
                >
                  <option value="">Select a subject…</option>
                  <option value="order">Order enquiry</option>
                  <option value="product">Product question</option>
                  <option value="return">Return / refund</option>
                  <option value="wholesale">Wholesale / press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[0.6rem] uppercase tracking-widest font-rounded font-extrabold text-brand-text/50">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="input-play text-sm resize-none rounded-2xl"
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-xs text-brand-red font-rounded font-extrabold">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-play bg-brand-accent text-white text-[0.65rem] px-8 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

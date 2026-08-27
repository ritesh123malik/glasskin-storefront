"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm({ onSubmit }: { onSubmit: (data: { rating: number; title: string; body: string }) => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    setSubmitting(true);
    onSubmit({ rating, title, body });
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50 block mb-2">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
              className="focus:outline-none"
            >
              <Star
                size={20}
                className={
                  s <= (hoverRating || rating)
                    ? "fill-brand-accent text-brand-accent"
                    : "text-brand-text/20"
                }
              />
            </button>
          ))}
        </div>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Review title (optional)"
        className="w-full border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Share your experience with this product…"
        className="w-full border border-brand-text/15 rounded-sm px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-brand-accent resize-none"
      />
      <button
        type="submit"
        disabled={!rating || submitting}
        className="btn-play-solid bg-brand-accent px-6 py-2.5 text-[10px] disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}

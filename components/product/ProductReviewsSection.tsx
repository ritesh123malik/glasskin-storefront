"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ReviewCard from "@/components/product/ReviewCard";
import ReviewForm from "@/components/product/ReviewForm";

type Review = {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  customer?: { full_name: string | null } | null;
};

export default function ProductReviewsSection({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`/api/reviews/${slug}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  async function handleSubmit(data: { rating: number; title: string; body: string }) {
    try {
      const res = await fetch(`/api/reviews/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) setShowForm(false);
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section className="border-t border-brand-text/5 pt-10 mt-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-2">
            Customer Reviews
          </span>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className={s <= Math.round(Number(avgRating)) ? "fill-brand-accent text-brand-accent" : "text-brand-text/20"} />
              ))}
            </div>
            <span className="text-sm text-brand-text/60">{avgRating} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] uppercase tracking-widest font-semibold text-brand-accent hover:text-brand-secondary transition-colors"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-4 border border-brand-text/10 rounded-sm">
          <ReviewForm onSubmit={handleSubmit} />
          {submitStatus === "success" && <p className="text-xs text-green-700 mt-2">Review submitted for moderation.</p>}
          {submitStatus === "error" && <p className="text-xs text-red-600 mt-2">Could not submit review.</p>}
        </div>
      )}

      {loading ? (
        <p className="text-xs text-brand-text/40">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-brand-text/50 italic">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <div className="divide-y divide-brand-text/5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

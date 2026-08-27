"use client";

import React, { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

type Review = {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  customer?: { full_name: string | null } | null;
  user_vote?: boolean | null;
};

export default function ReviewCard({ review, onVote }: { review: Review; onVote?: (reviewId: string, helpful: boolean) => void }) {
  const [voted, setVoted] = useState(review.user_vote);

  function handleVote(helpful: boolean) {
    setVoted(helpful);
    onVote?.(review.id, helpful);
  }

  return (
    <div className="border-b border-brand-text/5 py-5 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} className={s <= review.rating ? "fill-brand-accent text-brand-accent" : "text-brand-text/20"} />
        ))}
        {review.is_verified_purchase && (
          <span className="text-[9px] uppercase tracking-widest text-green-700 font-semibold ml-2">Verified Purchase</span>
        )}
      </div>
      {review.title && <p className="text-sm font-medium text-brand-text mb-1">{review.title}</p>}
      {review.body && <p className="text-xs text-brand-text/60 leading-relaxed mb-3">{review.body}</p>}
      <div className="flex items-center gap-4 text-[10px] text-brand-text/40">
        <span>{review.customer?.full_name ?? "Anonymous"}</span>
        <span>{new Date(review.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        {onVote && (
          <button
            onClick={() => handleVote(true)}
            disabled={voted !== null}
            className={`flex items-center gap-1 hover:text-brand-accent transition-colors ${voted !== null ? "opacity-50" : ""}`}
          >
            <ThumbsUp size={11} className={voted === true ? "fill-brand-accent" : ""} />
            <span>{review.helpful_count + (voted === true ? 1 : 0)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

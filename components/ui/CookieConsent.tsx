"use client";

import { useEffect, useState } from "react";

const KEY = "glasskin_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(KEY);
    if (!stored) setVisible(true);
  }, []);

  function decide(value: "accepted" | "declined") {
    window.localStorage.setItem(KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-brand-text text-brand-bg px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center text-xs">
      <p className="text-brand-bg/80 max-w-2xl leading-relaxed">
        We use essential cookies to operate the store and optional analytics to improve it. You can change your mind anytime.
      </p>
      <div className="flex gap-2 whitespace-nowrap">
        <button
          onClick={() => decide("accepted")}
          className="bg-brand-accent text-white px-5 py-2 rounded-full uppercase tracking-widest text-[10px] font-extrabold font-rounded shadow-play"
        >
          Accept
        </button>
        <button
          onClick={() => decide("declined")}
          className="border border-brand-bg/40 px-4 py-2 rounded-sm uppercase tracking-widest text-[10px] font-semibold hover:border-brand-bg"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

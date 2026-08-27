"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const QUESTIONS = [
  {
    id: "skin_type",
    question: "How does your skin feel by midday?",
    options: [
      { value: "oily", label: "Shiny / greasy all over" },
      { value: "dry", label: "Tight / flaky patches" },
      { value: "combination", label: "Oily T-zone, dry cheeks" },
      { value: "normal", label: "Comfortable, balanced" },
      { value: "sensitive", label: "Red / irritated easily" },
    ],
  },
  {
    id: "concerns",
    question: "What are your top skin concerns?",
    options: [
      { value: "acne", label: "Breakouts / blemishes" },
      { value: "pigmentation", label: "Dark spots / uneven tone" },
      { value: "aging", label: "Fine lines / loss of firmness" },
      { value: "hydration", label: "Dryness / dullness" },
      { value: "sensitivity", label: "Redness / irritation" },
    ],
    multiple: true,
  },
  {
    id: "routine",
    question: "How many steps is your current routine?",
    options: [
      { value: "minimal", label: "1-2 steps (cleanser + moisturizer)" },
      { value: "moderate", label: "3-4 steps (add serum + SPF)" },
      { value: "extensive", label: "5+ steps (full Korean / J-beauty inspired)" },
    ],
  },
];

type Answers = Record<string, string | string[]>;

const RECOMMENDATIONS: Record<string, { products: string[]; tip: string }> = {
  oily: {
    products: ["Hydrating Oat Gel Cleanser", "Glass Skin Glaze Serum", "Lightweight SPF 50"],
    tip: "Even oily skin needs hydration. Focus on lightweight, water-based formulas.",
  },
  dry: {
    products: ["Gentle Rice Bran Cleansing Oil", "Ceramide Repair Moisturizer", "Hydrating SPF 30"],
    tip: "Layer hydration: oil cleanser → serum → rich moisturizer → SPF.",
  },
  combination: {
    products: ["Gentle Rice Bran Cleansing Oil", "Glass Skin Glaze Serum", "Balancing Moisturizer"],
    tip: "Treat zones differently: lighter on T-zone, richer on cheeks.",
  },
  normal: {
    products: ["Hydrating Oat Gel Cleanser", "Glass Skin Glaze Serum", "Daily Glow Moisturizer"],
    tip: "Maintain balance with consistent, gentle care and daily SPF.",
  },
  sensitive: {
    products: ["Gentle Rice Bran Cleansing Oil", "Ceramide Repair Moisturizer", "Mineral SPF 50"],
    tip: "Avoid fragrances and harsh actives. Patch test new products.",
  },
};

export default function SkinQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<{ products: string[]; tip: string } | null>(null);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  function select(value: string) {
    if (current.multiple) {
      const prev = (answers[current.id] as string[]) ?? [];
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      setAnswers({ ...answers, [current.id]: next });
    } else {
      setAnswers({ ...answers, [current.id]: value });
    }
  }

  function next() {
    if (isLast) {
      const skinType = (answers.skin_type as string) ?? "normal";
      setResult(RECOMMENDATIONS[skinType] ?? RECOMMENDATIONS.normal);
    } else {
      setStep(step + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />
      <main className="max-w-lg mx-auto px-6 py-24">
        <span className="sticker bg-brand-mint text-brand-text text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">Personalized for you</span>
        <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-10">Find your <span className="text-brand-magenta">glow</span></h1>

        {!result ? (
          <div className="border border-brand-text/10 rounded-sm p-6">
            <p className="text-xs text-brand-text/40 mb-4">Step {step + 1} of {QUESTIONS.length}</p>
            <p className="text-sm font-medium mb-6">{current.question}</p>
            <div className="space-y-2">
              {current.options.map((opt) => {
                const selected = current.multiple
                  ? ((answers[current.id] as string[]) ?? []).includes(opt.value)
                  : answers[current.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-rounded font-bold transition-all ${
                      selected ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-brand-text/15 bg-white hover:border-brand-text/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs text-brand-text/50 hover:text-brand-accent">
                  <ChevronLeft size={14} /> Back
                </button>
              )}
              <button
                onClick={next}
                disabled={!answers[current.id] || (current.multiple && !((answers[current.id] as string[])?.length))}
                className="ml-auto btn-play-solid bg-brand-accent px-6 py-3 text-[10px] disabled:opacity-40"
              >
                {isLast ? "See Results" : "Next"} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-brand-text/10 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-brand-accent" />
              <h2 className="font-display uppercase text-xl text-brand-text">Your Recommended Ritual</h2>
            </div>
            <p className="text-xs text-brand-text/60 mb-6 leading-relaxed italic border-l-2 border-brand-accent/30 pl-4">{result.tip}</p>
            <ul className="space-y-4 mb-8">
              {result.products.map((name, i) => (
                <li key={name} className="flex items-center gap-3 text-sm text-brand-text/80">
                  <span className="w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  {name}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <button onClick={restart} className="text-xs text-brand-text/50 hover:text-brand-accent transition-colors">Retake Quiz</button>
              <a href="/shop" className="ml-auto btn-play-solid bg-brand-accent px-6 py-2.5 text-[10px]">
                Shop Now
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

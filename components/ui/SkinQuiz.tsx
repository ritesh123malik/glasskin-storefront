"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

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

const RECOMMENDATIONS: Record<string, string[]> = {
  oily: ["Hydrating Oat Gel Cleanser", "Glass Skin Glaze Serum", "Lightweight SPF 50"],
  dry: ["Gentle Rice Bran Cleansing Oil", "Ceramide Repair Moisturizer", "Hydrating SPF 30"],
  combination: ["Gentle Rice Bran Cleansing Oil", "Glass Skin Glaze Serum", "Balancing Moisturizer"],
  normal: ["Hydrating Oat Gel Cleanser", "Glass Skin Glaze Serum", "Daily Glow Moisturizer"],
  sensitive: ["Gentle Rice Bran Cleansing Oil", "Ceramide Repair Moisturizer", "Mineral SPF 50"],
};

export default function SkinQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<string[] | null>(null);

  if (!open) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-brand-bg rounded-sm max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text/40 hover:text-brand-text text-xs">✕</button>

        {!result ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-brand-accent" />
              <h2 className="font-display uppercase text-xl text-brand-text">Skin Quiz</h2>
            </div>
            <p className="text-xs text-brand-text/40 mb-4">Step {step + 1} of {QUESTIONS.length}</p>
            <p className="text-sm font-medium mb-4">{current.question}</p>
            <div className="space-y-2">
              {current.options.map((opt) => {
                const selected = current.multiple
                  ? ((answers[current.id] as string[]) ?? []).includes(opt.value)
                  : answers[current.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-sm border text-xs transition-all ${
                      selected ? "border-brand-accent bg-brand-accent/5 text-brand-accent" : "border-brand-text/15 hover:border-brand-text/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs text-brand-text/50 hover:text-brand-accent">
                  <ChevronLeft size={14} /> Back
                </button>
              )}
              <button
                onClick={next}
                disabled={!answers[current.id] || (current.multiple && !((answers[current.id] as string[])?.length))}
                className="ml-auto btn-play-solid bg-brand-accent px-5 py-2.5 text-[10px] disabled:opacity-40"
              >
                {isLast ? "See Results" : "Next"} <ChevronRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-brand-accent" />
              <h2 className="font-display uppercase text-xl text-brand-text">Your Recommended Ritual</h2>
            </div>
            <ul className="space-y-3 mb-6">
              {result.map((name) => (
                <li key={name} className="flex items-center gap-2 text-sm text-brand-text/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  {name}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button onClick={restart} className="text-xs text-brand-text/50 hover:text-brand-accent">Retake Quiz</button>
              <a href="/shop" className="text-xs text-brand-accent hover:text-brand-secondary ml-auto">Shop Now →</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

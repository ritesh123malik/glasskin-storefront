"use client";

import React from "react";
import { Ruler, X } from "lucide-react";

const SIZE_GUIDE = [
  { size: "S", bust: "32-34", waist: "26-28", hip: "36-38" },
  { size: "M", bust: "34-36", waist: "28-30", hip: "38-40" },
  { size: "L", bust: "36-38", waist: "30-32", hip: "40-42" },
  { size: "XL", bust: "38-40", waist: "32-34", hip: "42-44" },
  { size: "XXL", bust: "40-42", waist: "34-36", hip: "44-46" },
];

export default function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-brand-bg rounded-sm max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text/40 hover:text-brand-text">
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <Ruler size={18} className="text-brand-accent" />
          <h2 className="font-display uppercase text-xl text-brand-text">Size Guide</h2>
        </div>
        <p className="text-xs text-brand-text/60 mb-4">
          All measurements are in inches. For the best fit, measure yourself with a soft tape measure.
        </p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-brand-text/10">
              <th className="py-2 text-left font-semibold text-brand-text/50">Size</th>
              <th className="py-2 text-left font-semibold text-brand-text/50">Bust</th>
              <th className="py-2 text-left font-semibold text-brand-text/50">Waist</th>
              <th className="py-2 text-left font-semibold text-brand-text/50">Hip</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_GUIDE.map((row) => (
              <tr key={row.size} className="border-b border-brand-text/5">
                <td className="py-2 font-medium">{row.size}</td>
                <td className="py-2 text-brand-text/60">{row.bust}&quot;</td>
                <td className="py-2 text-brand-text/60">{row.waist}&quot;</td>
                <td className="py-2 text-brand-text/60">{row.hip}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-brand-text/40 mt-4">Between sizes? We recommend sizing up for a comfortable fit.</p>
      </div>
    </div>
  );
}

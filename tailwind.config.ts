import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Brand colour tokens ───────────────────────── */
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          bg:        "var(--brand-bg)",
          text:      "var(--brand-text)",
          accent:    "var(--brand-accent)",
          secondary: "var(--brand-secondary)",
          blue:      "var(--brand-blue)",
          sky:       "var(--brand-sky)",
          magenta:   "var(--brand-magenta)",
          red:       "var(--brand-red)",
          yellow:    "var(--brand-yellow)",
          citron:    "var(--brand-citron)",
          peach:     "var(--brand-peach)",
          pink:      "var(--brand-pink)",
          lilac:     "var(--brand-lilac)",
          mint:      "var(--brand-mint)",
          cyan:      "var(--brand-cyan)",
          green:     "var(--brand-green)",
          purple:    "var(--brand-purple)",
        },
        section: {
          warm:   "var(--section-warm)",
          yellow: "var(--section-yellow)",
          sky:    "var(--section-sky)",
          pink:   "var(--section-pink)",
          mint:   "var(--section-mint)",
          blue:   "var(--section-blue)",
          ink:    "var(--section-ink)",
        },
      },

      /* ── Fonts ─────────────────────────────────────── */
      fontFamily: {
        serif:   ["var(--font-playfair)",  "Georgia", "serif"],
        sans:    ["var(--font-nunito)",    "ui-rounded", "sans-serif"],
        display: ["var(--font-archivo)",   "sans-serif"],
        rounded: ["var(--font-baloo)",     "ui-rounded", "sans-serif"],
        mono:    ["var(--font-geist-mono)","monospace"],
      },

      /* ── Type scale ────────────────────────────────── */
      fontSize: {
        "hero":   ["clamp(3.2rem,10vw,9rem)",    { lineHeight: "0.9",  letterSpacing: "-0.01em" }],
        "display":["clamp(2.4rem,6vw,5.5rem)",   { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "section":["clamp(1.6rem,3vw,2.4rem)",   { lineHeight: "1.1",  letterSpacing: "-0.005em" }],
        "micro":  ["0.625rem",                   { lineHeight: "1" }],
      },

      /* ── Letter spacing ────────────────────────────── */
      letterSpacing: {
        display:   "0.01em",
        wide:      "0.06em",
        widest:    "0.18em",
        micro:     "0.22em",
      },

      /* ── Border radius ─────────────────────────────── */
      borderRadius: {
        "none":    "0px",
        "sm":      "8px",
        "DEFAULT": "14px",
        "md":      "16px",
        "lg":      "24px",
        "xl":      "32px",
        "2xl":     "40px",
        "3xl":     "56px",
        "full":    "9999px",
      },

      /* ── Box shadows — hard/punchy Partake style ───── */
      boxShadow: {
        "btn":      "4px 4px 0 0 rgba(28,20,16,0.9)",
        "btn-hover":"4px 6px 0 0 rgba(28,20,16,0.9)",
        "card":     "6px 6px 0 0 rgba(28,20,16,0.12)",
        "card-hover":"8px 10px 0 0 rgba(28,20,16,0.12)",
        "pop":      "0 8px 0 -2px rgba(0,0,0,0.15)",
        "inset":    "inset 0 2px 8px rgba(0,0,0,0.08)",
        "play":     "0 8px 0 -2px rgba(0,0,0,0.12)",
        "play-hover":"0 12px 0 -2px rgba(0,0,0,0.12)",
      },

      /* ── Keyframe animations ───────────────────────── */
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-slow": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-bob": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "pop-in": {
          "0%":   { opacity: "0", transform: "scale(0.8)" },
          "80%":  { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "marquee":       "marquee 28s linear infinite",
        "marquee-slow":  "marquee-slow 45s linear infinite",
        "float":         "float-bob 4s ease-in-out infinite",
        "spin-slow":     "spin-slow 12s linear infinite",
        "fade-up":       "fade-up 0.5s ease-out both",
        "slide-in":      "slide-in 0.4s ease-out both",
        "pop-in":        "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      },

      /* ── Spacing extras ────────────────────────────── */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      /* ── Screens (custom breakpoints) ─────────────── */
      screens: {
        "xs":  "390px",
        "sm":  "640px",
        "md":  "768px",
        "lg":  "1024px",
        "xl":  "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;

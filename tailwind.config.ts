import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          bg: "var(--brand-bg)",
          text: "var(--brand-text)",
          accent: "var(--brand-accent)",
          secondary: "var(--brand-secondary)",
          blue: "var(--brand-blue)",
          sky: "var(--brand-sky)",
          magenta: "var(--brand-magenta)",
          red: "var(--brand-red)",
          yellow: "var(--brand-yellow)",
          citron: "var(--brand-citron)",
          peach: "var(--brand-peach)",
          pink: "var(--brand-pink)",
          lilac: "var(--brand-lilac)",
          mint: "var(--brand-mint)",
          cyan: "var(--brand-cyan)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-nunito)", "ui-rounded", "sans-serif"],
        display: ["var(--font-archivo)", "sans-serif"],
        rounded: ["var(--font-baloo)", "ui-rounded", "sans-serif"],
      },
      letterSpacing: {
        'display': '0.01em',
      },
      borderRadius: {
        'none': '0px',
        'sm': '8px',
        'DEFAULT': '14px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'play': '0 8px 0 -2px rgba(0,0,0,0.12)',
        'play-hover': '0 12px 0 -2px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
export default config;

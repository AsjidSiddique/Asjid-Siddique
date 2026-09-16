import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark-navy research-lab palette.
        bg: "#050816",
        bg2: "#080D1C",
        surface: "rgba(15, 23, 42, 0.65)",
        edge: "rgba(148, 163, 184, 0.12)",
        cyan: "#22D3EE",
        indigo: "#6366F1",
        violet: "#A855F7",
        sky: "#38BDF8",
        ink: "#F1F5F9",
        muted: "#AAB4C4",
        // Light-mode counterparts (kept readable, same accent family, muted).
        paper: "#F8FAFC",
        "paper-surface": "rgba(255, 255, 255, 0.7)",
        "paper-edge": "rgba(15, 23, 42, 0.10)",
        "paper-ink": "#0F172A",
        "paper-muted": "#5B6472",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1280px",
        prose: "42rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
        "orb-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, 3%) scale(1.08)" },
        },
        "orb-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-5%, 4%) scale(1.05)" },
        },
        "orb-c": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -5%) scale(1.06)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.15)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 7s ease-in-out infinite",
        "orb-a": "orb-a 26s ease-in-out infinite",
        "orb-b": "orb-b 32s ease-in-out infinite",
        "orb-c": "orb-c 38s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "grid-drift": "grid-drift 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

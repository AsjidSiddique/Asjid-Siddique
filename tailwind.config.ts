import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        // Theme tokens. Values live in app/globals.css (:root = dark,
        // .light = light) as space-separated RGB channels so Tailwind
        // opacity modifiers (bg-bg/50, text-cyan/30 ...) keep working.
        bg: "rgb(var(--bg) / <alpha-value>)",
        bg2: "rgb(var(--bg2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
        indigo: "rgb(var(--indigo) / <alpha-value>)",
        violet: "rgb(var(--violet) / <alpha-value>)",
        onaccent: "rgb(var(--on-accent) / <alpha-value>)",
        // Fully-formed colours (they already carry their own alpha).
        edge: "var(--edge)",
        wash: "var(--wash)",
        surface: "var(--surface)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        // Theme-aware: neon glow in dark mode, soft tinted elevation in light.
        "glow-sm": "var(--glow-sm)",
        glow: "var(--glow)",
        "glow-lg": "var(--glow-lg)",
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
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "spin-rev": {
          to: { transform: "rotate(-360deg)" },
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
        marquee: "marquee 55s linear infinite",
        "spin-slow": "spin-slow 70s linear infinite",
        "spin-rev": "spin-rev 90s linear infinite",
      },
    },
  },
  plugins: [
    // `light:` variant -> applies only while <html class="light"> is set.
    plugin(({ addVariant }) => {
      addVariant("light", ".light &");
    }),
  ],
};
export default config;

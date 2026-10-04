"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_KEY = "theme";
export const THEME_EVENT = "theme-change";
type Theme = "dark" | "light";

const THEME_COLOR: Record<Theme, string> = {
  dark: "#050816",
  light: "#F5F7FB",
};

function currentTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

// Single source of truth for switching theme. The <html> element carries a
// `light` class (dark is the default, matching the original design); the
// choice is persisted in localStorage and re-applied before first paint by
// the inline script in app/layout.tsx, so there is no flash on reload.
export function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  root.classList.toggle("light", next === "light");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* storage can be blocked (private mode) — the toggle still works */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[next]);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  window.setTimeout(() => root.classList.remove("theme-anim"), 450);
}

export function toggleTheme() {
  setTheme(currentTheme() === "light" ? "dark" : "light");
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(currentTheme());
    setMounted(true);
    const sync = () => setThemeState(currentTheme());
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-muted transition-colors hover:border-cyan/50 hover:text-cyan ${className}`}
    >
      {/* both icons stay mounted and cross-fade/rotate; render neutral until
          mounted so server and client markup match */}
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          mounted && isLight ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
        strokeWidth={1.75}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          mounted && isLight ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        strokeWidth={1.75}
      />
    </button>
  );
}

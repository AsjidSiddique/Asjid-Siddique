"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { site } from "@/data/site";
import { OPEN_PALETTE_EVENT } from "./command-palette";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = site.nav.map((n) => n.href.replace("/#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-edge bg-[rgba(5,8,22,0.75)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href="/#home"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-all duration-300 hover:text-cyan hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          Asjid Siddique
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm transition-colors ${
                  isActive ? "text-cyan" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/resume"
            className="rounded border border-edge px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))
            }
            aria-label="Open quick navigation"
            className="flex items-center gap-1.5 rounded border border-edge px-2.5 py-1.5 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
            <kbd className="hidden font-mono text-[10px] lg:inline">⌘K</kbd>
          </button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-8 w-8 items-center justify-center text-ink md:hidden"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-200 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
            strokeWidth={1.75}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-200 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <nav
        className={`overflow-hidden border-b border-edge bg-[rgba(5,8,22,0.92)] backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {[...site.nav, { label: "Resume", href: "/resume" }].map(
            (item, i) => (
              <li
                key={item.href}
                className="transition-all duration-300"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted hover:text-cyan"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

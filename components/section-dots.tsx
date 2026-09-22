"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function SectionDots() {
  const ids = site.nav.map((n) => n.href.replace("/#", ""));
  const [active, setActive] = useState(ids[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 lg:flex ${
        visible ? "pointer-events-auto opacity-100" : "opacity-0"
      }`}
    >
      {site.nav.map((item) => {
        const id = item.href.replace("/#", "");
        const isActive = active === id;
        return (
          <a
            key={id}
            href={item.href}
            aria-label={item.label}
            className="group flex items-center gap-2"
          >
            <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-edge bg-bg/80 px-0 py-1 font-mono text-[10px] text-muted opacity-0 backdrop-blur transition-all duration-200 group-hover:max-w-[140px] group-hover:px-2.5 group-hover:opacity-100">
              {item.label}
            </span>
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "scale-150 bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "bg-muted/40 group-hover:bg-cyan/60"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}

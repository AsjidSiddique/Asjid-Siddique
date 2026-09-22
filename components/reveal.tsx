"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-triggered entrance: opacity 0->1, translateY 10px->0. No blur —
// blur reads as "still loading" rather than a deliberate transition, which
// is exactly what felt slow/laggy before. Triggers well before the element
// is actually in view (large rootMargin) so by the time it's visible it has
// usually already resolved. Fires once per element. No-ops visually under
// prefers-reduced-motion (global CSS forces near-zero transition duration).
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-200 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

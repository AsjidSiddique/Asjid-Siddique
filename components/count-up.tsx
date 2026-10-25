"use client";

import { useEffect, useRef, useState } from "react";

// Parses "78.8%" -> prefix "", number 78.8, suffix "%". Non-numeric
// values ("Ongoing", "CV / ML") are returned as-is with animate=false,
// so this never mangles real content — only genuine numbers count up.
function parseValue(raw: string) {
  const match = raw.match(/^([^\d.]*)([\d,]+\.?\d*)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const num = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const hasCommas = numStr.includes(",");
  return { prefix, num, suffix, decimals, hasCommas };
}

export function CountUp({
  value,
  duration = 1100,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const parsed = parseValue(value);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(el);

          const start = performance.now();
          function tick(now: number) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = parsed!.num * eased;
            const formatted = parsed!.hasCommas
              ? Math.round(current).toLocaleString()
              : current.toFixed(parsed!.decimals);
            setDisplay(`${parsed!.prefix}${formatted}${parsed!.suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {parsed ? display : value}
    </span>
  );
}

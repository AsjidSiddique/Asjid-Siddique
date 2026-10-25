"use client";

import { useEffect, useState } from "react";
import { COUNTER_EVENT, fetchCount, type CounterKey } from "@/lib/counter";

// A bare number in a small pill — deliberately unlabeled (no "downloads" /
// "clicks" text). Renders nothing until a real count is available, so it
// never flashes "0" or a placeholder.
export function CountBadge({
  counter,
  className = "",
}: {
  counter: CounterKey;
  className?: string;
}) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchCount(counter).then((n) => {
      if (alive && n !== null) setCount(n);
    });
    const onUpdate = (e: Event) => {
      const d = (e as CustomEvent<{ key: CounterKey; count: number }>).detail;
      if (d?.key === counter) setCount(d.count);
    };
    window.addEventListener(COUNTER_EVENT, onUpdate);
    return () => {
      alive = false;
      window.removeEventListener(COUNTER_EVENT, onUpdate);
    };
  }, [counter]);

  if (count === null) return null;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex min-w-[1.4rem] items-center justify-center rounded-full px-1.5 py-px font-mono text-[10px] font-semibold tabular-nums leading-4 ${className}`}
    >
      {count.toLocaleString("en-US")}
    </span>
  );
}

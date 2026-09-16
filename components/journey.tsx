"use client";

import { useEffect, useRef, useState } from "react";
import { Milestone } from "lucide-react";
import { researchJourney, type JourneyStatus } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const statusLabel: Record<JourneyStatus, string> = {
  completed: "Completed",
  current: "In progress",
  future: "Planned",
};

const statusColor: Record<JourneyStatus, string> = {
  completed: "bg-cyan",
  current: "bg-violet",
  future: "bg-muted",
};

function TimelineNode({
  entry,
  index,
}: {
  entry: (typeof researchJourney)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLit(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal delay={index * 20}>
      <li ref={ref} className="relative pb-10 pl-9 last:pb-0">
        <span
          className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full transition-all duration-500 ${
            lit ? statusColor[entry.status] : "bg-white/10"
          } ${lit && entry.status === "current" ? "animate-pulse-dot" : ""}`}
          style={{
            boxShadow: lit
              ? entry.status === "current"
                ? "0 0 14px rgba(168,85,247,0.7)"
                : entry.status === "completed"
                ? "0 0 14px rgba(34,211,238,0.5)"
                : "none"
              : "none",
          }}
        />
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="data-figure text-sm text-ink">{entry.year}</span>
          <span className="text-xs text-muted">{statusLabel[entry.status]}</span>
        </div>
        <ul className="mt-2 space-y-1">
          {entry.items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed text-muted">
              {item}
            </li>
          ))}
        </ul>
      </li>
    </Reveal>
  );
}

export function Journey() {
  return (
    <section className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading eyebrow="04 — RESEARCH JOURNEY" title="Research journey" icon={Milestone} />
      <ol className="relative border-l border-edge">
        {researchJourney.map((entry, i) => (
          <TimelineNode key={i} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}

"use client";

import { useRef } from "react";
import {
  Eye,
  Brain,
  LineChart,
  Lightbulb,
  ShieldCheck,
  Wrench,
  Sparkles,
  Network,
  FlaskConical,
} from "lucide-react";
import { researchInterests } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const icons = [Eye, Brain, LineChart, Lightbulb, ShieldCheck, Wrench, Sparkles, Network, FlaskConical];

function SpotlightCard({
  index,
  title,
  description,
  Icon,
}: {
  index: number;
  title: string;
  description: string;
  Icon: typeof Eye;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Reveal delay={index * 18}>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative h-full overflow-hidden rounded-xl border border-edge bg-white/[0.045] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.12), transparent 45%)",
          }}
        />
        <span className="relative mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-violet/30 bg-violet/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
          <Icon className="h-4 w-4 text-violet" strokeWidth={1.75} />
        </span>
        <p className="relative font-mono text-[11px] text-muted">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="relative mt-1 font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-violet">
          {title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

export function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="01 — RESEARCH INTERESTS"
        title="Research interests"
        subtitle="Building toward AI/ML research through hands-on experimentation and engineering."
        highlight="violet"
        icon={Brain}
      />
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {researchInterests.map((r, i) => (
          <SpotlightCard
            key={r.title}
            index={i}
            title={r.title}
            description={r.description}
            Icon={icons[i % icons.length]}
          />
        ))}
      </div>
    </section>
  );
}

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
        className="group relative h-full overflow-hidden rounded-xl border border-edge bg-wash p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(var(--violet) / 0.12), transparent 45%)",
          }}
        />
        <div className="relative mb-3 flex items-center justify-between">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet/30 bg-violet/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
            <Icon className="h-4 w-4 text-violet" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="relative font-display text-base font-semibold text-ink transition-colors duration-300 group-hover:text-violet">
          {title}
        </h3>
        <p className="relative mt-1 text-[13px] leading-snug text-muted">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

export function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-content px-6 py-8 md:py-10">
      <SectionHeading
        id="research"
        eyebrow="01 — RESEARCH INTERESTS"
        title="Research interests"
        subtitle="Building toward AI/ML research through hands-on experimentation and engineering."
        highlight="violet"
        icon={Brain}
      />
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
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

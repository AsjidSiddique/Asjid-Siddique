import { Briefcase } from "lucide-react";
import { experience } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="experience"
        eyebrow="05 — EXPERIENCE" title="Experience" icon={Briefcase} />
      <div className="space-y-6">
        {experience.map((e, i) => (
          <Reveal key={i} delay={i * 20}>
            <div className="group relative overflow-hidden rounded-xl border border-edge bg-white/[0.045] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30">
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.10), transparent 60%)",
                }}
              />
              <div className="relative flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-ink">{e.role}</h3>
                <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 font-mono text-xs text-cyan">
                  {e.period}
                </span>
              </div>
              <p className="relative text-sm text-sky">{e.org}</p>
              <ul className="relative mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { Briefcase } from "lucide-react";
import { experience } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-content px-6 py-8 md:py-10">
      <SectionHeading id="experience"
        eyebrow="05 — EXPERIENCE" title="Experience" icon={Briefcase} />

      {/* timeline rail */}
      <ol className="relative space-y-8 border-l border-edge pl-6 md:pl-10">
        {experience.map((e, i) => (
          <li key={i} className="relative">
            {/* node */}
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-cyan shadow-glow-sm md:-left-[47px]"
            >
              {e.current && (
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-cyan/60" />
              )}
            </span>

            <Reveal delay={i * 40}>
              <div className="group relative overflow-hidden rounded-xl border border-edge bg-wash p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 md:p-7">
                <div
                  className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(var(--cyan) / 0.10), transparent 60%)",
                  }}
                />
                <div className="relative flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-sky">
                      {e.org}
                      <span className="font-normal text-muted"> · {e.type}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {e.current && (
                      <span className="flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan" />
                        Current
                      </span>
                    )}
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 font-mono text-xs text-cyan">
                      {e.period}
                    </span>
                  </div>
                </div>

                <ul className="relative mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-cyan/60">
                  {e.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-edge bg-ink/[0.04] px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

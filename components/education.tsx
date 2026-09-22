import { GraduationCap, BookOpen } from "lucide-react";
import { education } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="education"
        eyebrow="06 — EDUCATION" title="Education" icon={GraduationCap} />

      <Reveal>
        <div className="rounded-xl border border-edge bg-white/[0.045] p-6 backdrop-blur transition-all duration-300 hover:border-cyan/30">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">{education.school}</h3>
            <span className="font-mono text-xs text-muted">{education.period}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{education.degree}</p>
          <p className="data-figure mt-2 text-sm text-cyan">CGPA: {education.cgpa}</p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {education.courseworkGroups.map((g, i) => (
          <Reveal key={g.group} delay={i * 20}>
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-muted">
                <BookOpen className="h-3.5 w-3.5 text-cyan" strokeWidth={1.75} />
                {g.group.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-edge bg-white/[0.045] px-2.5 py-1 text-xs text-muted transition-colors hover:border-cyan/30 hover:text-ink"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={40}>
        <div className="mt-8">
          <p className="mb-3 font-mono text-xs tracking-widest text-muted">
            CURRENT / UPCOMING COURSEWORK
          </p>
          <div className="flex flex-wrap gap-2">
            {education.currentCoursework.map((c) => (
              <span
                key={c}
                className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs text-violet"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div className="mt-8 border-t border-edge pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-ink">
              {education.prior.school}
            </h3>
            <span className="font-mono text-xs text-muted">{education.prior.period}</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {education.prior.program} · Marks: {education.prior.result}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

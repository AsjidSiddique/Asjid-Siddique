import { Code2, BrainCircuit, FlaskConical, Server, Layers } from "lucide-react";
import { skills } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { SkillIcon } from "./skill-icon";

const groupIcons = [Code2, BrainCircuit, FlaskConical, Server, Layers];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="skills"
        eyebrow="07 — SKILLS" title="Skills" icon={Code2} />
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => {
          const GroupIcon = groupIcons[i % groupIcons.length];
          return (
            <Reveal key={group.category} delay={i * 20}>
              <div className="group/card rounded-xl border border-edge bg-white/[0.045] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 transition-transform duration-300 group-hover/card:rotate-6 group-hover/card:scale-110">
                    <GroupIcon className="h-3.5 w-3.5 text-cyan" strokeWidth={1.75} />
                  </span>
                  <p className="font-mono text-xs tracking-widest text-muted">
                    {group.category.toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <span
                      key={item}
                      style={{ transitionDelay: `${j * 15}ms` }}
                      className="group/chip relative flex items-center gap-1.5 overflow-hidden rounded-full border border-edge bg-white/[0.045] px-3 py-1.5 font-mono text-xs text-muted transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan/50 hover:text-ink hover:shadow-[0_4px_16px_rgba(34,211,238,0.18)]"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent transition-transform duration-700 group-hover/chip:translate-x-full"
                      />
                      <SkillIcon
                        name={item}
                        className="relative h-3.5 w-3.5 shrink-0 text-muted transition-all duration-300 group-hover/chip:scale-125 group-hover/chip:rotate-6 group-hover/chip:text-cyan"
                      />
                      <span className="relative">{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

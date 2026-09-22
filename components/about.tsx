import { UserRound } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ProfilePhoto } from "./profile-photo";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="about"
        eyebrow="03 — ABOUT ME" title="About me" icon={UserRound} />
      <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr_1fr]">
        <Reveal>
          <ProfilePhoto className="aspect-[4/5] w-full max-w-[220px] rounded-xl border border-edge" />
        </Reveal>

        <Reveal delay={60} className="space-y-4 text-base leading-relaxed text-muted">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-xl border border-edge bg-white/[0.045] p-6 text-sm backdrop-blur transition-all duration-300 hover:border-cyan/30 md:grid-cols-1">
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted">UNIVERSITY</dt>
              <dd className="mt-1 text-ink">{site.university}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted">DEGREE</dt>
              <dd className="mt-1 text-ink">{site.degree}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted">CGPA</dt>
              <dd className="data-figure mt-1 text-cyan">{site.cgpa}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted">EXPECTED GRADUATION</dt>
              <dd className="mt-1 text-ink">{site.expectedGraduation}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted">LOCATION</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Github, Linkedin, FileText, ArrowRight, ArrowUpRight } from "lucide-react";
import { site, researchInterests } from "@/data/site";
import { projects } from "@/data/projects";
import { HeroPortrait } from "./hero-portrait";
import { Typewriter } from "./typewriter";
import { CountUp } from "./count-up";
import { ProfilePhoto } from "./profile-photo";

const stats = [
  { value: site.cgpa.split(" ")[0], label: "CGPA" },
  { value: site.currentSemester, label: "Current semester" },
  { value: String(projects.length), label: "Featured projects" },
  { value: String(researchInterests.length), label: "Research interests" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-content px-6 pb-6 pt-6 md:pb-8 md:pt-8">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {/* mobile-only portrait (desktop shows the larger one on the right) */}
            <div
              className="mb-6 flex animate-fade-up md:hidden"
              style={{ animationDelay: "0ms" }}
            >
              <span className="rounded-full bg-gradient-to-br from-cyan via-sky to-violet p-[2px] shadow-[0_0_20px_rgb(var(--cyan)/0.3)]">
                <ProfilePhoto
                  src={site.avatarPath}
                  className="h-20 w-20 rounded-full border-2 border-bg"
                />
              </span>
            </div>

            {/* status badge */}
            <div
              className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full border border-edge bg-wash px-3.5 py-1.5 backdrop-blur"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-cyan" />
              </span>
              <span className="text-xs text-muted">
                Building toward AI/ML Research
              </span>
            </div>

            <h1
              className="animate-fade-up font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-ink"
              style={{ animationDelay: "80ms" }}
            >
              Asjid Siddique
            </h1>

            <p
              className="mt-4 animate-fade-up font-display text-xl font-medium leading-snug md:text-2xl"
              style={{ animationDelay: "160ms" }}
            >
              <span className="text-ink">Software Engineering Student</span>
              <br />
              <Typewriter
                phrases={[
                  "Building toward AI/ML Research",
                  "Full-Stack Developer",
                  "Founder, Viro.pk",
                ]}
                className="bg-gradient-to-r from-cyan via-sky to-violet bg-clip-text text-transparent"
              />
            </p>

            <p
              className="mt-6 max-w-prose animate-fade-up text-base leading-relaxed text-muted"
              style={{ animationDelay: "240ms" }}
            >
              {site.intro}
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                href="/#projects"
                className="shine group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-medium text-onaccent shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-lg"
              >
                View My Work
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </Link>
              <Link
                href="/resume"
                className="group flex items-center gap-2 rounded-lg border border-edge bg-wash px-5 py-2.5 text-sm text-ink backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-wash"
              >
                <FileText className="h-4 w-4" strokeWidth={1.75} />
                View Resume
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
              >
                <Github className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <dl
              className="mt-14 grid animate-fade-up grid-cols-2 gap-3 sm:grid-cols-4"
              style={{ animationDelay: "400ms" }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-lg border border-edge bg-wash px-4 py-3 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow-sm"
                >
                  <dd className="data-figure text-xl text-ink transition-transform duration-200 group-hover:scale-105">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-0.5 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual: centred portrait inside orbiting rings + tech chips */}
          <div className="relative hidden justify-self-center md:block md:justify-self-end">
            <HeroPortrait />
          </div>
        </div>

      </div>
    </section>
  );
}

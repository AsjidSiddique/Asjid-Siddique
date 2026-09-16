"use client";

import Link from "next/link";
import { Github, Linkedin, FileText, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { site, researchInterests } from "@/data/site";
import { projects } from "@/data/projects";
import { NodeGraphVisual } from "./node-graph-visual";
import { Typewriter } from "./typewriter";

const stats = [
  { value: site.cgpa.split(" ")[0], label: "CGPA" },
  { value: site.currentSemester, label: "Current semester" },
  { value: String(projects.length), label: "Featured projects" },
  { value: String(researchInterests.length), label: "Research interests" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-content px-6 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="grid items-start gap-16 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            {/* status badge */}
            <div
              className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-edge bg-white/[0.03] px-3.5 py-1.5 backdrop-blur"
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
                className="shine group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-medium text-[#04121a] shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(34,211,238,0.4)]"
              >
                View My Work
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </Link>
              <Link
                href="/resume"
                className="group flex items-center gap-2 rounded-lg border border-edge bg-white/[0.045] px-5 py-2.5 text-sm text-ink backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white/[0.04]"
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
                  className="group rounded-lg border border-edge bg-white/[0.045] px-4 py-3 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                >
                  <dd className="data-figure text-xl text-ink transition-transform duration-200 group-hover:scale-105">
                    {s.value}
                  </dd>
                  <dt className="mt-0.5 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual: decorative animated node graph (not a photo) */}
          <div className="relative hidden justify-self-center md:mt-3 md:flex md:justify-self-end">
            <div className="animate-fade-up" style={{ animationDelay: "420ms" }}>
              <div className="animate-float">
                <NodeGraphVisual />
              </div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-widest text-muted md:flex">
          <span className="font-mono">SCROLL TO EXPLORE</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-cyan" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}

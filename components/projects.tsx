"use client";

import { useState } from "react";
import { FolderGit2 } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const FILTERS = ["All", "AI / ML", "Computer Vision", "Software Engineering", "Systems"];

export function Projects() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.filterTags.includes(active));

  return (
    <section id="projects" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="projects"
        eyebrow="02 — FEATURED PROJECTS" title="Featured projects" icon={FolderGit2} />

      <div role="tablist" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
              active === f
                ? "border-cyan/50 bg-gradient-to-r from-cyan/20 to-sky/10 text-cyan shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                : "border-edge text-muted hover:border-cyan/30 hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div key={active} className="grid animate-fade-up gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={i * 20}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

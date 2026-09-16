import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectAccents } from "@/lib/project-accents";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project }: { project: Project }) {
  const accent = projectAccents[project.slug];

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-edge bg-white/[0.045] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015]"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent.from}33, transparent 60%)`,
        }}
      />

      <div className="relative h-32 overflow-hidden border-b border-edge bg-black/20">
        <div className="absolute inset-0 scale-100 transition-transform duration-500 group-hover:scale-110">
          <ProjectVisual slug={project.slug} />
        </div>
        {project.status && (
          <span className="absolute right-3 top-3 rounded-full border border-edge bg-black/40 px-2 py-0.5 text-[10px] text-muted backdrop-blur">
            {project.status}
          </span>
        )}
      </div>

      <div className="relative p-6">
        <p className={`font-mono text-[11px] tracking-widest ${accent.text}`}>
          {project.category.toUpperCase()}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.metrics.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-edge pt-5 sm:grid-cols-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dd className={`data-figure text-lg ${accent.text}`}>{m.value}</dd>
                <dt className="mt-0.5 text-xs text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technology.slice(0, 6).map((t) => (
            <span
              key={t}
              className="rounded-full border border-edge bg-white/[0.045] px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link flex items-center gap-1.5 ${accent.text} hover:underline`}
            >
              Live Demo
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" strokeWidth={1.75} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} /> GitHub
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Research
          </Link>
        </div>
      </div>
    </article>
  );
}

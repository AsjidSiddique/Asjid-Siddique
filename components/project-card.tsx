import Link from "next/link";
import { ExternalLink, FileText, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectAccents } from "@/lib/project-accents";
import { ProjectVisual } from "./project-visual";
import { CountUp } from "./count-up";

// Compact card: a slim visual strip carries the status badge (left) and the
// Live / GitHub / Research links (right); the body is tightened so the card
// is roughly a third shorter than before.
const pill =
  "flex items-center gap-1 rounded-full border border-edge bg-bg/75 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan";

export function ProjectCard({ project }: { project: Project }) {
  const accent = projectAccents[project.slug];

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-edge bg-wash backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent.from}33, transparent 60%)`,
        }}
      />

      {/* slim visual strip + action links on top */}
      <div className="relative h-24 overflow-hidden border-b border-edge bg-[var(--visual-bg)]">
        <div className="absolute inset-0 scale-100 transition-transform duration-500 group-hover:scale-110">
          <ProjectVisual slug={project.slug} />
        </div>

        <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
          {project.status ? (
            <span className="rounded-full border border-edge bg-bg/75 px-2 py-0.5 text-[10px] text-muted backdrop-blur">
              {project.status}
            </span>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap justify-end gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} ${accent.text}`}
              >
                Live <ExternalLink className="h-3 w-3" strokeWidth={2} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                <Github className="h-3 w-3" strokeWidth={2} /> GitHub
              </a>
            )}
            <Link href={`/projects/${project.slug}`} className={pill}>
              <FileText className="h-3 w-3" strokeWidth={2} /> Research
            </Link>
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className={`font-mono text-[11px] tracking-widest ${accent.text}`}>
            {project.category.toUpperCase()}
          </p>
          {project.period && (
            <p className="font-mono text-[11px] text-muted">{project.period}</p>
          )}
        </div>
        <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-0.5 text-sm text-ink/80">{project.tagline}</p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.metrics.length > 0 && (
          <dl className="mt-4 grid grid-cols-4 gap-x-3 border-t border-edge pt-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dd className={`data-figure text-base ${accent.text}`}>
                  <CountUp value={m.value} />
                </dd>
                <dt className="mt-0.5 text-[11px] leading-tight text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technology.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-edge bg-wash px-2 py-0.5 font-mono text-[10.5px] text-muted backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

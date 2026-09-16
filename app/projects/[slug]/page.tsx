import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/data/projects";
import { projectAccents } from "@/lib/project-accents";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Asjid Siddique`,
    description: project.description,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const accent = projectAccents[project.slug];

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main className="mx-auto max-w-content px-6 py-16">
        <Link
          href="/#projects"
          className="mb-8 flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to portfolio
        </Link>

        <div className="relative mb-6 h-40 overflow-hidden rounded-2xl border border-edge bg-black/20">
          <ProjectVisual slug={project.slug} />
          {project.status && (
            <span className="absolute right-3 top-3 rounded-full border border-edge bg-black/40 px-2 py-0.5 text-[10px] text-muted backdrop-blur">
              {project.status}
            </span>
          )}
        </div>

        <p className={`font-mono text-xs tracking-widest ${accent.text}`}>
          {project.category.toUpperCase()}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan to-sky px-4 py-2 text-[#04121a] shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Live Demo <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-edge px-4 py-2 text-ink transition-colors hover:border-cyan/50"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} /> GitHub
            </a>
          )}
        </div>

        {project.metrics.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-edge py-8 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dd className={`data-figure text-2xl ${accent.text}`}>{m.value}</dd>
                <dt className="mt-1 text-xs text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.detail.overview}
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Problem</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.detail.problem}
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Approach</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                {project.detail.approach.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Results</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                {project.detail.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-edge bg-white/[0.02] p-6 backdrop-blur">
            <p className="eyebrow mb-3">Technology</p>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

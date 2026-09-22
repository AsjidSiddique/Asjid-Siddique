import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-edge">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-ink">{site.name}</p>
          <p className="text-xs">
            Software Engineering Student · Building toward AI/ML Research
          </p>
        </div>
        <div className="flex gap-5">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
            LinkedIn
          </a>
          <a href={site.links.viro} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
            Viro.pk
          </a>
        </div>
        <p className="text-xs">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}

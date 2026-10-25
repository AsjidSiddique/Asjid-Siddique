import Link from "next/link";
import { site } from "@/data/site";
import { ProfilePhoto } from "./profile-photo";
import { CountBadge } from "./count-badge";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/resume" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-edge">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="mx-auto grid max-w-content gap-8 px-6 py-10 text-sm text-muted md:grid-cols-[1.2fr_1fr_auto] md:items-center">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-br from-cyan via-sky to-violet p-[2px]">
            <ProfilePhoto
              src={site.avatarSmPath}
              className="h-11 w-11 rounded-full border-2 border-bg"
            />
          </span>
          <div>
            <p className="text-ink">{site.name}</p>
            <p className="text-xs">
              Software Engineering Student · Building toward AI/ML Research
            </p>
          </div>
        </div>

        <nav aria-label="Quick links" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-cyan">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-5">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-cyan">
            GitHub
            <CountBadge counter="github" className="bg-cyan/10 text-cyan" />
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
            LinkedIn
          </a>
          <a href={site.links.viro} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
            Viro.pk
          </a>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-muted">© 2026 {site.name}</p>
    </footer>
  );
}

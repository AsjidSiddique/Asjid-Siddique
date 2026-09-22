import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";
import { CopyLinkButton } from "./copy-link-button";

// Stays a Server Component deliberately: it receives Lucide icon
// components as props (functions), and only Server Components can pass
// a function prop down from a Server parent without tripping React's
// "functions cannot be passed to Client Components" serialization error.
// The one bit of real interactivity (copy-link) is isolated in its own
// tiny client component instead of making this whole thing client-side.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  highlight = "cyan",
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  highlight?: "cyan" | "violet";
  /** Matches the parent <section id="..."> — enables the copy-link button. */
  id?: string;
}) {
  const accent = highlight === "violet" ? "text-violet" : "text-cyan";
  const ring = highlight === "violet" ? "border-violet/30" : "border-cyan/30";

  return (
    <Reveal>
      <div className={`group mb-12 border-l-2 ${ring} pl-5`}>
        <div className="mb-2 flex items-center gap-2">
          {Icon && (
            <span className={`flex h-6 w-6 items-center justify-center rounded border ${ring} bg-white/[0.03]`}>
              <Icon className={`h-3.5 w-3.5 ${accent}`} strokeWidth={2} />
            </span>
          )}
          <p className={`font-mono text-xs tracking-widest ${accent}`}>{eyebrow}</p>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
          {id && <CopyLinkButton id={id} title={title} />}
        </div>
        {subtitle && (
          <p className="mt-3 max-w-prose text-muted">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}

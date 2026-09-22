import Link from "next/link";
import { Compass } from "lucide-react";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto flex max-w-content flex-col items-center px-6 py-32 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10">
          <Compass className="h-6 w-6 text-cyan" strokeWidth={1.75} />
        </span>
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Whatever you were looking for isn't here. It might have moved, or
          the link might be off.
        </p>
        <Link
          href="/"
          className="shine mt-8 flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-medium text-[#04121a] shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5"
        >
          Back to the portfolio
        </Link>
      </main>
    </div>
  );
}

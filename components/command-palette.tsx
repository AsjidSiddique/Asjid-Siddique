"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Github,
  Linkedin,
  FileText,
  Mail,
} from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

type Item = {
  label: string;
  hint: string;
  action: () => void;
  icon: typeof Search;
};

// Command palette listens for this — kept as a plain DOM CustomEvent so
// the trigger button in Nav doesn't need to share React state with a
// sibling component two levels up in the tree.
export const OPEN_PALETTE_EVENT = "open-command-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: Item[] = [
    ...site.nav.map((n) => ({
      label: n.label,
      hint: "Section",
      icon: ArrowRight,
      action: () => {
        window.location.href = n.href;
      },
    })),
    ...projects.map((p) => ({
      label: p.title,
      hint: "Project",
      icon: ArrowRight,
      action: () => router.push(`/projects/${p.slug}`),
    })),
    {
      label: "Resume",
      hint: "Page",
      icon: FileText,
      action: () => router.push("/resume"),
    },
    {
      label: "GitHub",
      hint: "Open external",
      icon: Github,
      action: () => window.open(site.links.github, "_blank"),
    },
    {
      label: "LinkedIn",
      hint: "Open external",
      icon: Linkedin,
      action: () => window.open(site.links.linkedin, "_blank"),
    },
    {
      label: "Email",
      hint: `mailto: ${site.links.email}`,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${site.links.email}`;
      },
    },
  ];

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onCustomOpen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_PALETTE_EVENT, onCustomOpen);
    return () => window.removeEventListener(OPEN_PALETTE_EVENT, onCustomOpen);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[activeIndex]) {
        filtered[activeIndex].action();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, activeIndex]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-lg overflow-hidden rounded-xl border-cyan/20 shadow-[0_0_60px_rgba(34,211,238,0.1)]"
      >
        <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
          <Search className="h-4 w-4 text-muted" strokeWidth={1.75} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, project, or link…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No matches.
            </p>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                  i === activeIndex
                    ? "bg-cyan/10 text-cyan"
                    : "text-ink hover:bg-white/[0.04]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span className="text-sm">{item.label}</span>
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {item.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

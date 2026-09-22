"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function CopyLinkButton({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — the section's own #id URL still works
      // via the browser's normal address bar / right-click "copy link"
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      aria-label={`Copy link to ${title}`}
      className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
    >
      {copied ? (
        <Check className="h-4 w-4 text-cyan" strokeWidth={1.75} />
      ) : (
        <Link2 className="h-4 w-4 text-muted transition-colors hover:text-cyan" strokeWidth={1.75} />
      )}
    </button>
  );
}

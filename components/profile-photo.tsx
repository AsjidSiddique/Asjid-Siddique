"use client";

import { useState } from "react";
import { site } from "@/data/site";

// Shows public/image.png if present. Falls back to initials if it's
// missing or fails to load — never crashes either way. Deliberately
// applies NO border/radius/shadow defaults itself (those conflict with
// whatever the caller passes via `className`, e.g. rounded-full for an
// oval hero photo vs rounded-xl for the About section) — the caller owns
// all of that, this component only guarantees the image data fits well.
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-white/[0.03] backdrop-blur ${className}`}
        role="img"
        aria-label={site.name}
      >
        <span className="font-display text-3xl text-muted">
          {site.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={site.profileImagePath}
      alt={site.name}
      onError={() => setFailed(true)}
      className={`block object-cover ${className}`}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Shows the profile photo. Falls back to initials if the file is missing or
// fails to load — never crashes either way. Applies NO border/radius/shadow
// itself: the caller owns that via `className`.
//
// First-load polish: the element has a solid placeholder colour and a soft
// blur that clears the moment the image has decoded, so the portrait never
// pops in half-painted. Images that are already cached (complete before
// hydration) are detected in the effect so they don't flash blurred.
export function ProfilePhoto({
  className = "",
  src = site.profileImagePath,
}: {
  className?: string;
  src?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-wash backdrop-blur ${className}`}
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
      ref={ref}
      src={src}
      alt={site.name}
      width={640}
      height={640}
      loading="eager"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`block max-w-none bg-bg2 object-cover transition-[filter] duration-500 ${
        loaded ? "blur-0" : "blur-md"
      } ${className}`}
    />
  );
}

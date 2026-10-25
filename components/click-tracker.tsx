"use client";

import { useEffect } from "react";
import { site } from "@/data/site";
import { trackCounter } from "@/lib/counter";

// One delegated listener for the whole site, so no individual link needs
// wiring: any <a download> pointing at the resume PDF adds 1 to the resume
// counter; any link to the GitHub profile adds 1 to the GitHub counter.
// (Mounted once in app/layout.tsx.)
const norm = (u: string) => u.replace(/\/+$/, "").toLowerCase();

export function ClickTracker() {
  useEffect(() => {
    const githubHref = norm(new URL(site.links.github, window.location.href).href);
    const resumeEnd = site.resumePath.toLowerCase();

    function onClick(e: MouseEvent) {
      if (e.button === 2) return; // right-click only opens the menu
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = norm(a.href);
      if (a.hasAttribute("download") && href.endsWith(resumeEnd)) {
        void trackCounter("resume");
      } else if (href === githubHref) {
        void trackCounter("github");
      }
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true); // middle-click
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}

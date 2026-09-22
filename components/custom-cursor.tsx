"use client";

import { useEffect, useRef, useState } from "react";

// Small solid cyan dot (tracks the pointer exactly, zero lag) + a soft
// blurred glow that trails behind it with a fast CSS transition. Desktop
// (fine pointer) only, disabled under prefers-reduced-motion, never
// rendered on touch devices.
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    function place(el: HTMLDivElement | null, x: number, y: number) {
      if (!el) return;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }

    function onMove(e: MouseEvent) {
      place(dotRef.current, e.clientX, e.clientY);
      place(glowRef.current, e.clientX, e.clientY);
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest("a, button, [role='tab']");
      glowRef.current?.classList.toggle("scale-[1.8]", Boolean(el));
      glowRef.current?.classList.toggle("opacity-70", Boolean(el));
    }

    function onDown() {
      dotRef.current?.classList.add("scale-[0.6]");
    }
    function onUp() {
      dotRef.current?.classList.remove("scale-[0.6]");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* soft trailing glow — CSS transition is the only thing animating it */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full bg-cyan/25 opacity-50 blur-[6px] transition-[transform,opacity,scale] duration-150 ease-out"
      />
      {/* exact-position dot — no transition, always sits on the real pointer */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-cyan transition-[scale] duration-100"
      />
    </>
  );
}

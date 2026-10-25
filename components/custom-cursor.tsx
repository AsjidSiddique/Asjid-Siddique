"use client";

import { useEffect, useRef, useState } from "react";

// Cursor enhancer, built so it can never feel laggy:
//  • The REAL system cursor is never hidden — it is always exactly under the
//    mouse with zero latency (hiding it and drawing a div that trails by a
//    frame is what made the old cursor feel slow).
//  • A soft ring follows the pointer on top of it with a fast, frame-rate
//    independent ease (about 60 ms to catch up), grows over links/buttons,
//    shrinks on press and fades out when the mouse leaves the window.
//  • The animation loop only runs while the ring is still catching up, so
//    there is no per-frame work when the mouse is idle.
// Fine pointers only; skipped on touch and under prefers-reduced-motion.
const INTERACTIVE = "a, button, [role='button'], [role='tab'], summary, label, select";
const TEXT_FIELD = "input, textarea, [contenteditable='true']";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef<HTMLDivElement>(null); // moved with transform (JS)
  const ringRef = useRef<HTMLDivElement>(null); // scale / opacity (CSS transition)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const pos = posRef.current;
    const ring = ringRef.current;
    if (!pos || !ring) return;

    let tx = -100;
    let ty = -100; // target (the real pointer)
    let x = -100;
    let y = -100; // ring position
    let raf = 0;
    let last = 0;
    let visible = false;

    function frame(now: number) {
      const dt = Math.min(now - last || 16, 40);
      last = now;
      // frame-rate independent exponential ease (k≈0.35 per 16 ms)
      const k = 1 - Math.pow(1 - 0.35, dt / 16);
      x += (tx - x) * k;
      y += (ty - y) * k;
      pos!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - x) > 0.15 || Math.abs(ty - y) > 0.15) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    }

    function wake() {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    function show(v: boolean) {
      if (visible === v) return;
      visible = v;
      ring!.style.opacity = v ? "1" : "0";
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        // first move / re-entry: snap, don't fly in from the corner
        x = tx;
        y = ty;
        pos!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        show(true);
      }
      wake();
    }

    function onOver(e: MouseEvent) {
      const t = e.target as Element | null;
      const text = Boolean(t?.closest?.(TEXT_FIELD));
      const hot = !text && Boolean(t?.closest?.(INTERACTIVE));
      ring!.dataset.state = text ? "text" : hot ? "hot" : "idle";
    }

    const onDown = () => ring!.classList.add("cursor-press");
    const onUp = () => ring!.classList.remove("cursor-press");
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={posRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <div ref={ringRef} data-state="idle" className="cursor-ring" style={{ opacity: 0 }} />
    </div>
  );
}

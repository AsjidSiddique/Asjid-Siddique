"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

// Layered premium background: dark navy base, three slow-drifting blurred
// orbs (cyan / indigo / violet), a faint technical grid, a radial vignette
// for depth, ~24 tiny floating particles, subtle grain, and a mouse-follow
// glow. Everything here is decorative (aria-hidden). Mouse-follow and
// particle motion are disabled under prefers-reduced-motion and on
// coarse (touch) pointers; particles are generated client-side only, so
// there's nothing random to mismatch during server rendering.
export function BackgroundFx() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    setParticles(
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * -20,
        opacity: 0.15 + Math.random() * 0.35,
      }))
    );

    if (reduce || coarse) return;
    setMotionEnabled(true);

    // The glow eases toward the pointer, but the loop only runs while it is
    // still moving — no per-frame work when the mouse is idle.
    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let last = 0;

    function tick(now: number) {
      const dt = Math.min(now - last || 16, 40);
      last = now;
      const k = 1 - Math.pow(1 - 0.1, dt / 16);
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      }
      raf = Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ contain: "layout paint style" }}>
      {/* base */}
      <div className="absolute inset-0 bg-bg" />

      {/* orbs — colours/alphas come from theme variables: neon aurora in
          dark mode, soft pastel wash in light mode */}
      <div className="absolute -top-32 left-[-8%] h-[520px] w-[520px] animate-orb-a rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgb(var(--orb1) / calc(var(--orb1-a) * 1.35)) 0%, rgb(var(--orb1) / calc(var(--orb1-a) * 0.5)) 35%, transparent 70%)" }} />
      <div className="absolute -top-24 right-[-10%] h-[560px] w-[560px] animate-orb-b rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgb(var(--orb2) / calc(var(--orb2-a) * 1.35)) 0%, rgb(var(--orb2) / calc(var(--orb2-a) * 0.5)) 35%, transparent 70%)" }} />
      <div className="absolute bottom-[-15%] left-[20%] h-[520px] w-[520px] animate-orb-c rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgb(var(--orb3) / calc(var(--orb3-a) * 1.35)) 0%, rgb(var(--orb3) / calc(var(--orb3-a) * 0.5)) 35%, transparent 70%)" }} />
      <div className="absolute right-[8%] top-[38%] h-[320px] w-[320px] animate-orb-b rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgb(var(--orb4) / calc(var(--orb4-a) * 1.35)) 0%, rgb(var(--orb4) / calc(var(--orb4-a) * 0.5)) 35%, transparent 70%)" }} />

      {/* light mode only: clean white fade from the top so the header and hero stay crisp */}
      <div
        className="absolute inset-0 hidden light:block"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0) 45%)" }}
      />

      {/* soft center glow behind hero content, for focus/depth */}
      <div
        className="absolute left-1/2 top-[22%] h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgb(var(--orb1) / 0.06), transparent 65%)",
        }}
      />

      {/* cursor-follow glow (desktop, motion-enabled only) */}
      {motionEnabled && (
        <div
          ref={glowRef}
          style={{
            background: "radial-gradient(circle, rgb(var(--cyan) / 0.13) 0%, transparent 65%)",
            transform: "translate3d(calc(50vw - 260px), calc(33vh - 260px), 0)",
          }}
          className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full will-change-transform"
        />
      )}

      {/* technical grid — dual layer (large + fine) for depth */}
      <div className="tech-grid absolute inset-0 opacity-80" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* floating particles (calmer in light mode) */}
      <div className="absolute inset-0 light:opacity-50">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float rounded-full bg-cyan"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      </div>

      {/* uniform dark scrim: keeps orb/particle color as accents rather
          than washing out body text contrast across whole sections */}
      <div className="absolute inset-0 bg-bg" style={{ opacity: "var(--scrim)" }} />

      {/* vignette for depth — stronger at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 45%, rgb(var(--bg) / 0.6) 100%)",
        }}
      />

      {/* grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
}

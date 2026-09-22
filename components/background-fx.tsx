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
      Array.from({ length: 36 }, () => ({
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

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-bg" />

      {/* orbs — layered and larger for real depth */}
      <div className="absolute -top-32 left-[-8%] h-[520px] w-[520px] animate-orb-a rounded-full bg-cyan/[0.28] blur-[100px]" />
      <div className="absolute -top-24 right-[-10%] h-[560px] w-[560px] animate-orb-b rounded-full bg-indigo/[0.30] blur-[110px]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[520px] w-[520px] animate-orb-c rounded-full bg-violet/[0.28] blur-[110px]" />
      <div className="absolute right-[8%] top-[38%] h-[320px] w-[320px] animate-orb-b rounded-full bg-sky/[0.18] blur-[100px]" />

      {/* soft center glow behind hero content, for focus/depth */}
      <div
        className="absolute left-1/2 top-[22%] h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,211,238,0.05), transparent 65%)",
        }}
      />

      {/* cursor-follow glow (desktop, motion-enabled only) */}
      {motionEnabled && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan/[0.07] blur-[110px]"
        />
      )}

      {/* technical grid — dual layer (large + fine) for depth */}
      <div className="tech-grid absolute inset-0 animate-grid-drift opacity-80" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* floating particles */}
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

      {/* uniform dark scrim: keeps orb/particle color as accents rather
          than washing out body text contrast across whole sections */}
      <div className="absolute inset-0 bg-bg/50" />

      {/* vignette for depth — stronger at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 45%, rgba(5,8,22,0.6) 100%)",
        }}
      />

      {/* grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
}

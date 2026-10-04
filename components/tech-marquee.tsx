import { SkillIcon } from "./skill-icon";

// Slow, endless strip of the stack under the hero. Pure CSS (a duplicated row
// translated by -50%), pauses on hover, edges fade out, and the global
// reduced-motion rule freezes it for people who ask for less motion.
const stack = [
  "Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "Scikit-learn", "ONNX Runtime", "FastAPI",
  "TypeScript", "React.js", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "MongoDB",
  "Supabase", "C++", "Java", "Git", "Linux", "Vercel",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {stack.map((name) => (
        <li
          key={name}
          className="flex items-center gap-2 rounded-full border border-edge bg-wash px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur transition-colors duration-200 hover:border-cyan/40 hover:text-cyan"
        >
          <SkillIcon name={name} className="h-3.5 w-3.5 text-cyan" />
          {name}
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <div
      className="group relative mx-auto max-w-content overflow-hidden px-0 py-2"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
      aria-label="Technologies I work with"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

const nodes = [
  { x: 40, y: 40, label: "PyTorch" },
  { x: 190, y: 90, label: null },
  { x: 320, y: 30, label: "Next.js" },
  { x: 280, y: 170, label: "FastAPI" },
  { x: 100, y: 200, label: null },
  { x: 350, y: 220, label: "ONNX" },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 5],
  [1, 4],
  [4, 3],
];

// Abstract, decorative circuit/graph illustration for the hero's visual
// column. Not a screenshot of anything — nodes drift slowly, connecting
// lines have a flowing "data pipeline" dash animation, and the tech-name
// labels float independently. All motion is slow (6-14s cycles) and uses
// SMIL/CSS animation, so it costs nothing on the main thread; the global
// prefers-reduced-motion rule (app/globals.css) collapses every one of
// these to effectively static automatically.
export function NodeGraphVisual() {
  return (
    <div className="relative h-[320px] w-full max-w-[420px]">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan/10 via-indigo/10 to-violet/10 blur-2xl" />
      <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
        <g stroke="#22D3EE" strokeWidth="0.85" opacity="0.4" fill="none">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              strokeDasharray="4 5"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="18;0"
                dur={`${2.5 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </g>
        {nodes.map((n, i) => {
          const dx = 5 + (i % 3) * 2;
          const dy = 4 + ((i + 1) % 3) * 2;
          const dur = 5 + i * 1.3;
          return (
            <g key={i}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0; ${dx} ${-dy}; 0 0; ${-dx} ${dy}; 0 0`}
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.label ? 10 : 6}
                fill="none"
                stroke={i % 2 === 0 ? "#22D3EE" : "#A855F7"}
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.label ? 5 : 3}
                fill={i % 2 === 0 ? "#22D3EE" : "#A855F7"}
                opacity="0.9"
              >
                <animate
                  attributeName="opacity"
                  values="0.9;0.4;0.9"
                  dur={`${4 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* real tech labels, positioned near their nodes, each floating on
          its own slow independent cycle */}
      {nodes
        .filter((n) => n.label)
        .map((n, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full border border-edge bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur"
            style={{
              left: `${(n.x / 400) * 100}%`,
              top: `${(n.y / 260) * 100}%`,
              transform: "translate(12px, -50%)",
              animationDuration: `${6 + i * 1.5}s`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {n.label}
          </span>
        ))}
    </div>
  );
}

// Decorative, abstract SVG headers for each project card — not screenshots.
// Each references the project's domain (PCB grid, transaction graph,
// product UI, CPU scheduling) using only the shared accent palette.
export function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "pcbdefect-x") {
    return (
      <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="pcb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 0 20" fill="none" stroke="#22D3EE" strokeOpacity="0.15" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#pcb-grid)" />
        <g stroke="#38BDF8" strokeWidth="1" opacity="0.5" fill="none">
          <path d="M40 40 H140 V90 H220" />
          <path d="M60 120 H160 V70 H260" />
        </g>
        <rect x="130" y="35" width="20" height="20" rx="2" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
        <rect x="245" y="60" width="20" height="20" rx="2" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
        <line x1="0" y1="20" x2="400" y2="20" stroke="#22D3EE" strokeWidth="1" opacity="0.6">
          <animate attributeName="y1" values="10;150;10" dur="7s" repeatCount="indefinite" />
          <animate attributeName="y2" values="10;150;10" dur="7s" repeatCount="indefinite" />
        </line>
      </svg>
    );
  }

  if (slug === "fraudshield") {
    return (
      <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
        <g stroke="#A855F7" strokeWidth="0.75" opacity="0.45">
          <line x1="40" y1="40" x2="140" y2="80" />
          <line x1="140" y1="80" x2="230" y2="35" />
          <line x1="140" y1="80" x2="200" y2="130" />
          <line x1="230" y1="35" x2="320" y2="70" />
          <line x1="200" y1="130" x2="310" y2="115" />
        </g>
        <g fill="#A855F7">
          <circle cx="40" cy="40" r="3" />
          <circle cx="140" cy="80" r="4" />
          <circle cx="230" cy="35" r="3" />
          <circle cx="200" cy="130" r="3" />
          <circle cx="320" cy="70" r="3" />
          <circle cx="310" cy="115" r="3" />
        </g>
        <circle cx="140" cy="80" r="10" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }

  if (slug === "viro") {
    return (
      <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${40 + i * 115}, 30)`}>
            <rect width="90" height="100" rx="8" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
            <rect x="10" y="10" width="70" height="45" rx="4" fill="#38BDF8" opacity="0.08" />
            <rect x="10" y="65" width="45" height="6" rx="3" fill="#38BDF8" opacity="0.4" />
            <rect x="10" y="78" width="30" height="6" rx="3" fill="#38BDF8" opacity="0.25" />
          </g>
        ))}
      </svg>
    );
  }

  // os-kernel-simulator: CPU scheduling Gantt-style bars
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      {[
        { y: 30, w: 240, color: "#6366F1" },
        { y: 65, w: 160, color: "#22D3EE" },
        { y: 100, w: 300, color: "#6366F1" },
        { y: 135, w: 200, color: "#22D3EE" },
      ].map((row, i) => (
        <g key={i}>
          <rect x="30" y={row.y} width="340" height="18" rx="3" fill="none" stroke={row.color} strokeOpacity="0.2" />
          <rect x="30" y={row.y} width={row.w} height="18" rx="3" fill={row.color} opacity="0.25" />
        </g>
      ))}
    </svg>
  );
}

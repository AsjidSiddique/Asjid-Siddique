// Per-project accent pairing, as specified: each project gets two colors
// from the shared cyan/indigo/violet/sky system — never arbitrary hues.
export type ProjectAccent = {
  from: string; // tailwind color token for gradients/glows
  to: string;
  text: string; // tailwind text-color class
  border: string; // tailwind border-color class (with opacity)
  glow: string; // tailwind bg-color class (low opacity, for blurred glow)
};

export const projectAccents: Record<string, ProjectAccent> = {
  "pcbdefect-x": {
    from: "#22D3EE",
    to: "#38BDF8",
    text: "text-cyan",
    border: "border-cyan/30",
    glow: "bg-cyan/10",
  },
  fraudshield: {
    from: "#A855F7",
    to: "#6366F1",
    text: "text-violet",
    border: "border-violet/30",
    glow: "bg-violet/10",
  },
  viro: {
    from: "#38BDF8",
    to: "#22D3EE",
    text: "text-sky",
    border: "border-sky/30",
    glow: "bg-sky/10",
  },
  "os-kernel-simulator": {
    from: "#6366F1",
    to: "#22D3EE",
    text: "text-indigo",
    border: "border-indigo/30",
    glow: "bg-indigo/10",
  },
};

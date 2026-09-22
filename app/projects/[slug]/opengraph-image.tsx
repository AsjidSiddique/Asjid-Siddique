import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const accentBySlug: Record<string, string> = {
  "pcbdefect-x": "#22D3EE",
  fraudshield: "#A855F7",
  viro: "#38BDF8",
  "os-kernel-simulator": "#6366F1",
};

export default function ProjectOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  const accent = accentBySlug[params.slug] ?? "#22D3EE";

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#050816",
            color: "#F1F5F9",
            fontSize: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Asjid Siddique
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#050816",
          backgroundImage: `radial-gradient(circle at 20% 30%, ${accent}33, transparent 45%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: 2,
            color: accent,
            marginBottom: 24,
          }}
        >
          {project.category.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            color: "#F1F5F9",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#AAB4C4",
            marginTop: 20,
            maxWidth: 900,
          }}
        >
          {project.tagline}
        </div>
        {project.metrics.length > 0 && (
          <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 40, color: accent, fontWeight: 700 }}>
                  {m.value}
                </div>
                <div style={{ display: "flex", fontSize: 18, color: "#94A3B8" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#5B6472",
            marginTop: 44,
          }}
        >
          Asjid Siddique · asjid-siddique-chi.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

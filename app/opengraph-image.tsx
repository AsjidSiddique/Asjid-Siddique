import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No external font fetch here on purpose — this needs to build reliably
// with zero network dependency (fonts.google.com isn't reachable from
// every build environment), so it uses the system sans-serif stack.
// Visually it still matches the site: same navy base, same cyan/violet
// gradient, same eyebrow/number styling as the real section headings.
export default function OpengraphImage() {
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
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.25), transparent 45%), radial-gradient(circle at 85% 75%, rgba(168,85,247,0.22), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#22D3EE",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#22D3EE",
            }}
          />
          BUILDING TOWARD AI/ML RESEARCH
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            color: "#F1F5F9",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#AAB4C4",
            marginTop: 22,
          }}
        >
          {site.headline} · Full-Stack Developer
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["PCBDefect-X", "FraudShield", "Viro.pk", "OS Kernel Simulator"].map(
            (p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  fontSize: 20,
                  color: "#94A3B8",
                  border: "1px solid rgba(148,163,184,0.25)",
                  borderRadius: 999,
                }}
              >
                {p}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

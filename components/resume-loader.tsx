"use client";

import dynamic from "next/dynamic";

// react-pdf (pdfjs-dist) touches browser-only globals (DOMMatrix, Path2D,
// Worker) at module load time, which breaks Next.js's server-side
// prerendering. Loading it client-only avoids that entirely. This tiny
// wrapper exists so app/resume/page.tsx can stay a Server Component and
// export real per-page metadata (a client "use client" page can't).
const ResumeViewer = dynamic(() => import("@/components/resume-viewer"), {
  ssr: false,
});

export default function ResumeLoader() {
  return <ResumeViewer />;
}

"use client";

import dynamic from "next/dynamic";

// react-pdf (pdfjs-dist) touches browser-only globals (DOMMatrix, Path2D,
// Worker) at module load time, which breaks Next.js's server-side
// prerendering of this page. Loading it client-only avoids that entirely.
const ResumeViewer = dynamic(() => import("@/components/resume-viewer"), {
  ssr: false,
});

export default function ResumePage() {
  return <ResumeViewer />;
}

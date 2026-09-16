"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileWarning,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Nav } from "@/components/nav";
import { site } from "@/data/site";

// Worker asset served as a plain static file from /public — NOT bundled
// via `new URL(..., import.meta.url)`. That approach makes Next.js try to
// parse this large, already-minified pdfjs file as source through its own
// bundler, which fails ("Syntax Error" from swc/webpack on the minified
// output). Serving it as a static string path sidesteps that entirely.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function ResumeViewer() {
  // Driven directly by react-pdf's own load events — no separate HEAD
  // probe first. That earlier version had two sequential waits (a fetch,
  // then the PDF render); this has exactly one.
  const [status, setStatus] = useState<"loading" | "available" | "missing">(
    "loading"
  );
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(700);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function measure() {
      if (pageWrapRef.current) {
        setPageWidth(Math.min(pageWrapRef.current.clientWidth - 32, 900));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [status, isFullscreen]);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setStatus("available");
  }, []);

  const onLoadError = useCallback(() => {
    setStatus("missing");
  }, []);

  function goPrev() {
    setPageNumber((p) => Math.max(1, p - 1));
  }
  function goNext() {
    setPageNumber((p) => Math.min(numPages, p + 1));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main
        className="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-8 md:px-8"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to portfolio
          </Link>

          {status === "available" && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center gap-2 rounded-lg border border-edge px-3.5 py-1.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Exit fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Fullscreen
                </>
              )}
            </button>
          )}
        </div>

        <h1 className="font-display text-2xl font-semibold text-ink">Resume viewer</h1>

        <div
          ref={containerRef}
          className="mt-6 flex h-[calc(100vh-180px)] w-full flex-col overflow-hidden rounded-xl border border-edge bg-bg/70 backdrop-blur-xl"
        >
          {status === "missing" && (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <FileWarning className="h-6 w-6 text-muted" strokeWidth={1.5} />
              <p className="text-sm text-muted">Resume not available yet.</p>
              <p className="max-w-sm text-xs text-muted">
                Add your resume PDF at{" "}
                <code className="font-mono text-cyan">public/resume.pdf</code>{" "}
                and it will appear here automatically.
              </p>
            </div>
          )}

          <div
            ref={pageWrapRef}
            className={`flex flex-1 items-center justify-center overflow-auto p-6 ${
              status === "missing" ? "hidden" : ""
            }`}
          >
            <Document
              file={site.resumePath}
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
              loading={
                <p className="text-sm text-muted">Loading resume…</p>
              }
              error=""
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-lg shadow-2xl"
              />
            </Document>
          </div>

          {status === "available" && (
            <div className="flex items-center justify-center gap-4 border-t border-edge bg-white/[0.03] px-4 py-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-edge text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <span className="font-mono text-xs text-muted">
                Page {pageNumber} of {numPages}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={pageNumber >= numPages}
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-edge text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

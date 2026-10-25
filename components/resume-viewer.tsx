"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  FileWarning,
  Award,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Minimize2,
  Minus,
  Phone,
  Plus,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProfilePhoto } from "@/components/profile-photo";
import { CountBadge } from "@/components/count-badge";
import { site } from "@/data/site";

// Worker asset served as a plain static file from /public — NOT bundled
// via `new URL(..., import.meta.url)` (Next.js can't parse the minified
// pdfjs file as source). A static string path sidesteps that entirely.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const DOWNLOAD_NAME = "Asjid_Siddique_Resume.pdf";
// Zoom is shown as % of the PDF's true size (100% = 794 px wide, the same
// scale browsers use). Defaults: 70% on desktop, 85% in fullscreen; phones and
// tablets fit the screen width instead (70% would be wider than the screen).
const DEFAULT_PCT = 70;
const FULLSCREEN_PCT = 85;
const MIN_PCT = 40;
const MAX_PCT = 200;

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan disabled:pointer-events-none disabled:opacity-30";

function PaperSkeleton({ width }: { width: number }) {
  return (
    <div
      className="animate-pulse rounded-md bg-white/80 p-8 shadow-xl"
      style={{ width, height: Math.round(width * 1.3) }}
      aria-label="Loading resume"
    >
      <div className="mx-auto h-5 w-2/5 rounded bg-slate-300/70" />
      <div className="mx-auto mt-3 h-3 w-3/5 rounded bg-slate-200" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            className="h-3 rounded bg-slate-200"
            style={{ width: `${70 + ((i * 37) % 30)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ResumeViewer() {
  const [status, setStatus] = useState<"loading" | "available" | "missing">("loading");
  const [numPages, setNumPages] = useState(0);
  const [userPct, setUserPct] = useState<number | null>(null); // null = default
  const [stage, setStage] = useState({ w: 720, desktop: true });
  const [pdfPageW, setPdfPageW] = useState(794); // PDF page width in CSS px (A4)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);

  // The viewer has NO fixed height and no inner scrollbar: every page is
  // rendered at the viewer's width, stacked, and the box simply grows to the
  // pages' height — the normal page scroll does the rest. The width is
  // re-measured live (resize, rotation, fullscreen), so it re-fits itself.
  useEffect(() => {
    const el = deskRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const pad = window.innerWidth < 640 ? 12 : 28;
        setStage({
          w: Math.min(1000, Math.max(240, el.clientWidth - pad * 2)),
          desktop: window.innerWidth >= 1024,
        });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setUserPct(null); // each mode starts at its own default (70% / 85%)
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else viewerRef.current?.requestFullscreen();
  }

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setStatus("available");
  }, []);
  const onLoadError = useCallback(() => setStatus("missing"), []);
  const onPageLoad = useCallback((p: { originalWidth: number }) => {
    if (p.originalWidth > 0) setPdfPageW(p.originalWidth);
  }, []);

  // --- zoom maths -----------------------------------------------------------
  const defaultPct = isFullscreen ? FULLSCREEN_PCT : DEFAULT_PCT;
  const defaultWidth =
    stage.desktop || isFullscreen ? Math.min(stage.w, (pdfPageW * defaultPct) / 100) : stage.w;
  const pageWidth = Math.max(
    200,
    Math.round(userPct !== null ? (pdfPageW * userPct) / 100 : defaultWidth)
  );
  const realPct = Math.round((pageWidth / pdfPageW) * 100);

  const changeZoom = useCallback(
    (delta: number) =>
      setUserPct(Math.min(MAX_PCT, Math.max(MIN_PCT, Math.round((realPct + delta) / 5) * 5))),
    [realPct]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // don't hijack typing (e.g. the ⌘K search box) or browser shortcuts
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "+" || e.key === "=") changeZoom(10);
      if (e.key === "-") changeZoom(-10);
      if (e.key === "0") setUserPct(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeZoom]);

  const ready = status === "available";
  const dpr = Math.max(2, typeof window !== "undefined" ? window.devicePixelRatio : 2);

  const contact = [
    { icon: Mail, label: site.links.email, href: `mailto:${site.links.email}` },
    { icon: Phone, label: site.links.phone, href: `tel:${site.links.phone.replace(/-/g, "")}` },
    { icon: MapPin, label: site.location },
  ];

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-8 md:px-8">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to portfolio
        </Link>

        <h1 className="sr-only">{site.name} — Resume</h1>
        <div className="h-4" />

        <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
          {/* ---------- profile sidebar ---------- */}
          <aside className="rounded-2xl border border-edge bg-wash p-5 backdrop-blur lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-gradient-to-br from-cyan via-sky to-violet p-[2px]">
                <ProfilePhoto
                  src={site.avatarSmPath}
                  className="h-16 w-16 rounded-full border-2 border-bg"
                />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-tight text-ink">{site.name}</p>
                <p className="mt-0.5 text-xs text-muted">NUST · BS Software Engineering</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5 text-sm">
              {contact.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5 text-muted">
                  <Icon className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.75} />
                  {href ? (
                    <a href={href} className="truncate transition-colors hover:text-cyan">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-muted">
                <GraduationCap className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.75} />
                <span>Graduating in 2028</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted">
                <Award className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.75} />
                <span>CGPA {site.cgpa}</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={site.resumePath}
                download={DOWNLOAD_NAME}
                className="shine flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-4 py-2.5 text-sm font-semibold text-onaccent shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-lg"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download PDF
                <CountBadge counter="resume" className="bg-onaccent/15 text-onaccent" />
              </a>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                Open in new tab
              </a>
            </div>

            <div className="mt-5 flex gap-2 border-t border-edge pt-5">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconBtn}
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconBtn}
              >
                <Github className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={site.links.viro}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center rounded-lg border border-edge px-3 text-xs text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
              >
                Viro.pk
              </a>
            </div>
          </aside>

          {/* ---------- viewer ---------- */}
          <div
            ref={viewerRef}
            className={`flex min-w-0 flex-col ${isFullscreen ? "h-screen bg-bg" : ""}`}
          >
            {/* toolbar (stays visible under the nav while the page scrolls) */}
            <div
              className={`z-20 flex flex-wrap items-center justify-between gap-2 border border-edge bg-bg/85 px-3 py-2.5 backdrop-blur-xl ${
                isFullscreen ? "" : "sticky top-[73px] rounded-t-2xl"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2 text-sm text-muted">
                <FileText className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.75} />
                <span className="hidden truncate font-mono text-xs sm:inline">{DOWNLOAD_NAME}</span>
                {numPages > 0 && (
                  <span className="rounded-full border border-edge px-2 py-0.5 font-mono text-[11px]">
                    {numPages} {numPages === 1 ? "page" : "pages"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => changeZoom(-10)} disabled={!ready || realPct <= MIN_PCT} aria-label="Zoom out" className={iconBtn}>
                  <Minus className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <span
                  className="flex h-9 min-w-[3.25rem] items-center justify-center rounded-lg border border-edge px-2 font-mono text-xs text-ink"
                  aria-live="polite"
                  title="Current zoom"
                >
                  {realPct}%
                </span>
                <button type="button" onClick={() => changeZoom(10)} disabled={!ready || realPct >= MAX_PCT} aria-label="Zoom in" className={iconBtn}>
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => setUserPct(null)}
                  disabled={!ready}
                  aria-pressed={userPct === null}
                  title={`Reset to the default zoom (${defaultPct}%)`}
                  className={`h-9 rounded-lg border px-2.5 font-mono text-xs transition-colors disabled:opacity-30 ${
                    userPct === null
                      ? "border-cyan/60 bg-cyan/10 text-cyan"
                      : "border-edge text-ink hover:border-cyan/50 hover:text-cyan"
                  }`}
                >
                  Reset
                </button>
                <span className="mx-1 hidden h-5 w-px bg-edge sm:block" />
                <button type="button" onClick={toggleFullscreen} disabled={!ready} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"} className={iconBtn}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" strokeWidth={1.75} /> : <Maximize2 className="h-4 w-4" strokeWidth={1.75} />}
                </button>
                <a href={site.resumePath} download={DOWNLOAD_NAME} aria-label="Download PDF" className={iconBtn}>
                  <Download className="h-4 w-4" strokeWidth={1.75} />
                </a>
              </div>
            </div>

            {/* desk: height follows the pages — no inner vertical scrollbar
                (only in fullscreen, where the screen height is the limit) */}
            <div
              ref={deskRef}
              className={`border border-t-0 border-edge bg-ink/[0.05] p-3 sm:p-7 ${
                isFullscreen ? "min-h-0 flex-1 overflow-auto" : "overflow-x-auto rounded-b-2xl"
              }`}
            >
              {status === "missing" ? (
                <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-24 text-center">
                  <FileWarning className="h-7 w-7 text-muted" strokeWidth={1.5} />
                  <p className="text-sm text-ink">Couldn&apos;t display the resume here.</p>
                  <p className="text-xs text-muted">Your browser blocked the viewer. You can still open or download the PDF directly.</p>
                  <a
                    href={site.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-2 rounded-lg border border-cyan/40 px-4 py-2 text-sm text-cyan transition-colors hover:bg-cyan/10"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                    Open PDF
                  </a>
                </div>
              ) : (
                <div className="mx-auto w-fit">
                  <Document
                    file={site.resumePath}
                    onLoadSuccess={onLoadSuccess}
                    onLoadError={onLoadError}
                    externalLinkTarget="_blank"
                    externalLinkRel="noopener noreferrer"
                    className="flex flex-col gap-6"
                    loading={<PaperSkeleton width={pageWidth} />}
                    error=""
                  >
                    {Array.from({ length: numPages }, (_, i) => (
                      <Page
                        key={i}
                        pageNumber={i + 1}
                        width={pageWidth}
                        devicePixelRatio={dpr}
                        onLoadSuccess={i === 0 ? onPageLoad : undefined}
                        className="overflow-hidden rounded-md bg-white shadow-[0_24px_60px_-20px_rgba(2,6,23,0.55)] ring-1 ring-black/5"
                        loading={<PaperSkeleton width={pageWidth} />}
                      />
                    ))}
                  </Document>
                </div>
              )}
            </div>

            <p className="mt-2 hidden text-center text-xs text-muted sm:block">
              Opens at 70% (85% fullscreen) · links are clickable · press + / − to zoom, 0 to reset
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

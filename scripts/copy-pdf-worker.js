// Copies pdfjs-dist's worker file into /public as a plain static asset.
// react-pdf needs this at a fixed URL matching its bundled pdfjs-dist
// version exactly. We deliberately do NOT reference it via
// `new URL(..., import.meta.url)` in code — that makes Next.js try to
// parse the large minified worker file through its own bundler, which
// fails. Running this after every `npm install` keeps the copy correct
// even if react-pdf/pdfjs-dist gets upgraded later.
const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "..",
  "node_modules",
  "pdfjs-dist",
  "build",
  "pdf.worker.min.mjs"
);
const dest = path.join(__dirname, "..", "public", "pdf.worker.min.mjs");

try {
  fs.copyFileSync(src, dest);
  console.log("[postinstall] Copied pdf.worker.min.mjs to public/");
} catch (err) {
  console.warn(
    "[postinstall] Could not copy pdf.worker.min.mjs — the resume viewer's PDF rendering may not work:",
    err.message
  );
}

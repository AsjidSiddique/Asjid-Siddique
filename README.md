# Asjid Siddique — Portfolio

Premium dark-navy research/engineering portfolio. Next.js 14 (App Router),
TypeScript, Tailwind CSS — no other UI dependencies.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you deploy

1. Add your resume PDF at `public/resume.pdf` (used by `/resume`).
2. Contact info, links, and `metadataBase` are already filled in from your
   resume — double check `data/site.ts` and `app/layout.tsx`.
3. There's no profile photo in this version — the hero's visual element is
   the "AI Research System" glass panel instead (per the redesign brief).
   If you'd rather have your photo back, say so and it's a small change.

## Structure

- `data/site.ts` — personal info, links, nav, research interests, journey,
  experience, education, skills.
- `data/projects.ts` — the four projects and their detail-page content.
- `lib/project-accents.ts` — the cyan/indigo/violet/sky accent pairing for
  each project (per the brief's "project-specific accents" spec).
- `components/background-fx.tsx` — the layered background: dark base,
  three slow-drifting blurred orbs, technical grid, grain, and a
  mouse-follow glow (desktop + motion-enabled only).
- `components/custom-cursor.tsx` — small cyan dot + trailing ring,
  desktop (fine pointer) only, disabled under reduced motion.
- `components/reveal.tsx` — scroll-triggered entrance (opacity/translateY/
  blur), used throughout.
- `components/nav.tsx` — glass navbar, scroll-aware background, active-
  section underline via IntersectionObserver, animated mobile menu.
- `app/page.tsx` — homepage section order.
- `app/projects/[slug]/page.tsx` — shared project detail template.
- `app/resume/page.tsx` — resume viewer at `/resume`.

## Design system

- **Colors**: near-black navy base (`bg`/`bg2`), glass `surface`, `cyan`
  as the primary interactive accent, `indigo` as the secondary gradient
  partner, `violet` reserved specifically for research/AI highlights
  (the Research section and "current" timeline nodes). Colors are used by
  role, not per-section — intentionally not a rainbow.
- **Type**: Manrope (display/headings), Inter (body), IBM Plex Mono
  (data figures, eyebrows, section numbers).
- **Motion**: every animation (background orbs, cursor, card hover,
  scroll reveals, timeline glow) is disabled under `prefers-reduced-
  motion`, and mouse-follow effects and the custom cursor are disabled
  entirely on touch/coarse-pointer devices.
- Nothing here is a fabricated statistic — the hero's stat row and the
  section eyebrows are computed from `data/site.ts` / `data/projects.ts`
  directly.

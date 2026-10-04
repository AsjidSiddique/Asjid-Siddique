# Asjid Siddique — Portfolio

Research/engineering portfolio with a dark-navy and light theme. Next.js 14 (App Router),
TypeScript, Tailwind CSS — no other UI dependencies.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's included

- **Light / dark mode** — toggle in the header (and `⌘K` palette). Dark is the
  default; the choice is saved in `localStorage` and applied before first paint
  (no flash). Colours are CSS variables in `app/globals.css` (`:root` = dark,
  `.light` = light) wired into `tailwind.config.ts`.
- **Header** — small circular photo (`public/avatar-sm.jpg`) next to your name; hero portrait uses `public/avatar.jpg` (face-centred with headroom).
- **Resume page** — fit-to-width viewer with zoom, fullscreen, clickable links, profile sidebar and download. Replace `public/resume.pdf` to update it.
- **Experience** — timeline with tech chips (Malek Enterprise POS, Viro.pk); edit in `data/site.ts`.
- **Favicon / app icons** — circular crop of your photo: `public/favicon.ico`,
  `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.
- **Hero portrait** with gradient ring, About photo, footer quick links, and a
  "Download Resume" button in Contact.

## Link previews (WhatsApp, LinkedIn, X, Telegram…)

`public/og-image.jpg` (1200×630, ~100 KB, your photo + name) is the card shown
when the link is shared; it is wired in `app/layout.tsx` (and project pages).
Platforms cache previews — after deploying, refresh WhatsApp's cache by sharing
the link with `?v=2` added once, and use LinkedIn Post Inspector / Facebook
Sharing Debugger to re-scrape.

## Visitor counters (resume + GitHub)

Two small unlabeled number badges: one next to **Download PDF** / **Download
Resume** (adds 1 per resume download) and one next to **GitHub** in the footer
(adds 1 per click on your GitHub profile link, anywhere on the site). They are
stored via `app/api/counter/route.ts` in Upstash Redis and stay hidden until it
is connected:

1. Vercel project → **Storage** → **Create** → **Upstash Redis** → connect it
   to this project (this adds the `KV_REST_API_*` / `UPSTASH_REDIS_REST_*`
   env vars automatically).
2. Redeploy. Badges appear and start counting.

## Before you deploy

1. Replace `public/resume.pdf` whenever your resume changes (used by `/resume`).
2. Check `data/site.ts` and `app/layout.tsx` (links and `metadataBase`).
3. To change the photo: replace `public/image.png`, then regenerate
   `avatar.jpg`, `avatar-sm.jpg` and the icons from it.

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

import type { Metadata, Viewport } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/custom-cursor";
import { BackgroundFx } from "@/components/background-fx";
import { ClickTracker } from "@/components/click-tracker";
import { CommandPalette } from "@/components/command-palette";
import { SectionDots } from "@/components/section-dots";
import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.name }],
  metadataBase: new URL("https://asjid-siddique-chi.vercel.app"),
  creator: site.name,
  publisher: site.name,
  category: "technology",
  applicationName: `${site.name} — Portfolio`,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
  // Link previews (WhatsApp, Telegram, LinkedIn, X, iMessage, Slack, Discord):
  // public/og-image.jpg is a 1200x630 card with your photo, ~100 KB — small
  // enough that WhatsApp always renders it.
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.headline}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: ["/og-image.jpg"],
  },
  // Favicon = Asjid's photo (circular crop). Generated from public/image.png.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/avatar.jpg" />
        <link rel="preload" as="image" href="/avatar-sm.jpg" />
        {/* Apply the saved theme before first paint (no flash on reload).
            Dark is the default; only an explicit "light" choice flips it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light');var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content','#F5F7FB');}}catch(e){}",
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-cyan px-4 py-2 text-sm font-medium text-onaccent transition-transform duration-150 focus:translate-y-0"
        >
          Skip to content
        </a>
        <BackgroundFx />
        <CustomCursor />
        <ClickTracker />
        <ScrollProgress />
        <CommandPalette />
        <SectionDots />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}

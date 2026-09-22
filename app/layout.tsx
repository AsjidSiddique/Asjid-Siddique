import type { Metadata, Viewport } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/custom-cursor";
import { BackgroundFx } from "@/components/background-fx";
import { CommandPalette } from "@/components/command-palette";
import { SectionDots } from "@/components/section-dots";
import { BackToTop } from "@/components/back-to-top";

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
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-cyan px-4 py-2 text-sm font-medium text-[#04121a] transition-transform duration-150 focus:translate-y-0"
        >
          Skip to content
        </a>
        <BackgroundFx />
        <CustomCursor />
        <CommandPalette />
        <SectionDots />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}

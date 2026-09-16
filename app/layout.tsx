import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/custom-cursor";
import { BackgroundFx } from "@/components/background-fx";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <BackgroundFx />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

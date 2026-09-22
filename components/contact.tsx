"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, Copy, Check, UserPlus } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

function downloadVCard() {
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${site.name}`,
    `TITLE:${site.headline}`,
    `EMAIL:${site.links.email}`,
    `TEL:${site.links.phone}`,
    `URL:${site.links.github}`,
    `ORG:${site.university}`,
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "asjid-siddique.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — the mailto button still works fine
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading id="contact"
        eyebrow="08 — LET'S CONNECT" title="Let's connect" icon={MessageCircle} />

      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-edge bg-white/[0.045] p-10 backdrop-blur">
          <div className="pointer-events-none absolute -inset-24 -z-10 bg-gradient-to-br from-cyan/10 via-indigo/10 to-violet/10 blur-3xl" />
          <p className="max-w-prose text-base leading-relaxed text-muted">
            I'm interested in research opportunities, AI/ML projects,
            software engineering opportunities, and collaborations involving
            intelligent and reliable software systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.links.email}`}
              className="shine group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-medium text-[#04121a] shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              Email Me
            </a>

            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-cyan" strokeWidth={1.75} />
              ) : (
                <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
              )}
              <span
                className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-cyan/30 bg-bg px-2 py-1 font-mono text-[10px] text-cyan transition-all duration-200 ${
                  copied
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                Copied!
              </span>
            </button>

            <a
              href={site.links.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-edge px-5 py-2.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-edge px-5 py-2.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              LinkedIn
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-edge px-5 py-2.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
              GitHub
            </a>
            <button
              type="button"
              onClick={downloadVCard}
              className="flex items-center gap-2 rounded-lg border border-violet/30 bg-violet/10 px-5 py-2.5 text-sm text-violet transition-all duration-200 hover:-translate-y-0.5 hover:border-violet/50"
            >
              <UserPlus className="h-4 w-4" strokeWidth={1.75} />
              Save Contact
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-content px-6 py-28 md:py-36">
      <SectionHeading eyebrow="08 — LET'S CONNECT" title="Let's connect" icon={MessageCircle} />

      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-edge bg-white/[0.045] p-10 backdrop-blur">
          <div className="pointer-events-none absolute -inset-24 -z-10 bg-gradient-to-br from-cyan/10 via-indigo/10 to-violet/10 blur-3xl" />
          <p className="max-w-prose text-base leading-relaxed text-muted">
            I'm interested in research opportunities, AI/ML projects,
            software engineering opportunities, and collaborations involving
            intelligent and reliable software systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.links.email}`}
              className="shine group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-medium text-[#04121a] shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              Email Me
            </a>
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}

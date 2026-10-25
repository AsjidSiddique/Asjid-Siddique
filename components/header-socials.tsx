import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { site } from "@/data/site";

// GitHub · LinkedIn · WhatsApp icon buttons for the header.
// (GitHub clicks are counted automatically by <ClickTracker /> in the layout.)
const items = [
  {
    label: "GitHub",
    title: "GitHub",
    href: site.links.github,
    Icon: FaGithub,
    hover: "hover:border-ink/40 hover:text-ink",
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    href: site.links.linkedin,
    Icon: FaLinkedinIn,
    hover: "hover:border-[#0A66C2]/60 hover:text-[#0A66C2]",
  },
  {
    label: "WhatsApp",
    title: `WhatsApp · ${site.links.phone}`,
    href: site.links.whatsappUrl,
    Icon: FaWhatsapp,
    hover: "hover:border-[#25D366]/60 hover:text-[#25D366]",
  },
];

export function HeaderSocials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {items.map(({ label, title, href, Icon, hover }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={title}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-edge text-muted transition-all duration-200 hover:-translate-y-0.5 ${hover}`}
        >
          <Icon className="h-[15px] w-[15px]" />
        </a>
      ))}
    </div>
  );
}

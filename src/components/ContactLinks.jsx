import { ArrowUpRight, FileText, Mail } from "lucide-react";
import content from "../data/content.json";
import { Frame, GithubIcon, LinkedinIcon, SectionHeader } from "./Layout.jsx";

const LINKS = [
  { label: "GitHub", href: content.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: content.socials.linkedin, Icon: LinkedinIcon },
  { label: "Mail", href: content.socials.email, Icon: Mail },
  { label: "Resume", href: content.socials.resume, Icon: FileText },
];

export default function ContactLinks() {
  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <Frame>
        <div className="grid grid-cols-2 border-[var(--line)] sm:grid-cols-4">
          {LINKS.map(({ label, href, Icon }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group flex items-center justify-center gap-2.5 border-[var(--line)] px-4 py-4 text-[13px] font-medium transition-colors duration-200 hover:bg-[var(--hover)] ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b sm:border-b-0" : ""} ${i < LINKS.length - 1 ? "sm:border-r" : ""}`}
            >
              <span className="grid size-8 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                <Icon className="size-4" />
              </span>
              <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">{label}</span>
              <ArrowUpRight className="size-3.5 text-[var(--soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
            </a>
          ))}
        </div>
      </Frame>
    </div>
  );
}

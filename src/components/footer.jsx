import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Fingerprint } from "lucide-react";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function Footer() {
  const time = useClock();

  return (
    <footer className="w-full">
      <div className="bg-stripes relative h-12 w-full">
        <Frame className="h-full bg-[var(--bg)]" />
      </div>
      <SectionHeader title="Scrolled Too Far" />
      <Frame className="px-6 py-10 text-center sm:px-8">
        <p className="text-[14px] text-[var(--muted)]">See how I can help you, get in touch today.</p>
        <a
          href={`mailto:${content.email}`}
          className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Let's Talk
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </Frame>
      <div className="w-full border-t border-[var(--line)]">
        <Frame className="flex justify-center px-6 py-10 sm:px-8">
          <a
            href={content.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-4 py-2 text-[12px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
          >
            <Fingerprint className="size-4" />
            Explore my code & projects
            <ArrowUpRight className="size-3.5" />
          </a>
        </Frame>
      </div>
      <div className="w-full border-t border-[var(--line)]">
        <Frame className="px-6 py-8 text-center sm:px-8">
          <p className="text-[12px] text-[var(--muted)]">
            Designed & Developed by <span className="font-semibold text-[var(--fg)]">{content.name}</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-[var(--soft)]">© {time.getFullYear()} All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center gap-1.5 font-mono text-[11px] text-[var(--soft)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {time.toLocaleTimeString()}
          </p>
        </Frame>
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

const reveal = (delay) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

export default function About() {
  return (
    <div id="about">
      <SectionHeader title="About" />
      <Frame className="space-y-4 px-6 py-7 sm:px-8">
        {content.about.map((paragraph, i) => (
          <motion.div key={paragraph} {...reveal(i * 0.1)} className="flex gap-2 text-[14.5px] leading-relaxed text-[var(--muted)]">
            <span className="font-mono text-[var(--soft)]">•</span>
            <p>{paragraph}</p>
          </motion.div>
        ))}
        <motion.div {...reveal(0.3)} className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--fg)]">Developer Snapshot</p>
          <ul className="grid grid-cols-1 gap-2 font-mono text-[13px] text-[var(--muted)] sm:grid-cols-2">
            {content.tldr.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Frame>
    </div>
  );
}

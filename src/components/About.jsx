import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

const reveal = (delay) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

function Profile() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((i) => (i + 1) % content.roles.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div {...reveal(0)} className="mb-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
      <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--chip)] shadow-md">
        <img src={content.profileImages[0]} alt={content.name} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-[0.18]">
          <div className="animate-scanline absolute inset-0 h-1 bg-white/20 blur-[1px]" />
        </div>
      </div>
      <div>
        <h1 className="text-glitch font-serif text-3xl leading-none tracking-tight text-[var(--fg)] sm:text-[38px]">{content.name}</h1>
        <div className="mt-1 h-[20px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-mono text-[13px] text-[var(--muted)]"
            >
              {content.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div id="about">
      <SectionHeader title="About" />
      <Frame className="space-y-4 px-6 py-7 sm:px-8">
        <Profile />
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

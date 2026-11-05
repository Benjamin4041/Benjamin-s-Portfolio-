import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import content from "../data/content.json";
import { useViewCount } from "../lib/useViewCount.js";
import Globe from "./Globe.jsx";
import { Frame } from "./Layout.jsx";

export default function Hero({ onOpenPalette }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const views = useViewCount();

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((i) => (i + 1) % content.roles.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="neon-sign pointer-events-none absolute left-[calc(50%-640px)] top-[540px] z-20 hidden whitespace-nowrap font-sans text-3xl font-black tracking-widest 2xl:block"
      >
        HIRE ME
      </div>
      <Frame>
        <Globe />
      </Frame>
      <Frame className="px-6 py-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row">
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
              {views !== null && (
                <p className="mt-1 flex items-center justify-center gap-1 font-mono text-[11px] text-[var(--soft)] sm:justify-start">
                  <Eye size={12} className="shrink-0" />
                  {views.toLocaleString()} views
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenPalette}
            data-cursor-label="open command palette"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] shadow-sm transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
          >
            <Search size={14} />
            <span>⌘K</span>
          </button>
        </motion.div>
      </Frame>
    </div>
  );
}

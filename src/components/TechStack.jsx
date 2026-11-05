import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

const TABS = ["All", ...Object.keys(content.skillCategories)];

export default function TechStack() {
  const [tab, setTab] = useState("All");
  const skills = tab === "All" ? content.skills : content.skills.filter((skill) => content.skillCategories[tab].includes(skill));

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={<span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">( select tab to filter )</span>}
      />
      <Frame className="px-6 py-6 sm:px-8">
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTab(name)}
              aria-pressed={tab === name}
              className="relative cursor-pointer rounded-md px-3 py-1.5 text-[12px] font-medium"
            >
              {tab === name && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 rounded-md bg-[var(--fg)] shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${tab === name ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                {name}
              </span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-6 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                className="flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--soft)] hover:text-[var(--fg)]"
              >
                <Icon icon={content.skillIcons[skill] || "lucide:code-2"} width={16} height={16} className="size-4" />
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </Frame>
    </div>
  );
}

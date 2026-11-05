import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

export default function Experience() {
  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Frame>
        {content.experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${i > 0 ? "border-t border-[var(--line)]" : ""}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="flex items-center gap-2 text-[15.5px] font-semibold text-[var(--fg)]">
                {job.role}
                <span className="text-[var(--soft)]">·</span>
                <span className="text-[var(--muted)]">{job.company}</span>
                <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${job.company}`}>
                  <ExternalLink size={14} className="text-[var(--soft)] hover:text-[var(--fg)]" />
                </a>
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[var(--muted)]">{job.blurb}</p>
          </motion.div>
        ))}
      </Frame>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe2, Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

const CATEGORIES = ["All", "Frontend", "Backend", "Fullstack"];

function ProjectCard({ project, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      data-cursor-label="view details"
      className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md"
    >
      <div>
        <div className="relative mb-4 flex h-48 w-full flex-col justify-between overflow-hidden rounded-lg border border-[var(--line)] bg-gradient-to-br from-[var(--chip)] via-[var(--card)] to-[var(--bg)] p-3">
          <div className="bg-stripes pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative z-20 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
            {project.featured && (
              <span className="rounded border border-amber-500/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-500">
                Featured
              </span>
            )}
          </div>
          {project.image && !imageFailed ? (
            <div className="pointer-events-none absolute -bottom-3 -right-6 h-32 w-56 overflow-hidden rounded-lg border-4 border-[var(--bg)]/40 shadow-xl transition-all duration-300 group-hover:-bottom-1 group-hover:-right-4 sm:-bottom-5 sm:-right-12 sm:h-40 sm:w-72 sm:group-hover:-bottom-2 sm:group-hover:-right-9">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="self-end font-serif text-2xl text-[var(--fg)] opacity-90">{project.title}</div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)]">{project.title}</h3>
          <span className="font-mono text-xs text-[var(--soft)]">{project.year}</span>
        </div>
        <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-[var(--muted)]">{project.blurb}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 text-[var(--soft)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
          >
            <Globe2 className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <motion.button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-[10000] flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--line)] px-5 py-4 sm:px-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Project / {project.year}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-[var(--line)] text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)]"
          >
            <X className="size-4" />
          </button>
        </div>
        <div data-lenis-prevent className="min-h-0 overflow-y-auto overscroll-contain">
          {project.image && (
            <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-[var(--line)] bg-[var(--chip)]">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {project.categories?.map((category) => (
                <span key={category} className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {category}
                </span>
              ))}
            </div>
            <h2 id="project-modal-title" className="text-3xl font-medium tracking-[-0.035em] text-[var(--fg)] sm:text-4xl">
              {project.title}
            </h2>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-[var(--muted)]">
              {project.story.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]">
                  {tech}
                </span>
              ))}
            </div>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-4 py-2 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Visit live site
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects({ searchable = false, limit }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState(() => (searchable && params.get("q")) || "");
  const [openProject, setOpenProject] = useState(null);

  const projects = useMemo(() => {
    const term = search.toLowerCase();
    const filtered = content.projects.filter((project) => {
      if (category !== "All" && !project.categories?.includes(category)) return false;
      if (!searchable || !term) return true;
      return (
        project.title.toLowerCase().includes(term) ||
        project.blurb.toLowerCase().includes(term) ||
        project.stack.some((tech) => tech.toLowerCase().includes(term))
      );
    });
    return limit ? filtered.slice(0, limit) : filtered;
  }, [category, search, searchable, limit]);

  return (
    <div id="projects">
      <SectionHeader title="Projects" />
      <Frame className="px-6 py-6 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          {searchable ? (
            <label className="flex w-full items-center gap-2.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-2 sm:max-w-xs">
              <Search className="size-4 shrink-0 text-[var(--soft)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-full bg-transparent text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--soft)]"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="cursor-pointer text-[var(--soft)] hover:text-[var(--fg)]">
                  <X className="size-3.5" />
                </button>
              )}
            </label>
          ) : (
            <span />
          )}
          <div className="flex w-fit gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
                className={`cursor-pointer rounded-md px-3 py-1 text-[11.5px] font-medium transition-colors ${
                  category === name ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} onOpen={setOpenProject} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-[13px] text-[var(--soft)]">No projects match that search.</p>
        )}

        {limit && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-5 py-2.5 text-[12px] font-medium text-[var(--fg)] transition-all duration-200 hover:bg-[var(--hover)]"
            >
              View All Projects
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </Frame>
      {createPortal(
        <AnimatePresence>{openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}</AnimatePresence>,
        document.body
      )}
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import content from "../data/content.json";
import { useTheme } from "../lib/theme.jsx";
import { NAV_LINKS } from "./Navbar.jsx";

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");
  const commands = useMemo(
    () => [
      ...NAV_LINKS.map(({ label, path }) => ({ label: `Go to ${label}`, run: () => navigate(path) })),
      { label: "Toggle theme", run: toggleTheme },
      { label: "Open GitHub", run: () => openExternal(content.socials.github) },
      { label: "Open LinkedIn", run: () => openExternal(content.socials.linkedin) },
      { label: "Open X", run: () => openExternal(content.socials.twitter) },
      { label: "Open Instagram", run: () => openExternal(content.socials.instagram) },
      { label: "Download resume", run: () => openExternal(content.socials.resume) },
      { label: "Send an email", run: () => (window.location.href = content.socials.email) },
    ],
    [navigate, toggleTheme]
  );

  const matches = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const run = (command) => {
    onClose();
    command.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, matches.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && matches[selected]) run(matches[selected]);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-[15vh]" data-lenis-prevent>
          <motion.button
            type="button"
            aria-label="Close command palette"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-4 py-3">
              <Search size={15} className="text-[var(--soft)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command..."
                aria-label="Search commands"
                className="w-full bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--soft)]"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto p-1.5">
              {matches.map((command, i) => (
                <li key={command.label}>
                  <button
                    type="button"
                    onClick={() => run(command)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full cursor-pointer rounded-md px-3 py-2 text-left text-[13px] ${
                      i === selected ? "bg-[var(--hover)] text-[var(--fg)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {command.label}
                  </button>
                </li>
              ))}
              {matches.length === 0 && <li className="px-3 py-6 text-center text-[13px] text-[var(--soft)]">No matching commands</li>}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

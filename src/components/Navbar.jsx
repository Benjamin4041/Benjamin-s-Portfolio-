import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import content from "../data/content.json";
import { useTheme } from "../lib/theme.jsx";
import { Frame } from "./Layout.jsx";

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

const ICON_BUTTON =
  "grid size-[28px] cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--fg)]";

export default function Navbar({ onOpenPalette }) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 mx-auto bg-[var(--bg)]/90 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "mt-2 w-[763px] max-w-[calc(100%-24px)] border border-[var(--line)] shadow-2xl"
          : "w-full border-b border-[var(--line)]"
      }`}
    >
      <Frame className="flex items-center justify-between px-6 py-4 sm:px-8">
        <Link to="/" className="font-serif text-xl tracking-wide text-[var(--fg)] transition-opacity hover:opacity-80">
          {content.firstName}
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 text-[13px] text-[var(--muted)] sm:flex">
            {NAV_LINKS.map(({ label, path }) => {
              const current = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  aria-current={current ? "page" : undefined}
                  className={`group relative transition-colors hover:text-[var(--fg)] ${current ? "font-semibold text-[var(--fg)]" : ""}`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-300 group-hover:scale-x-100 ${
                      current ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2.5">
            <button type="button" onClick={onOpenPalette} aria-label="Open command palette" className={ICON_BUTTON}>
              <Search size={14} />
            </button>
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className={ICON_BUTTON}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className={`${ICON_BUTTON} sm:hidden`}
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </Frame>
      {menuOpen && (
        <nav className="border-t border-[var(--line)] px-6 py-3 sm:hidden">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block py-2 text-sm ${pathname === path ? "font-semibold text-[var(--fg)]" : "text-[var(--muted)]"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

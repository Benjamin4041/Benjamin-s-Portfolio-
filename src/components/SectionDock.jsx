import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Briefcase, FolderOpen, Heart, Mail, MessageSquareQuote, User, Wrench } from "lucide-react";

const SECTIONS = [
  { id: "projects", label: "Projects", Icon: FolderOpen },
  { id: "about", label: "About", Icon: User },
  { id: "contact", label: "Contact", Icon: Mail },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "skills", label: "Tech Stack", Icon: Wrench },
  { id: "why", label: "Why work with me", Icon: Heart },
  { id: "testimonials", label: "Testimonials", Icon: MessageSquareQuote },
];

export default function SectionDock() {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return undefined;
    const onScroll = () => {
      const line = window.scrollY + 180;
      const section = SECTIONS.find(({ id }) => {
        const el = document.getElementById(id);
        return el && line >= el.offsetTop && line < el.offsetTop + el.offsetHeight;
      });
      setCurrent(section ? section.id : "");
      const projects = document.getElementById("projects");
      setVisible(Boolean(projects) && line >= projects.offsetTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <aside className={`group fixed left-[calc(50%+400px)] top-[24vh] z-30 hidden w-10 transition-[width,opacity] duration-300 ease-out hover:w-[170px] xl:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}>
      <div className="mb-2 h-6 overflow-hidden whitespace-nowrap px-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          On this page
        </span>
      </div>
      <nav aria-label="On this page" className="flex flex-col gap-1">
        {SECTIONS.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={current === id ? "true" : undefined}
            className={`flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)] ${
              current === id ? "text-[var(--fg)]" : "text-[var(--soft)]"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

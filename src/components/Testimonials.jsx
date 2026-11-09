import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

export default function Testimonials() {
  return (
    <div id="testimonials">
      <SectionHeader title="Testimonials" />
      <Frame className="space-y-4 px-6 py-7 sm:px-8">
        {content.testimonials.filter((t) => !t.pending).map(({ name, role, quote }) => (
          <figure key={name} className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
            <blockquote className="text-[14.5px] leading-relaxed text-[var(--muted)]">{quote}</blockquote>
            <figcaption className="mt-3 font-mono text-[11px] text-[var(--soft)]">
              {name} · {role}
            </figcaption>
          </figure>
        ))}
      </Frame>
    </div>
  );
}

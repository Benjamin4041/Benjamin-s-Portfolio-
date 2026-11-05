import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

export default function WhyWorkWithMe() {
  return (
    <div id="why">
      <SectionHeader title="Why work with me" />
      <Frame className="space-y-4 px-6 py-7 sm:px-8">
        {content.why.map(({ title, text }) => (
          <div key={title} className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
            <h3 className="text-[15px] font-semibold text-[var(--fg)]">{title}</h3>
            <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--muted)]">{text}</p>
          </div>
        ))}
      </Frame>
    </div>
  );
}

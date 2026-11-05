import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import content from "../data/content.json";
import { Frame, SectionHeader } from "./Layout.jsx";

const LEVEL_OPACITY = [0.07, 0.25, 0.45, 0.7, 1];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const EMPTY_GRAPH = { cells: Array(371).fill(0), total: 0, live: false };

function useContributions(username) {
  const [graph, setGraph] = useState(EMPTY_GRAPH);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then((data) => {
        const days = data?.contributions ?? [];
        if (cancelled || days.length === 0) return;
        const leadingBlanks = new Date(days[0].date).getDay();
        setGraph({
          cells: [...Array(leadingBlanks).fill(null), ...days.map((day) => day.level)],
          total: data?.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0),
          live: true,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [username]);

  return graph;
}

export default function GitHubActivity() {
  const { username } = content.github;
  const graph = useContributions(username);
  const months = useMemo(() => {
    const now = new Date().getMonth();
    return Array.from({ length: 12 }, (_, i) => MONTHS[(now + 1 + i) % 12]);
  }, []);

  return (
    <div id="github">
      <SectionHeader
        title="GitHub Activity"
        aside={
          <a
            href={content.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            @{username}
            <ExternalLink size={12} />
          </a>
        }
      />
      <Frame className="px-6 py-6 sm:px-8">
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[640px]">
            <div className="mb-1.5 flex justify-between pr-8 font-mono text-[10px] text-[var(--soft)]">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {graph.cells.map((level, i) =>
                level === null ? (
                  <span key={i} className="size-[10px]" />
                ) : (
                  <span
                    key={i}
                    className="size-[10px] rounded-[2px] bg-[var(--fg)] transition-transform duration-150 hover:scale-125"
                    style={{ opacity: LEVEL_OPACITY[level] }}
                  />
                )
              )}
            </div>
            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
              <span>{graph.live ? `${graph.total} contributions in the last year` : "Contribution data unavailable"}</span>
              <span className="flex items-center gap-1.5">
                Less
                {LEVEL_OPACITY.map((opacity) => (
                  <span key={opacity} className="size-[10px] rounded-[2px] bg-[var(--fg)]" style={{ opacity }} />
                ))}
                More
              </span>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}

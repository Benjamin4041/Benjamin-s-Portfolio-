import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./Preloader.css";

const DURATION_MS = 3600;
const TEXT_REVEAL_PROGRESS = 90; // Labels give way to real text from here.
const LAST_BOX_PROGRESS = 76; // Every box has been drawn by here.
const WIPE_DELAY_MS = 350;
const WIPE_MS = 1100;
const MAX_ELEMENTS = 70;
const MAX_WIDTH_RATIO = 0.9;
const RESCAN_TIMES_MS = [250, 700, 1300, 2000, 2800];
const SKIPPED_TAGS = ["SCRIPT", "STYLE", "NOSCRIPT", "LINK", "META", "PATH", "DEFS"];
const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
const BACKGROUND = "#0a0a0a";

const textStyleOf = (style) => ({
  fontFamily: style.fontFamily,
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
  fontStyle: style.fontStyle,
  lineHeight: style.lineHeight,
  letterSpacing: style.letterSpacing,
  textAlign: style.textAlign,
});

const paddingOf = (style) => ({
  l: parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth),
  t: parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth),
  r: parseFloat(style.paddingRight) + parseFloat(style.borderRightWidth),
});

// Walks the rendered page and returns a blueprint box for each visible element.
function scanPage() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const items = [];
  const counts = { copy: 0, nav: 0, btn: 0 };
  const pad = (n) => String(n).padStart(2, "0");

  const visit = (el) => {
    if (items.length >= MAX_ELEMENTS || el.classList?.contains("pl-root")) return;
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) return;
    if (SKIPPED_TAGS.includes(el.tagName.toUpperCase())) return;

    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 0.05) return;

    const rect = el.getBoundingClientRect();
    const box = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };
    const sized = rect.width >= 2 && rect.height >= 2;
    if (sized && (rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw)) return;

    const tag = el.tagName.toLowerCase();
    if (sized && (tag === "canvas" || tag === "svg") && rect.width > vw * MAX_WIDTH_RATIO) return;

    if (sized && (tag === "img" || tag === "video" || tag === "canvas")) {
      const label = rect.width > rect.height * 2.2 && rect.width > 300 ? "BANNER" : rect.width >= 60 ? "AVATAR" : "ICON";
      items.push({ ...box, kind: "media", label, radius: style.borderRadius });
      return;
    }
    if (sized && tag === "svg") {
      if (rect.width >= 10) items.push({ ...box, kind: "media", label: "ICON", radius: "4px" });
      return;
    }

    const isButton = tag === "button" || el.getAttribute("role") === "button";
    const isTextLink = tag === "a" && !el.querySelector("img") && rect.height < 90;
    if (sized && (isButton || isTextLink) && rect.height < 100) {
      const text = el.innerText?.trim();
      const framed = parseFloat(style.borderTopWidth) > 0 || style.backgroundColor !== "rgba(0, 0, 0, 0)";
      const plainLink = isTextLink && !framed;
      const label = !text ? "ICON" : plainLink ? `NAV ${pad(++counts.nav)}` : `BTN ${pad(++counts.btn)}`;
      items.push({ ...box, kind: plainLink ? "text" : "btn", label, text, textStyle: textStyleOf(style), radius: style.borderRadius, pad: paddingOf(style) });
      return;
    }

    if (
      sized &&
      rect.height >= 50 &&
      rect.height <= 360 &&
      !el.querySelector("img") &&
      parseFloat(style.borderTopWidth) > 0 &&
      style.borderTopStyle !== "none" &&
      parseFloat(style.borderTopLeftRadius) >= 8
    ) {
      items.push({ ...box, kind: "card", label: "CARD", radius: style.borderRadius });
    }

    let ownText = "";
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) ownText += node.textContent ?? "";
    });
    if (sized && ownText.trim().length > 0 && el instanceof HTMLElement) {
      const isHeading = /^h[1-6]$/.test(tag);
      const label = tag === "h1" ? "TITLE" : isHeading ? `H${tag[1]}` : `COPY ${pad(++counts.copy)}`;
      items.push({ ...box, kind: "text", label, text: el.innerText.trim(), textStyle: textStyleOf(style), pad: paddingOf(style) });
      return;
    }

    Array.from(el.children).forEach(visit);
  };
  visit(document.body);

  // Keep very wide elements inside the page column.
  const maxWidth = vw * MAX_WIDTH_RATIO;
  items.forEach((item) => {
    if (item.w > maxWidth) {
      const center = item.x + item.w / 2;
      item.w = maxWidth;
      item.x = Math.min(Math.max(center - maxWidth / 2, (vw - maxWidth) / 2), vw - (vw - maxWidth) / 2 - maxWidth);
    }
  });

  // Line wide boxes up on one right edge, as on a drawing sheet.
  const paragraphs = items.filter((item) => item.kind === "text" && item.w >= 300);
  if (paragraphs.length) {
    const rightEdge = Math.max(...paragraphs.map((item) => item.x + item.w));
    items.forEach((item) => {
      const wide = item.w >= 160 && (item.kind !== "text" || item.h >= 40);
      if (wide && rightEdge - (item.x + item.w) > 8 && item.x < rightEdge) item.boxW = rightEdge - item.x;
    });
  }

  return items.sort((a, b) => a.y - b.y || a.x - b.x);
}

const skipPreloader = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Preloader({ onDone }) {
  const skip = useMemo(skipPreloader, []);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(skip ? "done" : "load");
  const [items, setItems] = useState([]);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const textShowing = useRef(false);
  const releaseScroll = useRef(() => {});

  useEffect(() => {
    textShowing.current = progress >= TEXT_REVEAL_PROGRESS - 4;
  }, [progress]);

  // The page keeps settling while loading, so rescan until the text takes over.
  useEffect(() => {
    if (skip) return undefined;
    const rescan = () => {
      if (!textShowing.current) setItems(scanPage());
    };
    const timers = RESCAN_TIMES_MS.map((ms) => window.setTimeout(rescan, ms));
    window.addEventListener("resize", rescan);
    window.addEventListener("load", rescan);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", rescan);
      window.removeEventListener("load", rescan);
    };
  }, [skip]);

  // Hide the scrollbar and hold the page at the top until the wipe finishes.
  useLayoutEffect(() => {
    if (skip) return undefined;
    const scrollbarStyle = document.createElement("style");
    scrollbarStyle.textContent = `html{scrollbar-color:${BACKGROUND} ${BACKGROUND} !important}html::-webkit-scrollbar-thumb,html::-webkit-scrollbar-track,html::-webkit-scrollbar-corner,body::-webkit-scrollbar-thumb,body::-webkit-scrollbar-track,body::-webkit-scrollbar-corner{background:${BACKGROUND} !important;border-color:${BACKGROUND} !important;box-shadow:none !important}`;
    document.head.appendChild(scrollbarStyle);
    const holdAtTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", holdAtTop);
    releaseScroll.current = () => {
      scrollbarStyle.remove();
      window.removeEventListener("scroll", holdAtTop);
      releaseScroll.current = () => {};
    };
    return () => releaseScroll.current();
  }, [skip]);

  useEffect(() => {
    if (skip) {
      onDoneRef.current?.();
      return undefined;
    }
    const block = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const blockKeys = (e) => {
      if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false, capture: true });
    window.addEventListener("touchmove", block, { passive: false, capture: true });
    window.addEventListener("keydown", blockKeys, true);

    let raf = 0;
    let wipeTimer = 0;
    let shown = -1;
    let loaded = document.readyState === "complete";
    const markLoaded = () => {
      loaded = true;
    };
    window.addEventListener("load", markLoaded);

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      let eased = (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) * 100;
      // Wait at 92% if the page is slower than the animation.
      if (!loaded) eased = Math.min(eased, 92);
      const value = Math.min(Math.floor(eased + (t >= 1 && loaded ? 1 : 0)), 100);
      if (value !== shown) {
        shown = value;
        setProgress(value);
      }
      if (value >= 100) {
        wipeTimer = window.setTimeout(() => setPhase("wipe"), WIPE_DELAY_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(wipeTimer);
      window.removeEventListener("load", markLoaded);
      window.removeEventListener("wheel", block, true);
      window.removeEventListener("touchmove", block, true);
      window.removeEventListener("keydown", blockKeys, true);
    };
  }, [skip]);

  useEffect(() => {
    if (phase !== "wipe") return undefined;
    const timer = setTimeout(() => {
      releaseScroll.current();
      setPhase("done");
      onDoneRef.current?.();
    }, WIPE_MS + 150);
    return () => clearTimeout(timer);
  }, [phase]);

  const column = useMemo(() => {
    if (!items.length) return null;
    const widest = items.reduce((a, b) => (b.w > a.w ? b : a), items[0]);
    return { left: widest.x, right: widest.x + widest.w };
  }, [items]);

  if (phase === "done") return null;

  const lastIndex = Math.max(items.length - 1, 1);

  return (
    <div
      className={`pl-root ${phase === "wipe" ? "pl-wipe" : ""} ${progress >= TEXT_REVEAL_PROGRESS ? "pl-text" : ""}`}
      style={{ "--pl-bg": BACKGROUND, "--pl-ink": "#ffffff" }}
      aria-hidden="true"
    >
      <div className="pl-sheet">
        {column && (
          <>
            <div className="pl-guide-v" style={{ left: column.left }} />
            <div className="pl-guide-v" style={{ left: column.right }} />
          </>
        )}
        <span className="pl-note" style={{ left: 18 }}>
          sheet 01 · benjamin · setting out
        </span>
        <span className="pl-note" style={{ right: 18 }}>
          issue 01 · {Math.round(column ? column.right - column.left : 0)}px column
        </span>
        {items.map((item, i) => {
          const on = progress >= 4 + (i / lastIndex) * (LAST_BOX_PROGRESS - 4);
          const padding = item.pad ?? { l: 0, t: 0, r: 0 };
          return (
            <div key={`${i}-${item.label}`}>
              <div
                className={`pl-box ${item.kind} ${on ? "on" : ""}`}
                style={{ left: item.x, top: item.y, width: item.boxW ?? item.w, height: item.h, "--r": item.radius ?? "0px" }}
              >
                <div className="fill" />
                {item.kind === "media" && (
                  <svg className="cross" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0 0 L100 100 M100 0 L0 100" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                {item.w >= 56 && item.h >= 14 && <span className="pl-chip lab">{item.label}</span>}
                {item.text && (
                  <div
                    className={`ghost ${item.kind === "btn" ? "center" : ""}`}
                    style={{
                      ...item.textStyle,
                      left: padding.l,
                      top: padding.t,
                      width: item.w - padding.l - padding.r,
                      height: item.kind === "btn" ? item.h - padding.t * 2 : undefined,
                    }}
                  >
                    {item.text}
                  </div>
                )}
              </div>
              {item.kind === "text" && item.w >= 300 && item.h >= 20 && (
                <div className={`pl-dim ${on ? "on" : ""}`} style={{ left: item.x, top: item.y + item.h + 7, width: item.boxW ?? item.w }}>
                  <span className="pl-chip">{Math.round(item.boxW ?? item.w)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="pl-edge" />
    </div>
  );
}

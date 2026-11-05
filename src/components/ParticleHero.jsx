import { useEffect, useRef } from "react";

export default function ParticleHero({
  text = "Full Stack Dev",
  color,                      // dot colour; defaults to --fg, so it follows light/dark
  accent,                     // a few warm dots; defaults per theme, pass null for none
  font = '"Instrument Serif", Georgia, serif',
  topLeft = "<Benjamin />",
  bottomRight = "push the letters apart",
}) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current, cv = canvasRef.current, ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, P = [], mx = -1e4, my = -1e4, raf, visible = true;

    let rgb = "245,245,244", dot = "#f2b544";
    const toRgb = (c) => {
      ctx.fillStyle = "#000"; ctx.fillStyle = c; const v = ctx.fillStyle;
      if (v.startsWith("#")) return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).join(",");
      return v.replace(/rgba?\(|\)/g, "").split(",").slice(0, 3).map((s) => s.trim()).join(",");
    };
    const readTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      const fg = getComputedStyle(frame).getPropertyValue("--fg").trim() || (isLight ? "#18181b" : "#f5f5f4");
      rgb = toRgb(color || fg);
      dot = accent === null ? null : accent || (isLight ? "#b45309" : "#f2b544");
      if (reduce && W) step();
    };

    const build = () => {
      const r = frame.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement("canvas"); off.width = W; off.height = H;
      const o = off.getContext("2d");
      let fs = H * 0.42; o.font = `${fs}px ${font}`;
      fs *= Math.min(1, (W * 0.86) / o.measureText(text).width);
      o.font = `${fs}px ${font}`; o.textAlign = "center"; o.textBaseline = "middle"; o.fillStyle = "#fff";
      o.fillText(text, W / 2, H * 0.48);
      const gap = W < 500 ? 3 : 4, data = o.getImageData(0, 0, W, H).data, old = P; P = [];
      for (let y = 0; y < H; y += gap) for (let x = 0; x < W; x += gap) {
        if (data[(y * W + x) * 4 + 3] > 130) {
          const prev = old[P.length];
          P.push({ tx: x, ty: y, x: prev ? prev.x : Math.random() * W, y: prev ? prev.y : Math.random() * H,
                   vx: 0, vy: 0, a: Math.random() < 0.06 });
        }
      }
      if (reduce) P.forEach((p) => { p.x = p.tx; p.y = p.ty; });
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of P) {
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 8100) { const d = Math.sqrt(d2) || 1, f = ((90 - d) / 90) * 6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx += (p.tx - p.x) * 0.055; p.vy += (p.ty - p.y) * 0.055;
        p.vx *= 0.8; p.vy *= 0.8; p.x += p.vx; p.y += p.vy;
        const sp = Math.min(1, Math.abs(p.vx) + Math.abs(p.vy));
        ctx.fillStyle = p.a && dot ? dot : `rgba(${rgb},${0.55 + 0.45 * (1 - sp)})`;
        ctx.fillRect(p.x, p.y, 1.8, 1.8);
      }
    };

    const loop = () => { if (visible) step(); raf = requestAnimationFrame(loop); };
    const move = (e) => { const r = frame.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -1e4; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    const ro = new ResizeObserver(() => { build(); if (reduce) step(); });
    const mo = new MutationObserver(readTheme);

    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerleave", leave);
    io.observe(frame); ro.observe(frame);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    readTheme();
    build();
    document.fonts.ready.then(() => { build(); if (reduce) step(); });
    if (reduce) step(); else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect();
      frame.removeEventListener("pointermove", move); frame.removeEventListener("pointerleave", leave);
    };
  }, [text, color, accent, font]);

  const tag = { position: "absolute", zIndex: 2, font: '11px "JetBrains Mono", monospace', color: "var(--soft, #63636b)", pointerEvents: "none" };
  return (
    <div ref={frameRef} style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg, #0a0a0a)", transition: "background-color .3s", touchAction: "pan-y" }}>
      <canvas ref={canvasRef} role="img" aria-label={text} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      {topLeft && <span style={{ ...tag, top: 12, left: 14 }}>{topLeft}</span>}
      {bottomRight && <span style={{ ...tag, bottom: 12, right: 14 }}>{bottomRight}</span>}
    </div>
  );
}

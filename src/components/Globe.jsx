import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import globePoints from "../data/globePoints.json";
import { ORBITS, TECH } from "../data/globeTech.js";
import { fromAxis, multiply, normalize, toMatrix } from "../lib/quaternion.js";

const SPRITE_COLORS = ["79,140,255", "96,120,255", "139,92,246", "168,85,247"];
const ICON_SIZE = 42;
const PERSPECTIVE = 3.4;

function glowSprite(color) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  gradient.addColorStop(0, `rgba(${color},1)`);
  gradient.addColorStop(0.35, `rgba(${color},.75)`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);
  return canvas;
}

function buildLandPoints() {
  const sprites = SPRITE_COLORS.map(glowSprite);
  const points = [];
  for (let i = 0; i < globePoints.length; i += 2) {
    const lat = (globePoints[i] * Math.PI) / 180;
    const lon = (globePoints[i + 1] * Math.PI) / 180;
    const mix = (Math.sin(lon * 2.3 + lat * 3.1) + Math.sin(lat * 5.2 - lon * 1.4) + 2) / 4;
    points.push({
      x: Math.cos(lat) * Math.sin(lon),
      y: Math.sin(lat),
      z: Math.cos(lat) * Math.cos(lon),
      sprite: sprites[Math.min(3, Math.floor(mix * 4))],
    });
  }
  return points;
}

function buildRings() {
  return ORBITS.map((orbit) => {
    const cx = Math.cos(orbit.tiltX);
    const sx = Math.sin(orbit.tiltX);
    const cz = Math.cos(orbit.tiltZ);
    const sz = Math.sin(orbit.tiltZ);
    return {
      ...orbit,
      angle: 0,
      rate: 1,
      place: (a) => {
        const px = orbit.radius * Math.cos(a);
        const pz = orbit.radius * Math.sin(a);
        const y = -pz * sx;
        return [px * cz - y * sz, px * sz + y * cz, pz * cx];
      },
    };
  });
}

function buildNodes() {
  const placed = ORBITS.map(() => 0);
  return TECH.map((tech, i) => {
    const count = TECH.filter((t) => t.orbit === tech.orbit).length;
    const slot = placed[tech.orbit]++;
    return { orbit: tech.orbit, offset: (slot / count) * Math.PI * 2 + tech.orbit * 0.7, phase: i * 1.7, scale: 1 };
  });
}

export default function Globe() {
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const buttonRefs = useRef([]);
  const positions = useRef(TECH.map(() => ({ x: 0, y: 0 })));
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);

  // The animation loop reads these without restarting when they change.
  const selection = useRef({ hovered: null, active: null });
  selection.current = { hovered, active };

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = buildLandPoints();
    const rings = buildRings();
    const nodes = buildNodes();

    let rotation = normalize(multiply(fromAxis(1, 0, 0, 0.32), fromAxis(0, 1, 0, -0.35)));
    let width = 0;
    let height = 0;
    let radius = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let mouseX = 0;
    let mouseY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let driftX = 0;
    let driftY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const drag = { id: null, x: 0, y: 0, moved: 0 };

    const rotateByDrag = (dx, dy) => {
      rotation = normalize(multiply(multiply(fromAxis(1, 0, 0, dy), fromAxis(0, 1, 0, dx)), rotation));
    };

    const resize = () => {
      const box = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      radius = Math.min(width * 0.27, height * 0.3);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(stage);

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || !width) return;

      const { hovered: hov, active: act } = selection.current;
      if (drag.id !== null) {
        velocityX *= 0.8;
        velocityY *= 0.8;
      } else {
        if (Math.abs(velocityX) + Math.abs(velocityY) > 1e-4) {
          rotateByDrag(velocityX, velocityY);
          velocityX *= 0.94;
          velocityY *= 0.94;
        }
        if (!still) rotation = normalize(multiply(rotation, fromAxis(0, 1, 0, dt * 0.14)));
      }

      tiltX += (mouseY * 0.14 - tiltX) * 0.06;
      tiltY += (mouseX * 0.2 - tiltY) * 0.06;
      driftX += (mouseX * 10 - driftX) * 0.06;
      driftY += (mouseY * 7 - driftY) * 0.06;

      const m = toMatrix(rotation);
      const t = toMatrix(multiply(fromAxis(1, 0, 0, tiltX), fromAxis(0, 1, 0, tiltY)));
      const cx = width / 2 + driftX;
      const cy = height / 2 + driftY;
      const project = (x, y, z) => {
        const X = t[0] * x + t[1] * y + t[2] * z;
        const Y = t[3] * x + t[4] * y + t[5] * z;
        const Z = t[6] * x + t[7] * y + t[8] * z;
        const s = PERSPECTIVE / (PERSPECTIVE - Z);
        return [cx + X * radius * s, cy - Y * radius * s, Z, s];
      };

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.72, cx, cy, radius * 1.5);
      halo.addColorStop(0, "rgba(88,92,255,.34)");
      halo.addColorStop(0.45, "rgba(124,70,240,.12)");
      halo.addColorStop(1, "rgba(124,70,240,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      const strokeRing = (ring, front) => {
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= 128; i++) {
          const [a, b, c] = ring.place((i / 128) * Math.PI * 2);
          const [X, Y, Z] = project(a, b, c);
          if (Z >= 0 === front) {
            if (pen) ctx.lineTo(X, Y);
            else ctx.moveTo(X, Y);
            pen = true;
          } else {
            pen = false;
          }
        }
        ctx.strokeStyle = `rgba(${ring.color},${front ? 0.16 : 0.07})`;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.strokeStyle = `rgba(${ring.color},${front ? 0.75 : 0.28})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      ctx.globalCompositeOperation = "lighter";
      rings.forEach((ring) => strokeRing(ring, false));

      const drawn = points.map((p) => {
        const x = m[0] * p.x + m[1] * p.y + m[2] * p.z;
        const y = m[3] * p.x + m[4] * p.y + m[5] * p.z;
        const z = m[6] * p.x + m[7] * p.y + m[8] * p.z;
        return [project(x, y, z), p.sprite];
      });
      const size = Math.max(2.4, radius * 0.03);

      ctx.globalAlpha = 0.16;
      for (const [[X, Y, Z], sprite] of drawn) {
        if (Z < 0) ctx.drawImage(sprite, X - size / 2, Y - size / 2, size, size);
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const disc = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
      disc.addColorStop(0, "rgba(24,24,62,.82)");
      disc.addColorStop(1, "rgba(8,8,26,.88)");
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,130,255,.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.globalCompositeOperation = "lighter";
      for (const [[X, Y, Z, s], sprite] of drawn) {
        if (Z >= 0) {
          ctx.globalAlpha = 0.45 + 0.55 * Z;
          const d = size * s * 1.25;
          ctx.drawImage(sprite, X - d / 2, Y - d / 2, d, d);
        }
      }
      ctx.globalAlpha = 1;
      rings.forEach((ring) => strokeRing(ring, true));
      ctx.globalCompositeOperation = "source-over";

      // The selected icon's whole orbit eases to a stop so it stays easy to read and click.
      const pausedOrbit = hov !== null ? TECH[hov].orbit : act !== null ? TECH[act].orbit : null;
      rings.forEach((ring, i) => {
        ring.rate += ((pausedOrbit === i ? 0 : 1) - ring.rate) * 0.1;
        if (!still) ring.angle += ring.speed * ring.rate * dt;
      });

      const baseScale = width < 480 ? 0.84 : 1;
      nodes.forEach((node, i) => {
        const ring = rings[node.orbit];
        const [a, b, c] = ring.place(ring.angle + node.offset);
        const [X, projectedY, Z, s] = project(a, b, c);
        const Y = projectedY + (still ? 0 : Math.sin(now / 900 + node.phase) * 4);
        const emphasis = hov === i || act === i ? 1.24 : 1;
        node.scale += (emphasis * baseScale * (1 + (s - 1) * 0.3) - node.scale) * 0.16;

        // Without motion an icon behind the globe would never come back, so only hide it when moving.
        const hidden = !still && hov !== i && act !== i && Z < 0 && Math.hypot(X - cx, Y - cy) < radius * 0.98;
        positions.current[i] = { x: X, y: Y };
        const button = buttonRefs.current[i];
        if (button) {
          button.style.transform = `translate3d(${X - ICON_SIZE / 2}px,${Y - ICON_SIZE / 2}px,0) scale(${node.scale})`;
          button.style.opacity = hidden ? "0.14" : Z < 0 ? "0.72" : "1";
          button.style.pointerEvents = hidden ? "none" : "auto";
          button.style.zIndex = Z < 0 ? "1" : "3";
        }
      });

      if (tipRef.current && hov !== null) {
        const p = positions.current[hov];
        const half = Math.min(tipRef.current.offsetWidth, width) / 2 + 8;
        const below = p.y < 92;
        tipRef.current.style.left = `${Math.max(half, Math.min(width - half, p.x))}px`;
        tipRef.current.style.top = `${below ? p.y + 34 : p.y - 34}px`;
        tipRef.current.style.transform = `translate(-50%,${below ? "0" : "-100%"})`;
      }
    };
    raf = requestAnimationFrame(frame);

    const onPointerDown = (e) => {
      if (e.target.closest("button,a,[data-globe-card]")) return;
      drag.id = e.pointerId;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved = 0;
      velocityX = velocityY = 0;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = "grabbing";
    };
    const onPointerMove = (e) => {
      if (e.pointerType === "mouse") {
        const box = stage.getBoundingClientRect();
        mouseX = ((e.clientX - box.left) / box.width) * 2 - 1;
        mouseY = ((e.clientY - box.top) / box.height) * 2 - 1;
      }
      if (e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      velocityX = dx * 0.006;
      velocityY = dy * 0.006;
      rotateByDrag(velocityX, velocityY);
    };
    const onPointerUp = (e) => {
      if (e.pointerId !== drag.id) return;
      drag.id = null;
      stage.style.cursor = "grab";
      if (drag.moved < 5) setActive(null);
    };
    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      const button = buttonRefs.current[active];
      setActive(null);
      button?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const card = active !== null ? TECH[active] : null;
  const tip = hovered !== null && active === null ? TECH[hovered] : null;
  const ctaClass = "mt-3 inline-flex cursor-pointer items-center gap-1.5 text-left text-xs font-semibold text-indigo-200 hover:text-white";

  return (
    <div
      ref={stageRef}
      data-cursor-label="drag to rotate"
      className="relative cursor-grab touch-pan-y select-none overflow-hidden"
      style={{
        height: "clamp(360px,52vw,460px)",
        background: "radial-gradient(ellipse at 50% 50%,#12123a 0%,#08081c 55%,#04040e 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Rotating globe of glowing particles, with Benjamin's technologies orbiting it"
        className="absolute inset-0 block"
      />

      {TECH.map((tech, i) => (
        <button
          key={tech.name}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          type="button"
          aria-label={`${tech.name}: ${tech.tip}`}
          aria-expanded={active === i}
          data-cursor-label="click for details"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered((h) => (h === i ? null : h))}
          onFocus={(e) => e.target.matches(":focus-visible") && setHovered(i)}
          onBlur={() => setHovered((h) => (h === i ? null : h))}
          onClick={() => setActive((a) => (a === i ? null : i))}
          className="absolute left-0 top-0 flex cursor-pointer items-center justify-center rounded-full border border-white/75 bg-[#f4f5fb] p-0 transition-opacity duration-200"
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            willChange: "transform",
            boxShadow: `0 0 18px rgba(${ORBITS[tech.orbit].color},.75)`,
          }}
        >
          <Icon icon={tech.icon} width={23} height={23} />
        </button>
      ))}

      {tip && (
        <div
          ref={tipRef}
          role="tooltip"
          className="pointer-events-none absolute z-[5] max-w-[240px] rounded-lg border border-white/15 bg-[#0a0a1c]/95 px-3 py-2 text-center"
          style={{
            left: positions.current[hovered].x,
            top: positions.current[hovered].y - 34,
            transform: "translate(-50%,-100%)",
          }}
        >
          <div className="text-xs font-semibold text-white">{tip.name}</div>
          <div className="mt-0.5 text-[11px] leading-snug text-white/70">{tip.tip}</div>
        </div>
      )}

      {!card && (
        <div className="pointer-events-none absolute bottom-3 left-3.5 z-[2] font-mono text-[10px] tracking-wider text-white/45">
          Drag to rotate · Select an icon
        </div>
      )}

      <AnimatePresence>
        {card && (
          <motion.div
            key={card.name}
            data-globe-card=""
            data-cursor-label={card.name}
            role="dialog"
            aria-label={`${card.name} details`}
            initial={{ opacity: 0, y: 16, scale: 0.94, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.96, x: "-50%" }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="absolute bottom-3.5 left-1/2 z-[6] w-[min(340px,calc(100%-24px))] cursor-default select-text rounded-[14px] border border-white/15 bg-[#0a0a1c] px-4 py-3.5 text-white shadow-[0_12px_40px_rgba(0,0,0,.5)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-[30px] flex-none items-center justify-center rounded-lg bg-[#f4f5fb]">
                <Icon icon={card.icon} width={18} height={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-tight">{card.name}</div>
                <div className="mt-0.5 font-mono text-[10px] text-white/55">{card.label}</div>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setActive(null)}
                className="flex cursor-pointer p-1 text-white/60 hover:text-white"
              >
                <Icon icon="lucide:x" width={16} height={16} />
              </button>
            </div>
            <p className="mt-2.5 text-[12.5px] leading-normal text-white/75">{card.text}</p>
            {card.to ? (
              <button type="button" onClick={() => navigate(card.to)} className={ctaClass}>
                {card.cta}
                <Icon icon="lucide:arrow-up-right" width={14} height={14} />
              </button>
            ) : (
              <a href={card.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                {card.cta}
                <Icon icon="lucide:arrow-up-right" width={14} height={14} />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

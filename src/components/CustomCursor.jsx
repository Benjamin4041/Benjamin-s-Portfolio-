import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DEFAULT_LABEL = "YOU";
const SPRING = { stiffness: 500, damping: 35, mass: 0.4 };

// A label that follows the mouse. Any element can set its text with data-cursor-label.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(DEFAULT_LABEL);
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (e) => {
      rawX.set(e.clientX + 14);
      rawY.set(e.clientY + 18);
      const target = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-cursor-label]");
      setLabel(target?.getAttribute("data-cursor-label") || DEFAULT_LABEL);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-md bg-white px-2.5 py-1 font-mono text-xs font-medium text-black shadow-md"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
      aria-hidden="true"
    >
      {label}
    </motion.div>
  );
}

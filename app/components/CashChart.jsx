"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LINE = "M0 78 C 40 70, 78 84, 120 58 S 190 36, 240 48 S 310 22, 360 28 S 430 18, 480 10";
const AREA = `${LINE} L 480 96 L 0 96 Z`;

// Decorative chart. The line draws after hydration; the fill is painted immediately.
export default function CashChart() {
  const reduce = useReducedMotion();
  const rawId = useId().replace(/:/g, "");
  const fillId = `cash-fill-${rawId}`;
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  return (
    <svg viewBox="0 0 480 96" className="dash__chart" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6331FB" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#6331FB" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#6331FB" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[28, 52, 76].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <path d={AREA} fill={`url(#${fillId})`} />
      <motion.path
        d={LINE}
        fill="none"
        stroke="#88F9C0"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: play ? [0, 1] : 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

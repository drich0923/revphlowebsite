"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// SSR and the first paint stay visible. Motion hides a block only after
// hydration, and only when it starts below the viewport, then reveals it
// on scroll. That keeps LCP text painted and honors reduced motion.
export function Reveal({ children, className, delay = 0, lift = false, as = "div" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [state, setState] = useState("shown");
  const Tag = motion[as] || motion.div;

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setState("shown");
        io.disconnect();
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <Tag
      ref={ref}
      className={className}
      initial={false}
      animate={state === "hidden" ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
      transition={
        state === "hidden"
          ? { duration: 0 }
          : { duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: EASE }
      }
      whileHover={lift && !reduce && state === "shown" ? { y: -4 } : undefined}
    >
      {children}
    </Tag>
  );
}

export function MotionLink({ className, children, ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      className={className}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 460, damping: 32 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function HeroGlow() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="hero__glow"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={reduce ? { opacity: 1 } : { opacity: [0.72, 1, 0.72] }}
      transition={reduce ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

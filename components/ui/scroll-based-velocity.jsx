"use client";

// Componentry registry: @componentry/scroll-based-velocity
// Motion drives the loop. `rows` defaults to the registry's two-line treatment.
// The loop pauses off-screen and when the visitor prefers reduced motion.
// Server and client render the same markup so hydration stays stable.
import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "motion/react";
import { cn } from "@/lib/utils";

function ParallaxText({ children, baseVelocity = 100, className, containerRef }) {
  const baseX = useMotionValue(0);
  const rootRef = useRef(null);
  const running = useRef(true);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll(containerRef ? { container: containerRef } : undefined);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Eight copies, so one copy is 12.5% of the track.
  const x = useTransform(baseX, (v) => `${wrap(-12.5, 0, v)}%`);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && reduce !== true;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const inView = rect.bottom > -80 && rect.top < window.innerHeight + 80;
      running.current = motionOk && inView && !document.hidden;
    };
    update();
    const io = new IntersectionObserver(update, { rootMargin: "80px" });
    io.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduce]);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    if (!running.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={rootRef} className="overflow-hidden whitespace-nowrap flex flex-nowrap" style={{ width: "100%" }}>
      <motion.div className={cn("flex whitespace-nowrap", className)} style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block mr-10">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollBasedVelocity({
  text,
  default_velocity = 5,
  className,
  containerRef,
  rows = 2,
}) {
  return (
    <section className="relative w-full">
      <ParallaxText baseVelocity={default_velocity} className={className} containerRef={containerRef}>
        {text}
      </ParallaxText>
      {rows > 1 ? (
        <ParallaxText baseVelocity={-default_velocity} className={className} containerRef={containerRef}>
          {text}
        </ParallaxText>
      ) : null}
    </section>
  );
}

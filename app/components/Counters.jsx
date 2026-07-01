"use client";
import { useEffect, useRef } from "react";

const fmt = (n, decimals) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Count-up gating (spec 5.2): SSR renders final values; a value is zeroed and
// animated only if it is still below the viewport at hydration.
export default function Counters({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const root = ref.current;
    if (!root) return;
    if (root.getBoundingClientRect().top <= window.innerHeight) return;

    const els = Array.from(root.querySelectorAll("[data-counter]"));
    els.forEach((el, i) => {
      el.dataset.delay = i * 60;
      el.textContent = `${el.dataset.prefix}${fmt(0, Number(el.dataset.decimals))}${el.dataset.suffix}`;
    });

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          let running = false;
          for (const el of els) {
            const t = Math.min(1, Math.max(0, (now - start - Number(el.dataset.delay)) / 900));
            if (t < 1) running = true;
            const eased = 1 - Math.pow(1 - t, 3);
            const val = Number(el.dataset.target) * eased;
            el.textContent = `${el.dataset.prefix}${fmt(val, Number(el.dataset.decimals))}${el.dataset.suffix}`;
          }
          if (running) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}

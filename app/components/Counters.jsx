"use client";
import { useEffect, useRef } from "react";
import { animate } from "motion/react";

const fmt = (n, decimals) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Count-up gating: SSR renders the final values. A value is zeroed and
// animated with Motion only if its group is still below the viewport at
// hydration, so above-the-fold numbers stay put for LCP.
export default function Counters({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const root = ref.current;
    if (!root) return;
    if (root.getBoundingClientRect().top <= window.innerHeight) return;

    const els = Array.from(root.querySelectorAll("[data-counter]"));
    els.forEach((el) => {
      el.textContent = `${el.dataset.prefix}${fmt(0, Number(el.dataset.decimals))}${el.dataset.suffix}`;
    });

    const controls = [];
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        io.disconnect();
        els.forEach((el, i) => {
          const decimals = Number(el.dataset.decimals);
          const control = animate(0, Number(el.dataset.target), {
            duration: 0.9,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (val) => {
              el.textContent = `${el.dataset.prefix}${fmt(val, decimals)}${el.dataset.suffix}`;
            },
          });
          controls.push(control);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      controls.forEach((control) => control.stop());
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

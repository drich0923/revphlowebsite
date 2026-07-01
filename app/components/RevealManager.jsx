"use client";
import { useEffect } from "react";

// Scroll-reveal gating (spec 5.1): initial hidden states are applied post-hydration
// and never to elements already in the viewport, so SSR HTML is always fully visible.
export default function RevealManager() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const els = Array.from(document.querySelectorAll("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    if (els.length === 0) return;

    const groups = new Map();
    for (const el of els) {
      const group = el.closest("[data-reveal-group]");
      if (group) {
        const idx = groups.get(group) || 0;
        el.style.transitionDelay = `${idx * 60}ms`;
        groups.set(group, idx + 1);
      }
      el.classList.add("will-reveal");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

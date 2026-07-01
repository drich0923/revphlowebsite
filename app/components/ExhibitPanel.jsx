"use client";
import { useEffect, useRef, useState } from "react";

// BEFORE/AFTER exhibit panel with a scroll-driven reveal: SSR renders AFTER
// (the product is what no-JS visitors and crawlers see). After hydration,
// panels still below the viewport reset to BEFORE; when one scrolls into
// view it holds the old-way artifact for a beat, then crossfades to AFTER.
// Clicking the tabs (or the peek) takes over and stops the auto-swap.
// Panels already visible at hydration never flip (no flash), and reduced
// motion keeps the SSR state.
const HOLD_MS = 1800;

export default function ExhibitPanel({ index, before, after, beforeSummary }) {
  const [state, setState] = useState("after");
  const manual = useRef(false);
  const rootRef = useRef(null);

  const drive = (next) => {
    manual.current = true;
    setState(next);
  };

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const el = rootRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setState("before");
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => {
          if (!manual.current) setState("after");
        }, HOLD_MS);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const showBefore = state === "before";

  return (
    <figure className="exhibit panel-figure" ref={rootRef}>
      <div className="panel">
        <div className="panel__tabs" role="group" aria-label="Show the old way or the RevPhlo view">
          <button className="panel__tab" aria-pressed={showBefore} onClick={() => drive("before")}>
            Before
          </button>
          <button className="panel__tab" aria-pressed={!showBefore} onClick={() => drive("after")}>
            After
          </button>
        </div>
        <div className="panel__stage">
          <div className="panel__state panel__state--after" hidden={showBefore}>
            {after}
            <button
              className="panel__peek"
              aria-label="Show the old way"
              tabIndex={showBefore ? -1 : 0}
              onClick={() => drive("before")}
            >
              <span className="panel__peek-tab">Before</span>
            </button>
          </div>
          <div className="panel__state panel__state--before" hidden={!showBefore}>
            {before}
          </div>
        </div>
      </div>
      <p className="sr-only">{beforeSummary}</p>
      <figcaption className="exhibit__caption">
        {showBefore ? `FIG. ${index}-A — THE OLD WAY` : `FIG. ${index}-B — WITH REVPHLO`}
      </figcaption>
    </figure>
  );
}

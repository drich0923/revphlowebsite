"use client";
import { useState } from "react";

// Accessible pause/play control for the KPI tape marquee (WCAG 2.2.2).
// Toggles a class on the parent .tape; the marquee also pauses on
// hover/focus-within via CSS.
export default function TapePause() {
  const [paused, setPaused] = useState(false);

  return (
    <button
      type="button"
      className="tape__pause"
      aria-pressed={paused}
      aria-label={paused ? "Play ticker" : "Pause ticker"}
      onClick={(e) => {
        const tape = e.currentTarget.closest(".tape");
        if (tape) tape.classList.toggle("tape--paused", !paused);
        setPaused(!paused);
      }}
    >
      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" fill="currentColor">
        {paused ? <path d="M3 1.5v9l7-4.5-7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
      </svg>
    </button>
  );
}

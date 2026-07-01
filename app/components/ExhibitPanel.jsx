"use client";
import { useState } from "react";

// BEFORE/AFTER exhibit panel. Default is AFTER (the product is never the hidden
// state); a clipped corner of the BEFORE artifact peeks into the frame as a
// second click target. No auto-swap timer — the visitor drives the contrast.
export default function ExhibitPanel({ index, before, after, beforeSummary }) {
  const [state, setState] = useState("after");
  const showBefore = state === "before";

  return (
    <figure className="exhibit panel-figure">
      <div className="panel">
        <div className="panel__tabs" role="group" aria-label="Show the old way or the RevPhlo view">
          <button className="panel__tab" aria-pressed={showBefore} onClick={() => setState("before")}>
            Before
          </button>
          <button className="panel__tab" aria-pressed={!showBefore} onClick={() => setState("after")}>
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
              onClick={() => setState("before")}
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

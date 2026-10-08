import { KPIS } from "./kpi-data";
import TapePause from "./TapePause";

function TapeItems() {
  return (
    <>
      <span className="tape__context">
        <span className="live-dot" aria-hidden="true" />
        Sample dashboard &middot; one connected view
      </span>
      {KPIS.map((kpi) => (
        <span key={kpi.label} className="tape__item">
          <span className="tape__label">{kpi.label}</span>
          <span className="tape__value">{kpi.value}</span>
          <svg viewBox="0 0 8 8" width="5" height="5" className="tape__diamond">
            <path d="M4 0l4 4-4 4-4-4z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );
}

// CSS marquee of the page's own KPI data. Decorative — the same data is real
// content in the hero dashboard, so the scrolling track is aria-hidden; the
// pause control stays exposed for WCAG 2.2.2.
export default function Tape({ inline = false }) {
  return (
    <div className={`tape ${inline ? "tape--inline" : ""}`}>
      <div className="tape__track" aria-hidden="true">
        <TapeItems />
        <TapeItems />
      </div>
      <TapePause />
    </div>
  );
}

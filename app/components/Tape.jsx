import { KPIS } from "./kpi-data";

function TapeItems() {
  return (
    <>
      {KPIS.map((kpi) => (
        <span key={kpi.label} className="tape__item">
          <span className="tape__label">{kpi.label}</span>
          <span className="tape__value">{kpi.value}</span>
          <span className={`tape__delta tape__delta--${kpi.dir}`}>
            <svg viewBox="0 0 12 10" width="7" height="6" className={kpi.dir === "down" ? "delta__tri delta__tri--down" : "delta__tri"}>
              <path d="M6 1l5 8H1z" fill="currentColor" />
            </svg>
            {kpi.dir === "up" ? "+" : "-"}
            {kpi.change}
          </span>
          <svg viewBox="0 0 8 8" width="5" height="5" className="tape__diamond">
            <path d="M4 0l4 4-4 4-4-4z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );
}

// CSS-only marquee of the page's own KPI data. Decorative — the same data is
// real content in the hero dashboard, so the whole strip is aria-hidden.
export default function Tape({ inline = false }) {
  return (
    <div className={`tape ${inline ? "tape--inline" : ""}`} aria-hidden="true">
      <div className="tape__track">
        <TapeItems />
        <TapeItems />
      </div>
    </div>
  );
}

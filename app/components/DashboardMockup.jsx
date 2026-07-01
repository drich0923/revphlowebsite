import { Icon, DeltaChip } from "./Icons";
import { KPIS } from "./kpi-data";

function Sparkline() {
  return (
    <svg viewBox="0 0 90 28" width="90" height="28" aria-hidden="true" className="kpi__spark">
      <path
        className="kpi__spark-area"
        d="M2 22 C 12 20, 20 24, 30 18 S 48 14, 58 15 S 76 6, 88 4 L 88 27 L 2 27 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        className="kpi__spark-line"
        d="M2 22 C 12 20, 20 24, 30 18 S 48 14, 58 15 S 76 6, 88 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KpiCell({ kpi, countable }) {
  const valueProps = countable
    ? {
        "data-counter": "",
        "data-target": kpi.target,
        "data-prefix": kpi.prefix || "",
        "data-suffix": kpi.suffix || "",
        "data-decimals": kpi.decimals || 0,
      }
    : {};
  return (
    <div className={`kpi ${kpi.anchor ? "kpi--anchor" : ""}`}>
      <div className="kpi__label">{kpi.label}</div>
      <div className="kpi__value" {...valueProps}>
        {kpi.value}
      </div>
      <DeltaChip dir={kpi.dir} value={kpi.change} />
      {kpi.anchor && <Sparkline />}
    </div>
  );
}

function TitleBar() {
  return (
    <div className="dash__bar">
      <div className="dash__dots" aria-hidden="true">
        <span /> <span /> <span />
      </div>
      <div className="dash__title">Dashboard</div>
      <div className="dash__meta">
        <Icon name="calendar" size={14} />
        <span className="dash__meta-text">
          <span className="dash__meta-live">This Month</span>
          <span className="dash__meta-date"> &middot; Feb 2026</span>
        </span>
        <span className="dash__pills" aria-hidden="true">
          <span className="dash__pill">Today</span>
          <span className="dash__pill">Week</span>
          <span className="dash__pill dash__pill--active">Month</span>
        </span>
      </div>
    </div>
  );
}

// variant: "full" = 3x3 hero dashboard; "excerpt" = compact 1x3 stack (Old vs New right panel)
export default function DashboardMockup({ variant = "full", caption }) {
  const kpis = variant === "excerpt" ? KPIS.slice(0, 3) : KPIS;
  return (
    <figure className={`exhibit dash dash--${variant}`}>
      <div className="dash__frame">
        <TitleBar />
        <div className={`dash__grid ${variant === "excerpt" ? "dash__grid--stack" : ""}`}>
          {kpis.map((kpi) => (
            <KpiCell key={kpi.label} kpi={kpi} countable={variant === "excerpt"} />
          ))}
        </div>
      </div>
      {caption && <figcaption className="exhibit__caption">{caption}</figcaption>}
    </figure>
  );
}

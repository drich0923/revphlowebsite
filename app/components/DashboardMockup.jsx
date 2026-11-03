import { Icon } from "./Icons";
import { KPIS } from "./kpi-data";
import CashChart from "./CashChart";

const SIDE_NAV = ["Dashboard", "Calls", "Attribution", "Leaderboard", "Payments"];

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

function counterProps(kpi) {
  return {
    "data-counter": "",
    "data-target": kpi.target,
    "data-prefix": kpi.prefix || "",
    "data-suffix": kpi.suffix || "",
    "data-decimals": kpi.decimals || 0,
  };
}

function KpiCell({ kpi, countable }) {
  const valueProps = countable ? counterProps(kpi) : {};
  return (
    <div className={`kpi ${kpi.anchor ? "kpi--anchor" : ""}`}>
      <div className="kpi__label">{kpi.label}</div>
      <div className="kpi__value" {...valueProps}>
        {kpi.value}
      </div>
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

function FullDashboard({ caption }) {
  const [anchor, ...rest] = KPIS;
  return (
    <figure className="exhibit dash dash--full" aria-label="Sample RevPhlo dashboard">
      <div className="dash__frame">
        <TitleBar />
        <div className="dash__body">
          <div className="dash__side" aria-hidden="true">
            {SIDE_NAV.map((item) => (
              <span key={item} className={`dash__side-item ${item === "Dashboard" ? "dash__side-item--on" : ""}`}>
                {item}
              </span>
            ))}
          </div>
          <div className="dash__main">
            <div className="dash__spotlight">
              <div className="dash__spotlight-copy">
                <div className="kpi__label">{anchor.label}</div>
                <div className="kpi__value kpi__value--mint" {...counterProps(anchor)}>
                  {anchor.value}
                </div>
              </div>
              <CashChart />
            </div>
            <div className="dash__grid dash__grid--rest">
              {rest.map((kpi) => (
                <KpiCell key={kpi.label} kpi={kpi} countable />
              ))}
            </div>
          </div>
        </div>
      </div>
      {caption && <figcaption className="exhibit__caption">{caption}</figcaption>}
    </figure>
  );
}

// variant: "full" = product dashboard; "excerpt" = compact stack (Old vs New)
export default function DashboardMockup({ variant = "full", caption }) {
  if (variant === "full") return <FullDashboard caption={caption} />;

  const kpis = KPIS.slice(0, 3);
  return (
    <figure className="exhibit dash dash--excerpt">
      <div className="dash__frame">
        <TitleBar />
        <div className="dash__grid dash__grid--stack">
          {kpis.map((kpi) => (
            <KpiCell key={kpi.label} kpi={kpi} countable />
          ))}
        </div>
      </div>
      {caption && <figcaption className="exhibit__caption">{caption}</figcaption>}
    </figure>
  );
}

import { Icon } from "./Icons";

/* ---------- BEFORE artifacts (parodies — authentic chrome colors kept on purpose) ---------- */

export function FormMockup() {
  return (
    <div className="artifact" aria-hidden="true">
      <div className="gform">
        <div className="gform__band" />
        <div className="gform__head">
          <div className="gform__title">End of Day Report</div>
          <div className="gform__sub">Submit your daily numbers by 6pm. Required *</div>
        </div>
        <div className="gform__field">
          <div className="gform__label">How many calls did you take today? *</div>
          <div className="gform__input">7... actually maybe 6?</div>
          <div className="gform__error">
            <Icon name="warning-triangle" size={12} /> Please enter a number
          </div>
        </div>
        <div className="gform__field">
          <div className="gform__label">Total cash collected *</div>
          <div className="gform__input">$14,000</div>
          <div className="gform__error">
            <Icon name="warning-triangle" size={12} /> Does not match Stripe ($11,500)
          </div>
        </div>
        <div className="gform__field">
          <div className="gform__label">Lead source for your closes *</div>
          <div className="gform__input gform__input--empty" />
          <div className="gform__error">
            <Icon name="warning-triangle" size={12} /> This field is required
          </div>
        </div>
        <div className="gform__field">
          <div className="gform__label">Call outcome *</div>
          <div className="gform__radios">
            <div className="gform__radio">
              <span className="gform__dot" /> Closed — Full Pay
            </div>
            <div className="gform__radio">
              <span className="gform__dot gform__dot--on" /> Closed — Payment Plan
            </div>
            <div className="gform__radio">
              <span className="gform__dot" /> Follow Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sheet({ name, formula, tabs, cols, rows }) {
  return (
    <div className="artifact" aria-hidden="true">
      <div className="gsheet">
        <div className="gsheet__chrome">
          <span className="gsheet__icon" />
          <span className="gsheet__name">{name}</span>
        </div>
        <div className="gsheet__formula">
          <span className="gsheet__cellref">{formula.cell}</span>
          <span className="gsheet__fx">{formula.value}</span>
        </div>
        <div className="gsheet__grid" style={{ "--cols": cols.length }}>
          <div className="gsheet__row gsheet__row--head">
            {cols.map((c) => (
              <span key={c} className="gsheet__cell">
                {c}
              </span>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} className={`gsheet__row ${row.struck ? "gsheet__row--struck" : ""}`}>
              {row.cells.map((cell, j) => (
                <span key={j} className={`gsheet__cell ${cell.err ? "gsheet__cell--err" : ""} ${cell.red ? "gsheet__cell--red" : ""}`}>
                  {cell.v}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="gsheet__tabs">
          {tabs.map((t) => (
            <span key={t.label} className={`gsheet__tab ${t.active ? "gsheet__tab--active" : ""}`}>
              {t.label}
              {t.warn && <Icon name="warning-triangle" size={11} />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AttributionSheet() {
  return (
    <Sheet
      name="Sales Tracker — Feb 2026.xlsx"
      formula={{ cell: "D7", value: '=SUMIF(B:B,"Meta",D:D)' }}
      tabs={[{ label: "Revenue", active: true }, { label: "Closers" }, { label: "Payments", warn: true }]}
      cols={["Source", "Closer", "Revenue", "% of Total"]}
      rows={[
        { cells: [{ v: "Meta" }, { v: "Kyle" }, { v: "$45,200" }, { v: "=D2/SUM(D:D)" }] },
        { cells: [{ v: "Meta" }, { v: "Justin" }, { v: "$31,000" }, { v: "=D3/SUM(D:D)" }] },
        { cells: [{ v: "Google" }, { v: "#REF!", err: true }, { v: "#REF!", err: true }, { v: "#REF!", err: true }] },
        { cells: [{ v: "Organic" }, { v: "Cami" }, { v: "$18,500" }, { v: "#DIV/0!", err: true }] },
        { cells: [{ v: "DM?? idk" }, { v: "???" }, { v: "$12,000" }, { v: "" }] },
        { cells: [{ v: "" }, { v: "" }, { v: "=SUM(D2:D6)" }, { v: "#VALUE!", err: true }] },
      ]}
    />
  );
}

export function LeaderboardSheet() {
  return (
    <Sheet
      name="Rep Leaderboard.xlsx"
      formula={{ cell: "C4", value: "11? 12?" }}
      tabs={[{ label: "Leaderboard", active: true }, { label: "Feb" }, { label: "Jan" }]}
      cols={["Rank", "Rep", "Closes", "Revenue", "Rate"]}
      rows={[
        { cells: [{ v: "1" }, { v: "Kyle M." }, { v: "14" }, { v: "$78,200" }, { v: "38%" }] },
        { struck: true, cells: [{ v: "2" }, { v: "Cami L." }, { v: "11" }, { v: "$62,100" }, { v: "32%" }] },
        { cells: [{ v: "2" }, { v: "Justin R." }, { v: "12" }, { v: "$61,800" }, { v: "35%" }] },
        { cells: [{ v: "3" }, { v: "Cami L." }, { v: "11? 12?" }, { v: "$55,900" }, { v: "#N/A", err: true }] },
        { cells: [{ v: "4" }, { v: "Derek W." }, { v: "9" }, { v: "$43,800" }, { v: "29%" }] },
        { cells: [{ v: "" }, { v: "^^ need to recount", red: true }, { v: "" }, { v: "=SUM(D2:D6)", red: true }, { v: "" }] },
      ]}
    />
  );
}

export function PaymentScrap() {
  return (
    <div className="artifact" aria-hidden="true">
      <div className="scrap">
        <div className="scrap__title">Unmatched payments?!</div>
        <div className="scrap__line">rodriguez_m@ &mdash; $4,500</div>
        <div className="scrap__line">jsmith99@ &mdash; $7,000</div>
        <div className="scrap__shout">WHO ARE THESE PEOPLE</div>
      </div>
    </div>
  );
}

/* ---------- AFTER visuals (the product — dark, mono, hairline) ---------- */

export function AiNotesVisual() {
  return (
    <div className="after">
      <div className="notecard">
        <div className="notecard__top">
          <span className="chip chip--ai">
            <Icon name="bolt" size={12} /> AI Generated
          </span>
          <span className="chip chip--money">
            <Icon name="check" size={12} /> Closed
          </span>
        </div>
        <dl className="notecard__rows">
          <div>
            <dt>Prospect</dt>
            <dd>Alan M. — Omaha, NE</dd>
          </div>
          <div>
            <dt>Cash</dt>
            <dd className="mono-money">$7,100</dd>
          </div>
          <div>
            <dt>Objection</dt>
            <dd>Authority — spouse</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>Meta · Webinar Funnel</dd>
          </div>
        </dl>
      </div>
      <div className="notecard">
        <div className="notecard__top">
          <span className="chip chip--ai">
            <Icon name="bolt" size={12} /> AI Generated
          </span>
          <span className="chip chip--warn">
            <Icon name="refresh" size={12} /> Follow Up
          </span>
        </div>
        <dl className="notecard__rows">
          <div>
            <dt>Prospect</dt>
            <dd>Sarah K. — Austin, TX</dd>
          </div>
          <div>
            <dt>Objection</dt>
            <dd>Financial — checking budget</dd>
          </div>
          <div>
            <dt>Next Step</dt>
            <dd>Callback Thu 2pm</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function BarRow({ name, amount, pct }) {
  return (
    <div className="attr__row">
      <span className="attr__name">{name}</span>
      <span className="attr__bar">
        <span className="attr__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="attr__amt">{amount}</span>
    </div>
  );
}

export function AttributionVisual() {
  return (
    <div className="after">
      <div className="after__head">
        <span className="after__title">Revenue by Source</span>
        <span className="after__meta">This Month</span>
      </div>
      <div className="attr__filters">
        Viewing{" "}
        <span className="pill">
          Booking Source <Icon name="chevron-down" size={12} />
        </span>{" "}
        by{" "}
        <span className="pill">
          Closer <Icon name="chevron-down" size={12} />
        </span>
      </div>
      <div className="attr__group">
        <div className="attr__grouphead">
          <span>Phone Setter</span>
          <span className="mono-money">$314,783</span>
        </div>
        <BarRow name="Marcus T." amount="$58,700" pct={52} />
        <BarRow name="Kyle P." amount="$47,500" pct={42} />
        <BarRow name="Spencer K." amount="$30,000" pct={27} />
      </div>
      <div className="attr__group">
        <div className="attr__grouphead">
          <span>DM Setter</span>
          <span className="mono-money">$143,450</span>
        </div>
        <BarRow name="Chris P." amount="$38,600" pct={40} />
        <BarRow name="Rohail A." amount="$31,600" pct={33} />
        <BarRow name="Spencer K." amount="$15,000" pct={16} />
      </div>
      <div className="attr__group">
        <div className="attr__grouphead">
          <span>Direct</span>
          <span className="mono-money">$99,600</span>
        </div>
        <BarRow name="Spencer K." amount="$22,500" pct={34} />
        <BarRow name="Chris P." amount="$16,500" pct={25} />
        <BarRow name="Samuel L." amount="$16,500" pct={25} />
      </div>
    </div>
  );
}

export function LeaderboardVisual() {
  const rows = [
    { rank: 1, name: "Kyle M.", rate: "38.2%", cash: "$84,200", top: true },
    { rank: 2, name: "Justin R.", rate: "35.1%", cash: "$67,500" },
    { rank: 3, name: "Cami L.", rate: "31.7%", cash: "$55,900" },
    { rank: 4, name: "Derek W.", rate: "29.4%", cash: "$43,800" },
  ];
  return (
    <div className="after">
      <div className="after__head">
        <span className="after__title">Leaderboard</span>
        <span className="after__meta">This Month</span>
      </div>
      <div className="lb">
        {rows.map((r) => (
          <div key={r.rank} className={`lb__row ${r.top ? "lb__row--top" : ""}`}>
            <span className="lb__rank">{r.rank}</span>
            <span className="lb__name">{r.name}</span>
            <span className="lb__rate">{r.rate}</span>
            <span className="lb__cash mono-money">{r.cash}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaymentVisual() {
  return (
    <div className="after">
      <div className="paycard">
        <div className="paycard__tag">Unmatched Payment</div>
        <div className="paycard__row">
          <span className="paycard__email">rodriguez_m@gmail.com</span>
          <span className="paycard__amt mono-money">$4,500</span>
        </div>
        <div className="paycard__meta">Stripe · Feb 14 · ****4821</div>
      </div>
      <div className="paycard__link" aria-hidden="true">
        <Icon name="arrow-down" size={18} />
      </div>
      <div className="paycard paycard--matched">
        <div className="paycard__tag paycard__tag--matched">
          <Icon name="check" size={12} /> Matched Appointment
        </div>
        <dl className="notecard__rows">
          <div>
            <dt>Prospect</dt>
            <dd>Maria Rodriguez</dd>
          </div>
          <div>
            <dt>Closer</dt>
            <dd>Cami L.</dd>
          </div>
          <div>
            <dt>Setter</dt>
            <dd>Zoha A.</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>Organic · DM</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

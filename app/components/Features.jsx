import { Icon } from "./Icons";
import ExhibitPanel from "./ExhibitPanel";
import {
  FormMockup,
  AttributionSheet,
  LeaderboardSheet,
  PaymentScrap,
  AiNotesVisual,
  AttributionVisual,
  LeaderboardVisual,
  PaymentVisual,
} from "./Mockups";

const FEATURES = [
  {
    index: "F.01",
    icon: "bolt",
    tag: "AI Post-Call Notes",
    title: "From sloppy EODs to auto-generated post-call notes",
    desc: "No more Slack messages at 11pm with guessed numbers. RevPhlo pulls from Fathom recordings and writes the report for your reps.",
    bullets: [
      "Captures outcome, objections, and next steps automatically",
      "One-click link to full recording for coaching",
      "Replaces manual EODs entirely",
    ],
    before: <FormMockup />,
    after: <AiNotesVisual />,
    beforeSummary: "Example of a Google Form end-of-day report with validation errors and numbers that do not match Stripe.",
  },
  {
    index: "F.02",
    flipped: true,
    icon: "bar-chart",
    tag: "Full Attribution",
    title: 'From "I think it was Facebook" to full revenue attribution',
    desc: "Slice revenue by closer, traffic source, funnel, setter — any combination. Every dollar traced to where it actually came from.",
    bullets: [
      "Revenue by closer × source × funnel",
      "See which setters book highest-converting leads",
      "Source mapping from GHL tags, fields, UTMs",
    ],
    before: <AttributionSheet />,
    after: <AttributionVisual />,
    beforeSummary: "Example of a broken sales-tracking spreadsheet with formula errors and unknown lead sources.",
  },
  {
    index: "F.03",
    icon: "trophy",
    tag: "Rep Portal",
    title: "From spreadsheet chaos to live leaderboards",
    desc: "Kill the Google Sheet that breaks every month. Every rep gets their own portal with KPIs, tasks, and shareable wins.",
    bullets: [
      "Personal dashboard with pending PCNs",
      "Leaderboards by cash, closes, close rate",
      "Shareable wins — one-click to Slack or IG",
    ],
    before: <LeaderboardSheet />,
    after: <LeaderboardVisual />,
    beforeSummary: "Example of a broken end-of-day leaderboard spreadsheet with duplicate ranks and a note to recount.",
  },
  {
    index: "F.04",
    flipped: true,
    icon: "credit-card",
    tag: "Payment Matching",
    title: 'From "who paid with that email?" to instant match',
    desc: "The appointment email and the payment email are almost never the same. RevPhlo lets you match any payment to the correct call in seconds.",
    bullets: [
      "Search by name, email, or date",
      "Auto-syncs setter, closer, and source",
      "Commission tracking with custom splits",
    ],
    before: <PaymentScrap />,
    after: <PaymentVisual />,
    beforeSummary: "Example of a handwritten note listing unmatched payments from unknown customers.",
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">03</span>
          <span className="protocol__eyebrow">
            Before <Icon name="arrow-right" size={12} /> After
          </span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <h2 className="h2" data-reveal>
          Replace every broken process with a system that scales
        </h2>

        {FEATURES.map((f) => (
          <article key={f.index} className={`feature ${f.flipped ? "feature--flipped" : ""}`} data-reveal-group>
            <div className="feature__rule" data-reveal>
              <span className="feature__index">{f.index}</span>
            </div>
            <div className="feature__grid">
              <div className="feature__text" data-reveal>
                <span className="feature__tag">
                  <Icon name={f.icon} size={14} />
                  {f.tag}
                </span>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__desc">{f.desc}</p>
                <ul className="feature__bullets">
                  {f.bullets.map((b) => (
                    <li key={b}>
                      <span className="feature__check">
                        <Icon name="check" size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature__visual" data-reveal>
                <ExhibitPanel index={f.index} before={f.before} after={f.after} beforeSummary={f.beforeSummary} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

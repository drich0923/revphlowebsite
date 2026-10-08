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
    id: "post-call-notes",
    icon: "bolt",
    tag: "No More Guessed EODs",
    title: "No more 11 PM Slack messages with guessed numbers",
    desc: "RevPhlo listens to every Fathom recording, captures the real outcome and objections, and logs the deal automatically. Your reps stop typing EODs. You stop chasing them.",
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
    id: "attribution",
    flipped: true,
    icon: "bar-chart",
    tag: "Know What Converts",
    title: "Stop guessing which closer is bleeding your paid leads",
    desc: "See revenue by closer, traffic source, and setter. Know whether your top rep is actually converting or simply getting the warmest calls.",
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
    id: "rep-portal",
    icon: "trophy",
    tag: "Live Rep Accountability",
    title: "Know who’s winning before the EOD report arrives",
    desc: "Every rep gets a live portal with KPIs, tasks, and shareable wins. No spreadsheet repairs and no waiting until tomorrow.",
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
    id: "payment-matching",
    flipped: true,
    icon: "credit-card",
    tag: "Every Payment Matched",
    title: 'End the "who paid with that email?" mystery',
    desc: "Appointment and checkout emails rarely match. Link any Stripe payment to the exact call, closer, setter, and source in seconds.",
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
          <span className="protocol__index">02</span>
          <span className="protocol__eyebrow">
            Before <Icon name="arrow-right" size={12} /> After
          </span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <h2 className="h2" data-reveal>
          Replace every broken process with a system that scales
        </h2>

        {FEATURES.map((f) => (
          <article key={f.id} className={`feature ${f.flipped ? "feature--flipped" : ""}`} data-reveal-group>
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
                <ExhibitPanel id={f.id} before={f.before} after={f.after} beforeSummary={f.beforeSummary} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

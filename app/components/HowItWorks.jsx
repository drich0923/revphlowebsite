const STEPS = [
  {
    n: "01",
    title: "Connect your tools",
    body: "One-click OAuth with GoHighLevel, Zoom, Stripe, Fathom, and more. No developers needed.",
  },
  {
    n: "02",
    title: "Map your sources",
    body: "Tell RevPhlo how to identify paid vs. organic, which funnels map to which tags, and your calendar structure.",
  },
  {
    n: "03",
    title: "See everything",
    body: "Dashboard is live. Every call auto-dispositioned. Every dollar attributed. Drill into anything.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="howitworks">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">04</span>
          <span className="protocol__eyebrow">How It Works</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <div className="how__head" data-reveal>
          <h2 className="h2">Live in 48 hours, not 48 days</h2>
          <p className="how__sub">Connect your stack. Map your sources. See everything.</p>
        </div>
        <div className="how__cards" data-reveal-group>
          <div className="how__rail" aria-hidden="true" />
          {STEPS.map((s) => (
            <div key={s.n} className="how__card" data-reveal>
              <span className="how__node" aria-hidden="true" />
              <span className="how__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="how__title">{s.title}</h3>
              <p className="how__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

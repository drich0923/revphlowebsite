const STEPS = [
  {
    n: "01",
    title: "Start your account",
    body: "Complete checkout, verify your email, and add your company details. Your setup starts right away.",
  },
  {
    n: "02",
    title: "Connect and configure",
    body: "Follow each setup question and action. Each step explains why it matters and who needs to complete it. Share tasks with a teammate when you need help.",
  },
  {
    n: "03",
    title: "Open your dashboard",
    body: "Your full dashboard opens when all required setup checks pass. New bookings, calls, and payments appear as they arrive.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="howitworks">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">03</span>
          <span className="protocol__eyebrow">How It Works</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <div className="how__head" data-reveal>
          <h2 className="h2">From checkout to a connected team</h2>
          <p className="how__sub">Start your account. Complete your setup. Open your dashboard.</p>
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

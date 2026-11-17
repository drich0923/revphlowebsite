import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { Reveal } from "./motion-ui";

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
        <Reveal className="protocol">
          <span className="protocol__index">03</span>
          <span className="protocol__eyebrow">How It Works</span>
          <span className="protocol__tick" aria-hidden="true" />
        </Reveal>
        <div className="how__head">
          <h2 className="h2">
            <KineticTextReveal
              text="From checkout to a connected team"
              playInView
              splitBy="words"
              stagger={0.045}
              distance={14}
              className="kinetic-heading"
            />
          </h2>
          <Reveal className="how__sub" delay={0.08} as="p">
            Start your account. Complete your setup. Open your dashboard.
          </Reveal>
        </div>
        <div className="how__cards">
          <div className="how__rail" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="how__card" delay={i * 0.08} lift>
              <span className="how__node" aria-hidden="true" />
              <span className="how__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="how__title">{s.title}</h3>
              <p className="how__body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

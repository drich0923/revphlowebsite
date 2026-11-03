import { IntegrationMark } from "./IntegrationLogos";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { Reveal } from "./motion-ui";

const NAMES = ["GoHighLevel", "Zoom", "Stripe", "Fathom", "Zapier", "Slack", "HubSpot", "Whop"];

export default function Integrations() {
  return (
    <section className="integrations">
      <div className="container">
        <Reveal className="protocol">
          <span className="protocol__index">04</span>
          <span className="protocol__eyebrow">Integrations</span>
          <span className="protocol__tick" aria-hidden="true" />
        </Reveal>
        <h2 className="h2">
          <KineticTextReveal
            text="Plugs into your existing stack"
            playInView
            splitBy="words"
            stagger={0.045}
            distance={14}
            className="kinetic-heading"
          />
        </h2>
        <Reveal className="works">
          <ScrollBasedVelocity
            text={NAMES.join("     ·     ")}
            default_velocity={2}
            rows={1}
            className="works__track"
          />
        </Reveal>
        <p className="integrations__more">
          <a href="/integrations">How each tool connects</a>
        </p>
        <div className="lattice">
          {NAMES.map((name, i) => (
            <Reveal key={name} className="lattice__cell" delay={i * 0.04}>
              <IntegrationMark name={name} className="lattice__glyph" />
              <span className="lattice__name">{name}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

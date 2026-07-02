import { IntegrationMark } from "./IntegrationLogos";

const NAMES = ["GoHighLevel", "Zoom", "Stripe", "Fathom", "Zapier", "Slack", "HubSpot", "Whop"];

export default function Integrations() {
  return (
    <section className="integrations">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">04</span>
          <span className="protocol__eyebrow">Integrations</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <h2 className="h2" data-reveal>
          Plugs into your existing stack
        </h2>
        <div className="lattice" data-reveal>
          {NAMES.map((name) => (
            <div key={name} className="lattice__cell">
              <IntegrationMark name={name} className="lattice__glyph" />
              <span className="lattice__name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

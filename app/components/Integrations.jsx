import Image from "next/image";

const LOGOS = [
  { name: "GoHighLevel", file: "gohighlevel.png" },
  { name: "Zoom", file: "zoom.png" },
  { name: "Stripe", file: "stripe.png" },
  { name: "Fathom", file: "fathom.png" },
  { name: "Zapier", file: "zapier.png" },
  { name: "Slack", file: "slack.png" },
  { name: "HubSpot", file: "hubspot.png" },
  { name: "Whop", file: "whop.png" },
];

export default function Integrations() {
  return (
    <section className="integrations">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">05</span>
          <span className="protocol__eyebrow">Integrations</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <h2 className="h2" data-reveal>
          Plugs into your existing stack
        </h2>
        <div className="lattice" data-reveal>
          {LOGOS.map((l) => (
            <div key={l.name} className="lattice__cell">
              <span className="lattice__tile">
                <Image src={`/logos/${l.file}`} alt={`${l.name} logo`} width={30} height={30} className="lattice__logo" />
              </span>
              <span className="lattice__name">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

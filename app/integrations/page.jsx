import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { IntegrationMark } from "../components/IntegrationLogos";
import { MotionLink, Reveal } from "../components/motion-ui";
import { pageMeta } from "../seo";
import { CATEGORIES } from "./data";

export const metadata = pageMeta({
  title: "Integrations | RevPhlo",
  description:
    "Connect the tools that hold your calls, deals, and payments. RevPhlo works with GoHighLevel, Fathom, Stripe, Zoom, Whop, Slack, and Zapier.",
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <div className="site">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="intpage">
        <header className="intpage__hero">
          <div className="container">
            <p className="hero__badge intpage__eyebrow">Integrations</p>
            <h1>Connect the tools that hold your calls, deals, and payments.</h1>
            <p className="intpage__sub">
              RevPhlo reads the bookings, conversations, and cash you already have, and turns them into
              post-booking sales intelligence.
            </p>
          </div>
        </header>

        {CATEGORIES.map((category) => (
          <section key={category.id} className="intpage__section" aria-labelledby={`int-${category.id}`}>
            <div className="container">
              <Reveal>
                <h2 id={`int-${category.id}`} className="intpage__label">
                  {category.label}
                </h2>
              </Reveal>
              <div className="intpage__grid">
                {category.items.map((item, index) => (
                  <Reveal key={item.name} className="intcard" delay={index * 0.08} lift>
                    <div className="intcard__top">
                      <IntegrationMark name={item.name} className="intcard__mark" />
                      <span className={`intcard__badge intcard__badge--${item.status === "available" ? "live" : "soon"}`}>
                        {item.status === "available" ? "Available" : "Coming soon"}
                      </span>
                    </div>
                    <h3 className="intcard__name">{item.name}</h3>
                    <p className="intcard__note">{item.note}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="intpage__close">
          <div className="container">
            <Reveal as="h2">
              Find the leaks in your <span className="book__accent">post-booking pipeline.</span>
            </Reveal>
            <MotionLink href="/#book" className="btn btn--mint">
              Find Your Team&rsquo;s Data Leaks
            </MotionLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

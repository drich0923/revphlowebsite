import { Icon } from "./Icons";
import { RedUnderline } from "./RedPen";
import VslPlayer from "./Vsl";
import DashboardMockup from "./DashboardMockup";
import Counters from "./Counters";
import { HeroGlow, MotionLink } from "./motion-ui";

export default function Hero() {
  return (
    <section className="hero">
      <HeroGlow />
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="live-dot" aria-hidden="true" />
          Built for high-performing sales teams
        </div>
        <h1 className="hero__h1">
          You&rsquo;re running a{" "}
          <span className="hero__accent">
            <span className="nowrap">7-figure</span> sales team
          </span>{" "}
          off a{" "}
          <span className="hero__blind">
            Google Sheet.
            <RedUnderline className="hero__blind-stroke" />
          </span>
        </h1>
        <p className="hero__sub">
          RevPhlo pulls directly from Fathom, GoHighLevel, and Stripe so you get true attribution,
          auto-generated post-call notes, and zero rep guessing &mdash; without changing your stack.
        </p>
        <div className="hero__ctas">
          <MotionLink href="#book" className="btn btn--mint">
            Find Your Team&rsquo;s Data Leaks
            <Icon name="arrow-right" size={16} className="btn__arrow" />
          </MotionLink>
          <MotionLink href="/demo" className="btn btn--ghost">
            See it in action
          </MotionLink>
        </div>
        <p className="hero__cta-note">20-minute pipeline diagnostic &middot; No pitch decks</p>
        <Counters className="hero__stage">
          <DashboardMockup variant="full" />
        </Counters>
        <VslPlayer />
      </div>
    </section>
  );
}

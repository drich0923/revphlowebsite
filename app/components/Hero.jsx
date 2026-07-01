import { Icon } from "./Icons";
import { RedUnderline } from "./RedPen";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="live-dot" aria-hidden="true" />
          Built for high-performing sales teams
        </div>
        <h1 className="hero__h1">
          Stop managing your sales team{" "}
          <span className="hero__blind">
            blind
            <RedUnderline className="hero__blind-stroke" />
          </span>
        </h1>
        <p className="hero__sub">
          Full visibility into what happens after the call is booked &mdash; who&rsquo;s closing,
          what&rsquo;s converting, and where your revenue is leaking.
        </p>
        <div className="hero__ctas">
          <a href="#book" className="btn btn--primary">
            Book a Demo
            <Icon name="arrow-right" size={16} className="btn__arrow" />
          </a>
          <a href="#features" className="btn btn--ghost">
            See How It Works
          </a>
        </div>
        <DashboardMockup variant="full" caption="FIG. 00 — LIVE DASHBOARD · FEB 2026" />
      </div>
    </section>
  );
}

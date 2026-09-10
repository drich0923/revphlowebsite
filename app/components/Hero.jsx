import { Icon } from "./Icons";
import { RedUnderline } from "./RedPen";
import VslPlayer from "./Vsl";

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
          Watch how high-ticket teams replace broken spreadsheets and manual EOD reports with
          real-time sales intelligence &mdash; without changing a single tool.
        </p>
        <div className="hero__ctas">
          <a href="/checkout" className="btn btn--primary">
            Get Started
            <Icon name="arrow-right" size={16} className="btn__arrow" />
          </a>
          <a href="#book" className="btn btn--ghost">
            Book a Demo
          </a>
        </div>
        <VslPlayer />
      </div>
    </section>
  );
}

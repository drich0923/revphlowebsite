import { Icon } from "./Icons";
import Tape from "./Tape";

export default function CtaRail({ ghostLabel = "See How It Works", ghostHref = "#features" }) {
  return (
    <div className="ctarail">
      <div className="ctarail__tape">
        <Tape inline />
      </div>
      <div className="ctarail__actions">
        <a href="/checkout" className="btn btn--primary">
          Get Started
          <Icon name="arrow-right" size={16} className="btn__arrow" />
        </a>
        <a href={ghostHref} className="btn btn--ghost">
          {ghostLabel}
        </a>
      </div>
    </div>
  );
}

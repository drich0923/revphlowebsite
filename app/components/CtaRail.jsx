import { Icon } from "./Icons";
import Tape from "./Tape";
import { MotionLink } from "./motion-ui";

export default function CtaRail({ ghostLabel = "See How It Works", ghostHref = "#features" }) {
  return (
    <div className="ctarail">
      <div className="ctarail__tape">
        <Tape inline />
      </div>
      <div className="ctarail__actions">
        <MotionLink href="#book" className="btn btn--primary">
          Find Your Data Leaks
          <Icon name="arrow-right" size={16} className="btn__arrow" />
        </MotionLink>
        <MotionLink href={ghostHref} className="btn btn--ghost">
          {ghostLabel}
        </MotionLink>
      </div>
    </div>
  );
}

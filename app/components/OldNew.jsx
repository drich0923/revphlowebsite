import { RedDoubleUnderline, RedCircle } from "./RedPen";
import DashboardMockup from "./DashboardMockup";
import Counters from "./Counters";

export function PaperNote({ compact = false }) {
  return (
    <div
      className={`paper ${compact ? "paper--compact" : ""}`}
      role="img"
      aria-label="Example of a handwritten end-of-day report"
    >
      <div className="paper__inner" aria-hidden="true">
        <span className="paper__tape" />
        <span className="paper__margin" />
        <span className="paper__ring" />
        <span className="paper__corner" />
        <div className="paper__header">
          End-of-Day Report
          <RedDoubleUnderline className="paper__header-stroke" />
        </div>
        <div className="paper__title">Tuesday EOD &mdash; Marcus J.</div>
        <dl className="paper__rows">
          <div className="paper__row">
            <dt>Calls:</dt>
            <dd>6... no wait 7</dd>
          </div>
          <div className="paper__row">
            <dt>Closes:</dt>
            <dd>2 (I think the 2nd went thru??)</dd>
          </div>
          <div className="paper__row">
            <dt>Revenue:</dt>
            <dd>
              <s>$14,000</s> $11,500
            </dd>
          </div>
          <div className="paper__row paper__row--faded">
            <dt>No shows:</dt>
            <dd>2 or 3?</dd>
          </div>
          <div className="paper__row">
            <dt>Source:</dt>
            <dd>idk... fb maybe?</dd>
          </div>
          <div className="paper__row">
            <dt>Objections:</dt>
            <dd>spouse / money stuff</dd>
          </div>
          <div className="paper__row paper__row--faded">
            <dt>Notes:</dt>
            <dd>one guy said he&rsquo;ll call back tmrw... forgot his name</dd>
          </div>
        </dl>
        <div className="paper__scrawl">
          Submitted 11:47pm
          <RedCircle className="paper__scrawl-circle" />
        </div>
      </div>
    </div>
  );
}

export default function OldNew() {
  return (
    <section className="oldnew">
      <div className="container">
        <div className="protocol" data-reveal>
          <span className="protocol__index">01</span>
          <span className="protocol__eyebrow">The Old Way vs. The New Way with RevPhlo</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <div className="oldnew__grid" data-reveal-group>
          <figure className="exhibit oldnew__before" data-reveal>
            <PaperNote />
            <p className="sr-only">
              Example of a handwritten end-of-day report with guessed numbers and corrections.
            </p>
            <figcaption className="exhibit__caption">FIG. 01-A — THE OLD WAY</figcaption>
          </figure>
          <div className="oldnew__arrow" aria-hidden="true">
            <svg viewBox="0 0 48 24" width="48" height="24">
              <path d="M2 12h40M34 4l9 8-9 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="oldnew__arrow-dot" cx="6" cy="12" r="3" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div className="oldnew__after" data-reveal>
            <Counters>
              <DashboardMockup variant="excerpt" caption="FIG. 01-B — WITH REVPHLO" />
            </Counters>
          </div>
        </div>
      </div>
    </section>
  );
}

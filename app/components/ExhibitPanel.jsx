import { Icon } from "./Icons";

export default function ExhibitPanel({ id, before, after, beforeSummary }) {
  return (
    <figure className="exhibit comparison-figure">
      <div className="comparison">
        <section className="comparison__card comparison__card--before" aria-labelledby={`${id}-before`}>
          <header className="comparison__head">
            <span className="comparison__label comparison__label--before" id={`${id}-before`}>
              <span className="comparison__dot" aria-hidden="true" />
              Before
            </span>
            <span className="comparison__descriptor">Manual &amp; unreliable</span>
          </header>
          <div className="comparison__stage comparison__stage--before">{before}</div>
          <p className="sr-only">{beforeSummary}</p>
        </section>

        <span className="comparison__bridge" aria-hidden="true">
          <Icon name="arrow-right" size={18} />
        </span>

        <section className="comparison__card comparison__card--after" aria-labelledby={`${id}-after`}>
          <header className="comparison__head">
            <span className="comparison__label comparison__label--after" id={`${id}-after`}>
              <span className="comparison__dot" aria-hidden="true" />
              With RevPhlo
            </span>
            <span className="comparison__descriptor">Automatic &amp; live</span>
          </header>
          <div className="comparison__stage comparison__stage--after">{after}</div>
        </section>
      </div>

      <figcaption className="exhibit__caption comparison__caption">
        <span>THE OLD WAY</span>
        <span>WITH REVPHLO</span>
      </figcaption>
    </figure>
  );
}

import { RedUnderline } from "./RedPen";
import { Reveal } from "./motion-ui";

export default function Testimonial() {
  return (
    <section className="testimonial">
      <Reveal className="container testimonial__inner">
        <span className="testimonial__glyph" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="testimonial__quote">
          We threw away our EOD form the first week. RevPhlo gave us back{" "}
          <span className="testimonial__mark">
            10+ hours
            <RedUnderline className="testimonial__mark-stroke" />
          </span>{" "}
          and showed us exactly which funnels were{" "}
          <span className="testimonial__mark">
            bleeding cash
            <RedUnderline className="testimonial__mark-stroke" />
          </span>
          .
        </blockquote>
        <p className="testimonial__attr">
          <span className="testimonial__dash" aria-hidden="true" />
          Sales Director &middot; 8-Figure Sales Organization
        </p>
      </Reveal>
    </section>
  );
}

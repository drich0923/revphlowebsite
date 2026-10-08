"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./Icons";

const TF_SCRIPT = "https://embed.typeform.com/next/embed.js";

export default function BookDemo() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let script;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (document.querySelector(`script[src="${TF_SCRIPT}"]`)) return;
        script = document.createElement("script");
        script.src = TF_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (script) script.remove();
    };
  }, []);

  return (
    <section className="book" id="book" ref={sectionRef}>
      <div className="book__glow" aria-hidden="true" />
      <div className="container book__inner">
        <h2 className="h2 book__h2" data-reveal>
          <span>Find the leaks in your</span>{" "}
          <span className="book__accent book__accent--line">post-booking pipeline.</span>
        </h2>
        <p className="book__body" data-reveal>
          Bring your current GoHighLevel and Stripe setup. In 20 minutes, we&rsquo;ll map your
          post-booking pipeline and show you exactly where leads and attribution are falling
          through the cracks. No pitch decks.
        </p>
        <div className="book__card" data-reveal>
          <div data-tf-live="01KAT373J0V85ZJSJANAS65PEP" className="book__form">
            <span className="book__skeleton" aria-hidden="true" />
          </div>
        </div>
        <p className="book__trust">
          <Icon name="lock" size={13} />
          20-minute diagnostic &middot; No pitch decks
        </p>
      </div>
    </section>
  );
}

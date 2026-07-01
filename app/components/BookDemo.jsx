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
          Ditch the EOD form.
          <br />
          <span className="book__accent">See everything.</span>
        </h2>
        <p className="book__body" data-reveal>
          Book a 20-minute demo and we&rsquo;ll show you exactly how RevPhlo replaces your broken
          reporting with real-time sales intelligence.
        </p>
        <div className="book__card" data-reveal>
          <div data-tf-live="01KAT373J0V85ZJSJANAS65PEP" className="book__form">
            <span className="book__skeleton" aria-hidden="true" />
          </div>
        </div>
        <p className="book__trust">
          <Icon name="lock" size={13} />
          One-click OAuth &middot; Live in 48 hours
        </p>
      </div>
    </section>
  );
}

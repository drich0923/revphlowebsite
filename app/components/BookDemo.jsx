"use client";
import { useEffect, useRef, useState } from "react";
import { CONSENT_CHANGE_EVENT, OPEN_SETTINGS_EVENT } from "../consent/consent.mjs";
import { currentChoice } from "./consent-storage";
import { Icon } from "./Icons";

const TF_SCRIPT = "https://embed.typeform.com/next/embed.js";

export default function BookDemo() {
  const sectionRef = useRef(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(currentChoice() === "accepted");
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!allowed) return undefined;
    const el = sectionRef.current;
    if (!el) return undefined;
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
  }, [allowed]);

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
          {allowed ? (
            <div data-tf-live="01KAT373J0V85ZJSJANAS65PEP" className="book__form">
              <span className="book__skeleton" aria-hidden="true" />
            </div>
          ) : (
            <div className="book__form book__form--held">
              <p>The booking form is hosted by Typeform and sets cookies. Accept cookies to load it.</p>
              <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
                Cookie settings
              </button>
            </div>
          )}
        </div>
        <p className="book__trust">
          <Icon name="lock" size={13} />
          20-minute diagnostic &middot; No pitch decks
        </p>
      </div>
    </section>
  );
}

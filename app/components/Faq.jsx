"use client";
import { useState } from "react";
import { Icon } from "./Icons";
import { FAQ_ITEMS } from "./faq-data";

export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="faq" id="faq">
      <div className="container faq__grid">
        <div className="faq__left">
          <div className="protocol">
            <span className="protocol__index">06</span>
            <span className="protocol__eyebrow">Questions</span>
            <span className="protocol__tick" aria-hidden="true" />
          </div>
          <h2 className="h2">Everything you need to know</h2>
        </div>
        <div className="faq__list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq__item">
                <h3 className="faq__q">
                  <button
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq__index">Q.{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq__question">{item.q}</span>
                    <span className={`faq__plus ${isOpen ? "faq__plus--open" : ""}`}>
                      <Icon name="plus" size={16} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} className={`faq__panel ${isOpen ? "faq__panel--open" : ""}`}>
                  <div className="faq__panel-inner">
                    <p className="faq__answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

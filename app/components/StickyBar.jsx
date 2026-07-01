"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";

// Mobile-only bottom CTA: appears once the hero has scrolled away, hides
// while the #book section is on screen. CSS hides it while the mobile menu
// is open (body.menu-open) and above 768px.
export default function StickyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [bookVisible, setBookVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const book = document.getElementById("book");
    const ios = [];
    if (hero) {
      const io = new IntersectionObserver((entries) => {
        const e = entries[entries.length - 1];
        setPastHero(!e.isIntersecting && e.boundingClientRect.bottom < 0);
      });
      io.observe(hero);
      ios.push(io);
    }
    if (book) {
      const io = new IntersectionObserver((entries) => setBookVisible(entries[entries.length - 1].isIntersecting));
      io.observe(book);
      ios.push(io);
    }
    return () => ios.forEach((io) => io.disconnect());
  }, []);

  return (
    <div className={`stickybar ${pastHero && !bookVisible ? "stickybar--on" : ""}`}>
      <span className="stickybar__text">See everything.</span>
      <a href="#book" className="btn btn--primary btn--compact">
        Book a Demo
        <Icon name="arrow-right" size={15} className="btn__arrow" />
      </a>
    </div>
  );
}

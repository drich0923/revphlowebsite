"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "./Icons";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#howitworks" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${solid || open ? "nav--solid" : ""}`}>
      <div className="container nav__inner">
        <a href="/" className="nav__logo" aria-label="RevPhlo home">
          <Image src="/logo.png" alt="RevPhlo" width={132} height={26} className="nav__logo-img" priority />
        </a>
        <nav aria-label="Main" className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <a href="#book" className="btn btn--primary btn--compact">
            Book a Demo
            <Icon name="arrow-right" size={16} className="btn__arrow" />
          </a>
          <button
            ref={triggerRef}
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="nav__menu" hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav__menu-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

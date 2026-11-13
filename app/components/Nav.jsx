"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";
import { MotionLink } from "./motion-ui";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Integrations", href: "/integrations" },
  { label: "FAQ", href: "#faq" },
  { label: "See it in action", href: "/demo" },
];

function resolveHref(href, pathname) {
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const pathname = usePathname();

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

  // Close the panel if the viewport grows past the mobile breakpoint
  // (e.g. tablet rotation) — above 768px the burger is hidden and the
  // open panel would otherwise be stuck with no visible dismiss control.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => {
      if (!e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`nav ${solid || open ? "nav--solid" : ""}`}>
      <div className="container nav__inner">
        <a href="/" className="nav__logo" aria-label="RevPhlo home">
          <Image src="/logo.png" alt="RevPhlo" width={132} height={26} className="nav__logo-img" priority />
        </a>
        <nav aria-label="Main" className="nav__links">
          {LINKS.map((l) => {
            const href = resolveHref(l.href, pathname);
            const current = pathname === l.href;
            return (
              <a key={l.href} href={href} className={`nav__link${current ? " nav__link--current" : ""}`} aria-current={current ? "page" : undefined}>
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="nav__right">
          <MotionLink href="https://app.revphlo.com" className="btn btn--ghost btn--compact nav__login">
            Login
          </MotionLink>
          <MotionLink href={resolveHref("#book", pathname)} className="btn btn--primary btn--compact">
            Find Your Data Leaks
            <Icon name="arrow-right" size={16} className="btn__arrow" />
          </MotionLink>
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
      <nav id="mobile-menu" aria-label="Main" className="nav__menu" hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.href} href={resolveHref(l.href, pathname)} className="nav__menu-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="https://app.revphlo.com" className="nav__menu-link" onClick={() => setOpen(false)}>
          Login
        </a>
      </nav>
    </header>
  );
}

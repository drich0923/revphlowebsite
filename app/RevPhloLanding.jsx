"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── LOGO BASE64 ──
const LOGO_SRC = "data:image/png;base64,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";

// ── DESIGN TOKENS ──
const T = {
  blue: "#3361FF",
  blueLight: "#5B82FF",
  blueBg: "rgba(51,97,255,0.06)",
  blueBorder: "rgba(51,97,255,0.14)",
  green: "#10B981",
  greenLight: "#34D399",
  red: "#EF4444",
  redLight: "#F87171",
  amber: "#F59E0B",
  dark: "#0F1117",
  darkCard: "#1A1B23",
  text: "#0F1117",
  text2: "#4B5563",
  text3: "#9CA3AF",
  white: "#FFFFFF",
  bg: "#FAFBFC",
  border: "#E5E7EB",
  borderHover: "#D1D5DB",
};

// ── CUSTOM HOOKS ──
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useCounter(end, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, end, duration]);
  return val;
}

// Returns 0→1 as element scrolls through viewport
// 0 = element just entered bottom, 1 = element reached center
function useScrollProgress(offset = 0.3) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start when element enters viewport, complete when it hits center
      const start = windowH; // bottom of viewport
      const end = windowH * offset; // upper portion
      const current = rect.top;
      const p = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setProgress(p);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle(); // initial check
    return () => window.removeEventListener("scroll", handle);
  }, [offset]);
  return [ref, progress];
}

// ── REVEAL WRAPPER ──
function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StaggerChildren({ children, baseDelay = 0, stagger = 0.08, className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className} style={style}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${baseDelay + i * stagger}s, transform 0.5s ease ${baseDelay + i * stagger}s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// ── NAV ──
function Nav() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 40;
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 32px",
        background: scrolled ? "rgba(250,251,252,0.95)" : "rgba(250,251,252,0.8)",
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "all 0.3s",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#"><img src={LOGO_SRC} alt="RevPhlo" style={{ height: 26 }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "How It Works", "FAQ"].map((t) => (
            <a
              key={t}
              href={`#${t.toLowerCase().replace(/\s/g, "")}`}
              style={{ fontSize: 14, fontWeight: 500, color: T.text2, textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.color = T.text)}
              onMouseOut={(e) => (e.target.style.color = T.text2)}
            >
              {t}
            </a>
          ))}
          <a
            href="#book"
            style={{
              padding: "10px 24px", borderRadius: 10, background: T.blue, color: "#fff",
              fontWeight: 600, fontSize: 14, textDecoration: "none",
              boxShadow: "0 1px 3px rgba(51,97,255,0.2)", transition: "all 0.2s",
            }}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── HERO ──
function Hero() {
  const scrollY = useScrollY();
  return (
    <section style={{ padding: "160px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", height: 600,
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(51,97,255,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <Reveal>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 16px 7px 10px", borderRadius: 100,
            background: T.white, border: `1px solid ${T.border}`,
            fontSize: 13, fontWeight: 500, color: T.text2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)", marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 7, height: 7, borderRadius: "50%", background: T.green,
              boxShadow: `0 0 6px rgba(16,185,129,0.4)`,
              animation: "pulse 2s infinite",
            }}
          />
          Built for high-performing sales teams
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 1.08,
            letterSpacing: -1.5, maxWidth: 820, margin: "0 auto 24px",
          }}
        >
          Stop managing your sales team <em style={{ fontStyle: "italic", color: T.blue }}>blind</em>
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: T.text2, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.65 }}>
          Full visibility into what happens after the call is booked — who's closing, what's converting, and where your revenue is leaking.
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#book" className="btn-primary">
            Book a Demo <span className="arrow-icon">→</span>
          </a>
          <a href="#features" className="btn-ghost">See How It Works</a>
        </div>
      </Reveal>
    </section>
  );
}

// ── BEFORE / AFTER ──
function BeforeAfter() {
  const scrollY = useScrollY();
  return (
    <div style={{ padding: "80px 32px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{ textAlign: "center", fontFamily: "'Caveat', cursive", fontSize: 22, color: T.text3, marginBottom: 40 }}>
            Your sales floor today vs. tomorrow with RevPhlo
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", alignItems: "stretch" }}>
          {/* BEFORE - Messy Paper */}
          <Reveal delay={0.1}>
            <div
              style={{
                position: "relative", background: "#FFFEF7", border: "1px solid #E8E4D4",
                borderRadius: 4, padding: "36px 32px",
                boxShadow: "3px 4px 0 rgba(0,0,0,0.04)", transform: "rotate(-0.8deg)",
                overflow: "hidden",
              }}
            >
              {/* Lined paper */}
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(transparent, transparent 27px, #D4E0ED 27px, #D4E0ED 28px)", opacity: 0.3, pointerEvents: "none" }} />
              {/* Red margin */}
              <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 1, background: "rgba(220,80,80,0.2)", pointerEvents: "none" }} />
              {/* Dog ear */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, background: `linear-gradient(225deg, ${T.bg} 50%, #F0EDE0 50%)`, zIndex: 3 }} />
              {/* Tape */}
              <div style={{ position: "absolute", top: -4, left: "40%", width: 60, height: 20, background: "rgba(255,220,100,0.35)", border: "1px solid rgba(200,180,80,0.15)", borderRadius: 2, transform: "rotate(2deg)", zIndex: 3 }} />
              {/* Coffee stain */}
              <div style={{ position: "absolute", right: 20, bottom: 30, width: 80, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,90,43,0.08) 40%, rgba(139,90,43,0.02) 60%, transparent 70%)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 14, color: T.red, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>📋 End-of-Day Report</div>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 26, fontWeight: 700, marginBottom: 20, color: "#1a1a1a" }}>Tuesday EOD — Marcus J.</div>
                {[
                  { label: "Calls:", value: "6... no wait 7" },
                  { label: "Closes:", value: "2 (I think the 2nd went thru??)" },
                  { label: "Revenue:", value: null, custom: true },
                  { label: "No shows:", value: "2 or 3?", unclear: true },
                  { label: "Source:", value: "idk... fb maybe?" },
                  { label: "Objections:", value: "spouse / money stuff" },
                  { label: "Notes:", value: "one guy said he'll call back tmrw... forgot his name", unclear: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Caveat',cursive", fontSize: 14, color: "#666", width: 80, flexShrink: 0, paddingTop: 4 }}>{row.label}</span>
                    <div style={{ flex: 1, borderBottom: "1.5px solid #C5BFA8", paddingBottom: 4 }}>
                      {row.custom ? (
                        <span style={{ fontFamily: "'Caveat',cursive", fontSize: 18 }}>
                          <span style={{ textDecoration: "line-through", color: "#999" }}>$14,000</span>
                          <span style={{ color: "#2c3e6b", marginLeft: 8 }}>$11,500</span>
                        </span>
                      ) : (
                        <span style={{ fontFamily: "'Caveat',cursive", fontSize: 18, color: "#2c3e6b", opacity: row.unclear ? 0.5 : 1 }}>{row.value}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div style={{ position: "absolute", bottom: 25, right: 24, fontFamily: "'Caveat',cursive", color: T.red, fontSize: 15, fontWeight: 600, transform: "rotate(-6deg)" }}>
                  Submitted 11:47pm 😬
                </div>
              </div>
            </div>
          </Reveal>

          {/* Arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Reveal delay={0.3}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </Reveal>
          </div>

          {/* AFTER - Dashboard */}
          <Reveal delay={0.2}>
            <Dashboard scrollY={scrollY} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD COMPONENT ──
function Dashboard({ scrollY }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    setOffset((window.innerHeight / 2 - center) * 0.02);
  }, [scrollY]);

  const kpis = [
    [
      { label: "Cash Collected", val: "$570,133", change: "↗ 2.6%", up: true },
      { label: "Closes", val: "77", change: "↘ 8.5%", up: false },
      { label: "Close Rate", val: "20.2%", change: "↘ 37.7%", up: false },
    ],
    [
      { label: "Shows", val: "381", change: "↘ 74.0%", up: false },
      { label: "Show Rate", val: "55.5%", change: "↗ 116.3%", up: true },
      { label: "Calls", val: "695", change: "↘ 18.6%", up: false },
    ],
    [
      { label: "Cash / Show", val: "$1,496", change: "↘ 41.0%", up: false },
      { label: "Qualified", val: "74.8%", change: "↘ 40.0%", up: false },
      { label: "Sales Cycle", val: "5.5d", change: "↗ 329.6%", up: true },
    ],
  ];

  return (
    <div
      ref={ref}
      style={{
        background: T.dark, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
        transform: `rotate(0.3deg) translateY(${offset}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", background: "rgba(0,0,0,0.3)" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{ padding: 22, color: T.white }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Dashboard</div>
            <div style={{ fontSize: 11, color: T.text3 }}>📅 <span style={{ color: T.greenLight, fontWeight: 600 }}>This Month</span> · Feb 2026</div>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {["Today", "Week", "Month"].map((p, i) => (
              <span key={p} style={{ padding: "4px 10px", borderRadius: 5, fontSize: 10, fontWeight: 600, color: i === 2 ? "#fff" : "rgba(255,255,255,0.3)", background: i === 2 ? T.green : "transparent" }}>{p}</span>
            ))}
          </div>
        </div>
        {kpis.map((row, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: ri < 2 ? 8 : 0 }}>
            {row.map((k) => (
              <div key={k.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 10px" }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>{k.val}</div>
                <div style={{ fontSize: 9, fontWeight: 600, marginTop: 3, color: k.up ? T.greenLight : T.redLight }}>{k.change}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VSL ──
function VSL() {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Load Vidalytics
    const s = document.createElement("script");
    s.innerHTML = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl+'Script'],vlf=v[c][vl+'Loaded'],ve='Embed';
        if(!vsl){vsl=function(u,cb){if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
        if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
        i.getElementsByTagName("head")[0].appendChild(s);};}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_qY0sZQMIwMDYGr3T', 'https://fast.vidalytics.com/embeds/Xbxuo1Sw/qY0sZQMIwMDYGr3T/');
    `;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch(e) {} };
  }, []);

  return (
    <section style={{ padding: "100px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>See It In Action</div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1, marginBottom: 18 }}>
            3 minutes to see what<br />you've been missing
          </h2>
          <p style={{ fontSize: 17, color: T.text2, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.65 }}>
            Watch how RevPhlo replaces broken reporting with real-time sales intelligence — from connect to dashboard.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div ref={containerRef} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.1)", border: `1px solid ${T.border}` }}>
            <div id="vidalytics_embed_qY0sZQMIwMDYGr3T" style={{ width: "100%", position: "relative", paddingTop: "56.25%" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}


// ── FEATURE BLOCK ──
function FeatureBlock({ tag, title, desc, bullets, visual, reversed, paperNote, sheetNote, formNote }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const triggered = useRef(false);

  // Step 1: IntersectionObserver detects entry → show old way
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Step 2: Once visible, wait 2s then swap to new way
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSwapped(true), 2000);
    return () => clearTimeout(t);
  }, [visible]);

  const noteContent = paperNote || sheetNote || formNote;

  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
        alignItems: "center", marginBottom: 100,
        direction: reversed ? "rtl" : "ltr",
        maxWidth: 1140, margin: "0 auto 100px", padding: "0 32px",
      }}
    >
      {/* Text side */}
      <div
        style={{
          direction: "ltr",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 8, background: T.blueBg, border: `1px solid ${T.blueBorder}`, fontSize: 12, fontWeight: 600, color: T.blue, textTransform: "uppercase", letterSpacing: 1, marginBottom: 18 }}>{tag}</div>
        <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(24px,2.8vw,34px)", lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 14 }}>{title}</h3>
        <p style={{ color: T.text2, fontSize: 15, lineHeight: 1.65, marginBottom: 22 }}>{desc}</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: T.text2, lineHeight: 1.5 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: T.blueBg, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: T.blue, fontSize: 11, fontWeight: 800 }}>✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual side */}
      <div style={{ direction: "ltr", position: "relative", minHeight: 340 }}>
        {/* OLD WAY — starts visible, transitions out */}
        {noteContent && (
          <div
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "100%", maxWidth: formNote ? 360 : 380,
              zIndex: swapped ? 0 : 2,
              opacity: visible && !swapped ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${swapped ? 0.88 : 1}) rotate(${swapped ? (reversed ? 3 : -3) : (reversed ? 0.5 : -0.5)}deg)`,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: swapped ? "none" : "auto",
            }}
          >
            {formNote ? (
              <FormsWrapper>{formNote}</FormsWrapper>
            ) : sheetNote ? (
              <SheetsWrapper>{sheetNote}</SheetsWrapper>
            ) : (
              <div style={{ background: "#FFFEF7", border: "1px solid #E8E4D4", borderRadius: 4, padding: "24px 20px", boxShadow: "3px 4px 0 rgba(0,0,0,0.05), 0 8px 30px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(transparent, transparent 27px, #D4E0ED 27px, #D4E0ED 28px)", opacity: 0.3, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 1, background: "rgba(220,80,80,0.2)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 32, height: 32, background: `linear-gradient(225deg, ${T.bg} 50%, #F0EDE0 50%)`, zIndex: 3 }} />
                <div style={{ position: "absolute", top: -3, left: "35%", width: 50, height: 16, background: "rgba(255,220,100,0.4)", border: "1px solid rgba(200,180,80,0.15)", borderRadius: 2, transform: "rotate(2deg)", zIndex: 3 }} />
                {paperNote}
              </div>
            )}
          </div>
        )}

        {/* NEW WAY — dashboard slides up after transition */}
        <div
          style={{
            position: "relative",
            zIndex: swapped ? 2 : 0,
            opacity: swapped ? 1 : 0,
            transform: swapped ? "translateY(0) scale(1)" : "translateY(40px) scale(0.94)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
          }}
        >
          {visual}
        </div>
      </div>
    </div>
  );
}
// ── GOOGLE FORMS WRAPPER ──
function FormsWrapper({ children }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #DADCE0" }}>
      <div style={{ height: 8, background: "linear-gradient(90deg, #673AB7, #7B1FA2)" }} />
      <div style={{ background: "#fff", padding: "14px 18px 10px", borderBottom: "3px solid #673AB7" }}>
        <div style={{ fontSize: 16, fontWeight: 400, color: "#202124", marginBottom: 2 }}>End of Day Report</div>
        <div style={{ fontSize: 10, color: "#70757A" }}>Submit your daily numbers by 6pm. Required *</div>
      </div>
      <div style={{ background: "#F0EBF8", padding: "10px 12px" }}>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, required, value, error, radio }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #DADCE0", borderRadius: 8, padding: "14px 18px", marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: "#202124", marginBottom: 8 }}>
        {label} {required && <span style={{ color: "#D93025" }}>*</span>}
      </div>
      {radio ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {radio.map((opt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${opt.selected ? "#673AB7" : "#80868B"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {opt.selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#673AB7" }} />}
              </div>
              <span style={{ fontSize: 11, color: "#202124" }}>{opt.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ borderBottom: `1.5px solid ${error ? "#D93025" : "#80868B"}`, paddingBottom: 4 }}>
          <span style={{ fontSize: 12, color: value ? "#202124" : "#80868B" }}>{value || "Short answer text"}</span>
        </div>
      )}
      {error && <div style={{ fontSize: 10, color: "#D93025", marginTop: 4 }}>⚠ {error}</div>}
    </div>
  );
}
// ── DARK VISUAL CARD ──
function DarkVisual({ children }) {
  return (
    <div style={{ background: T.dark, borderRadius: 18, padding: 26, position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", color: "#fff" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(51,97,255,0.06), transparent 40%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── GOOGLE SHEETS WRAPPER ──
function SheetsWrapper({ children }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #C8C8C8" }}>
      <div style={{ background: "#188038", padding: "7px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <rect x="0" y="0" width="16" height="20" rx="2" fill="#fff" />
          <rect x="2" y="3" width="5" height="2" rx="0.5" fill="#188038" />
          <rect x="9" y="3" width="5" height="2" rx="0.5" fill="#188038" />
          <rect x="2" y="7" width="5" height="2" rx="0.5" fill="#188038" opacity="0.5" />
          <rect x="9" y="7" width="5" height="2" rx="0.5" fill="#188038" opacity="0.5" />
          <rect x="2" y="11" width="5" height="2" rx="0.5" fill="#188038" opacity="0.3" />
          <rect x="9" y="11" width="5" height="2" rx="0.5" fill="#188038" opacity="0.3" />
        </svg>
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 500, flex: 1 }}>Sales Tracker — Feb 2026.xlsx</span>
        <div style={{ display: "flex", gap: 4 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>
      <div style={{ background: "#EEF0F2", padding: "4px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #D9DDE0" }}>
        <span style={{ fontSize: 10, color: "#5F6368", fontWeight: 500 }}>D7</span>
        <div style={{ width: 1, height: 14, background: "#D9DDE0" }} />
        <span style={{ fontSize: 10, color: "#C53929", fontFamily: "monospace", fontStyle: "italic" }}>=SUMIF(B:B,"Meta",D:D)</span>
      </div>
      <div style={{ background: "#fff" }}>{children}</div>
      <div style={{ background: "#EEF0F2", padding: "4px 10px", display: "flex", gap: 2, borderTop: "1px solid #D9DDE0" }}>
        <span style={{ padding: "3px 12px", background: "#fff", borderRadius: "4px 4px 0 0", fontSize: 10, color: "#188038", fontWeight: 600, border: "1px solid #D9DDE0", borderBottom: "1px solid #fff" }}>Revenue</span>
        <span style={{ padding: "3px 12px", fontSize: 10, color: "#80868B" }}>Closers</span>
        <span style={{ padding: "3px 12px", fontSize: 10, color: "#80868B" }}>Payments ⚠️</span>
      </div>
    </div>
  );
}

// ── SHEETS CELL GRID ──
function SheetsGrid({ columns, rows, highlightErrors }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: `32px ${columns.map(c => c.width || "1fr").join(" ")}`, borderBottom: "1px solid #E1E3E5" }}>
        <div style={{ background: "#F8F9FA", padding: "4px 0", textAlign: "center", fontSize: 10, color: "#80868B", borderRight: "1px solid #E1E3E5" }} />
        {columns.map((col, ci) => (
          <div key={ci} style={{ background: "#F8F9FA", padding: "4px 6px", textAlign: "center", fontSize: 10, color: "#80868B", fontWeight: 500, borderRight: ci < columns.length - 1 ? "1px solid #E1E3E5" : "none" }}>
            {String.fromCharCode(65 + ci)}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `32px ${columns.map(c => c.width || "1fr").join(" ")}`, borderBottom: "2px solid #E1E3E5" }}>
        <div style={{ background: "#F8F9FA", padding: "5px 0", textAlign: "center", fontSize: 10, color: "#80868B", borderRight: "1px solid #E1E3E5" }}>1</div>
        {columns.map((col, ci) => (
          <div key={ci} style={{ padding: "5px 8px", fontSize: 11, fontWeight: 700, color: "#202124", borderRight: ci < columns.length - 1 ? "1px solid #E1E3E5" : "none", background: "#fff" }}>
            {col.label}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `32px ${columns.map(c => c.width || "1fr").join(" ")}`, borderBottom: "1px solid #E1E3E5" }}>
          <div style={{ background: "#F8F9FA", padding: "5px 0", textAlign: "center", fontSize: 10, color: "#80868B", borderRight: "1px solid #E1E3E5" }}>{ri + 2}</div>
          {row.map((cell, ci) => {
            const isError = highlightErrors && typeof cell === "string" && (cell.includes("#REF") || cell.includes("#N/A") || cell.includes("#VALUE") || cell.includes("#DIV/0"));
            const isStrikethrough = typeof cell === "object" && cell.strike;
            const cellValue = typeof cell === "object" ? cell.value : cell;
            const cellColor = typeof cell === "object" && cell.color ? cell.color : (isError ? "#C53929" : "#202124");
            const cellBg = typeof cell === "object" && cell.bg ? cell.bg : (isError ? "#FCE8E6" : "#fff");
            return (
              <div
                key={ci}
                style={{
                  padding: "5px 8px", fontSize: 11, color: cellColor, background: cellBg,
                  borderRight: ci < row.length - 1 ? "1px solid #E1E3E5" : "none",
                  fontFamily: isError ? "monospace" : "inherit",
                  textDecoration: isStrikethrough ? "line-through" : "none",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}
              >
                {cellValue}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── FEATURES SECTION ──
function Features() {
  return (
    <section id="features">
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "120px 32px 0" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Before → After</div>
            <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1 }}>
              Replace every broken process<br />with a system that scales
            </h2>
          </div>
        </Reveal>
      </div>

      {/* Feature 1: AI Post-Call Notes */}
      <FeatureBlock
          tag="⚡ AI Post-Call Notes"
          title="From sloppy EODs to auto-generated post-call notes"
          desc="No more Slack messages at 11pm with guessed numbers. RevPhlo pulls from Fathom recordings and writes the report for your reps."
          bullets={["Captures outcome, objections, and next steps automatically", "One-click link to full recording for coaching", "Replaces manual EODs entirely"]}
          formNote={
            <>
              <FormField label="How many calls did you take today?" required value="7... actually maybe 6?" error="Please enter a number" />
              <FormField label="Total cash collected" required value="$14,000" error="Does not match Stripe ($11,500)" />
              <FormField label="Lead source for your closes" required value="" error="This field is required" />
              <FormField label="Call outcome" required radio={[
                { label: "Closed — Full Pay", selected: false },
                { label: "Closed — Payment Plan", selected: true },
                { label: "Follow Up", selected: false },
              ]} />
            </>
          }
          visual={
            <DarkVisual>
              {[
                { badge: "✓ Closed", badgeColor: T.greenLight, badgeBg: "rgba(16,185,129,0.14)", prospect: "Alan M. — Omaha, NE", cash: "$7,100", objection: "Authority — spouse", source: "Meta · Webinar Funnel" },
                { badge: "↻ Follow Up", badgeColor: T.amber, badgeBg: "rgba(245,158,11,0.14)", prospect: "Sarah K. — Austin, TX", objection: "Financial — checking budget", nextStep: "Callback Thu 2pm" },
              ].map((card, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 18, marginBottom: i === 0 ? 12 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: card.badgeBg, color: card.badgeColor }}>{card.badge}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: "rgba(51,97,255,0.1)", border: "1px solid rgba(51,97,255,0.18)", fontSize: 10, color: T.blueLight, fontWeight: 700 }}>⚡ AI Generated</span>
                  </div>
                  {[
                    ["Prospect", card.prospect],
                    card.cash && ["Cash", card.cash],
                    ["Objection", card.objection],
                    card.source && ["Source", card.source],
                    card.nextStep && ["Next Step", card.nextStep],
                  ].filter(Boolean).map(([lbl, val]) => (
                    <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13 }}>
                      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{lbl}</span>
                      <span style={{ fontWeight: 500, color: lbl === "Cash" ? T.greenLight : "#fff" }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </DarkVisual>
          }
        />

        {/* Feature 2: Attribution */}
        <FeatureBlock
          reversed
          tag="📊 Full Attribution"
          title='From "I think it was Facebook" to full revenue attribution'
          desc="Slice revenue by closer, traffic source, funnel, setter — any combination. Every dollar traced to where it actually came from."
          bullets={["Revenue by closer × source × funnel", "See which setters book highest-converting leads", "Source mapping from GHL tags, fields, UTMs"]}
          sheetNote={
            <SheetsGrid
              columns={[
                { label: "Source", width: "80px" },
                { label: "Closer", width: "70px" },
                { label: "Revenue", width: "72px" },
                { label: "% of Total", width: "68px" },
              ]}
              highlightErrors
              rows={[
                ["Meta", "Kyle", "$45,200", "=D2/SUM(D:D)"],
                ["Meta", "Justin", "$31,000", "=D3/SUM(D:D)"],
                ["Google", { value: "#REF!", color: "#C53929", bg: "#FCE8E6" }, { value: "#REF!", color: "#C53929", bg: "#FCE8E6" }, { value: "#REF!", color: "#C53929", bg: "#FCE8E6" }],
                ["Organic", "Cami", "$18,500", { value: "#DIV/0!", color: "#C53929", bg: "#FCE8E6" }],
                [{ value: "DM?? idk", color: "#80868B" }, { value: "???", color: "#80868B" }, { value: "$12,000", color: "#80868B" }, ""],
                ["", "", { value: "=SUM(D2:D6)", color: "#C53929" }, { value: "#VALUE!", color: "#C53929", bg: "#FCE8E6" }],
              ]}
            />
          }
          visual={<AttributionVisual />}
        />

        {/* Feature 3: Leaderboard */}
        <FeatureBlock
          tag="🏆 Rep Portal"
          title="From spreadsheet chaos to live leaderboards"
          desc="Kill the Google Sheet that breaks every month. Every rep gets their own portal with KPIs, tasks, and shareable wins."
          bullets={["Personal dashboard with pending PCNs", "Leaderboards by cash, closes, close rate", "Shareable wins — one-click to Slack or IG"]}
          sheetNote={
            <SheetsGrid
              columns={[
                { label: "Rank", width: "40px" },
                { label: "Rep", width: "72px" },
                { label: "Closes", width: "50px" },
                { label: "Revenue", width: "72px" },
                { label: "Rate", width: "52px" },
              ]}
              highlightErrors
              rows={[
                ["1", "Kyle M.", "14", "$78,200", "38%"],
                [{ value: "2", strike: true }, { value: "Cami L.", strike: true }, { value: "11", strike: true }, { value: "$62,100", strike: true }, { value: "32%", strike: true }],
                ["2", "Justin R.", "12", "$61,800", "35%"],
                ["3", "Cami L.", { value: "11? 12?", color: "#80868B" }, { value: "$55,900", color: "#80868B" }, { value: "#N/A", color: "#C53929", bg: "#FCE8E6" }],
                ["4", "Derek W.", "9", "$43,800", "29%"],
                [{ value: "", color: "#80868B" }, { value: "^^ need to recount", color: "#C53929" }, "", { value: "=SUM(D2:D6)", color: "#C53929" }, ""],
              ]}
            />
          }
          visual={<LeaderboardVisual />}
        />

        {/* Feature 4: Payment Matching */}
        <FeatureBlock
          reversed
          tag="💳 Payment Matching"
          title='From "who paid with that email?" to instant match'
          desc="The appointment email and the payment email are almost never the same. RevPhlo lets you match any payment to the correct call in seconds."
          bullets={["Search by name, email, or date", "Auto-syncs setter, closer, and source", "Commission tracking with custom splits"]}
          paperNote={
            <div style={{ fontFamily: "'Caveat',cursive", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 700 }}>Unmatched payments?!</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>rodriguez_m@ — $4,500</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>jsmith99@ — $7,000</div>
              <div style={{ fontSize: 13, color: T.red, marginTop: 4 }}>WHO ARE THESE PEOPLE</div>
            </div>
          }
          visual={<PaymentVisual />}
        />
    </section>
  );
}

function AttributionVisual() {
  const groups = [
    { name: "Phone Setter", total: "$314,783", rows: [
      { name: "Marcus T.", amt: "$58,700", w: "52%", color: T.greenLight },
      { name: "Kyle P.", amt: "$47,500", w: "42%", color: T.blueLight },
      { name: "Spencer K.", amt: "$30,000", w: "27%", color: T.amber },
    ]},
    { name: "DM Setter", total: "$143,450", rows: [
      { name: "Chris P.", amt: "$38,600", w: "40%", color: T.greenLight },
      { name: "Rohail A.", amt: "$31,600", w: "33%", color: T.blueLight },
      { name: "Spencer K.", amt: "$15,000", w: "16%", color: T.amber },
    ]},
    { name: "Direct", total: "$99,600", rows: [
      { name: "Spencer K.", amt: "$22,500", w: "34%", color: T.greenLight },
      { name: "Chris P.", amt: "$16,500", w: "25%", color: T.blueLight },
      { name: "Samuel L.", amt: "$16,500", w: "25%", color: T.amber },
    ]},
  ];
  return (
    <DarkVisual>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Revenue by Source</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>This Month</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          <span>Viewing</span>
          <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 5, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Booking Source ▾</span>
          <span>by</span>
          <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 5, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Closer ▾</span>
        </div>
      </div>
      {groups.map((g, gi) => (
        <div key={g.name} style={{ marginBottom: gi < groups.length - 1 ? 14 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{g.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{g.total}</span>
          </div>
          {g.rows.map((r) => (
            <div key={r.name + g.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ height: 5, borderRadius: 3, background: r.color, width: r.w }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{r.name}</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: "auto" }}>{r.amt}</span>
            </div>
          ))}
        </div>
      ))}
    </DarkVisual>
  );
}

function LeaderboardVisual() {
  const reps = [
    { rank: 1, name: "Kyle M.", rate: "38.2%", cash: "$84,200" },
    { rank: 2, name: "Justin R.", rate: "35.1%", cash: "$67,500" },
    { rank: 3, name: "Cami L.", rate: "31.7%", cash: "$55,900" },
    { rank: 4, name: "Derek W.", rate: "29.4%", cash: "$43,800" },
  ];
  return (
    <DarkVisual>
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginBottom: 14, fontWeight: 600 }}>Leaderboard — This Month</div>
      {reps.map((r) => (
        <div key={r.rank} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: 14, alignItems: "center", background: "rgba(255,255,255,0.05)", border: `1px solid ${r.rank === 1 ? "rgba(51,97,255,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius: 10, padding: "13px 14px", marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, background: r.rank === 1 ? T.blue : "rgba(255,255,255,0.06)", color: r.rank === 1 ? "#fff" : "rgba(255,255,255,0.4)" }}>{r.rank}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{r.rate}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.greenLight }}>{r.cash}</div>
        </div>
      ))}
    </DarkVisual>
  );
}

function PaymentVisual() {
  return (
    <DarkVisual>
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16, marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Unmatched Payment</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>rodriguez_m@gmail.com</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Stripe · Feb 14 · ****4821</div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: T.greenLight }}>$4,500</div>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 18, margin: "4px 0" }}>↓</div>
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(51,97,255,0.3)", borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 10, color: T.blueLight, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700, marginBottom: 6 }}>✓ Matched Appointment</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12 }}>
          {[["Prospect", "Maria Rodriguez"], ["Closer", "Cami L."], ["Setter", "Zoha A."], ["Source", "Organic · DM"]].map(([l, v]) => (
            <div key={l}><span style={{ color: "rgba(255,255,255,0.3)" }}>{l}</span><br /><span style={{ fontWeight: 500 }}>{v}</span></div>
          ))}
        </div>
      </div>
    </DarkVisual>
  );
}

// ── TESTIMONIAL ──
function Testimonial() {
  return (
    <section style={{ padding: "100px 32px", background: T.white }}>
      <Reveal>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 80, color: T.blue, opacity: 0.12, fontFamily: "'DM Serif Display',serif", lineHeight: 1 }}>"</div>
          <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.4, letterSpacing: -0.5, marginBottom: 28 }}>
            We threw away our EOD form the first week. RevPhlo gave us back 10+ hours and showed us exactly which funnels were bleeding cash.
          </p>
          <p style={{ fontSize: 14, color: T.text3, fontWeight: 500 }}>
            <strong style={{ color: T.text, fontWeight: 600 }}>Sales Director</strong> · 8-Figure Sales Organization
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ── HOW IT WORKS ──
function HowItWorks() {
  const steps = [
    { num: "01", title: "Connect your tools", desc: "One-click OAuth with GoHighLevel, Zoom, Stripe, Fathom, and more. No developers needed." },
    { num: "02", title: "Map your sources", desc: "Tell RevPhlo how to identify paid vs. organic, which funnels map to which tags, and your calendar structure." },
    { num: "03", title: "See everything", desc: "Dashboard is live. Every call auto-dispositioned. Every dollar attributed. Drill into anything." },
  ];
  return (
    <section style={{ padding: "120px 32px", textAlign: "center" }} id="howitworks">
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1, marginBottom: 18 }}>Live in 48 hours, not 48 days</h2>
          <p style={{ fontSize: 17, color: T.text2, maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.65 }}>Connect your stack. Map your sources. See everything.</p>
        </Reveal>
        <StaggerChildren stagger={0.12} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.num} className="hover-card" style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 18, padding: "36px 28px", textAlign: "left", transition: "all 0.3s" }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 52, color: T.blue, opacity: 0.12, lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: T.text2, fontSize: 14.5, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ── INTEGRATIONS ──
function Integrations() {
  const items = [
    { name: "GoHighLevel", logo: "data:image/png;base64,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" },
    { name: "Zoom", logo: "data:image/png;base64,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" },
    { name: "Stripe", logo: "data:image/png;base64,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" },
    { name: "Fathom", logo: "data:image/png;base64,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" },
    { name: "Zapier", logo: "data:image/png;base64,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" },
    { name: "Slack", logo: "data:image/png;base64,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" },
    { name: "Whop", logo: "data:image/png;base64,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" },
  ];
  return (
    <section style={{ padding: "120px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Integrations</div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1 }}>Plugs into your existing stack</h2>
        </Reveal>
        <StaggerChildren stagger={0.06} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 48 }}>
          {items.map((it) => (
            <div key={it.name} className="hover-card" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 22px", borderRadius: 14, background: T.white, border: `1px solid ${T.border}`, fontSize: 15, fontWeight: 500, transition: "all 0.25s" }}>
              <img src={it.logo} alt={it.name} style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover" }} />
              {it.name}
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}


// ── FAQ ──
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "What CRM / tech stack does RevPhlo work with?", a: "RevPhlo integrates with GoHighLevel, Zoom, Stripe, Fathom, Zapier, Slack, and Whop via one-click OAuth. If your leads flow through GHL and calls are recorded on Fathom, you're good to go." },
    { q: "How long does setup take?", a: "Most teams are fully live within 48 hours. Connect your integrations, map your sources and calendars, and your dashboard starts populating immediately." },
    { q: "How do the AI post-call notes work?", a: "RevPhlo pulls from your Fathom call recordings and uses AI to auto-generate post-call notes — outcome, objection type, prospect details, follow-up actions. Reps just review and confirm. No manual EODs needed." },
    { q: "What kind of teams is RevPhlo built for?", a: "High-ticket coaching businesses, agencies, SaaS companies, and enterprise sales orgs running sales teams at scale. Whether you're an SMB with 5 reps or an enterprise with 50, if you need post-booking visibility, RevPhlo is built for you." },
    { q: "Can my sales reps see their own data?", a: "Yes — every rep gets their own portal with personal KPIs, a daily task queue, call recordings, and shareable leaderboard wins." },
    { q: "How does payment matching work?", a: "Stripe payments sync automatically. When the paying email doesn't match the appointment email, search by name or date, match it to the right call, and all attribution data syncs instantly." },
  ];
  return (
    <section style={{ padding: "120px 32px", textAlign: "center" }} id="faq">
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Questions</div>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1 }}>Everything you need to know</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 700, margin: "56px auto 0", textAlign: "left" }}>
            {items.map((it, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", cursor: "pointer", fontSize: 16, fontWeight: 600, color: T.text, gap: 16, transition: "color 0.2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = T.blue)}
                  onMouseOut={(e) => (e.currentTarget.style.color = T.text)}
                >
                  {it.q}
                  <span style={{ fontSize: 20, color: T.text3, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
                </div>
                <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.35s ease, padding 0.35s ease", paddingBottom: open === i ? 22 : 0 }}>
                  <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.65 }}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── BOOK DEMO ──
function BookDemo() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://embed.typeform.com/next/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch(e) {} };
  }, []);

  return (
    <section style={{ padding: "120px 32px", textAlign: "center" }} id="book">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1, marginBottom: 18 }}>
            Ditch the EOD form.<br /><em style={{ fontStyle: "italic", color: T.blue }}>See everything.</em>
          </h2>
          <p style={{ fontSize: 17, color: T.text2, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.65 }}>
            Book a 20-minute demo and we'll show you exactly how RevPhlo replaces your broken reporting with real-time sales intelligence.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ borderRadius: 16, overflow: "hidden", minHeight: 500 }}>
            <div data-tf-live="01KAT373J0V85ZJSJANAS65PEP" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── DIVIDER ──
function Divider() {
  return <div style={{ height: 1, background: T.border }} />;
}

// ── MAIN ──
export default function RevPhloLanding() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: T.bg, color: T.text, lineHeight: 1.6, overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 12px; background: ${T.blue};
          color: #fff; font-weight: 600; font-size: 15px; text-decoration: none;
          transition: all 0.25s; box-shadow: 0 2px 10px rgba(51,97,255,0.2);
          border: none; cursor: pointer;
        }
        .btn-primary:hover { box-shadow: 0 6px 20px rgba(51,97,255,0.28); transform: translateY(-2px); }
        .btn-primary:hover .arrow-icon { transform: translateX(3px); }
        .arrow-icon { display: inline-block; transition: transform 0.2s; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 12px; background: transparent;
          border: 1px solid ${T.border}; color: ${T.text}; font-weight: 600;
          font-size: 15px; text-decoration: none; transition: all 0.25s;
        }
        .btn-ghost:hover { border-color: ${T.borderHover}; background: ${T.white}; transform: translateY(-2px); }
        .hover-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
      `}</style>

      <Nav />
      <Hero />
      <BeforeAfter />
      <VSL />
      <Divider />
      <Features />
      <Testimonial />
      <Divider />
      <HowItWorks />
      <Divider />
      <Integrations />
      <Divider />
      <FAQ />
      <Divider />
      <BookDemo />
      <footer style={{ padding: "40px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: T.text3 }}>© 2025 RevPhlo. All rights reserved.</p>
      </footer>
    </div>
  );
}

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
    let raf = null;
    const h = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = null;
      });
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => {
      window.removeEventListener("scroll", h);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
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

// ── REVEAL WRAPPER ──
function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reducedMotion || visible ? "translateY(0)" : "translateY(28px)",
        transition: reducedMotion ? "none" : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StaggerChildren({ children, baseDelay = 0, stagger = 0.08, className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div ref={ref} className={className} style={style}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: reducedMotion || visible ? "translateY(0)" : "translateY(24px)",
                transition: reducedMotion ? "none" : `opacity 0.5s ease ${baseDelay + i * stagger}s, transform 0.5s ease ${baseDelay + i * stagger}s`,
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
              className="nav-link"
              style={{ fontSize: 14, fontWeight: 500, color: T.text2, textDecoration: "none" }}
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
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (reducedMotion) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    setOffset((window.innerHeight / 2 - center) * 0.02);
  }, [scrollY, reducedMotion]);

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
        transform: reducedMotion ? "none" : `rotate(0.3deg) translateY(${offset}px)`,
        transition: reducedMotion ? "none" : "transform 0.1s linear",
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
function FeatureBlock({ tag, title, desc, bullets, visual, reversed, paperNote }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 100, direction: reversed ? "rtl" : "ltr" }}>
      <Reveal style={{ direction: "ltr" }}>
        <div style={{ direction: "ltr" }}>
          <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 8, background: T.blueBg, border: `1px solid ${T.blueBorder}`, fontSize: 12, fontWeight: 600, color: T.blue, textTransform: "uppercase", letterSpacing: 1, marginBottom: 18 }}>{tag}</div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 14 }}>{title}</h3>
          <p style={{ color: T.text2, fontSize: 15.5, lineHeight: 1.65, marginBottom: 24 }}>{desc}</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: T.text2, lineHeight: 1.5 }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: T.blueBg, border: `1px solid ${T.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: T.blue, fontSize: 11, fontWeight: 800 }}>✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.15} style={{ direction: "ltr", position: "relative" }}>
        <div style={{ direction: "ltr", position: "relative" }}>
          {paperNote && (
            <div style={{ position: "absolute", ...(reversed ? { bottom: -15, right: -15 } : { top: -20, left: -20 }), width: "50%", zIndex: 0, opacity: 0.45 }}>
              <div style={{ background: "#FFFEF7", border: "1px solid #E8E4D4", borderRadius: 3, padding: 14, boxShadow: "2px 3px 0 rgba(0,0,0,0.03)", transform: reversed ? "rotate(1deg)" : "rotate(-1.5deg)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(transparent, transparent 27px, #D4E0ED 27px, #D4E0ED 28px)", opacity: 0.25, pointerEvents: "none" }} />
                {paperNote}
              </div>
            </div>
          )}
          <div style={{ position: "relative", zIndex: 1, marginLeft: reversed ? 0 : 30 }}>
            {visual}
          </div>
        </div>
      </Reveal>
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

// ── FEATURES SECTION ──
function Features() {
  return (
    <section style={{ padding: "120px 32px" }} id="features">
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Before → After</div>
            <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,50px)", lineHeight: 1.12, letterSpacing: -1 }}>
              Replace every broken process<br />with a system that scales
            </h2>
          </div>
        </Reveal>

        {/* Feature 1: AI Post-Call Notes */}
        <FeatureBlock
          tag="⚡ AI Post-Call Notes"
          title="From sloppy EODs to auto-generated post-call notes"
          desc="No more Slack messages at 11pm with guessed numbers. RevPhlo pulls from Fathom recordings and writes the report for your reps."
          bullets={["Captures outcome, objections, and next steps automatically", "One-click link to full recording for coaching", "Replaces manual EODs entirely"]}
          paperNote={
            <div style={{ fontFamily: "'Caveat',cursive", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 700, marginBottom: 6 }}>EOD — Marcus</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>Calls: 7ish</div>
              <div style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>Close: $14k</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>Close: $11.5k</div>
              <div style={{ fontSize: 13, color: T.red, marginTop: 4 }}>Source: idk fb??</div>
            </div>
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
          paperNote={
            <div style={{ fontFamily: "'Caveat',cursive", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 700 }}>Revenue by source??</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>Phone sets: $300k???</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>DM sets: no clue</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>Direct: does anyone track this?</div>
              <div style={{ fontSize: 13, color: T.red, marginTop: 6 }}>Which closers on which sources?! 🤦</div>
            </div>
          }
          visual={<AttributionVisual />}
        />

        {/* Feature 3: Leaderboard */}
        <FeatureBlock
          tag="🏆 Rep Portal"
          title="From spreadsheet chaos to live leaderboards"
          desc="Kill the Google Sheet that breaks every month. Every rep gets their own portal with KPIs, tasks, and shareable wins."
          bullets={["Personal dashboard with pending PCNs", "Leaderboards by cash, closes, close rate", "Shareable wins — one-click to Slack or IG"]}
          paperNote={
            <div style={{ fontFamily: "'Caveat',cursive", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 700 }}>Leaderboard (Jan)</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>1. Kyle — $78k?</div>
              <div style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>2. Cami — $62k</div>
              <div style={{ fontSize: 13, color: "#2c3e6b" }}>2. Justin — $61k</div>
              <div style={{ fontSize: 13, color: T.red, marginTop: 4 }}>wait need to recount...</div>
            </div>
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
      </div>
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
    { name: "GoHighLevel", color: "#22C55E", letter: "G" },
    { name: "Zoom", color: "#2D8CFF", letter: "Z" },
    { name: "Stripe", color: "#635BFF", letter: "S" },
    { name: "Fathom", color: "#7C3AED", letter: "F" },
    { name: "Zapier", color: "#FF6D00", letter: "Z" },
    { name: "Slack", color: "#E01E5A", letter: "S" },
    { name: "Whop", color: "#3B82F6", letter: "W" },
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
              <span style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", background: it.color }}>{it.letter}</span>
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
                  className="faq-row"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", cursor: "pointer", fontSize: 16, fontWeight: 600, color: T.text, gap: 16, transition: "color 0.2s" }}
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
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: ${T.text}; }
        .faq-row:hover { color: ${T.blue}; }
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

        @media (max-width: 1024px) {
          nav > div > div { gap: 18px !important; }
        }

        @media (max-width: 800px) {
          nav { padding: 10px 14px !important; }
          nav a img { height: 22px !important; }
          nav > div > div a[href^="#"]:not([href="#book"]) { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation: none !important; transition: none !important; }
          .btn-primary:hover, .btn-ghost:hover, .hover-card:hover { transform: none !important; }
        }
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

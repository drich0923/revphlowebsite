import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS (matches main site) ──
export const T = {
  blue: "#3361FF", bg: "#FAFAFA", white: "#FFFFFF",
  text: "#111827", text2: "#6B7280", text3: "#9CA3AF",
  border: "#E5E7EB", borderHover: "#D1D5DB", green: "#10B981",
};

// ── LOGO (same base64 as main site) ──
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaoAAABgCAYAAABMizaQAAB6iUlEQVR42u19dbwkxbV/";
// NOTE: Replace with the full LOGO_SRC from your main RevPhloLanding.jsx

// ── NAV ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px",
        background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "all 0.35s",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="https://revphlo.com" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src={LOGO_SRC} alt="RevPhlo" style={{ height: 30, width: "auto" }} />
          <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 20, color: T.text, letterSpacing: -0.5 }}>RevPhlo</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-links">
          <a href="https://revphlo.com/#features" style={{ fontSize: 14, fontWeight: 500, color: T.text2, textDecoration: "none" }}>Features</a>
          <a href="https://revphlo.com/#howitworks" style={{ fontSize: 14, fontWeight: 500, color: T.text2, textDecoration: "none" }}>How It Works</a>
          <a href="https://revphlo.com/#faq" style={{ fontSize: 14, fontWeight: 500, color: T.text2, textDecoration: "none" }}>FAQ</a>
          <a href="https://revphlo.com/#book" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            Book a Demo <span className="arrow-icon">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── ARTICLE LAYOUT ──
export default function ArticleLayout({ metaTitle, metaDescription, children }) {
  const dotBg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMS4yIiBmaWxsPSJyZ2JhKDUxLDk3LDI1NSwwLjA4KSIvPjwvc3ZnPg==";
  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        backgroundColor: T.bg,
        backgroundImage: `url("${dotBg}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "24px 24px",
        color: T.text,
        lineHeight: 1.6,
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
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

        /* ── ARTICLE TYPOGRAPHY ── */
        .article-body h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(32px, 4.5vw, 48px);
          line-height: 1.12;
          letter-spacing: -1px;
          margin-bottom: 24px;
          color: ${T.text};
        }
        .article-body h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-top: 56px;
          margin-bottom: 18px;
          color: ${T.text};
        }
        .article-body h3 {
          font-size: 18px;
          font-weight: 700;
          margin-top: 40px;
          margin-bottom: 12px;
          color: ${T.text};
        }
        .article-body p {
          font-size: 16px;
          line-height: 1.75;
          color: #374151;
          margin-bottom: 20px;
        }
        .article-body strong {
          font-weight: 600;
          color: ${T.text};
        }

        @media (max-width: 768px) {
          .nav-links a:not(:last-child) { display: none !important; }
          .nav-links { gap: 0 !important; }
        }
      `}</style>

      <Nav />

      {/* Article container */}
      <article
        className="article-body"
        style={{
          maxWidth: 740,
          margin: "0 auto",
          padding: "140px 32px 80px",
        }}
      >
        {/* White card wrapper */}
        <div
          style={{
            background: T.white,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: "clamp(32px, 5vw, 64px)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          {children}
        </div>
      </article>

      {/* CTA Band */}
      <section style={{ padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(28px,3.5vw,40px)", lineHeight: 1.12, letterSpacing: -0.5, marginBottom: 16, marginTop: 0 }}>
            See RevPhlo with your own data
          </h2>
          <p style={{ fontSize: 16, color: T.text2, marginBottom: 32, lineHeight: 1.65 }}>
            Book a 20-minute demo. We'll connect to your CRM and payment processor live on the call.
          </p>
          <a href="https://revphlo.com/#book" className="btn-primary">
            Book a Demo <span className="arrow-icon">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px 32px 36px", textAlign: "center", borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
          <a href="https://revphlo.com" style={{ fontSize: 13, color: T.text3, textDecoration: "none" }}>Home</a>
          <a href="https://revphlo.com/#features" style={{ fontSize: 13, color: T.text3, textDecoration: "none" }}>Features</a>
          <a href="https://revphlo.com/privacy-policy" style={{ fontSize: 13, color: T.text3, textDecoration: "none" }}>Privacy Policy</a>
          <a href="https://revphlo.com/terms-of-service" style={{ fontSize: 13, color: T.text3, textDecoration: "none" }}>Terms of Service</a>
        </div>
        <p style={{ fontSize: 13, color: T.text3 }}>© 2025 RevPhlo. All rights reserved.</p>
      </footer>
    </div>
  );
}

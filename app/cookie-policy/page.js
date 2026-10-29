import CookieSettingsLink from "../components/CookieSettingsLink";

const T = {
  blue: "#3361FF",
  dark: "#0F1117",
  text2: "#4B5563",
  text3: "#9CA3AF",
  bg: "#FAFBFC",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

const linkStyle = { fontSize: 13, color: T.text2, textDecoration: "none" };
const buttonStyle = {
  ...linkStyle,
  background: "none",
  border: 0,
  padding: 0,
  cursor: "pointer",
  font: "inherit",
};

const ROWS = [
  ["revphlo_consent", "revphlo.com", "About 180 days", "Strictly necessary. Stores Accept or Reject. Also mirrored in localStorage under the same name. Set when you choose. A Global Privacy Control signal is treated as Reject and is saved the same way.", "Necessary"],
  ["Stripe cookies, such as __stripe_mid and __stripe_sid", "stripe.com", "Session to about a year", "Set only on /checkout, by Stripe.js, so Stripe can take the payment and reduce fraud. Not used for advertising. They load whether or not you accept marketing cookies.", "Necessary for checkout"],
  ["_gcl_au", ".revphlo.com", "About 90 days", "Google Ads conversion linker for tag AW-17985869159. Links an ad click to a later visit. Set only after Accept.", "Advertising"],
  ["_gcl_aw, _gcl_dc, _gcl_gs", ".revphlo.com", "Up to about 90 days", "Google Ads click identifiers when a visit comes from an ad. Set only after Accept.", "Advertising"],
  ["_gcl_ls", "localStorage on revphlo.com", "Until cleared", "Google Ads linker storage used with the cookies above. Written only after Accept.", "Advertising"],
  ["test_cookie", ".doubleclick.net", "About 15 minutes", "Google uses it to see whether the browser stores cookies. Set by the Google Ads tag only after Accept.", "Advertising"],
  ["IDE and similar DoubleClick cookies", ".doubleclick.net", "Up to about 13 months", "Google remarketing. Used to recognize this browser on other sites and measure ads. Set only after Accept.", "Advertising"],
  ["_fprom_tid", "revphlo.com", "Set by FirstPromoter", "Affiliate click id for FirstPromoter campaign or99bhsm, so a referring partner can be credited. Set only after Accept.", "Affiliate"],
  ["_fprom_ref", "revphlo.com", "Set by FirstPromoter", "Affiliate referral code. The checkout page reads it only if it is already present. Set only after Accept.", "Affiliate"],
  ["vidalytics_uid", "revphlo.com", "Set by Vidalytics", "Identifies the browser to the homepage video player. The player script and its thumbnail load only after Accept.", "Video"],
  ["AWSALB, AWSALBCORS, AWSALBTG, AWSALBTGCORS", "typeform.com", "About 7 days", "Load-balancer cookies Typeform sets so the embedded booking form stays on one server. The embed loads only after Accept.", "Booking form"],
];

export default function CookiePolicy() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: `1px solid ${T.border}`, background: T.white }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-dm-serif),Georgia,serif", fontSize: 22, color: T.dark, fontWeight: 700 }}>RevPhlo</span>
        </a>
        <a href="/" style={{ fontSize: 14, color: T.text2, textDecoration: "none" }}>← Back to Home</a>
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 120px" }}>
        <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif),Georgia,serif", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1.15, color: T.dark, marginBottom: 12 }}>Cookie Policy</h1>
        <p style={{ fontSize: 14, color: T.text3, marginBottom: 28 }}>Last updated: October 29, 2026</p>

        <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.75, marginBottom: 14 }}>
          This page lists the cookies and similar storage used on revphlo.com. The app at app.revphlo.com uses separate sign-in cookies from Clerk. Those are not set here. Read the <a href="/privacy-policy">privacy policy</a> for how RevPhlo uses personal information, and the <a href="/privacy-policy#do-not-sell-or-share">Do Not Sell or Share</a> section for advertising.
        </p>
        <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.75, marginBottom: 14 }}>
          Non-essential scripts stay unloaded until you click Accept. Reject and Accept are shown together, in the same style. Google Consent Mode v2 defaults every storage signal to denied, and the Google tag is not downloaded while the choice is Reject. A Global Privacy Control signal is treated as Reject. You can reopen this choice any time.
        </p>
        <p style={{ marginBottom: 28 }}>
          <CookieSettingsLink style={{ ...buttonStyle, color: T.blue, fontSize: 15, fontWeight: 600 }} />
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: T.text2 }}>
            <thead>
              <tr>
                {["Name", "Domain", "Duration", "Purpose", "Category"].map((heading) => (
                  <th key={heading} style={{ textAlign: "left", padding: "10px 8px", borderBottom: `1px solid ${T.border}`, color: T.dark, fontSize: 13 }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} style={{ padding: "10px 8px", borderBottom: `1px solid ${T.border}`, verticalAlign: "top", lineHeight: 1.5 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontFamily: "var(--font-dm-serif),Georgia,serif", fontSize: 24, color: T.dark, margin: "36px 0 12px" }}>What does not wait for Accept</h2>
        <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.75 }}>
          The consent cookie, the inline consent-mode signal, and Stripe.js on the checkout page. Stripe is required to complete a payment you started. Server logs on Vercel are not cookies. Fonts are delivered by this site, not by Google Fonts at page view.
        </p>
      </main>

      <footer style={{ borderTop: `1px solid ${T.border}`, padding: "32px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
          <a href="/terms-of-service" style={linkStyle}>Terms of Service</a>
          <a href="/cookie-policy" style={linkStyle}>Cookie Policy</a>
          <a href="/privacy-policy#do-not-sell-or-share" style={linkStyle}>Do Not Sell or Share My Personal Information</a>
          <CookieSettingsLink style={buttonStyle} />
        </div>
        <p style={{ fontSize: 13, color: T.text3 }}>© {new Date().getFullYear()} RevPhlo. All rights reserved.</p>
      </footer>
    </div>
  );
}

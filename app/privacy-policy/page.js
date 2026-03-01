"use client";

export default function PrivacyPolicy() {
  const T = {
    blue: "#3361FF",
    dark: "#0F1117",
    text2: "#4B5563",
    text3: "#9CA3AF",
    bg: "#FAFBFC",
    border: "#E5E7EB",
    white: "#FFFFFF",
  };

  const sectionStyle = { marginBottom: 36 };
  const h2Style = {
    fontFamily: "'DM Serif Display',Georgia,serif",
    fontSize: 24,
    color: T.dark,
    marginBottom: 12,
    lineHeight: 1.3,
  };
  const pStyle = {
    fontSize: 15,
    color: T.text2,
    lineHeight: 1.75,
    marginBottom: 14,
  };
  const ulStyle = {
    paddingLeft: 24,
    marginBottom: 14,
  };
  const liStyle = {
    fontSize: 15,
    color: T.text2,
    lineHeight: 1.75,
    marginBottom: 6,
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: `1px solid ${T.border}`, background: T.white }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 22, color: T.dark, fontWeight: 700 }}>RevPhlo</span>
        </a>
        <a href="/" style={{ fontSize: 14, color: T.text2, textDecoration: "none" }}>← Back to Home</a>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>
        <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1.15, letterSpacing: -0.5, color: T.dark, marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: T.text3, marginBottom: 48 }}>Last updated: March 1, 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>RevPhlo ("we," "our," or "us") operates the RevPhlo platform at revphlo.com. This Privacy Policy describes how we collect, use, store, and share information when you use our website, platform, and related services (collectively, the "Service").</p>
          <p style={pStyle}>By accessing or using the Service, you agree to this Privacy Policy. If you do not agree, please do not use the Service.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Information We Collect</h2>
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information you provide directly:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Account registration information (name, email address, company name, role)</li>
            <li style={liStyle}>Billing and payment information processed through Stripe</li>
            <li style={liStyle}>Communications you send to us (support requests, feedback)</li>
            <li style={liStyle}>Configuration data (source mappings, calendar structures, team settings)</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information collected through integrations:</p>
          <p style={pStyle}>When you connect third-party tools to RevPhlo, we access data necessary to provide the Service. This may include:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>GoHighLevel: Lead and appointment data, pipeline information, calendar events, contact details</li>
            <li style={liStyle}>Stripe: Transaction data, payment amounts, customer email addresses, payment status</li>
            <li style={liStyle}>Fathom: Call recordings, AI-generated transcripts and summaries</li>
            <li style={liStyle}>Zoom: Meeting metadata and recording data</li>
            <li style={liStyle}>Slack: Notification delivery (we do not read or store message history)</li>
            <li style={liStyle}>Zapier: Workflow trigger and action data as configured by you</li>
            <li style={liStyle}>Whop: Product delivery and membership data</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information collected automatically:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Device and browser information (IP address, browser type, operating system)</li>
            <li style={liStyle}>Usage data (pages visited, features used, session duration)</li>
            <li style={liStyle}>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. How We Use Your Information</h2>
          <p style={pStyle}>We use the information we collect to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Provide, maintain, and improve the Service</li>
            <li style={liStyle}>Generate AI-powered post-call notes and analytics</li>
            <li style={liStyle}>Attribute revenue to traffic sources, closers, and funnels</li>
            <li style={liStyle}>Match payments to appointments and calls</li>
            <li style={liStyle}>Populate dashboards, leaderboards, and rep portals</li>
            <li style={liStyle}>Process billing and manage subscriptions</li>
            <li style={liStyle}>Send transactional emails and notifications</li>
            <li style={liStyle}>Respond to support requests</li>
            <li style={liStyle}>Detect and prevent fraud, abuse, or security incidents</li>
            <li style={liStyle}>Comply with legal obligations</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. How We Share Your Information</h2>
          <p style={pStyle}>We do not sell your personal information. We may share information with:</p>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Service providers:</strong> Third parties that help us operate the Service (hosting, payment processing, analytics). These providers are contractually obligated to protect your data.</li>
            <li style={liStyle}><strong>Connected integrations:</strong> When you authorize a third-party integration, data flows between RevPhlo and that service as necessary to provide functionality.</li>
            <li style={liStyle}><strong>Legal compliance:</strong> When required by law, subpoena, or legal process, or to protect our rights, safety, or property.</li>
            <li style={liStyle}><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Data Retention</h2>
          <p style={pStyle}>We retain your data for as long as your account is active or as needed to provide the Service. When you close your account, we will delete or anonymize your data within 90 days, except where retention is required by law or for legitimate business purposes (e.g., resolving disputes, enforcing agreements).</p>
          <p style={pStyle}>Integration data (call recordings, transaction history, appointment data) is retained only while your integrations are active and your account is in good standing.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Data Security</h2>
          <p style={pStyle}>We implement industry-standard security measures to protect your information, including encryption in transit (TLS) and at rest, access controls, and regular security assessments. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Cookies</h2>
          <p style={pStyle}>We use cookies and similar technologies for authentication, preferences, and analytics. You can manage cookie preferences through your browser settings. Disabling cookies may affect the functionality of the Service.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Your Rights</h2>
          <p style={pStyle}>Depending on your jurisdiction, you may have the right to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Access, correct, or delete your personal information</li>
            <li style={liStyle}>Object to or restrict certain processing</li>
            <li style={liStyle}>Data portability</li>
            <li style={liStyle}>Withdraw consent where processing is based on consent</li>
            <li style={liStyle}>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p style={pStyle}>To exercise these rights, contact us at privacy@revphlo.com.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. California Privacy Rights</h2>
          <p style={pStyle}>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, request deletion, and opt out of the sale of personal information. We do not sell personal information.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Children's Privacy</h2>
          <p style={pStyle}>The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will delete it promptly.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Third-Party Links</h2>
          <p style={pStyle}>The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Changes to This Policy</h2>
          <p style={pStyle}>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the "Last updated" date. Continued use of the Service after changes constitutes acceptance of the updated policy.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Contact Us</h2>
          <p style={pStyle}>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
          <p style={pStyle}>
            RevPhlo<br />
            Email: privacy@revphlo.com<br />
            Website: revphlo.com
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: "32px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
          <a href="/privacy-policy" style={{ fontSize: 13, color: T.text2, textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms-of-service" style={{ fontSize: 13, color: T.text2, textDecoration: "none" }}>Terms of Service</a>
        </div>
        <p style={{ fontSize: 13, color: T.text3 }}>© {new Date().getFullYear()} RevPhlo. All rights reserved.</p>
      </footer>
    </div>
  );
}

"use client";

export default function TermsOfService() {
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
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1.15, letterSpacing: -0.5, color: T.dark, marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: T.text3, marginBottom: 48 }}>Last updated: March 1, 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>These Terms of Service ("Terms") govern your access to and use of the RevPhlo platform, website, and related services (collectively, the "Service") operated by RevPhlo ("we," "our," or "us"). By accessing or using the Service, you agree to be bound by these Terms.</p>
          <p style={pStyle}>If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. The Service</h2>
          <p style={pStyle}>RevPhlo is a cloud-based sales analytics platform that provides post-booking visibility for high-ticket sales teams. The Service includes AI-generated post-call notes, revenue attribution, performance dashboards, leaderboards, payment matching, and related analytics features.</p>
          <p style={pStyle}>We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with reasonable notice where practicable.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Account Registration</h2>
          <p style={pStyle}>To use the Service, you must create an account and provide accurate, complete information. You are responsible for:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Maintaining the confidentiality of your account credentials</li>
            <li style={liStyle}>All activity that occurs under your account</li>
            <li style={liStyle}>Notifying us immediately of any unauthorized use</li>
            <li style={liStyle}>Ensuring that team members added to your account comply with these Terms</li>
          </ul>
          <p style={pStyle}>We reserve the right to suspend or terminate accounts that violate these Terms or that remain inactive for an extended period.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Subscriptions and Billing</h2>
          <p style={pStyle}>Access to the Service requires a paid subscription. By subscribing, you agree to the following:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Subscription fees are billed in advance on a monthly or annual basis through Stripe</li>
            <li style={liStyle}>All fees are non-refundable except as expressly stated in these Terms or required by law</li>
            <li style={liStyle}>We may change pricing with 30 days' written notice; continued use after the change constitutes acceptance</li>
            <li style={liStyle}>Subscriptions automatically renew unless canceled before the renewal date</li>
            <li style={liStyle}>You are responsible for all applicable taxes</li>
          </ul>
          <p style={pStyle}>To cancel your subscription, contact us at support@revphlo.com or use the cancellation option in your account settings. Cancellations take effect at the end of the current billing period.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Third-Party Integrations</h2>
          <p style={pStyle}>The Service integrates with third-party tools including GoHighLevel, Stripe, Zoom, Fathom, Slack, Zapier, and Whop. By connecting these integrations:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>You authorize RevPhlo to access and process data from those services as necessary to provide the Service</li>
            <li style={liStyle}>You represent that you have the right to share that data with us</li>
            <li style={liStyle}>You acknowledge that third-party services are governed by their own terms and privacy policies</li>
            <li style={liStyle}>We are not responsible for the availability, accuracy, or performance of third-party services</li>
          </ul>
          <p style={pStyle}>You may disconnect integrations at any time through your account settings. Disconnecting an integration may limit the functionality of the Service.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Your Data</h2>
          <p style={pStyle}>You retain ownership of all data you provide to the Service or that is collected through your connected integrations ("Your Data"). By using the Service, you grant us a limited, non-exclusive license to use, process, and display Your Data solely to provide and improve the Service.</p>
          <p style={pStyle}>You are responsible for ensuring that Your Data does not violate any applicable laws or third-party rights. You represent that you have obtained all necessary consents from individuals whose data is processed through the Service (e.g., sales prospects, team members).</p>
          <p style={pStyle}>We will not access, use, or share Your Data except as described in these Terms and our Privacy Policy.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. AI-Generated Content</h2>
          <p style={pStyle}>The Service uses artificial intelligence to generate post-call notes, analytics summaries, and other content. AI-generated content is provided for informational purposes and may not be fully accurate. You are responsible for reviewing and verifying AI-generated content before relying on it for business decisions.</p>
          <p style={pStyle}>We do not guarantee the accuracy, completeness, or reliability of AI-generated content.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Acceptable Use</h2>
          <p style={pStyle}>You agree not to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li style={liStyle}>Attempt to gain unauthorized access to the Service or its systems</li>
            <li style={liStyle}>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li style={liStyle}>Transmit malware, viruses, or other harmful code</li>
            <li style={liStyle}>Interfere with or disrupt the Service or servers</li>
            <li style={liStyle}>Resell, sublicense, or redistribute the Service without our written consent</li>
            <li style={liStyle}>Use the Service to harass, abuse, or harm others</li>
            <li style={liStyle}>Scrape, crawl, or collect data from the Service by automated means</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Intellectual Property</h2>
          <p style={pStyle}>The Service, including its design, code, features, documentation, branding, and all related intellectual property, is owned by RevPhlo and protected by copyright, trademark, and other laws. These Terms do not grant you any rights to our intellectual property except the limited right to use the Service as described herein.</p>
          <p style={pStyle}>RevPhlo and the RevPhlo logo are trademarks of RevPhlo. You may not use our trademarks without prior written consent.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Disclaimer of Warranties</h2>
          <p style={pStyle}>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.</p>
          <p style={pStyle}>We do not warrant that the Service will be uninterrupted, error-free, or secure, or that defects will be corrected. We do not warrant the accuracy or reliability of data obtained through the Service, including data from third-party integrations.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Limitation of Liability</h2>
          <p style={pStyle}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVPHLO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.</p>
          <p style={pStyle}>OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Indemnification</h2>
          <p style={pStyle}>You agree to indemnify, defend, and hold harmless RevPhlo and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Service, (b) your violation of these Terms, (c) your violation of any third-party rights, or (d) Your Data.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Termination</h2>
          <p style={pStyle}>Either party may terminate these Terms at any time. You may terminate by canceling your subscription and ceasing use of the Service. We may terminate or suspend your access immediately if you violate these Terms.</p>
          <p style={pStyle}>Upon termination, your right to use the Service ceases immediately. We will retain Your Data for 90 days following termination, after which it will be deleted unless retention is required by law. You may request an export of Your Data during this period.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>13. Governing Law</h2>
          <p style={pStyle}>These Terms are governed by and construed in accordance with the laws of the State of Florida, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Florida.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14. Changes to These Terms</h2>
          <p style={pStyle}>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on the Service and updating the "Last updated" date. Continued use of the Service after changes constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>15. Miscellaneous</h2>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and RevPhlo regarding the Service.</li>
            <li style={liStyle}><strong>Severability:</strong> If any provision of these Terms is found unenforceable, the remaining provisions remain in full force and effect.</li>
            <li style={liStyle}><strong>Waiver:</strong> Our failure to enforce any provision does not constitute a waiver of that provision.</li>
            <li style={liStyle}><strong>Assignment:</strong> You may not assign these Terms without our written consent. We may assign these Terms without restriction.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>16. Contact Us</h2>
          <p style={pStyle}>If you have questions about these Terms, contact us at:</p>
          <p style={pStyle}>
            RevPhlo<br />
            Email: support@revphlo.com<br />
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

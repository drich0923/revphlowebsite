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

const sectionStyle = { marginBottom: 36 };
const h2Style = {
  fontFamily: "var(--font-dm-serif),Georgia,serif",
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
const ulStyle = { paddingLeft: 24, marginBottom: 14 };
const liStyle = { fontSize: 15, color: T.text2, lineHeight: 1.75, marginBottom: 6 };
const linkStyle = { fontSize: 13, color: T.text2, textDecoration: "none" };
const buttonStyle = {
  ...linkStyle,
  background: "none",
  border: 0,
  padding: 0,
  cursor: "pointer",
  font: "inherit",
};

function Placeholder({ children }) {
  return (
    <span
      style={{
        background: "#FEF3C7",
        color: "#92400E",
        fontWeight: 700,
        padding: "0 4px",
        borderRadius: 4,
      }}
    >
      {children}
    </span>
  );
}

function Section({ id, title, children }) {
  return (
    <div id={id} style={sectionStyle}>
      <h2 style={h2Style}>{title}</h2>
      {children}
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: `1px solid ${T.border}`, background: T.white }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-dm-serif),Georgia,serif", fontSize: 22, color: T.dark, fontWeight: 700 }}>RevPhlo</span>
        </a>
        <a href="/" style={{ fontSize: 14, color: T.text2, textDecoration: "none" }}>← Back to Home</a>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>
        <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2.5, color: T.blue, fontWeight: 600, marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif),Georgia,serif", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1.15, letterSpacing: -0.5, color: T.dark, marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: T.text3, marginBottom: 16 }}>Last updated: October 29, 2026</p>
        <p style={{ ...pStyle, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "12px 14px" }}>
          Highlighted items are placeholders the business still has to fill in: <Placeholder>[LEGAL ENTITY NAME]</Placeholder> and <Placeholder>[BUSINESS STREET ADDRESS]</Placeholder>. This policy describes the marketing site at revphlo.com and the RevPhlo app at app.revphlo.com. It is not legal advice.
        </p>

        <Section title="1. Who we are">
          <p style={pStyle}>
            <Placeholder>[LEGAL ENTITY NAME]</Placeholder> (&quot;RevPhlo,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides the RevPhlo marketing site at revphlo.com and the RevPhlo application at app.revphlo.com. Our postal address is <Placeholder>[BUSINESS STREET ADDRESS]</Placeholder>. Privacy questions go to privacy@revphlo.com. Support questions go to support@revphlo.com.
          </p>
          <p style={pStyle}>
            The marketing site explains the product, collects demo requests, measures advertising when you allow it, and takes payment for a new subscription at /checkout. The app is a paid tool for high-ticket sales teams. Customers connect their own sales systems. The app stores leads, appointments, call recordings and transcripts, and payment records those systems send, and it can draft post-call notes.
          </p>
          <p style={pStyle}>
            If you use the app for people in the European Economic Area or the United Kingdom, RevPhlo is the controller of account and billing data. For prospect and call data a customer uploads or connects, the customer is the controller and RevPhlo is their processor, except where we act for our own account, security, or billing.
          </p>
        </Section>

        <Section title="2. Information we collect">
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information you give us</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Demo form (/demo): name, work email, phone number, company name, and whether you checked the optional text-message box. The form also sends UTM parameters from the page address when they are present.</li>
            <li style={liStyle}>Homepage booking form: whatever you submit in the Typeform embed. That can include a name, email, and phone number.</li>
            <li style={liStyle}>Checkout: the email for the new account, card and billing details collected by Stripe, and the fact that you accepted the billing terms.</li>
            <li style={liStyle}>App account: name, email address, company name, role, and team settings, handled with Clerk for sign-in.</li>
            <li style={liStyle}>Messages you send us, including support email.</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information from tools a customer connects</p>
          <ul style={ulStyle}>
            <li style={liStyle}>GoHighLevel: contacts, leads, appointments, pipeline data, calendar events, and messages the connection needs.</li>
            <li style={liStyle}>HubSpot, when a customer connects it: contacts, meetings, and call records. The marketing site does not load a HubSpot tracking script.</li>
            <li style={liStyle}>Stripe: charges, amounts, payer email, and payment status, both for RevPhlo&apos;s own subscriptions and for a customer&apos;s connected Stripe account.</li>
            <li style={liStyle}>Fathom: call recordings, transcripts, summaries, and the recorder&apos;s email.</li>
            <li style={liStyle}>Zoom: meeting metadata and recordings the customer authorizes.</li>
            <li style={liStyle}>Slack: the notification content the app posts. We do not read Slack history.</li>
            <li style={liStyle}>Zapier: the fields the customer configures a zap to send.</li>
            <li style={liStyle}>Whop: product, membership, and delivery data the customer connects.</li>
            <li style={liStyle}>Sendblue: call-observation metadata when that integration is connected. The marketing site does not use Sendblue to send texts.</li>
            <li style={liStyle}>Typeform, inside the app: form answers a customer connects, in addition to the homepage booking form described above.</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 600, color: T.dark }}>Information collected automatically</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Server logs from Vercel: IP address, browser type, the page requested, and the time of the request.</li>
            <li style={liStyle}>A first-party cookie that stores Accept or Reject for cookies on this marketing site. See the <a href="/cookie-policy">cookie policy</a>.</li>
            <li style={liStyle}>If you accept cookies: advertising and affiliate identifiers described in section 6.</li>
            <li style={liStyle}>Inside the app: product analytics events from PostHog (pages and actions, a Clerk user id, and a company id) and error reports from Sentry. Sentry is configured not to send personal information by default. The marketing-site cookie banner does not control those app tools.</li>
          </ul>
        </Section>

        <Section title="3. How we use information, and the legal basis">
          <ul style={ulStyle}>
            <li style={liStyle}>To provide the demo you asked for, and to contact you by email or phone about that demo. Basis: steps you asked us to take before a contract, and our legitimate interest in answering the request.</li>
            <li style={liStyle}>To run the app: dashboards, attribution, leaderboards, payment matching, and team access. Basis: contract with the customer.</li>
            <li style={liStyle}>To take payment, keep billing records, and manage the subscription. Basis: contract and legal obligation.</li>
            <li style={liStyle}>To send the transactional email the app sends through Resend, such as invitations, account setup, and operational notices. Basis: contract.</li>
            <li style={liStyle}>To draft post-call notes and to transcribe call audio, as described in section 4. Basis: contract with the customer who turned the feature on.</li>
            <li style={liStyle}>To measure ads and affiliate referrals, only after you accept cookies. Basis: consent. You can reject or withdraw that consent.</li>
            <li style={liStyle}>To send text messages, only if you check the optional SMS box. Basis: consent. Consent is not a condition of buying or of getting a demo.</li>
            <li style={liStyle}>To protect the service, investigate abuse, and fix errors. Basis: legitimate interests and, where it applies, legal obligation.</li>
          </ul>
        </Section>

        <Section title="4. AI providers">
          <p style={pStyle}>
            RevPhlo uses two model providers for product features. We name them here because call content is sent to them.
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Anthropic (Claude).</strong> When a customer uses AI post-call notes, RevPhlo sends Anthropic the prospect&apos;s name, the closer&apos;s name, and the full call transcript so Anthropic can draft the note. The app labels those notes as AI-generated. A transcript can include whatever was said on the call.</li>
            <li style={liStyle}><strong>OpenAI.</strong> When a recording needs a transcript, RevPhlo sends the call audio to OpenAI&apos;s transcription API. The resulting transcript can then be included in what is sent to Anthropic for the note.</li>
          </ul>
          <p style={pStyle}>
            There is no separate consent step inside the app before a transcript or recording is sent to these providers. Customers who connect recordings instruct RevPhlo to process them this way. We do not use the marketing site to send call audio or transcripts to Anthropic or OpenAI.
          </p>
        </Section>

        <Section title="5. Who else receives information">
          <p style={pStyle}>
            We share personal information with the companies below so they can do the work named. We do not sell personal information for money. Section 9 explains advertising &quot;sharing&quot; under California law.
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Vercel.</strong> Hosts the marketing site and the app, and runs the app&apos;s scheduled jobs. Receives request data and job payloads.</li>
            <li style={liStyle}><strong>Neon.</strong> Hosts the Postgres database that stores app records.</li>
            <li style={liStyle}><strong>Clerk.</strong> Sign-in for the app. Receives name, email, and session data.</li>
            <li style={liStyle}><strong>Stripe.</strong> Takes the checkout payment on this site and processes the customer&apos;s own charges inside the app. Stripe collects card details on Stripe&apos;s form. RevPhlo does not store the full card number.</li>
            <li style={liStyle}><strong>Resend.</strong> Sends the app&apos;s transactional email. Receives the recipient&apos;s email address and the contents of that message.</li>
            <li style={liStyle}><strong>PostHog.</strong> Product analytics inside the app only.</li>
            <li style={liStyle}><strong>Sentry.</strong> Error and performance reports for the app.</li>
            <li style={liStyle}><strong>GoHighLevel (LeadConnector).</strong> The /demo form is forwarded to a LeadConnector webhook so the lead can be stored and followed up. A customer can also connect GoHighLevel as their CRM.</li>
            <li style={liStyle}><strong>Google Ads.</strong> Only after you accept cookies on this site. Tag AW-17985869159 measures ad clicks and can remarket. See sections 6 and 9.</li>
            <li style={liStyle}><strong>FirstPromoter.</strong> Only after you accept cookies. Campaign or99bhsm records an affiliate click so a referring partner can be credited.</li>
            <li style={liStyle}><strong>Vidalytics.</strong> Only after you accept cookies. Plays the homepage demo video.</li>
            <li style={liStyle}><strong>Typeform.</strong> Hosts the homepage booking form. The embed loads only after you accept cookies, because Typeform sets its own cookies. Form answers are collected by Typeform and provided to RevPhlo.</li>
            <li style={liStyle}><strong>Anthropic and OpenAI.</strong> Section 4.</li>
            <li style={liStyle}><strong>Fathom, Zoom, HubSpot, Slack, Zapier, Whop, and Sendblue.</strong> Only when a customer connects that tool, for the data listed in section 2.</li>
          </ul>
          <p style={pStyle}>
            We also share information if the law, a subpoena, or a legal claim requires it, or if the business is sold, in which case the buyer has to honor this policy for the data it receives.
          </p>
        </Section>

        <Section title="6. Cookies and similar technologies">
          <p style={pStyle}>
            On revphlo.com, non-essential cookies and scripts stay off until you click Accept. Reject and Accept are the same size and style. You can change the choice later with Cookie settings in the footer. The choice is stored in a first-party cookie named revphlo_consent for about 180 days.
          </p>
          <p style={pStyle}>
            Before any choice, and after Reject, Google Consent Mode v2 is set to denied for ad storage, ad user data, ad personalization, analytics storage, functionality storage, personalization storage, and security storage. We do not download the Google tag, FirstPromoter, the Vidalytics player, or the Typeform embed in that state. Stripe.js still loads on /checkout, because it is required to take the payment you started.
          </p>
          <p style={pStyle}>
            The list of cookies, who sets them, and why, is on the <a href="/cookie-policy">cookie policy</a>. The app uses its own cookies for sign-in (Clerk) and for security. Those are not set by this marketing site.
          </p>
        </Section>

        <Section title="7. Cross-site tracking by third parties">
          <p style={pStyle}>
            If you accept cookies, third parties can collect identifiers from this browser and use them to recognize you over time and across other websites. Google Ads and DoubleClick do this for remarketing and conversion measurement. FirstPromoter does this to tie a visit to an affiliate referral. Vidalytics and Typeform can set cookies on their own domains while their embeds run. RevPhlo does not control what those companies do with data on their own sites. If you reject cookies, or if your browser sends Global Privacy Control, we do not load those scripts, so they do not get that chance from this site.
          </p>
          <p style={pStyle}>
            PostHog and Sentry run in the app at app.revphlo.com. They are not loaded by the marketing-site banner. PostHog can recognize a signed-in user across visits to the app. It is not an advertising network.
          </p>
        </Section>

        <Section title="8. Do Not Track and Global Privacy Control">
          <p style={pStyle}>
            We do not respond to the Do Not Track browser signal. Browsers never settled on one meaning for that signal, so we do not treat it as a consent choice.
          </p>
          <p style={pStyle}>
            We do honor Global Privacy Control (GPC). If your browser sends a GPC signal on revphlo.com, we treat it as Reject. We do not load Google Ads, FirstPromoter, Vidalytics, or the Typeform embed, and we do not let the cookie banner override that signal while it is on. GPC is also an opt-out of sale or sharing for this website, described in section 9.
          </p>
        </Section>

        <Section id="do-not-sell-or-share" title="9. Do Not Sell or Share My Personal Information">
          <p style={pStyle}>
            We do not sell personal information for money. We also do not share personal information for cross-context behavioral advertising unless you accept advertising cookies.
          </p>
          <p style={pStyle}>
            If you accept, Google Ads can use a cookie to show RevPhlo ads on other sites. Under the California Consumer Privacy Act, as amended by the CPRA, that remarketing is &quot;sharing.&quot; It is optional. Reject, the Cookie settings link, or a Global Privacy Control signal opts you out of that sharing on revphlo.com. You do not need an account, and we will not ask you for identification, to use those controls.
          </p>
          <p style={pStyle}>
            To opt an app.revphlo.com account out of product analytics or any other sharing, email privacy@revphlo.com and name the account. This website does not change the app automatically. We will not discriminate against you for opting out.
          </p>
          <p style={pStyle}>
            <CookieSettingsLink style={{ ...buttonStyle, color: T.blue, fontSize: 15 }} />
            {" · "}
            <a href="/cookie-policy">Cookie policy</a>
          </p>
        </Section>

        <Section title="10. Text messages">
          <p style={pStyle}>
            The demo form asks for a phone number so we can contact you about the demo. A phone number alone is not consent to send text messages. The form has a separate checkbox, unchecked by default, for SMS. The checkbox names RevPhlo and the number you entered. It says that consent is not a condition of purchase, that message frequency varies, that message and data rates may apply, and that you can reply STOP to opt out and HELP for help. It links to this policy and the terms.
          </p>
          <p style={pStyle}>
            If you check that box, we store the choice with the demo submission, including the statement you agreed to, and we may text that number. Messages may be sent by RevPhlo or through GoHighLevel, which receives the submission. You can opt out by replying STOP. Consent is not required to view the demo, book a conversation, or buy RevPhlo.
          </p>
          <p style={pStyle}>
            The homepage booking form is a Typeform we cannot change from this website&apos;s code. Until that form has the same optional, unchecked SMS statement, a phone number entered there is not consent to send texts.
          </p>
          <p style={pStyle}>
            The app does not run a marketing texting program. Sendblue, when a customer connects it, is used for call-observation metadata, not for promotional texts from this site.
          </p>
        </Section>

        <Section title="11. Retention, access, correction, deletion, and export">
          <p style={pStyle}>
            We keep information for as long as we need it to provide the service, meet a legal duty, resolve a dispute, or keep a billing record. Closing an account does not, by itself, delete or anonymize that account&apos;s data on a 90-day schedule. There is no automatic deletion or full personal-data export that runs within 90 days of account closure.
          </p>
          <p style={pStyle}>
            To ask for access, a correction, a copy, or deletion, email privacy@revphlo.com. We will verify the request and respond within the time the law that applies to you requires. We may keep information the law tells us to keep, including tax and fraud records, and we may decline a request when the law allows it. CSV downloads inside the app are operational reports for that customer&apos;s workspace. They are not a complete export of every personal-information field.
          </p>
          <p style={pStyle}>
            Demo leads are kept so we can respond to the request and, if you opted in, honor or prove the texting choice. Email privacy@revphlo.com to ask us to delete a demo submission.
          </p>
        </Section>

        <Section title="12. Security and breach notification">
          <p style={pStyle}>
            We use TLS for data in transit, restrict access to production systems, and rely on our vendors&apos; access controls for hosting, the database, and sign-in. No method of storage or transmission is perfectly secure.
          </p>
          <p style={pStyle}>
            If we confirm a security breach that affects your personal information, we will tell affected customers without unreasonable delay, and within the time the law requires. Where the GDPR applies, we will notify the relevant supervisory authority within 72 hours of becoming aware of a breach that is likely to risk people&apos;s rights and freedoms, unless the breach is unlikely to create that risk. We will notify affected people when the breach is likely to result in a high risk to them.
          </p>
          <p style={pStyle}>
            In the United States, we will notify affected residents, and any attorney general or regulator a state requires us to notify, within that state&apos;s deadline. Many states set an outer limit of 30, 45, or 60 days from discovery. Others, including California, require notice in the most expedient time possible and without unreasonable delay. We will use the shortest deadline that applies to the people affected.
          </p>
          <p style={pStyle}>
            We will contact you by email at the address on your account or your demo request. If email is not enough, we will also post a notice in the app or on this website. The notice will describe what happened, the kinds of information involved, what we are doing about it, and how to reach us at privacy@revphlo.com.
          </p>
        </Section>

        <Section title="13. Your rights">
          <p style={pStyle}>Depending on where you live, you may have the right to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Access, correct, or delete personal information</li>
            <li style={liStyle}>Receive a copy of personal information you provided</li>
            <li style={liStyle}>Object to or restrict certain processing</li>
            <li style={liStyle}>Withdraw consent for cookies or text messages</li>
            <li style={liStyle}>Opt out of sale or sharing, as described in section 9</li>
            <li style={liStyle}>Appeal a refusal, and complain to a data-protection authority or attorney general</li>
          </ul>
          <p style={pStyle}>
            Send requests to privacy@revphlo.com. If you are in the EEA or the UK, you can also complain to the supervisory authority where you live or work. Withdrawing cookie or SMS consent does not affect processing that already happened, and it does not affect the email or phone contact you asked for by submitting the demo form.
          </p>
        </Section>

        <Section title="14. California privacy rights">
          <p style={pStyle}>
            If you are a California resident, you can ask us to disclose the categories and specific pieces of personal information we collected, the categories of sources, the business or commercial purpose, and the categories of third parties we share it with. Those categories are the ones in sections 2 and 5: identifiers such as name, email, phone, and cookie ids; commercial information such as subscription and payment records; internet activity on our sites; professional information such as company and role; and audio and transcript content from connected call tools.
          </p>
          <p style={pStyle}>
            You can request deletion or correction by emailing privacy@revphlo.com. We do not sell personal information. We share it for cross-context advertising only when you accept advertising cookies, and you can opt out with the link in section 9. We do not use sensitive personal information to infer characteristics about you. We will not discriminate against you for exercising these rights. You may use an authorized agent; we may ask the agent for proof and ask you to confirm the request.
          </p>
        </Section>

        <Section title="15. Children">
          <p style={pStyle}>
            The site and the app are for businesses and are not directed to anyone under 18. We do not knowingly collect personal information from children. If we learn that we have, we will delete it. Email privacy@revphlo.com if you believe we have information from a child.
          </p>
        </Section>

        <Section title="16. International transfers">
          <p style={pStyle}>
            We and the vendors in section 5 are based in the United States and may process information in the United States and in other countries where those vendors operate. Those countries may not provide the same protection as the country you live in. Where the GDPR applies, the transfer rests on the safeguard that vendor offers, such as Standard Contractual Clauses or the EU-US Data Privacy Framework, when that safeguard is available for the service. Email privacy@revphlo.com if you want to know which safeguard a given vendor uses.
          </p>
        </Section>

        <Section title="17. Changes to this policy">
          <p style={pStyle}>
            We will post changes on this page and change the date above. When a change is material and we have an account email, we will also email the account owner. The date at the top of this page is October 29, 2026.
          </p>
        </Section>

        <Section title="18. Contact">
          <p style={pStyle}>
            <Placeholder>[LEGAL ENTITY NAME]</Placeholder><br />
            <Placeholder>[BUSINESS STREET ADDRESS]</Placeholder><br />
            Email: privacy@revphlo.com<br />
            Support: support@revphlo.com<br />
            Website: https://www.revphlo.com<br />
            App: https://app.revphlo.com
          </p>
        </Section>
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

"use client";

import { useEffect, useRef, useState } from "react";
import { isEmbeddedSession, isExpectedPlan, isPublishableKey, validateDetails } from "./checkout-contract.mjs";
import { loadStripeScript } from "./stripe-loader";
import styles from "./checkout.module.css";

const COMMON_ZONES = ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix", "Pacific/Honolulu", "Europe/London", "Europe/Paris", "Asia/Dubai", "Asia/Singapore", "Australia/Sydney", "UTC"];
const EMPTY_DETAILS = { companyName: "", ownerName: "", ownerEmail: "", timezone: "America/New_York", teamMembers: [], termsAccepted: false };

function Arrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Lock() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" /></svg>;
}

function StripePayment({ session }) {
  const container = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let disposed = false;
    let checkout;
    setLoading(true);
    setError("");
    async function mount() {
      try {
        const Stripe = await loadStripeScript();
        if (disposed) return;
        checkout = await Stripe(session.publishableKey).initEmbeddedCheckout({
          fetchClientSecret: async () => session.clientSecret,
        });
        if (disposed) { checkout.destroy(); return; }
        checkout.mount(container.current);
        setLoading(false);
      } catch {
        if (!disposed) {
          checkout?.destroy();
          checkout = undefined;
          setError("The payment form could not load. Try again to open the same checkout.");
          setLoading(false);
        }
      }
    }
    mount();
    return () => { disposed = true; checkout?.destroy(); };
  }, [session, attempt]);

  return <div className={styles.paymentArea}>
    {loading ? <p role="status" className={styles.loading}>Loading your secure payment form…</p> : null}
    {error ? <div className={styles.error} role="alert"><p>{error}</p><button type="button" className={styles.textButton} onClick={() => setAttempt((value) => value + 1)}>Try payment form again</button></div> : null}
    <div ref={container} className={styles.stripeMount} />
  </div>;
}

export default function Checkout({ appOrigin }) {
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [zones, setZones] = useState(COMMON_ZONES);
  const [availability, setAvailability] = useState({ state: "loading" });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const submitting = useRef(false);
  const errorRef = useRef(null);
  const paymentHeading = useRef(null);
  const memberSequence = useRef(0);
  const mounted = useRef(true);
  const activeRequest = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; activeRequest.current?.abort(); };
  }, []);

  useEffect(() => {
    const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let supported = COMMON_ZONES;
    if (typeof Intl.supportedValuesOf === "function") supported = Intl.supportedValuesOf("timeZone");
    setZones(Array.from(new Set([...supported, ...COMMON_ZONES, browserZone].filter(Boolean))).sort());
    if (browserZone) setDetails((value) => ({ ...value, timezone: browserZone }));
  }, []);

  useEffect(() => {
    if (!appOrigin) { setAvailability({ state: "unavailable" }); return; }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    let disposed = false;
    setAvailability({ state: "loading" });
    fetch(`${appOrigin}/api/checkout/start`, { credentials: "omit", cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok || !body.success) throw new Error("unavailable");
        if (!disposed) {
          const data = body.data;
          setAvailability(data?.enabled && data.embeddedEnabled && isExpectedPlan(data.plan) && isPublishableKey(data.publishableKey)
            ? { state: "ready" }
            : { state: "unavailable" });
        }
      })
      .catch(() => { if (!disposed) setAvailability({ state: "unavailable" }); })
      .finally(() => clearTimeout(timer));
    return () => { disposed = true; clearTimeout(timer); controller.abort(); };
  }, [appOrigin, loadAttempt]);

  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  useEffect(() => { if (session) paymentHeading.current?.focus(); }, [session]);

  function update(field, value) {
    setDetails((previous) => ({ ...previous, [field]: value }));
  }

  function addMember() {
    if (details.teamMembers.length >= 10) return;
    const id = ++memberSequence.current;
    setDetails((previous) => ({ ...previous, teamMembers: [...previous.teamMembers, { id, name: "", email: "", role: "rep" }] }));
  }

  function updateMember(id, field, value) {
    setDetails((previous) => ({ ...previous, teamMembers: previous.teamMembers.map((member) => member.id === id ? { ...member, [field]: value } : member) }));
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current || session || availability.state !== "ready") return;
    const validationError = validateDetails(details);
    if (validationError) { setError(validationError); return; }
    submitting.current = true;
    setBusy(true);
    setError("");
    let requestTimer;
    try {
      // Load Stripe first. A blocked script must not leave a new unpaid session.
      await loadStripeScript();
      if (!mounted.current) return;
      const controller = new AbortController();
      activeRequest.current = controller;
      requestTimer = setTimeout(() => controller.abort(), 45000);
      const response = await fetch(`${appOrigin}/api/checkout/start`, {
        method: "POST",
        credentials: "omit",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: details.companyName.trim(), ownerName: details.ownerName.trim(),
          ownerEmail: details.ownerEmail.trim().toLowerCase(), timezone: details.timezone,
          teamMembers: details.teamMembers.map(({ name, email, role }) => ({ name: name.trim(), email: email.trim().toLowerCase(), role })),
          termsAccepted: true, uiMode: "embedded",
        }),
      });
      const body = await response.json();
      if (!response.ok || !body.success || !isEmbeddedSession(body.data)) {
        throw new Error("We could not open checkout. Please try again.");
      }
      if (!mounted.current) return;
      setSession({ clientSecret: body.data.clientSecret, publishableKey: body.data.publishableKey });
    } catch {
      if (!mounted.current) return;
      setError("We could not open checkout. Please try again.");
    } finally {
      clearTimeout(requestTimer);
      activeRequest.current = null;
      if (mounted.current) setBusy(false);
      submitting.current = false;
    }
  }

  const disabled = busy || availability.state !== "ready";

  return <div className={styles.page}>
    <a className={styles.skipLink} href="#checkout-main">Skip to checkout</a>
    <header className={styles.header}>
      <a href="/" className={styles.logo} aria-label="RevPhlo home"><span className={styles.logoMark} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 15c5 0 7-8 16-8M4 19c5 0 7-8 16-8M4 11c5 0 7-8 16-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>RevPhlo</a>
      <a className={styles.helpLink} href="mailto:support@revphlo.com">Need help? <span>Contact us</span></a>
    </header>

    <main id="checkout-main" className={styles.main}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Your sales team.<br /><span>One clear picture.</span></h1>
        <p>Create your company account, then connect the tools your team already uses.</p>
      </div>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="details-heading">
          <ol className={styles.steps} aria-label="Account setup progress">
            <li className={session ? styles.completeStep : styles.currentStep} aria-current={session ? undefined : "step"}><span>{session ? "✓" : "1"}</span>Company</li>
            <li className={session ? styles.currentStep : undefined} aria-current={session ? "step" : undefined}><span>2</span>Payment</li>
            <li><span>3</span>Set up</li>
          </ol>

          {session ? <div className={styles.paymentSection}>
            <p className={styles.sectionLabel}>STEP 2 OF 3</p>
            <h2 id="details-heading" ref={paymentHeading} tabIndex={-1}>Complete your payment</h2>
            <p className={styles.description}>We will create <strong>{details.companyName}</strong> after payment. Your secure account setup link will go to <strong>{details.ownerEmail}</strong>.</p>
            <StripePayment session={session} />
            <p className={styles.paymentNote}>After payment, you will open RevPhlo to create or use your login and start the setup wizard.</p>
          </div> : <form onSubmit={submit} className={styles.form}>
            <div>
              <p className={styles.sectionLabel}>STEP 1 OF 3</p>
              <h2 id="details-heading">Tell us about your company</h2>
              <p className={styles.description}>This creates your workspace and tells us where to send your setup link.</p>
            </div>

            {availability.state === "loading" ? <p className={styles.notice} role="status">Checking checkout availability…</p> : null}
            {availability.state === "unavailable" ? <div className={styles.notice} role="status"><strong>Checkout is not available right now.</strong><p>You can contact us for help, or try again in a moment.</p><div className={styles.noticeActions}>{appOrigin ? <><button type="button" className={styles.textButton} onClick={() => setLoadAttempt((value) => value + 1)}>Check again</button><a href={`${appOrigin}/get-started`}>Open checkout in RevPhlo <Arrow /></a></> : null}<a href="mailto:support@revphlo.com">Contact support</a></div></div> : null}

            <fieldset className={styles.fields} disabled={busy}>
              <legend className={styles.srOnly}>Company and account owner</legend>
              <label className={styles.field}>Company name<input name="companyName" autoComplete="organization" maxLength={255} required value={details.companyName} onChange={(event) => update("companyName", event.target.value)} placeholder="Your company" /></label>
              <div className={styles.fieldPair}>
                <label className={styles.field}>Owner name<input name="ownerName" autoComplete="name" maxLength={200} required value={details.ownerName} onChange={(event) => update("ownerName", event.target.value)} placeholder="Full name" /></label>
                <label className={styles.field}>Owner email<input name="ownerEmail" type="email" autoComplete="email" maxLength={255} required value={details.ownerEmail} onChange={(event) => update("ownerEmail", event.target.value)} placeholder="you@company.com" aria-describedby="owner-hint" /></label>
              </div>
              <p id="owner-hint" className={styles.hint}>Use the email you want to sign in with. The owner will manage this company.</p>
              <label className={styles.field}>Company time zone<select name="timezone" value={details.timezone} onChange={(event) => update("timezone", event.target.value)}>{zones.map((zone) => <option key={zone} value={zone}>{zone.replaceAll("_", " ").replaceAll("/", " / ")}</option>)}</select></label>
            </fieldset>

            <fieldset className={styles.teamSection} disabled={busy}>
              <legend>Bring your team <span>Optional</span></legend>
              <p className={styles.hint}>Send their invites after payment. You can also add people during setup.</p>
              {details.teamMembers.length ? <div className={styles.teamList}>{details.teamMembers.map((member, index) => <div key={member.id} className={styles.member}>
                <div className={styles.memberHeading}><strong>Team member {index + 1}</strong><button type="button" className={styles.removeButton} onClick={() => update("teamMembers", details.teamMembers.filter((item) => item.id !== member.id))} aria-label={`Remove team member ${index + 1}`}>Remove</button></div>
                <div className={styles.fieldPair}><label className={styles.field}>Name<input autoComplete="off" required maxLength={200} value={member.name} onChange={(event) => updateMember(member.id, "name", event.target.value)} /></label><label className={styles.field}>Email<input autoComplete="off" type="email" required maxLength={255} value={member.email} onChange={(event) => updateMember(member.id, "email", event.target.value)} /></label></div>
                <label className={styles.field}>Role<select value={member.role} onChange={(event) => updateMember(member.id, "role", event.target.value)}><option value="rep">Sales rep</option><option value="manager">Manager</option><option value="admin">Admin</option><option value="viewer">Viewer</option></select></label>
              </div>)}</div> : null}
              <button type="button" className={styles.addButton} onClick={addMember} disabled={details.teamMembers.length >= 10}>+ Add team member</button>
              {details.teamMembers.length >= 10 ? <p className={styles.hint}>You can add more people after setup.</p> : null}
            </fieldset>

            <div className={styles.termsBlock}>
              <label className={styles.terms}><input type="checkbox" required checked={details.termsAccepted} disabled={busy} onChange={(event) => update("termsAccepted", event.target.checked)} /><span>I agree to pay <strong>$2,000 today</strong> for setup and the first 30 days, then <strong>$397 each month</strong>. I agree to a six-month minimum of <strong>$3,985 USD</strong>. The plan continues monthly after that until canceled. Cancellation takes effect after the minimum term or current billing period, whichever is later.</span></label>
              <p className={styles.legal}>By continuing, I accept the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and acknowledge the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
            </div>
            {error ? <div ref={errorRef} tabIndex={-1} className={styles.error} role="alert"><p>{error}</p></div> : null}
            <button className={styles.submit} type="submit" disabled={disabled}>{busy ? "Opening secure checkout…" : "Continue to payment"}{!busy ? <Arrow /> : null}</button>
            <p className={styles.secure}><Lock />Secure payment through Stripe. Your card details stay with Stripe.</p>
          </form>}
        </section>

        <aside className={styles.summary} aria-labelledby="plan-heading">
          <div className={styles.orderCard}>
            <p className={styles.sectionLabel}>YOUR REVPHLO PLAN</p>
            <h2 id="plan-heading">Built for your team.<br />Ready for your tools.</h2>
            <div className={styles.price}><span>$2,000</span><span>due today</span></div>
            <p className={styles.priceHint}>One-time setup + your first 30 days</p>
            <div className={styles.billingTimeline}><div><span className={styles.timelineDot} /><div><strong>Today</strong><p>Set up your account and get started.</p></div></div><div><span className={styles.timelineDot} /><div><strong>After 30 days</strong><p>$397 USD per month.</p></div></div></div>
            <div className={styles.minimum}><span>Six-month minimum</span><strong>$3,985 USD</strong></div>
            <p className={styles.smallPrint}>$2,000 today + five monthly payments of $397. Then $397 per month until canceled.</p>
          </div>
          <div className={styles.nextSteps}>
            <h3>What happens after payment</h3>
            <ol><li><span>1</span><div><strong>Your company is created</strong><p>We use the details you enter here.</p></div></li><li><span>2</span><div><strong>Get your secure setup link</strong><p>Create or use your login. Your team gets separate invites.</p></div></li><li><span>3</span><div><strong>Connect, then get to work</strong><p>The wizard guides you through your integrations, calendars, and team setup.</p></div></li></ol>
          </div>
          <p className={styles.supportNote}>Already have an account? {appOrigin ? <a href={`${appOrigin}/sign-in`}>Sign in to RevPhlo</a> : <a href="mailto:support@revphlo.com">Contact support</a>}.</p>
        </aside>
      </div>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} RevPhlo</span><nav aria-label="Legal"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="mailto:support@revphlo.com">Support</a></nav></footer>
    </main>
  </div>;
}

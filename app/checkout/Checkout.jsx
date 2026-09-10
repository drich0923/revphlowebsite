"use client";

import { useEffect, useRef, useState } from "react";
import { isCheckoutClientSession, isExpectedPlan, isPublishableKey } from "./checkout-contract.mjs";
import { loadStripeScript } from "./stripe-loader";
import styles from "./checkout.module.css";

function Arrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Lock() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" /></svg>;
}

function StripePayment({ session }) {
  const container = useRef(null);
  const actions = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    let disposed = false;
    let checkout;
    let paymentElement;
    setLoading(true);
    setError("");
    setCanConfirm(false);
    actions.current = null;
    async function mount() {
      try {
        const Stripe = await loadStripeScript();
        if (disposed) return;
        checkout = Stripe(session.publishableKey).initCheckout({
          clientSecret: session.clientSecret,
          elementsOptions: {
            appearance: {
              theme: "stripe",
              variables: { colorPrimary: "#3361ff", borderRadius: "8px", fontFamily: "Arial, sans-serif" },
            },
          },
        });
        paymentElement = checkout.createPaymentElement({
          layout: "tabs",
          fields: { billingDetails: { email: "never" } },
        });
        paymentElement.mount(container.current);
        checkout.on("change", (current) => {
          if (disposed) return;
          setCanConfirm(Boolean(current.canConfirm));
          setTotal(current.total?.total?.amount || "");
        });
        const result = await checkout.loadActions();
        if (disposed) return;
        if (result.type !== "success") throw new Error(result.error?.message || "The payment form could not load.");
        actions.current = result.actions;
        const current = result.actions.getSession();
        setCanConfirm(Boolean(current.canConfirm));
        setTotal(current.total?.total?.amount || "");
        setLoading(false);
      } catch {
        if (!disposed) {
          paymentElement?.destroy();
          setError("The payment form could not load. Try again to open the same checkout.");
          setLoading(false);
        }
      }
    }
    mount();
    return () => { disposed = true; actions.current = null; paymentElement?.destroy(); };
  }, [session, attempt]);

  async function confirmPayment(event) {
    event.preventDefault();
    if (!actions.current || submitting || !canConfirm) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await actions.current.confirm({ email: email.trim() });
      if (result.type === "error") {
        setError(result.error?.message || "We could not complete your payment. Check your details and try again.");
        setSubmitting(false);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not complete your payment. Check your details and try again.");
      setSubmitting(false);
    }
  }

  return <form className={styles.paymentArea} onSubmit={confirmPayment}>
    <label className={styles.emailLabel} htmlFor="checkout-email">Email for your new Revphlo account</label>
    <input id="checkout-email" className={styles.emailInput} type="email" autoComplete="email" required value={email} disabled={submitting} onChange={(event) => setEmail(event.target.value)} />
    <p className={styles.emailHelp}>You will use this email to create and verify your new login after payment.</p>
    {loading ? <p role="status" className={styles.loading}>Loading your secure payment form…</p> : null}
    <div ref={container} className={styles.stripeMount} />
    {total ? <p className={styles.paymentTotal}><span>Due today</span><strong>{total}</strong></p> : null}
    {error ? <div className={styles.error} role="alert"><p>{error}</p>{actions.current ? null : <button type="button" className={styles.textButton} onClick={() => setAttempt((value) => value + 1)}>Try payment form again</button>}</div> : null}
    <button className={styles.submit} type="submit" disabled={loading || submitting || !canConfirm}>{submitting ? "Starting…" : "Get Started"}{!submitting ? <Arrow /> : null}</button>
  </form>;
}

export default function Checkout({ appOrigin }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [availability, setAvailability] = useState({ state: "loading" });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const submitting = useRef(false);
  const errorRef = useRef(null);
  const paymentHeading = useRef(null);
  const mounted = useRef(true);
  const activeRequest = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; activeRequest.current?.abort(); };
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

  async function submit(event) {
    event.preventDefault();
    if (submitting.current || session || availability.state !== "ready") return;
    if (!termsAccepted) { setError("Accept the payment terms to continue."); return; }
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
        body: JSON.stringify({ termsAccepted: true, uiMode: "custom" }),
      });
      const body = await response.json();
      if (!response.ok || !body.success || !isCheckoutClientSession(body.data)) {
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
        <p>Pay securely, then add your company details and connect your tools.</p>
      </div>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="payment-heading">
          <ol className={styles.steps} aria-label="Account setup progress">
            <li className={styles.currentStep} aria-current="step"><span>1</span>Payment</li>
            <li><span>2</span>Company</li>
            <li><span>3</span>Set up</li>
          </ol>

          {session ? <div className={styles.paymentSection}>
            <p className={styles.sectionLabel}>STEP 1 OF 3</p>
            <h2 id="payment-heading" ref={paymentHeading} tabIndex={-1}>Complete your payment</h2>
            <p className={styles.description}>Use the email for your new Revphlo account. You will add your company details after payment.</p>
            <StripePayment session={session} />
            <p className={styles.paymentNote}>After payment, you will open RevPhlo to verify your email and add your company details.</p>
          </div> : <form onSubmit={submit} className={styles.form}>
            <div>
              <p className={styles.sectionLabel}>STEP 1 OF 3</p>
              <h2 id="payment-heading">Secure checkout</h2>
              <p className={styles.description}>Complete your payment first. Your company details come next.</p>
            </div>

            {availability.state === "loading" ? <p className={styles.notice} role="status">Checking checkout availability…</p> : null}
            {availability.state === "unavailable" ? <div className={styles.notice} role="status"><strong>Checkout is not available right now.</strong><p>You can contact us for help, or try again in a moment.</p><div className={styles.noticeActions}>{appOrigin ? <><button type="button" className={styles.textButton} onClick={() => setLoadAttempt((value) => value + 1)}>Check again</button><a href={`${appOrigin}/get-started`}>Open checkout in RevPhlo <Arrow /></a></> : null}<a href="mailto:support@revphlo.com">Contact support</a></div></div> : null}

            <div className={styles.termsBlock}>
              <label className={styles.terms}><input type="checkbox" required checked={termsAccepted} disabled={busy} onChange={(event) => setTermsAccepted(event.target.checked)} /><span>I agree to pay <strong>$2,000 today</strong> for setup and the first 30 days, then <strong>$397 each month</strong>. I agree to a <strong>six-month minimum term</strong>. The plan continues monthly after that until canceled. Cancellation takes effect after the minimum term or current billing period, whichever is later.</span></label>
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
            <div className={styles.minimum}><span>Minimum term</span><strong>6 months</strong></div>
            <p className={styles.smallPrint}>The plan continues monthly after the minimum term until canceled.</p>
          </div>
          <div className={styles.nextSteps}>
            <h3>What happens after payment</h3>
            <ol><li><span>1</span><div><strong>Create your login</strong><p>Use and verify the email from checkout.</p></div></li><li><span>2</span><div><strong>Add your company details</strong><p>Name your company and invite your first team members.</p></div></li><li><span>3</span><div><strong>Connect your tools</strong><p>The wizard guides you through integrations, calendars, and team setup.</p></div></li></ol>
          </div>
        </aside>
      </div>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} RevPhlo</span><nav aria-label="Legal"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="mailto:support@revphlo.com">Support</a></nav></footer>
    </main>
  </div>;
}

"use client";

import { useState } from "react";
import styles from "./demo.module.css";

const APP_DEMO_START_URL = "https://app.revphlo.com/api/demo/start";
const EMPTY_ERRORS = {};

function getTracking() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || "",
  };
}

function openAppDemo({ name, email, phone }) {
  const form = document.createElement("form");
  form.action = APP_DEMO_START_URL;
  form.method = "post";
  form.target = "_self";
  form.acceptCharset = "UTF-8";

  for (const [field, value] of Object.entries({ name, email, phone, website: "" })) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = field;
    input.value = String(value || "");
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

export default function DemoOptInForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");
    setFieldErrors(EMPTY_ERRORS);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, ...getTracking() }),
      });

      let result = null;
      if ((response.headers.get("content-type") || "").includes("application/json")) {
        try {
          result = await response.json();
        } catch {
          result = null;
        }
      }

      if (!response.ok || !result?.ok) {
        setFieldErrors(result?.fieldErrors || EMPTY_ERRORS);
        throw new Error(result?.error || "We couldn't unlock the demo. Please try again.");
      }

      setStatus("success");
      openAppDemo(payload);
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't unlock the demo. Please try again."
      );
    }
  }

  return (
    <form
      className={styles.form}
      action="/api/demo-lead"
      method="post"
      onSubmit={onSubmit}
      noValidate
    >
      <div className={styles.formIntro}>
        <span className={styles.formStep}>INSTANT ACCESS</span>
        <h2>Unlock the live demo</h2>
        <p>Tell us where to send your access, then explore RevPhlo on your own.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-name">Full name</label>
        <input
          id="demo-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "demo-name-error" : undefined}
          required
        />
        {fieldErrors.name && <span id="demo-name-error" className={styles.fieldError}>{fieldErrors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-email">Work email</label>
        <input
          id="demo-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="jane@company.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "demo-email-error" : undefined}
          required
        />
        {fieldErrors.email && <span id="demo-email-error" className={styles.fieldError}>{fieldErrors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-phone">Phone number</label>
        <input
          id="demo-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(212) 555-0199"
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "demo-phone-error" : undefined}
          required
        />
        {fieldErrors.phone && <span id="demo-phone-error" className={styles.fieldError}>{fieldErrors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-company">Company name</label>
        <input
          id="demo-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Growth"
          aria-invalid={Boolean(fieldErrors.company)}
          aria-describedby={fieldErrors.company ? "demo-company-error" : undefined}
          required
        />
        {fieldErrors.company && <span id="demo-company-error" className={styles.fieldError}>{fieldErrors.company}</span>}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <div className={styles.formError} role="alert">{error}</div>}

      <p className={styles.consent}>
        By submitting, you agree that Revphlo may contact you by email or phone about this demo and a product walkthrough.{" "}
        See our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-of-service">Terms</a>.
      </p>
      <button className={styles.submit} type="submit" disabled={status === "submitting" || status === "success"}>
        <span>{status === "submitting" || status === "success" ? "Opening your demo..." : "Enter the live demo"}</span>
        {status === "submitting" || status === "success" ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>

      <p className={styles.formTrust}>
        No credit card required <span aria-hidden="true">&middot;</span> Access in under 30 seconds
      </p>
    </form>
  );
}

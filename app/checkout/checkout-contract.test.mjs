import test from "node:test";
import assert from "node:assert/strict";
import { CHECKOUT_PLAN, getAppOrigin, isExpectedPlan, isCheckoutClientSession, getCheckoutAvailability, checkoutSessionId, checkoutReferralBody, queueCheckoutReferral } from "./checkout-contract.mjs";

test("custom checkout requires the app to advertise support", () => {
  const data = { enabled: true, embeddedEnabled: true, publishableKey: "pk_test_example", plan: CHECKOUT_PLAN };
  assert.deepEqual(getCheckoutAvailability(data), { state: "hosted" });
  assert.deepEqual(getCheckoutAvailability({ ...data, supportedUiModes: ["hosted", "embedded"] }), { state: "hosted" });
  assert.deepEqual(getCheckoutAvailability({ ...data, supportedUiModes: ["hosted", "embedded", "custom"] }), { state: "ready" });
  assert.deepEqual(getCheckoutAvailability({ ...data, supportedUiModes: ["embedded"] }), { state: "unavailable" });
  assert.deepEqual(getCheckoutAvailability({ ...data, supportedUiModes: "custom" }), { state: "unavailable" });
});

test("hosted checkout remains available without a valid Payment Element key", () => {
  const data = { enabled: true, supportedUiModes: ["hosted", "custom"], plan: CHECKOUT_PLAN };
  assert.deepEqual(getCheckoutAvailability(data), { state: "hosted" });
  assert.deepEqual(getCheckoutAvailability({ ...data, embeddedEnabled: true, publishableKey: "sk_test_example" }), { state: "hosted" });
  assert.deepEqual(getCheckoutAvailability({ ...data, enabled: false }), { state: "unavailable" });
  assert.deepEqual(getCheckoutAvailability({ ...data, plan: { ...CHECKOUT_PLAN, amount: 1 } }), { state: "unavailable" });
  assert.deepEqual(getCheckoutAvailability(null), { state: "unavailable" });
});

test("customer data only goes to a configured HTTPS origin", () => {
  assert.equal(getAppOrigin("https://app.revphlo.com"), "https://app.revphlo.com");
  for (const invalid of ["", "/checkout", "javascript:alert(1)", "http://app.revphlo.com", "https://app.revphlo.com/api", "https://user:pass@app.revphlo.com", "https://app.revphlo.com?next=other", "https://app.revphlo.com#other", "http://localhost:3001"]) {
    assert.equal(getAppOrigin(invalid), null, invalid);
  }
  assert.equal(getAppOrigin("http://localhost:3001", false), "http://localhost:3001");
  assert.equal(getAppOrigin("http://example.com", false), null);
});

test("checkout is disabled when the server plan differs from the displayed agreement", () => {
  assert.equal(isExpectedPlan({ ...CHECKOUT_PLAN, name: "Revphlo" }), true);
  for (const field of ["setupAmount", "amount", "minimumMonths", "includedDays", "intervalCount"]) {
    assert.equal(isExpectedPlan({ ...CHECKOUT_PLAN, [field]: CHECKOUT_PLAN[field] + 1 }), false, field);
  }
  assert.equal(isExpectedPlan({ ...CHECKOUT_PLAN, currency: "eur" }), false);
  assert.equal(isExpectedPlan(null), false);
});

test("a checkout session must use the same Stripe mode as its public key", () => {
  assert.equal(isCheckoutClientSession({ publishableKey: "pk_test_example", clientSecret: "cs_test_example_secret_example" }), true);
  assert.equal(isCheckoutClientSession({ publishableKey: "pk_live_example", clientSecret: "cs_test_example_secret_example" }), false);
  assert.equal(isCheckoutClientSession({ publishableKey: "sk_test_example", clientSecret: "cs_test_example_secret_example" }), false);
  assert.equal(isCheckoutClientSession({ publishableKey: "pk_test_example", clientSecret: "https://other.example" }), false);
});

test("Stripe checkout secrets accept an opaque encoded suffix without changing it", () => {
  for (const mode of ["test", "live"]) {
    const clientSecret = `cs_${mode}_Example123_secret_${"fake%2Fencoded%3Dvalue_-.".repeat(20)}`;
    const session = { publishableKey: `pk_${mode}_example`, clientSecret };
    assert.equal(isCheckoutClientSession(session), true);
    assert.equal(session.clientSecret, clientSecret);
    assert.equal(isCheckoutClientSession({ ...session, publishableKey: `pk_${mode === "live" ? "test" : "live"}_example` }), false);
  }
});

test("a checkout session id is the client secret prefix before _secret_", () => {
  assert.equal(checkoutSessionId("cs_test_example_secret_example"), "cs_test_example");
  assert.equal(checkoutSessionId("cs_live_Example123_secret_opaque%2Fvalue"), "cs_live_Example123");
  assert.equal(checkoutSessionId("cs_test_example_secret_"), null);
  assert.equal(checkoutSessionId("https://other.example"), null);
  assert.equal(checkoutSessionId(""), null);
  assert.equal(checkoutSessionId(null), null);
});

test("checkout referral uses tid, then refId, and skips when neither cookie exists", () => {
  const base = { sessionId: "cs_live_example", email: "buyer@example.com" };
  assert.deepEqual(checkoutReferralBody({ ...base, cookie: "_fprom_tid=click123; _fprom_ref=partner" }), { ...base, tid: "click123" });
  assert.deepEqual(checkoutReferralBody({ ...base, cookie: "_fprom_tid=; _fprom_ref=partner" }), { ...base, refId: "partner" });
  assert.deepEqual(checkoutReferralBody({ ...base, cookie: "other=1; _fprom_ref=code%2F1" }), { ...base, refId: "code/1" });
  assert.equal(checkoutReferralBody({ ...base, cookie: "theme=dark" }), null);
  assert.equal(checkoutReferralBody({ ...base, cookie: "" }), null);
  assert.equal(checkoutReferralBody({ sessionId: "", email: "buyer@example.com", cookie: "_fprom_tid=click123" }), null);
  assert.deepEqual(checkoutReferralBody({ ...base, cookie: "_fprom_tid_extra=no; _fprom_ref=yes" }), { ...base, refId: "yes" });
});

test("checkout referral posts once and never throws", async () => {
  const sent = new Set();
  const calls = [];
  const fetchImpl = (url, init) => {
    calls.push({ url, init });
    return Promise.resolve({ ok: true });
  };
  const input = {
    sessionId: "cs_live_example",
    email: "buyer@example.com",
    cookie: "_fprom_tid=click123; _fprom_ref=partner",
    sent,
    fetchImpl,
  };
  queueCheckoutReferral(input);
  queueCheckoutReferral(input);
  queueCheckoutReferral({ ...input, cookie: "" });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "/api/firstpromoter/signup");
  assert.equal(calls[0].init.credentials, "same-origin");
  assert.deepEqual(JSON.parse(calls[0].init.body), { sessionId: "cs_live_example", email: "buyer@example.com", tid: "click123" });
  assert.equal(calls[0].init.body.includes("refId"), false);

  const failing = [];
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => { errors.push(args); };
  try {
    queueCheckoutReferral({
      ...input,
      email: "other@example.com",
      cookie: "_fprom_ref=partner",
      fetchImpl: () => {
        failing.push("called");
        return Promise.reject(new Error("offline"));
      },
    });
    queueCheckoutReferral({
      ...input,
      email: "third@example.com",
      cookie: "_fprom_tid=click",
      fetchImpl: () => { throw new Error("blocked"); },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
  } finally {
    console.error = originalError;
  }
  assert.deepEqual(failing, ["called"]);
  assert.equal(calls.length, 1);
  assert.equal(errors.length, 2);
  queueCheckoutReferral({ ...input, email: "other@example.com", fetchImpl });
  assert.equal(calls.length, 1);
});

test("Stripe checkout secrets reject missing, whitespace, control and oversized values", () => {
  for (const clientSecret of [
    "", "cs_live_Example123_secret_", "cs_live__secret_opaque", "other_live_Example123_secret_opaque",
    "cs_live_Example123_secret_ ", "cs_live_Example123_secret_some value",
    "cs_live_Example123_secret_value\n", "cs_live_Example123_secret_value\t",
    "cs_live_Example123_secret_value\u00a0", "cs_live_Example123_secret_value\u0000",
    `cs_live_Example123_secret_${"x".repeat(4096)}`,
  ]) {
    assert.equal(isCheckoutClientSession({ publishableKey: "pk_live_example", clientSecret }), false);
  }
});

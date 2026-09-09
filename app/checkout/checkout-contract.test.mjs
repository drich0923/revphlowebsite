import test from "node:test";
import assert from "node:assert/strict";
import { CHECKOUT_PLAN, getAppOrigin, isExpectedPlan, isEmbeddedSession, validateDetails } from "./checkout-contract.mjs";

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
  for (const field of ["setupAmount", "amount", "minimumTotalAmount", "minimumMonths", "includedDays", "intervalCount"]) {
    assert.equal(isExpectedPlan({ ...CHECKOUT_PLAN, [field]: CHECKOUT_PLAN[field] + 1 }), false, field);
  }
  assert.equal(isExpectedPlan({ ...CHECKOUT_PLAN, currency: "eur" }), false);
  assert.equal(isExpectedPlan(null), false);
});

test("an embedded session must use the same Stripe mode as its public key", () => {
  assert.equal(isEmbeddedSession({ publishableKey: "pk_test_example", clientSecret: "cs_test_example_secret_example" }), true);
  assert.equal(isEmbeddedSession({ publishableKey: "pk_live_example", clientSecret: "cs_test_example_secret_example" }), false);
  assert.equal(isEmbeddedSession({ publishableKey: "sk_test_example", clientSecret: "cs_test_example_secret_example" }), false);
  assert.equal(isEmbeddedSession({ publishableKey: "pk_test_example", clientSecret: "https://other.example" }), false);
});

test("Stripe checkout secrets accept an opaque encoded suffix without changing it", () => {
  for (const mode of ["test", "live"]) {
    const clientSecret = `cs_${mode}_Example123_secret_${"fake%2Fencoded%3Dvalue_-.".repeat(20)}`;
    const session = { publishableKey: `pk_${mode}_example`, clientSecret };
    assert.equal(isEmbeddedSession(session), true);
    assert.equal(session.clientSecret, clientSecret);
    assert.equal(isEmbeddedSession({ ...session, publishableKey: `pk_${mode === "live" ? "test" : "live"}_example` }), false);
  }
});

test("Stripe checkout secrets reject missing, whitespace, control and oversized values", () => {
  for (const clientSecret of [
    "", "cs_live_Example123_secret_", "cs_live__secret_opaque", "other_live_Example123_secret_opaque",
    "cs_live_Example123_secret_ ", "cs_live_Example123_secret_some value",
    "cs_live_Example123_secret_value\n", "cs_live_Example123_secret_value\t",
    "cs_live_Example123_secret_value\u00a0", "cs_live_Example123_secret_value\u0000",
    `cs_live_Example123_secret_${"x".repeat(4096)}`,
  ]) {
    assert.equal(isEmbeddedSession({ publishableKey: "pk_live_example", clientSecret }), false);
  }
});

const details = { companyName: "Example", ownerName: "Owner", ownerEmail: "owner@example.com", timezone: "America/New_York", teamMembers: [], termsAccepted: true };
test("owner and team addresses must be distinct before payment", () => {
  assert.equal(validateDetails(details), null);
  assert.match(validateDetails({ ...details, teamMembers: [{ name: "Teammate", email: " Owner@Example.com ", role: "rep" }] }), /different email/);
  assert.match(validateDetails({ ...details, teamMembers: [{ name: "", email: "team@example.com", role: "rep" }] }), /name/);
  assert.match(validateDetails({ ...details, termsAccepted: false }), /Accept/);
  assert.match(validateDetails({ ...details, timezone: "invalid" }), /time zone/);
});

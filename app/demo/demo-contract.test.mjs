import test from "node:test";
import assert from "node:assert/strict";
import {
  cleanTracking,
  getConfiguredUrl,
  splitName,
  validateDemoLead,
} from "./demo-contract.mjs";

test("validates and normalizes a complete demo lead", () => {
  const result = validateDemoLead({
    name: "  Jane   Doe ",
    email: " JANE@EXAMPLE.COM ",
    phone: "+1 (212) 555-0199",
    company: "  Acme   Growth  ",
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.data, {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (212) 555-0199",
    company: "Acme Growth",
  });
});

test("returns field-specific errors for incomplete leads", () => {
  const result = validateDemoLead({ name: "J", email: "nope", phone: "123", company: "" });

  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.fieldErrors).sort(), ["company", "email", "name", "phone"]);
});

test("splits first and last names for GoHighLevel mapping", () => {
  assert.deepEqual(splitName("Jane Maria Doe"), { firstName: "Jane", lastName: "Maria Doe" });
});

test("keeps only supported tracking fields", () => {
  assert.deepEqual(
    cleanTracking({ utmSource: "linkedin", utmCampaign: "founders", ignored: "value" }),
    { utmSource: "linkedin", utmCampaign: "founders" }
  );
});

test("requires HTTPS except for an explicitly allowed local URL", () => {
  assert.equal(getConfiguredUrl("https://example.com/demo")?.href, "https://example.com/demo");
  assert.equal(getConfiguredUrl("http://example.com/demo"), null);
  assert.equal(getConfiguredUrl("http://127.0.0.1:4000/hook", { allowLocalhost: true })?.port, "4000");
});


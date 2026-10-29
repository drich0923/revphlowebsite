import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  GOOGLE_CONSENT_DENIED,
  consentDefaultSnippet,
  effectiveChoice,
  readChoiceFromCookie,
  shouldLoadOptionalScripts,
} from "./consent.mjs";

test("consent mode defaults every storage signal to denied", () => {
  const snippet = consentDefaultSnippet();
  for (const [key, value] of Object.entries(GOOGLE_CONSENT_DENIED)) {
    assert.equal(value, "denied");
    assert.match(snippet, new RegExp(`"${key}":"denied"`));
  }
  assert.match(snippet, /gtag\('consent','default'/);
  assert.equal(snippet.includes('"granted"'), false);
});

test("a stored accept is ignored when Global Privacy Control is on", () => {
  assert.equal(effectiveChoice({ stored: "accepted", globalPrivacyControl: true }), "rejected");
  assert.equal(effectiveChoice({ stored: null, globalPrivacyControl: true }), "rejected");
  assert.equal(effectiveChoice({ stored: "accepted", globalPrivacyControl: false }), "accepted");
  assert.equal(effectiveChoice({ stored: null, globalPrivacyControl: false }), null);
  assert.equal(shouldLoadOptionalScripts("accepted"), true);
  assert.equal(shouldLoadOptionalScripts("rejected"), false);
  assert.equal(shouldLoadOptionalScripts(null), false);
});

test("reads only the consent cookie", () => {
  assert.equal(readChoiceFromCookie("theme=dark; revphlo_consent=accepted"), "accepted");
  assert.equal(readChoiceFromCookie("_gcl_au=1; revphlo_consent=rejected"), "rejected");
  assert.equal(readChoiceFromCookie("revphlo_consent_extra=accepted"), null);
  assert.equal(readChoiceFromCookie(""), null);
});

test("the root layout does not load optional trackers before a choice", () => {
  const layout = readFileSync(new URL("../layout.jsx", import.meta.url), "utf8");
  assert.equal(layout.includes("googletagmanager.com/gtag/js"), false);
  assert.equal(layout.includes("cdn.firstpromoter.com"), false);
  assert.equal(layout.includes("fast.vidalytics.com"), false);
  assert.equal(layout.includes("embed.typeform.com"), false);
  assert.match(layout, /consentDefaultSnippet/);
  assert.match(layout, /ConsentManager/);
});

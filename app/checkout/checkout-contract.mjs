export const CHECKOUT_PLAN = Object.freeze({
  setupAmount: 200000,
  amount: 39700,
  currency: "usd",
  interval: "month",
  intervalCount: 1,
  minimumMonths: 6,
  includedDays: 30,
});

/** Only build configuration can select the application that receives form data. */
export function getAppOrigin(value, production = true) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (
      url.username || url.password || url.search || url.hash || url.pathname !== "/" ||
      (url.protocol !== "https:" && !(url.protocol === "http:" && local && !production))
    ) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function isExpectedPlan(plan) {
  return !!plan && Object.entries(CHECKOUT_PLAN).every(([key, value]) => plan[key] === value);
}

export function isPublishableKey(value) {
  return typeof value === "string" && /^pk_(?:test|live)_[A-Za-z0-9]+$/.test(value);
}

/** An older app can accept hosted checkout without supporting the Payment Element. */
export function getCheckoutAvailability(data) {
  if (!data?.enabled || !isExpectedPlan(data.plan)) return { state: "unavailable" };
  const modes = data.supportedUiModes;
  if (Array.isArray(modes) && modes.includes("custom") && data.embeddedEnabled && isPublishableKey(data.publishableKey)) {
    return { state: "ready" };
  }
  if (modes === undefined || (Array.isArray(modes) && modes.includes("hosted"))) {
    return { state: "hosted" };
  }
  return { state: "unavailable" };
}

export function isCheckoutClientSession(value) {
  if (!value || !isPublishableKey(value.publishableKey) || typeof value.clientSecret !== "string") return false;
  // Stripe owns the secret format. Encoded characters are valid in its opaque suffix.
  if (value.clientSecret.length > 4096 || /[\s\u0000-\u001f\u007f]/u.test(value.clientSecret)) return false;
  const match = /^cs_(test|live)_[A-Za-z0-9]+_secret_(.+)$/u.exec(value.clientSecret);
  return !!match && value.publishableKey.startsWith(`pk_${match[1]}_`);
}

/** Stripe Checkout client secrets are `{sessionId}_secret_{secret}`. */
export function checkoutSessionId(clientSecret) {
  if (typeof clientSecret !== "string" || clientSecret.length > 4096 || /[\s\u0000-\u001f\u007f]/u.test(clientSecret)) return null;
  const match = /^(cs_(?:test|live)_[A-Za-z0-9]+)_secret_.+$/u.exec(clientSecret);
  return match ? match[1] : null;
}

function readCookie(cookie, name) {
  if (typeof cookie !== "string" || !name) return "";
  for (const part of cookie.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const separator = trimmed.indexOf("=");
    const key = separator === -1 ? trimmed : trimmed.slice(0, separator);
    if (key !== name) continue;
    const raw = separator === -1 ? "" : trimmed.slice(separator + 1);
    try {
      return decodeURIComponent(raw).trim();
    } catch {
      return raw.trim();
    }
  }
  return "";
}

/** Prefer the FirstPromoter click id. Send the referral code only when tid is absent. */
export function checkoutReferralBody({ sessionId, email, cookie }) {
  if (typeof sessionId !== "string" || !sessionId || typeof email !== "string" || !email) return null;
  const tid = readCookie(cookie, "_fprom_tid");
  if (tid) return { sessionId, email, tid };
  const refId = readCookie(cookie, "_fprom_ref");
  if (refId) return { sessionId, email, refId };
  return null;
}

/** Fire-and-forget. Never throws, and sends at most once for the same session and email. */
export function queueCheckoutReferral({ appOrigin, sessionId, email, cookie, sent, fetchImpl = fetch }) {
  try {
    if (!appOrigin || !sessionId || !email || !sent || sent.has(`${sessionId}\n${email}`)) return;
    const body = checkoutReferralBody({ sessionId, email, cookie });
    if (!body) return;
    sent.add(`${sessionId}\n${email}`);
    Promise.resolve(fetchImpl(`${appOrigin}/api/checkout/referral`, {
      method: "POST",
      credentials: "omit",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })).then((response) => {
      if (response && response.ok === false) console.error("Could not attach the referral to checkout.", response.status);
    }, (error) => {
      console.error("Could not attach the referral to checkout.", error);
    });
  } catch (error) {
    console.error("Could not attach the referral to checkout.", error);
  }
}

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

export function isEmbeddedSession(value) {
  if (!value || !isPublishableKey(value.publishableKey) || typeof value.clientSecret !== "string") return false;
  // Stripe owns the secret format. Encoded characters are valid in its opaque suffix.
  if (value.clientSecret.length > 4096 || /[\s\u0000-\u001f\u007f]/u.test(value.clientSecret)) return false;
  const match = /^cs_(test|live)_[A-Za-z0-9]+_secret_(.+)$/u.exec(value.clientSecret);
  return !!match && value.publishableKey.startsWith(`pk_${match[1]}_`);
}

export const CHECKOUT_PLAN = Object.freeze({
  setupAmount: 200000,
  amount: 39700,
  currency: "usd",
  interval: "month",
  intervalCount: 1,
  minimumMonths: 6,
  minimumTotalAmount: 398500,
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
  const match = /^cs_(test|live)_[A-Za-z0-9]+_secret_[A-Za-z0-9]+$/.exec(value.clientSecret);
  return !!match && value.publishableKey.startsWith(`pk_${match[1]}_`);
}

export function validateDetails(input) {
  if (!input.companyName.trim()) return "Enter your company name.";
  if (!input.ownerName.trim()) return "Enter the account owner's name.";
  const emails = new Set();
  const users = [{ email: input.ownerEmail, name: input.ownerName }, ...input.teamMembers];
  for (const user of users) {
    if (!user.name.trim()) return "Enter a name for each team member, or remove the empty row.";
    const email = user.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address for each person.";
    if (emails.has(email)) return "Use a different email address for each person.";
    emails.add(email);
  }
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: input.timezone });
    if (!input.timezone) return "Select your company's time zone.";
  } catch {
    return "Select your company's time zone.";
  }
  if (input.teamMembers.length > 10) return "You can invite up to 10 people here. Add more during setup.";
  if (!input.termsAccepted) return "Accept the payment terms to continue.";
  return null;
}

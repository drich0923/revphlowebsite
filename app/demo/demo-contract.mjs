const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  tracking: 160,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TRACKING_FIELDS = ["utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm"];

export function cleanString(value, maxLength = 200) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

export function splitName(name) {
  const parts = cleanString(name, FIELD_LIMITS.name).split(" ").filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
}

export function validateDemoLead(input) {
  const data = {
    name: cleanString(input?.name, FIELD_LIMITS.name),
    email: cleanString(input?.email, FIELD_LIMITS.email).toLowerCase(),
    phone: cleanString(input?.phone, FIELD_LIMITS.phone),
    company: cleanString(input?.company, FIELD_LIMITS.company),
  };
  const fieldErrors = {};

  if (data.name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(data.email)) fieldErrors.email = "Enter a valid work email.";

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (data.company.length < 2) fieldErrors.company = "Enter your company name.";

  return {
    ok: Object.keys(fieldErrors).length === 0,
    data,
    fieldErrors,
  };
}

export function cleanTracking(input) {
  return TRACKING_FIELDS.reduce((tracking, field) => {
    const value = cleanString(input?.[field], FIELD_LIMITS.tracking);
    if (value) tracking[field] = value;
    return tracking;
  }, {});
}

export function getConfiguredUrl(value, { allowLocalhost = false } = {}) {
  const cleaned = cleanString(value, 2_048);
  if (!cleaned) return null;

  try {
    const url = new URL(cleaned);
    const localHttp =
      allowLocalhost &&
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (url.protocol !== "https:" && !localHttp) return null;
    return url;
  } catch {
    return null;
  }
}


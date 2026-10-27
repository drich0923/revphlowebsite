import { isIP } from "node:net";

const SIGNUP_URL = "https://v2.firstpromoter.com/api/v2/track/signup";
const DEFAULT_ACCOUNT_ID = "or99bhsm";
const MAX_REQUEST_BYTES = 8_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_PATTERN = /^cs_(?:test|live)_[A-Za-z0-9]{1,200}$/;

function json(body, status) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function empty(status = 204) {
  return new Response(null, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function hasTrustedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
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

/** Absent is valid. A present value must be a short printable token. */
function optionalTrackingId(value) {
  if (value == null) return { ok: true, value: "" };
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (trimmed.length > 128 || !/^[\x21-\x7e]+$/.test(trimmed) || /[<>"'`;\\\s]/.test(trimmed)) {
    return { ok: false };
  }
  return { ok: true, value: trimmed };
}

function cookieTrackingId(cookie, name) {
  const parsed = optionalTrackingId(readCookie(cookie, name));
  return parsed.ok ? parsed.value : "";
}

function optionalSessionId(value) {
  if (value == null) return { ok: true, value: "" };
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (!SESSION_PATTERN.test(trimmed)) return { ok: false };
  return { ok: true, value: trimmed };
}

function cleanEmail(value) {
  if (typeof value !== "string") return "";
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return "";
  return email;
}

function clientIp(header) {
  if (typeof header !== "string") return "";
  const first = header.split(",")[0].trim();
  if (!first || first.length > 45) return "";
  return isIP(first) ? first : "";
}

function accountId() {
  const value = process.env.FIRSTPROMOTER_ACCOUNT_ID;
  if (typeof value === "string" && value.trim()) return value.trim();
  return DEFAULT_ACCOUNT_ID;
}

function apiKey() {
  const value = process.env.FIRSTPROMOTER_API_KEY;
  if (typeof value !== "string") return "";
  return value.trim();
}

let loggedMissingSlackWebhook = false;
let loggedInvalidSlackWebhook = false;

export function resetSlackReferralNoticeForTests() {
  loggedMissingSlackWebhook = false;
  loggedInvalidSlackWebhook = false;
}

function slackWebhookUrl() {
  const value = process.env.SLACK_REFERRAL_WEBHOOK_URL;
  if (typeof value !== "string" || !value.trim()) {
    if (!loggedMissingSlackWebhook) {
      loggedMissingSlackWebhook = true;
      console.error("Referral Slack notification skipped: SLACK_REFERRAL_WEBHOOK_URL is not set.");
    }
    return "";
  }

  const url = value.trim();
  let parsed = null;
  try {
    parsed = new URL(url);
  } catch {
    parsed = null;
  }
  const allowed = parsed
    && parsed.protocol === "https:"
    && parsed.hostname === "hooks.slack.com"
    && !parsed.username
    && !parsed.password
    && url.startsWith("https://hooks.slack.com/");
  if (!allowed) {
    if (!loggedInvalidSlackWebhook) {
      loggedInvalidSlackWebhook = true;
      console.error("Referral Slack notification skipped: SLACK_REFERRAL_WEBHOOK_URL must start with https://hooks.slack.com/.");
    }
    return "";
  }
  return url;
}

function escapeSlack(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

function pickString(...values) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return String(value).slice(0, 200);
    if (typeof value === "string" && value.trim()) return value.trim().slice(0, 200);
  }
  return "";
}

function referralDetails(payload) {
  const root = asRecord(payload) || {};
  const promoter = asRecord(root.promoter) || asRecord(root.affiliate) || {};
  const referral = asRecord(root.referral) || {};
  const nestedPromoter = asRecord(referral.promoter) || {};
  return {
    promoterName: pickString(promoter.name, promoter.full_name, nestedPromoter.name, root.promoter_name),
    promoterEmail: pickString(promoter.email, nestedPromoter.email, root.promoter_email),
    referralId: pickString(referral.id, referral.referral_id, root.referral_id),
  };
}

function newYorkTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function signupSlackText({ email, tid, refId, status, details, timestamp }) {
  const lines = [
    ":tada: New referral signup",
    `Email: ${escapeSlack(email)}`,
    tid ? `Tracking id: ${escapeSlack(tid)}` : `Referral code: ${escapeSlack(refId)}`,
    `FirstPromoter status: ${status}`,
    `Time: ${escapeSlack(timestamp)}`,
  ];
  if (details.promoterName) lines.push(`Promoter: ${escapeSlack(details.promoterName)}`);
  if (details.promoterEmail) lines.push(`Promoter email: ${escapeSlack(details.promoterEmail)}`);
  if (details.referralId) lines.push(`Referral id: ${escapeSlack(details.referralId)}`);
  return lines.join("\n");
}

async function readReferralDetails(response) {
  try {
    const text = await response.text();
    if (!text || text.length > 100_000) return referralDetails(null);
    return referralDetails(JSON.parse(text));
  } catch {
    return referralDetails(null);
  }
}

async function notifyReferralSignup({ email, tid, refId, status, details }) {
  const webhook = slackWebhookUrl();
  if (!webhook) return;
  const text = signupSlackText({
    email,
    tid,
    refId,
    status,
    details,
    timestamp: newYorkTimestamp(),
  });
  try {
    const response = await fetch(webhook, {
      method: "POST",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });
    if (response.status < 200 || response.status >= 300) {
      console.error("Referral Slack notification was not accepted.", response.status);
    }
    try {
      await response.body?.cancel?.();
    } catch {
      // Closing the unused response body must not change the signup result.
    }
  } catch (error) {
    console.error("Referral Slack notification failed.", error instanceof Error ? error.name : "UnknownError");
  }
}

export async function POST(request) {
  if (!hasTrustedOrigin(request)) {
    return json({ ok: false }, 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ ok: false }, 415);
  }

  const requestLength = Number(request.headers.get("content-length") || 0);
  if (requestLength > MAX_REQUEST_BYTES) {
    return json({ ok: false }, 413);
  }

  let body;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return json({ ok: false }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ ok: false }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ ok: false }, 400);
  }

  const email = cleanEmail(body.email);
  if (!email) return json({ ok: false }, 400);

  const tid = optionalTrackingId(body.tid);
  const refId = optionalTrackingId(body.refId);
  const sessionId = optionalSessionId(body.sessionId);
  if (!tid.ok || !refId.ok || !sessionId.ok) return json({ ok: false }, 400);

  const cookie = request.headers.get("cookie") || "";
  const trackingTid = tid.value || cookieTrackingId(cookie, "_fprom_tid");
  const trackingRef = trackingTid ? "" : refId.value || cookieTrackingId(cookie, "_fprom_ref");
  if (!trackingTid && !trackingRef) return empty();

  const key = apiKey();
  if (!key) {
    console.error("FirstPromoter signup tracking is missing FIRSTPROMOTER_API_KEY.");
    return empty();
  }

  const payload = { email };
  if (trackingTid) payload.tid = trackingTid;
  else payload.ref_id = trackingRef;
  if (sessionId.value) payload.uid = sessionId.value;
  const ip = clientIp(request.headers.get("x-forwarded-for"));
  if (ip) payload.ip = ip;

  let trackedStatus = 0;
  let details = referralDetails(null);
  try {
    const upstream = await fetch(SIGNUP_URL, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "Account-ID": accountId(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (upstream.status >= 200 && upstream.status < 300) {
      trackedStatus = upstream.status;
      details = await readReferralDetails(upstream);
    } else {
      console.error("FirstPromoter signup tracking was not accepted.", upstream.status);
      try {
        await upstream.body?.cancel?.();
      } catch {
        // Closing the unused response body must not change the checkout result.
      }
    }
  } catch (error) {
    console.error("FirstPromoter signup tracking failed.", error instanceof Error ? error.name : "UnknownError");
  }

  if (trackedStatus) {
    await notifyReferralSignup({
      email,
      tid: trackingTid,
      refId: trackingRef,
      status: trackedStatus,
      details,
    });
  }

  return empty();
}

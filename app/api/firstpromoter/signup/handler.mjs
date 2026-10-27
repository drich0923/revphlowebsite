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
    if (upstream.status < 200 || upstream.status >= 300) {
      console.error("FirstPromoter signup tracking was not accepted.", upstream.status);
    }
    try {
      await upstream.body?.cancel?.();
    } catch {
      // Closing the unused response body must not change the checkout result.
    }
  } catch (error) {
    console.error("FirstPromoter signup tracking failed.", error instanceof Error ? error.name : "UnknownError");
  }

  return empty();
}

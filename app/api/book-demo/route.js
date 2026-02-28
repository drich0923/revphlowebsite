import { NextResponse } from "next/server";

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  try {
    const body = await request.json();

    const payload = {
      name: cleanString(body?.name),
      email: cleanString(body?.email),
      company: cleanString(body?.company),
      notes: cleanString(body?.notes),
    };

    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "name and email are required" },
        { status: 400 }
      );
    }

    if (!isEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, error: "invalid email format" },
        { status: 400 }
      );
    }

    // Placeholder: replace with your CRM/automation integration.
    // Example targets: HubSpot, GoHighLevel, Airtable, Slack webhook.
    if (process.env.DEMO_WEBHOOK_URL) {
      await fetch(process.env.DEMO_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "revphlowebsite", ...payload }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request body" }, { status: 400 });
  }
}

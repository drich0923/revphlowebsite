import {
  cleanString,
  cleanTracking,
  getConfiguredUrl,
  splitName,
  validateDemoLead,
} from "../../demo/demo-contract.mjs";

const MAX_REQUEST_BYTES = 12_000;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  const requestLength = Number(request.headers.get("content-length") || 0);
  if (requestLength > MAX_REQUEST_BYTES) {
    return json({ ok: false, error: "That submission is too large." }, 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "We couldn't read that submission. Please try again." }, 400);
  }

  const allowLocalhost = process.env.NODE_ENV !== "production";
  const webhookUrl = getConfiguredUrl(process.env.DEMO_WEBHOOK_URL, { allowLocalhost });
  const sandboxUrl = getConfiguredUrl(process.env.DEMO_SANDBOX_URL, { allowLocalhost });

  if (!webhookUrl || !sandboxUrl) {
    console.error("Demo opt-in is missing a valid webhook or sandbox destination.");
    return json(
      { ok: false, error: "Demo access is temporarily unavailable. Please try again shortly." },
      503
    );
  }

  const validation = validateDemoLead(body);
  if (!validation.ok) {
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: validation.fieldErrors,
      },
      400
    );
  }

  // Basic honeypot: do not forward spam or reveal the gated sandbox destination.
  if (cleanString(body?.website, 200)) {
    return json({ ok: false, error: "We couldn't unlock the demo. Please try again." }, 400);
  }

  const { name, email, phone, company } = validation.data;
  const { firstName, lastName } = splitName(name);
  const tracking = cleanTracking(body);
  const submissionId = crypto.randomUUID();

  const webhookPayload = {
    event: "revphlo.demo_access_requested",
    submissionId,
    source: "RevPhlo Demo Sandbox",
    leadSource: "revphlo_demo_opt_in",
    tags: ["revphlo-demo", "outbound-sales"],
    name,
    firstName,
    lastName,
    email,
    phone,
    company,
    companyName: company,
    pagePath: "/demo",
    submittedAt: new Date().toISOString(),
    ...tracking,
    contact: {
      name,
      firstName,
      lastName,
      email,
      phone,
      companyName: company,
      source: "RevPhlo Demo Sandbox",
      tags: ["revphlo-demo", "outbound-sales"],
    },
  };

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "RevPhlo-Demo-OptIn/1.0",
      },
      body: JSON.stringify(webhookPayload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      console.error("Demo lead webhook rejected the request.", {
        status: webhookResponse.status,
        submissionId,
      });
      return json(
        { ok: false, error: "We couldn't unlock the demo right now. Please try again." },
        502
      );
    }
  } catch (error) {
    console.error("Demo lead webhook request failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
      submissionId,
    });
    return json(
      { ok: false, error: "We couldn't unlock the demo right now. Please try again." },
      502
    );
  }

  return json({ ok: true, redirectUrl: sandboxUrl.href });
}

import test from "node:test";
import assert from "node:assert/strict";
import { POST, resetN8nReferralNoticeForTests } from "./handler.mjs";

const ROUTE_URL = "https://www.revphlo.com/api/firstpromoter/signup";
const SIGNUP_URL = "https://v2.firstpromoter.com/api/v2/track/signup";

function makeRequest(body, headers = {}) {
  return new Request(ROUTE_URL, {
    method: "POST",
    headers: {
      origin: "https://www.revphlo.com",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("firstpromoter signup route", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.FIRSTPROMOTER_API_KEY;
  const originalAccount = process.env.FIRSTPROMOTER_ACCOUNT_ID;
  const originalPublicKey = process.env.NEXT_PUBLIC_FIRSTPROMOTER_API_KEY;
  const originalN8nUrl = process.env.N8N_REFERRAL_WEBHOOK_URL;
  const originalN8nSecret = process.env.N8N_REFERRAL_WEBHOOK_SECRET;
  const originalPublicN8nUrl = process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL;
  const originalPublicN8nSecret = process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET;
  delete process.env.N8N_REFERRAL_WEBHOOK_URL;
  delete process.env.N8N_REFERRAL_WEBHOOK_SECRET;
  delete process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL;
  delete process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET;
  resetN8nReferralNoticeForTests();

  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.FIRSTPROMOTER_API_KEY;
    else process.env.FIRSTPROMOTER_API_KEY = originalKey;
    if (originalAccount === undefined) delete process.env.FIRSTPROMOTER_ACCOUNT_ID;
    else process.env.FIRSTPROMOTER_ACCOUNT_ID = originalAccount;
    if (originalPublicKey === undefined) delete process.env.NEXT_PUBLIC_FIRSTPROMOTER_API_KEY;
    else process.env.NEXT_PUBLIC_FIRSTPROMOTER_API_KEY = originalPublicKey;
    if (originalN8nUrl === undefined) delete process.env.N8N_REFERRAL_WEBHOOK_URL;
    else process.env.N8N_REFERRAL_WEBHOOK_URL = originalN8nUrl;
    if (originalN8nSecret === undefined) delete process.env.N8N_REFERRAL_WEBHOOK_SECRET;
    else process.env.N8N_REFERRAL_WEBHOOK_SECRET = originalN8nSecret;
    if (originalPublicN8nUrl === undefined) delete process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL;
    else process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL = originalPublicN8nUrl;
    if (originalPublicN8nSecret === undefined) delete process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET;
    else process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET = originalPublicN8nSecret;
    resetN8nReferralNoticeForTests();
  });

  await t.test("posts the click id, session uid, and client ip to FirstPromoter", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    process.env.FIRSTPROMOTER_ACCOUNT_ID = "acct_123";
    let delivered;
    globalThis.fetch = async (url, options) => {
      delivered = { url: String(url), options };
      return new Response(null, { status: 204 });
    };

    const response = await POST(makeRequest(
      { email: " Buyer@Example.com ", tid: "click123", refId: "ignored", sessionId: "cs_live_example" },
      { "x-forwarded-for": "203.0.113.9, 10.0.0.1" }
    ));

    assert.equal(response.status, 204);
    assert.equal(delivered.url, SIGNUP_URL);
    assert.equal(delivered.options.method, "POST");
    assert.equal(delivered.options.redirect, "manual");
    assert.equal(delivered.options.headers.Authorization, "Bearer secret-key");
    assert.equal(delivered.options.headers["Account-ID"], "acct_123");
    assert.equal(delivered.options.headers["Content-Type"], "application/json");
    assert.equal(delivered.options.signal.aborted, false);
    assert.deepEqual(JSON.parse(delivered.options.body), {
      email: "buyer@example.com",
      tid: "click123",
      uid: "cs_live_example",
      ip: "203.0.113.9",
    });
    assert.equal(JSON.parse(delivered.options.body).ref_id, undefined);
    assert.equal(await response.text(), "");
  });

  await t.test("sends ref_id only when tid is absent, including a same-origin cookie", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    delete process.env.FIRSTPROMOTER_ACCOUNT_ID;
    const bodies = [];
    globalThis.fetch = async (_url, options) => {
      bodies.push(JSON.parse(options.body));
      assert.equal(options.headers["Account-ID"], "or99bhsm");
      return new Response("ok", { status: 200 });
    };

    const fromBody = await POST(makeRequest({ email: "buyer@example.com", refId: "partner" }));
    const fromCookie = await POST(makeRequest(
      { email: "buyer@example.com", sessionId: "cs_test_abc" },
      { cookie: "theme=dark; _fprom_ref=from-cookie; _fprom_tid=" }
    ));
    const tidFromCookie = await POST(makeRequest(
      { email: "buyer@example.com" },
      { cookie: "_fprom_tid=from%2Dcookie; _fprom_ref=other" }
    ));

    assert.equal(fromBody.status, 204);
    assert.equal(fromCookie.status, 204);
    assert.equal(tidFromCookie.status, 204);
    assert.deepEqual(bodies[0], { email: "buyer@example.com", ref_id: "partner" });
    assert.deepEqual(bodies[1], { email: "buyer@example.com", ref_id: "from-cookie", uid: "cs_test_abc" });
    assert.deepEqual(bodies[2], { email: "buyer@example.com", tid: "from-cookie" });
  });

  await t.test("returns 204 without calling FirstPromoter when the key or tracking id is missing", async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response("no");
    };
    delete process.env.FIRSTPROMOTER_API_KEY;
    process.env.NEXT_PUBLIC_FIRSTPROMOTER_API_KEY = "do-not-use";
    const errors = [];
    const originalError = console.error;
    console.error = (...args) => { errors.push(args.join(" ")); };
    try {
      const missingKey = await POST(makeRequest({ email: "buyer@example.com", tid: "click123" }));
      const nothingToSend = await POST(makeRequest({ email: "buyer@example.com", sessionId: "cs_live_example" }));
      assert.equal(missingKey.status, 204);
      assert.equal(nothingToSend.status, 204);
    } finally {
      console.error = originalError;
    }
    assert.equal(calls, 0);
    assert.equal(errors.some((line) => line.includes("FIRSTPROMOTER_API_KEY")), true);
    assert.equal(errors.some((line) => line.includes("do-not-use")), false);
  });

  await t.test("rejects invalid input and other origins before delivery", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response("ok");
    };

    const badEmail = await POST(makeRequest({ email: "not-an-email", tid: "click123" }));
    const badTid = await POST(makeRequest({ email: "buyer@example.com", tid: "bad id" }));
    const badSession = await POST(makeRequest({ email: "buyer@example.com", tid: "click123", sessionId: "sess_123" }));
    const offOrigin = await POST(makeRequest(
      { email: "buyer@example.com", tid: "click123" },
      { origin: "https://attacker.example" }
    ));
    const wrongType = await POST(makeRequest(
      { email: "buyer@example.com", tid: "click123" },
      { "content-type": "text/plain" }
    ));

    assert.equal(badEmail.status, 400);
    assert.equal(badTid.status, 400);
    assert.equal(badSession.status, 400);
    assert.equal(offOrigin.status, 403);
    assert.equal(wrongType.status, 415);
    assert.equal(calls, 0);
    assert.equal(JSON.stringify(await badEmail.json()).includes("secret-key"), false);
  });

  await t.test("omits an invalid ip and still returns 204 when FirstPromoter fails", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    const bodies = [];
    const errors = [];
    const originalError = console.error;
    console.error = (...args) => { errors.push(args.join(" ")); };
    globalThis.fetch = async (_url, options) => {
      bodies.push(JSON.parse(options.body));
      if (bodies.length === 1) return new Response("nope", { status: 502 });
      throw new DOMException("The operation was aborted", "TimeoutError");
    };
    try {
      const rejected = await POST(makeRequest(
        { email: "buyer@example.com", tid: "click123" },
        { "x-forwarded-for": "not-an-ip" }
      ));
      const timedOut = await POST(makeRequest({ email: "buyer@example.com", tid: "click123" }));
      assert.equal(rejected.status, 204);
      assert.equal(timedOut.status, 204);
    } finally {
      console.error = originalError;
    }
    assert.deepEqual(bodies[0], { email: "buyer@example.com", tid: "click123" });
    assert.equal(bodies[0].ip, undefined);
    assert.equal(errors.length, 2);
    assert.equal(errors.some((line) => line.includes("secret-key")), false);
    assert.equal(bodies.length, 2);
  });

  await t.test("notifies n8n only after a tracked signup", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    process.env.N8N_REFERRAL_WEBHOOK_URL = "https://n8n.example.com/webhook/referral";
    process.env.N8N_REFERRAL_WEBHOOK_SECRET = "n8n-secret";
    process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL = "https://public.example.com/webhook";
    process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET = "public-secret";
    const calls = [];
    globalThis.fetch = async (url, options) => {
      calls.push({ url: String(url), options });
      if (String(url) === SIGNUP_URL) {
        return Response.json({
          promoter: { name: "Ada Partner", email: "ada@partners.example" },
          referral: { id: 42 },
        });
      }
      return new Response("ok", { status: 200 });
    };

    const response = await POST(makeRequest({
      email: "buyer@example.com",
      tid: "click123",
      refId: "ignored",
      sessionId: "cs_live_example",
    }));
    const payload = JSON.parse(calls[1].options.body);

    assert.equal(response.status, 204);
    assert.equal(calls.length, 2);
    assert.equal(calls[1].url, "https://n8n.example.com/webhook/referral");
    assert.equal(calls[1].options.method, "POST");
    assert.equal(calls[1].options.redirect, "manual");
    assert.equal(calls[1].options.headers["Content-Type"], "application/json");
    assert.equal(calls[1].options.headers["X-Revphlo-Webhook-Secret"], "n8n-secret");
    assert.equal(calls[1].options.signal.aborted, false);
    assert.equal(payload.event, "referral_signup");
    assert.equal(payload.email, "buyer@example.com");
    assert.equal(payload.tid, "click123");
    assert.equal(payload.refId, undefined);
    assert.equal(payload.sessionId, "cs_live_example");
    assert.equal(payload.firstpromoterStatus, 200);
    assert.match(payload.occurredAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    assert.deepEqual(payload.promoter, { name: "Ada Partner", email: "ada@partners.example" });
    assert.equal(JSON.stringify(payload).includes("n8n-secret"), false);
    assert.equal(JSON.stringify(payload).includes("secret-key"), false);
    assert.equal(JSON.stringify(payload).includes("42"), false);
  });

  await t.test("skips n8n when configuration is missing or not https, and still returns 204 if n8n fails", async () => {
    process.env.FIRSTPROMOTER_API_KEY = "secret-key";
    const errors = [];
    const originalError = console.error;
    console.error = (...args) => { errors.push(args.join(" ")); };
    const calls = [];
    globalThis.fetch = async (url, options) => {
      calls.push({ url: String(url), body: options.body, status: options.headers["X-Revphlo-Webhook-Secret"] });
      if (String(url) === SIGNUP_URL) return Response.json({});
      if (calls.filter((call) => call.url !== SIGNUP_URL).length === 1) return new Response("no", { status: 500 });
      throw new DOMException("The operation was aborted", "TimeoutError");
    };

    try {
      resetN8nReferralNoticeForTests();
      delete process.env.N8N_REFERRAL_WEBHOOK_URL;
      delete process.env.N8N_REFERRAL_WEBHOOK_SECRET;
      process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_URL = "https://public.example.com/webhook";
      process.env.NEXT_PUBLIC_N8N_REFERRAL_WEBHOOK_SECRET = "public-secret";
      const missingBoth = await POST(makeRequest({ email: "buyer@example.com", tid: "click123" }));
      process.env.N8N_REFERRAL_WEBHOOK_URL = "https://n8n.example.com/webhook/referral";
      const missingSecret = await POST(makeRequest({ email: "buyer@example.com", refId: "partner" }));
      process.env.N8N_REFERRAL_WEBHOOK_SECRET = "n8n-secret";
      process.env.N8N_REFERRAL_WEBHOOK_URL = "http://n8n.example.com/webhook/referral";
      const insecure = await POST(makeRequest({ email: "buyer@example.com", tid: "click123" }));
      process.env.N8N_REFERRAL_WEBHOOK_URL = "https://n8n.example.com/webhook/referral";
      const rejected = await POST(makeRequest({ email: "buyer@example.com", refId: "partner" }));
      const timedOut = await POST(makeRequest({
        email: "buyer@example.com",
        tid: "click123",
        sessionId: "cs_test_abc",
      }));

      assert.equal(missingBoth.status, 204);
      assert.equal(missingSecret.status, 204);
      assert.equal(insecure.status, 204);
      assert.equal(rejected.status, 204);
      assert.equal(timedOut.status, 204);
    } finally {
      console.error = originalError;
    }

    assert.deepEqual(calls.map((call) => call.url), [
      SIGNUP_URL,
      SIGNUP_URL,
      SIGNUP_URL,
      SIGNUP_URL,
      "https://n8n.example.com/webhook/referral",
      SIGNUP_URL,
      "https://n8n.example.com/webhook/referral",
    ]);
    assert.equal(errors.filter((line) => line.includes("is not set")).length, 1);
    assert.equal(errors.filter((line) => line.includes("must be an https URL")).length, 1);
    assert.equal(errors.filter((line) => line.includes("was not accepted. 500")).length, 1);
    assert.equal(errors.some((line) => line.includes("n8n-secret") || line.includes("n8n.example.com")), false);
    const rejectedPayload = JSON.parse(calls[4].body);
    assert.deepEqual(rejectedPayload, {
      event: "referral_signup",
      email: "buyer@example.com",
      refId: "partner",
      firstpromoterStatus: 200,
      occurredAt: rejectedPayload.occurredAt,
    });
    assert.equal(rejectedPayload.promoter, undefined);
    assert.equal(rejectedPayload.tid, undefined);
    assert.match(rejectedPayload.occurredAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    const timedOutPayload = JSON.parse(calls[6].body);
    assert.equal(timedOutPayload.tid, "click123");
    assert.equal(timedOutPayload.sessionId, "cs_test_abc");
    assert.equal(calls[4].status, "n8n-secret");
  });
});

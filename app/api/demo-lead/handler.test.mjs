import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "./handler.mjs";

const ROUTE_URL = "https://www.revphlo.com/api/demo-lead";
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/test/workflow";

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

test("demo lead route", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWebhookUrl = process.env.DEMO_WEBHOOK_URL;
  process.env.DEMO_WEBHOOK_URL = WEBHOOK_URL;

  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalWebhookUrl === undefined) delete process.env.DEMO_WEBHOOK_URL;
    else process.env.DEMO_WEBHOOK_URL = originalWebhookUrl;
  });

  await t.test("delivers all contact fields and accepts an HTML success response", async () => {
    let delivered;
    globalThis.fetch = async (url, options) => {
      delivered = { url: String(url), options };
      return new Response("<!doctype html><title>Success</title>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    };

    const response = await POST(
      makeRequest({
        name: "  RevPhlo   Contact Test ",
        email: " TEST@EXAMPLE.COM ",
        phone: "+1 (212) 555-0198",
        company: "RevPhlo Test Company",
        website: "",
        utmSource: "outbound",
      })
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(delivered.url, WEBHOOK_URL);
    assert.equal(delivered.options.method, "POST");

    const payload = JSON.parse(delivered.options.body);
    assert.equal(payload.name, "RevPhlo Contact Test");
    assert.equal(payload.firstName, "RevPhlo");
    assert.equal(payload.lastName, "Contact Test");
    assert.equal(payload.email, "test@example.com");
    assert.equal(payload.phone, "+1 (212) 555-0198");
    assert.equal(payload.company, "RevPhlo Test Company");
    assert.equal(payload.companyName, "RevPhlo Test Company");
    assert.equal(payload.contact.companyName, "RevPhlo Test Company");
    assert.equal(payload.contact.email, "test@example.com");
    assert.equal(payload.utmSource, "outbound");
    assert.deepEqual(payload.tags, ["revphlo-demo", "outbound-sales"]);
  });

  await t.test("does not unlock the demo when the CRM rejects delivery", async () => {
    globalThis.fetch = async () =>
      new Response("<!doctype html><title>Rejected</title>", { status: 500 });

    const response = await POST(
      makeRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "2125550199",
        company: "Acme",
        website: "",
      })
    );
    const result = await response.json();

    assert.equal(response.status, 502);
    assert.equal(result.ok, false);
    assert.equal(JSON.stringify(result).includes("Rejected"), false);
  });

  await t.test("rejects invalid fields and off-origin submissions before delivery", async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response("ok");
    };

    const invalidResponse = await POST(
      makeRequest({ name: "J", email: "bad", phone: "1", company: "", website: "" })
    );
    assert.equal(invalidResponse.status, 400);
    assert.deepEqual(Object.keys((await invalidResponse.json()).fieldErrors).sort(), [
      "company",
      "email",
      "name",
      "phone",
    ]);

    const offOriginResponse = await POST(
      makeRequest(
        { name: "Jane Doe", email: "jane@example.com", phone: "2125550199", company: "Acme" },
        { origin: "https://attacker.example" }
      )
    );
    assert.equal(offOriginResponse.status, 403);
    assert.equal(calls, 0);
  });

  await t.test("rejects bot and oversized submissions before delivery", async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response("ok");
    };

    const botResponse = await POST(
      makeRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "2125550199",
        company: "Acme",
        website: "spam.example",
      })
    );
    assert.equal(botResponse.status, 400);

    const oversizedResponse = await POST(makeRequest({ padding: "x".repeat(12_100) }));
    assert.equal(oversizedResponse.status, 413);
    assert.equal(calls, 0);
  });
});

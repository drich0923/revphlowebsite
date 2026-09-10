# RevPhlo Website

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## API routes

- `GET /api/health` - health check
- `POST /api/book-demo` - validates and forwards demo lead payload

Example payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme",
  "notes": "Interested in attribution + rep leaderboard"
}
```

If you set `DEMO_WEBHOOK_URL`, submissions are forwarded server-side.

## Self-serve checkout

`/checkout` collects the company name, owner name and email, company time zone, and optional initial team members. It then shows Stripe Embedded Checkout on the same page. The Revphlo app creates the company only after it verifies payment with Stripe. The owner receives a secure account setup link and can create a login or use an existing login. Passwords are not sent by email.

The price is $2,000 USD now, including setup and the first 30 days, then $397 USD each month. A six-month minimum term applies. The subscription continues monthly after the minimum term.

### Configuration

Set `NEXT_PUBLIC_REVPHLO_APP_URL` to the trusted HTTPS origin of the Revphlo app, such as `https://app.revphlo.com`. This is a public URL, not a Stripe key. Next.js includes it at build time, so rebuild the website after changing it. Local development can use an HTTP localhost origin. Do not include a path or query string.

Stripe secrets, prices, company creation, invitations, and webhooks belong in the app repository `Revphlo/revphlo`. Do not add Stripe secret keys, webhook secrets, database credentials, or email provider keys to this website.

The app must have the self-serve checkout migration and configuration described in its `docs/SELF_SERVE_CHECKOUT_SETUP.md`. Embedded checkout also needs `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in the app, in the same test or live mode as its secret key. Its checkout start API permits the exact origins `https://revphlo.com` and `https://www.revphlo.com`. The live apex domain redirects to `www`. A test website origin can be added through the app's `STRIPE_CHECKOUT_WEBSITE_ORIGIN` setting. Do not use a wildcard for preview domains.

The website calls only the app's public `GET` and `POST /api/checkout/start` route. Requests omit browser credentials. The app checks the plan and form, stores the accepted terms, and returns a short-lived Checkout client secret. Keep that secret in memory. Do not log it or add it to a URL, browser storage, or analytics event.

The page loads `https://js.stripe.com/clover/stripe.js`. This matches the app's current Stripe SDK API release. It mounts Stripe directly in the page, without an outer iframe. After payment, Stripe returns the buyer to the configured app origin at `/checkout/success`. The payment webhook also runs if the buyer closes the browser. The owner's verified primary login email must match the saved company owner email before access is granted.

This repository does not set a Content Security Policy. If a Vercel project policy is added, permit the Stripe script, frame, and connection domains listed in [Stripe's security guide](https://docs.stripe.com/security/guide), plus the exact app origin for API requests. Keep the app's existing frame protection.

### Release checks

This feature needs releases in both the app and this website. The website Vercel project is `dylan-richs-projects/revphlowebsite`, as recorded by the repository's Vercel commit status. A local build does not change that deployment.

1. Configure and test the app in Stripe test mode. Apply its additive database migration through the normal release process.
2. Configure the test website's app URL and allow its exact origin in the app. Rebuild the website.
3. Open `/checkout` on desktop and mobile. Check required fields, duplicate emails, roles, time zone, and terms acceptance.
4. Check unavailable checkout, network failure, and blocked Stripe script states. Before the payment form opens, a manual retry must keep the company details. It must not send simultaneous requests. Once a session is received, payment-form retries must reuse it.
5. Complete a Stripe test payment. Confirm $2,000 due now and $397 per month after 30 days. Confirm there is one company and one subscription when the return page is refreshed or the webhook is sent again.
6. Confirm that the owner invitation arrives. Use the correct verified email and check that the new company's Setup Wizard opens. Test an existing login and a wrong owner email too.
7. Check team invitations, integrations, calendars, billing recovery, and cancellation at the minimum term through the app guide.
8. Deploy the app before the public checkout page. Set matching live Stripe configuration only when the test flow is complete. Check both `revphlo.com/checkout` and its `www` destination after release.

The app's `/get-started` page remains available for the Stripe-hosted checkout flow. If embedded checkout is unavailable, the website can link there. A customer who already paid must use the return page or their invitation instead of making another payment.

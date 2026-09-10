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

The homepage, navigation, and mobile action link `Get Started` to `/checkout`. `Book a Demo` remains a separate option. At checkout, the customer accepts the billing terms and pays through Stripe's secure Payment Element on the same page when the app supports it. The website validates the new owner email with Stripe when the customer leaves the email field. After payment, the customer opens the Revphlo app at `/checkout/success`, creates and verifies a login with the checkout email, and enters the company name, owner name, company time zone, and optional first team members. The app creates the company after it verifies payment and receives those details. It then sends secure account setup and team invitation links. Passwords are not sent by email.

Company setup follows payment. Each required step explains the question, action, purpose, and person who needs to complete it. The owner can share setup tasks with teammates. The full dashboard opens after the required setup checks pass. A real sale, booking, call, or payment from the customer's business is not required to unlock it. These live events are tracked afterward.

The price is $2,000 USD now, including setup and the first 30 days, then $397 USD each month. A six-month minimum term applies. The subscription continues monthly after the minimum term.

This checkout is for new customers. It has no existing-account sign-in option. The customer enters the email for their new account, selects `Get Started` to pay, then creates and verifies that account in the app. The app's signup page must also hide the sign-in option when opened from checkout.

### Configuration

Set `NEXT_PUBLIC_REVPHLO_APP_URL` to the trusted HTTPS origin of the Revphlo app, such as `https://app.revphlo.com`. This is a public URL, not a Stripe key. Next.js includes it at build time, so rebuild the website after changing it. Local development can use an HTTP localhost origin. Do not include a path or query string.

Stripe secrets, prices, company creation, invitations, and webhooks belong in the app repository `Revphlo/revphlo`. Do not add Stripe secret keys, webhook secrets, database credentials, or email provider keys to this website.

The app must have the self-serve checkout migration and configuration described in its `docs/SELF_SERVE_CHECKOUT_SETUP.md`. Website checkout also needs `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in the app, in the same test or live mode as its secret key. Its checkout start API permits the exact origins `https://revphlo.com` and `https://www.revphlo.com`. The live apex domain redirects to `www`. A test website origin can be added through the app's `STRIPE_CHECKOUT_WEBSITE_ORIGIN` setting. Do not use a wildcard for preview domains.

The website calls only the app's public `GET` and `POST /api/checkout/start` route. Requests omit browser credentials. The availability response must report `enabled: true`, the exact displayed plan, `embeddedEnabled: true`, a valid publishable key, and `supportedUiModes` containing `custom` before the website offers the Payment Element. An enabled older app without `supportedUiModes`, or one that advertises only hosted support, gets a clear link to `/get-started` for hosted checkout. It must not be treated as ready for a custom session. A changed price or disabled checkout keeps the website payment form unavailable.

The custom start request contains only `{ termsAccepted: true, uiMode: "custom" }`. The app checks the plan, stores the accepted terms, and returns a short-lived Checkout client secret. Company details are not sent in this request. Keep that secret in memory. Do not log it or add it to a URL, browser storage, or analytics event.

If Stripe already has an email on the new checkout session, the website displays it as read-only and does not send an email override during payment confirmation. This supports the fixed recipient in the test app. Otherwise, the customer enters their new-account email on the website.

The page loads `https://js.stripe.com/clover/stripe.js`. This matches the app's current Stripe SDK API release. It mounts Stripe's Payment Element directly in the page, without an outer iframe. The Revphlo page owns the `Get Started` button. For a new session without an email, it calls Stripe's `actions.updateEmail` when the customer leaves the email field and displays any validation error. Email updates run in order so an old request cannot replace the latest email. Payment stays disabled while the current email is unverified or Stripe reports `canConfirm: false`. The website checks the current email again before `actions.confirm()`. A fixed email from the app is already validated and is not overridden. See [Stripe's email and confirmation guide](https://docs.stripe.com/payments/accept-a-payment?payment-ui=elements).

After payment, Stripe returns the buyer to the configured app origin at `/checkout/success`. The payment webhook also runs if the buyer closes the browser. The company details step still has to be completed before a company and invitations are created. The owner's verified primary login email must match the Stripe checkout email before the company details can be saved.

This repository does not set a Content Security Policy. If a Vercel project policy is added, permit the Stripe script, frame, and connection domains listed in [Stripe's security guide](https://docs.stripe.com/security/guide), plus the exact app origin for API requests. Keep the app's existing frame protection.

### Release checks

This feature needs releases in both the app and this website. The website Vercel project is `dylan-richs-projects/revphlowebsite`, as recorded by the repository's Vercel commit status. A local build does not change that deployment.

1. Configure and test the app in Stripe test mode. Apply its additive database migration through the normal release process.
2. Configure the test website's app URL and allow its exact origin in the app. Rebuild the website.
3. Open the homepage on desktop and mobile. Use `Get Started` to reach `/checkout`. Confirm that it has payment terms, a new-account email field, and the `Get Started` payment button. Confirm that it has no sign-in option or company, owner name, time zone, or team fields.
4. Check a legacy app response without `supportedUiModes`, hosted-only support, unavailable checkout, network failure, and blocked Stripe script states. The legacy and hosted-only states must offer hosted checkout without sending a custom session request. Before the payment form opens, a manual retry must keep the accepted terms. It must not send simultaneous requests. Once a session is received, payment-form retries must reuse it. Enter and change the email, check invalid-email recovery, and confirm that Stripe validation and payment details enable `Get Started`.
5. Complete a Stripe test payment. Confirm $2,000 due now and $397 per month after 30 days. Confirm that payment opens the app's company details step and that payment alone does not create a company or send team invitations.
6. Create and verify a login with the checkout email, submit company details, and confirm that one company is created. Check required fields, duplicate team emails, roles, and time zone in this app step. Refresh the return page and resend the webhook to check for duplicate companies. Test a wrong email too.
7. Confirm that secure owner and team invitation links arrive. Open the company's Setup Wizard. Check integrations, calendars, billing recovery, and cancellation at the minimum term through the app guide.
8. Deploy the app before the public checkout page. Set matching live Stripe configuration only when the test flow is complete. Check both `revphlo.com/checkout` and its `www` destination after release.

The app's `/get-started` page remains available for the Stripe-hosted checkout flow. If website checkout is unavailable, the website can link there. A customer who already paid must use the return page or their invitation instead of making another payment.

Run the checkout contract checks with `node --test app/checkout/checkout-contract.test.mjs`.

# Agency checkout

Use `/agency-checkout` to buy RevPhlo for a new agency. Use `/checkout` for a standard company account.

## Price

- $2,000 USD due today for setup and the first 30 days.
- $597 USD per month after 30 days.
- A six-month minimum term. The plan continues monthly after that until canceled.

## Create your agency account

1. Open `/agency-checkout`. Check the agency plan and accept the payment terms.
2. Select **Continue to payment**. Enter the email for your new account and your payment details.
3. Select **Get Started** to pay through Stripe.
4. In RevPhlo, create and verify your login with the email from checkout.
5. Enter your agency name, owner name, and time zone. Add your first team members if needed.
6. Submit the details. RevPhlo checks the payment and creates your agency account. You do not need to select or change the account type.
7. Open your agency workspace to add client companies and manage your team.

If you already paid, use the payment return page or your account setup email. Do not pay again. If agency checkout is unavailable, select **Check again** or **Contact support**.

## App configuration and release

The backend is in `Revphlo/revphlo`. Reuse its existing Stripe billing keys, webhook, allowed website origins, and portal configuration. Add these agency price settings in the app:

- `STRIPE_AGENCY_SELF_SERVE_PRICE_ID`: the active $597 USD monthly agency price.
- `STRIPE_AGENCY_SELF_SERVE_SETUP_PRICE_ID`: the active $2,000 USD one-time agency setup price.

Use agency products in Stripe and match the app's test or live mode. The app checks price amounts and billing periods before it starts checkout. Keep secret keys and price settings out of this website. The website uses the existing `NEXT_PUBLIC_REVPHLO_APP_URL` setting.

Release the app before the website. Check the app's `docs/SELF_SERVE_CHECKOUT_SETUP.md` for the full setup process. This feature reuses the signup and company tables and adds no schema migration.

Before a live release:

1. Run checkout contract and backend tests.
2. Open both checkout pages on desktop and mobile. Check $397 monthly for standard accounts and $597 monthly for agencies.
3. Test missing agency configuration and a response with the standard plan. Agency payment must stay unavailable and must not offer a standard signup link.
4. Complete an agency payment in Stripe test mode. Verify $2,000 now and the first $597 renewal after 30 days.
5. Complete email verification and agency details. Verify one company with `accountType: "agency"` and an admin owner. Repeat completion and webhook delivery to check for duplicates.
6. Complete a standard test purchase. Verify it still creates a standard account.

This change uses the existing tax settings. It does not enable Stripe Tax or add tax registrations. If tax collection is required, complete the Stripe Tax setup before release.

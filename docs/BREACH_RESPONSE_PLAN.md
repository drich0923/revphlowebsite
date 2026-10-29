# Breach response plan

Last updated: October 29, 2026. This is an internal one-page plan for RevPhlo. It is not legal advice. Replace the highlighted placeholders before relying on it.

**Company:** [LEGAL ENTITY NAME], [BUSINESS STREET ADDRESS]. Product: revphlo.com and app.revphlo.com.

## Who decides

Dylan, the owner, decides whether an incident is a personal-data breach that requires notice, what the notice says, and when it goes out. If Dylan is unreachable, [BACKUP DECISION MAKER NAME AND PHONE] decides and tells Dylan as soon as possible. Call [INCIDENT COUNSEL NAME AND PHONE] before the notice is sent. Do not wait on a full forensic report to start the clock below.

## How customers are contacted

Use the email on the account (the Clerk login email, and the Stripe billing email if it differs). For a marketing-site lead, use the email on the demo or Typeform submission. Send from a RevPhlo address the recipient already knows, such as privacy@revphlo.com, with a subject that states there was a security incident.

If email is not enough, post a notice in the app and on revphlo.com, and call the phone number on the account when we have one. The notice names what happened, the kinds of information involved, what we are doing, and how to reach privacy@revphlo.com. Do not describe the incident in a way that publishes a secret, a key, or another customer’s data.

## Deadlines

- **GDPR.** Notify the lead supervisory authority within **72 hours** of becoming aware of a personal-data breach, unless the breach is unlikely to risk people’s rights and freedoms. Notify affected people **without undue delay** when the breach is likely to result in a high risk to them. Document the decision when we conclude notice is not required.
- **United States state laws.** Notify affected residents in the most expedient time the state allows and without unreasonable delay. Many states set an outer limit of **30, 45, or 60 days** from discovery (Florida and Colorado are 30 days; other states differ). California requires notice in the most expedient time possible and without unreasonable delay, and does not use one statewide day count. Some states also require attorney-general notice above a resident-count threshold. Check the states where the affected people live, then use the **shortest** deadline that applies. A customer contract with a shorter window wins for that customer.

The clock starts when we know a breach of personal information occurred, not when the investigation is finished.

## Evidence preservation

Do this before cleanup, and before rotating keys:

- Write a timeline: what happened, when it started, when we learned, and who did what.
- Export Vercel request logs, Clerk audit logs, Stripe events, and relevant database logs. Copy them somewhere the attacker cannot change.
- Snapshot the affected Neon branch, or dump the affected tables, before deleting rows.
- Keep a copy of the relevant git history and deployment ids.
- Do not wipe disks, delete logs, or let a vendor close the ticket until that copy exists.

## Key rotation

After the copy is stored, rotate anything that may have been exposed, then confirm the new value is live and the old value is revoked:

- Neon database password and any leaked database URL
- Clerk secret keys, and sign out sessions if accounts were accessed
- Stripe secret keys and webhook secrets
- Anthropic and OpenAI API keys
- Resend API key
- GoHighLevel, HubSpot, Fathom, Zoom, Slack, Zapier, Whop, Sendblue, and Typeform tokens that were exposed
- Vercel tokens
- The demo webhook URL, if it was exposed
- GitHub tokens and any key that reached git

Record the rotation time next to the timeline. Tell affected customers in the notice if their password or connected account should be reset.

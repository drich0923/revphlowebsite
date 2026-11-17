// Sources: privacy policy and terms list the live connections.
// HubSpot is documented as a planned transcript source, not a live one.
export const CATEGORIES = [
  {
    id: "crm",
    label: "CRM",
    items: [
      {
        name: "GoHighLevel",
        status: "available",
        note: "Appointments, pipeline, calendar events, and contact details from the CRM you already run.",
      },
      {
        name: "HubSpot",
        status: "soon",
        note: "Planned second source for call transcripts, so HubSpot recordings can produce the same post-call notes as Fathom.",
      },
    ],
  },
  {
    id: "calls",
    label: "Calls",
    items: [
      {
        name: "Fathom",
        status: "available",
        note: "Call recordings, transcripts, and AI summaries, logged without an end-of-day form.",
      },
      {
        name: "Zoom",
        status: "available",
        note: "Meeting metadata and recording data from the calls your team runs.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    items: [
      {
        name: "Stripe",
        status: "available",
        note: "Charges, amounts, customer emails, and payment status, matched back to the call.",
      },
      {
        name: "Whop",
        status: "available",
        note: "Product delivery and membership data, lined up with the sale.",
      },
    ],
  },
  {
    id: "workflows",
    label: "Notifications and workflows",
    items: [
      {
        name: "Slack",
        status: "available",
        note: "Sends notifications out. RevPhlo does not read or store Slack message history.",
      },
      {
        name: "Zapier",
        status: "available",
        note: "Triggers and actions you configure, so a booking or payment can move the rest of your stack.",
      },
    ],
  },
];

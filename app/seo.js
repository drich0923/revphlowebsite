export const SITE_HOST = "www.revphlo.com";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_NAME = "RevPhlo";
export const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png?v=20260930`;
export const SOCIAL_IMAGE_ALT = "RevPhlo post booking sales intelligence";

export const DEFAULT_TITLE = "RevPhlo Post Booking Sales Intelligence";
export const DEFAULT_DESCRIPTION =
  "Post booking sales intelligence for high ticket teams. AI call notes, revenue attribution, live leaderboards, and payment matching.";

export const ORGANIZATION_DESCRIPTION =
  "RevPhlo is post booking sales intelligence for high ticket sales teams, with call notes, revenue attribution, leaderboards, and payment matching.";

export function pageUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

const noindexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export function pageMeta({ title, description, path, noindex = false, openGraph = {} }) {
  const url = pageUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: noindexRobots } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: SOCIAL_IMAGE_URL, alt: SOCIAL_IMAGE_ALT }],
    },
  };
}

export const POST_META = {
  "close-rate-tracking-software": {
    title: "Close Rate Tracking Software for Sales Calls | RevPhlo",
    description:
      "How to track show rate and close rate on sales calls accurately, what close rate tracking software should do, and how RevPhlo calculates both.",
  },
  "fathom-call-notes-to-gohighlevel": {
    title: "Fathom Sales Call Notes to GoHighLevel: 3 Ways",
    description:
      "Three ways to get Fathom sales call notes into GoHighLevel: native GHL workflows, Zapier or webhooks, and RevPhlo. What each one does and misses.",
  },
  "stripe-payment-attribution-to-sales-rep": {
    title: "Stripe Payment Attribution to Sales Reps | RevPhlo",
    description:
      "How to attribute Stripe payments to the right closer, setter and lead source, why emails rarely match, and how to keep commissions accurate.",
  },
  "sales-leaderboard-for-closers": {
    title: "Sales Leaderboard for Closers: What to Rank | RevPhlo",
    description:
      "What a sales leaderboard for high-ticket closers should rank, how to keep it live without a spreadsheet, and how to avoid a board reps can game.",
  },
  "eod-reports-killing-sales-performance": {
    title: "Why EOD Reports Hurt Sales Performance | RevPhlo",
    description:
      "End of day reports waste time, produce bad data, and hurt morale. Why high ticket teams are replacing them with real time dashboards.",
  },
  "gohighlevel-reporting-gaps-sales-teams": {
    title: "GoHighLevel Reporting Gaps for Sales Teams | RevPhlo",
    description:
      "GoHighLevel is a strong CRM, but its reporting misses what happens after a call is booked. What high ticket teams still cannot see.",
  },
  "revenue-attribution-high-ticket-sales": {
    title: "Revenue Attribution for High Ticket Sales | RevPhlo",
    description:
      "Most high ticket teams cannot trace revenue back to the source that produced it. How to follow the path from ad click to cash collected.",
  },
  "ai-post-call-notes-sales-teams": {
    title: "AI Post Call Notes for Sales Teams | RevPhlo",
    description:
      "AI post call notes capture objections, commitments, and outcomes from the sales call itself, without asking reps to write a summary.",
  },
  "sales-leaderboards-beyond-vanity-metrics": {
    title: "Sales Leaderboards Beyond Vanity Metrics | RevPhlo",
    description:
      "Most sales leaderboards track the wrong things. How to rank close rate, cash collected, and show rate instead of call volume.",
  },
  "revphlo-vs-spreadsheets": {
    title: "RevPhlo vs Spreadsheets for Sales Teams | RevPhlo",
    description:
      "Spreadsheets were not built to run a sales operation. A comparison of managing a high ticket team in Google Sheets and in RevPhlo.",
  },
  "revphlo-vs-hubspot-reporting": {
    title: "RevPhlo vs HubSpot Reporting | RevPhlo",
    description:
      "HubSpot is a strong CRM. Its reporting was not built for high ticket closers on GoHighLevel, Fathom, and Stripe. How RevPhlo fills that gap.",
  },
  "revphlo-vs-databox-reporting": {
    title: "RevPhlo vs Databox for Sales Teams | RevPhlo",
    description:
      "Databox visualizes data from many sources. It does not write AI call notes, match Stripe payments, or run sales leaderboards. Here is the difference.",
  },
  "how-to-track-revenue-by-closer": {
    title: "How to Track Revenue by Closer | RevPhlo",
    description:
      "Most sales teams track deals closed, not dollars collected. Why revenue per closer matters and how to measure it without spreadsheets.",
  },
  "stripe-payment-matching-sales-teams": {
    title: "Stripe Payment Matching for Sales Teams | RevPhlo",
    description:
      "Failed charges, partial payments, and refunds pull CRM numbers away from the bank account. How payment matching closes that gap.",
  },
  "setter-closer-model-metrics-that-matter": {
    title: "Setter Closer Metrics That Matter | RevPhlo",
    description:
      "Setter closer teams often track the wrong metrics. A framework for measuring booked calls through collected cash.",
  },
  "why-your-close-rate-is-wrong": {
    title: "Why Your Close Rate Is Probably Wrong | RevPhlo",
    description:
      "Close rate goes wrong when the denominator is off, no shows are ignored, or CRM stages stand in for real outcomes. How to calculate it.",
  },
  "coaching-closers-with-call-data": {
    title: "Coach Closers With Call Data | RevPhlo",
    description:
      "Most sales coaching relies on anecdotes and gut feel. How to use call data, objection patterns, and payment outcomes instead.",
  },
  "sales-reporting-remote-teams": {
    title: "Sales Reporting for Remote Teams | RevPhlo",
    description:
      "Remote sales teams cannot rely on hallway updates. How reporting and visibility change when closers work from different places.",
  },
  "hidden-cost-of-no-shows": {
    title: "The Hidden Cost of No Shows | RevPhlo",
    description:
      "No shows cost closer time, distort close rate, and hide setter quality problems. A framework for tracking and reducing them.",
  },
  "crm-data-problems-high-ticket-sales": {
    title: "CRM Data Problems in High Ticket Sales | RevPhlo",
    description:
      "A CRM is strong at pipeline management and weak at sales intelligence. Where CRM data breaks down for high ticket teams.",
  },
  "sales-dashboard-closers-actually-use": {
    title: "Sales Dashboards Closers Will Use | RevPhlo",
    description:
      "Most sales dashboards are built for managers. What a closer facing dashboard needs so reps actually use it.",
  },
  "call-to-cash-revenue-journey-high-ticket": {
    title: "Call to Cash in High Ticket Sales | RevPhlo",
    description:
      "From ad click to Stripe payment, most teams only see fragments. What the full revenue journey looks like in high ticket sales.",
  },
};

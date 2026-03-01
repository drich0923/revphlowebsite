import "./globals.css";

const siteUrl = "https://revphlo.com";
const siteName = "RevPhlo";
const defaultTitle = "RevPhlo — Post-Booking Sales Intelligence for High-Ticket Teams";
const defaultDescription =
  "Stop managing your sales team blind. RevPhlo gives you full visibility into what happens after the call is booked — AI post-call notes, revenue attribution, live leaderboards, and payment matching. Built for 7- and 8-figure sales organizations.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | RevPhlo",
  },
  description: defaultDescription,
  keywords: [
    "sales analytics",
    "post-booking intelligence",
    "sales dashboard",
    "AI post-call notes",
    "revenue attribution",
    "sales leaderboard",
    "payment matching",
    "high-ticket sales",
    "sales team management",
    "GoHighLevel analytics",
    "Stripe revenue tracking",
    "Fathom AI notes",
    "sales performance tracking",
    "close rate optimization",
    "sales operations software",
    "SaaS sales analytics",
    "EOD report replacement",
    "sales coaching platform",
  ],
  authors: [{ name: "RevPhlo" }],
  creator: "RevPhlo",
  publisher: "RevPhlo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "RevPhlo — Post-Booking Sales Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification code here:
    // google: "your-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "RevPhlo",
      url: siteUrl,
      description: defaultDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Book a demo to get started",
      },
      featureList: [
        "AI-powered post-call notes from Fathom recordings",
        "Full revenue attribution by source, funnel, and closer",
        "Live leaderboards and rep portals",
        "Stripe payment matching",
        "GoHighLevel, Zoom, Stripe, Fathom, Zapier, Slack, and Whop integrations",
        "Real-time sales analytics dashboard",
      ],
      screenshot: `${siteUrl}/og-image.png`,
    },
    {
      "@type": "Organization",
      name: "RevPhlo",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        "RevPhlo is a unified post-booking sales analytics platform built for high-ticket sales teams.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@revphlo.com",
        contactType: "sales",
      },
      sameAs: [
        "https://www.linkedin.com/company/revphlo",
        "https://x.com/revphlo",
      ],
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

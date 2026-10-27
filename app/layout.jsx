import "./globals.css";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono, Caveat, DM_Sans, DM_Serif_Display } from "next/font/google";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  ORGANIZATION_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_URL,
} from "./seo";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-hand", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-dm-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-dm-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | RevPhlo",
  },
  description: DEFAULT_DESCRIPTION,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: SOCIAL_IMAGE_URL, alt: SOCIAL_IMAGE_ALT }],
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
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      featureList: [
        "AI post call notes from Fathom recordings",
        "Revenue attribution by source, funnel, and closer",
        "Live leaderboards and rep portals",
        "Stripe payment matching",
        "GoHighLevel, Zoom, Stripe, Fathom, Zapier, Slack, and Whop integrations",
        "Sales analytics dashboard",
      ],
      screenshot: SOCIAL_IMAGE_URL,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: ORGANIZATION_DESCRIPTION,
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@revphlo.com",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable} ${dmSans.variable} ${dmSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fast.vidalytics.com" />
        <link rel="dns-prefetch" href="https://fast.vidalytics.com" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('js-motion')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17985869159" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17985869159');`,
          }}
        />
        {/* FirstPromoter referral tracking. fprmain.js must run before fpr.js. */}
        <script src="/fprmain.js" />
        <script src="https://cdn.firstpromoter.com/fpr.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "RevPhlo — Post-Booking Sales Intelligence",
  description:
    "Full visibility into what happens after the call is booked. AI post-call notes, revenue attribution, leaderboards, and payment matching for high-performing sales teams.",
  openGraph: {
    title: "RevPhlo — Post-Booking Sales Intelligence",
    description:
      "AI post-call notes, revenue attribution, leaderboards, and payment matching for high-performing sales teams.",
    url: "https://revphlo.com",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

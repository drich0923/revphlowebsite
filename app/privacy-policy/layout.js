import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Privacy Policy | RevPhlo",
  description:
    "How RevPhlo collects, uses, and protects your data. Covers integrations with GoHighLevel, Stripe, Fathom, Zoom, Slack, Zapier, and Whop.",
  path: "/privacy-policy",
});

export default function Layout({ children }) {
  return children;
}

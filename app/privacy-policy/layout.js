import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Privacy Policy | RevPhlo",
  description:
    "How RevPhlo collects, uses, and protects your data. Covers Google Meet, Google Calendar, other connected integrations, and Google's Limited Use requirements.",
  path: "/privacy-policy",
});

export default function Layout({ children }) {
  return children;
}

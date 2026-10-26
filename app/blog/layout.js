import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Sales Intelligence Insights | RevPhlo",
  description:
    "Practical guides on sales analytics, revenue attribution, AI post call notes, leaderboards, and replacing manual reporting for high ticket sales teams.",
  path: "/blog",
});

export default function BlogLayout({ children }) {
  return children;
}

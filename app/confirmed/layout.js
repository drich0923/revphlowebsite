import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Demo Booked | RevPhlo",
  description: "Your RevPhlo demo is confirmed. See how much revenue you're leaving on the table.",
  path: "/confirmed",
  noindex: true,
});

export default function Layout({ children }) {
  return children;
}

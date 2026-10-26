import Checkout from "./Checkout";
import { getAppOrigin } from "./checkout-contract.mjs";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Start with RevPhlo",
  description: "Pay securely for RevPhlo, then add your company details, invite your team, and connect your sales tools.",
  path: "/checkout",
  noindex: true,
});

export default function CheckoutPage() {
  const appOrigin = getAppOrigin(process.env.NEXT_PUBLIC_REVPHLO_APP_URL, process.env.NODE_ENV === "production");
  return <Checkout appOrigin={appOrigin} />;
}

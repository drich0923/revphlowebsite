import Checkout from "../checkout/Checkout";
import { getAppOrigin } from "../checkout/checkout-contract.mjs";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Start your RevPhlo agency",
  description: "Set up your RevPhlo agency account for $2,000, then $597 per month after 30 days. Manage your client companies in one place.",
  path: "/agency-checkout",
  noindex: true,
});

export default function AgencyCheckoutPage() {
  const appOrigin = getAppOrigin(process.env.NEXT_PUBLIC_REVPHLO_APP_URL, process.env.NODE_ENV === "production");
  return <Checkout appOrigin={appOrigin} accountType="agency" />;
}

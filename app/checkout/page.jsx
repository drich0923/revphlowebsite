import Checkout from "./Checkout";
import { getAppOrigin } from "./checkout-contract.mjs";

export const metadata = {
  title: "Start with RevPhlo",
  description: "Create your RevPhlo company account. Pay securely, invite your team, and connect your sales tools.",
  alternates: { canonical: "https://revphlo.com/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  const appOrigin = getAppOrigin(process.env.NEXT_PUBLIC_REVPHLO_APP_URL, process.env.NODE_ENV === "production");
  return <Checkout appOrigin={appOrigin} />;
}

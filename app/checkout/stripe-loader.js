let loading;

/** Use the Stripe.js release that matches the app's existing Stripe API version. */
export function loadStripeScript() {
  if (typeof window.Stripe === "function") return Promise.resolve(window.Stripe);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/clover/stripe.js";
    script.async = true;
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      loading = undefined;
      reject(new Error("The secure payment form could not load. Check your connection and try again."));
    };
    const timer = setTimeout(fail, 20000);
    script.onerror = fail;
    script.onload = () => {
      clearTimeout(timer);
      if (typeof window.Stripe !== "function") return fail();
      resolve(window.Stripe);
    };
    document.head.appendChild(script);
  });
  return loading;
}

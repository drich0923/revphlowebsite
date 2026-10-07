import styles from "./demo.module.css";

export default function DemoOptInForm() {
  return (
    <form
      className={styles.form}
      action="https://app.revphlo.com/api/demo/start"
      method="post"
      target="_self"
      encType="application/x-www-form-urlencoded"
      acceptCharset="UTF-8"
    >
      <div className={styles.formIntro}>
        <span className={styles.formStep}>INSTANT ACCESS</span>
        <h2>Explore the demo</h2>
        <p>Enter your details to open the sample dashboard. No password or email verification is needed.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-name">Full name</label>
        <input
          id="demo-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          minLength={2}
          maxLength={160}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-email">Work email</label>
        <input
          id="demo-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="jane@company.com"
          maxLength={254}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-phone">Phone number</label>
        <input
          id="demo-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(212) 555-0199"
          minLength={7}
          maxLength={50}
          required
        />
      </div>

      <div hidden aria-hidden="true">
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" name="website" type="text" defaultValue="" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={styles.consent}>
        By submitting, you agree that Revphlo may contact you by email or phone about this demo and a product walkthrough.{" "}
        See our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-of-service">Terms</a>.
      </p>
      <button className={styles.submit} type="submit">
        <span>Explore the demo</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <p className={styles.formTrust}>
        Sample data <span aria-hidden="true">&middot;</span> No credit card required
      </p>
    </form>
  );
}

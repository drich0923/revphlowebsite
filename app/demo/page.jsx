import Image from "next/image";
import DemoOptInForm from "./DemoOptInForm";
import styles from "./demo.module.css";

export const metadata = {
  title: "Live RevPhlo Demo Sandbox",
  description:
    "Explore RevPhlo in a live, interactive sandbox. Click through dashboards, build reports, and see the sales analytics your team is missing.",
  alternates: { canonical: "https://www.revphlo.com/demo" },
  robots: { index: false, follow: true },
};

const FEATURES = [
  "Click through the executive dashboard",
  "Build reports and filter team performance",
  "Explore application analytics and rep insights",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path d="m5 10.5 3.1 3.1L15.5 6" />
    </svg>
  );
}

function ProductPreview() {
  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.previewTopbar}>
        <div className={styles.previewDots}><span /><span /><span /></div>
        <span>Executive Dashboard</span>
        <span className={styles.previewLive}><i /> LIVE DATA</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewSidebar}>
          <div className={styles.previewMark}>R</div>
          {[0, 1, 2, 3, 4].map((item) => <span key={item} className={item === 0 ? styles.previewNavActive : ""} />)}
        </div>
        <div className={styles.previewContent}>
          <div className={styles.previewHeading}>
            <div><span>OVERVIEW</span><strong>Sales performance</strong></div>
            <span className={styles.previewFilter}>This month</span>
          </div>
          <div className={styles.previewStats}>
            <div><span>Cash collected</span><strong>$570,133</strong><em>+12.8%</em></div>
            <div><span>Close rate</span><strong>31.4%</strong><em>+4.2%</em></div>
            <div><span>Calls taken</span><strong>695</strong><em>+8.1%</em></div>
          </div>
          <div className={styles.previewGrid}>
            <div className={styles.chartCard}>
              <div className={styles.cardTitle}><span>Revenue trend</span><em>LAST 30 DAYS</em></div>
              <div className={styles.chart}>
                {[32, 47, 38, 59, 52, 76, 68, 92, 79, 100, 88, 112].map((height, index) => (
                  <span key={index} style={{ height: `${height}px` }} />
                ))}
              </div>
            </div>
            <div className={styles.leaderCard}>
              <div className={styles.cardTitle}><span>Top closers</span><em>REVENUE</em></div>
              <div className={styles.leader}><i>1</i><span>Marcus T.</span><strong>$84,200</strong></div>
              <div className={styles.leader}><i>2</i><span>Cami L.</span><strong>$71,450</strong></div>
              <div className={styles.leader}><i>3</i><span>Kyle P.</span><strong>$63,800</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#demo-form">Skip to access form</a>
      <header className={styles.header}>
        <a href="/" aria-label="RevPhlo home" className={styles.logo}>
          <Image src="/logo.png" alt="RevPhlo" width={426} height={96} priority />
        </a>
        <a className={styles.login} href="https://app.revphlo.com">
          Already a customer? <span>Log in</span>
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.copy}>
          <div className={styles.eyebrow}><span /> LIVE PRODUCT SANDBOX</div>
          <h1>See what your sales team has been <em>missing.</em></h1>
          <p className={styles.subhead}>
            Get hands-on with RevPhlo. Explore a live workspace, click through real workflows,
            and see exactly how your sales operation looks when every number connects.
          </p>
          <ul className={styles.featureList}>
            {FEATURES.map((feature) => (
              <li key={feature}><CheckIcon /> {feature}</li>
            ))}
          </ul>
        </section>

        <section className={styles.previewWrap}>
          <div className={styles.previewLabel}><span>YOUR SANDBOX INCLUDES</span><span>Sample data &middot; Fully interactive</span></div>
          <ProductPreview />
        </section>

        <aside id="demo-form" className={styles.formCard}>
          <div className={styles.formGlow} aria-hidden="true" />
          <DemoOptInForm />
        </aside>
      </main>

      <footer className={styles.footer}>
        <span>&copy; {new Date().getFullYear()} RevPhlo</span>
        <span>Built for high-performing sales teams.</span>
      </footer>
    </div>
  );
}

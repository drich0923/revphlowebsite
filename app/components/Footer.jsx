import Image from "next/image";
import CookieSettingsLink from "./CookieSettingsLink";
import { SITE_URL } from "../seo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <Image src="/logo.png" alt="RevPhlo" width={102} height={20} className="footer__logo" />
          <span className="footer__copy">&copy; {new Date().getFullYear()} RevPhlo. All rights reserved.</span>
        </div>
        <div className="footer__links">
          <a href="https://www.systemizedsales.com">Systemized Sales</a>
          <a href="https://systemizedsales.ai">Systemized Sales AI</a>
          <a href={`${SITE_URL}/privacy-policy`}>Privacy Policy</a>
          <a href={`${SITE_URL}/terms-of-service`}>Terms of Service</a>
          <a href={`${SITE_URL}/cookie-policy`}>Cookie Policy</a>
          <a href={`${SITE_URL}/privacy-policy#do-not-sell-or-share`}>Do Not Sell or Share My Personal Information</a>
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  );
}

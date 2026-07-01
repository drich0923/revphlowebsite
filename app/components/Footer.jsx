import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <Image src="/logo.png" alt="RevPhlo" width={102} height={20} className="footer__logo" />
          <span className="footer__copy">&copy; 2026 RevPhlo. All rights reserved.</span>
        </div>
        <div className="footer__links">
          <a href="https://revphlo.com/privacy-policy">Privacy Policy</a>
          <a href="https://revphlo.com/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

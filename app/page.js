import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Tape from "./components/Tape";
import OldNew from "./components/OldNew";
import Testimonial from "./components/Testimonial";
import Vsl from "./components/Vsl";
import CtaRail from "./components/CtaRail";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Integrations from "./components/Integrations";
import Faq from "./components/Faq";
import BookDemo from "./components/BookDemo";
import Footer from "./components/Footer";
import StickyBar from "./components/StickyBar";
import RevealManager from "./components/RevealManager";
import { FAQ_ITEMS } from "./components/faq-data";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <div className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Tape />
        <OldNew />
        <Testimonial />
        <Vsl />
        <CtaRail />
        <Features />
        <CtaRail ghostLabel="See It In Action" ghostHref="#vsl" />
        <HowItWorks />
        <Integrations />
        <Faq />
        <BookDemo />
      </main>
      <Footer />
      <StickyBar />
      <RevealManager />
    </div>
  );
}

import Header from "../components/layout/Header";
import HeroSection from "../components/sections/home/HeroSection";
import TrustMarkersSection from "../components/sections/home/TrustMarkersSection";
import PricingSection from "../components/sections/home/PricingSection";
import PricingPoloSection from "../components/sections/home/PricingPoloSection";
import WorkflowSection from "../components/sections/home/WorkflowSection";
import GallerySection from "../components/sections/home/GallerySection";
import FaqSection from "../components/sections/home/FaqSection";
import CtaSection from "../components/sections/home/CtaSection";
import Footer from "../components/layout/Footer";
import { getHomePageJsonLd } from "../lib/json-ld";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomePageJsonLd()) }}
      />

      <Header />

      <main className="pt-8">
        <HeroSection />
        <TrustMarkersSection />
        <PricingSection />
        <PricingPoloSection />
        <WorkflowSection />
        <GallerySection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

// app/page.tsx
import HeroSection from "@/components/sections/home/HomeHeroSection";
import ProcessSection from "@/components/sections/home/HomeProcessSection";
import ContactSection from "@/components/sections/shared/BookCallSection";
import PageSection from "@/components/layout/PageSection";
import FaqSection from "@/components/sections/home/HomeFaqSection";
import PricingSection from "@/components/sections/home/HomePricingSection";
import MainNavbar from "@/components/layout/MainNavbar";
import HomeWorkPreviewSection from "@/components/sections/home/HomeWorkPreviewSection";
import { getLogoImages, getSoftwareImages } from "@/lib/workAssets";

export default function Page() {
  const logos = getLogoImages();
  const softwares = getSoftwareImages();

  return (
    <>
      <MainNavbar />

      <PageSection id="hero">
        <HeroSection />
      </PageSection>

      <PageSection id="process">
        <ProcessSection />
      </PageSection>

      <PageSection id="work-preview">
        <HomeWorkPreviewSection logos={logos} softwares={softwares} />
      </PageSection>

      <PageSection id="pricing">
        <PricingSection />
      </PageSection>

      <PageSection id="faq">
        <FaqSection />
      </PageSection>

      <PageSection id="contact" className="pb-18">
        <ContactSection />
      </PageSection>
    </>
  );
}
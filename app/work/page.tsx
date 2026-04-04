// app/work/page.tsx
import PageSection from "@/components/layout/PageSection";
import WorkIntroSection from "@/components/sections/work/WorkIntroSection";
import WorkLogosSection from "@/components/sections/work/WorkLogosSection";
import DesignSection from "@/components/sections/work/design/DesignSection";
import WorkSoftwareSection from "@/components/sections/work/WorkSoftwareSection";
import ContactSection from "@/components/sections/shared/BookCallSection";
import { getLogoImages, getSoftwareImages } from "@/lib/workAssets";
import MainNavbar from "@/components/layout/MainNavbar";

export default function WorkPage() {
  const logos = getLogoImages();
  const softwares = getSoftwareImages();

  return (
    <>

      <MainNavbar />

      <PageSection id="hero">
        <WorkIntroSection />
      </PageSection>

      <PageSection id="logos">
        <WorkLogosSection images={logos} />
      </PageSection>

      <PageSection id="landings">
        <DesignSection />
      </PageSection>

      <PageSection id="software">
        <WorkSoftwareSection/>
      </PageSection>

      <PageSection id="contact" className="pb-18">
        <ContactSection />
      </PageSection>

    </>
  );
}
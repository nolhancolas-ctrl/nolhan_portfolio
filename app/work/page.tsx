// app/work/page.tsx
import PageSection from "@/components/layout/PageSection";
import MainNavbar from "@/components/layout/MainNavbar";
import WorkIntroSection from "@/components/sections/work/WorkIntroSection";
import WorkFeaturedSection from "@/components/sections/work/WorkFeaturedSection";
import WorkLogosSection from "@/components/sections/work/WorkLogosSection";
import WorkSoftwareSection from "@/components/sections/work/WorkSoftwareSection";
import ContactSection from "@/components/sections/shared/BookCallSection";
import { getSelectedWorkMedia } from "@/lib/selectedWorkAssets";

export default function WorkPage() {
  const media = getSelectedWorkMedia();

  return (
    <>
      <MainNavbar />
      <div className="mx-auto max-w-6xl">
        <WorkIntroSection />
        <WorkFeaturedSection media={media} />
        <WorkLogosSection media={media} />
        <WorkSoftwareSection media={media} />
      </div>
      <PageSection id="contact" className="pb-18"><ContactSection /></PageSection>
    </>
  );
}

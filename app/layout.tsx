import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "lenis/dist/lenis.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./globals.css";
import MotionProvider from "@/components/layout/MotionProvider";
import type { Metadata } from "next";
import GradientBackground from "@/components/layout/visual/GradientBackground";
import CursorGlow from "@/components/layout/CursorGlow";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LangProvider } from "@/hooks/useLang";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} – Développeur Frontend`,
  description: "Expériences Web créatives et interactives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="page-top"
        className="
          relative min-h-screen antialiased
          bg-transparent selection:bg-black/10
        "
      >
        {/* Toute l'app partage la même langue */}
        <LangProvider>
          <MotionProvider>
          <GradientBackground />
          <CursorGlow />
          <Header />
          <main
            className="
              page-main
              relative z-10
              pt-32
            "
          >
            {children}
          </main>
          <Footer className="mt-16" />
        </MotionProvider>
        </LangProvider>
      </body>
    </html>
  );
}


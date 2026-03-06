import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "./globals.css";
import type { Metadata } from "next";
import GradientBackground from "@/components/layout/visual/GradientBackground";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LangProvider } from "@/hooks/useLang"; // ⬅️ nouveau

export const metadata: Metadata = {
  title: "Portfolio – Développeur Frontend",
  description: "Expériences Web créatives et interactives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className="
          relative min-h-screen antialiased
          bg-transparent selection:bg-black/10
        "
      >
        {/* Toute l'app partage la même langue */}
        <LangProvider>
          {/* Fond animé */}
          <GradientBackground />
          {/* Header flottant */}
          <Header />
          {/* Contenu principal */}
          <main
            className="
              page-main
              relative z-10
              pt-32
            "
          >
            {children}
          </main>
          {/* Footer */}
          <Footer className="mt-16" />
        </LangProvider>
      </body>
    </html>
  );
}
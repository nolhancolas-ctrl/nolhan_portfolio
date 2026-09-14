"use client";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import { useAutoRail } from "@/hooks/useAutoRail";
import { reveal } from "@/lib/motion";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { useEffect, useState, useRef } from "react";
import type { WorkImage } from "@/types/work";

type HomeWorkPreviewSectionProps = {
  logos: WorkImage[];
  softwares: WorkImage[]; // on garde pour la signature
  landings?: WorkImage[];
};

// Préviews software : /public/app/app11.png → app61.png (1ère page de chaque app)
const APP_PREVIEWS: WorkImage[] = Array.from({ length: 6 }, (_, i) => {
  const appId = i + 1;
  return {
    src: `/app/app${appId}1.jpg`,
    alt: `App 0${appId} – main screen`,
  };
});

// Préviews landing : /public/landing/designed1.png → designed8.png
const LANDING_PREVIEWS: WorkImage[] = Array.from({ length: 8 }, (_, i) => {
  const idx = i + 1;
  return {
    src: `/landing/designed${idx}.png`,
    alt: `Landing page ${idx}`,
  };
});

export default function HomeWorkPreviewSection({
  logos,
  softwares, // eslint-disable-line @typescript-eslint/no-unused-vars
  landings, // eslint-disable-line @typescript-eslint/no-unused-vars
}: HomeWorkPreviewSectionProps) {
  const { lang } = useLang();
  const { reducedMotion, visible } = useVisualPreferences();
  const autoplay = visible && !reducedMotion;

  const t = {
    en: {
      kicker: "Selected work",
      title: "Logos & product visuals",
      cta: "View full work",
      logosLabel: "Logos",
      softwareLabel: "Software UI",
      landingLabel: "Landing pages",
    },
    fr: {
      kicker: "Réalisations",
      title: "Logos & interfaces produit",
      cta: "Voir tout le travail",
      logosLabel: "Logos",
      softwareLabel: "UI logiciel",
      landingLabel: "Landing pages",
    },
  }[lang];

  const logoImages = logos ?? [];
  const landingImages = LANDING_PREVIEWS;
  const softwareImages = APP_PREVIEWS;

  // Effet hover commun pour les 3 cartes (desktop)
  const hoverCard = {
    y: -8,
    scale: 1.01,
    boxShadow: "0 24px 48px rgba(70,49,110,0.16)",
    transition: { type: "spring" as const, stiffness: 240, damping: 24 },
  };

  // ----- Auto-carrousel MOBILE pour les 3 colonnes -----
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const columnKeys = ["logos", "landing", "software"] as const;
  const loopColumns = [...columnKeys, ...columnKeys]; // duplication pour loop fluide

  useAutoRail(mobileRailRef, loopColumns.length);

  // ----- LogosCard : timer local (toutes les 6s, pas de décalage) -----
  const LogosCard = () => {
    const [logoIndex, setLogoIndex] = useState(0);

    useEffect(() => {
      if (!autoplay || logoImages.length <= 1) return;
      const interval = window.setInterval(() => {
        setLogoIndex((prev) =>
          logoImages.length ? (prev + 2) % logoImages.length : prev,
        );
      }, 6000);
      return () => clearInterval(interval);
    }, [logoImages.length, autoplay]);

    const logo1 =
      logoImages.length > 0
        ? logoImages[logoIndex % logoImages.length]
        : null;
    const logo2 =
      logoImages.length > 1
        ? logoImages[(logoIndex + 1) % logoImages.length]
        : logo1;

    return (
      <motion.a
        href="/work"
        aria-label={t.logosLabel}
        whileHover={hoverCard}
        className="
          rounded-3xl bg-white
          border border-slate-200/70
          px-4 py-4 sm:px-5 sm:py-5
          flex flex-col gap-3
          cursor-pointer
        "
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-500">
          {t.logosLabel}
        </p>
        <div className="relative w-full max-w-sm mx-auto aspect-[9/16] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={logoIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col gap-3"
            >
              {logo1 && (
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={logo1.src}
                    alt={logo1.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
                  />
                </div>
              )}
              {logo2 && (
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={logo2.src}
                    alt={logo2.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
                  />
                </div>
              )}
              {!logo1 && (
                <div className="flex-1 rounded-2xl border border-dashed flex items-center justify-center text-xs text-slate-400">
                  (Logos coming soon)
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.a>
    );
  };

  // ----- LandingCard : timer local (décalé de 2s, puis toutes les 6s) -----
  const LandingCard = () => {
    const [landingIndex, setLandingIndex] = useState(0);

    useEffect(() => {
      if (!autoplay || !landingImages.length) return;

      let interval: number | undefined;
      const timeout = window.setTimeout(() => {
        interval = window.setInterval(() => {
          setLandingIndex((prev) =>
            landingImages.length ? (prev + 1) % landingImages.length : prev,
          );
        }, 6000);
      }, 2000);

      return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
      };
    }, [landingImages.length, autoplay]);

    const currentLanding =
      landingImages.length > 0
        ? landingImages[landingIndex % landingImages.length]
        : null;

    return (
      <motion.a
        href="/work"
        aria-label={t.landingLabel}
        whileHover={hoverCard}
        className="
          rounded-3xl bg-white
          border border-slate-200/70
          px-4 py-4 sm:px-5 sm:py-5
          flex flex-col gap-3
          cursor-pointer
        "
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-500">
          {t.landingLabel}
        </p>
        <div className="relative w-full max-w-sm mx-auto aspect-[9/16] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={landingIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {currentLanding ? (
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src={currentLanding.src}
                    alt={currentLanding.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
                  />
                </div>
              ) : (
                <div className="h-full rounded-2xl border border-dashed flex items-center justify-center text-xs text-slate-400">
                  (Landing previews coming soon)
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.a>
    );
  };

  // ----- SoftwareCard : timer local (décalé de 4s, puis toutes les 6s) -----
  const SoftwareCard = () => {
    const [softwareIndex, setSoftwareIndex] = useState(0);

    useEffect(() => {
      if (!autoplay || !softwareImages.length) return;

      let interval: number | undefined;
      const timeout = window.setTimeout(() => {
        interval = window.setInterval(() => {
          setSoftwareIndex((prev) =>
            softwareImages.length ? (prev + 1) % softwareImages.length : prev,
          );
        }, 6000);
      }, 4000);

      return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
      };
    }, [softwareImages.length, autoplay]);

    const currentSoftware =
      softwareImages.length > 0
        ? softwareImages[softwareIndex % softwareImages.length]
        : null;

    return (
      <motion.a
        href="/work"
        aria-label={t.softwareLabel}
        whileHover={hoverCard}
        className="
          rounded-3xl bg-white
          border border-slate-200/70
          px-4 py-4 sm:px-5 sm:py-5
          flex flex-col gap-3
          cursor-pointer
        "
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-500">
          {t.softwareLabel}
        </p>
        <div className="relative w-full max-w-sm mx-auto aspect-[9/16] overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={softwareIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {currentSoftware ? (
                <Image
                  src={currentSoftware.src}
                  alt={currentSoftware.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
                  (Product UI coming soon)
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.a>
    );
  };

  return (
    <section aria-labelledby="home-work-preview-title">
      <div className="space-y-8">
        {/* Header (simple : kicker + titre) */}
        <motion.div
          {...reveal}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-slate-500">
            {t.kicker}
          </p>
          <h2
            id="home-work-preview-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900"
          >
            {t.title}
          </h2>
        </motion.div>

        {/* 💻 Desktop / tablette : grande carte avec 3 colonnes */}
        <motion.div
          {...reveal}
          className="
            hidden
            md:block
            rounded-[40px]
            border border-slate-200/70
            bg-white/70 backdrop-blur-xl
            shadow-[0_20px_70px_rgba(15,23,42,0.16)]
            px-4 sm:px-6 md:px-8
            pt-6 sm:pt-7 pb-6 sm:pb-7
          "
        >
          <div
            className="
              grid gap-4 sm:gap-5
              md:grid-cols-3
            "
          >
            <LogosCard />
            <LandingCard />
            <SoftwareCard />
          </div>
          {/* CTA desktop dans la carte */}
          <div className="pt-6 flex justify-center">
            <a
              href="/work"
              className="
                inline-flex items-center gap-2
                rounded-full
                px-8 sm:px-10 py-3.5 sm:py-4
                text-sm sm:text-base font-semibold
                bg-white text-black
                shadow-[0_06px_15px_rgba(15,23,42,0.45)]
                hover:bg-white
                hover:shadow-[0_10px_15px_rgba(15,23,42,0.55)]
                transition
              "
            >
              {t.cta}
            </a>
          </div>
        </motion.div>

        {/* 📱 Mobile : carrousel horizontal des 3 colonnes */}
        <motion.div
          {...reveal}
          className="md:hidden"
        >
          <div
            ref={mobileRailRef}
            data-lenis-prevent
            className="
              flex gap-4
              overflow-x-auto
              no-scrollbar
              px-1 py-2
            "
          >
            {loopColumns.map((key, idx) => (
              <div
                key={`${key}-${idx}`}
                className="shrink-0 w-[85%] max-w-xs"
              >
                {key === "logos" && <LogosCard />}
                {key === "landing" && <LandingCard />}
                {key === "software" && <SoftwareCard />}
              </div>
            ))}
          </div>
          {/* CTA mobile sous le carrousel */}
          <div className="pt-5 flex justify-center">
            <a
              href="/work"
              className="
                inline-flex items-center gap-2
                rounded-full
                px-8 py-3.5
                text-sm font-semibold
                bg-white text-black
                shadow-[0_16px_45px_rgba(15,23,42,0.45)]
                hover:bg-white
                hover:shadow-[0_20px_60px_rgba(15,23,42,0.55)]
                transition
              "
            >
              {t.cta}
              <span aria-hidden>🫆</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
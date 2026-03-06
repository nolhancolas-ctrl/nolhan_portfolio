"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import { useLang } from "@/hooks/useLang";

const STYLES = [
  {
    nameEn: "Crimson Noise",
    nameFr: "Crimson Noise",
    labelEn: "Vibrant red, bold and creative-portfolio oriented.",
    labelFr: "Rouge vibrant, brut, taillé pour un portfolio créatif.",
    base: "#FF4B5C",
  },
  {
    nameEn: "Sunrise Glow",
    nameFr: "Sunrise Glow",
    labelEn: "Soft orange, warm and friendly for accessible brands.",
    labelFr:
      "Orange doux, chaleureux et friendly pour des marques accessibles.",
    base: "#FF9F1C",
  },
  {
    nameEn: "Solar Bloom",
    nameFr: "Solar Bloom",
    labelEn: "Bright yellow for optimistic, energetic products.",
    labelFr:
      "Jaune lumineux, parfait pour des produits optimistes et énergiques.",
    base: "#FFD60A",
  },
  {
    nameEn: "Matcha Studio",
    nameFr: "Matcha Studio",
    labelEn: "Calm green, studio / wellness and editorial vibes.",
    labelFr: "Vert calme, ambiance studio / bien-être très éditoriale.",
    base: "#2EC4B6",
  },
  {
    nameEn: "Skyline UI",
    nameFr: "Skyline UI",
    labelEn: "Clean light blue, precise and product-focused.",
    labelFr: "Bleu clair, propre et précis, orienté produit.",
    base: "#3A86FF",
  },
  {
    nameEn: "Indigo Frame",
    nameFr: "Indigo Frame",
    labelEn: "Deep indigo, modern but serious.",
    labelFr: "Indigo profond, moderne mais sérieux.",
    base: "#4B5DFF",
  },
  {
    nameEn: "Violet Pulse",
    nameFr: "Violet Pulse",
    labelEn: "Expressive violet for more artistic interfaces.",
    labelFr: "Violet expressif, pour des interfaces plus artistiques.",
    base: "#9B5DE5",
  },
  {
    nameEn: "Magenta Pop",
    nameFr: "Magenta Pop",
    labelEn: "Punchy magenta for experimental visual identities.",
    labelFr:
      "Magenta punchy, idéal pour des identités visuelles expérimentales.",
    base: "#FF006E",
  },
  {
    nameEn: "Copper Grain",
    nameFr: "Copper Grain",
    labelEn: "Copper / beige with a magazine, editorial feel.",
    labelFr: "Cuivré / beige, avec une vraie vibe magazine éditorial.",
    base: "#B86B43",
  },
  {
    nameEn: "Mono Grain",
    nameFr: "Mono Grain",
    labelEn: "Minimal greyscale, typography-first, ultra clean.",
    labelFr: "Gris/noir minimal, typographie d’abord, ultra épuré.",
    base: "#111827",
  },
];

export default function StyleCarouselSection() {
  const { lang } = useLang();

  const ui = {
    en: {
      kicker: "Style explorer",
      title: "Choose your style",
      subtitle: "Find the one that fits your product.",
      badge: "Scroll / swipe",
      styleLabelPrefix: "style",
      clickLabel: "Clic !",
    },
    fr: {
      kicker: "Explorateur de styles",
      title: "Choisissez votre style",
      subtitle: "Trouvez celui qui correspond à votre produit.",
      badge: "Scroll / swipe",
      styleLabelPrefix: "style",
      clickLabel: "Clic !",
    },
  }[lang];

  // refs pour couleur par défaut + timer
  const defaultColorsRef = useRef<{
    blob1: string;
    blob2: string;
    blob3: string;
  } | null>(null);
  const timeoutRef = useRef<number | null>(null);

  /** Quand on clique sur une carte, on pousse la couleur sur les blobs via des CSS vars,
   * puis on revient à la couleur d’origine après 5s.
   */
  const handleStyleClick = (baseColor: string) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // capture des couleurs par défaut une seule fois
    if (!defaultColorsRef.current) {
      const cs = getComputedStyle(root);
      defaultColorsRef.current = {
        blob1: cs.getPropertyValue("--blob1").trim() || "#FF9ECF",
        blob2: cs.getPropertyValue("--blob2").trim() || "#8ECFFF",
        blob3: cs.getPropertyValue("--blob3").trim() || "#C9A7FF",
      };
    }

    root.style.setProperty("--blob1", baseColor);
    root.style.setProperty("--blob2", baseColor);
    root.style.setProperty("--blob3", baseColor);

    // reset timer si on reclic
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      const defaults = defaultColorsRef.current;
      if (!defaults) return;
      root.style.setProperty("--blob1", defaults.blob1);
      root.style.setProperty("--blob2", defaults.blob2);
      root.style.setProperty("--blob3", defaults.blob3);
    }, 4000);
  };

  return (
    <section aria-labelledby="style-title" className="relative" id="styles">
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 text-center mb-10"
      >
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {ui.kicker}
        </p>
        <h2
          id="style-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {ui.title}
          <span className="block text-slate-500 text-lg mt-3 font-normal">
            {ui.subtitle}
          </span>
        </h2>
      </motion.div>

      {/* Carousel coverflow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          className="w-full max-w-5xl"
          whileHover={{ scale: 0.9, y: 8 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/* Mask pour fade d’opacité aux bords */}
          <div className="style-carousel-mask">
            <Swiper
              modules={[EffectCoverflow, Mousewheel]}
              effect="coverflow"
              centeredSlides
              loop
              grabCursor
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1.3, spaceBetween: 0 },
                640: { slidesPerView: 2, spaceBetween: 0 },
                1024: { slidesPerView: 3, spaceBetween: 0 },
              }}
              className="style-coverflow-swiper"
            >
              {STYLES.map((style, index) => (
                <SwiperSlide key={style.nameEn}>
                  <div className="flex h-[260px] sm:h-[300px] md:h-[340px] items-stretch justify-center">
                    {/* La carte entière devient cliquable */}
                    <button
                      type="button"
                      onClick={() => handleStyleClick(style.base)}
                      className="
                        relative w-[220px] sm:w-[260px] md:w-[280px]
                        rounded-3xl overflow-hidden
                        shadow-xl border border-white/60
                        bg-slate-900
                        flex cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-white/60
                        focus:ring-offset-2 focus:ring-offset-slate-900
                      "
                      style={{
                        background: `
                          radial-gradient(circle at 20% 0%, rgba(255,255,255,0.7), transparent 55%),
                          radial-gradient(circle at 80% 100%, rgba(0,0,0,0.35), transparent 55%),
                          ${style.base}
                        `,
                      }}
                    >
                      {/* overlay “plastique” */}
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.25),transparent_40%,rgba(0,0,0,0.25))]" />

                      {/* contenu */}
                      <div className="relative flex-1 flex flex-col justify-between p-4 text-white">
                        <div className="space-y-1">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/75">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1} —{" "}
                            {ui.styleLabelPrefix}
                          </p>
                          <h3 className="text-lg font-semibold leading-tight">
                            {lang === "en" ? style.nameEn : style.nameFr}
                          </h3>
                          <p className="text-xs text-white/85">
                            {lang === "en" ? style.labelEn : style.labelFr}
                          </p>
                        </div>

                        {/* GROS "Clic !" centré */}
                        <div className="mt-4 flex items-center justify-center">
                          <div
                            className="
                              inline-flex items-center justify-center
                              rounded-full border border-white/40 bg-white/15
                              px-5 py-2
                              shadow-[0_0_24px_rgba(255,255,255,0.35)]
                            "
                          >
                            <span className="shine-text text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
                              {ui.clickLabel}
                            </span>
                          </div>
                        </div>

                        {/* Badge scroll en bas */}
                        <div className="mt-4 flex items-center justify-between text-[11px] text-white/80">
                          <span className="rounded-full bg-white/15 px-2 py-1">
                            {ui.badge}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-1 w-6 rounded-full bg-white/60" />
                            <span className="h-1 w-3 rounded-full bg-white/40" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
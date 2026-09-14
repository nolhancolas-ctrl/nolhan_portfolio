"use client";
import { useAutoRail } from "@/hooks/useAutoRail";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { useState, useEffect, useRef } from "react";

export type DesignImage = {
  src: string;
  alt: string;
};

type DesignSectionClientProps = {
  images: DesignImage[];
};

export default function DesignSectionClient({ images }: DesignSectionClientProps) {
  const { lang } = useLang();
  const [activeImage, setActiveImage] = useState<DesignImage | null>(null);

  const t = {
    en: {
      kicker: "Design gallery",
      title: "Landing page explorations",
      close: "Close",
    },
    fr: {
      kicker: "Galerie de designs",
      title: "Explorations de landing pages",
      close: "Fermer",
    },
  }[lang];

  // -------- Lightbox : clavier (Esc / ← / →) --------
  const currentIndex = activeImage
    ? images.findIndex((img) => img.src === activeImage.src)
    : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!images.length || currentIndex === -1) return;
    const idx = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[idx]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!images.length || currentIndex === -1) return;
    const idx = (currentIndex + 1) % images.length;
    setActiveImage(images[idx]);
  };

  useEffect(() => {
    if (!activeImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImage, currentIndex, images.length]);

  // -------- Mobile : rail horizontal auto-défilant (loop) --------
  const railRef = useRef<HTMLDivElement | null>(null);
  // on duplique les images pour permettre un loop fluide
  const loopImages = images.length ? [...images, ...images] : [];

  useAutoRail(railRef, loopImages.length);

  // -------- Layout asymétrique (desktop) --------
  const layoutClasses = [
    "lg:col-span-2 lg:row-span-2", // 0 : visuel principal
    "",
    "",
    "lg:row-span-2", // 3 : carte haute à droite
    "",
    "",
    "",
    "",
  ];

  return (
    <section aria-labelledby="design-title" className="relative mt-16">
      {/* Header */}
      <div className="space-y-4 text-center mb-10">
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {t.kicker}
        </p>
        <h2
          id="design-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {t.title}
        </h2>
      </div>

      {/* 💻 Desktop / tablette : grille asymétrique */}
      <div
        className="
          hidden
          sm:grid gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          auto-rows-[220px]
          sm:auto-rows-[260px]
          lg:auto-rows-[320px]
        "
      >
        {images.map((img, index) => (
          <article
            key={img.src}
            className={`
              relative group overflow-hidden
              rounded-3xl border border-slate-200/70 bg-white/5
              shadow-sm hover:shadow-xl
              transition-transform duration-500
              hover:-translate-y-1
              ${layoutClasses[index] ?? ""}
            `}
          >
            <button
              type="button"
              onClick={() => setActiveImage(img)}
              className="relative w-full h-full cursor-zoom-in"
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* 📱 Mobile : rail horizontal scrollable + auto-défilement, 9:16 */}
      <div className="sm:hidden px-4">
        <div
          ref={railRef}
            data-lenis-prevent
          className="
            flex gap-4
            overflow-x-auto
            py-2
            no-scrollbar
          "
        >
          {loopImages.map((img, idx) => (
            <button
              type="button"
              key={`${img.src}-${idx}`}
              onClick={() => setActiveImage(img)}
              className="shrink-0"
            >
              <div
                className="
                  relative
                  w-[220px]
                  aspect-[9/16]
                  rounded-3xl overflow-hidden
                  border border-slate-200/70 bg-white
                  shadow-sm
                "
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="60vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </button>
          ))}
          {!loopImages.length && (
            <div className="w-full aspect-[9/16] rounded-3xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
              (No landing pages yet)
            </div>
          )}
        </div>
      </div>

      {/* Lightbox plein écran */}
      {activeImage && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-slate-900/40 backdrop-blur-[2px]
            flex items-center justify-center
            px-4
          "
          onClick={() => setActiveImage(null)}
        >
          <div
            className="
              relative max-w-4xl w-full max-h-[90vh]
              rounded-[28px] overflow-hidden
              shadow-2xl
            "
          >
            {/* Bouton de fermeture */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="
                absolute top-3 right-3 z-20
                inline-flex items-center justify-center
                h-8 w-8 rounded-full
                bg-black/70 text-white
                border border-white/30
                text-xs font-medium
                hover:bg-black/90 transition
              "
              aria-label={t.close}
            >
              ✕
            </button>

            {/* Flèche gauche */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="
                  absolute left-3 top-1/2 -translate-y-1/2 z-20
                  inline-flex items-center justify-center
                  h-9 w-9 rounded-full
                  bg-black/60 text-white
                  border border-white/30
                  text-lg
                  hover:bg-black/80 transition
                "
              >
                ‹
              </button>
            )}

            {/* Flèche droite */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2 z-20
                  inline-flex items-center justify-center
                  h-9 w-9 rounded-full
                  bg-black/60 text-white
                  border border-white/30
                  text-lg
                  hover:bg-black/80 transition
                "
              >
                ›
              </button>
            )}

            {/* Image en grand */}
            <div
              className="relative w-full h-[70vh] sm:h-[80vh] bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
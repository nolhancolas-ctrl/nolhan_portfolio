"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { useState, useEffect, useRef } from "react";
import type { WorkImage } from "@/types/work";

type Props = {
  images: WorkImage[];
};

export default function WorkLogosSection({ images }: Props) {
  const { lang } = useLang();
  const [activeImage, setActiveImage] = useState<WorkImage | null>(null);

  const t = {
    en: {
      kicker: "Logos",
      title: "Marks & logotypes",
      close: "Close",
    },
    fr: {
      kicker: "Logos",
      title: "Signatures & logotypes",
      close: "Fermer",
    },
  }[lang];

  // ----- Lightbox : index / navigation -----
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

  // ----- Mobile : rail horizontal auto-défilant (2 lignes) -----
  const railRef = useRef<HTMLDivElement | null>(null);
  // on duplique les images pour permettre un loop fluide
  const loopImages = images.length ? [...images, ...images] : [];

  useEffect(() => {
    const el = railRef.current;
    if (!el || !loopImages.length) return;

    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 30; // px/s (même dynamique que landing/software)

    const step = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      const node = railRef.current;
      if (!node) return;

      node.scrollLeft += speed * dt;

      const halfWidth = node.scrollWidth / 2;
      if (node.scrollLeft >= halfWidth) {
        node.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [loopImages.length]);

  return (
    <section aria-labelledby="logos-title">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 text-center"
        >
          <p className="kicker text-slate-500">{t.kicker}</p>
          <h2
            id="logos-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
          >
            {t.title}
          </h2>
        </motion.div>

        {/* 💻 Desktop / tablette : grille de logos 1:1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            hidden
            sm:grid gap-5
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          "
        >
          {images.map((img, index) => (
            <motion.article
              key={img.src}
              className="
                relative group
                rounded-3xl border border-slate-200/70 bg-white
                shadow-sm
                overflow-hidden
                aspect-square
                cursor-zoom-in
              "
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.25,
              }}
              onClick={() => setActiveImage(img)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 📱 Mobile : rail horizontal auto-scroll, 2 lignes de logos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sm:hidden px-4"
        >
          <div
            ref={railRef}
            className="
              overflow-x-auto
              no-scrollbar
              py-2
            "
          >
            <div
              className="
                grid
                grid-rows-2
                grid-flow-col
                auto-cols-[220px]
                gap-3
              "
            >
              {loopImages.map((img, idx) => (
                <button
                  type="button"
                  key={`${img.src}-${idx}`}
                  onClick={() => setActiveImage(img)}
                  className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200/70 bg-white"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                </button>
              ))}
              {!loopImages.length && (
                <div className="aspect-square rounded-3xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                  (No logos yet)
                </div>
              )}
            </div>
          </div>
        </motion.div>
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
              shadow-2xl bg-white
            "
          >
            {/* Close */}
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

            {/* Flèches */}
            {images.length > 1 && (
              <>
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
              </>
            )}

            {/* Image en grand */}
            <div
              className="relative w-full h-[70vh] sm:h-[80vh] bg-white"
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
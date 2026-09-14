"use client";

import WorkLightbox from "@/components/work/WorkLightbox";
import { useAutoRail } from "@/hooks/useAutoRail";
import { useLang } from "@/hooks/useLang";
import { reveal } from "@/lib/motion";
import type { WorkImage } from "@/types/work";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  images: WorkImage[];
};

export default function WorkLogosSection({ images }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const loopImages = images.length ? [...images, ...images] : [];

  useAutoRail(railRef, loopImages.length);

  const t = {
    en: {
      kicker: "Logos",
      title: "Marks & logotypes",
      close: "Close",
      previous: "Previous logo",
      next: "Next logo",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      kicker: "Logos",
      title: "Signatures & logotypes",
      close: "Fermer",
      previous: "Logo précédent",
      next: "Logo suivant",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
    },
  }[lang];

  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.alt,
  }));

  return (
    <section aria-labelledby="logos-title">
      <div className="space-y-8">
        <motion.div {...reveal} className="space-y-3 text-center">
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            {t.kicker}
          </p>

          <h2
            id="logos-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
          >
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          {...reveal}
          className="hidden sm:grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {images.map((image, index) => (
            <motion.button
              type="button"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              className="
                relative group aspect-square overflow-hidden
                rounded-3xl border border-white/55
                bg-white/20 backdrop-blur-sm
                shadow-sm cursor-zoom-in
              "
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.25,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
            </motion.button>
          ))}
        </motion.div>

        <motion.div {...reveal} className="sm:hidden px-4">
          <div
            ref={railRef}
            data-lenis-prevent
            className="overflow-x-auto no-scrollbar py-2"
          >
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[220px] gap-3">
              {loopImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image.src}-${index}`}
                  onClick={() => setActiveIndex(index % images.length)}
                  className="
                    relative aspect-square overflow-hidden
                    rounded-3xl border border-white/55
                    bg-white/15 backdrop-blur-sm
                  "
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <WorkLightbox
        slides={slides}
        index={activeIndex ?? 0}
        open={activeIndex !== null}
        sectionLabel={t.kicker}
        onClose={() => setActiveIndex(null)}
        labels={t}
      />
    </section>
  );
}

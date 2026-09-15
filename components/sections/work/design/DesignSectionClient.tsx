"use client";

import WorkLightbox from "@/components/work/WorkLightbox";
import { useAutoRail } from "@/hooks/useAutoRail";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import { useRef, useState } from "react";

export type DesignImage = {
  src: string;
  alt: string;
};

type DesignSectionClientProps = {
  images: DesignImage[];
};

export default function DesignSectionClient({
  images,
}: DesignSectionClientProps) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const loopImages = images.length ? [...images, ...images] : [];

  useAutoRail(railRef, loopImages.length);

  const t = {
    en: {
      kicker: "Design gallery",
      title: "Landing page explorations",
      close: "Close",
      previous: "Previous project",
      next: "Next project",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      kicker: "Galerie de designs",
      title: "Explorations de landing pages",
      close: "Fermer",
      previous: "Projet précédent",
      next: "Projet suivant",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
    },
  }[lang];

  const layoutClasses = [
    "lg:col-span-2 lg:row-span-2",
    "",
    "",
    "lg:row-span-2",
    "",
    "",
    "",
    "",
  ];

  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.alt,
  }));

  return (
    <section aria-labelledby="design-title" className="relative mt-16">
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

      <div className="
        hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-3
        auto-rows-[220px] sm:auto-rows-[260px] lg:auto-rows-[320px]
      ">
        {images.map((image, index) => (
          <article
            key={image.src}
            className={`
              relative group overflow-hidden
              rounded-3xl border border-white/55 bg-white/15
              backdrop-blur-sm shadow-sm hover:shadow-xl
              transition-transform duration-500 hover:-translate-y-1
              ${layoutClasses[index] ?? ""}
            `}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative w-full h-full cursor-zoom-in"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </button>
          </article>
        ))}
      </div>

      <div className="sm:hidden px-4">
        <div
          ref={railRef}
          data-lenis-prevent
          className="flex gap-4 overflow-x-auto py-2 no-scrollbar"
        >
          {loopImages.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              onClick={() => setActiveIndex(index % images.length)}
              className="
                relative shrink-0 w-[220px] aspect-[3/4]
                overflow-hidden rounded-3xl
                border border-white/55 bg-white/15
                backdrop-blur-sm
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

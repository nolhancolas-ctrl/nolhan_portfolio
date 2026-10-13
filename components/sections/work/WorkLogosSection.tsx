"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };
type Mark = { name: string; src: string | null; tone: WorkMediaTone };
const ROW_SIZE = 4;
const ROTATION_MS = 5000;

export default function WorkLogosSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [row, setRow] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const copy = {
    en: { title: "Marks & logotypes", open: "Enlarge logo", close: "Close", previous: "Previous logo", next: "Next logo", zoomIn: "Zoom in", zoomOut: "Zoom out" },
    fr: { title: "Signatures & logotypes", open: "Agrandir le logo", close: "Fermer", previous: "Logo précédent", next: "Logo suivant", zoomIn: "Agrandir", zoomOut: "Réduire" },
  }[lang];

  const marks: Mark[] = [
    { name: "Terra Sculptura", src: media.terraLogo, tone: "forest" },
    { name: "Aube Coffee", src: media.aubeLogo, tone: "coffee" },
    { name: "Nomad", src: media.atelierLogo, tone: "workshop" },
    { name: "Odyssea Vision", src: media.odysseaLogo, tone: "ocean" },
    ...Array.from({ length: 8 }, (_, index): Mark => ({
      name: `Logo study ${String(index + 1).padStart(2, "0")}`,
      src: `/logos/logo${index + 1}.webp`,
      tone: "paper",
    })),
  ];
  const availableMarks = marks.filter((mark): mark is Mark & { src: string } => Boolean(mark.src));
  const rows = Array.from({ length: Math.ceil(availableMarks.length / ROW_SIZE) }, (_, index) =>
    availableMarks.slice(index * ROW_SIZE, (index + 1) * ROW_SIZE)
  );
  const slides = availableMarks.map((mark) => ({ src: mark.src, alt: mark.name, title: mark.name }));
  const currentRow = rows[row % Math.max(rows.length, 1)] ?? [];

  useEffect(() => {
    if (reducedMotion || paused || !inView || rows.length < 2) return;
    const timer = window.setInterval(() => {
      const element = carouselRef.current;
      if (element?.matches(":hover") || (document.activeElement && element?.contains(document.activeElement))) return;
      setRow((current) => (current + 1) % rows.length);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [inView, paused, reducedMotion, rows.length]);

  const openLogo = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };
  const renderMark = (mark: Mark & { src: string }) => (
    <button key={mark.src} type="button" onClick={() => openLogo(mark.src)} className="block min-w-0 cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — " + mark.name}>
      <WorkMedia src={mark.src} alt={mark.name + " logo"} label={mark.name} tone={mark.tone} width={1200} height={1200} fit="square" />
    </button>
  );

  return (
    <section id="identities" aria-labelledby="identities-title" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <WorkReveal className="mb-10 text-center">
        <h2 id="identities-title" className="text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
      </WorkReveal>

      <WorkReveal>
        <div
          ref={carouselRef}
          className="grid overflow-hidden rounded-[26px]"
          aria-roledescription="carousel"
          aria-label={copy.title}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
          }}
        >
          {reducedMotion ? (
            <div className="col-start-1 row-start-1 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {availableMarks.map(renderMark)}
            </div>
          ) : (
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={row}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4"
              >
                {currentRow.map(renderMark)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </WorkReveal>

      {slides.length > 0 && <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.title} onClose={() => setActiveIndex(null)} labels={copy} />}
    </section>
  );
}

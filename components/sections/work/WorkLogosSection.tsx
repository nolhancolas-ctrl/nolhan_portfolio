"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };
type Mark = { name: string; src: string | null; tone: WorkMediaTone };
const PAGE_SIZE = 8;

export default function WorkLogosSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const copy = {
    en: { title: "Marks & logotypes", open: "Enlarge logo", close: "Close", previous: "Previous logo", next: "Next logo", zoomIn: "Zoom in", zoomOut: "Zoom out", previousGroup: "Previous logos", nextGroup: "Next logos" },
    fr: { title: "Signatures & logotypes", open: "Agrandir le logo", close: "Fermer", previous: "Logo précédent", next: "Logo suivant", zoomIn: "Agrandir", zoomOut: "Réduire", previousGroup: "Logos précédents", nextGroup: "Logos suivants" },
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
  const slides = availableMarks.map((mark) => ({ src: mark.src, alt: mark.name, title: mark.name }));
  const totalPages = Math.ceil(availableMarks.length / PAGE_SIZE);
  const visibleMarks = availableMarks.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const openLogo = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="identities" aria-labelledby="identities-title" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <WorkReveal className="mb-10 text-center">
        <h2 id="identities-title" className="text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
      </WorkReveal>

      <WorkReveal>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {visibleMarks.map((mark) => (
            <button key={mark.src} type="button" onClick={() => openLogo(mark.src)} className="block min-w-0 cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — " + mark.name}>
              <WorkMedia src={mark.src} alt={mark.name + " logo"} label={mark.name} tone={mark.tone} width={1200} height={1200} fit="square" />
            </button>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-5">
            <button type="button" onClick={() => setPage((current) => (current - 1 + totalPages) % totalPages)} aria-label={copy.previousGroup} className="grid h-10 w-10 place-items-center rounded-full border border-white/75 bg-white/60 text-slate-900 transition hover:bg-white">←</button>
            <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-slate-600">{String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
            <button type="button" onClick={() => setPage((current) => (current + 1) % totalPages)} aria-label={copy.nextGroup} className="grid h-10 w-10 place-items-center rounded-full border border-white/75 bg-white/60 text-slate-900 transition hover:bg-white">→</button>
          </div>
        )}
      </WorkReveal>

      {slides.length > 0 && <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.title} onClose={() => setActiveIndex(null)} labels={copy} />}
    </section>
  );
}

"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkLogosSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "Identity & marks",
      title: "A mark should make a world feel real.",
      intro: "Four distinct visual territories, each with its own character. The symbol gets space to speak.",
      context: "Visual identity",
      view: "Explore logo",
      close: "Close",
      previous: "Previous logo",
      next: "Next logo",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      notes: [
        "An emblem inspired by land, growth and landscape.",
        "Warmth and ritual distilled into a simple coffee signature.",
        "A distinctive mark for mechanical craft and heritage.",
        "An ocean identity shaped by movement and exploration.",
      ],
    },
    fr: {
      eyebrow: "Identités & signes",
      title: "Un signe doit rendre un univers crédible.",
      intro: "Quatre territoires visuels distincts, chacun avec son caractère. Les symboles ont l’espace de s’exprimer.",
      context: "Identité visuelle",
      view: "Explorer le logo",
      close: "Fermer",
      previous: "Logo précédent",
      next: "Logo suivant",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      notes: [
        "Un emblème inspiré de la terre, de la croissance et du paysage.",
        "La chaleur et le rituel résumés en une signature de café.",
        "Un signe singulier pour le savoir-faire mécanique et son héritage.",
        "Une identité marine façonnée par le mouvement et l’exploration.",
      ],
    },
  }[lang];

  const marks: Array<{ name: string; src: string | null; tone: WorkMediaTone; note: string }> = [
    { name: "Terra Sculptura", src: media.terraLogo, tone: "forest", note: copy.notes[0] },
    { name: "Aube Coffee", src: media.aubeLogo, tone: "coffee", note: copy.notes[1] },
    { name: "Atelier Chrome & Craft", src: media.atelierLogo, tone: "workshop", note: copy.notes[2] },
    { name: "Odyssea Vision", src: media.odysseaLogo, tone: "ocean", note: copy.notes[3] },
  ];
  const slides = marks.filter((mark): mark is typeof mark & { src: string } => Boolean(mark.src))
    .map((mark) => ({ src: mark.src, alt: mark.name, title: mark.name }));

  const open = (src: string | null) => {
    if (!src) return;
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="identities" aria-labelledby="identities-title" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="identities-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        <p className="mt-5 text-slate-600">{copy.intro}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {marks.map((mark, index) => (
          <article key={mark.name} className="rounded-[32px] border border-white/65 bg-white/45 p-4 shadow-[0_22px_60px_rgba(47,35,92,0.08)] backdrop-blur-md sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.17em] text-slate-600">
              <span>{String(index + 1).padStart(2, "0")} / 04</span>
              <span>{copy.context}</span>
            </div>
            {mark.src ? (
              <button type="button" onClick={() => open(mark.src)} className="block w-full focus-visible:rounded-[26px]" aria-label={copy.view + " — " + mark.name}>
                <WorkMedia src={mark.src} alt={mark.name + " logo"} label={mark.name} tone={mark.tone} className="aspect-square w-full" />
              </button>
            ) : (
              <WorkMedia src={null} alt={mark.name + " logo placeholder"} label={mark.name} tone={mark.tone} className="aspect-square w-full" />
            )}
            <div className="flex flex-col justify-between gap-2 px-1 pb-1 pt-5 sm:flex-row sm:items-end">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">{mark.name}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-slate-600">{mark.note}</p>
            </div>
          </article>
        ))}
      </div>
      {slides.length > 0 && <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.eyebrow} onClose={() => setActiveIndex(null)} labels={copy} />}
    </section>
  );
}

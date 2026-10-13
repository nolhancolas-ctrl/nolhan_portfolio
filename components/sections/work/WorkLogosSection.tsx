"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkLogosSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "02 / Identities",
      title: "A symbol can set the tone.",
      intro: "Distinct marks for distinct stories, presented with space to see their shape and character.",
      open: "Enlarge logo",
      close: "Close",
      previous: "Previous logo",
      next: "Next logo",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      notes: [
        "Landscape and growth, reduced to a memorable mark.",
        "A warm signature for a slower coffee ritual.",
        "Mechanical craft with a clear, confident silhouette.",
        "An ocean identity built around movement.",
      ],
    },
    fr: {
      eyebrow: "02 / Identités",
      title: "Un symbole donne le ton.",
      intro: "Des signatures différentes pour des histoires différentes, avec assez d’espace pour voir leur forme et leur caractère.",
      open: "Agrandir le logo",
      close: "Fermer",
      previous: "Logo précédent",
      next: "Logo suivant",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      notes: [
        "Le paysage et la croissance réduits à un signe mémorable.",
        "Une signature chaleureuse pour un rituel café plus calme.",
        "Le savoir-faire mécanique dans une silhouette affirmée.",
        "Une identité marine portée par le mouvement.",
      ],
    },
  }[lang];

  const marks: Array<{ name: string; src: string | null; tone: WorkMediaTone; note: string }> = [
    { name: "Terra Sculptura", src: media.terraLogo, tone: "forest", note: copy.notes[0] },
    { name: "Aube Coffee", src: media.aubeLogo, tone: "coffee", note: copy.notes[1] },
    { name: "Atelier Chrome & Craft", src: media.atelierLogo, tone: "workshop", note: copy.notes[2] },
    { name: "Odyssea Vision", src: media.odysseaLogo, tone: "ocean", note: copy.notes[3] },
  ];

  const slides = marks.flatMap((mark) => mark.src ? [{ src: mark.src, alt: mark.name, title: mark.name }] : []);
  const openLogo = (src: string | null) => {
    if (!src) return;
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="identities" aria-labelledby="identities-title" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <WorkReveal className="mb-10 grid gap-4 border-t border-slate-900/10 pt-8 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
          <h2 id="identities-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        </div>
        <p className="max-w-md text-slate-600 md:justify-self-end">{copy.intro}</p>
      </WorkReveal>

      <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
        {marks.map((mark, index) => (
          <WorkReveal key={mark.name} className="h-full">
            <article>
              {mark.src ? (
                <button type="button" onClick={() => openLogo(mark.src)} className="block w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — " + mark.name}>
                  <WorkMedia src={mark.src} alt={mark.name + " logo"} label={mark.name} tone={mark.tone} width={1200} height={1200} fit="square" />
                </button>
              ) : (
                <WorkMedia src={null} alt={mark.name + " logo"} label={mark.name} tone={mark.tone} width={1200} height={1200} />
              )}
              <div className="mt-4 flex items-start gap-4 px-1">
                <span className="pt-1 text-xs font-semibold tracking-[0.18em] text-slate-500">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">{mark.name}</h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-600">{mark.note}</p>
                </div>
              </div>
            </article>
          </WorkReveal>
        ))}
      </div>

      {slides.length > 0 && <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.eyebrow} onClose={() => setActiveIndex(null)} labels={copy} />}
    </section>
  );
}

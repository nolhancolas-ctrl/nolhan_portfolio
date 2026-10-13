"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkSoftwareSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "03 / Systems & interfaces",
      title: "The experience continues behind the scenes.",
      intro: "A public website is only part of the work. The tools behind it deserve the same care.",
      project: "Odyssea Vision / Editorial workspace",
      description: "The admin brings stories, portfolio, videos and client albums into one place. Its hierarchy is designed around publishing work, so the team can keep the public experience current.",
      points: [
        { title: "One workspace", body: "Related content lives together instead of being scattered across tools." },
        { title: "Clear next steps", body: "The dashboard makes recent content and ongoing activity easy to find." },
        { title: "Editorial continuity", body: "The private interface supports the same story-led site visitors see." },
      ],
      more: "Earlier interface studies",
      moreIntro: "A compact archive of product UI explorations.",
      concept: "Interface concept",
      open: "Enlarge interface",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      eyebrow: "03 / Systèmes & interfaces",
      title: "L’expérience continue en coulisses.",
      intro: "Le site public n’est qu’une partie du travail. Les outils qui l’alimentent méritent le même soin.",
      project: "Odyssea Vision / Espace éditorial",
      description: "L’administration rassemble récits, portfolio, vidéos et albums clients. Sa hiérarchie suit le travail de publication pour que l’équipe puisse faire vivre le site.",
      points: [
        { title: "Un seul espace", body: "Les contenus liés restent réunis au lieu d’être dispersés entre plusieurs outils." },
        { title: "Des repères clairs", body: "Le tableau de bord rend les contenus récents et l’activité faciles à retrouver." },
        { title: "Une continuité éditoriale", body: "L’interface privée soutient le site guidé par le récit que voient les visiteurs." },
      ],
      more: "Études d’interfaces précédentes",
      moreIntro: "Une petite archive d’explorations d’interfaces produit.",
      concept: "Concept d’interface",
      open: "Agrandir l’interface",
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
    },
  }[lang];

  const studies = [
    { name: "Meal Planner", src: "/app/app11.webp" },
    { name: "Habit & Analytics", src: "/app/app21.webp" },
    { name: "Budget Insights", src: "/app/app31.webp" },
  ];
  const slides = [
    ...(media.odysseaAdmin ? [{ src: media.odysseaAdmin, alt: copy.project, title: "Odyssea Vision" }] : []),
    ...studies.map((study) => ({ src: study.src, alt: study.name, title: study.name })),
  ];
  const openImage = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="systems" aria-labelledby="systems-title" className="scroll-mt-28 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      <div aria-hidden="true" className="relative mb-14 h-px bg-gradient-to-r from-transparent via-slate-900/15 to-transparent">
        <div className="absolute left-1/2 top-1/2 h-10 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b5d3]/40 blur-2xl" />
      </div>
      <WorkReveal className="mb-10 grid gap-4 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
          <h2 id="systems-title" className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        </div>
        <p className="max-w-md leading-relaxed text-slate-600 md:justify-self-end">{copy.intro}</p>
      </WorkReveal>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
        <WorkReveal drift={16}>
          {media.odysseaAdmin ? (
            <button type="button" onClick={() => openImage(media.odysseaAdmin as string)} className="block w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open}>
              <WorkMedia src={media.odysseaAdmin} alt={copy.project} label="Odyssea Vision / Admin" tone="admin" width={897} height={626} />
            </button>
          ) : (
            <WorkMedia src={null} alt={copy.project} label="Odyssea Vision / Admin" tone="admin" width={897} height={626} />
          )}
        </WorkReveal>
        <WorkReveal drift={-16} delay={0.08}>
          <div className="flex h-full flex-col rounded-[26px] border border-white/75 bg-white/50 p-6 backdrop-blur-xl sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.project}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{copy.description}</p>
            <div className="mt-auto pt-6">
              {copy.points.map((point, index) => (
                <div key={point.title} className="grid grid-cols-[32px_1fr] gap-3 border-t border-slate-900/10 py-3">
                  <span className="pt-0.5 text-xs font-semibold text-slate-500">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-slate-950">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WorkReveal>
      </div>

      <WorkReveal className="mt-12">
        <details className="group rounded-[24px] border border-white/70 bg-white/40 px-5 py-5 backdrop-blur-md sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold text-slate-950 marker:hidden">
            <span>{copy.more}</span>
            <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm text-slate-600">{copy.moreIntro}</p>
          <div className="mt-6 grid gap-4 border-t border-slate-900/10 pt-6 sm:grid-cols-3">
            {studies.map((study) => (
              <button key={study.name} type="button" onClick={() => openImage(study.src)} className="rounded-[20px] border border-white/75 bg-white/65 p-4 text-left transition hover:bg-white" aria-label={copy.open + " — " + study.name}>
                <div className="relative mx-auto aspect-[9/15] max-w-[200px] overflow-hidden rounded-xl bg-slate-100">
                  <Image src={study.src} alt={study.name} fill sizes="200px" className="object-contain" />
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{copy.concept}</p>
                <h3 className="mt-1 font-semibold text-slate-950">{study.name}</h3>
              </button>
            ))}
          </div>
        </details>
      </WorkReveal>

      <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.eyebrow} onClose={() => setActiveIndex(null)} labels={copy} />
    </section>
  );
}

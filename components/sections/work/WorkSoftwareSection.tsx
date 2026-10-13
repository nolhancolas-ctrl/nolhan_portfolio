"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia from "@/components/work/WorkMedia";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkSoftwareSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "Systems & interfaces",
      title: "The useful side of the experience.",
      intro: "A visual language also has to hold up when someone uses the product every day.",
      projectType: "Odyssea Vision · editorial dashboard",
      adminTitle: "A clearer way to publish stories.",
      adminBody: "Alongside the public website, an admin interface helps the team manage stories, media and client albums. The design connects the polished front end with the practical work behind it.",
      adminAlt: "Odyssea Vision admin dashboard screenshot",
      explore: "Inspect the interface",
      principles: [
        { title: "Structure", body: "Content organised around the tasks the team actually performs." },
        { title: "Consistency", body: "Shared visual cues connect the public and private sides of the product." },
        { title: "Autonomy", body: "The team can keep the experience alive as the content evolves." },
      ],
      more: "More interface explorations",
      moreIntro: "A smaller selection of product concepts, kept here as supporting studies.",
      concept: "Interface concept",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      eyebrow: "Systèmes & interfaces",
      title: "La partie utile de l’expérience.",
      intro: "Un langage visuel doit aussi fonctionner pour celles et ceux qui utilisent le produit chaque jour.",
      projectType: "Odyssea Vision · tableau de bord éditorial",
      adminTitle: "Une façon plus claire de publier les récits.",
      adminBody: "En parallèle du site public, une interface d’administration aide l’équipe à gérer récits, médias et albums clients. Le design relie l’expérience visible au travail concret qui la fait vivre.",
      adminAlt: "Capture de l’administration Odyssea Vision",
      explore: "Examiner l’interface",
      principles: [
        { title: "Structure", body: "Les contenus sont organisés selon les tâches réelles de l’équipe." },
        { title: "Cohérence", body: "Des repères visuels relient les parties publique et privée du produit." },
        { title: "Autonomie", body: "L’équipe peut faire évoluer l’expérience avec ses contenus." },
      ],
      more: "Autres explorations d’interfaces",
      moreIntro: "Une sélection plus discrète de concepts produit, présentés comme études complémentaires.",
      concept: "Concept d’interface",
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
    ...(media.odysseaAdmin ? [{ src: media.odysseaAdmin, alt: copy.adminAlt, title: "Odyssea Vision" }] : []),
    ...studies.map((study) => ({ src: study.src, alt: study.name, title: study.name })),
  ];
  const open = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="systems" aria-labelledby="systems-title" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="systems-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        <p className="mt-5 text-slate-600">{copy.intro}</p>
      </div>

      <article className="overflow-hidden rounded-[34px] border border-white/65 bg-white/50 p-5 shadow-[0_25px_70px_rgba(45,36,91,0.1)] backdrop-blur-md sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(250px,0.4fr)_minmax(0,0.6fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{copy.projectType}</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{copy.adminTitle}</h3>
            <p className="mt-5 leading-relaxed text-slate-600">{copy.adminBody}</p>
            {media.odysseaAdmin && (
              <button type="button" onClick={() => open(media.odysseaAdmin as string)} className="mt-7 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                {copy.explore} <span aria-hidden="true" className="ml-3">↗</span>
              </button>
            )}
          </div>
          {media.odysseaAdmin ? (
            <button type="button" onClick={() => open(media.odysseaAdmin as string)} className="block w-full focus-visible:rounded-[26px]" aria-label={copy.explore}>
              <WorkMedia src={media.odysseaAdmin} alt={copy.adminAlt} label="Odyssea Vision / Admin" tone="admin" className="aspect-[16/10] w-full" />
            </button>
          ) : (
            <WorkMedia src={null} alt={copy.adminAlt} label="Odyssea Vision / Admin" tone="admin" className="aspect-[16/10] w-full" />
          )}
        </div>
        <div className="mt-8 grid gap-3 border-t border-slate-900/10 pt-8 md:grid-cols-3">
          {copy.principles.map((principle, index) => (
            <div key={principle.title} className="rounded-2xl bg-white/65 p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">0{index + 1}</p>
              <h4 className="mt-3 font-semibold text-slate-950">{principle.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{principle.body}</p>
            </div>
          ))}
        </div>
      </article>

      <details className="group mt-12 rounded-[28px] border border-white/65 bg-white/45 p-5 backdrop-blur-md sm:p-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-slate-950 marker:hidden">
          {copy.more}
          <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{copy.moreIntro}</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {studies.map((study) => (
            <button key={study.name} type="button" onClick={() => open(study.src)} className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-left transition hover:bg-white" aria-label={copy.explore + " — " + study.name}>
              <div className="relative mx-auto aspect-[9/15] max-w-[210px] overflow-hidden rounded-xl bg-slate-100">
                <Image src={study.src} alt={study.name} fill sizes="210px" className="object-contain" />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{copy.concept}</p>
              <h4 className="mt-1 font-semibold text-slate-950">{study.name}</h4>
            </button>
          ))}
        </div>
      </details>
      <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.eyebrow} onClose={() => setActiveIndex(null)} labels={copy} />
    </section>
  );
}

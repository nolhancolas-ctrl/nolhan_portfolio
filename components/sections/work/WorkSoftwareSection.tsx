"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import SoftwareVisualAccent, { SoftwareSymbol } from "@/components/work/SoftwareVisualAccent";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkSoftwareSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "03 / Systems & interfaces",
      title: "A site they can run themselves.",
      intro: "A publishing workspace that gives the Odyssea team control of its own stories.",
      dashboard: "One view of what needs attention",
      dashboardNote: "Recent stories, albums and activity stay visible.",
      details: [
        { label: "01 / Publishing", title: "Stories in the team's hands", body: "Create and update content in one place.", crop: "top" },
        { label: "02 / Content", title: "Media stays organised", body: "Portfolio, videos and client albums share a clear structure.", crop: "bottom" },
      ],
      outcomes: "The outcome",
      benefits: [
        { title: "More autonomy", body: "The team can add, edit and publish day-to-day content without waiting for a developer.", icon: "autonomy" as const },
        { title: "Less intervention", body: "The goal is a site they can keep current themselves. I step in for exceptional changes, not routine updates.", icon: "handoff" as const },
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
      title: "Un site qu’ils font vivre eux-mêmes.",
      intro: "Un espace de publication qui laisse l’équipe Odyssea piloter ses propres récits.",
      dashboard: "Une vue claire sur ce qui compte",
      dashboardNote: "Récits récents, albums et activité restent visibles.",
      details: [
        { label: "01 / Publication", title: "Les récits dans leurs mains", body: "Créer et mettre à jour au même endroit.", crop: "top" },
        { label: "02 / Contenu", title: "Des médias organisés", body: "Portfolio, vidéos et albums clients suivent une structure claire.", crop: "bottom" },
      ],
      outcomes: "Le résultat",
      benefits: [
        { title: "Plus d’autonomie", body: "L’équipe peut ajouter, modifier et publier ses contenus courants sans attendre un développeur.", icon: "autonomy" as const },
        { title: "Moins d’interventions", body: "Le but est qu’elle garde le site à jour elle-même. Je reviens pour les changements exceptionnels, pas pour les publications ordinaires.", icon: "handoff" as const },
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
    ...(media.odysseaAdmin ? [{ src: media.odysseaAdmin, alt: "Odyssea Vision admin dashboard", title: "Odyssea Vision" }] : []),
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

      <WorkReveal className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
          <h2 id="systems-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{copy.intro}</p>
        </div>
        <SoftwareVisualAccent className="hidden sm:block" />
      </WorkReveal>

      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <WorkReveal drift={15} className="flex flex-col">
          {media.odysseaAdmin ? (
            <button type="button" onClick={() => openImage(media.odysseaAdmin as string)} className="block w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open}>
              <WorkMedia src={media.odysseaAdmin} alt="Odyssea Vision editorial dashboard" label="Odyssea Vision / Admin" tone="admin" width={897} height={626} />
            </button>
          ) : (
            <WorkMedia src={null} alt="Odyssea Vision editorial dashboard" label="Odyssea Vision / Admin" tone="admin" width={897} height={626} />
          )}
          <div className="mt-4 flex items-start gap-3 px-1">
            <SoftwareSymbol name="publish" className="h-9 w-9 shrink-0 rounded-xl" />
            <div>
              <h3 className="font-semibold text-slate-950">{copy.dashboard}</h3>
              <p className="mt-0.5 text-sm text-slate-600">{copy.dashboardNote}</p>
            </div>
          </div>
        </WorkReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {copy.details.map((detail, index) => (
            <WorkReveal key={detail.label} drift={index === 0 ? -12 : 12} delay={index === 0 ? 0.05 : 0.12}>
              <article className="h-full overflow-hidden rounded-[24px] border border-white/75 bg-white/55 p-3 backdrop-blur-md">
                <div className="relative h-36 overflow-hidden rounded-[16px] bg-[#ebe8df] sm:h-40 lg:h-32">
                  {media.odysseaAdmin ? (
                    <Image
                      src={media.odysseaAdmin}
                      alt={detail.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 44vw, 90vw"
                      className={`object-cover ${detail.crop === "top" ? "object-[50%_8%]" : "object-[50%_88%]"}`}
                    />
                  ) : <div className="h-full w-full bg-gradient-to-br from-[#e4e2ec] to-[#f4f0e9]" />}
                </div>
                <div className="px-2 pb-2 pt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{detail.label}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">{detail.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{detail.body}</p>
                </div>
              </article>
            </WorkReveal>
          ))}
        </div>
      </div>

      <WorkReveal className="mt-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{copy.outcomes}</p>
        <div className="grid gap-5 md:grid-cols-2">
          {copy.benefits.map((benefit) => (
            <article key={benefit.title} className="flex gap-4 rounded-[25px] border border-white/75 bg-white/50 p-6 backdrop-blur-md sm:p-7">
              <SoftwareSymbol name={benefit.icon} className="shrink-0" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">{benefit.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{benefit.body}</p>
              </div>
            </article>
          ))}
        </div>
      </WorkReveal>

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

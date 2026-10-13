"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  detail: string;
  hero: string | null;
  detailImage: string | null;
  tone: WorkMediaTone;
  liveUrl?: string;
};

export default function WorkFeaturedSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const copy = {
    en: {
      eyebrow: "Web experiences",
      title: "Different worlds. Same attention to detail.",
      intro: "A closer look at the thinking and craft behind selected websites.",
      viewImage: "View image",
      live: "Visit live site",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      projects: [
        {
          number: "01 / 03",
          title: "Odyssea Vision",
          category: "Live project · Website · Content system",
          description: "A wildlife storytelling platform built to give the team control of its own content.",
          detail: "Public storytelling and a practical editorial system belong to the same experience.",
        },
        {
          number: "02 / 03",
          title: "Atelier Chrome & Craft",
          category: "Concept · Art direction · Website",
          description: "A cinematic digital direction for a workshop devoted to classic motorcycles.",
          detail: "The motorcycle, the craft and the atmosphere lead the visual language.",
        },
        {
          number: "03 / 03",
          title: "Aube Coffee",
          category: "Concept · Brand identity · Landing page",
          description: "A warm, considered identity for a specialty coffee brand.",
          detail: "A simple story of origin and ritual carried through the page.",
        },
      ],
    },
    fr: {
      eyebrow: "Expériences web",
      title: "Des univers différents. Le même soin du détail.",
      intro: "Un regard plus proche sur la réflexion et la réalisation de quelques sites.",
      viewImage: "Voir l’image",
      live: "Voir le site",
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      projects: [
        {
          number: "01 / 03",
          title: "Odyssea Vision",
          category: "Projet réel · Site web · Gestion de contenu",
          description: "Une plateforme de récits animaliers qui rend l’équipe autonome sur ses contenus.",
          detail: "Le récit public et l’outil éditorial font partie d’une même expérience.",
        },
        {
          number: "02 / 03",
          title: "Atelier Chrome & Craft",
          category: "Concept · Direction artistique · Site web",
          description: "Une direction digitale cinématographique pour un atelier de motos classiques.",
          detail: "La moto, le savoir-faire et l’atmosphère guident le langage visuel.",
        },
        {
          number: "03 / 03",
          title: "Aube Coffee",
          category: "Concept · Identité · Landing page",
          description: "Une identité chaleureuse et réfléchie pour un café de spécialité.",
          detail: "Une histoire simple, des origines au rituel, portée par toute la page.",
        },
      ],
    },
  }[lang];

  const projects: Project[] = [
    { ...copy.projects[0], hero: media.odysseaHome, detailImage: media.odysseaStories, tone: "ocean", liveUrl: "https://www.odysseavision.com/" },
    { ...copy.projects[1], hero: media.atelierHome, detailImage: media.atelierDetail, tone: "workshop" },
    { ...copy.projects[2], hero: media.aubeHome, detailImage: media.aubeDetail, tone: "coffee" },
  ];

  const slides = projects.flatMap((project) =>
    [project.hero, project.detailImage]
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ src, alt: project.title, title: project.title }))
  );

  const openImage = (src: string | null) => {
    if (!src) return;
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  const mediaFrame = (project: Project, priority = false) => (
    <WorkMedia
      src={project.hero}
      alt={project.title + " website preview"}
      label={project.title}
      tone={project.tone}
      className="aspect-[16/10] w-full"
      priority={priority}
    />
  );

  return (
    <section id="websites" aria-labelledby="websites-title" className="scroll-mt-28 px-5 sm:px-8">
      <div className="mx-auto max-w-3xl pb-10 text-center sm:pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="websites-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
          {copy.title}
        </h2>
        <p className="mt-5 text-slate-600">{copy.intro}</p>
      </div>

      {projects.map((project, index) => (
        <article key={project.title} className="border-t border-slate-900/10 py-14 sm:py-20">
          {index === 0 ? (
            <div className="grid items-center gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{project.number}</p>
                <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">{project.category}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{project.title}</h3>
                <p className="mt-5 leading-relaxed text-slate-600">{project.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                      {copy.live} <span aria-hidden="true" className="ml-3">↗</span>
                    </a>
                  )}
                  {project.hero && (
                    <button type="button" onClick={() => openImage(project.hero)} className="rounded-full border border-white/80 bg-white/60 px-5 py-3 text-sm font-medium text-slate-900 backdrop-blur-md transition hover:bg-white">
                      {copy.viewImage}
                    </button>
                  )}
                </div>
              </div>
              {project.hero ? (
                <button type="button" onClick={() => openImage(project.hero)} className="block w-full text-left focus-visible:rounded-[26px]" aria-label={copy.viewImage + " — " + project.title}>
                  {mediaFrame(project, true)}
                </button>
              ) : mediaFrame(project, true)}
            </div>
          ) : (
            <>
              <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{project.number} · {project.category}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{project.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{project.description}</p>
                </div>
                {project.hero && (
                  <button type="button" onClick={() => openImage(project.hero)} className="self-start rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 sm:self-auto">
                    {copy.viewImage} <span aria-hidden="true" className="ml-3">↗</span>
                  </button>
                )}
              </div>
              {project.hero ? (
                <button type="button" onClick={() => openImage(project.hero)} className="block w-full text-left focus-visible:rounded-[26px]" aria-label={copy.viewImage + " — " + project.title}>
                  {mediaFrame(project)}
                </button>
              ) : mediaFrame(project)}
            </>
          )}

          {project.detailImage ? (
            <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)] md:items-center">
              <button type="button" onClick={() => openImage(project.detailImage)} className="block w-full text-left focus-visible:rounded-[26px]" aria-label={copy.viewImage + " — " + project.title}>
                <WorkMedia src={project.detailImage} alt={project.title + " detail"} label={project.title} tone={project.tone} className="aspect-[16/10] w-full" />
              </button>
              <p className="max-w-md text-lg leading-relaxed text-slate-700 md:px-8">{project.detail}</p>
            </div>
          ) : (
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">{project.detail}</p>
          )}
        </article>
      ))}

      {slides.length > 0 && (
        <WorkLightbox
          slides={slides}
          index={activeIndex ?? 0}
          open={activeIndex !== null}
          sectionLabel={copy.eyebrow}
          onClose={() => setActiveIndex(null)}
          labels={copy}
        />
      )}
    </section>
  );
}

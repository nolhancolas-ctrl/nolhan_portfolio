"use client";

import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia, { type WorkMediaTone } from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

type Project = {
  title: string;
  category: string;
  summary: string;
  notes: Array<{ title: string; body: string }>;
  hero: string | null;
  detail: string | null;
  heroWidth: number;
  heroHeight: number;
  detailWidth: number;
  detailHeight: number;
  tone: WorkMediaTone;
  liveUrl?: string;
};

export default function WorkFeaturedSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const copy = {
    en: {
      eyebrow: "01 / Web experiences",
      heading: "Built around the story.",
      subheading: "Three directions, each with its own visual rhythm.",
      live: "Visit website",
      open: "Enlarge image",
      decisions: "Design focus",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      projects: [
        {
          title: "Odyssea Vision",
          category: "Live project · Editorial website",
          summary: "An image-led home for wildlife photography, film and field stories, paired with tools that let the team keep publishing.",
          notes: [
            { title: "Lead with the image", body: "Photography establishes the setting before the interface asks for attention." },
            { title: "Make room for stories", body: "Editorial pages give different subjects a shared, readable structure." },
            { title: "Connect both sides", body: "The public site and admin experience follow the same content logic." },
          ],
        },
        {
          title: "Atelier Chrome & Craft",
          category: "Concept · Motorcycle workshop",
          summary: "A cinematic website direction that puts the machines and the people restoring them at the centre.",
          notes: [
            { title: "Give the motorcycle presence", body: "A wide workshop view frames the hero without crowding the message." },
            { title: "Show the craft", body: "Builds, before-and-after views and process details make the work tangible." },
            { title: "Keep the tone coherent", body: "Dark surfaces, warm metal and restrained typography carry the atmosphere." },
          ],
        },
        {
          title: "Aube Coffee",
          category: "Concept · Specialty coffee",
          summary: "A quieter commerce experience where the product, its origins and the daily ritual share the stage.",
          notes: [
            { title: "Start with the product", body: "The hero gives the coffee and its packaging a clear role." },
            { title: "Explain the origin", body: "Sourcing is part of the story, close to the products it gives meaning to." },
            { title: "Make choosing simple", body: "Selections and tasting notes help visitors compare without visual noise." },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "01 / Expériences web",
      heading: "Un design au service du récit.",
      subheading: "Trois directions, chacune avec son propre rythme visuel.",
      live: "Voir le site",
      open: "Agrandir l’image",
      decisions: "Parti pris",
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      projects: [
        {
          title: "Odyssea Vision",
          category: "Projet réel · Site éditorial",
          summary: "Un lieu guidé par l’image pour la photographie animalière, les films et les récits de terrain, accompagné d’outils de publication pour l’équipe.",
          notes: [
            { title: "L’image d’abord", body: "La photographie installe l’univers avant que l’interface ne demande l’attention." },
            { title: "Une place pour les récits", body: "Les pages éditoriales donnent une structure commune à des sujets variés." },
            { title: "Relier les deux côtés", body: "Le site public et l’administration suivent la même logique de contenu." },
          ],
        },
        {
          title: "Atelier Chrome & Craft",
          category: "Concept · Atelier moto",
          summary: "Une direction de site cinématographique qui place les machines et les personnes qui les restaurent au centre.",
          notes: [
            { title: "Donner sa place à la moto", body: "Une vue large de l’atelier cadre le hero sans étouffer le message." },
            { title: "Montrer le geste", body: "Réalisations, avant/après et détails du processus rendent le travail concret." },
            { title: "Tenir la même tonalité", body: "Surfaces sombres, métal chaud et typographie sobre portent l’atmosphère." },
          ],
        },
        {
          title: "Aube Coffee",
          category: "Concept · Café de spécialité",
          summary: "Une expérience marchande plus calme, où le produit, son origine et le rituel quotidien ont chacun leur place.",
          notes: [
            { title: "Partir du produit", body: "Le hero donne un rôle clair au café et à son packaging." },
            { title: "Raconter l’origine", body: "La provenance fait partie de l’histoire, au plus près des produits." },
            { title: "Faciliter le choix", body: "Sélections et notes de dégustation aident à comparer sans bruit visuel." },
          ],
        },
      ],
    },
  }[lang];

  const projects: Project[] = [
    {
      ...copy.projects[0],
      hero: media.odysseaHome,
      detail: media.odysseaStories,
      heroWidth: 1917,
      heroHeight: 862,
      detailWidth: 1286,
      detailHeight: 856,
      tone: "ocean",
      liveUrl: "https://www.odysseavision.com/",
    },
    {
      ...copy.projects[1],
      hero: media.atelierHome,
      detail: media.atelierDetail,
      heroWidth: 1143,
      heroHeight: 670,
      detailWidth: 1140,
      detailHeight: 743,
      tone: "workshop",
    },
    {
      ...copy.projects[2],
      hero: media.aubeHome,
      detail: media.aubeDetail,
      heroWidth: 1165,
      heroHeight: 691,
      detailWidth: 1162,
      detailHeight: 870,
      tone: "coffee",
    },
  ];

  const slides = projects.flatMap((project) =>
    [project.hero, project.detail]
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ src, alt: project.title, title: project.title })),
  );

  const openImage = (src: string | null) => {
    if (!src) return;
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="websites" aria-labelledby="websites-title" className="scroll-mt-28 px-5 sm:px-8">
      <WorkReveal className="mb-9 flex flex-col justify-between gap-2 border-b border-slate-900/10 pb-5 sm:flex-row sm:items-end">
        <p id="websites-title" className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <p className="text-sm text-slate-600">{copy.subheading}</p>
      </WorkReveal>

      {projects.map((project, index) => (
        <div key={project.title}>
          <article aria-labelledby={`project-title-${index}`} className="py-4">
            <WorkReveal className="mb-8 grid gap-5 md:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] md:items-end" drift={-8}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{String(index + 1).padStart(2, "0")} / 03 · {project.category}</p>
                <h3 id={`project-title-${index}`} className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{project.title}</h3>
              </div>
              <div className="md:pl-8">
                <p className="max-w-lg text-base leading-relaxed text-slate-700">{project.summary}</p>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-white/80 bg-white/75 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white">
                    {copy.live}
                  </a>
                )}
              </div>
            </WorkReveal>

            <WorkReveal drift={14}>
              {project.hero ? (
                <button type="button" onClick={() => openImage(project.hero)} className="block w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — " + project.title}>
                  <WorkMedia src={project.hero} alt={project.title + " website"} label={project.title} tone={project.tone} width={project.heroWidth} height={project.heroHeight} priority={index === 0} />
                </button>
              ) : (
                <WorkMedia src={null} alt={project.title + " website"} label={project.title} tone={project.tone} width={project.heroWidth} height={project.heroHeight} />
              )}
            </WorkReveal>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-stretch">
              <WorkReveal drift={index === 1 ? -16 : 16} className={index === 1 ? "lg:order-2" : ""}>
                {project.detail ? (
                  <button type="button" onClick={() => openImage(project.detail)} className="block w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — " + project.title}>
                    <WorkMedia src={project.detail} alt={project.title + " website detail"} label={project.title} tone={project.tone} width={project.detailWidth} height={project.detailHeight} />
                  </button>
                ) : (
                  <WorkMedia src={null} alt={project.title + " website detail"} label={project.title} tone={project.tone} width={project.detailWidth} height={project.detailHeight} />
                )}
              </WorkReveal>

              <WorkReveal drift={index === 1 ? 16 : -16} delay={0.06} className={index === 1 ? "lg:order-1" : ""}>
                <div className="flex h-full flex-col justify-center rounded-[26px] border border-white/75 bg-white/50 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.decisions}</p>
                  <div className="mt-3">
                    {project.notes.map((note, noteIndex) => (
                      <div key={note.title} className="grid grid-cols-[32px_1fr] gap-3 border-t border-slate-900/10 py-4">
                        <span className="pt-0.5 text-xs font-semibold text-slate-500">0{noteIndex + 1}</span>
                        <div>
                          <h4 className="font-semibold text-slate-950">{note.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{note.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </WorkReveal>
            </div>
          </article>

          {index < projects.length - 1 && (
            <div aria-hidden="true" className="relative my-14 h-12 sm:my-20">
              <div className="absolute left-1/2 top-1/2 h-10 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8b6f3]/45 blur-2xl" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-900/15 to-transparent" />
            </div>
          )}
        </div>
      ))}

      {slides.length > 0 && (
        <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.heading} onClose={() => setActiveIndex(null)} labels={copy} />
      )}
    </section>
  );
}

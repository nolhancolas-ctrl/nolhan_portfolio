"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import WorkLightbox from "@/components/work/WorkLightbox";
import WorkMedia from "@/components/work/WorkMedia";
import WorkReveal from "@/components/work/WorkReveal";
import WorkExternalLink from "@/components/work/WorkExternalLink";
import { SoftwareSymbol } from "@/components/work/SoftwareVisualAccent";
import ServiceSculpture from "@/components/layout/visual/ServiceSculpture";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function WorkSoftwareSection({ media }: Props) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = {
    en: {
      eyebrow: "Systems & interfaces",
      title: "A site they can run themselves.",
      details: [
        { title: "Stories management", image: "stories" as const },
        { title: "Portfolio management", image: "portfolio" as const },
      ],
      outcomes: "The outcome",
      benefits: [
        { title: "More autonomy", body: "The team can add, edit and publish day-to-day content without waiting for a developer.", icon: "autonomy" as const },
        { title: "Less intervention", body: "The goal is a site they can keep current themselves. I step in for exceptional changes, not routine updates.", icon: "handoff" as const },
      ],
      more: "Explore more interface studies",
      open: "Enlarge interface",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      eyebrow: "Systèmes & interfaces",
      title: "Un site qu’ils font vivre eux-mêmes.",
      details: [
        { title: "Gestion des récits", image: "stories" as const },
        { title: "Gestion du portfolio", image: "portfolio" as const },
      ],
      outcomes: "Le résultat",
      benefits: [
        { title: "Plus d’autonomie", body: "L’équipe peut ajouter, modifier et publier ses contenus courants sans attendre un développeur.", icon: "autonomy" as const },
        { title: "Moins d’interventions", body: "Le but est qu’elle garde le site à jour elle-même. Je reviens pour les changements exceptionnels, pas pour les publications ordinaires.", icon: "handoff" as const },
      ],
      more: "Voir d’autres études d’interfaces",
      open: "Agrandir l’interface",
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
    },
  }[lang];

  const slides = [
    ...(media.odysseaAdmin ? [{ src: media.odysseaAdmin, alt: "Odyssea Vision admin dashboard", title: "Odyssea Vision / Dashboard" }] : []),
    ...(media.odysseaAdminStories ? [{ src: media.odysseaAdminStories, alt: "Odyssea Vision stories management", title: "Odyssea Vision / Stories" }] : []),
    ...(media.odysseaAdminPortfolio ? [{ src: media.odysseaAdminPortfolio, alt: "Odyssea Vision portfolio management", title: "Odyssea Vision / Portfolio" }] : []),
  ];
  const openImage = (src: string) => {
    const index = slides.findIndex((slide) => slide.src === src);
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="systems" aria-labelledby="systems-title" className="scroll-mt-28 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      <WorkReveal className="relative mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="systems-title" className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        <div className="work-planet pointer-events-none absolute -top-10 right-0 hidden h-40 w-40 lg:block">
          <ServiceSculpture index={2} />
        </div>
      </WorkReveal>

      <WorkReveal drift={15}>
        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <div className="h-full">
          {media.odysseaAdmin ? (
            <button type="button" onClick={() => openImage(media.odysseaAdmin as string)} className="block h-full w-full cursor-zoom-in text-left focus-visible:rounded-[26px]" aria-label={copy.open + " — Dashboard"}>
              <WorkMedia src={media.odysseaAdmin} alt="Odyssea Vision admin dashboard" label="Odyssea Vision / Dashboard" tone="admin" width={1917} height={866} fit="stretch" />
            </button>
          ) : (
            <WorkMedia src={null} alt="Odyssea Vision admin dashboard" label="Odyssea Vision / Dashboard" tone="admin" width={1917} height={866} fit="stretch" />
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {copy.details.map((detail) => {
            const detailSrc = detail.image === "stories" ? media.odysseaAdminStories : media.odysseaAdminPortfolio;
            return (
              <div key={detail.image} className="h-full">
                <div className="h-full overflow-hidden rounded-[24px] border border-white/75 bg-white/55 p-2 backdrop-blur-md">
                  {detailSrc ? (
                    <button type="button" onClick={() => openImage(detailSrc)} className="relative block aspect-[1917/866] w-full cursor-zoom-in overflow-hidden rounded-[16px] bg-[#f5f0e6] lg:aspect-auto lg:h-full" aria-label={copy.open + " — " + detail.title}>
                      <Image src={detailSrc} alt={detail.title} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 44vw, 90vw" className="work-detail-image object-contain" />
                    </button>
                  ) : <div className="aspect-[1917/866] rounded-[16px] bg-gradient-to-br from-[#e4e2ec] to-[#f4f0e9] lg:aspect-auto lg:h-full" />}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </WorkReveal>

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

      <WorkReveal className="mt-10 text-center">
        <WorkExternalLink href="https://www.figma.com/design/01YyxmIktchrjQPweMKuaJ/Nolhan-Colas-%E2%80%94-Design-Practice---Selected-Work?node-id=3-2&t=3PzA25MwnP2bpY8n-1">
          {copy.more}
        </WorkExternalLink>
      </WorkReveal>

      <WorkLightbox slides={slides} index={activeIndex ?? 0} open={activeIndex !== null} sectionLabel={copy.eyebrow} onClose={() => setActiveIndex(null)} labels={copy} />
    </section>
  );
}

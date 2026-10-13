"use client";

import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import WorkMedia from "@/components/work/WorkMedia";
import type { SelectedWorkMedia } from "@/types/selectedWork";

type Props = { media: SelectedWorkMedia };

export default function HomeWorkPreviewSection({ media }: Props) {
  const { lang } = useLang();
  const copy = {
    en: {
      eyebrow: "Selected work",
      title: "A few worlds worth exploring.",
      intro: "From editorial websites to distinctive marks and useful interfaces. See the work with room to notice the details.",
      featured: "Featured project / website",
      odyssea: "A place for wild stories to live.",
      odysseaBody: "Odyssea Vision brings wildlife photography, film and field stories into one editorial experience.",
      viewCase: "Explore the work",
      identity: "Identity",
      identityTitle: "Symbols with a story.",
      identityBody: "Four brands, four different visual worlds.",
      system: "Digital systems",
      systemTitle: "Beautiful on the surface. Useful behind it.",
      systemBody: "The Odyssea editorial interface connects the experience to the team’s daily work.",
      all: "View all selected work",
    },
    fr: {
      eyebrow: "Projets sélectionnés",
      title: "Quelques univers à explorer.",
      intro: "Sites éditoriaux, signes distinctifs et interfaces utiles. Des projets présentés avec assez d’espace pour en voir les détails.",
      featured: "Projet à la une / site web",
      odyssea: "Un lieu pour raconter le vivant.",
      odysseaBody: "Odyssea Vision rassemble photographie animalière, films et récits de terrain dans une expérience éditoriale.",
      viewCase: "Explorer le projet",
      identity: "Identité",
      identityTitle: "Des symboles qui racontent.",
      identityBody: "Quatre marques, quatre univers visuels différents.",
      system: "Systèmes digitaux",
      systemTitle: "Beau en surface. Utile en coulisses.",
      systemBody: "L’interface éditoriale d’Odyssea relie l’expérience au travail quotidien de l’équipe.",
      all: "Voir tous les projets",
    },
  }[lang];

  return (
    <section aria-labelledby="home-work-preview-title" className="py-10 sm:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="home-work-preview-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        <p className="mt-5 text-slate-600">{copy.intro}</p>
      </div>

      <Link href="/work#websites" className="group block rounded-[34px] border border-white/65 bg-white/50 p-4 shadow-[0_26px_70px_rgba(45,36,91,0.1)] backdrop-blur-md transition hover:bg-white/65 sm:p-6">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(220px,0.36fr)_minmax(0,0.64fr)] lg:gap-9">
          <div className="px-2 py-3 sm:px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{copy.featured}</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{copy.odyssea}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{copy.odysseaBody}</p>
            <span className="mt-7 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition group-hover:bg-slate-800">
              {copy.viewCase} <span aria-hidden="true" className="ml-3">↗</span>
            </span>
          </div>
          <WorkMedia src={media.odysseaHome} alt="Odyssea Vision website" label="Odyssea Vision" tone="ocean" className="aspect-[16/10] w-full" />
        </div>
      </Link>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Link href="/work#identities" className="group rounded-[30px] border border-white/65 bg-white/45 p-5 backdrop-blur-md transition hover:bg-white/65 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-600">{copy.identity}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <WorkMedia src={media.terraLogo} alt="Terra Sculptura logo" label="Terra Sculptura" tone="forest" className="aspect-square w-full" />
            <WorkMedia src={media.odysseaLogo} alt="Odyssea Vision logo" label="Odyssea Vision" tone="ocean" className="aspect-square w-full" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-950">{copy.identityTitle}</h3>
          <p className="mt-2 text-sm text-slate-600">{copy.identityBody}</p>
        </Link>
        <Link href="/work#systems" className="group rounded-[30px] border border-white/65 bg-white/45 p-5 backdrop-blur-md transition hover:bg-white/65 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-600">{copy.system}</p>
          <WorkMedia src={media.odysseaAdmin} alt="Odyssea Vision admin interface" label="Odyssea Vision / Admin" tone="admin" className="mt-5 aspect-[2/1] w-full" />
          <h3 className="mt-5 text-xl font-semibold text-slate-950">{copy.systemTitle}</h3>
          <p className="mt-2 text-sm text-slate-600">{copy.systemBody}</p>
        </Link>
      </div>

      <div className="mt-10 text-center">
        <Link href="/work" className="inline-flex items-center rounded-full border border-white/75 bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(45,36,91,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(45,36,91,0.18)]">
          {copy.all} <span aria-hidden="true" className="ml-3">↗</span>
        </Link>
      </div>
    </section>
  );
}

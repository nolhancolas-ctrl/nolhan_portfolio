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
      intro: "From editorial websites to distinctive marks and useful interfaces. A closer look at the details behind each.",
      featured: "01 / Featured website",
      odyssea: "A place for wild stories to live.",
      odysseaBody: "Odyssea Vision brings wildlife photography, film and field stories into one editorial experience.",
      viewCase: "Explore Odyssea",
      identity: "02 / Identity",
      identityTitle: "Symbols with a story.",
      identityBody: "Four brands, four different visual worlds.",
      system: "03 / Digital systems",
      systemTitle: "Useful behind the scenes.",
      systemBody: "The Odyssea editorial interface connects the public experience to the team's daily work.",
      all: "Explore all selected work",
    },
    fr: {
      eyebrow: "Projets sélectionnés",
      title: "Quelques univers à explorer.",
      intro: "Sites éditoriaux, signes distinctifs et interfaces utiles. Un regard plus proche sur les détails de chacun.",
      featured: "01 / Site à la une",
      odyssea: "Un lieu pour raconter le vivant.",
      odysseaBody: "Odyssea Vision rassemble photographie animalière, films et récits de terrain dans une expérience éditoriale.",
      viewCase: "Explorer Odyssea",
      identity: "02 / Identité",
      identityTitle: "Des symboles qui racontent.",
      identityBody: "Quatre marques, quatre univers visuels différents.",
      system: "03 / Systèmes digitaux",
      systemTitle: "Utile en coulisses.",
      systemBody: "L’interface éditoriale d’Odyssea relie l’expérience publique au travail quotidien de l’équipe.",
      all: "Explorer tous les projets",
    },
  }[lang];

  return (
    <section aria-labelledby="home-work-preview-title" className="py-10 sm:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.23em] text-slate-600">{copy.eyebrow}</p>
        <h2 id="home-work-preview-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{copy.title}</h2>
        <p className="mt-5 text-slate-600">{copy.intro}</p>
      </div>

      <Link href="/work#websites" className="group block rounded-[32px] border border-white/70 bg-white/50 p-5 shadow-[0_22px_60px_rgba(45,36,91,0.09)] backdrop-blur-md transition hover:bg-white/65 sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{copy.featured}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{copy.odyssea}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{copy.odysseaBody}</p>
          </div>
          <span className="inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-slate-800">{copy.viewCase}</span>
        </div>
        <WorkMedia src={media.odysseaHome} alt="Odyssea Vision website" label="Odyssea Vision" tone="ocean" width={1917} height={862} />
      </Link>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Link href="/work#identities" className="group rounded-[30px] border border-white/70 bg-white/50 p-5 backdrop-blur-md transition hover:bg-white/65 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-600">{copy.identity}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <WorkMedia src={media.terraLogo} alt="Terra Sculptura logo" label="Terra Sculptura" tone="forest" width={1280} height={1280} />
            <WorkMedia src={media.odysseaLogo} alt="Odyssea Vision logo" label="Odyssea Vision" tone="ocean" width={1280} height={1280} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-950">{copy.identityTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.identityBody}</p>
        </Link>
        <Link href="/work#systems" className="group rounded-[30px] border border-white/70 bg-white/50 p-5 backdrop-blur-md transition hover:bg-white/65 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-600">{copy.system}</p>
          <WorkMedia src={media.odysseaAdmin} alt="Odyssea Vision admin interface" label="Odyssea Vision / Admin" tone="admin" width={1917} height={866} className="mt-5" />
          <h3 className="mt-5 text-xl font-semibold text-slate-950">{copy.systemTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.systemBody}</p>
        </Link>
      </div>

      <div className="mt-10 text-center">
        <Link href="/work" className="inline-flex rounded-full border border-white/80 bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(45,36,91,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(45,36,91,0.15)]">
          {copy.all}
        </Link>
      </div>
    </section>
  );
}

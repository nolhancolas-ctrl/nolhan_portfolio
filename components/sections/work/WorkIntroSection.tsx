"use client";

import { useLang } from "@/hooks/useLang";

export default function WorkIntroSection() {
  const { lang } = useLang();
  const copy = {
    en: {
      eyebrow: "Selected work",
      title: "Work made to be explored.",
      intro: "Real projects and thoughtful concepts across identity, websites and useful systems.",
      websites: "Web experiences",
      identities: "Identities",
      systems: "Systems",
    },
    fr: {
      eyebrow: "Projets sélectionnés",
      title: "Des projets à explorer.",
      intro: "Des projets réels et des concepts travaillés, entre identité, sites web et outils utiles.",
      websites: "Expériences web",
      identities: "Identités",
      systems: "Systèmes",
    },
  }[lang];

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 pb-24 pt-12 text-center sm:px-8 sm:pt-20">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
        {copy.eyebrow}
      </p>
      <h1
        id="work-title"
        className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl"
      >
        {copy.title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {copy.intro}
      </p>
      <nav aria-label={copy.eyebrow} className="mt-10 flex flex-wrap justify-center gap-3">
        <a href="#websites" className="rounded-full border border-white/70 bg-white/55 px-5 py-2.5 text-sm text-slate-800 shadow-sm backdrop-blur-md transition hover:bg-white">
          {copy.websites}
        </a>
        <a href="#identities" className="rounded-full border border-white/70 bg-white/55 px-5 py-2.5 text-sm text-slate-800 shadow-sm backdrop-blur-md transition hover:bg-white">
          {copy.identities}
        </a>
        <a href="#systems" className="rounded-full border border-white/70 bg-white/55 px-5 py-2.5 text-sm text-slate-800 shadow-sm backdrop-blur-md transition hover:bg-white">
          {copy.systems}
        </a>
      </nav>
    </section>
  );
}

"use client";

import { useLang } from "@/hooks/useLang";
import WorkReveal from "@/components/work/WorkReveal";

export default function WorkIntroSection() {
  const { lang } = useLang();
  const copy = {
    en: {
      eyebrow: "Selected work",
      title: "Different projects. One point of view.",
      intro: "Identity, websites and practical systems — each shaped around its own story, audience and use.",
      links: [
        { href: "#websites", number: "01", label: "Web experiences" },
        { href: "#identities", number: "02", label: "Identities" },
        { href: "#systems", number: "03", label: "Systems" },
      ],
    },
    fr: {
      eyebrow: "Projets sélectionnés",
      title: "Des projets différents. Un même regard.",
      intro: "Identités, sites et outils utiles — chaque expérience pensée pour son histoire, son public et son usage.",
      links: [
        { href: "#websites", number: "01", label: "Expériences web" },
        { href: "#identities", number: "02", label: "Identités" },
        { href: "#systems", number: "03", label: "Systèmes" },
      ],
    },
  }[lang];

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 pb-16 pt-4 text-center sm:px-8 sm:pb-20 sm:pt-10">
      <WorkReveal>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{copy.eyebrow}</p>
        <h1 id="work-title" className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{copy.intro}</p>
      </WorkReveal>
      <WorkReveal delay={0.08}>
        <nav aria-label={copy.eyebrow} className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 border-y border-slate-900/10 py-4">
          {copy.links.map((link) => (
            <a key={link.href} href={link.href} className="group inline-flex items-baseline gap-2 text-sm text-slate-700 transition hover:text-slate-950">
              <span className="text-[10px] font-semibold tracking-widest text-slate-500">{link.number}</span>
              <span className="border-b border-transparent pb-0.5 transition group-hover:border-slate-950">{link.label}</span>
            </a>
          ))}
        </nav>
      </WorkReveal>
    </section>
  );
}

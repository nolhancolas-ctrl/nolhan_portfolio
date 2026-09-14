"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { SITE_NAME } from "@/lib/site";

export default function HeroSection() {

  const { lang } = useLang();
  const reduced = useReducedMotion();
  
  const t = {
    en: {
      pretitre: `${SITE_NAME} • Creative developer`,
      subtitle:
        "Modern interfaces, smooth micro-interactions and careful details for real products.",
      ctaProjects: "See my projects",
      ctaContact: "Contact me",
    },
    fr: {
      pretitre: `${SITE_NAME} • Développeur créatif`,
      subtitle:
        "Interfaces modernes, micro-interactions fluides et souci du détail au service de projets concrets.",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
    },
  }[lang];

  return (
    <section className="hero-content relative w-full flex items-center justify-center pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Pré-titre */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-slate-600 mb-3"
        >
          {t.pretitre}
        </motion.p>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 28, filter: reduced ? "none" : "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
        >
          {lang === "en" ? "I design and build" : "Je conçois et réalise"}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {lang === "en"
              ? "digital experiences."
              : "des expériences numériques."}
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-base sm:text-lg text-slate-700 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="/work"
            className="hero-cta px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition whitespace-nowrap"
          >
            {t.ctaProjects}
          </a>
          <a
            href="#contact"
            className="hero-cta px-6 py-3 rounded-full border border-slate-300 font-medium hover:bg-slate-100 transition whitespace-nowrap"
          >
            {t.ctaContact}
          </a>
        </motion.div>
      </div>
    </section>
  );
}


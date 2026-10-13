"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

export default function WorkIntroSection() {
  const { lang } = useLang();
  const reducedMotion = useReducedMotion();
  const copy = {
    en: {
      eyebrow: "Selected work • Product & brand",
      line1: "Visual systems for",
      line2: "digital products.",
      subtitle: "Logos, landing pages, product UI and motion pieces shaped for real brands and teams.",
      home: "Back to homepage",
      contact: "Book a call",
    },
    fr: {
      eyebrow: "Travaux sélectionnés • Produit & marque",
      line1: "Systèmes visuels pour",
      line2: "produits digitaux.",
      subtitle: "Logos, landing pages, interfaces produit et animations conçus pour des projets concrets.",
      home: "Retour à l’accueil",
      contact: "Réserver un appel",
    },
  }[lang];

  return (
    <section id="work" aria-labelledby="work-title" className="flex min-h-[min(720px,82svh)] items-center justify-center px-5 pb-20 pt-6 text-center sm:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-sm text-slate-600"
        >
          {copy.eyebrow}
        </motion.p>
        <motion.h1
          id="work-title"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 28, filter: reducedMotion ? "none" : "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          {copy.line1}<br />
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">{copy.line2}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg"
        >
          {copy.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="/#hero" className="hero-cta whitespace-nowrap rounded-full bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800">{copy.home}</a>
          <a href="#contact" className="hero-cta whitespace-nowrap rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-900 hover:bg-white/60">{copy.contact}</a>
        </motion.div>
      </div>
    </section>
  );
}

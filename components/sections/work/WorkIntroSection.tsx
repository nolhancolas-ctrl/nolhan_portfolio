"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

export default function WorkIntroSection() {
  const { lang } = useLang();

  const t = {
    en: {
      pretitre: "Selected work • Product & brand",
      line1: "Visual systems for",
      line2: "digital products.",
      subtitle:
        "Logos, landing pages, product UI and motion pieces shaped for real brands and teams.",
      ctaPrimary: "Back to homepage",
      ctaSecondary: "Book a call",
    },
    fr: {
      pretitre: "Travaux sélectionnés • Produit & marque",
      line1: "Systèmes visuels pour",
      line2: "produits digitaux.",
      subtitle:
        "Logos, landing pages, interfaces produit et animations conçus pour des projets concrets.",
      ctaPrimary: "Retour à l’accueil",
      ctaSecondary: "Réserver un appel",
    },
  }[lang];

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative w-full flex items-center justify-center pb-20"
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Pré-titre */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-slate-600 mb-3"
        >
          {t.pretitre}
        </motion.p>

        {/* Titre */}
        <motion.h1
          id="work-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
        >
          {t.line1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {t.line2}
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-base sm:text-lg text-slate-700 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        {/* CTA (optionnels, même style que le hero) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="/#hero"
            className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition whitespace-nowrap"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="/#contact"
            className="px-6 py-3 rounded-full border border-slate-300 font-medium hover:bg-slate-100 transition whitespace-nowrap"
          >
            {t.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
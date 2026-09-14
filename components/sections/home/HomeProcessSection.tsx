"use client";
import { reveal } from "@/lib/motion";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

const steps = [
  {
    id: 1,
    icon: "🧭",
    labelEn: "Step 01",
    labelFr: "Étape 01",
    titleEn: "Discover",
    titleFr: "Découvrir",
    bodyEn: "Goals • audience • context",
    bodyFr: "Objectifs • audience • contexte",
  },
  {
    id: 2,
    icon: "🎨",
    labelEn: "Step 02",
    labelFr: "Étape 02",
    titleEn: "Visual direction",
    titleFr: "Direction visuelle",
    bodyEn: "Moodboard • UI • motion",
    bodyFr: "Moodboard • UI • motion",
  },
  {
    id: 3,
    icon: "💻",
    labelEn: "Step 03",
    labelFr: "Étape 03",
    titleEn: "Build",
    titleFr: "Production",
    bodyEn: "Code • animations • quality",
    bodyFr: "Code • animations • qualité",
  },
  {
    id: 4,
    icon: "🚀",
    labelEn: "Step 04",
    labelFr: "Étape 04",
    titleEn: "Launch",
    titleFr: "Lancement",
    bodyEn: "Online • tweaks • support",
    bodyFr: "Mise en ligne • ajustements • support",
  },
];

export default function ProcessSection() {

  const { lang } = useLang();

  const ui = {
    en: {
      kicker: "Process",
      title: "4-step flow",
    },
    fr: {
      kicker: "Process",
      title: "En 4 étapes",
    },
  }[lang];

  return (
    <section aria-labelledby="process-title">
      {/* Header */}
      <motion.div
        {...reveal}
        className="space-y-4 text-center mb-10"
      >
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {ui.kicker}
        </p>
        <h2
          id="process-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {ui.title}
        </h2>
      </motion.div>

      {/* Cartes de process */}
      <ol
        className="
          max-w-5xl mx-auto
          grid gap-6
          grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
          list-none
        "
      >
        {steps.map((step, index) => {
          const label = lang === "en" ? step.labelEn : step.labelFr;
          const title = lang === "en" ? step.titleEn : step.titleFr;
          const body = lang === "en" ? step.bodyEn : step.bodyFr;

          return (
            <li key={step.id} className="relative">
              {/* Carte + animation de flottement */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <motion.div
                  className="
                    process-card h-full
                    rounded-3xl border border-slate-200/80 bg-white/80
                    backdrop-blur-md shadow-sm
                    px-4 py-5 md:px-5 md:py-6
                    flex flex-col gap-3
                  "
                  whileHover={{
                    y: -7,
                    rotate: index % 2 === 0 ? -1 : 1,
                    boxShadow: "0 20px 38px rgba(91,65,153,0.12)",
                    transition: { type: "spring", stiffness: 280, damping: 22 },
                  }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                      {step.id.toString().padStart(2, "0")}
                    </span>
                    <span>{label}</span>
                  </p>

                  <h3 className="text-base md:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <span aria-hidden className="text-lg">
                      {step.icon}
                    </span>
                    <span>{title}</span>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {body}
                  </p>
                </motion.div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
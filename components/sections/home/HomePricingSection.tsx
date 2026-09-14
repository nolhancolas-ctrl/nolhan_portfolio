"use client";
import { reveal } from "@/lib/motion";
import { motion } from "framer-motion";
import ServiceSculpture from "@/components/layout/visual/ServiceSculpture";
import { useLang } from "@/hooks/useLang";

const services = [
  {
    id: 1,
    titleEn: "Essential site refresh",
    titleFr: "Refonte rapide, simple, efficace",
    pointsEn: [
      "Clean one-page or small marketing site.",
      "Based on your existing content and structure.",
      "Responsive, fast and easy to maintain.",
    ],
    pointsFr: [
      "Site vitrine ou landing page claire et moderne.",
      "Appuyée sur votre contenu et structure existants.",
      "Responsive, rapide et simple à faire vivre.",
    ],
    fromEn: "Starting from €900",
    fromFr: "À partir de 900 €",
    timelineEn: "Kickoff within 3 days.",
    timelineFr: "Démarrage sous 3 jours.",
    icon: "⚡️",
  },
  {
    id: 2,
    titleEn: "Premium product experience",
    titleFr: "Expérience produit premium",
    pointsEn: [
      "Custom sections and advanced interactive modules.",
      "Smooth animations, graphs and rich content.",
      "Designed to support growth and conversions.",
    ],
    pointsFr: [
      "Sections sur-mesure et modules interactifs avancés.",
      "Animations, graphiques et contenu riche.",
      "Pensé pour soutenir la croissance et la conversion.",
    ],
    fromEn: "Starting from €1,800",
    fromFr: "À partir de 1 800 €",
    timelineEn: "Ideal for launches in 2–4 weeks.",
    timelineFr: "Idéal pour un lancement sous 2 à 4 semaines.",
    icon: "✨",
  },
  {
    id: 3,
    titleEn: "Brand & digital identity",
    titleFr: "Identité visuelle & croissance",
    pointsEn: [
      "New visual direction for your brand online.",
      "Signature hero, layout system and components.",
      "Ongoing support as a growth partner.",
    ],
    pointsFr: [
      "Nouvelle direction visuelle pour votre présence en ligne.",
      "Hero signature, système de layout et composants.",
      "Accompagnement dans la durée comme partenaire croissance.",
    ],
    fromEn: "Starting from €2,400",
    fromFr: "À partir de 2 400 €",
    timelineEn: "Multi-step collaboration over several weeks.",
    timelineFr: "Collaboration en plusieurs étapes sur plusieurs semaines.",
    icon: "🤝",
  },
];

/* ---------- Section Services + Pricing ---------- */
export default function ServicesSection() {
  const { lang } = useLang();

  const ui = {
    en: {
      kicker: "Services & pricing",
      title: "Three ways to work together",
      cta: "Book a call",
    },
    fr: {
      kicker: "Offres & tarifs",
      title: "3 façons de travailler ensemble",
      cta: "Réserver un appel",
    },
  }[lang];

  return (
    <section aria-labelledby="services-title" className="relative">

      {/* En-tête */}
      <motion.div
        {...reveal}
        className="space-y-4 text-center mb-10"
      >
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {ui.kicker}
        </p>
        <h2
          id="services-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {ui.title}
        </h2>
      </motion.div>

      {/* Cartes */}
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, index) => {
          const title = lang === "en" ? service.titleEn : service.titleFr;
          const points =
            lang === "en" ? service.pointsEn : service.pointsFr;
          const from =
            lang === "en" ? service.fromEn : service.fromFr;
          const timeline =
            lang === "en" ? service.timelineEn : service.timelineFr;

          return (
            <motion.article
              key={service.id}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 260, damping: 24 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.06,
              }}
              className="
                service-card group relative flex flex-col
                rounded-3xl border border-slate-200/75 bg-white/40
                shadow-sm
                px-5 py-6 md:px-6 md:py-7
                overflow-hidden
                transition-shadow duration-300 hover:shadow-xl
              "
            >
              {/* halo au hover */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-0
                  group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-amber-400/10
                "
              />

              <ServiceSculpture index={index} />

              {/* Titre centré */}
              <div className="relative space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 text-center">
                  {title}
                </h3>
              </div>

              {/* Trois points designés */}
              <div className="relative mt-5 space-y-3">
                {points.map((point, i) => (
                  <div
                    key={point}
                    className="
                      flex items-start gap-3
                      rounded-2xl bg-white/80 border border-slate-200/70
                      px-3 py-2
                    "
                  >
                    <div
                      className="
                        mt-0.5 flex h-6 w-6 items-center justify-center
                        rounded-full bg-slate-900 text-[11px] font-semibold text-white
                      "
                    >
                      {`0${i + 1}`}
                    </div>
                    <p className="text-sm text-slate-700 leading-snug">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA + pricing */}
              <div className="relative mt-6 space-y-2 flex flex-col items-center text-center">
                <a
                  href="#contact"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-full bg-slate-900 text-white text-sm font-medium
                    px-4 py-2
                    hover:bg-slate-800 transition
                  "
                >
                  <span>{ui.cta}</span>
                  <span aria-hidden>
                    {service.icon}
                  </span>
                </a>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <p className="font-medium">{from}</p>
                  <p className="text-[11px] text-slate-500">
                    {timeline}
                  </p>
                </div>
              </div>

              {/* numéro de service en bas à droite */}
              <div className="relative mt-6 flex justify-end">
                <p className="text-7xl md:text-7xl font-semibold text-slate-400/70 pb-1">
                  {`0${service.id}`}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
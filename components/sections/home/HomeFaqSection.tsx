"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

type Lang = "en" | "fr";

const FAQ_ITEMS = [
  {
    id: 1,
    questionEn: "What kind of projects do you take on?",
    questionFr: "Quels types de projets est-ce que tu prends ?",
    answerEn:
      "I focus on modern marketing sites, product pages and custom front-end experiences: premium landing pages, multi-section sites, dashboards and interactive modules.",
    answerFr:
      "Je travaille surtout sur des sites vitrines modernes, des pages produit et des expériences front-end sur-mesure : landing pages premium, sites multi-sections, dashboards et modules interactifs.",
  },
  {
    id: 2,
    questionEn: "How does a typical project start?",
    questionFr: "Comment démarre un projet typique ?",
    answerEn:
      "We start with a short call to clarify goals, audience, constraints and references. Then I propose a direction (structure + first visuals) before jumping into full production.",
    answerFr:
      "On commence par un court call pour clarifier objectifs, audience, contraintes et références. Ensuite je propose une direction (structure + premiers visuels) avant de passer en production complète.",
  },
  {
    id: 3,
    questionEn: "How long does a project usually take?",
    questionFr: "Combien de temps dure généralement un projet ?",
    answerEn:
      "For a focused landing page, expect around 2–3 weeks. For a richer multi-page or product experience, 4–6 weeks is more realistic, depending on scope and feedback speed.",
    answerFr:
      "Pour une landing page ciblée, compte 2 à 3 semaines. Pour une expérience plus riche avec plusieurs pages ou modules, 4 à 6 semaines est plus réaliste, selon le périmètre et la vitesse de retour.",
  },
  {
    id: 4,
    questionEn: "Do you also take care of development?",
    questionFr: "Est-ce que tu t’occupes aussi du développement ?",
    answerEn:
      "Yes. I design and build the front-end (React / Next.js, animations, responsive, performance). We can plug into your existing backend or collaborate with your dev team.",
    answerFr:
      "Oui. Je conçois et je développe le front-end (React / Next.js, animations, responsive, performance). On peut se brancher à ton backend existant ou travailler avec ton équipe technique.",
  },
  {
    id: 5,
    questionEn: "Do you offer ongoing support after launch?",
    questionFr: "Proposes-tu un suivi après la mise en ligne ?",
    answerEn:
      "I can stay on for small iterations, new sections and optimisations (UX or performance). We define together a light retainer or a block of hours depending on your needs.",
    answerFr:
      "Je peux rester pour les petites évolutions, nouvelles sections et optimisations (UX ou performance). On définit ensemble un forfait léger ou un pack d’heures selon tes besoins.",
  },
];

export default function FaqSection() {

  const { lang } = useLang();

  const ui = {
    en: {
      kicker: "FAQ",
      title: "Questions you might have",
    },
    fr: {
      kicker: "FAQ",
      title: "Questions fréquentes",
    },
  }[lang];

  const [openId, setOpenId] = useState<number | null>(FAQ_ITEMS[0]?.id ?? null);

  const handleToggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section aria-labelledby="faq-title" className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 text-center mb-10"
      >
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {ui.kicker}
        </p>
        <h2
          id="faq-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {ui.title}
        </h2>
      </motion.div>

      {/* Accordéon */}
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          const question = lang === "en" ? item.questionEn : item.questionFr;
          const answer = lang === "en" ? item.answerEn : item.answerFr;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
              className="
                rounded-2xl border border-slate-200/80 bg-white/70
                backdrop-blur-md shadow-sm
                overflow-hidden
              "
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="
                  w-full flex items-center justify-between gap-4
                  px-4 py-4 md:px-5 md:py-4
                  text-left
                  hover:bg-white/80 transition
                "
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-sm md:text-base font-medium text-slate-900">
                    {question}
                  </span>
                </div>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="
                    inline-flex h-6 w-6 items-center justify-center
                    rounded-full border border-slate-300 bg-white text-xs text-slate-700
                  "
                >
                  ▸
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
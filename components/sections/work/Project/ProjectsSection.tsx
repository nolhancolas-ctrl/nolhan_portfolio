"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

import ProjectsClient from "./ProjectGraph";
import ProjectAgenda from "./ProjectAgenda";
import ProjectMonth from "./ProjectMonth";
import ProjectNotifications from "./ProjectNotifications";

export default function ProjectsSection() {
  const { lang } = useLang();
  const t = {
    en: {
      kicker: "Modules",
      title: "Product-ready UI modules",
      description:
        "Graphs, calendars and notification layouts built like real product components.",
    },
    fr: {
      kicker: "Modules",
      title: "Modules UI prêts pour le produit",
      description:
        "Graphiques, calendriers et systèmes de notifications conçus comme de vrais composants.",
    },
  }[lang];

  // 📱 rail auto-défilant pour mobile
  const mobileRailRef = useRef<HTMLDivElement | null>(null);

  // 4 "slides" correspondant à tes modules
  const slides = [
    { key: "graph", render: () => <ProjectsClient images={[]} /> },
    { key: "month", render: () => <ProjectMonth /> },
    { key: "notif", render: () => <ProjectNotifications /> },
    { key: "agenda", render: () => <ProjectAgenda /> },
  ];

  // on duplique pour le loop fluide
  const loopSlides = slides.length ? [...slides, ...slides] : [];

  useEffect(() => {
    const el = mobileRailRef.current;
    if (!el || !loopSlides.length) return;

    let frame: number;
    let lastTime = performance.now();
    const speed = 35; // px/s – pareil que pour les autres sections

    const step = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (!el) return;

      el.scrollLeft += speed * dt;

      const halfWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft = 0;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [loopSlides.length]);

  return (
    <section aria-labelledby="modules-title">
      {/* Header commun desktop + mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center space-y-3 mb-8"
      >
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-slate-500">
          {t.kicker}
        </p>
        <h2
          id="modules-title"
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t.description}
        </p>
      </motion.div>

      {/* 💻 Desktop / tablette : layout classique */}
      <div className="hidden sm:block space-y-10">
        {/* Ligne 1 : carte graphique */}
        <ProjectsClient images={[]} />

        {/* Ligne 2 : Month + Notifications côte à côte */}
        <section
          aria-label="Agenda and notifications demos"
          className="grid gap-6 lg:grid-cols-2"
        >
          <div>
            <ProjectMonth />
          </div>
          <div>
            <ProjectNotifications />
          </div>
        </section>

        {/* Ligne 3 : Agenda semaine en pleine largeur */}
        <ProjectAgenda />
      </div>

      {/* 📱 Mobile : carrousel horizontal des 4 modules */}
      <div className="sm:hidden mt-4">
        <div
          ref={mobileRailRef}
          className="
            flex gap-4
            overflow-x-auto
            no-scrollbar
            -mx-4 px-4
            py-2
          "
        >
          {loopSlides.map((slide, idx) => (
            <motion.div
              key={`${slide.key}-${idx}`}
              className="
                shrink-0
                w-[88%]
                h-[480px]          /* 👈 même hauteur pour tous les modules */
              "
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="
                  h-full
                  rounded-3xl border border-slate-200/70
                  bg-white/90 backdrop-blur-md
                  shadow-sm
                  overflow-hidden
                  flex flex-col
                "
              >
                {slide.render()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
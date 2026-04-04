"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { useEffect, useState, useRef } from "react";

type SoftwarePage = {
  src: string;
  alt: string;
};

type SoftwareGroup = {
  id: number; // 1..6
  name: string;
  pages: SoftwarePage[]; // 4 pages
};

// Noms courts & parlants pour chaque app
const SOFTWARE_NAMES = [
  "Meal Planner",    // 01
  "Habit & Analytics",       // 02
  "Budget Insights",      // 03
  "Fitness Tracker",    // 04
  "Ops Dashboard",  // 05
  "Client CRM",         // 06
];

// Construction via deux boucles : x = 1..6, y = 1..4
const SOFTWARE_GROUPS: SoftwareGroup[] = Array.from({ length: 6 }, (_, i) => {
  const appId = i + 1; // 1..6
  const name = SOFTWARE_NAMES[i] ?? `App 0${appId}`;
  const pages: SoftwarePage[] = Array.from({ length: 4 }, (_, j) => {
    const pageIndex = j + 1; // 1..4
    const src = `/app/app${appId}${pageIndex}.jpg`;
    return {
      src,
      alt: `${name} – Screen ${pageIndex}`,
    };
  });
  return { id: appId, name, pages };
});

export default function WorkSoftwareSection() {
  const { lang } = useLang();

  const t = {
    en: {
      kicker: "Software",
      title: "Product UI & dashboards",
      close: "Close",
    },
    fr: {
      kicker: "Software",
      title: "Product UI & dashboards",
      close: "Fermer",
    },
  }[lang];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const groups = SOFTWARE_GROUPS;

  const activeGroup =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < groups.length
      ? groups[activeIndex]
      : null;

  const handleClose = () => setActiveIndex(null);

  const handlePrevGroup = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!groups.length || activeIndex === null) return;
    const idx = (activeIndex - 1 + groups.length) % groups.length;
    setActiveIndex(idx);
  };

  const handleNextGroup = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!groups.length || activeIndex === null) return;
    const idx = (activeIndex + 1) % groups.length;
    setActiveIndex(idx);
  };

  // ESC + flèches pour naviguer entre les softwares (lightbox)
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrevGroup();
      if (e.key === "ArrowRight") handleNextGroup();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, groups.length]);

  // Précharger les 24 images pour éviter les flashs
  useEffect(() => {
    if (typeof window === "undefined") return;
    SOFTWARE_GROUPS.forEach((group) => {
      group.pages.forEach((page) => {
        const img = new window.Image();
        img.src = page.src;
      });
    });
  }, []);

  // ---------- Card réutilisable (grid + mobile) ----------
  const renderCard = (group: SoftwareGroup, index: number) => (
    <motion.article
      key={`${group.id}-${index}`}
      className="
        relative group
        rounded-3xl border border-slate-200/70
        bg-white/90 backdrop-blur-sm
        overflow-hidden
        cursor-zoom-in
      "
      whileHover={{
        y: -6, // léger lift, pas de grosse ombre
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={() => setActiveIndex(index)}
    >
      <div className="p-3 sm:p-4 space-y-3">
        {/* Ligne info / label soft */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <span className="inline-flex h-6 px-3 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white">
            {group.name}
          </span>
        </div>
        {/* Mini grid 4 pages */}
        <div
          className="
            grid gap-2
            grid-cols-2
          "
        >
          {group.pages.map((img) => (
            <div
              key={img.src}
              className="
                relative
                rounded-2xl overflow-hidden
                bg-slate-900
                aspect-[9/16]
              "
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.03]
                "
                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 60vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/15" />
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );

  // ---------- Mobile : rail horizontal auto-défilant (loop) ----------
  const railRef = useRef<HTMLDivElement | null>(null);
  // on duplique les groupes pour permettre un loop fluide
  const loopGroups = groups.length ? [...groups, ...groups] : [];

  useEffect(() => {
    const el = railRef.current;
    if (!el || !loopGroups.length) return;

    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 30; // px/s, comme pour les landing pages

    const step = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      const node = railRef.current;
      if (!node) return;

      node.scrollLeft += speed * dt;

      const halfWidth = node.scrollWidth / 2;
      if (node.scrollLeft >= halfWidth) {
        node.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [loopGroups.length]);

  return (
    <section aria-labelledby="software-title">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 text-center"
        >
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {t.kicker}
        </p>
          <h2
            id="software-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
          >
            {t.title}
          </h2>
        </motion.div>

        {/* 💻 Desktop / tablette : grille */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            hidden
            sm:grid gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {groups.map((group, index) => renderCard(group, index))}
        </motion.div>

        {/* 📱 Mobile : rail horizontal scrollable + auto-défilement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sm:hidden px-4"
        >
          <div
            ref={railRef}
            className="
              flex gap-4
              overflow-x-auto
              py-2
              no-scrollbar
            "
          >
            {loopGroups.map((group, idx) => {
              const originalIndex = idx % groups.length;
              return (
                <button
                  type="button"
                  key={`${group.id}-${idx}`}
                  onClick={() => setActiveIndex(originalIndex)}
                  className="shrink-0"
                >
                  <div className="w-[260px]">
                    {renderCard(group, originalIndex)}
                  </div>
                </button>
              );
            })}
            {!loopGroups.length && (
              <div className="w-full aspect-[9/16] rounded-3xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                (No software UI yet)
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lightbox plein écran : 4 pages de l'app active */}
      {activeGroup && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/70 backdrop-blur-[3px]
            flex items-center justify-center
            px-4
          "
          onClick={handleClose}
        >
          <div
            className="
              relative w-full max-w-5xl max-h-[92vh]
              rounded-[30px] overflow-hidden
              bg-white
              border border-slate-200
              shadow-[0_32px_90px_rgba(15,23,42,0.45)]
              flex flex-col
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header lightbox */}
            <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-slate-500">
                  {activeGroup.name}
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">
                   · product UI
                </span>
              </div>
              <div className="flex items-center gap-2">
                {groups.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevGroup}
                      className="
                        inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-slate-900 text-slate-50
                        border border-slate-300
                        text-xs
                        hover:bg-slate-800 transition
                      "
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={handleNextGroup}
                      className="
                        inline-flex items-center justify-center
                        h-8 w-8 rounded-full
                        bg-slate-900 text-slate-50
                        border border-slate-300
                        text-xs
                        hover:bg-slate-800 transition
                      "
                    >
                      ›
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="
                    inline-flex items-center justify-center
                    h-8 w-8 rounded-full
                    bg-black/70 text-white
                    border border-white/30
                    text-xs font-medium
                    hover:bg-black/90 transition
                  "
                  aria-label={t.close}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Grille des 4 pages en grand */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-950/80">
              <div
                className="
                  grid gap-4
                  grid-cols-2
                  lg:grid-cols-4
                "
              >
                {activeGroup.pages.map((img) => (
                  <motion.div
                    key={img.src}
                    className="
                      relative rounded-2xl overflow-hidden
                      bg-black
                      aspect-[9/16]
                    "
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 80vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
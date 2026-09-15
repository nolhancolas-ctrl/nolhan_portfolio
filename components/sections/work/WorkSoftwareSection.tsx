"use client";

import WorkLightbox from "@/components/work/WorkLightbox";
import { useAutoRail } from "@/hooks/useAutoRail";
import { useLang } from "@/hooks/useLang";
import { reveal } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type SoftwarePage = {
  src: string;
  alt: string;
};

type SoftwareGroup = {
  id: number;
  name: string;
  pages: SoftwarePage[];
};

const SOFTWARE_NAMES = [
  "Meal Planner",
  "Habit & Analytics",
  "Budget Insights",
  "Fitness Tracker",
  "Ops Dashboard",
  "Client CRM",
];

const SOFTWARE_GROUPS: SoftwareGroup[] = Array.from(
  { length: 6 },
  (_, index) => {
    const appId = index + 1;
    const name = SOFTWARE_NAMES[index] ?? `App 0${appId}`;

    const pages = Array.from({ length: 4 }, (_, pageIndex) => ({
      src: `/app/app${appId}${pageIndex + 1}.webp`,
      alt: `${name} – Screen ${pageIndex + 1}`,
    }));

    return { id: appId, name, pages };
  },
);

export default function WorkSoftwareSection() {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const groups = SOFTWARE_GROUPS;
  const loopGroups = [...groups, ...groups];

  useAutoRail(railRef, loopGroups.length);

  const t = {
    en: {
      kicker: "Software",
      title: "Product UI & dashboards",
      close: "Close",
      previous: "Previous screen",
      next: "Next screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
    fr: {
      kicker: "Software",
      title: "Product UI & dashboards",
      close: "Fermer",
      previous: "Écran précédent",
      next: "Écran suivant",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
    },
  }[lang];

  const slides = groups.flatMap((group) =>
    group.pages.map((page, pageIndex) => ({
      src: page.src,
      alt: page.alt,
      title: `${group.name} · ${String(pageIndex + 1).padStart(2, "0")}`,
    })),
  );

  const renderCard = (
    group: SoftwareGroup,
    groupIndex: number,
    key: string,
  ) => (
    <motion.button
      type="button"
      key={key}
      onClick={() => setActiveIndex(groupIndex * group.pages.length)}
      className="
        relative group w-full overflow-hidden text-left
        rounded-3xl border border-white/55
        bg-white/18 backdrop-blur-sm
        cursor-zoom-in
      "
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="p-3 sm:p-4 space-y-3">
        <span className="
          inline-flex h-7 px-3 items-center justify-center
          rounded-full bg-slate-950 text-white
          text-[10px] uppercase tracking-[0.18em]
        ">
          {group.name}
        </span>

        <div className="grid grid-cols-2 gap-2">
          {group.pages.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-slate-950"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 130px"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );

  return (
    <section aria-labelledby="software-title">
      <div className="space-y-8">
        <motion.div {...reveal} className="space-y-3 text-center">
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

        <motion.div
          {...reveal}
          className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {groups.map((group, index) =>
            renderCard(group, index, `desktop-${group.id}`),
          )}
        </motion.div>

        <motion.div {...reveal} className="sm:hidden px-4">
          <div
            ref={railRef}
            data-lenis-prevent
            className="flex gap-4 overflow-x-auto py-2 no-scrollbar"
          >
            {loopGroups.map((group, index) => {
              const originalIndex = index % groups.length;

              return (
                <div
                  key={`${group.id}-${index}`}
                  className="shrink-0 w-[260px]"
                >
                  {renderCard(
                    group,
                    originalIndex,
                    `mobile-${group.id}-${index}`,
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <WorkLightbox
        slides={slides}
        index={activeIndex ?? 0}
        open={activeIndex !== null}
        sectionLabel={t.kicker}
        onClose={() => setActiveIndex(null)}
        labels={t}
      />
    </section>
  );
}

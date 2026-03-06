"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

type Lang = "en" | "fr";

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const EVENT_DAYS = [2, 5, 9, 12, 16, 21, 24, 28];

export default function ProjectMonth() {

  const { lang } = useLang();

  const t = {
    en: {
      title: "Monthly calendar",
      subtitle: "Workshops, launches and focus blocks over a full month.",
      monthLabel: "October 2025",
      weekShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      legendTitle: "Highlights",
      legendItems: ["Workshops", "Launches", "Focus time"],
    },
    fr: {
      title: "Agenda mensuel",
      subtitle:
        "Workshops, lancements et temps focus sur une vue complète du mois.",
      monthLabel: "Octobre 2025",
      weekShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      legendTitle: "Moments clés",
      legendItems: ["Workshops", "Lancements", "Temps focus"],
    },
  }[lang];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative overflow-hidden
        rounded-3xl border border-slate-200/70 bg-white/80
        backdrop-blur-xl shadow-sm
        px-5 py-6 sm:px-7 sm:py-7
        h-full flex flex-col
      "
    >
      {/* halo de fond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_55%)]" />

      <div className="relative flex flex-col flex-1 gap-5">
        {/* header mois */}
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {t.title}
            </h3>
            <p className="text-sm text-slate-600">{t.subtitle}</p>
          </div>
          <div className="flex flex-col items-end text-right text-xs text-slate-500">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2 py-1">
              <span className="text-[10px] font-medium text-slate-900">
                {t.monthLabel}
              </span>
            </div>
          </div>
        </div>

        {/* calendrier */}
        <div
          className="
            rounded-2xl bg-slate-950/[0.94]
            border border-slate-800/60
            px-3 py-3 sm:px-4 sm:py-4
          "
        >
          {/* entête jours */}
          <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-400">
            {t.weekShort.map((day) => (
              <span
                key={day}
                className="flex items-center justify-center uppercase tracking-[0.16em]"
              >
                {day}
              </span>
            ))}
          </div>

          {/* grid de jours */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-7 gap-1.5 text-xs"
          >
            {DAYS.map((day, index) => {
              const hasEvent = EVENT_DAYS.includes(day);
              const isToday = day === 16; // arbitraire, juste pour le look

              return (
                <motion.button
                  key={day}
                  type="button"
                  className={`
                    relative flex h-8 sm:h-9 items-center justify-center
                    rounded-lg border text-[11px]
                    ${
                      isToday
                        ? "border-indigo-400 bg-indigo-500/20 text-slate-50"
                        : "border-slate-800/60 bg-slate-900/60 text-slate-200"
                    }
                  `}
                  whileHover={{ scale: 1.03, y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{day}</span>

                  {hasEvent && (
                    <motion.span
                      className={`
                        absolute bottom-1 h-1.5 w-1.5 rounded-full
                        ${isToday ? "bg-amber-300" : "bg-amber-400"}
                      `}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0.8, 1.2, 0.9, 1],
                        opacity: [0, 1, 1, 1],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: index * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* bandeau sous le calendrier */}
          <div className="flex items-center justify-between gap-3 text-[10px] text-slate-300">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-1.5 w-4 rounded-full bg-amber-400/80" />
              <span>
                {lang === "en"
                  ? "Days with key events"
                  : "Jours avec temps forts"}
              </span>
            </div>
            <span className="text-slate-500">
              {lang === "en" ? "Drag & drop ready" : "Prêt pour le drag & drop"}
            </span>
          </div>
        </div>

        {/* petite légende */}
        <div className="flex flex-col gap-1 text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">
            {t.legendTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            <LegendDot color="indigo" label={t.legendItems[0]} />
            <LegendDot color="amber" label={t.legendItems[1]} />
            <LegendDot color="emerald" label={t.legendItems[2]} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

type LegendDotProps = {
  color: "indigo" | "amber" | "emerald";
  label: string;
};

function LegendDot({ color, label }: LegendDotProps) {
  const map: Record<LegendDotProps["color"], string> = {
    indigo: "bg-indigo-400",
    amber: "bg-amber-400",
    emerald: "bg-emerald-400",
  };

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
      <span className={`h-1.5 w-1.5 rounded-full ${map[color]}`} />
      <span>{label}</span>
    </span>
  );
}
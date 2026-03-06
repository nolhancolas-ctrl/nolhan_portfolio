"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

type Lang = "en" | "fr";

type AgendaEvent = {
  time: string;
  type: "call" | "review" | "focus" | "retro";
  duration: string;
  accent: "emerald" | "indigo" | "amber" | "rose";
};
 
const AGENDA_EVENTS: AgendaEvent[] = [
  { time: "09:00", type: "call", duration: "30 min", accent: "emerald" },
  { time: "10:30", type: "review", duration: "45 min", accent: "indigo" },
  { time: "13:30", type: "focus", duration: "2 h", accent: "amber" },
  { time: "16:30", type: "retro", duration: "45 min", accent: "rose" },
];

export default function ProjectAgenda() {

  const { lang } = useLang();

  const t = {
    en: {
      agendaTitle: "Scheduling & agenda view",
      agendaSubtitle: "Calls, workshops and focus time in a clear weekly timeline.",
      agendaWeekLabel: "This week",
      agendaTodayLabel: "Today",
      agendaTypes: {
        call: "Client call",
        review: "Design review",
        focus: "Deep work",
        retro: "Retro & planning",
      },
      agendaDayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    fr: {
      agendaTitle: "Vue agenda & planning",
      agendaSubtitle:
        "Appels, workshops et temps focus organisés sur une semaine lisible.",
      agendaWeekLabel: "Cette semaine",
      agendaTodayLabel: "Aujourd’hui",
      agendaTypes: {
        call: "Appel client",
        review: "Revue design",
        focus: "Deep work",
        retro: "Rétro & planning",
      },
      agendaDayNamesShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    },
  }[lang];

  const dayNames = t.agendaDayNamesShort;
  const todayIndex = 2; // mercredi pour le look

  return (
    <section
      aria-labelledby="agenda-demo-title"
      className="relative"
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative overflow-hidden
          rounded-3xl border border-slate-200/70 bg-white/80
          backdrop-blur-xl shadow-sm
          px-5 py-6 sm:px-7 sm:py-7 md:px-9 md:py-8
        "
      >
        {/* halo de fond */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.14),transparent_55%)]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Colonne texte + semaine */}
          <div className="lg:w-1/3 space-y-4">
            <div className="space-y-2">
              <h3
                id="agenda-demo-title"
                className="text-base sm:text-lg font-semibold text-slate-900"
              >
                {t.agendaTitle}
              </h3>
              <p className="text-sm text-slate-600">
                {t.agendaSubtitle}
              </p>
            </div>

            {/* bandeau semaine */}
            <div
              className="
                mt-3 rounded-2xl border border-slate-200/80 bg-white/80
                px-3 py-2.5 flex items-center justify-between text-[11px]
              "
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                  {lang === "en" ? "W" : "S"}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">
                    {t.agendaWeekLabel}
                  </span>
                  <span className="text-slate-500">
                    {lang === "en"
                      ? "Calls • workshops • focus time"
                      : "Appels • ateliers • temps focus"}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500">
                {todayIndex + 1}/7 {lang === "en" ? "days" : "jours"}
              </span>
            </div>

            {/* petite légende types */}
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-500">
              <LegendPill color="emerald">
                {t.agendaTypes.call}
              </LegendPill>
              <LegendPill color="indigo">
                {t.agendaTypes.review}
              </LegendPill>
              <LegendPill color="amber">
                {t.agendaTypes.focus}
              </LegendPill>
              <LegendPill color="rose">
                {t.agendaTypes.retro}
              </LegendPill>
            </div>
          </div>

          {/* Colonne agenda animé */}
          <div className="lg:w-2/3">
            <div
              className="
                relative mt-3 lg:mt-0 rounded-2xl bg-slate-950/[0.94]
                border border-slate-800/60 px-3 py-3 sm:px-4 sm:py-4
              "
            >
              {/* dégradé de fond */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(248,250,252,0.06),transparent_55%)]" />

              {/* bandeau jours */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{t.agendaTodayLabel}</span>
                </div>
                <div className="flex gap-1 rounded-full bg-slate-900/70 p-1">
                  {dayNames.map((day, index) => {
                    const isToday = index === todayIndex;
                    return (
                      <motion.button
                        key={day}
                        type="button"
                        className={`
                          relative px-2.5 py-1 text-[10px] rounded-full
                          ${
                            isToday
                              ? "bg-white text-slate-900"
                              : "text-slate-400"
                          }
                        `}
                        whileHover={{ y: -1 }}
                      >
                        {day}
                        {isToday && (
                          <motion.span
                            layoutId="agenda-today-pill"
                            className="pointer-events-none absolute inset-0 rounded-full border border-slate-300/80"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Ligne temporelle + événements */}
              <div className="relative mt-4 grid grid-cols-[auto,1fr] gap-x-4">
                {/* Colonne heures */}
                <div className="flex flex-col justify-between text-[10px] text-slate-500 h-40 sm:h-44">
                  <span>09:00</span>
                  <span>12:00</span>
                  <span>15:00</span>
                  <span>18:00</span>
                </div>

                {/* Timeline */}
                <div className="relative h-40 sm:h-44">
                  {/* colonne principale */}
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-700/70" />

                  {/* “now” marker animé */}
                  <motion.div
                    className="absolute left-[1px] h-0.5 w-10 rounded-full bg-emerald-400/80"
                    initial={{ top: "18%" }}
                    animate={{ top: ["18%", "68%", "18%"] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* événements */}
                  <div className="relative h-full">
                    {AGENDA_EVENTS.map((event, index) => (
                      <AgendaEventRow
                        key={event.time}
                        event={event}
                        index={index}
                        lang={lang}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}

type LegendPillProps = {
  color: "emerald" | "indigo" | "amber" | "rose";
  children: React.ReactNode;
};

function LegendPill({ color, children }: LegendPillProps) {
  const map: Record<
    LegendPillProps["color"],
    { dot: string; bg: string; text: string }
  > = {
    emerald: {
      dot: "bg-emerald-400",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    indigo: {
      dot: "bg-indigo-400",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    },
    amber: {
      dot: "bg-amber-400",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    rose: {
      dot: "bg-rose-400",
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
  };

  const colors = map[color];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full
        px-2.5 py-1 ${colors.bg} ${colors.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
      {children}
    </span>
  );
}

type AgendaEventRowProps = {
  event: AgendaEvent;
  index: number;
  lang: Lang;
  t: {
    agendaTypes: {
      call: string;
      review: string;
      focus: string;
      retro: string;
    };
  };
};

function AgendaEventRow({ event, index, lang, t }: AgendaEventRowProps) {
  const verticalPositions = ["8%", "32%", "58%", "82%"];
  const top = verticalPositions[index] ?? "50%";

  const colorMap: Record<
    AgendaEvent["accent"],
    { bg: string; chip: string }
  > = {
    emerald: {
      bg: "bg-emerald-500/15 border-emerald-400/40",
      chip: "bg-emerald-500/90",
    },
    indigo: {
      bg: "bg-indigo-500/15 border-indigo-400/40",
      chip: "bg-indigo-500/90",
    },
    amber: {
      bg: "bg-amber-500/15 border-amber-400/40",
      chip: "bg-amber-500/90",
    },
    rose: {
      bg: "bg-rose-500/15 border-rose-400/40",
      chip: "bg-rose-500/90",
    },
  };

  const label = t.agendaTypes[event.type];
  const colors = colorMap[event.accent];

  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{ top }}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.6,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center gap-3">
        {/* point sur la ligne */}
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="absolute h-4 w-4 rounded-full border border-slate-700/60" />
        </div>

        {/* carte événement */}
        <div
          className={`
            flex-1 rounded-2xl border px-3 py-2
            ${colors.bg}
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-200">
                {event.time}
              </span>
              <span
                className={`
                  inline-flex items-center rounded-full px-1.5 py-0.5
                  text-[10px] text-slate-50 ${colors.chip}
                `}
              >
                {label}
              </span>
            </div>
            <span className="text-[10px] text-slate-300">
              {event.duration}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
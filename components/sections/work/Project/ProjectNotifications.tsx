"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

type Lang = "en" | "fr";

type NotificationItem = {
  id: number;
  type: "signup" | "payment" | "comment" | "alert";
  titleEn: string;
  titleFr: string;
  timeEn: string;
  timeFr: string;
};

const ITEMS: NotificationItem[] = [
  {
    id: 1,
    type: "signup",
    titleEn: "New signup: studio@northside.co",
    titleFr: "Nouvelle inscription : studio@northside.co",
    timeEn: "2 min ago",
    timeFr: "il y a 2 min",
  },
  {
    id: 2,
    type: "payment",
    titleEn: "Invoice #2043 paid – €1,250",
    titleFr: "Facture #2043 payée – 1 250 €",
    timeEn: "18 min ago",
    timeFr: "il y a 18 min",
  },
  {
    id: 3,
    type: "comment",
    titleEn: "Feedback added on “Homepage v3”",
    titleFr: "Nouveau commentaire sur « Homepage v3 »",
    timeEn: "1 h ago",
    timeFr: "il y a 1 h",
  },
  {
    id: 4,
    type: "alert",
    titleEn: "Checkout drop at step 3 (-7%)",
    titleFr: "Chute du tunnel au step 3 (-7 %)",
    timeEn: "3 h ago",
    timeFr: "il y a 3 h",
  },
];

export default function ProjectNotifications() {

  const { lang } = useLang();

  const t = {
    en: {
      title: "Live notifications & activity",
      subtitle: "Signups, payments and product events in a clean feed.",
      badge: "Live",
      filterAll: "All",
      filterProduct: "Product",
      filterBilling: "Billing",
      footerLeft: "4 events in the last hours",
      footerRight: "View activity log",
    },
    fr: {
      title: "Notifications & activité en direct",
      subtitle:
        "Inscriptions, paiements et événements produit dans un flux clair.",
      badge: "En direct",
      filterAll: "Tout",
      filterProduct: "Produit",
      filterBilling: "Facturation",
      footerLeft: "4 événements sur les dernières heures",
      footerRight: "Voir le journal d’activité",
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
        h-full flex flex-col
        min-h-[260px] sm:min-h-[300px] lg:min-h-[320px]
        rounded-3xl border border-slate-200/70 bg-white/80
        backdrop-blur-xl shadow-sm
        px-5 py-6 sm:px-7 sm:py-7
      "
    >
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(248,250,252,0.08),transparent_55%)]" />

      {/* header */}
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {t.title}
          </h3>
          <p className="text-sm text-slate-600">{t.subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-[11px] text-slate-500">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t.badge}</span>
          </div>
        </div>
      </div>

      {/* filtres */}
      <div className="relative mb-4 flex flex-wrap items-center gap-2 text-[11px]">
        <FilterPill active>{t.filterAll}</FilterPill>
        <FilterPill>{t.filterProduct}</FilterPill>
        <FilterPill>{t.filterBilling}</FilterPill>
      </div>

      {/* liste notifications */}
      <div className="relative flex-1 space-y-3 pt-1">
        {/* ligne verticale */}
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-slate-200" />

        {ITEMS.map((item, index) => (
          <NotificationRow key={item.id} item={item} index={index} lang={lang} />
        ))}
      </div>

      {/* footer résumé */}
      <div className="relative mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-1.5 w-4 rounded-full bg-emerald-400/80" />
          <span>{t.footerLeft}</span>
        </div>
        <button
          type="button"
          className="
            inline-flex items-center gap-1
            text-[11px] font-medium text-slate-700
            hover:text-slate-900
          "
        >
          <span>{t.footerRight}</span>
          <span aria-hidden>↗</span>
        </button>
      </div>
    </motion.article>
  );
}

/* ---------- Filtres ---------- */

type FilterPillProps = {
  active?: boolean;
  children: React.ReactNode;
};

function FilterPill({ active, children }: FilterPillProps) {
  if (active) {
    return (
      <span
        className="
          inline-flex items-center gap-1.5 rounded-full
          bg-slate-900 text-slate-50 px-3 py-1
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className="
        inline-flex items-center gap-1.5 rounded-full
        border border-slate-200 bg-white/80
        px-3 py-1 text-slate-600
        hover:border-slate-300 hover:text-slate-900
        transition
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      {children}
    </button>
  );
}

/* ---------- Lignes de notifications ---------- */

type NotificationRowProps = {
  item: NotificationItem;
  index: number;
  lang: Lang;
};

function NotificationRow({ item, index, lang }: NotificationRowProps) {
  const toneMap: Record<
    NotificationItem["type"],
    { dot: string; icon: string }
  > = {
    signup: { dot: "bg-sky-400", icon: "👤" },
    payment: { dot: "bg-emerald-400", icon: "💳" },
    comment: { dot: "bg-violet-400", icon: "💬" },
    alert: { dot: "bg-rose-400", icon: "⚠️" },
  };

  const tone = toneMap[item.type];
  const title = lang === "en" ? item.titleEn : item.titleFr;
  const time = lang === "en" ? item.timeEn : item.timeFr;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      animate={{
        x: [0, 10, 0], // léger "swipe" latéral
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: index * 0.5,
        ease: "easeInOut",
      }}
      className="relative pl-8"
    >
      {/* point sur la ligne */}
      <div className="absolute left-0 top-3 flex h-4 w-4 items-center justify-center">
        <span
          className={`
            h-2 w-2 rounded-full border-2 border-white
            ${tone.dot}
          `}
        />
      </div>

      {/* carte notif */}
      <div
        className="
          rounded-2xl border border-slate-200 bg-white/95
          px-3 py-2.5 flex items-center justify-between gap-3
          shadow-sm
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-7 w-7 items-center justify-center
              rounded-full bg-slate-900 text-[13px]
            "
          >
            <span aria-hidden>{tone.icon}</span>
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] text-slate-900">{title}</p>
            <span className="text-[10px] text-slate-500">{time}</span>
          </div>
        </div>

        {/* chevron / action */}
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="hidden sm:inline">
            {lang === "en" ? "Swipe" : "Balayer"}
          </span>
          <span aria-hidden>⟶</span>
        </div>
      </div>
    </motion.div>
  );
}
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";

export type ProjectImage = {
  src: string;
  alt: string;
};

type Props = {
  images: ProjectImage[];
};

export default function ProjectsClient({ images }: Props) {
  const { lang } = useLang();
  const t = {
    en: {
      kicker: "Modules",
      title: "Interface modules I can build for you",
      subtitle: "Dashboards, products, mobile UIs and rich interactions.",
      analyticsTitle: "Product analytics dashboard",
      analyticsSubtitle: "Live KPIs, funnels and cohorts in one view.",
      metric1Label: "Conversion",
      metric2Label: "Retention",
      metric3Label: "Revenue",
      metric1Value: "4.3%",
      metric2Value: "82%",
      metric3Value: "$56k",
      timeframeLabel: "Last 30 days",
      badgeLive: "Live demo",
    },
    fr: {
      kicker: "Modules",
      title: "Des modules que je peux concevoir",
      subtitle: "Dashboards, produits, UI mobiles et interactions riches.",
      analyticsTitle: "Dashboard d’analytics produit",
      analyticsSubtitle:
        "KPIs, funnels et cohortes réunis dans une vue claire.",
      metric1Label: "Conversion",
      metric2Label: "Rétention",
      metric3Label: "Revenu",
      metric1Value: "4,3 %",
      metric2Value: "82 %",
      metric3Value: "56 k€",
      timeframeLabel: "30 derniers jours",
      badgeLive: "Démo animée",
    },
  }[lang];

  const limitedImages = images.slice(0, 12); // au cas où tu en mets beaucoup

  return (
    <section className="relative">
      <div className="space-y-8">
        {/* 1️⃣ Carte “graphique” en largeur */}
        <AnalyticsHeroCard lang={lang} t={t as any} />

        {/* 2️⃣ Grille d’images de projets */}
        {limitedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {limitedImages.map((project) => (
                <motion.article
                  key={project.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="
                    relative overflow-hidden
                    rounded-3xl border border-slate-200/70 bg-white
                    shadow-sm hover:shadow-lg
                    transition-transform duration-300
                    hover:-translate-y-1
                  "
                >
                  <div className="relative w-full h-64 md:h-72">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ---------- Carte Analytics avec graphique animé ---------- */

type AnalyticsHeroProps = {
  lang: "en" | "fr";
  t: ReturnType<typeof getTranslationsMock>;
};

// petit helper juste pour typer t proprement
function getTranslationsMock() {
  return {
    kicker: "",
    title: "",
    subtitle: "",
    analyticsTitle: "",
    analyticsSubtitle: "",
    metric1Label: "",
    metric2Label: "",
    metric3Label: "",
    metric1Value: "",
    metric2Value: "",
    metric3Value: "",
    timeframeLabel: "",
    badgeLive: "",
    galleryTitle: "",
    gallerySubtitle: "",
  };
}

function AnalyticsHeroCard({ lang, t }: AnalyticsHeroProps) {
  // Path du graph, coord fixées mais animées par pathLength
  const linePath =
    "M 8 170 L 70 140 L 130 120 L 190 90 L 250 110 L 310 70 L 370 95 L 430 60 L 490 80 L 550 50";
  const areaPath =
    "M 8 170 L 70 140 L 130 120 L 190 90 L 250 110 L 310 70 L 370 95 L 430 60 L 490 80 L 550 50 L 550 200 L 8 200 Z";

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
        px-5 py-6 sm:px-7 sm:py-7 md:px-9 md:py-8
      "
    >
      {/* Badge “live” */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-[11px] text-slate-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>{t.badgeLive}</span>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
        {/* Texte à gauche */}
        <div className="md:w-1/3 space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {t.analyticsTitle}
          </h3>
          <p className="text-sm text-slate-600">
            {t.analyticsSubtitle}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <MetricPill
              label={t.metric1Label}
              value={t.metric1Value}
              tone="green"
            />
            <MetricPill
              label={t.metric2Label}
              value={t.metric2Value}
              tone="indigo"
            />
            <MetricPill
              label={t.metric3Label}
              value={t.metric3Value}
              tone="amber"
            />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span>{t.timeframeLabel}</span>
          </div>
        </div>

        {/* Graphique à droite */}
        <div className="md:w-2/3">
          <AnimatedLineChart linePath={linePath} areaPath={areaPath} />
        </div>
      </div>
    </motion.article>
  );
}

type MetricPillProps = {
  label: string;
  value: string;
  tone: "green" | "indigo" | "amber";
};

function MetricPill({ label, value, tone }: MetricPillProps) {
  const colorMap: Record<
    MetricPillProps["tone"],
    { dot: string; bg: string; text: string }
  > = {
    green: {
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
  };

  const colors = colorMap[tone];

  return (
    <div
      className={`
        flex flex-col gap-1 rounded-2xl px-3 py-2
        ${colors.bg}
      `}
    >
      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
        <span>{label}</span>
      </div>
      <p className={`text-sm font-semibold ${colors.text}`}>{value}</p>
    </div>
  );
}

type AnimatedLineChartProps = {
  linePath: string;
  areaPath: string;
};

function AnimatedLineChart({ linePath, areaPath }: AnimatedLineChartProps) {
  return (
    <div className="relative rounded-2xl bg-slate-950/[0.92] px-3 py-3 sm:px-4 sm:py-4">
      {/* Overlay dégradé léger */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(251,191,36,0.2),transparent_55%)]" />

      {/* Tick labels Y */}
      <div className="absolute left-0 top-3 bottom-6 flex flex-col justify-between pl-1 text-[9px] text-slate-500">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
        <span>0%</span>
      </div>

      {/* Axes + line chart */}
      <svg viewBox="0 0 560 210" className="relative w-full h-52 sm:h-56">
        {/* Axes */}
        <g stroke="#1f2937" strokeWidth="1">
          <line x1="0" y1="170" x2="560" y2="170" />
          <line x1="0" y1="120" x2="560" y2="120" opacity="0.5" />
          <line x1="0" y1="70" x2="560" y2="70" opacity="0.35" />
        </g>

        {/* Zone remplie animée */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ligne principale animée */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gradient defs */}
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="40%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient
            id="areaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(129,140,248,0.5)" />
            <stop offset="60%" stopColor="rgba(147,197,253,0.25)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0)" />
          </linearGradient>
        </defs>

        {/* Petits points sur la courbe */}
        {[
          [8, 170],
          [70, 140],
          [130, 120],
          [190, 90],
          [250, 110],
          [310, 70],
          [370, 95],
          [430, 60],
          [490, 80],
          [550, 50],
        ].map(([x, y], index) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={4}
            fill="#0f172a"
            stroke="#e5e7eb"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.6, 1],
              opacity: [0, 1, 0.7, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Légende X */}
      <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500 px-1">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}
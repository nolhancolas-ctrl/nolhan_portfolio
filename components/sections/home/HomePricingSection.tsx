// @ts-nocheck
/* eslint-disable react/no-unknown-property */
"use client";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
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

/* ---------- Formes 3D argentées par carte ---------- */
type Bounds = {
  xCenter: number;
  xRange: number;
  yCenter: number;
  yRange: number;
  zCenter: number;
  zRange: number;
};

type MovingShapeProps = {
  type: "icosa" | "knot" | "orb";
  bounds: Bounds;
  scale?: number;
  speed?: number;
  phase?: number;
};

function MovingShape({
  type,
  bounds,
  scale = 1.2,
  speed = 1,
  phase = 0,
}: MovingShapeProps) {
  const group = useRef<THREE.Group>(null);

  const materialProps: THREE.MeshStandardMaterialParameters = {
    color: "#e5e7eb",
    metalness: 0.97,
    roughness: 0.16,
    envMapIntensity: 1.2,
    clearcoat: 0.7,
    clearcoatRoughness: 0.25,
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;

    // Mouvement confiné dans un rectangle lié à la carte
    const x =
      bounds.xCenter + Math.sin(t * 0.8) * bounds.xRange;
    const y =
      bounds.yCenter + Math.sin(t * 0.9) * bounds.yRange;
    const z =
      bounds.zCenter + Math.cos(t * 0.7) * bounds.zRange;

    if (!group.current) return;
    group.current.position.set(x, y, z);
    group.current.rotation.x += 0.01 * speed;
    group.current.rotation.y += 0.014 * speed;
    group.current.rotation.z += 0.006 * speed;
  });

  return (
    <group ref={group} scale={scale}>
      {type === "icosa" && (
        <mesh castShadow>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}
      {type === "knot" && (
        <mesh castShadow>
          <torusKnotGeometry args={[1.2, 0.33, 200, 22]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}
      {type === "orb" && (
        <group>
          <mesh castShadow>
            <sphereGeometry args={[1.4, 56, 56]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.3, 0]}>
            <torusGeometry args={[2, 0.09, 36, 140]} />
            <meshStandardMaterial
              color="#f9fafb"
              metalness={0.9}
              roughness={0.25}
              envMapIntensity={1.4}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

function ServicesBackground3D() {
  const cardBounds: Bounds[] = [
    {
      // carte de gauche
      xCenter: -6,
      xRange: 1.4,
      yCenter: 0,
      yRange: 1.6,
      zCenter: -7,
      zRange: 1.2,
    },
    {
      // carte du milieu
      xCenter: 0,
      xRange: 1.5,
      yCenter: 0,
      yRange: 1.6,
      zCenter: -7.2,
      zRange: 1.3,
    },
    {
      // carte de droite
      xCenter: 6,
      xRange: 1.4,
      yCenter: 0,
      yRange: 1.6,
      zCenter: -7,
      zRange: 1.2,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 45 }}
        shadows
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[6, 8, 10]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-6, -4, -8]} intensity={0.5} />
        <Environment preset="studio" />
        {/* Une forme par carte */}
        <MovingShape
          type="icosa"
          bounds={cardBounds[0]}
          scale={1.15}
          speed={1.05}
          phase={0.4}
        />
        <MovingShape
          type="knot"
          bounds={cardBounds[1]}
          scale={1.2}
          speed={1.25}
          phase={1.2}
        />
        <MovingShape
          type="orb"
          bounds={cardBounds[2]}
          scale={1.25}
          speed={0.95}
          phase={2.1}
        />
      </Canvas>
    </div>
  );
}

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
      cta: "Book a call",
    },
  }[lang];

  return (
    <section aria-labelledby="services-title" className="relative">
      <ServicesBackground3D />

      {/* En-tête */}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.06,
              }}
              className="
                group relative flex flex-col
                rounded-3xl border border-slate-200/75 bg-white/40
                shadow-sm
                px-5 py-6 md:px-6 md:py-7
                overflow-hidden
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
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
"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

export default function ContactSection() {
  const { lang } = useLang();

  const t = {
    en: {
      kicker: "Contact",
      title: "Book a call",
    },
    fr: {
      kicker: "Contact",
      title: "Réserver un appel",
    },
  }[lang];

  // Charge le script Calendly une seule fois côté client
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existingScript) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8 space-y-3"
      >
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          {t.kicker}
        </p>
        <h2
          id="contact-title"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {t.title}
        </h2>
      </motion.div>

      {/* Calendly inline widget, sans carte / blur autour */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <div
          className="calendly-inline-widget w-full"
          data-url="https://calendly.com/nolhancolas/30min"
          style={{ minWidth: "320px", height: "900px" }}
        />
      </motion.div>
    </section>
  );
}
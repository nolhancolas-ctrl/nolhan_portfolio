"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { reveal } from "@/lib/motion";

const CalBooking = dynamic(() => import("./CalBooking"), { ssr: false });

export default function ContactSection() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "240px" });
  const fr = lang === "fr";
  return (
    <section aria-labelledby="contact-title" className="relative">
      <motion.div {...reveal} className="text-center mb-10 space-y-4">
        <p className="text-xs font-medium tracking-[0.22em] uppercase text-slate-500">Contact</p>
        <h2 id="contact-title" className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">{fr ? "Parlons de votre projet." : "Let’s talk about your project."}</h2>
        <p className="text-slate-600">{fr ? "30 minutes pour faire connaissance et donner une direction à votre idée." : "30 minutes to meet, exchange ideas and find a direction."}</p>
      </motion.div>
      <div ref={ref} className="booking-shell" data-lenis-prevent>
        {near && <CalBooking lang={lang} />}
      </div>
      <p className="mt-5 text-center text-sm text-slate-600">
        <a className="booking-direct" href="https://cal.com/nolhan/30min" target="_blank" rel="noopener noreferrer">{fr ? "Ouvrir le calendrier sur Cal.com" : "Open the calendar on Cal.com"} <span aria-hidden="true">↗</span></a>
      </p>
    </section>
  );
}

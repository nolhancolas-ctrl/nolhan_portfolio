"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { reveal } from "@/lib/motion";
import { CAL_URL } from "@/lib/site";

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
      <motion.div
        ref={ref}
        className="booking-shell"
        initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {near && <CalBooking lang={lang} />}
      </motion.div>
      <p className="booking-signature">
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer">Cal.com</a>
      </p>
    </section>
  );
}


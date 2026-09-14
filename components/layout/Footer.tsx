"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { LINKEDIN_URL, SITE_EMAIL, SITE_NAME, splitSiteName } from "@/lib/site";
import { reveal } from "@/lib/motion";

export default function Footer({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const fr = lang === "fr";
  const wordmark = splitSiteName();

  return (
    <footer data-site-footer className={`modern-footer ${className}`} aria-labelledby="footer-title">
      <motion.div {...reveal} className="footer-inner">
        <div className="footer-brand-column">
          <a className="footer-logo" href="#page-top" aria-label={`${SITE_NAME} — ${fr ? "retour en haut" : "back to top"}`}>
            {wordmark.name}<span>{wordmark.suffix}</span>
          </a>
          <div className="footer-contact-stack">
            <a className="footer-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a className="footer-email" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </div>
        </div>

        <h2 id="footer-title" className="footer-pitch">
          {fr ? "Une idée en tête ?" : "Something in mind?"}
          <span>{fr ? "Donnons-lui vie." : "Let’s bring it to life."}</span>
        </h2>
      </motion.div>
    </footer>
  );
}


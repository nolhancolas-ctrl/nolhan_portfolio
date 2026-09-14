"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL, SITE_NAME, splitSiteName } from "@/lib/site";
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
            <div className="footer-socials">
              <a className="footer-social footer-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              <a className="footer-social footer-github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.04 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.31c.98 0 1.94.13 2.85.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.04c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
              </a>
            </div>
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


"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { reveal } from "@/lib/motion";

export default function Footer({ className = "", email = "nolhan.colas@gmail.com" }: { className?: string; email?: string }) {
  const { lang } = useLang();
  const fr = lang === "fr";
  return (
    <footer data-site-footer className={`modern-footer ${className}`} aria-labelledby="footer-title">
      <div className="footer-inner">
        <motion.div {...reveal} className="footer-invitation">
          <div>
            <p className="footer-eyebrow">{fr ? "La suite commence ici" : "The next chapter starts here"}</p>
            <h2 id="footer-title">{fr ? "Une idée en tête ?" : "Something in mind?"}<br /><span>{fr ? "Donnons-lui vie." : "Let’s bring it to life."}</span></h2>
          </div>
          <a className="footer-round-cta" href="/#contact" aria-label={fr ? "Parlons de votre projet" : "Let’s talk about your project"}><span aria-hidden="true">↗</span></a>
        </motion.div>
        <div className="footer-details">
          <div className="footer-about">
            <p className="footer-eyebrow">{fr ? "Design, code et curiosité." : "Design, code & curiosity."}</p>
            <p>{fr ? "Ingénieur diplômé de CentraleSupélec, passé par Alpine Cars. Je conçois et développe des expériences web soignées, du premier croquis au dernier détail." : "CentraleSupélec engineer, previously at Alpine Cars. I design and build thoughtful web experiences, from the first sketch to the final detail."}</p>
            <a className="footer-email" href={`mailto:${email}`}>{email}<span aria-hidden="true"> ↗</span></a>
          </div>
          <nav aria-label={fr ? "Navigation de bas de page" : "Footer navigation"}>
            <p className="footer-eyebrow">{fr ? "Explorer" : "Explore"}</p>
            <Link href="/">{fr ? "Accueil" : "Home"}</Link>
            <Link href="/work">{fr ? "Projets" : "Work"}</Link>
            <a href="/#pricing">{fr ? "Services" : "Services"}</a>
            <a href="/#contact">{fr ? "Réserver un appel" : "Book a call"}</a>
          </nav>
          <nav aria-label={fr ? "Réseaux sociaux" : "Social links"}>
            <p className="footer-eyebrow">{fr ? "Ailleurs" : "Elsewhere"}</p>
            <a href="https://github.com/nolhancolas-ctrl" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/nolhan-colas-90394121b" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://cal.com/nolhan/30min" target="_blank" rel="noopener noreferrer">Cal.com <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">nolhan<span>.dev</span></div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nolhan Colas</p>
          <p>{fr ? "Conçu avec intention." : "Made with intention."}</p>
          <a href="#page-top">{fr ? "Retour en haut" : "Back to top"} <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}

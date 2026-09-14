"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks/useLang";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
  // On part de true : au chargement, le hero est en vue, donc le header est caché
  const [isHeroInView, setIsHeroInView] = useState(true);

  const { lang } = useLang();
  const pathname = usePathname();

  const t = {
    en: {
      cta: "Contact me",
    },
    fr: {
      cta: "Me contacter",
    },
  }[lang];

  // Observer la section #hero
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsHeroInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // "en vue" quand ~30% du hero est visible
      }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Visible quand le hero n’est plus dans le viewport
  const visible = !isHeroInView;

  return (
    <header
      className={`
        fixed top-4 
        left-4 md:left-1/2 
        -translate-x-0 md:-translate-x-1/2
        z-50
        transition-all duration-500
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-4"
        }
      `}
    >
      <div
        className="
        w-full max-w-xs sm:max-w-none
          px-3 py-1.5 sm:px-6 sm:py-3
          bg-white/20 backdrop-blur-xl
          border border-white/30
          rounded-full shadow-lg 
          flex items-center gap-3 sm:gap-6
        "
      >
        <a
          href="/#hero"
          className="
            px-5 py-2 rounded-full
            text-slate-900 font-medium 
            hover:bg-black hover:text-white transition
            whitespace-nowrap
          "
        >
          {SITE_NAME}
        </a>

        <a
          href="/#contact"
          className="
            px-5 py-2 rounded-full
            bg-white text-slate-900 font-medium 
            hover:bg-black hover:text-white transition
            whitespace-nowrap
          "
        >
          {t.cta}
        </a>
      </div>
    </header>
  );
}


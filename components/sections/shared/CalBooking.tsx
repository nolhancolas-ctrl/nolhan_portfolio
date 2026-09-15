"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import type { Lang } from "@/hooks/useLang";

export default function CalBooking({ lang }: { lang: Lang }) {
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let calApi: Awaited<ReturnType<typeof getCalApi>> | null = null;
    const markReady = () => { if (!cancelled) setReady(true); };

    getCalApi({ namespace: "portfolio" })
      .then((cal) => {
        if (cancelled) return;
        calApi = cal;
        cal("ui", {
          theme: "light",
          cssVarsPerTheme: {
            light: { "cal-brand": "#7657e6" },
            dark: { "cal-brand": "#b6a3ff" },
          },
          styles: {
            body: { background: "transparent" },
            enabledDateButton: { background: "#ebe8f4", color: "#17151f" },
          },
          hideEventTypeDetails: compact,
          layout: "month_view",
        });
        cal("on", { action: "linkReady", callback: markReady });
        cal("on", { action: "__dimensionChanged", callback: markReady });
      })
      .catch(() => markReady());

    return () => {
      cancelled = true;
      if (calApi) {
        calApi("off", { action: "linkReady", callback: markReady });
        calApi("off", { action: "__dimensionChanged", callback: markReady });
      }
    };
  }, [compact]);

  return (
    <div className={`cal-frame${ready ? " is-ready" : ""}${compact ? " is-compact" : ""}`}>
      <div className="cal-loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Cal
        key={lang}
        namespace="portfolio"
        calLink="nolhan/30min"
        className="cal-embed-mount"
        config={{
          layout: "month_view",
          theme: "light",
          locale: lang,
          iframeAttrs: { id: "portfolio-cal" },
        }}
      />
    </div>
  );
}


"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState, type CSSProperties } from "react";
import type { Lang } from "@/hooks/useLang";

type DimensionEvent = CustomEvent<{ data?: { iframeHeight?: number } }>;

const calCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 20 20'%3E%3Cpath d='M2.1 1.85c-.68-.31-1.42.34-1.19 1.06l4.86 15.02c.24.75 1.27.85 1.66.16l3.04-5.35 5.92-2.15c.76-.28.82-1.33.1-1.69L2.1 1.85Z' fill='%230d0d12' stroke='white' stroke-width='1.2' stroke-linejoin='round'/%3E%3C/svg%3E") 2 2, auto`;

export default function CalBooking({ lang }: { lang: Lang }) {
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [visibleHeight, setVisibleHeight] = useState<number | null>(null);

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
    const updateDimensions = (event: DimensionEvent) => {
      markReady();
      const iframeHeight = event.detail?.data?.iframeHeight;
      if (!cancelled && !compact && typeof iframeHeight === "number") {
        setVisibleHeight(Math.max(450, iframeHeight - 100));
      }
    };

    getCalApi({ namespace: "portfolio" })
      .then((cal) => {
        if (cancelled) return;
        calApi = cal;
        const embeddedBodyStyle: CSSProperties = { background: "transparent", cursor: calCursor };
        const embeddedDateStyle: CSSProperties = { background: "#ebe8f4", color: "#17151f", cursor: calCursor };
        cal("ui", {
          theme: "light",
          cssVarsPerTheme: {
            light: { "cal-brand": "#7657e6" },
            dark: { "cal-brand": "#b6a3ff" },
          },
          styles: {
            body: embeddedBodyStyle,
            enabledDateButton: embeddedDateStyle,
          },
          hideEventTypeDetails: compact,
          layout: "month_view",
        });
        cal("on", { action: "linkReady", callback: markReady });
        cal("on", { action: "__dimensionChanged", callback: updateDimensions });
      })
      .catch(() => markReady());

    return () => {
      cancelled = true;
      if (calApi) {
        calApi("off", { action: "linkReady", callback: markReady });
        calApi("off", { action: "__dimensionChanged", callback: updateDimensions });
      }
    };
  }, [compact]);

  return (
    <div
      className={`cal-frame${ready ? " is-ready" : ""}${compact ? " is-compact" : ""}${visibleHeight && !compact ? " has-cropped-branding" : ""}`}
      style={visibleHeight && !compact ? ({ "--cal-visible-height": `${visibleHeight}px` } as CSSProperties) : undefined}
    >
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


"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState, type CSSProperties } from "react";
import type { Lang } from "@/hooks/useLang";

type DimensionEvent = CustomEvent<{ data?: { iframeHeight?: number } }>;

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
        const embeddedBodyStyle: CSSProperties = { background: "transparent" };
        const embeddedDateStyle: CSSProperties = { background: "#ebe8f4", color: "#17151f" };
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


"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import type { Lang } from "@/hooks/useLang";

export default function CalBooking({ lang }: { lang: Lang }) {
  useEffect(() => {
    let cancelled = false;
    getCalApi({ namespace: "portfolio" }).then((cal) => {
      if (!cancelled) cal("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#6d4aff" }, dark: { "cal-brand": "#b6a3ff" } }, hideEventTypeDetails: false, layout: "month_view" });
    }).catch(() => { /* The direct Cal.com link below remains available. */ });
    return () => { cancelled = true; };
  }, []);
  return <Cal key={lang} namespace="portfolio" calLink="nolhan/30min" style={{ width: "100%", height: "100%", overflow: "auto" }} config={{ layout: "month_view", theme: "light", locale: lang }} />;
}

const fallbackSiteUrl = "https://nolhan-dev.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");

export const SITE_NAME = (() => {
  try {
    return new URL(SITE_URL).hostname.replace(/^www\./, "");
  } catch {
    return "nolhan-dev.com";
  }
})();

export const SITE_EMAIL = "nolhan.colas@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nolhan-colas-90394121b";
export const GITHUB_URL = "https://github.com/nolhancolas-ctrl";
export const CAL_URL = "https://cal.com/nolhan/30min";

export function splitSiteName(siteName = SITE_NAME) {
  const separator = siteName.lastIndexOf(".");
  if (separator < 0) return { name: siteName, suffix: "" };
  return { name: siteName.slice(0, separator), suffix: siteName.slice(separator) };
}


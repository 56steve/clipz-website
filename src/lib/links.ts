/**
 * Canonical origin of this site. Set NEXT_PUBLIC_SITE_URL in the hosting
 * environment (for example https://clipz.studio) once a custom domain is
 * connected; until then the Vercel URL is used so canonical links, the sitemap
 * and social cards always point at a host that really serves this site.
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://clippz.vercel.app"
).replace(/\/+$/, "");

/** Latest published desktop release shown across the site. */
export const APP_VERSION = "0.1.4";

export const STORE_URL = "https://apps.microsoft.com/detail/9n02k65s7rmw";
export const STORE_APP_URL = "ms-windows-store://pdp/?productid=9N02K65S7RMW";
export const GITHUB_URL = "https://github.com/56steve/clipz";
export const RELEASES_URL = `${GITHUB_URL}/releases/latest`;
export const BUG_REPORT_URL = `${GITHUB_URL}/issues/new?title=${encodeURIComponent("Bug: ")}`;
export const FEATURE_REQUEST_URL = `${GITHUB_URL}/issues/new?title=${encodeURIComponent("Feature request: ")}`;
export const FEEDBACK_PATH = "/feedback";

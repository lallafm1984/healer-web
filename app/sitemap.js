import { siteUrl } from "../lib/site";
export default function sitemap() {
  return ["/", "/privacy/", "/terms/", "/delete-account/", "/support/"].map(
    (path) => ({ url: `${siteUrl}${path}`, lastModified: "2026-10-31" }),
  );
}

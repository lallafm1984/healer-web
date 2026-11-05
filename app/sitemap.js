import { siteUrl } from "../lib/site";
import { languages, localizedHref } from "../lib/locale";
import { publicRoutes } from "../lib/routes";
export default function sitemap() {
  return publicRoutes.flatMap((path) => languages.map((language) => ({
    url:`${siteUrl}${localizedHref(path, language)}`,
    alternates:{ languages:{
      ...Object.fromEntries(languages.map((lang) => [lang, `${siteUrl}${localizedHref(path, lang)}`])),
      "x-default":`${siteUrl}${path}`,
    } },
    ...(["/", "/wow-healer/"].includes(path) ? {lastModified:"2026-11-05"} : {}),
  })));
}

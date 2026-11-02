import { localizedHref } from "./locale.js";
const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  process.env.SITE_URL ||
  (hostname ? `https://${hostname}` : "http://localhost:4326")
).replace(/\/$/, "");
export const siteName = "나혼자 힐러 · Solo Healer";
export function pageMetadata(title, description, path, language = "ko") {
  const localizedPath = localizedHref(path, language);
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: { ko: localizedHref(path, "ko"), en: localizedHref(path, "en"), ja: localizedHref(path, "ja"), "x-default": path },
    },
    openGraph: {
      type: "website",
      locale: { ko: "ko_KR", en: "en_US", ja: "ja_JP" }[language],
      siteName: language === "ko" ? siteName : language === "ja" ? "ソロヒーラー · Solo Healer" : "Solo Healer",
      title,
      description,
      url: localizedPath,
      images: [
        {
          url: "/assets/hero-sanctuary.webp",
          width: 1944,
          height: 810,
          alt: language === "ko" ? "나혼자 힐러의 성역" : language === "ja" ? "ソロヒーラーの聖域" : "The sanctuary of Solo Healer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/hero-sanctuary.webp"],
    },
  };
}

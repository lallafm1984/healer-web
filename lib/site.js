const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  process.env.SITE_URL ||
  (hostname ? `https://${hostname}` : "http://localhost:4326")
).replace(/\/$/, "");
export const siteName = "나혼자 힐러 · Solo Healer";
export function pageMetadata(title, description, path) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName,
      title,
      description,
      url: path,
      images: [
        {
          url: "/assets/hero-sanctuary.webp",
          width: 1944,
          height: 810,
          alt: "나혼자 힐러의 성역",
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

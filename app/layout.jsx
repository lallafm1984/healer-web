import SiteChrome from "../components/site-chrome";
import { LocaleProvider } from "../components/locale-provider";
import { getLocale } from "../lib/locale-server";
import { siteName, siteUrl } from "../lib/site";
import "./globals.css";
import "./interactive.css";
import "./localization.css";
import "./store-badges.css";
import "./healer-guide.css";
const description =
  "Google Play 정식 출시. 탐험과 던전, 레이드에서 혼자 파티를 지키는 싱글 플레이 힐러 RPG. 지금 Android에서 나혼자 힐러를 만나보세요.";
export async function generateMetadata() {
  const { lang, t } = await getLocale();
  return {
  metadataBase: new URL(siteUrl),
  title: { default: t(siteName), template: `%s | ${t("나혼자 힐러")}` },
  description: t(description),
  openGraph: {
    type: "website",
    locale: { ko: "ko_KR", en: "en_US", ja: "ja_JP" }[lang],
    siteName: t(siteName),
    title: t(siteName),
    description: t(description),
    images: [
      {
        url: "/assets/hero-sanctuary.webp",
        width: 1944,
        height: 810,
        alt: t("나혼자 힐러의 성역"),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/hero-sanctuary.webp"],
  },
  icons: { icon: { url: "/assets/app-icon.png", type: "image/png" } },
  };
}
export const viewport = { themeColor: "#101e1e" };
export default async function RootLayout({ children }) {
  const { lang } = await getLocale();
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/assets/hahmlet-800.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LocaleProvider language={lang}><SiteChrome>{children}</SiteChrome></LocaleProvider>
      </body>
    </html>
  );
}

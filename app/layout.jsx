import SiteChrome from "../components/site-chrome";
import { LocaleProvider } from "../components/locale-provider";
import { getLocale } from "../lib/locale-server";
import { siteName, siteUrl } from "../lib/site";
import "./globals.css";
import "./interactive.css";
import "./localization.css";
const description =
  "파티의 마지막 희망은 당신의 손끝에. 7가지 힐러 직업으로 즐기는 싱글 플레이 RPG, 나혼자 힐러 공식 웹사이트.";
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

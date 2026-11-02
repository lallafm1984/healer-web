import SiteChrome from "../components/site-chrome";
import { siteName, siteUrl } from "../lib/site";
import "./globals.css";
import "./interactive.css";
const description =
  "파티의 마지막 희망은 당신의 손끝에. 7가지 힐러 직업으로 즐기는 싱글 플레이 RPG, 나혼자 힐러 공식 웹사이트.";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | 나혼자 힐러" },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName,
    title: siteName,
    description,
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
    images: ["/assets/hero-sanctuary.webp"],
  },
  icons: { icon: { url: "/assets/app-icon.png", type: "image/png" } },
};
export const viewport = { themeColor: "#101e1e" };
export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

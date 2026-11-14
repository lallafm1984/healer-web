"use client";
import { appStoreHref, googlePlayHref } from "../lib/game";
import { useLocale } from "./locale-provider";

const badgeWidths = { ko: 129.70071, en: 119.66407, ja: 108.85157 };

export default function StoreLinks({ className = "", compact = false }) {
  const { lang, t } = useLocale();
  return (
    <div className={`store-links ${compact ? "store-links-compact" : "store-links-badges"} ${className}`.trim()}>
      <a href={appStoreHref(lang)} aria-label={t("App Store에서 다운로드")}>
        {compact ? "App Store" : <img src={`/assets/app-store/badge-${lang}.svg`} width={badgeWidths[lang]} height="40" alt={t("App Store에서 다운로드")} />}
      </a>
      <a href={googlePlayHref(lang)} aria-label={t("Google Play에서 다운로드")}>
        {compact ? "Google Play" : <img src={`/assets/google-play/badge-${lang}.svg`} width="239" height="71" alt={t("Google Play에서 다운로드")} />}
      </a>
    </div>
  );
}

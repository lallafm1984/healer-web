"use client";
import { googlePlayHref } from "../lib/game";
import { useLocale } from "./locale-provider";

export default function GooglePlayBadge({ className = "" }) {
  const { lang, t } = useLocale();
  return (
    <a className={`google-play-badge ${className}`.trim()} href={googlePlayHref(lang)}>
      <img
        src={`/assets/google-play/badge-${lang}.svg`}
        width="239"
        height="71"
        alt={t("Google Play에서 다운로드")}
      />
    </a>
  );
}

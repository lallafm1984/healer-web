export const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.solohealer.game";
export const appStoreUrl = "https://apps.apple.com/app/id6832173570";

export function appStoreHref(language) {
  return `${appStoreUrl}?l=${{ ko: "ko", en: "en-US", ja: "ja" }[language] || "en-US"}`;
}

export function googlePlayHref(language) {
  return `${googlePlayUrl}&hl=${language}`;
}

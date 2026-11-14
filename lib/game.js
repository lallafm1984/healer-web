export const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.solohealer.game";
const appStoreId = "6832173570";
const appStoreListings = { ko: ["kr", "나혼자-힐러"], en: ["us", "solo-healer"], ja: ["jp", "ソロヒーラー"] };

export function appStoreHref(language) {
  const [storefront, name] = appStoreListings[language] || appStoreListings.en;
  return `https://apps.apple.com/${storefront}/app/${encodeURIComponent(name)}/id${appStoreId}`;
}

export function googlePlayHref(language) {
  return `${googlePlayUrl}&hl=${language}`;
}

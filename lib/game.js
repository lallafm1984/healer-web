export const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.solohealer.game";

export function googlePlayHref(language) {
  return `${googlePlayUrl}&hl=${language}`;
}

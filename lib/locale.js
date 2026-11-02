export const languages = ["ko", "en", "ja"];
export const languageCookie = "healer-web.lang";
export const languageHeader = "x-healer-web-language";
export const languageNames = { ko: "한국어", en: "English", ja: "日本語" };
export function validLanguage(value) {
  return languages.includes(value) ? value : null;
}
export function browserLanguage(value = "") {
  const primary = (typeof value === "string" ? value : "").split(",")[0].split(";")[0].trim().toLowerCase();
  const code = primary.split(/[-_]/)[0];
  return code === "ko" || code === "ja" ? code : "en";
}
export function resolveLanguage(query, saved, browser) {
  return validLanguage(query) || validLanguage(saved) || browserLanguage(browser);
}
export function localizedHref(href, language) {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/assets/") || href.startsWith("/_next/")) return href;
  const url = new URL(href, "https://healer.invalid");
  url.searchParams.set("lang", validLanguage(language) || "en");
  return `${url.pathname}${url.search}${url.hash}`;
}

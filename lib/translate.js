import { messages } from "./messages.js";
import { localizedHref, validLanguage } from "./locale.js";

export function createLocale(language) {
  const lang = validLanguage(language) || "en";
  function t(key, values = {}) {
    let result = lang === "ko" ? key : (messages[lang][key] ?? key);
    for (const [name, value] of Object.entries(values)) result = result.replaceAll(`{${name}}`, String(value));
    return result;
  }
  return { lang, t, href: (path) => localizedHref(path, lang) };
}

"use client";
import { createContext, useContext, useMemo } from "react";
import { createLocale } from "../lib/translate";
const LocaleContext = createContext(null);
export function LocaleProvider({ language, children }) {
  const locale = useMemo(() => createLocale(language), [language]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  if (!locale) throw new Error("LocaleProvider is required");
  return locale;
}

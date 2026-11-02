"use client";
import { usePathname } from "next/navigation";
import { languageNames, languages, localizedHref } from "../lib/locale";
import { useLocale } from "./locale-provider";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { lang, t } = useLocale();
  return (
    <nav className="locale-switcher" aria-label={t("언어")}>
      {/* Full navigation refreshes the root document language and metadata. */}
      {languages.map((language) => (
        <a key={language} href={localizedHref(pathname, language)} hrefLang={language} lang={language} aria-current={lang === language ? "page" : undefined}>
          {languageNames[language]}
        </a>
      ))}
    </nav>
  );
}

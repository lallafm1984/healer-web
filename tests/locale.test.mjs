import test from "node:test";
import assert from "node:assert/strict";
import { browserLanguage, localizedHref, resolveLanguage } from "../lib/locale.js";
import { createLocale } from "../lib/translate.js";
import { classes } from "../lib/content.js";
import { legalSections } from "../lib/legal-content.js";

test("app query language wins over a different stored and device language", () => {
  for (const language of ["ko", "en", "ja"]) {
    assert.equal(resolveLanguage(language, language === "ko" ? "en" : "ko", "fr-FR"), language);
  }
});
test("fallback respects a valid saved choice, then the primary browser language", () => {
  assert.equal(resolveLanguage("invalid", "ja", "ko-KR"), "ja");
  assert.equal(resolveLanguage(null, "broken", "ko-KR,en;q=0.9"), "ko");
  assert.equal(resolveLanguage(null, null, "ja-JP"), "ja");
  for (const value of ["kok-IN", "fr-FR,ja-JP;q=0.9", "zh-TW", "en-US", "", null]) assert.equal(browserLanguage(value), "en");
  assert.equal(browserLanguage("KO_kr"), "ko");
});
test("internal URLs retain language without changing assets, mail, or external URLs", () => {
  assert.equal(localizedHref("/privacy/?from=app#rights", "ja"), "/privacy/?from=app&lang=ja#rights");
  assert.equal(localizedHref("/?lang=ko#classes", "en"), "/?lang=en#classes");
  for (const value of ["#rights", "/assets/app-icon.png", "mailto:4ltree.service@gmail.com", "https://www.4ltree.com/", "//www.4ltree.com/"]) assert.equal(localizedHref(value, "ja"), value);
});
test("both translations cover every healer field and every policy section", () => {
  for (const lang of ["en", "ja"]) {
    const locale = createLocale(lang);
    for (const item of classes) for (const field of ["name", "tag", "text", "skill", "style"]) {
      assert(!/[가-힣]/.test(locale.t(item[field])), `${lang}: ${item.key}.${field}`);
    }
    for (const kind of ["privacy", "terms"]) {
      const translated = legalSections(kind, locale);
      assert.deepEqual(translated.map(([id]) => id), legalSections(kind, createLocale("ko")).map(([id]) => id));
      for (const [, heading, html] of translated) {
        assert(!/[가-힣]/.test(heading + html));
        for (const [, href] of html.matchAll(/href="(\/[^\"]*)"/g)) assert.equal(new URL(href, "https://example.test").searchParams.get("lang"), lang);
      }
    }
  }
});
test("current legal documents describe anonymous auth and local progress without account-management links", () => {
  for (const lang of ["ko", "en", "ja"]) for (const kind of ["privacy", "terms"]) {
    const sections = legalSections(kind, createLocale(lang));
    assert(!JSON.stringify(sections).includes("/delete-account/"));
    if (kind === "privacy") assert(JSON.stringify(sections).includes("Supabase"));
  }
});

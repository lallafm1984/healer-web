import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { publicRoutes as routes } from "../lib/routes.js";
import { languages } from "../lib/locale.js";
import { healerGuide, healerGuideImage } from "../lib/healer-guide.js";
import { appStoreHref, googlePlayHref } from "../lib/game.js";

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value.replaceAll("&amp;", "&")]));
}
let server;
let serverLog = "";
let baseUrl = process.env.CHECK_BASE_URL;
const cache = new Map();
async function read(url) {
  if (!cache.has(url))
    cache.set(
      url,
      fetch(url, { headers: { "Accept-Language": "ko-KR" } }).then(async (response) => ({
        status: response.status,
        headers: response.headers,
        body: await response.text(),
      })),
    );
  return cache.get(url);
}
try {
  if (!baseUrl) {
    const listener = createServer();
    listener.listen(0, "127.0.0.1");
    await once(listener, "listening");
    const port = listener.address().port;
    await new Promise((resolve) => listener.close(resolve));
    baseUrl = `http://127.0.0.1:${port}`;
    server = spawn(
      process.execPath,
      [
        "node_modules/next/dist/bin/next",
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        String(port),
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    server.stdout.on("data", (chunk) => {
      serverLog += chunk;
    });
    server.stderr.on("data", (chunk) => {
      serverLog += chunk;
    });
    let ready = false;
    for (let attempt = 0; attempt < 200; attempt++) {
      if (server.exitCode !== null) throw Error(`Next.js exited: ${serverLog}`);
      try {
        if ((await fetch(baseUrl)).ok) {
          ready = true;
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert(ready, `Next.js did not become ready: ${serverLog}`);
  }
  const appAds = await fetch(new URL("/app-ads.txt", baseUrl), {
    redirect: "manual", headers: { "User-Agent": "Google-adstxt" },
  });
  assert.equal(appAds.status, 200, "app-ads.txt is directly available to the crawler");
  assert.match(appAds.headers.get("content-type") || "", /^text\/plain\b/i, "app-ads.txt is plain text");
  assert.equal((await appAds.text()).trim(), "google.com, pub-9163944262143117, DIRECT, f08c47fec0942fa0", "app-ads.txt matches the verified AdMob publisher account");
  let references = 0;
  for (const route of routes) {
    const url = new URL(route, baseUrl).href;
    const response = await read(url);
    assert.equal(response.status, 200, route);
    assert.equal(
      response.headers.get("x-content-type-options"),
      "nosniff",
      route,
    );
    assert.equal(response.headers.get("x-frame-options"), "DENY", route);
    assert.equal(response.headers.get("x-powered-by"), null, route);
    const html = response.body.replace(
      /<script\b[^>]*>[\s\S]*?<\/script>/g,
      "",
    );
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one h1`);
    assert(/<html\b[^>]*\slang="ko"(?:\s|>)/.test(html), `${route}: document language`);
    for (const tag of [
      'name="description"',
      'rel="canonical"',
      'property="og:image"',
      'property="og:url"',
      'name="twitter:card"',
    ])
      assert(html.includes(tag), `${route}: ${tag}`);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const link = match[1].replaceAll("&amp;", "&");
      if (/^(https?:|mailto:|data:)/.test(link)) continue;
      const targetUrl = new URL(link, url);
      const hash = targetUrl.hash.slice(1);
      targetUrl.hash = "";
      const target = await read(targetUrl.href);
      assert.equal(target.status, 200, `${route}: ${link}`);
      if (hash)
        assert(
          target.body.includes(`id="${hash}"`),
          `${route}: ${link} anchor`,
        );
      references++;
    }
    if (route === "/privacy/") {
      assert(
        html.includes("웹사이트 호스팅(Vercel)"),
        "Vercel hosting disclosure",
      );
      assert(
        !html.includes("웹사이트 호스팅(OpenAI"),
        "outdated hosting disclosure",
      );
    }
  }
  const sitemap = await read(new URL("/sitemap.xml", baseUrl).href);
  const robots = await read(new URL("/robots.txt", baseUrl).href);
  assert.equal(sitemap.status, 200);
  assert.equal(robots.status, 200);
  const sitemapEntries = [...sitemap.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => entry);
  assert.equal(sitemapEntries.length, routes.length * languages.length);
  const sitemapLocations = sitemapEntries.map((entry) => entry.match(/<loc>(.*?)<\/loc>/)?.[1]);
  assert.equal(new Set(sitemapLocations).size, sitemapLocations.length, "sitemap URLs are unique");
  for (const route of routes) for (const language of languages) {
    const entry = sitemapEntries.find((item) => {
      const url = new URL(item.match(/<loc>(.*?)<\/loc>/)[1]);
      return url.pathname === route && url.searchParams.get("lang") === language;
    });
    assert(entry, `sitemap includes self-canonical ${route} ${language}`);
    for (const alternate of [...languages, "x-default"]) assert(entry.includes(`hreflang="${alternate}"`), `sitemap language alternative ${alternate}`);
  }
  assert(robots.body.includes("Sitemap:"));
  const missing = await read(
    new URL("/this-page-does-not-exist/", baseUrl).href,
  );
  assert.equal(missing.status, 404);
  assert(missing.body.includes("길을 잠시 벗어났습니다."));
  assert(missing.body.includes("noindex"));
  for (const lang of ["ko", "en", "ja"]) {
    const removed = await read(new URL(`/delete-account/?lang=${lang}`, baseUrl).href);
    assert.equal(removed.status, 404, `retired deletion page: ${lang}`);
  }
  let localizedPages = 0;
  for (const lang of ["ko", "en", "ja"]) {
    for (const route of routes) {
      const url = new URL(route, baseUrl);
      url.searchParams.set("lang", lang);
      const response = await fetch(url, { headers: {
        "Accept-Language": "fr-FR", Cookie: `healer-web.lang=${lang === "ko" ? "ja" : "ko"}`,
        "x-healer-web-language": lang === "ja" ? "ko" : "ja",
      } });
      const source = await response.text();
      const html = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
      assert.equal(response.status, 200, `${route} ${lang}`);
      assert.equal(response.headers.get("content-language"), lang);
      assert(new RegExp(`<html\\b[^>]*\\slang="${lang}"(?:\\s|>)`).test(html), `${route}: initial HTML ${lang}`);
      assert(response.headers.get("set-cookie")?.includes(`healer-web.lang=${lang}`), "app choice updates saved web language");
      const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
      const canonical = new URL(links.find((link) => link.rel === "canonical").href);
      assert.equal(canonical.pathname, route, `${route}: canonical path`);
      assert.equal(canonical.searchParams.get("lang"), lang, `${route}: self-canonical language`);
      for (const alternate of [...languages, "x-default"]) {
        const link = links.find((item) => item.rel === "alternate" && item.hreflang === alternate);
        assert(link, `${route}: hreflang ${alternate}`);
        const target = new URL(link.href);
        assert.equal(target.pathname, route, `${route}: language alternative path`);
        assert.equal(target.searchParams.get("lang"), alternate === "x-default" ? null : alternate);
      }
      const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
      assert.equal(metadata.find((item) => item.property === "og:url").content, canonical.href, `${route}: canonical and OG URL agree`);
      const storeLinks = [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag));
      for (const storeHref of [appStoreHref(lang), googlePlayHref(lang)]) {
        assert(storeLinks.some((link) => link.href === storeHref && link["aria-label"]), `${route} ${lang}: accessible localized store link ${storeHref}`);
      }
      if (route === "/" || route === "/wow-healer/") {
        assert(html.includes(`/assets/app-store/badge-${lang}.svg`), `${route} ${lang}: App Store badge`);
        assert(html.includes(`/assets/google-play/badge-${lang}.svg`), `${route} ${lang}: Google Play badge`);
        assert(metadata.find((item) => item.name === "description").content.includes("iPhone"), `${route} ${lang}: iPhone availability in search description`);
      }
      if (route === "/wow-healer/") {
        assert(html.includes(healerGuide[lang].heading[0]), "localized guide heading is server rendered");
        assert(html.includes(healerGuide[lang].independent), "independent-game disclosure is visible");
        assert.equal(new URL(metadata.find((item) => item.property === "og:image").content).pathname, healerGuideImage);
        const game = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
        assert.equal(game["@type"], "VideoGame");
        assert.equal(game.inLanguage, lang);
        assert.equal(game.url, canonical.href);
        assert.deepEqual(game.gamePlatform, ["iOS", "Android"]);
        assert.deepEqual(game.sameAs, [appStoreHref(lang), googlePlayHref(lang)]);
      }
      if (lang !== "ko") {
        const withoutNativeLanguageName = html.replace(/<a\b[^>]*\slang="ko"[^>]*>[\s\S]*?<\/a>/g, "");
        assert(!/[가-힣]/.test(withoutNativeLanguageName), `${route}: untranslated Korean in ${lang}`);
      }
      for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
        const path = tag.match(/\shref="(\/[^\"]*)"/)?.[1];
        if (!path || path.startsWith("/assets/")) continue;
        // Language-switch links intentionally target a different language.
        if (/href[Ll]ang=/.test(tag)) continue;
        assert.equal(new URL(path.replaceAll("&amp;", "&"), baseUrl).searchParams.get("lang"), lang, `${route}: ${path}`);
      }
      assert(!html.includes("/delete-account/"), `${route}: no retired account link`);
      localizedPages++;
    }
  }
  for (const [cookie, browser, expected] of [["ja", "ko-KR", "ja"], ["broken", "kok-IN", "en"], ["", "fr-FR,ja;q=0.8", "en"], ["", "ja-JP", "ja"], ["", "ko-KR", "ko"]]) {
    const response = await fetch(new URL("/privacy/?lang=invalid", baseUrl), { headers: { Cookie: `healer-web.lang=${cookie}`, "Accept-Language": browser } });
    assert.equal(response.headers.get("content-language"), expected, "invalid query uses saved or primary browser language");
  }
  console.log(
    `Passed: app-ads.txt publisher verification; ${routes.length} pages, ${references} local references, SEO, security, sitemap, 404; ${localizedPages} localized pages, query priority, fallback, internal links and retired-route checks.`,
  );
} finally {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await once(server, "exit");
  }
}

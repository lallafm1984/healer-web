import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";

const routes = ["/", "/privacy/", "/terms/", "/delete-account/", "/support/"];
let server;
let serverLog = "";
let baseUrl = process.env.CHECK_BASE_URL;
const cache = new Map();
async function read(url) {
  if (!cache.has(url))
    cache.set(
      url,
      fetch(url).then(async (response) => ({
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
  assert.equal((sitemap.body.match(/<loc>/g) || []).length, routes.length);
  assert(robots.body.includes("Sitemap:"));
  const missing = await read(
    new URL("/this-page-does-not-exist/", baseUrl).href,
  );
  assert.equal(missing.status, 404);
  assert(missing.body.includes("길을 잠시 벗어났습니다."));
  assert(missing.body.includes("noindex"));
  console.log(
    `Passed: ${routes.length} pages, ${references} local references, SEO metadata, security headers, sitemap, robots and custom 404.`,
  );
} finally {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await once(server, "exit");
  }
}

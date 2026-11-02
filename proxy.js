import { NextResponse } from "next/server";
import { languageCookie, languageHeader, resolveLanguage, validLanguage } from "./lib/locale";

export function proxy(request) {
  const requested = validLanguage(request.nextUrl.searchParams.get("lang"));
  const saved = request.cookies.get(languageCookie)?.value;
  const language = resolveLanguage(requested, saved, request.headers.get("accept-language") || "");
  const headers = new Headers(request.headers);
  // Always replace the incoming value; only the validated contract reaches rendering.
  headers.set(languageHeader, language);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Language", language);
  if (requested && requested !== saved) {
    response.cookies.set(languageCookie, requested, {
      path: "/", maxAge: 60 * 60 * 24 * 180, sameSite: "lax",
      httpOnly: true, secure: request.nextUrl.protocol === "https:",
    });
  }
  return response;
}
export const config = {
  matcher: ["/((?!_next/|assets/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

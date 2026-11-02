import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { languageHeader } from "./locale";
import { createLocale } from "./translate";
import { pageMetadata } from "./site";
export const getLocale = cache(async () => createLocale((await headers()).get(languageHeader)));
export async function localizedMetadata(title, description, path) {
  const { lang, t } = await getLocale();
  return pageMetadata(t(title), t(description), path, lang);
}

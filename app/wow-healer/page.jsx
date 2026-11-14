import HealerGuide from "../../components/healer-guide";
import { getLocale } from "../../lib/locale-server";
import { pageMetadata, siteUrl } from "../../lib/site";
import { localizedHref } from "../../lib/locale";
import { appStoreHref, googlePlayHref } from "../../lib/game";
import { healerGuide, healerGuideImage, healerGuidePath } from "../../lib/healer-guide";

export async function generateMetadata() {
  const { lang } = await getLocale();
  const copy = healerGuide[lang];
  const metadata = pageMetadata(copy.title, copy.description, healerGuidePath, lang);
  return {
    ...metadata,
    title: { absolute:copy.title },
    openGraph: { ...metadata.openGraph, images:[{url:healerGuideImage, width:1920, height:800, alt:copy.artCaption}] },
    twitter: { ...metadata.twitter, images:[healerGuideImage] },
  };
}

export default async function HealerGuidePage() {
  const { lang, t } = await getLocale();
  const copy = healerGuide[lang];
  const game = {
    "@context":"https://schema.org", "@type":"VideoGame",
    name:t("나혼자 힐러: 던전 레이드 RPG"), description:copy.description,
    url:`${siteUrl}${localizedHref(healerGuidePath, lang)}`,
    image:`${siteUrl}${healerGuideImage}`, inLanguage:lang,
    gamePlatform:["iOS", "Android"], playMode:"https://schema.org/SinglePlayer",
    author:{ "@type":"Organization", name:"4LTree", url:"https://www.4ltree.com/" },
    sameAs:[appStoreHref(lang), googlePlayHref(lang)],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(game).replaceAll("<", "\\u003c")}} /><HealerGuide copy={copy} language={lang} /></>;
}

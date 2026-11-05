"use client";
import { healerGuide, healerGuideImage, healerGuidePath } from "../lib/healer-guide";
import { useLocale } from "./locale-provider";
import { Arrow } from "./icons";

export default function HealerInvitation() {
  const { lang, href } = useLocale();
  const copy = healerGuide[lang];
  return (
    <section className="healer-invitation" aria-labelledby="healer-invitation-title">
      <img src={healerGuideImage} width="1920" height="800" alt="" loading="lazy" />
      <div className="container">
        <h2 id="healer-invitation-title">{copy.invitationHeading[0]}<br /><em>{copy.invitationHeading[1]}</em></h2>
        <p>{copy.invitationText}</p>
        <a className="text-link" href={href(healerGuidePath)}>{copy.invitationLink}<Arrow /></a>
      </div>
      <span className="invitation-art-caption">{copy.artCaption}</span>
    </section>
  );
}

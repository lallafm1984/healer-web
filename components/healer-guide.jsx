"use client";
import { useEffect, useRef, useState } from "react";
import { guideScreenshot, healerGuideImage } from "../lib/healer-guide";
import { localizedHref } from "../lib/locale";
import StoreLinks from "./store-links";
import { Arrow, Expand } from "./icons";

function Lines({ lines }) {
  return <>{lines[0]}<br /><em>{lines[1]}</em></>;
}

function Screenshot({ kind, copy, language, onOpen, hero = false }) {
  return (
    <figure className={`guide-screenshot${hero ? " guide-hero-proof" : ""}`}>
      <button type="button" aria-haspopup="dialog" aria-label={`${copy.screenshotNames[kind]} · ${copy.enlarge}`} onClick={(event) => onOpen(kind, event.currentTarget)}>
        <img src={guideScreenshot(language, kind)} alt={copy.screenshotAlt[kind]} width="540" height={kind === "raid" ? "960" : "1170"} loading={hero ? "eager" : "lazy"} />
        <span className="guide-image-action"><Expand />{copy.enlarge}</span>
      </button>
      <figcaption>{copy.gameCaption}<span>{copy.screenshotNames[kind]}</span></figcaption>
    </figure>
  );
}

export default function HealerGuide({ copy, language }) {
  const [activeShot, setActiveShot] = useState("battle");
  const dialog = useRef(null);
  const trigger = useRef(null);
  const media = useRef(null);
  useEffect(() => () => document.body.classList.remove("dialog-open"), []);
  useEffect(() => { media.current?.scrollTo({ top:0, behavior:"instant" }); }, [activeShot]);
  function openScreenshot(kind, button) {
    trigger.current = button;
    setActiveShot(kind);
    dialog.current.showModal();
    media.current?.scrollTo({ top:0, behavior:"instant" });
    document.body.classList.add("dialog-open");
  }
  function restoreFocus() {
    document.body.classList.remove("dialog-open");
    trigger.current?.focus({ preventScroll:true });
  }
  return (
    <article className="healer-guide">
      <section className="guide-hero" aria-labelledby="guide-title">
        <img className="guide-hero-art" src={healerGuideImage} width="1920" height="800" alt="" fetchPriority="high" />
        <div className="container guide-hero-layout">
          <div className="guide-hero-copy">
            <h1 id="guide-title"><Lines lines={copy.heading} /></h1>
            <p className="guide-lead">{copy.lead}</p>
            <div className="guide-hero-actions">
              <StoreLinks />
              <a className="text-link" href="#healing-decisions">{copy.explore}<Arrow /></a>
            </div>
            <p className="guide-independent">{copy.independent}</p>
          </div>
          <Screenshot kind="battle" copy={copy} language={language} onOpen={openScreenshot} hero />
        </div>
        <p className="guide-art-credit">{copy.artCaption}</p>
      </section>

      <section className="guide-section guide-combat" id="healing-decisions" aria-labelledby="guide-combat-title">
        <div className="container guide-combat-layout">
          <div className="guide-combat-copy">
            <h2 id="guide-combat-title"><Lines lines={copy.combatHeading} /></h2>
            <p className="guide-section-intro">{copy.combatIntro}</p>
            <div className="guide-decisions">
              {copy.decisions.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}
            </div>
          </div>
          <Screenshot kind="raid" copy={copy} language={language} onOpen={openScreenshot} />
        </div>
      </section>

      <section className="guide-section guide-growth" aria-labelledby="guide-growth-title">
        <div className="container">
          <h2 id="guide-growth-title"><Lines lines={copy.growthHeading} /></h2>
          <div className="guide-feature guide-equipment">
            <div className="guide-feature-copy"><h3>{copy.equipmentHeading}</h3><p>{copy.equipmentText}</p></div>
            <div className="guide-feature-stage">
              <img className="guide-feature-world" src="/assets/scene-abbey-altar.webp" width="1024" height="1536" alt="" loading="lazy" />
              <Screenshot kind="equipment" copy={copy} language={language} onOpen={openScreenshot} />
            </div>
          </div>
          <div className="guide-feature guide-guild">
            <div className="guide-feature-copy"><h3>{copy.guildHeading}</h3><p>{copy.guildText}</p></div>
            <div className="guide-feature-stage">
              <img className="guide-feature-world" src="/assets/scene-sanctuary.webp" width="1024" height="1536" alt="" loading="lazy" />
              <Screenshot kind="guild" copy={copy} language={language} onOpen={openScreenshot} />
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section guide-faq" aria-labelledby="guide-faq-title">
        <div className="container guide-faq-layout">
          <h2 id="guide-faq-title">{copy.faqHeading}</h2>
          <div>{copy.faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="guide-section guide-finale" aria-labelledby="guide-final-title">
        <div className="container">
          <img src="/assets/app-icon.png" width="72" height="72" alt="" loading="lazy" />
          <h2 id="guide-final-title"><Lines lines={copy.finalHeading} /></h2>
          <p>{copy.finalText}</p>
          <StoreLinks />
          <p className="guide-platform">{copy.platform}</p>
          <a className="text-link" href={localizedHref("/#gameplay", language)}>{copy.homeLink}<Arrow /></a>
        </div>
      </section>

      <dialog ref={dialog} className="guide-lightbox" aria-labelledby="guide-lightbox-title" onClose={restoreFocus} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
        <div className="guide-lightbox-header"><h2 id="guide-lightbox-title">{copy.screenshotNames[activeShot]}</h2><button type="button" onClick={() => dialog.current.close()}>{copy.close}</button></div>
        <div className="guide-lightbox-media" ref={media}><img src={guideScreenshot(language, activeShot)} width="540" height={activeShot === "raid" ? "960" : "1170"} alt={copy.screenshotAlt[activeShot]} /></div>
      </dialog>
    </article>
  );
}

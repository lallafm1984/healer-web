"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { classes } from "../lib/content";
import { Arrow, Expand } from "./icons";
import { useLandingMotion } from "./use-landing-motion";
const themes = {
  priest: { scene: "abbey-altar", color: "#e2c382", label: "성역의 빛" },
  druid: { scene: "rootwood-greenhouse", color: "#a8d3a0", label: "숲의 숨결" },
  paladin: { scene: "cathedral", color: "#edcc87", label: "수호의 맹세" },
  shaman: { scene: "oasis", color: "#8bcbd5", label: "회복의 물결" },
  monk: { scene: "lotusway", color: "#91d9bd", label: "고요한 안개" },
  astrologer: { scene: "school", color: "#b6b9f2", label: "별빛의 인도" },
  warder: { scene: "crystal-field", color: "#c5acf1", label: "빛의 결계" },
};
const scenes = [
  {
    key: "battle",
    name: "전투",
    en: "THE BATTLE",
    title: "한 번의 치유가,\n모든 것을 바꾼다.",
    text: "지켜야 할 동료와 다가오는 공격. 체력과 마나, 해제와 보호기를 살피며 가장 중요한 순간을 선택하십시오.",
    detail: "동료 선택 · 치유 · 해제 · 보호",
    background: "crystal-field",
    alt: "사제가 멈춘 심장 속에서 동료를 회복하는 실제 전투 화면",
  },
  {
    key: "equipment",
    name: "장비와 특성",
    en: "YOUR BUILD",
    title: "당신만의 방식으로,\n더 강한 힐러로.",
    text: "새로운 장비를 발견하고 능력과 특성을 조합합니다. 다음 전투를 준비하는 시간도 모험의 일부입니다.",
    detail: "전리품 발견 · 장비 선택 · 특성 조합",
    background: "abbey-altar",
    alt: "나혼자 힐러의 장비 상세와 능력치 화면",
  },
  {
    key: "guild",
    name: "길드와 동료",
    en: "YOUR COMPANIONS",
    title: "혼자 떠나지만,\n함께 강해진다.",
    text: "길드원을 모집하고 육성하며 나만의 파티를 만듭니다. 서로 다른 개성을 가진 동료들과 더 깊은 던전으로 향하십시오.",
    detail: "길드원 모집 · 동료 육성 · 파티 편성",
    background: "sanctuary",
    alt: "길드의 성장과 동료 육성 콘텐츠를 보여주는 실제 게임 화면",
  },
];

const pad = (number) => String(number).padStart(2, "0");
const wrap = (index, count) => (index + count) % count;
const screenshot = (scene) =>
  `/assets/screenshot-${scene.key === "battle" ? "battle-priest" : scene.key}.webp`;
function onTabKey(event, index, count, select) {
  const positions = {
    ArrowRight: index + 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: count - 1,
  };
  if (event.key in positions) {
    event.preventDefault();
    select(wrap(positions[event.key], count));
  }
}
export default function HomeExperience() {
  const [classIndex, setClassIndex] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const classTabs = useRef([]);
  const sceneTabs = useRef([]);
  const dialogRef = useRef(null);
  const dialogMedia = useRef(null);
  const returnFocus = useRef(null);
  const heroRef = useRef(null);
  const reducedMotion = useLandingMotion(heroRef, paused);
  useEffect(() => () => document.body.classList.remove("dialog-open"), []);
  useEffect(() => {
    dialogMedia.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [sceneIndex]);
  function selectClass(index, focus = false) {
    const next = wrap(index, classes.length);
    setClassIndex(next);
    const tab = classTabs.current[next];
    if (focus) tab?.focus({ preventScroll: true });
    if (tab) {
      const list = tab.parentElement;
      list.scrollTo({
        left:
          tab.offsetLeft -
          list.offsetLeft -
          (list.clientWidth - tab.clientWidth) / 2,
        behavior: paused || reducedMotion ? "instant" : "smooth",
      });
    }
  }
  function selectScene(index, focus = false) {
    const next = wrap(index, scenes.length);
    setSceneIndex(next);
    if (focus) sceneTabs.current[next]?.focus({ preventScroll: true });
  }
  function openScreenshot(index, trigger) {
    returnFocus.current = trigger;
    selectScene(index);
    dialogRef.current.showModal();
    dialogMedia.current?.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.add("dialog-open");
  }
  function restoreScreenshotFocus() {
    document.body.classList.remove("dialog-open");
    const trigger = returnFocus.current;
    const target = trigger?.isConnected && trigger.getClientRects().length
      ? trigger
      : sceneTabs.current[sceneIndex];
    target?.focus({ preventScroll: true });
  }
  return (
    <>
      <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
        <div className="hero-scene">
          <img
            className="hero-art"
            src="/assets/hero-sanctuary.webp"
            alt=""
            fetchPriority="high"
            width="1944"
            height="810"
          />
        </div>
        <div className="hero-shade"></div>
        <img
          className="hero-bloom"
          src="/assets/fx-title-sunbloom-v1.webp"
          width="768"
          height="768"
          alt=""
          aria-hidden="true"
        />
        <div className="container hero-layout">
          <div className="hero-content">
            <h1 id="hero-title">나는 <em>힐러</em>가 된다.</h1>
            <p className="hero-pretitle">모두가 용사가 될 때,</p>
            <p className="hero-description">
              흔들리는 체력, 다가오는 일격.<br />{" "}
              당신의 치유로 이어지는 우리 파티의 모험.
            </p>
            <div className="hero-actions">
              <a className="button gold" href="#classes">나의 힐러 발견하기 <Arrow /></a>
              <a className="text-link" href="#gameplay">전투 살펴보기 <Arrow /></a>
            </div>
            <div className="hero-meta">
              <span>Android</span><i aria-hidden="true" /><span>싱글 플레이 RPG</span>
              <i aria-hidden="true" /><span>Google Play 곧 출시</span>
            </div>
          </div>
          <button
            className="hero-preview"
            type="button"
            aria-label="사제 전투 화면 확대"
            aria-haspopup="dialog"
            onClick={(event) => openScreenshot(0, event.currentTarget)}
          >
            <span className="hero-phone">
              <img src="/assets/screenshot-battle-priest.webp" width="540" height="1170" alt="사제 직업의 실제 전투 화면" />
            </span>
            <span className="hero-preview-caption">전투 화면 확대 <Expand /></span>
          </button>
        </div>
        <div className="hero-bottom">
          <a href="#story" className="journey-link">
            모험 둘러보기 <Arrow />
          </a>
          <button
            type="button"
            className="motion-toggle"
            aria-pressed={paused || reducedMotion}
            disabled={reducedMotion}
            onClick={() => setPaused(!paused)}
          >
            {reducedMotion
              ? "움직임 줄임"
              : paused
                ? "움직임 켜기"
                : "움직임 끄기"}
          </button>
        </div>
      </section>
      <nav className="chapter-nav" aria-label="모험 둘러보기">
        <div className="container">
          <a href="#story">모험</a><a href="#classes">직업</a>
          <a href="#gameplay">플레이</a><a href="#release">곧 출시</a>
        </div>
      </nav>
      <section id="story" className="story section">
        <div className="container">
          <div className="section-intro reveal">
            <div>
              <h2>
                파티의 마지막 희망은
                <br />
                <em>당신의 손끝에.</em>
              </h2>
            </div>
            <p className="section-summary">
              혼자 즐기지만, 혼자가 아닌 모험.
              <br />
              치유의 순간을 선택하고,
              <br />
              동료들과 함께 성장하십시오.
            </p>
          </div>
          <div className="journey-cards">
            <a
              href="#gameplay"
              className="journey-card reveal"
              onClick={() => selectScene(0)}
            >
              <img
                src="/assets/scene-crystal-field.webp"
                alt=""
                width="540"
                height="360"
                loading="lazy"
              />
              <div className="journey-card-body">
                <h3>위기를 읽고, 생명을 잇다.</h3>
                <p>
                  누구를 먼저 살릴지.
                  <br />
                  당신의 판단이 파티를 지킵니다.
                </p>
                <span className="journey-card-link">
                  전투 살펴보기 <Arrow />
                </span>
              </div>
            </a>
            <a
              href="#gameplay"
              className="journey-card reveal"
              onClick={() => selectScene(1)}
            >
              <img
                src="/assets/scene-abbey-altar.webp"
                alt=""
                width="540"
                height="810"
                loading="lazy"
              />
              <div className="journey-card-body">
                <h3>나만의 치유를 완성하다.</h3>
                <p>
                  장비를 고르고 특성을 다듬습니다.
                  <br />
                  다음 도전을 준비하십시오.
                </p>
                <span className="journey-card-link">
                  성장 살펴보기 <Arrow />
                </span>
              </div>
            </a>
            <a
              href="#gameplay"
              className="journey-card reveal"
              onClick={() => selectScene(2)}
            >
              <img
                src="/assets/scene-sanctuary.webp"
                alt=""
                width="1024"
                height="1536"
                loading="lazy"
              />
              <div className="journey-card-body">
                <h3>동료와 더 멀리 나아가다.</h3>
                <p>
                  개성 있는 길드원을 육성하고
                  <br />
                  당신만의 파티를 만듭니다.
                </p>
                <span className="journey-card-link">
                  길드 살펴보기 <Arrow />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section id="classes" className="classes-section section">
        <div className="container">
          <div className="section-heading reveal">
            <h2>
              같은 치유, <em>일곱 가지 방식.</em>
            </h2>
            <p>직업을 선택하고 당신의 치유 방식을 발견하십시오.</p>
          </div>
          <div
            className="class-tabs"
            role="tablist"
            aria-label="힐러 직업 선택"
          >
            {classes.map((c, i) => (
              <button
                key={c.key}
                ref={(el) => {
                  classTabs.current[i] = el;
                }}
                id={`tab-${c.key}`}
                className={`class-tab${classIndex === i ? " selected" : ""}`}
                role="tab"
                type="button"
                aria-selected={classIndex === i}
                aria-controls={`panel-${c.key}`}
                tabIndex={classIndex === i ? 0 : -1}
                onClick={() => selectClass(i)}
                onKeyDown={(event) =>
                  onTabKey(event, i, classes.length, (index) =>
                    selectClass(index, true),
                  )
                }
              >
                <img
                  src={`/assets/emblem-${c.key}.webp`}
                  width="54"
                  height="54"
                  alt=""
                  loading="lazy"
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
          <div className="class-stage">
            {classes.map((c, i) => (
              <div
                key={c.key}
                className="class-panel"
                id={`panel-${c.key}`}
                role="tabpanel"
                aria-labelledby={`tab-${c.key}`}
                style={{ "--class-color": themes[c.key].color }}
                hidden={classIndex !== i}
              >
                <img
                  className="class-world"
                  src={`/assets/scene-${themes[c.key].scene}.webp`}
                  alt=""
                  width="540"
                  height="360"
                  loading="lazy"
                />
                <div className="class-world-shade" />
                <div className="class-copy">
                  <h3>{c.name}</h3>
                  <p className="class-tag">{c.tag}</p>
                  <p className="class-description">{c.text}</p>
                  <div className="class-details">
                    <span>
                      고유 시스템<strong>{c.skill}</strong>
                    </span>
                    <span>
                      플레이 스타일<strong>{c.style}</strong>
                    </span>
                  </div>
                  <a className="class-explore" href="#gameplay">
                    모험 속으로 <Arrow />
                  </a>
                </div>
                <div className="class-emblem">
                  <span className="class-world-label">
                    {themes[c.key].label}
                  </span>
                  <img
                    src={`/assets/emblem-${c.key}.webp`}
                    alt={`${c.name}의 직업 문양`}
                    width="256"
                    height="256"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
            <div className="class-navigation">
              <button
                type="button"
                className="round-nav previous"
                onClick={() => selectClass(classIndex - 1)}
                aria-label="이전 직업"
              >
                <Arrow />
              </button>
              <p>
                <span id="class-count" aria-live="polite">
                  {pad(classIndex + 1)}
                </span>
                <span className="count-divider">/</span>07
              </p>
              <button
                type="button"
                className="round-nav"
                onClick={() => selectClass(classIndex + 1)}
                aria-label="다음 직업"
              >
                <Arrow />
              </button>
            </div>
          </div>
          <p className="class-footnote">
            직업은 게임 내 성장·해금 조건에 따라 이용할 수 있습니다.
          </p>
        </div>
      </section>
      <section id="gameplay" className="gameplay section">
        <div className="container">
          <div className="section-intro reveal">
            <div>
              <h2>
                보는 순간부터,
                <br />
                <em>시작되는 모험.</em>
              </h2>
            </div>
            <p className="section-summary">
              전투, 성장, 그리고 동료.
              <br />
              궁금한 장면을 골라 살펴보십시오.
            </p>
          </div>
          <div
            className="showcase-tabs"
            role="tablist"
            aria-label="플레이 장면 선택"
          >
            {scenes.map((s, i) => (
              <button
                key={s.key}
                ref={(el) => {
                  sceneTabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`scene-tab-${s.key}`}
                aria-controls={`scene-${s.key}`}
                aria-selected={sceneIndex === i}
                tabIndex={sceneIndex === i ? 0 : -1}
                onClick={() => selectScene(i)}
                onKeyDown={(event) =>
                  onTabKey(event, i, scenes.length, (index) =>
                    selectScene(index, true),
                  )
                }
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="showcase-stage">
            {scenes.map((s, i) => (
              <div
                key={s.key}
                className="showcase-panel"
                role="tabpanel"
                id={`scene-${s.key}`}
                aria-labelledby={`scene-tab-${s.key}`}
                hidden={sceneIndex !== i}
              >
                <img
                  className="showcase-world"
                  src={`/assets/scene-${s.background}.webp`}
                  alt=""
                  width="540"
                  height="360"
                  loading="lazy"
                />
                <div className="showcase-copy">
                  <h3>
                    {s.title.split("\n").map((line, index) => (
                      <Fragment key={line}>
                        {index > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </h3>
                  <p className="showcase-description">{s.text}</p>
                  <span className="showcase-detail">{s.detail}</span>
                  <button
                    className="button outline"
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => openScreenshot(i, event.currentTarget)}
                  >
                    플레이 화면 확대 <Expand />
                  </button>
                </div>
                <button
                  className="showcase-screen"
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(event) => openScreenshot(i, event.currentTarget)}
                  aria-label={`${s.name} 플레이 화면 크게 보기`}
                >
                  <div className="phone-frame">
                    <img
                      src={screenshot(s)}
                      width="540"
                      height="1170"
                      alt={s.alt}
                      loading="lazy"
                    />
                  </div>
                  <span>
                    화면 확대 <Expand />
                  </span>
                </button>
              </div>
            ))}
            <div className="showcase-navigation">
              <button
                type="button"
                className="round-nav previous"
                onClick={() => selectScene(sceneIndex - 1)}
                aria-label="이전 플레이 장면"
              >
                <Arrow />
              </button>
              <span id="scene-count" aria-live="polite">
                {pad(sceneIndex + 1)} / 03
              </span>
              <button
                type="button"
                className="round-nav"
                onClick={() => selectScene(sceneIndex + 1)}
                aria-label="다음 플레이 장면"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="support-band">
        <div className="container reveal">
          <div>
            <h2>모험 중 도움이 필요할 때.</h2>
            <p>게임 문의부터 계정과 개인정보 관리까지.</p>
          </div>
          <a className="button outline" href="/support/">
            고객지원 <Arrow />
          </a>
        </div>
      </section>
      <section id="release" className="release section">
        <img
          className="release-world"
          src="/assets/hero-sanctuary.webp"
          alt=""
          width="1944"
          height="810"
          loading="lazy"
        />
        <div className="container release-content reveal">
          <img
            src="/assets/app-icon.png"
            width="84"
            height="84"
            alt="나혼자 힐러 앱 아이콘"
            loading="lazy"
          />
          <h2>
            당신의 치유가,
            <br />
            <em>모험의 시작.</em>
          </h2>
          <p>나혼자 힐러 · Solo Healer</p>
          <div className="release-pill">
            <span className="status-dot"></span> Google Play · 곧 출시
          </div>
          <a className="text-link" href="#classes">
            나의 힐러 다시 살펴보기 <Arrow />
          </a>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        id="screenshot-dialog"
        aria-labelledby="lightbox-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
        onClose={restoreScreenshotFocus}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            selectScene(sceneIndex + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}
      >
        <div className="lightbox-header">
          <h2 id="lightbox-title">{scenes[sceneIndex].name} 화면</h2>
          <button
            className="dialog-close"
            type="button"
            aria-label="확대 화면 닫기"
            onClick={() => dialogRef.current.close()}
          >
            닫기
          </button>
        </div>
        <div className="lightbox-media" ref={dialogMedia} tabIndex={0} role="region" aria-label="게임 화면 이미지">
          <img
            id="dialog-image"
            src={screenshot(scenes[sceneIndex])}
            alt={scenes[sceneIndex].alt}
            width="540"
            height="1170"
          />
        </div>
        <div className="lightbox-navigation">
          <button
            type="button"
            onClick={() => selectScene(sceneIndex - 1)}
            aria-label="이전 확대 화면"
          >
            이전
          </button>
          <span id="lightbox-count" aria-live="polite">{pad(sceneIndex + 1)} / 03</span>
          <button
            type="button"
            onClick={() => selectScene(sceneIndex + 1)}
            aria-label="다음 확대 화면"
          >
            다음
          </button>
        </div>
      </dialog>
    </>
  );
}

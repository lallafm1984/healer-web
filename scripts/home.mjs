import { classes } from './content.mjs';

const themes = {
  priest: { scene:'abbey-altar',color:'#e2c382',label:'성역의 빛' },
  druid: { scene:'rootwood-greenhouse',color:'#a8d3a0',label:'숲의 숨결' },
  paladin: { scene:'cathedral',color:'#edcc87',label:'수호의 맹세' },
  shaman: { scene:'oasis',color:'#8bcbd5',label:'회복의 물결' },
  monk: { scene:'lotusway',color:'#91d9bd',label:'고요한 안개' },
  astrologer: { scene:'school',color:'#b6b9f2',label:'별빛의 인도' },
  warder: { scene:'crystal-field',color:'#c5acf1',label:'빛의 결계' },
};
export const scenes = [
  {key:'battle',name:'전투',en:'THE BATTLE',title:'한 번의 치유가,\n모든 것을 바꾼다.',text:'지켜야 할 동료와 다가오는 공격. 체력과 마나, 해제와 보호기를 살피며 가장 중요한 순간을 선택하십시오.',detail:'동료 선택 · 치유 · 해제 · 보호',background:'crystal-field',alt:'드루이드가 별빛 수정 동굴에서 동료를 회복하는 실제 전투 화면'},
  {key:'equipment',name:'장비와 특성',en:'YOUR BUILD',title:'당신만의 방식으로,\n더 강한 힐러로.',text:'새로운 장비를 발견하고 능력과 특성을 조합합니다. 다음 전투를 준비하는 시간도 모험의 일부입니다.',detail:'전리품 발견 · 장비 선택 · 특성 조합',background:'abbey-altar',alt:'나혼자 힐러의 장비 상세와 능력치 화면'},
  {key:'guild',name:'길드와 동료',en:'YOUR COMPANIONS',title:'혼자 떠나지만,\n함께 강해진다.',text:'길드원을 모집하고 육성하며 나만의 파티를 만듭니다. 서로 다른 개성을 가진 동료들과 더 깊은 던전으로 향하십시오.',detail:'길드원 모집 · 동료 육성 · 파티 편성',background:'sanctuary',alt:'길드의 성장과 동료 육성 콘텐츠를 보여주는 실제 게임 화면'},
];

export function renderHome(arrow) {
  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-scene"><img class="hero-art" src="/assets/hero-sanctuary.webp" alt="" fetchpriority="high" width="1944" height="810"></div>
  <div class="hero-shade"></div>
  <img class="hero-bloom" src="/assets/fx-title-sunbloom-v1.webp" width="768" height="768" alt="" aria-hidden="true">
  <div class="container hero-content">
    <p class="eyebrow"><span class="gold-line"></span> SOLO HEALER · HEALER RPG</p>
    <p class="hero-pretitle">모두가 용사가 될 때,</p>
    <h1 id="hero-title">나는 <em>힐러</em>가 된다.</h1>
    <p class="hero-description">흔들리는 체력, 다가오는 일격.<br>당신의 치유로 이어지는 우리 파티의 모험.</p>
    <div class="hero-actions"><a class="button gold" href="#classes">나의 힐러 발견하기 ${arrow}</a><a class="text-link" href="#gameplay">전투 살펴보기 ${arrow}</a></div>
    <div class="hero-meta"><span>Android</span><i></i><span>싱글 플레이 RPG</span><i></i><span>Google Play 곧 출시</span></div>
  </div>
  <a class="hero-preview" href="#gameplay" aria-label="실제 전투 화면 살펴보기"><span class="preview-eyebrow">A MOMENT TO HEAL</span><div class="hero-phone"><img src="/assets/screenshot-battle.webp" width="540" height="1170" alt="나혼자 힐러의 실제 전투 화면"></div><span class="hero-preview-caption"><span>생명을 잇는 당신의 선택</span>${arrow}</span></a>
  <div class="hero-bottom"><a href="#story" class="journey-link">SCROLL TO EXPLORE <span>↓</span></a><button type="button" class="motion-toggle" aria-pressed="false" data-motion>움직임 끄기</button></div>
</section>
<nav class="chapter-nav" aria-label="모험 둘러보기"><div class="container"><a href="#story" data-section="story"><span>01</span> 모험</a><a href="#classes" data-section="classes"><span>02</span> 직업</a><a href="#gameplay" data-section="gameplay"><span>03</span> 플레이</a><a href="#release" data-section="release"><span>04</span> 곧 출시</a></div></nav>
<section id="story" class="story section"><div class="container">
  <div class="section-intro reveal"><div><p class="eyebrow">01 / THE HEALER'S JOURNEY</p><h2>파티의 마지막 희망은<br><em>당신의 손끝에.</em></h2></div><p class="section-summary">혼자 즐기지만, 혼자가 아닌 모험.<br>치유의 순간을 선택하고,<br>동료들과 함께 성장하십시오.</p></div>
  <div class="journey-cards">
    <a href="#gameplay" class="journey-card reveal" data-gallery-link="battle"><img src="/assets/scene-crystal-field.webp" alt="" width="540" height="360" loading="lazy"><div class="journey-card-body"><span class="eyebrow">01 / BATTLE</span><h3>위기를 읽고, 생명을 잇다.</h3><p>누구를 먼저 살릴지.<br>당신의 판단이 파티를 지킵니다.</p><span class="journey-card-link">전투 살펴보기 ${arrow}</span></div></a>
    <a href="#gameplay" class="journey-card reveal" data-gallery-link="equipment"><img src="/assets/scene-abbey-altar.webp" alt="" width="540" height="810" loading="lazy"><div class="journey-card-body"><span class="eyebrow">02 / GROWTH</span><h3>나만의 치유를 완성하다.</h3><p>장비를 고르고 특성을 다듬습니다.<br>다음 도전을 준비하십시오.</p><span class="journey-card-link">성장 살펴보기 ${arrow}</span></div></a>
    <a href="#gameplay" class="journey-card reveal" data-gallery-link="guild"><img src="/assets/scene-sanctuary.webp" alt="" width="1024" height="1536" loading="lazy"><div class="journey-card-body"><span class="eyebrow">03 / COMPANIONS</span><h3>동료와 더 멀리 나아가다.</h3><p>개성 있는 길드원을 육성하고<br>당신만의 파티를 만듭니다.</p><span class="journey-card-link">길드 살펴보기 ${arrow}</span></div></a>
  </div>
</div></section>
<section id="classes" class="classes-section section"><div class="container">
  <div class="section-heading reveal"><p class="eyebrow">02 / FIND YOUR CALLING</p><h2>같은 치유, <em>일곱 가지 방식.</em></h2><p>직업을 선택하고 당신의 치유 방식을 발견하십시오.</p></div>
  <div class="class-tabs" role="tablist" aria-label="힐러 직업 선택">${classes.map((c,i)=>`<button id="tab-${c.key}" class="class-tab${i===0?' selected':''}" role="tab" type="button" aria-selected="${i===0}" aria-controls="panel-${c.key}" tabindex="${i===0?0:-1}" data-class="${c.key}"><img src="/assets/emblem-${c.key}.webp" width="54" height="54" alt="" loading="lazy"><span>${c.name}</span></button>`).join('')}</div>
  <div class="class-stage">${classes.map((c,i)=>`<div class="class-panel" id="panel-${c.key}" role="tabpanel" aria-labelledby="tab-${c.key}" style="--class-color:${themes[c.key].color}"${i?' hidden':''}>
    <img class="class-world" src="/assets/scene-${themes[c.key].scene}.webp" alt="" width="540" height="360" loading="lazy"><div class="class-world-shade"></div>
    <div class="class-copy"><span class="class-english">${c.en}</span><p class="class-tag">${c.tag}</p><h3>${c.name}</h3><p class="class-description">${c.text}</p><div class="class-details"><span>고유 시스템<strong>${c.skill}</strong></span><span>플레이 스타일<strong>${c.style}</strong></span></div><a class="class-explore" href="#gameplay">모험 속으로 ${arrow}</a></div>
    <div class="class-emblem"><span class="class-world-label">${themes[c.key].label}</span><img src="/assets/emblem-${c.key}.webp" alt="${c.name}의 직업 문양" width="256" height="256" loading="lazy"></div>
  </div>`).join('')}
  <div class="class-navigation"><button type="button" class="round-nav previous" data-class-step="-1" aria-label="이전 직업">${arrow}</button><p><span id="class-count" aria-live="polite">01</span><span class="count-divider">/</span>07</p><button type="button" class="round-nav" data-class-step="1" aria-label="다음 직업">${arrow}</button></div></div>
  <p class="class-footnote">직업은 게임 내 성장·해금 조건에 따라 이용할 수 있습니다.</p>
</div></section>
<section id="gameplay" class="gameplay section"><div class="container">
  <div class="section-intro reveal"><div><p class="eyebrow">03 / INSIDE THE ADVENTURE</p><h2>보는 순간부터,<br><em>시작되는 모험.</em></h2></div><p class="section-summary">전투, 성장, 그리고 동료.<br>궁금한 장면을 골라 살펴보십시오.</p></div>
  <div class="showcase-tabs" role="tablist" aria-label="플레이 장면 선택">${scenes.map((s,i)=>`<button type="button" role="tab" id="scene-tab-${s.key}" aria-controls="scene-${s.key}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-scene="${s.key}"><span>0${i+1}</span>${s.name}</button>`).join('')}</div>
  <div class="showcase-stage">${scenes.map((s,i)=>`<div class="showcase-panel" role="tabpanel" id="scene-${s.key}" aria-labelledby="scene-tab-${s.key}"${i?' hidden':''}><img class="showcase-world" src="/assets/scene-${s.background}.webp" alt="" width="540" height="360" loading="lazy"><div class="showcase-copy"><p class="eyebrow">${s.en}</p><h3>${s.title.replace('\n','<br>')}</h3><p class="showcase-description">${s.text}</p><span class="showcase-detail">${s.detail}</span><button class="button outline" type="button" data-open-scene="${s.key}">플레이 화면 확대 ${arrow}</button></div><button class="showcase-screen" type="button" data-screenshot="${s.key}" aria-label="${s.name} 플레이 화면 크게 보기"><div class="phone-frame"><img src="/assets/screenshot-${s.key}.webp" width="540" height="1170" alt="${s.alt}" loading="lazy"></div><span>화면 확대 ${arrow}</span></button></div>`).join('')}
    <div class="showcase-navigation"><button type="button" class="round-nav previous" data-scene-step="-1" aria-label="이전 플레이 장면">${arrow}</button><span id="scene-count" aria-live="polite">01 / 03</span><button type="button" class="round-nav" data-scene-step="1" aria-label="다음 플레이 장면">${arrow}</button></div>
  </div>
</div></section>
<section class="support-band"><div class="container reveal"><div><p class="eyebrow">WE'RE HERE FOR YOU</p><h2>모험 중 도움이 필요할 때.</h2><p>게임 문의부터 계정과 개인정보 관리까지.</p></div><a class="button outline" href="/support/">고객지원 ${arrow}</a></div></section>
<section id="release" class="release section"><img class="release-world" src="/assets/hero-sanctuary.webp" alt="" width="1944" height="810" loading="lazy"><div class="container release-content reveal"><img src="/assets/app-icon.png" width="84" height="84" alt="나혼자 힐러 앱 아이콘" loading="lazy"><p class="eyebrow">YOUR PARTY IS WAITING</p><h2>당신의 치유가,<br><em>모험의 시작.</em></h2><p>나혼자 힐러 · Solo Healer</p><div class="release-pill"><span class="status-dot"></span> Google Play · 곧 출시</div><a class="text-link" href="#classes">나의 힐러 다시 살펴보기 ${arrow}</a></div></section>
<dialog id="screenshot-dialog" aria-label="실제 게임 화면 확대"><button class="dialog-close" type="button" aria-label="확대 화면 닫기">닫기 ×</button><img id="dialog-image" src="/assets/screenshot-battle.webp" alt="확대된 실제 게임 화면" width="540" height="1170"><div class="lightbox-navigation"><button type="button" data-lightbox-step="-1" aria-label="이전 확대 화면">이전</button><span id="lightbox-count">01 / 03</span><button type="button" data-lightbox-step="1" aria-label="다음 확대 화면">다음</button></div></dialog>`;
}

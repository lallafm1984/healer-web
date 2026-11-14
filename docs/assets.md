# 에셋 제작 정보

## 힐러 이용자를 위한 소개 페이지 (2026-11-05)

- `public/assets/healer-guide/party-healing.webp`: Healer 프로젝트와 협업해 만든 신규 원본 소개 일러스트. 게임의 sanctuary/cathedral 아트만 세계관·화풍 참고로 사용했습니다. 타 게임의 캐릭터·로고·UI를 사용하지 않았습니다.
- 내장 ImageGen 원본: `/Users/lim/.codex/generated_images/01a1ac0f-e783-7612-b3ec-4afd04e7f297/exec-6d11962a-75b6-43f0-9077-b589f5e02911.png`. 전달 원본은 `healer/나혼자힐러/리소스/wow-healer-web-20261105/hero-raid-healing-original.png`이며, 전달 JPEG를 1920×800 WebP(q86)로 최적화했습니다.
- 정확한 프롬프트는 `public/assets/healer-guide/party-healing.prompt.txt`에 보관합니다. 페이지에는 ‘소개 일러스트’로 표시합니다.
- `public/assets/healer-guide/raid-{ko,en,ja}.webp`: `healer/나혼자힐러/리소스/스토어-다국어-20261031-v1/업로드/{ko-KR,en-US,ja-JP}/phone/04-priest-raid20.png`의 실제 언어별 레이드 화면. 그림·문구를 추가하거나 삭제하지 않고 가로 540px WebP(q88)로 최적화했습니다.
- 파티·장비·길드에는 기존 `public/assets/`의 언어별 실제 화면을 재사용합니다. 확대 보기에서 전체 화면을 확인할 수 있습니다.

## Google Play 공식 다운로드 배지 (2026-11-03)

- 출처: [Google Partner Marketing Hub · Google Play 배지](https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/?folder=86718).
- 원본: `GetItOnGooglePlay_Badge_Web_color_Korean.svg`, `GetItOnGooglePlay_Badge_Web_color_English.svg`, `GetItOnGooglePlay_Badge_Print_color_Japanese.svg` (허브에 등록된 최신 일본어 SVG 파일명).
- 저장: `public/assets/google-play/badge-{ko,en,ja}.svg`. Google이 제공한 검은색·컬러 로고 원본을 수정 없이 보관합니다.
- 사용: `components/store-links.jsx`. 선택 언어에 맞는 이미지와 스토어 `hl`을 사용합니다.
- 공식 가이드에 따라 비율·색상·로고·문구를 유지하며, 표시 높이 28px 이상과 배지 높이 1/4 이상의 사방 여백을 확보합니다. 외부 이미지 서버에 의존하지 않고 사이트에서 직접 제공합니다.

## 새로 생성한 메인 일러스트

- 도구: Codex 내장 `image_gen` (CLI 미사용)
- 최종 웹 에셋: `public/assets/hero-sanctuary.webp`
- 원본 생성 이미지: `/Users/lim/.codex/generated_images/01a19033-d82c-7090-8132-801a094152f1/exec-5059c804-9dcb-4b2d-9fe4-dabafac08ec2.png`
- 스타일·세계관 참조: 기존 게임 `src/art/scene-sanctuary.webp`
- 파생 처리: 원본 구도를 유지한 WebP 압축. 웹 페이지에서는 가로·모바일 화면에 맞춰 CSS로 표시 영역만 조정.
- 실제 플레이 화면으로 오해하지 않도록 소개 일러스트임을 표시.

최종 프롬프트:

```text
Use case: stylized-concept. Asset type: panoramic official landing page background illustration for the Korean mobile RPG 'Solo Healer'. Use the attached local image as STYLE and WORLD REFERENCE, not a literal edit. Create a new very wide landscape 2.4:1 composition. Hand-painted richly detailed 2D fantasy game environment consistent with reference: sunflowers, cypress trees, weathered pale stone sanctuary, gold sun insignia, elegant teal domes, distant blue-green valley and castle. Mood is serene late-afternoon adventure, healing magic and warm golden rays through the trees, teal shadows and soft gold motes. The right half features a beautifully composed sun-emblem sanctuary with stairs and flowers; the left half is a dark forest clearing in deep blue-green shadows, subtle and calm for readable large website text. No people or characters, no text, no letters, no logos, no UI, no frame, no watermark. Premium painterly fantasy game key art; textured painted leaves, atmospheric perspective. Strong cinematic lighting, wide format.
```

## 기존 게임 리소스 활용

- `emblem-{priest,druid,paladin,shaman,monk,astrologer,warder}.webp`: 실제 7개 직업의 게임 문양.
- `scene-abbey-altar.webp`: 직업 소개의 배경.
- `app-icon.png`: 게임 Android 런처 아이콘.
- 실제 플레이 화면 3장: `나혼자힐러/리소스/스토어-후반플레이-S25-20261029/01_S25_원본/`의 `15_사제_만렙_멈춘심장_중간.png`, `21_후반장비_상세.png`, `06_후반_길드.png`. 가로 540px WebP로 최적화.
- Hahmlet 700·800, Noto Sans KR 400·700: 게임에 포함된 로컬 WOFF2. 해당 OFL 라이선스를 `public/assets/`에 함께 보관.

외부 스톡 사진, 가짜 리뷰·다운로드 수·평점, 다른 게임 이미지는 사용하지 않았습니다.

2026-10-31: 전투 화면은 사제로 통일했습니다. 홈 첫 화면·플레이 갤러리·확대 화면이 `screenshot-battle-priest.webp`를 공유합니다.

## App Store 공식 배지 (2026-11-14)

- 출처: [Apple App Store Marketing Tools](https://toolbox.marketingtools.apple.com/)의 검은색 다운로드 배지, 언어 `ko-kr`, `en-us`, `ja-jp`.
- 원본: `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/{locale}`.
- 파일: `public/assets/app-store/badge-ko.svg`, `badge-en.svg`, `badge-ja.svg`. 공식 SVG 원본을 수정하지 않고 사용합니다.
- [Apple 마케팅 가이드](https://developer.apple.com/app-store/marketing/guidelines/)에 따라 비율·여백을 유지하고 App Store 배지를 먼저 배치합니다.

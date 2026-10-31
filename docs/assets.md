# 에셋 제작 정보

## 새로 생성한 메인 일러스트

- 도구: Codex 내장 `image_gen` (CLI 미사용)
- 최종 웹 에셋: `dist/assets/hero-sanctuary.webp`
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
- 실제 플레이 화면 3장: `나혼자힐러/리소스/스토어-후반플레이-S25-20261029/01_S25_원본/`의 `08_드루이드_별빛수정동굴_중간.png`, `21_후반장비_상세.png`, `06_후반_길드.png`. 가로 540px WebP로 최적화.
- Hahmlet 700·800, Noto Sans KR 400·700: 게임에 포함된 로컬 WOFF2. 해당 OFL 라이선스를 `dist/assets/`에 함께 보관.

외부 스톡 사진, 가짜 리뷰·다운로드 수·평점, 다른 게임 이미지는 사용하지 않았습니다.

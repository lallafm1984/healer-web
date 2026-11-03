# 나혼자 힐러 · Solo Healer

포엘트리(4LTree)의 힐러 RPG 소개 및 고객지원 사이트입니다. Next.js 16 App Router와 React 19를 사용하며, 요청 언어에 맞춰 서버에서 한국어·영어·일본어 HTML을 렌더링합니다. robots와 사이트맵은 정적으로 제공합니다.

운영 주소: [https://healer.4ltree.com](https://healer.4ltree.com)

## 로컬 실행

Node.js 24 LTS를 사용합니다. `.nvmrc`와 `package.json`에 같은 버전을 지정했습니다.

```sh
npm ci
npm run dev
```

미리보기: http://localhost:4326

```sh
npm run build
npm test
npm run check
npm run start
```

`test`는 언어 우선순위·코드 판정·링크·정책 번역 구조를 검사합니다. `check`는 빌드된 앱을 임시 포트에서 실행하여 페이지·내부 링크·메타데이터·보안 헤더·사이트맵·404와 3개 언어의 12개 페이지, 초기 서버 언어·저장 언어 충돌·제거 경로를 검사한 뒤 종료합니다. 배포된 사이트는 `CHECK_BASE_URL=https://실제-주소 npm run check`로 검사할 수 있습니다.

## 페이지와 코드

| 경로 | 내용 | 파일 |
| --- | --- | --- |
| `/` | 게임 소개, 7개 직업 선택, 플레이 갤러리·확대, 출시 안내 | `app/page.jsx`, `components/home-experience.jsx` |
| `/privacy/` | 개인정보 처리 안내 | `app/privacy/page.jsx` |
| `/terms/` | 이용약관 | `app/terms/page.jsx` |
| `/support/` | 운영 이메일, 기기 저장 FAQ, 개인정보 안내 | `app/support/page.jsx` |

- `app/layout.jsx`: 공통 레이아웃, 한국어 설정, 폰트, 검색·공유 메타데이터.
- `components/site-chrome.jsx`: 공통 탐색 메뉴, 모바일 메뉴, 푸터.
- `components/use-landing-motion.js`: 배경 움직임, 스크롤 표시, 등장 효과와 정리 처리.
- `lib/content.js`: 직업 데이터와 정책·약관 문안.
- `proxy.js`, `lib/locale.js`, `lib/locale-server.js`: URL → 저장 언어 → 브라우저 언어 순으로 요청 언어를 결정합니다.
- `lib/messages.js`, `lib/legal-content.js`: 한국어·영어·일본어 UI·정책·약관 번역.
- `components/locale-provider.jsx`, `components/language-switcher.jsx`: 서버와 클라이언트의 같은 언어, 언어 변경 링크.
- `app/globals.css`, `app/interactive.css`, `app/localization.css`: 기존 디자인과 번역 길이를 고려한 반응형 스타일.
- `public/assets/`: 게임 그림·화면·아이콘·로컬 폰트 및 라이선스.
- `app/robots.js`, `app/sitemap.js`: 검색 엔진용 경로.
- `next.config.mjs`: 끝 슬래시와 보안 헤더.

기존 정적 HTML 생성기와 OpenAI Sites 설정은 Next.js 전환 과정에서 제거했습니다. 과거 구현은 Git 이력에서 확인할 수 있습니다.

## Vercel 배포

GitHub의 `lallafm1984/healer-web` 저장소를 Import합니다.

| 설정 | 값 |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `.` (저장소 루트) |
| Install Command | 기본값 (`npm install` 또는 잠금 파일에 따른 설치) |
| Build Command | 기본값 (`npm run build`) |
| Output Directory | 기본값 (직접 `dist`로 지정하지 않음) |
| Production Branch | `main` |

필수 비밀키는 없습니다. 현재 Vercel Production에는 `SITE_URL=https://healer.4ltree.com`을 설정해 검색·공유 메타데이터와 사이트맵에 공식 도메인을 사용합니다. 환경변수가 없으면 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`, 로컬에서는 `http://localhost:4326`을 사용합니다.

`healer.4ltree.com` 등 사용자 도메인을 연결한 뒤에는 Vercel의 프로젝트 환경변수에 `SITE_URL=https://healer.4ltree.com`을 설정하고 다시 배포합니다. `.env.example`에는 선택 설정 예시만 있으며, 비밀 정보는 저장소에 커밋하지 않습니다.

`main`에 새 커밋을 올리면 연결된 Vercel 프로젝트가 자동 배포합니다. 최초 Import 후 받은 공개 주소와 `/privacy/`, `/terms/`, `/support/`의 접근을 확인하십시오.

## 실제 동작

- 직업·플레이 탭은 키보드 방향키, Home, End를 지원합니다. 갤러리 대화상자는 Esc로 닫습니다.
- 모바일 메뉴, FAQ, 움직임 끄기와 시스템의 모션 줄이기 설정을 지원합니다.
- 이메일 링크는 메일 작성 화면을 열며 이용자가 직접 전송해야 접수됩니다.
- 웹사이트에 로그인, 추적 분석, 광고 SDK, 결제 또는 게임 데이터베이스 연결을 추가하지 않았습니다.
- 2026-11-03: 계정 관리·삭제 요청 페이지와 도우미를 제거했습니다. 게임의 자동 익명 인증은 유지하며 구글 연결·클라우드 진행 백업·복원은 제공하지 않습니다. 광고 제거는 향후 스토어 결제·영수증 기반 복원으로 연결할 예정입니다.
- 2026-11-03: 공개 Google Play 등록정보를 확인하고 정식 출시 안내를 반영했습니다. 상단·첫 화면·하단 다운로드 버튼과 모바일 메뉴·푸터에서 [Google Play](https://play.google.com/store/apps/details?id=com.solohealer.game)로 연결되며, 선택한 웹 언어를 스토어의 `hl` 매개변수에 전달합니다. 앱 이름은 각 언어의 실제 스토어 표시명을 사용하고 검색·공유 설명에도 출시 상태를 반영합니다.
- 개인정보처리방침의 웹사이트 호스팅 제공자는 Vercel입니다.
- 앱은 `/privacy/?lang=ja`처럼 기존 경로에 `lang=ko|en|ja`를 전달합니다. 유효한 URL 언어가 저장된 웹 언어보다 우선하며, 페이지 내부 이동에서도 유지합니다.
- 직접 선택한 웹 언어는 언어 코드만 담은 기능성 쿠키로 최대 180일 기억합니다. URL·저장 선택이 없으면 브라우저의 첫 번째 언어가 한국어·일본어일 때 해당 언어, 나머지는 영어를 표시합니다.
- 영어·일본어 홈은 실제 해당 언어로 실행해 캡처한 사제·장비·길드 화면을 사용합니다.

[Google Play·도메인 안내](./docs/google-play-and-domain.md) · [그림과 폰트 정보](./docs/assets.md) · [기존 디자인 검증 기록](./docs/interactive-redesign.md)

[앱과 웹의 언어 전달 계약·검증](./docs/app-language-contract.md)

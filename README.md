# 나혼자 힐러 · Solo Healer

포엘트리(4LTree)의 힐러 RPG 소개 및 고객지원 사이트입니다. Next.js 16 App Router와 React 19를 사용하며, 페이지를 빌드할 때 정적으로 미리 렌더링합니다.

## 로컬 실행

Node.js 22 이상을 사용합니다.

```sh
npm ci
npm run dev
```

미리보기: http://localhost:4326

```sh
npm run build
npm run check
npm run start
```

`check`는 빌드된 앱을 임시 포트에서 실행하여 페이지·내부 링크·메타데이터·보안 헤더·사이트맵·404를 검사한 뒤 종료합니다. 배포된 사이트는 `CHECK_BASE_URL=https://실제-주소 npm run check`로 검사할 수 있습니다.

## 페이지와 코드

| 경로 | 내용 | 파일 |
| --- | --- | --- |
| `/` | 게임 소개, 7개 직업 선택, 플레이 갤러리·확대, 출시 안내 | `app/page.jsx`, `components/home-experience.jsx` |
| `/privacy/` | 개인정보 처리 안내 | `app/privacy/page.jsx` |
| `/terms/` | 이용약관 | `app/terms/page.jsx` |
| `/delete-account/` | 이메일 삭제 요청 및 요청문 작성 도우미 | `app/delete-account/page.jsx`, `components/deletion-composer.jsx` |
| `/support/` | 운영 이메일, FAQ, 계정 관리 링크 | `app/support/page.jsx` |

- `app/layout.jsx`: 공통 레이아웃, 한국어 설정, 폰트, 검색·공유 메타데이터.
- `components/site-chrome.jsx`: 공통 탐색 메뉴, 모바일 메뉴, 푸터.
- `components/use-landing-motion.js`: 배경 움직임, 스크롤 표시, 등장 효과와 정리 처리.
- `lib/content.js`: 직업 데이터와 정책·약관 문안.
- `app/globals.css`, `app/interactive.css`: 기존 디자인과 반응형 스타일.
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

필수 비밀키나 환경변수는 없습니다. 기본 검색·공유 주소는 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`을 사용합니다. 로컬에서는 `http://localhost:4326`을 사용합니다.

`healer.4ltree.com` 등 사용자 도메인을 연결한 뒤에는 Vercel의 프로젝트 환경변수에 `SITE_URL=https://healer.4ltree.com`을 설정하고 다시 배포합니다. `.env.example`에는 선택 설정 예시만 있으며, 비밀 정보는 저장소에 커밋하지 않습니다.

`main`에 새 커밋을 올리면 연결된 Vercel 프로젝트가 자동 배포합니다. 최초 Import 후 받은 공개 주소와 `/privacy/`, `/delete-account/`, `/support/`의 접근을 확인하십시오.

## 실제 동작

- 직업·플레이 탭은 키보드 방향키, Home, End를 지원합니다. 갤러리 대화상자는 Esc로 닫습니다.
- 모바일 메뉴, FAQ, 움직임 끄기와 시스템의 모션 줄이기 설정을 지원합니다.
- 이메일 링크는 메일 작성 화면을 열며 이용자가 직접 전송해야 접수됩니다.
- 삭제 요청 작성 내용은 브라우저 메모리에만 있으며 서버에 제출하거나 저장하지 않습니다.
- 웹사이트에 로그인, 추적 분석, 광고 SDK, 결제 또는 게임 데이터베이스 연결을 추가하지 않았습니다.
- 공개 Google Play 배포 주소를 아직 넣지 않았으므로 출시 준비 상태를 표시합니다.
- 개인정보처리방침의 웹사이트 호스팅 제공자는 Vercel입니다.

[Google Play·도메인 안내](./docs/google-play-and-domain.md) · [그림과 폰트 정보](./docs/assets.md) · [기존 디자인 검증 기록](./docs/interactive-redesign.md)

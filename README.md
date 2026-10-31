# 나혼자 힐러 · Solo Healer

포엘트리(4LTree)의 힐러 RPG 소개 및 고객지원 사이트. 외부 패키지 없이 Node.js로 정적 HTML을 생성합니다. 게임 저장 서버나 관리용 키를 포함하지 않습니다.

## 실행

Node.js 22 이상. 의존성 설치 없이 실행합니다.

```sh
npm run build
npm run check
npm run dev
```

로컬 주소: http://localhost:4326. 포트가 사용 중이면 `PORT=4327 npm run dev`와 같이 변경합니다.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 성역 테마 소개, 7개 직업 선택, 실제 플레이 화면 확대, 출시 안내 |
| `/privacy/` | 처리 정보·목적·제공자·보관·삭제·권리 행사 |
| `/delete-account/` | 로그인·앱 재설치 없이 이메일 삭제 요청, 로컬 요청문 작성 도우미, 게임 내 삭제 안내 |
| `/support/` | 운영 이메일, FAQ, 계정·개인정보 관리 링크 |
| `/terms/` | 서비스 이용, 계정, 구매·환불, 탈퇴 안내 |

`scripts/build.mjs`는 HTML과 sitemap, robots, 정적 호스팅 헤더를 만듭니다. 홈 구성은 `scripts/home.mjs`, 문안과 직업 데이터는 `scripts/content.mjs`, 기본 스타일·동작은 `dist/styles.css`, `dist/app.js`에서 편집합니다. 홈 전용 인터랙션은 `dist/interactive.css`, `dist/experience.js`에 있습니다. 빌드는 assets·CSS·JS를 지우지 않습니다.

기본 메타데이터 주소는 `https://healer.4ltree.com`입니다. 다른 호스트에 배포할 때는 실제 주소로 빌드합니다.

```sh
SITE_URL=https://실제-주소 npm run build
```

## 실제 작동 범위

- 이메일 링크는 메일 작성 화면을 엽니다. 이용자가 보내기를 눌러야 접수됩니다. 서버에서 접수한 것처럼 성공 문구를 표시하지 않습니다.
- 작성 도우미는 브라우저 메모리에서만 동작하며 제출 API·로그인·추적 스크립트·쿠키를 사용하지 않습니다. 이메일과 작성문을 복사하는 대체 경로를 제공합니다.
- Google Play 배포 주소를 확인하지 않았으므로 다운로드 링크를 만들지 않고 출시 준비 상태를 표시합니다.
- 웹사이트에서 게임 계정을 직접 삭제하지 않습니다. 게임에 구현된 삭제 경로와 운영자의 이메일 처리 경로를 제공합니다.
- 모바일 메뉴, ARIA 직업 탭(방향키/Home/End), 접근 가능한 스크린샷 대화상자, FAQ, 모션 감소 설정을 지원합니다.

## 배포

`dist/`를 공개 정적 호스팅에 배포하면 됩니다. Vercel은 `vercel.json`, OpenAI Sites는 `.openai/hosting.json`을 사용합니다. Sites의 검토용 비공개 게시와 Google Play 제출용 공개 주소는 구별해야 합니다.

스크롤 등장·배경 반응, 직업별 장면 전환, 플레이 갤러리 개편의 조사 근거와 검증 기록은 [인터랙티브 개편](./docs/interactive-redesign.md)에 있습니다.

개인정보처리방침의 호스팅 제공자 문구는 현재 검토용 OpenAI Sites / Cloudflare 기준입니다. 실제 서비스를 Vercel로 배포하면 해당 문구를 Vercel로 바꾸고 그 제공자의 데이터 처리·보관·국외 처리 조건을 확인한 뒤 다시 빌드하십시오.

자세한 도메인·Play 등록 항목은 [등록 안내](./docs/google-play-and-domain.md), 그림 정보는 [에셋 안내](./docs/assets.md)에 있습니다.

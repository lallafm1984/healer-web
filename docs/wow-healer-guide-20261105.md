# 힐러 이용자를 위한 소개 페이지와 검색 정보

기준: 2026-11-05, `origin/main`의 `b196861`에서 분리한 `codex/wow-healer-landing-20261105`.

## 반영 범위

- `/wow-healer/`를 한국어·영어·일본어로 서버 렌더링합니다. 언어별 제목·설명은 해당 언어로 WoW 힐러 경험과 모바일 싱글 플레이 게임을 자연스럽게 연결합니다. 본문은 실제 치유 판단, 장비·특성, 동료 육성을 설명하며 키워드 목록을 반복하지 않습니다.
- 홈페이지에 그림 중심의 진입 섹션을 추가하고 모바일 메뉴·푸터에서도 연결합니다. 기존 성역 세계관·색상·폰트와 Google Play 공식 언어별 배지를 유지합니다.
- 새 원본 치유 파티 그림은 ‘소개 일러스트’로, 플레이 화면은 ‘실제 게임 화면’으로 표시합니다. 실제 파티·레이드·장비·길드 화면은 전체 확대, Esc 닫기, 트리거 포커스 복귀를 지원합니다.
- 4LTree의 독립 게임이며 Blizzard Entertainment 또는 World of Warcraft의 공식·제휴 제품이 아님을 첫 화면과 관련 FAQ에서 설명합니다. 타 게임의 아트·로고는 쓰지 않습니다. 직업 수·무료 직업 전체 제공·오프라인·계정 없음 등을 새로 약속하지 않습니다.
- 언어 우선순위와 앱의 `?lang=ko|en|ja` 계약을 유지합니다. 새 페이지의 self-canonical, 상호 hreflang 및 x-default, OG/Twitter 공유 이미지, 언어별 `VideoGame` JSON-LD를 연결합니다. 리뷰·별점·다운로드 수를 만들지 않습니다.
- 사이트맵은 기존 정책·지원 경로까지 5개 경로 × 3언어의 self-canonical URL 15개를 싣고 각 항목에 언어 대체 URL을 제공합니다. 새 페이지와 내용이 바뀐 홈에만 실제 수정일을 표시합니다.

## 확인한 근거

- [공개 Google Play 등록정보](https://play.google.com/store/apps/details?id=com.solohealer.game): 싱글 플레이, 치유·보호·해제·마나 관리, 공격 기술 없음, 게임 속 동료, Android 배포.
- 협업 Healer 프로젝트는 게임 `main`의 `0720851b`에서 공격 기술 제외와 싱글 플레이 전투를 별도로 확인했습니다. 페이지는 계정·백업 상태에 대한 새로운 주장을 하지 않습니다.
- [Google 다국어 페이지 안내](https://developers.google.com/search/docs/specialty/international/localized-versions), [사용자에게 유용한 콘텐츠 안내](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), 설치된 Next.js 16.4.3의 metadata/sitemap 문서.
- 그림·원본 화면·프롬프트의 출처는 [assets.md](./assets.md)에 기록합니다. 신규 raster 4개의 프롬프트/원산지 sidecar 검사를 통과했습니다.

## 로컬 검증

- `npm run build`, 기존 단위 검사 5개, `npm run check` 통과. 통합 검사: 기본 경로 5개, 내부 참조 255개, 언어별 페이지 15개, 보안 헤더, canonical·hreflang·OG·JSON-LD·사이트맵, URL 언어 우선순위·쿠키 충돌·언어 폴백·이전 경로 404.
- 1440×1000 데스크톱과 390×844 모바일의 한국어·영어·일본어 렌더, 초기 사용자 데스크톱 크기, 홈페이지 연결 섹션을 확인했습니다. 가로 넘침이 없으며 실제 화면 확대 후 Esc/포커스/스크롤 잠금 복구를 확인했습니다.
- 전체 화면 캡처는 실제로 아래까지 스크롤해 지연 로딩 이미지를 확인하고 문서 맨 위로 돌아와 저장했습니다. `.impeccable/review/`의 이미지는 검수용이며 Git에 포함하지 않습니다.
- 디자인 기계 검사에서 지적 사항이 없었습니다. 협업 프로젝트에서도 별도로 서버 HTML/사이트맵과 언어 전환·확대 보기 동작을 확인했습니다.

## 최종 검수·운영 확인

독립 디자인 리뷰와 PR 배포 확인 결과는 완료 후 기록합니다. Google Search Console·네이버 서치어드바이저 제출, 실제 색인, 검색어별 순위·유입 증감은 이 로컬 검증으로 확인하지 않았습니다.

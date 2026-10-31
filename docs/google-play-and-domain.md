# Google Play 등록과 도메인 연결

검토일: 2026-10-31 (한국 시간)

## 공식 서비스 주소

`healer.4ltree.com`을 공식 서브도메인으로 사용합니다. 2026-10-31 가비아 DNS에 CNAME을 등록하고 Vercel의 `healer-web` 프로젝트 Production에 연결했습니다.

| Play Console 항목 | 공개 서비스 주소 |
| --- | --- |
| 개발자 웹사이트 | `https://healer.4ltree.com/` |
| 개인정보처리방침 URL | `https://healer.4ltree.com/privacy/` |
| 계정·데이터 삭제 URL | `https://healer.4ltree.com/delete-account/` |
| 고객지원 | `https://healer.4ltree.com/support/` |
| 고객지원 이메일 | `4ltree.service@gmail.com` |
| 개발자/운영자 | 포엘트리(4LTree) — 실제 Play 등록 표시명과 맞출 것 |

URL은 DNS와 공개 배포를 완료한 뒤 제출합니다. localhost 주소나 로그인이 필요한 비공개 Sites 주소를 Play Console에 제출하면 안 됩니다.

## 공식 기준과 반영 내용

1. **개인정보처리방침**: HTML 공개 URL, 명확한 제목, 앱과 운영자 식별, 처리 항목·목적·제공자, 안전한 처리, 보관·삭제, 개인정보 문의 수단을 제공합니다. 게임 내에도 같은 방침으로 연결되는 링크 또는 본문이 필요합니다.
2. **계정 삭제**: 앱 내 경로와 앱 밖 요청 경로가 모두 필요합니다. 웹 페이지에서 앱 재설치나 로그인을 요구하지 않고 운영 이메일로 요청을 시작할 수 있습니다. 삭제 범위, 기기 내 데이터와 Google 계정의 구별, 본인 확인·처리·보관을 설명합니다.
3. **데이터 보안**: Play Console 설문은 최종 배포 빌드·SDK의 실제 동작과 방침이 일치하도록 작성합니다. 웹사이트 작성만으로 설문이 제출되거나 심사가 보장되지는 않습니다.
4. **연락처**: 기존 `4ltree_Home` 코드에서 확인한 `4ltree.service@gmail.com`을 사용했습니다. 계정 삭제 이메일 전송 테스트나 운영 메일 발송은 수행하지 않았습니다.
5. **이용약관**: 이용 조건, 계정·진행, 공정 이용, 구매·환불, 탈퇴를 추가했습니다. 별도 약관 페이지를 모든 앱의 Play 필수 항목으로 단정하지 않습니다.

공식 근거:

- [Google Play 사용자 데이터 정책](https://support.google.com/googleplay/android-developer/answer/10144311?hl=ko)
- [앱 계정 삭제 요구사항](https://support.google.com/googleplay/android-developer/answer/13327111?hl=ko) — 고객지원 이메일도 웹 요청 경로의 한 방법으로 안내합니다.
- [앱 만들기·설정 및 스토어 등록정보](https://support.google.com/googleplay/android-developer/answer/9859152?hl=ko)

## 게임 소스에서 확인한 사실

대상: `healer/healer`의 2026-10-31 로컬 main. 게임 및 기존 회사 사이트를 수정하지 않았습니다.

- `src/platform/account.ts`: Supabase 익명 인증, 이용자가 선택하는 Google 연결, ID·이메일·기본 프로필 인증, 서버 저장 통신.
- `src/platform/install.ts`: 무작위 설치 번호 전송, 기기 키는 기기 내부 사용.
- `src/screens/account.ts` `deleteFlow`: 서버 계정 삭제 후 로그아웃 및 새 익명 인증. 이 기기의 진행은 유지.
- `src/screens/settings.ts`: Google 연결 계정에 설정 → 계정 삭제 버튼. 익명 이용자에게는 해당 버튼이 표시되지 않으므로 웹 문구는 이메일 대체 경로를 안내.
- `supabase/migrations/`: 계정 삭제 시 백업·사본·기록·설치 연결 및 관련 게임 데이터의 연쇄 삭제. 로그인 기록의 기준 기간은 60일이며 정리는 이벤트/관리 작업 시 실행.
- `supabase/README.md`: 게임 데이터베이스 서울 리전. 실제 제공자의 계약상 로그 보관·국외 처리 조건은 별도 확인 대상.
- `src/platform/ads.ts`: `ADS_READY=false`; `src/platform/billing.ts`: `STORE_READY=false`. 확인한 빌드에서 광고 SDK와 실제 결제 수집을 이미 운영하는 것처럼 개인정보처리방침에 기재하지 않았습니다.
- 앱 ID: `com.solohealer.game`. 아직 공개 Play 등록·출시 여부와 최종 표시명은 확인하지 않았습니다.

## 제출 전 마무리할 사항

1. 최종 스토어 앱 이름·개발자 표시명·연락처를 사이트와 맞춥니다.
2. 광고·결제·분석·오류 수집 SDK를 최종 빌드에 추가했다면 데이터 보안 설문과 개인정보처리방침을 갱신합니다.
3. 최종 호스팅 사업자, 수탁·국외 처리 구조 및 필요한 고지·동의 사항을 실제 계약에 맞게 확정합니다. Next.js 전환 후 방침은 Vercel 호스팅을 표시합니다. 공개 서비스 주소는 실제 Vercel 배포와 도메인 연결 상태를 확인한 뒤 사용합니다.
4. 고객지원 내역을 ‘완료 안내 후 30일 내 삭제’하는 운영 절차를 운영 메일함에도 적용합니다. 이것은 웹사이트에 새로 정한 운영 기준이며, 기존 메일함의 자동 정리 설정을 확인하거나 변경한 것은 아닙니다. 장기 보관이 필요하면 근거·대상·기간을 먼저 확정하고 방침을 수정합니다.
5. 로그인 기록 60일 정리가 운영 중 계속 실행되는지 확인합니다. 현재 코드는 로그인 시 만료 기록을 정리합니다. 엄격한 정시 파기가 필요하면 정기 정리 작업을 운영합니다.
6. **게임 내 개인정보처리방침 링크**를 설정 등 접근 가능한 곳에 넣습니다. 이 웹 작업에서는 게임 코드를 변경하지 않았으며, 현재 확인한 설정 화면에는 해당 링크가 없었습니다.
7. Google 연결 계정 삭제, 익명 계정 이메일 식별, 이메일 요청 수신·본인 확인·관리자 삭제·결과 회신을 운영자가 실제로 검증합니다. 이번 QA에서 실제 계정 삭제나 이메일 전송은 하지 않았습니다.
8. 대상 연령, 만 14세 미만의 개인정보 처리·법정대리인 동의 방식, Play 대상 연령 및 광고 정책을 최종 서비스에 맞게 확인합니다. 사이트 문구 자체가 동의 수집 기능을 대신하지 않습니다.
9. 확정한 공개 URL을 로그아웃/시크릿 환경과 모바일에서 열어 로그인·지역 차단 없이 접근되는지 확인한 뒤 Play에 제출합니다.

## 4ltree.com의 서브도메인

2026-10-31 읽기 전용 확인 결과 `www.4ltree.com`은 Vercel에 연결되어 있으며 `healer.4ltree.com`의 DNS 응답은 없었습니다. 회사 사이트와 게임 소개를 분리하려면 같은 Vercel 계정에 별도 프로젝트를 만드는 구성이 적합합니다.

1. 이 웹 소스를 사용하는 Vercel 프로젝트를 추가합니다. 저장소 루트가 `healer-web`이면 Root Directory를 `site`로 지정합니다. `site` 자체가 저장소 루트라면 루트 그대로 둡니다.
2. Framework Preset: Other, Build Command: `npm run build`, Output Directory: `dist`. 의존성은 없습니다.
3. Environment Variable: `SITE_URL=https://healer.4ltree.com`.
4. 프로젝트 Settings → Domains에 `healer.4ltree.com`을 추가합니다.
5. 도메인을 관리하는 DNS에서 **이 프로젝트에 Vercel이 안내한 값**으로 `healer` CNAME을 만듭니다. 기존 `www`의 대상 값을 그대로 재사용하지 않습니다. `4ltree.com`/`www`의 기존 레코드는 유지합니다.
6. TLS 인증서·공개 접속 및 각 정책 경로의 HTTP 200을 확인합니다.

OpenAI Sites로 계속 서비스한다면 같은 Site의 Custom Domain 기능이 반환하는 CNAME 대상만 사용합니다. 이 경우에도 Google Play 제출을 위해 전체 공개 접속이 필요합니다. 검토용 Site의 기본 비공개 상태를 이번 작업에서 변경하지 않았습니다.

위 DNS·Vercel 프로젝트 생성·공개 전환은 아직 수행하지 않았습니다.


## Next.js / Vercel 전환 (2026-10-31)

현재 저장소 루트가 Next.js 앱 루트입니다. Vercel Import에서 Framework Preset은 Next.js, Root Directory는 `.`, 빌드·출력 경로는 기본값을 사용합니다. 이전 정적 사이트의 Output Directory `dist`를 재사용하지 않습니다. 환경변수 `SITE_URL`이 없으면 Vercel의 프로젝트 기본 운영 주소를 메타데이터와 sitemap에 사용합니다. 도메인 연결 후 `SITE_URL`을 변경하고 재배포합니다.

공식 참고: [Next.js 배포](https://nextjs.org/docs/app/getting-started/deploying), [Vercel 시스템 환경변수](https://vercel.com/docs/environment-variables/system-environment-variables), [Vercel 개인정보처리방침](https://vercel.com/legal/privacy-notice).

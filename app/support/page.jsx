import { Arrow, Mail } from "../../components/icons";
import CopyButton from "../../components/copy-button";
import { email } from "../../lib/content";
import { getLocale, localizedMetadata } from "../../lib/locale-server";
export const generateMetadata = () => localizedMetadata(
  "고객지원 · 모험가 지원소",
  "나혼자 힐러 게임 문의, 오류 제보 및 개인정보 지원. 4ltree.service@gmail.com",
  "/support/",
);
const questions = [
  ["게임 진행은 어디에 저장됩니까?", "게임 진행은 현재 기기에 자동 저장됩니다. 구글 연결이나 서버 진행 백업·복원 기능은 제공하지 않습니다."],
  ["기기를 바꾸거나 앱을 다시 설치했습니다.", "앱 데이터 삭제·앱 제거·기기 변경으로 기기 저장을 잃으면 진행을 복구할 수 없습니다."],
  ["게임 데이터를 지우려면 어떻게 합니까?", "Android 설정 → 앱 → 나혼자 힐러 → 저장공간 → 데이터 삭제 또는 앱 제거로 기기의 진행을 지울 수 있습니다. 개인정보 관련 요청은 고객지원 이메일로 문의하십시오."],
  ["게임 오류를 제보하려면 무엇이 필요합니까?", "이용 중인 기기 모델, Android 버전, 게임 버전, 문제가 발생한 상황과 시점을 알려주십시오. 개인정보를 가린 화면을 첨부하면 도움이 됩니다. 비밀번호나 인증 코드는 보내지 마십시오."],
];
export default async function SupportPage() {
  const { t, href } = await getLocale();
  const mail = `mailto:${email}?subject=${encodeURIComponent(t("[나혼자 힐러] 고객지원 문의"))}`;
  return <>
    <section className="page-top"><div className="container">
      <a className="breadcrumb" href={href("/")}>{t("나혼자 힐러")} <Arrow /></a>
      <h1>{t("모험가 지원소")}</h1>
      <p>{t("게임 이용 중 궁금한 점이나 불편한 점을")}<br />{" "}{t("운영자에게 직접 문의할 수 있습니다.")}</p>
    </div></section>
    <div className="container support-content">
      <section className="support-contact">
        <div className="contact-seal"><Mail /></div>
        <div>
          <h2>{t("무엇을 도와드릴까요?")}</h2>
          <p>{t("게임 문의 · 오류 제보 · 개인정보 권리 행사")}</p>
          <a className="support-email" href={mail}>{email} <Arrow /></a>
          <div className="contact-actions">
            <a className="button gold" href={mail}>{t("이메일 문의")} <Arrow /></a>
            <CopyButton value={email}>{t("주소 복사")}</CopyButton>
          </div>
        </div>
      </section>
      <div className="support-quicklinks">
        <a href={href("/privacy/")}><span><h2>{t("개인정보처리방침")}</h2><p>{t("처리하는 정보와 보관·삭제 안내")}</p></span><Arrow /></a>
        <a href={href("/terms/")}><span><h2>{t("이용약관")}</h2><p>{t("서비스 이용과 저장 안내")}</p></span><Arrow /></a>
      </div>
      <section className="faq"><h2>{t("자주 묻는 질문")}</h2>
        {questions.map(([question, answer]) => <details key={question}>
          <summary>{t(question)}<span aria-hidden="true">+</span></summary><p>{t(answer)}</p>
        </details>)}
      </section>
      <div className="support-fineprint">
        <p>{t("이메일은 순차적으로 확인합니다. 개인정보 요청에는 본인 확인이 필요할 수 있습니다.")}</p>
        <p>{t("운영자 포엘트리(4LTree) · 대상 앱 나혼자 힐러(Solo Healer)")}</p>
      </div>
    </div>
  </>;
}

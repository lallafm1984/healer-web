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
  ["게임 진행은 어디에 저장됩니까?", "게임 진행은 기기에 자동 저장됩니다. 백업 지원 버전에서는 Google을 연결해 자동 백업·복구를 사용할 수 있고, iOS에서는 Google 또는 Apple을 연결합니다."],
  ["기기를 바꾸거나 앱을 다시 설치했습니다.", "설정에서 이전에 연결한 계정으로 복구하면 마지막으로 성공한 서버 백업을 불러올 수 있습니다. 연결하지 않았거나 백업되지 않은 진행은 복구하지 못할 수 있습니다."],
  ["게임 데이터를 지우려면 어떻게 합니까?", "기기 진행은 Android의 앱 데이터 삭제 또는 앱 제거, iOS의 앱 삭제로 지울 수 있습니다. 계정 삭제 지원 iOS 버전은 설정 → 계정 삭제에서 서버 계정·백업·구매 관리 프로필을 지웁니다. 기기 진행과 스토어 거래 기록은 별개입니다. 그 밖의 개인정보 요청은 고객지원으로 문의하십시오."],
  ["게임 오류를 제보하려면 무엇이 필요합니까?", "이용 중인 기기 모델, Android 또는 iOS 버전, 게임 버전, 문제가 발생한 상황과 시점을 알려주십시오. 개인정보를 가린 화면을 첨부하면 도움이 됩니다. 비밀번호나 인증 코드는 보내지 마십시오."],
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

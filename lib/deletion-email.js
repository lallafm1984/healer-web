import { email } from "./content.js";
export function deletionEmail(t, scope = "account", account = "", info = "") {
  const request = t(scope === "account" ? "계정 및 관련 데이터 전체 삭제" : "개인정보 열람·삭제 등 권리 행사 문의");
  const subject = `${t("[나혼자 힐러]")} ${request}`;
  const body = [
    t("[나혼자 힐러 · Solo Healer]"),
    `${t("요청")}: ${request}`, "",
    `${t("연결한 Google 이메일")}: ${account || t("알 수 없음 / 연결하지 않음")}`,
    `${t("계정 확인에 도움이 되는 정보")}: ${info || t("필요한 확인 절차를 회신으로 안내해 주십시오.")}`, "",
    t("본인 소유 계정에 관한 요청입니다. 처리 결과는 이 이메일로 회신 부탁드립니다."),
    t("비밀번호나 인증 코드는 보내지 않습니다."),
  ].join("\n");
  return { subject, body, url: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}

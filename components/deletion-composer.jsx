"use client";
import { useState } from "react";
import { Arrow } from "./icons";
import CopyButton from "./copy-button";
import { useLocale } from "./locale-provider";
import { deletionEmail } from "../lib/deletion-email";

export default function DeletionComposer() {
  const { t } = useLocale();
  const [scope, setScope] = useState("account");
  const [account, setAccount] = useState("");
  const [info, setInfo] = useState("");
  const [opened, setOpened] = useState(false);
  const request = deletionEmail(t, scope, account, info);
  function submit(event) {
    event.preventDefault();
    window.location.href = request.url;
    setOpened(true);
  }
  return <section className="request-card composer">
    <h2>{t("요청할 내용을 정리합니다.")}</h2>
    <p>{t("입력한 내용은 웹사이트 서버에 저장되지 않습니다. 작성된 요청문을 복사하거나 이메일 앱에서 열 수 있습니다.")}</p>
    <form id="deletion-form" onSubmit={submit}>
      <label htmlFor="scope">{t("요청 범위")}</label>
      <select id="scope" name="scope" value={scope} onChange={(event) => setScope(event.target.value)}>
        <option value="account">{t("계정 및 관련 데이터 전체 삭제")}</option>
        <option value="rights">{t("개인정보 열람·삭제 등 권리 행사 문의")}</option>
      </select>
      <label htmlFor="account-email">{t("연결한 Google 이메일")} <span>{t("(선택)")}</span></label>
      <input id="account-email" name="account" type="email" autoComplete="email" value={account} onChange={(event) => setAccount(event.target.value)} placeholder={t("연결한 계정이 있는 경우 입력")} />
      <label htmlFor="account-info">{t("계정 확인에 도움이 되는 정보")} <span>{t("(선택)")}</span></label>
      <textarea id="account-info" name="info" maxLength={2000} rows={3} value={info} onChange={(event) => setInfo(event.target.value)} placeholder={t("예: 닉네임, 마지막으로 이용한 시점. 모르면 비워두어도 됩니다.")} />
      <p className="sensitive-note">{t("비밀번호, 인증 코드, 신분증, 결제 수단 번호를 입력하지 마십시오.")}</p>
      <label htmlFor="request-preview">{t("작성된 요청문")}</label>
      <textarea id="request-preview" rows={8} readOnly value={request.body} />
      <div className="form-actions">
        <button className="button gold" type="submit">{t("이메일 앱에서 열기")} <Arrow /></button>
        <CopyButton className="button outline" value={request.body}>{t("요청문 복사")}</CopyButton>
      </div>
      <p id="compose-status" className="form-note" role="status">{t(opened
        ? "이메일 앱에서 내용을 확인하고 직접 전송하십시오. 아직 웹사이트에서 접수된 요청은 없습니다. 앱이 열리지 않으면 요청문을 복사하여 메일로 보내십시오."
        : "메일을 직접 보내기 전에는 요청이 접수되지 않습니다.")}</p>
    </form>
    <noscript><style>{"#deletion-form{display:none}"}</style><p>{t("작성 도우미에는 JavaScript가 필요합니다. 위의 이메일 주소로 직접 요청하면 같은 절차로 처리됩니다.")}</p></noscript>
  </section>;
}

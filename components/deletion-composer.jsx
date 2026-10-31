"use client";
import { useState } from "react";
import { email } from "../lib/content";
import { Arrow } from "./icons";
import CopyButton from "./copy-button";

export default function DeletionComposer() {
  const [scope, setScope] = useState("계정 및 관련 데이터 전체 삭제");
  const [account, setAccount] = useState("");
  const [info, setInfo] = useState("");
  const [opened, setOpened] = useState(false);
  const preview = `[나혼자 힐러 · Solo Healer]\n요청: ${scope}\n\n연결한 Google 이메일: ${account || "알 수 없음 / 연결하지 않음"}\n계정 확인에 도움이 되는 정보: ${info || "필요한 확인 절차를 회신으로 안내해 주십시오."}\n\n본인 소유 계정에 관한 요청입니다. 처리 결과는 이 이메일로 회신 부탁드립니다.`;
  function submit(event) {
    event.preventDefault();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("[나혼자 힐러] " + scope)}&body=${encodeURIComponent(preview)}`;
    setOpened(true);
  }
  return (
    <section className="request-card composer">
      <span className="step-label">선택 / 요청 내용 작성 도우미</span>
      <h2>요청할 내용을 정리합니다.</h2>
      <p>
        입력한 내용은 웹사이트 서버에 저장되지 않습니다. 작성된 요청문을
        복사하거나 이메일 앱에서 열 수 있습니다.
      </p>
      <form id="deletion-form" onSubmit={submit}>
        <label htmlFor="scope">요청 범위</label>
        <select
          id="scope"
          name="scope"
          value={scope}
          onChange={(event) => setScope(event.target.value)}
        >
          <option>계정 및 관련 데이터 전체 삭제</option>
          <option>개인정보 열람·삭제 등 권리 행사 문의</option>
        </select>
        <label htmlFor="account-email">
          연결한 Google 이메일 <span>(선택)</span>
        </label>
        <input
          id="account-email"
          name="account"
          type="email"
          autoComplete="email"
          value={account}
          onChange={(event) => setAccount(event.target.value)}
          placeholder="연결한 계정이 있는 경우 입력"
        />
        <label htmlFor="account-info">
          계정 확인에 도움이 되는 정보 <span>(선택)</span>
        </label>
        <textarea
          id="account-info"
          name="info"
          maxLength={2000}
          rows={3}
          value={info}
          onChange={(event) => setInfo(event.target.value)}
          placeholder="예: 닉네임, 마지막으로 이용한 시점. 모르면 비워두어도 됩니다."
        />
        <p className="sensitive-note">
          비밀번호, 인증 코드, 신분증, 결제 수단 번호를 입력하지 마십시오.
        </p>
        <label htmlFor="request-preview">작성된 요청문</label>
        <textarea id="request-preview" rows={8} readOnly value={preview} />
        <div className="form-actions">
          <button className="button gold" type="submit">
            이메일 앱에서 열기 <Arrow />
          </button>
          <CopyButton className="button outline" value={preview}>
            요청문 복사
          </CopyButton>
        </div>
        <p id="compose-status" className="form-note" role="status">
          {opened
            ? "이메일 앱에서 내용을 확인하고 직접 전송하십시오. 아직 웹사이트에서 접수된 요청은 없습니다. 앱이 열리지 않으면 요청문을 복사하여 메일로 보내십시오."
            : "메일을 직접 보내기 전에는 요청이 접수되지 않습니다."}
        </p>
      </form>
      <noscript>
        <style>{"#deletion-form{display:none}"}</style>
        <p>
          작성 도우미에는 JavaScript가 필요합니다. 위의 이메일 주소로 직접
          요청하면 같은 절차로 처리됩니다.
        </p>
      </noscript>
    </section>
  );
}

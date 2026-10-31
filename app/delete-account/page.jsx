import { Arrow, Mail } from "../../components/icons";
import CopyButton from "../../components/copy-button";
import { email } from "../../lib/content";
import { pageMetadata } from "../../lib/site";
import DeletionComposer from "../../components/deletion-composer";
export const metadata = pageMetadata(
  "계정 및 데이터 삭제",
  "나혼자 힐러(Solo Healer) 계정 및 데이터 삭제. 앱 재설치나 로그인 없이 운영자 이메일로 삭제를 요청할 수 있습니다.",
  "/delete-account/",
);
export default function DeleteAccountPage() {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <a className="breadcrumb" href="/">
            나혼자 힐러 <Arrow />
          </a>
          <p className="eyebrow">ACCOUNT &amp; DATA DELETION</p>
          <h1>계정 및 데이터 삭제</h1>
          <p>
            나혼자 힐러(Solo Healer) 계정과 관련 데이터의 삭제를 요청할 수
            있습니다.
            <br />
            앱을 다시 설치하거나 웹사이트에 로그인할 필요가 없습니다.
          </p>
        </div>
      </section>
      <div className="container deletion-layout">
        <article className="deletion-main">
          <section className="request-card">
            <span className="step-label">01 / 이메일로 요청</span>
            <h2>앱이 없어도 요청할 수 있습니다.</h2>
            <p>
              연결한 Google 계정의 이메일에서 아래 주소로 삭제 요청을
              보내십시오. 익명 이용자이거나 연결한 이메일을 모르는 경우, 알고
              있는 닉네임 등 식별에 도움이 되는 정보를 적어 문의하십시오. 확인에
              필요한 최소 정보만 별도로 안내합니다.
            </p>
            <a
              className="email-display"
              href="mailto:4ltree.service@gmail.com?subject=%5B%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC%5D%20%EA%B3%84%EC%A0%95%20%EB%B0%8F%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD&body=%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC(Solo%20Healer)%20%EA%B3%84%EC%A0%95%20%EB%B0%8F%20%EA%B4%80%EB%A0%A8%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98%20%EC%82%AD%EC%A0%9C%EB%A5%BC%20%EC%9A%94%EC%B2%AD%ED%95%A9%EB%8B%88%EB%8B%A4.%0A%0A%EC%97%B0%EA%B2%B0%ED%95%9C%20Google%20%EC%9D%B4%EB%A9%94%EC%9D%BC(%EC%95%8C%EA%B3%A0%20%EC%9E%88%EB%8A%94%20%EA%B2%BD%EC%9A%B0)%3A%20%0A%EA%B3%84%EC%A0%95%20%EC%8B%9D%EB%B3%84%EC%97%90%20%EB%8F%84%EC%9B%80%EC%9D%B4%20%EB%90%98%EB%8A%94%20%EC%A0%95%EB%B3%B4(%EB%8B%89%EB%84%A4%EC%9E%84%20%EB%93%B1)%3A%20%0A%ED%9A%8C%EC%8B%A0%20%EB%B0%9B%EC%9D%84%20%EC%9D%B4%EB%A9%94%EC%9D%BC%3A%20%0A%0A%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EB%82%98%20%EC%9D%B8%EC%A6%9D%20%EC%BD%94%EB%93%9C%EB%8A%94%20%EB%B3%B4%EB%82%B4%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4."
            >
              <Mail />
              <span>4ltree.service@gmail.com</span>
              <Arrow />
            </a>
            <a
              className="button gold"
              href="mailto:4ltree.service@gmail.com?subject=%5B%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC%5D%20%EA%B3%84%EC%A0%95%20%EB%B0%8F%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD&body=%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC(Solo%20Healer)%20%EA%B3%84%EC%A0%95%20%EB%B0%8F%20%EA%B4%80%EB%A0%A8%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98%20%EC%82%AD%EC%A0%9C%EB%A5%BC%20%EC%9A%94%EC%B2%AD%ED%95%A9%EB%8B%88%EB%8B%A4.%0A%0A%EC%97%B0%EA%B2%B0%ED%95%9C%20Google%20%EC%9D%B4%EB%A9%94%EC%9D%BC(%EC%95%8C%EA%B3%A0%20%EC%9E%88%EB%8A%94%20%EA%B2%BD%EC%9A%B0)%3A%20%0A%EA%B3%84%EC%A0%95%20%EC%8B%9D%EB%B3%84%EC%97%90%20%EB%8F%84%EC%9B%80%EC%9D%B4%20%EB%90%98%EB%8A%94%20%EC%A0%95%EB%B3%B4(%EB%8B%89%EB%84%A4%EC%9E%84%20%EB%93%B1)%3A%20%0A%ED%9A%8C%EC%8B%A0%20%EB%B0%9B%EC%9D%84%20%EC%9D%B4%EB%A9%94%EC%9D%BC%3A%20%0A%0A%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EB%82%98%20%EC%9D%B8%EC%A6%9D%20%EC%BD%94%EB%93%9C%EB%8A%94%20%EB%B3%B4%EB%82%B4%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4."
            >
              삭제 요청 이메일 작성 <Arrow />
            </a>
            <p className="form-note">
              이메일 앱이 열립니다. 직접 전송해야 요청이 접수됩니다.
              <br />
              이메일 앱이 없으면 주소를 복사하여 이용 중인 메일 서비스에서
              보내십시오.
            </p>
            <CopyButton value={email}>이메일 주소 복사</CopyButton>
          </section>
          <DeletionComposer />
          <section className="request-card">
            <span className="step-label">02 / 게임에서 직접 삭제</span>
            <h2>게임에 접근할 수 있다면.</h2>
            <ol className="numbered-steps">
              <li>
                <span>1</span>게임에서 <strong>설정</strong> 열기
              </li>
              <li>
                <span>2</span>
                <strong>계정 삭제 → 삭제</strong> 선택
              </li>
              <li>
                <span>3</span>삭제 안내 확인 후 최종 확인
              </li>
            </ol>
            <p>
              Google 연결 계정에서 이용할 수 있는 경로입니다. 익명 이용 중이거나
              삭제 항목이 보이지 않으면 위 이메일 경로로 문의할 수 있습니다.
            </p>
          </section>
        </article>
        <aside className="deletion-aside">
          <div className="info-panel">
            <span className="eyebrow">PLEASE READ</span>
            <h2>삭제 전에 확인하십시오.</h2>
            <h3>삭제되는 정보</h3>
            <p>
              게임 계정, Google 연결 정보, 서버의 진행 백업·사본, 로그인 기록,
              설치 연결 정보 및 해당 계정에 연결된 게임 서버 기록.
            </p>
            <h3>기기에 남는 정보</h3>
            <p>
              서버 계정 삭제 후에도 현재 기기의 게임 진행은 남습니다. 기기 내
              정보까지 지우려면 Android 설정에서 앱의 저장공간 → 데이터 삭제
              또는 앱 제거를 진행하십시오. 다시 실행하면 새로운 익명 계정이
              생성될 수 있습니다.
            </p>
            <h3>처리와 보관</h3>
            <p>
              앱 내 삭제는 정상 처리 시 즉시 반영됩니다. 이메일 요청은 본인 확인
              후 지체 없이 처리하고 결과를 회신합니다. 추가 확인이 필요하면
              필요한 정보와 처리 일정을 안내합니다. 삭제 완료 후 운영 게임
              데이터베이스에 별도 보관하는 계정 데이터는 없습니다. 지원 이메일
              내역은 완료 안내 후 30일 이내 삭제합니다.
            </p>
            <h3>복구 및 Google 계정</h3>
            <p>
              삭제한 서버 백업은 복구할 수 없습니다. 게임 계정 삭제로 Google
              계정 자체가 삭제되거나 구매 환불이 진행되지는 않습니다.
            </p>
            <a href="/privacy/">
              개인정보처리방침 보기 <Arrow />
            </a>
          </div>
          <p className="operator-note">
            운영자 포엘트리(4LTree)
            <br />
            대상 앱 나혼자 힐러 · Solo Healer
          </p>
        </aside>
      </div>
    </>
  );
}

import { Arrow, Mail } from "../../components/icons";
import CopyButton from "../../components/copy-button";
import { email } from "../../lib/content";
import { pageMetadata } from "../../lib/site";
export const metadata = pageMetadata(
  "고객지원 · 모험가 지원소",
  "나혼자 힐러 게임 문의, 오류 제보, 계정 복구 및 개인정보 지원. 4ltree.service@gmail.com",
  "/support/",
);
export default function SupportPage() {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <a className="breadcrumb" href="/">
            나혼자 힐러 <Arrow />
          </a>
          <p className="eyebrow">PLAYER SUPPORT</p>
          <h1>모험가 지원소</h1>
          <p>
            작은 불편부터 소중한 계정까지.
            <br />
            운영자에게 직접 문의할 수 있습니다.
          </p>
        </div>
      </section>
      <div className="container support-content">
        <section className="support-contact">
          <div className="contact-seal">
            <Mail />
          </div>
          <div>
            <p className="eyebrow">CONTACT 4LTREE</p>
            <h2>무엇을 도와드릴까요?</h2>
            <p>게임 문의 · 오류 제보 · 계정 복구 · 개인정보 권리 행사</p>
            <a
              className="support-email"
              href="mailto:4ltree.service@gmail.com?subject=%5B%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC%5D%20%EA%B3%A0%EA%B0%9D%EC%A7%80%EC%9B%90%20%EB%AC%B8%EC%9D%98"
            >
              4ltree.service@gmail.com <Arrow />
            </a>
            <div className="contact-actions">
              <a
                className="button gold"
                href="mailto:4ltree.service@gmail.com?subject=%5B%EB%82%98%ED%98%BC%EC%9E%90%20%ED%9E%90%EB%9F%AC%5D%20%EA%B3%A0%EA%B0%9D%EC%A7%80%EC%9B%90%20%EB%AC%B8%EC%9D%98"
              >
                이메일 문의 <Arrow />
              </a>
              <CopyButton value={email}>주소 복사</CopyButton>
            </div>
          </div>
        </section>
        <div className="support-quicklinks">
          <a href="/delete-account/">
            <span>
              ACCOUNT &amp; DATA<h2>계정 및 데이터 삭제</h2>
              <p>앱 없이도 이메일로 삭제 요청</p>
            </span>
            <Arrow />
          </a>
          <a href="/privacy/">
            <span>
              YOUR PRIVACY<h2>개인정보처리방침</h2>
              <p>처리하는 정보와 보관·삭제 안내</p>
            </span>
            <Arrow />
          </a>
        </div>
        <section className="faq">
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>자주 묻는 질문</h2>
          <details>
            <summary>
              Google 계정을 꼭 연결해야 합니까?<span aria-hidden="true">+</span>
            </summary>
            <p>
              Google 연결은 선택사항입니다. 게임은 기기에 진행을 저장하며,
              Google 계정을 연결하면 서버 자동 백업과 기기 변경 시 복원을 이용할
              수 있습니다. 연결하지 않은 상태에서 앱 데이터 삭제·앱 제거를 하면
              진행이 사라질 수 있습니다.
            </p>
          </details>
          <details>
            <summary>
              기기를 바꾸거나 앱을 다시 설치했습니다.
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              기존에 연결한 것과 같은 Google 계정을 설정에서 연결하십시오.
              서버에 백업이 있는 경우 게임에 표시되는 진행 선택 안내를
              확인하십시오. 계정 연결이나 백업이 없었던 경우 복원이 어려울 수
              있습니다.
            </p>
          </details>
          <details>
            <summary>
              계정을 삭제하면 Google 계정도 지워집니까?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              게임 계정과 관련 서버 데이터가 삭제됩니다. Google 계정 자체는
              삭제되지 않습니다. 현재 기기의 진행까지 삭제하려면 Android
              설정에서 앱 데이터를 지우거나 앱을 제거하십시오.
            </p>
          </details>
          <details>
            <summary>
              앱을 지웠는데 삭제 요청을 할 수 있습니까?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              가능합니다. 계정 및 데이터 삭제 페이지의 이메일 요청을
              이용하십시오. 앱 재설치나 웹 로그인 없이 요청을 시작할 수
              있습니다.
            </p>
          </details>
          <details>
            <summary>
              게임 오류를 제보하려면 무엇이 필요합니까?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              이용 중인 기기 모델, Android 버전, 게임 버전, 문제가 발생한 상황과
              시점을 알려주십시오. 개인정보를 가린 화면을 첨부하면 도움이
              됩니다. 비밀번호나 인증 코드는 보내지 마십시오.
            </p>
          </details>
        </section>
        <div className="support-fineprint">
          <p>
            이메일은 순차적으로 확인합니다. 계정 관련 요청은 본인 확인이 필요할
            수 있습니다.
          </p>
          <p>운영자 포엘트리(4LTree) · 대상 앱 나혼자 힐러(Solo Healer)</p>
        </div>
      </div>
    </>
  );
}

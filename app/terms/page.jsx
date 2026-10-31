import LegalPage from "../../components/legal-page";
import { terms } from "../../lib/content";
import { pageMetadata } from "../../lib/site";
export const metadata = pageMetadata(
  "이용약관",
  "나혼자 힐러(Solo Healer) 서비스 이용, 계정, 구매, 탈퇴 및 지원 안내.",
  "/terms/",
);
export default function TermsPage() {
  return (
    <LegalPage
      title="이용약관"
      english="TERMS OF SERVICE"
      description="모두의 즐거운 모험을 위한 이용 안내입니다."
      sections={terms}
    />
  );
}

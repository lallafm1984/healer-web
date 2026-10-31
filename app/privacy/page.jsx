import LegalPage from "../../components/legal-page";
import { privacy } from "../../lib/content";
import { pageMetadata } from "../../lib/site";
export const metadata = pageMetadata(
  "개인정보처리방침",
  "나혼자 힐러(Solo Healer)의 개인정보 처리 항목, 목적, 보관, 삭제 및 개인정보 보호 문의 안내.",
  "/privacy/",
);
export default function PrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      english="PRIVACY POLICY"
      description="어떤 정보를, 왜 처리하는지 투명하게 안내합니다."
      sections={privacy}
    />
  );
}

import LegalPage from "../../components/legal-page";
import { legalSections } from "../../lib/legal-content";
import { getLocale, localizedMetadata } from "../../lib/locale-server";
export const generateMetadata = () => localizedMetadata(
  "개인정보처리방침",
  "나혼자 힐러(Solo Healer)의 개인정보 처리 항목, 목적, 보관, 삭제 및 개인정보 보호 문의 안내.",
  "/privacy/",
);
export default async function PrivacyPage() {
  const locale = await getLocale();
  const { t } = locale;
  return (
    <LegalPage
      title={t("개인정보처리방침")}
      description={t("어떤 정보를, 왜 처리하는지 투명하게 안내합니다.")}
      sections={legalSections("privacy", locale)}
    />
  );
}

import LegalPage from "../../components/legal-page";
import { legalSections } from "../../lib/legal-content";
import { getLocale, localizedMetadata } from "../../lib/locale-server";
export const generateMetadata = () => localizedMetadata(
  "이용약관",
  "나혼자 힐러(Solo Healer) 서비스 이용, 계정, 구매, 탈퇴 및 지원 안내.",
  "/terms/",
);
export default async function TermsPage() {
  const locale = await getLocale();
  const { t } = locale;
  return (
    <LegalPage
      title={t("이용약관")}
      description={t("모두의 즐거운 모험을 위한 이용 안내입니다.")}
      sections={legalSections("terms", locale)}
    />
  );
}

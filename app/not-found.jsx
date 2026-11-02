import Link from "next/link";
import { Arrow } from "../components/icons";
import { getLocale } from "../lib/locale-server";
export async function generateMetadata() {
  const { t } = await getLocale();
  return { title: t("페이지를 찾을 수 없습니다"), robots: { index: false, follow: false } };
}
export default async function NotFound() {
  const { t, href } = await getLocale();
  return (
    <section className="not-found container">
      <h1>{t("길을 잠시 벗어났습니다.")}</h1>
      <p>{t("요청한 페이지가 이동했거나 주소가 잘못되었습니다.")}</p>
      <Link className="button gold" href={href("/")}>
        {t("성역으로 돌아가기")} <Arrow />
      </Link>
    </section>
  );
}

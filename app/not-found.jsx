import Link from "next/link";
import { Arrow } from "../components/icons";
export const metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <section className="not-found container">
      <p className="eyebrow">404 / LOST IN THE WOODS</p>
      <h1>길을 잠시 벗어났습니다.</h1>
      <p>요청한 페이지가 이동했거나 주소가 잘못되었습니다.</p>
      <Link className="button gold" href="/">
        성역으로 돌아가기 <Arrow />
      </Link>
    </section>
  );
}

import HomeExperience from "../components/home-experience";
import { localizedMetadata } from "../lib/locale-server";
export const generateMetadata = () => localizedMetadata(
  "나혼자 힐러: 던전 레이드 RPG · 공식 홈페이지",
  "Google Play 정식 출시. 탐험과 던전, 레이드에서 혼자 파티를 지키는 싱글 플레이 힐러 RPG. 지금 Android에서 나혼자 힐러를 만나보세요.",
  "/",
);
export default function HomePage() {
  return <HomeExperience />;
}

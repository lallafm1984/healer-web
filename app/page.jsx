import HomeExperience from "../components/home-experience";
import { localizedMetadata } from "../lib/locale-server";
export const generateMetadata = () => localizedMetadata(
  "나는 힐러가 된다 · Solo Healer",
  "파티의 마지막 희망은 당신의 손끝에. 7가지 힐러 직업으로 즐기는 싱글 플레이 RPG, 나혼자 힐러 공식 웹사이트.",
  "/",
);
export default function HomePage() {
  return <HomeExperience />;
}

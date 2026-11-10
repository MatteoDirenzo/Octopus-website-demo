import { HomeContent } from "@/components/HomeContent/HomeContent";
import content from "@/data/content.json";

export default function Home() {
  return <HomeContent heading={content.homeHeading} />;
}

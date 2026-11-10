import { HomePlaceholder } from "@/components/HomePlaceholder/HomePlaceholder";
import site from "@/data/site.json";

export default function Home() {
  return <HomePlaceholder heading={site.homeHeading} />;
}

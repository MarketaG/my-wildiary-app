import { getMinimalObservations } from "@/lib/fetch/observations";
import HomeSection from "@/components/sections/home-section";
/**
 * HOME PAGE
 */
export default async function HomePage() {
  const observations = await getMinimalObservations();

  return <HomeSection observations={observations} />;
}

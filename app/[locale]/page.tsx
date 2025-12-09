import { getMinimalObservations } from "@/lib/actions";
import HomeSection from "@/components/sections/home-section";
/**
 * HOME PAGE
 */
export default async function HomePage() {
  const observations = await getMinimalObservations();

  return <HomeSection observations={observations} />;
}

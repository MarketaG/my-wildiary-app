import { getObservation } from "@/lib/fetch/observations";
import { formatDate } from "@/lib/dayjs";
import ObservationDetailSection from "@/components/sections/observation-detail-section";

type ObservationPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

/**
 * ONE OBSERVATION PAGE
 */
export default async function OneObservationPage({
  params,
}: ObservationPageProps) {
  const { id, locale } = await params;

  const observation = await getObservation(id);

  if (!observation) {
    return <div>Observation not found</div>;
  }

  const formattedObservation = {
    ...observation,
    createdAt: formatDate(observation.createdAt, locale),
  };

  return <ObservationDetailSection observation={formattedObservation} />;
}

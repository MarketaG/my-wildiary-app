import { getObservation } from "@/lib/fetch/observations";
import { applyLocale, dayjs } from "@/lib/dayjs";
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

  await applyLocale(locale);

  const formattedObservation = {
    ...observation,
    createdAt: dayjs(observation.createdAt).format("LL"),
  };

  return <ObservationDetailSection observation={formattedObservation} />;
}

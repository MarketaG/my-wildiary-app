import { getObservations } from "@/lib/fetch/observations";
import ObservationListSection from "@/components/sections/observations-list-section";

type ObservationPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ObservationsPage({
  params,
}: ObservationPageProps) {
  const observations = await getObservations();
  const { locale } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {observations.map((o) => (
          <ObservationListSection key={o._id} observation={o} locale={locale} />
        ))}
      </div>
    </div>
  );
}

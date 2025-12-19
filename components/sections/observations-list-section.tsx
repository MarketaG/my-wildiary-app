import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Observation } from "@/lib/types";
import {
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

export type ObservationListSectionProps = {
  observation: Observation;
  locale: string;
};

/**
 * OBSERVATION LIST SECTION
 */
export default function ObservationListSection({
  observation,
  locale,
}: ObservationListSectionProps) {
  return (
    <Link href={`/observations/${observation._id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl">{observation.title}</CardTitle>

            {observation.animal && (
              <Badge variant="secondary">{observation.animal.commonName}</Badge>
            )}
          </div>

          <CardDescription className="line-clamp-2">
            {observation.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {observation.imageUrl && (
            <Image
              src={observation.imageUrl}
              alt={observation.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              <span>{observation.habitat}</span>
            </div>

            <div className="flex items-center gap-1">
              <SunIcon className="h-4 w-4" />
              <span>{observation.weather}</span>
            </div>

            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>{observation.user?.name ?? "Unknown"}</span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{formatDate(observation.createdAt, locale)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

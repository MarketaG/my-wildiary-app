import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Observation } from "@/lib/types";
import {
  MapPinIcon,
  CalendarIcon,
  CloudIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

type ObservationDetailSectionProps = {
  observation: Observation;
};

/**
 * OBSERVATION DETAIL SECTION
 */
export default function ObservationDetailSection({
  observation,
}: ObservationDetailSectionProps) {
  if (!observation) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-stone-200/60 bg-white nature-shadow">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-semibold text-stone-800 mb-2">
                Observation Not Found
              </h2>
              <p className="text-stone-600 mb-4">
                The observation you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link href="/observations">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Observations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/observations">
            <Button
              variant="outline"
              size="sm"
              className="border-stone-300 hover:bg-green-100/50 hover:text-green-800 hover:border-green-600"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="border-b border-stone-200/50 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-stone-800">
              {observation.title}
            </h1>
            <Badge variant="default">Default</Badge>
          </div>
          <p className="text-lg text-stone-600 italic">
            {observation.animal?.species}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 border-stone-200/60 overflow-hidden nature-shadow-lg">
            <CardContent className="p-0">
              <Image
                src={observation.image_url || "/default.png"}
                width={500}
                height={500}
                alt={observation.animal?.commonName || "Observation image"}
                className="w-full h-96 object-cover"
              />
            </CardContent>
          </Card>

          <Card className="border-stone-200/60 bg-white nature-shadow">
            <CardHeader className="border-b border-stone-200/40">
              <CardTitle className="text-stone-800">
                Observation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100/60 p-2">
                  <CalendarIcon className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Date</p>
                  <p className="font-semibold text-stone-800">
                    {observation.created_at}
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100/60 p-2">
                  <ClockIcon className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Time</p>
                  <p className="font-semibold text-stone-800">
                    {observation.}
                  </p>
                </div>
              </div> */}

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100/60 p-2">
                  <UserIcon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Observer</p>
                  <p className="font-semibold text-stone-800">
                    {observation.user?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100/60 p-2">
                  <MapPinIcon className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Coordinates</p>
                  <p className="font-semibold text-stone-800">
                    {observation.latitude.toFixed(4)},
                    {observation.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/60 bg-white nature-shadow">
            <CardHeader className="border-b border-stone-200/40">
              <CardTitle className="text-stone-800">
                Environmental Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sky-100/60 p-2">
                  <CloudIcon className="h-5 w-5 text-sky-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Weather</p>
                  <p className="font-semibold text-stone-800">
                    {observation.weather}
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100/60 p-2">
                  <SunIcon className="h-5 w-5 text-orange-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Temperature</p>
                  <p className="font-semibold text-stone-800">
                    {observation.}°C
                  </p>
                </div>
              </div> */}

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100/60 p-2">
                  <MapPinIcon className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Habitat</p>
                  <p className="font-semibold text-stone-800">
                    {observation.habitat}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-stone-200/60 bg-gradient-to-br from-white to-stone-50/50 nature-shadow">
            <CardHeader className="border-b border-stone-200/40">
              <CardTitle className="text-stone-800">Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-stone-700 leading-relaxed">
                {observation.description}
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-stone-200/60 bg-gradient-to-br from-green-50 to-emerald-50/50 nature-shadow">
            <CardContent className="pt-6">
              <Link href={`/?observation=${observation._id}`}>
                <Button
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  size="lg"
                >
                  <MapPinIcon className="mr-2 h-5 w-5" />
                  Show on Map
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

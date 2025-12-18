"use client";

import dynamic from "next/dynamic";
import { SearchBar } from "@/components/ui/nav/searchbar";
import { CreateObservation } from "@/components/ui/observation/create-observation";
import { MinimalObservation } from "@/lib/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Map = dynamic(() => import("../ui/map/map"), {
  ssr: false,
});

/**
 * HOME SECTION
 */
export default function HomeSection({
  observations,
}: {
  observations: MinimalObservation[];
}) {
  return (
    <main className="relative h-full">
      <div className="relative h-full">
        <Map observations={observations} />

        {/* overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-[1000] flex justify-center">
          <div className="pointer-events-auto flex items-center gap-3 h-10">
            <SearchBar
              placeholder="Search..."
              icon={MagnifyingGlassIcon}
              className="w-56"
            />
            <CreateObservation label="Create" />
          </div>
        </div>
      </div>
    </main>
  );
}

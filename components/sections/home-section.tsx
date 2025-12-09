"use client";

import dynamic from "next/dynamic";
import { MinimalObservation } from "@/lib/types";

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
    <main>
      <div className="absolute top-[64px] left-0 right-0 bottom-0 z-0">
        <Map observations={observations} />
      </div>
    </main>
  );
}

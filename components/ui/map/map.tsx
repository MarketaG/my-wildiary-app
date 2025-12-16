"use client";

import { Link } from "@/i18n/navigation";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { ReactNode } from "react";
import { MinimalObservation } from "@/lib/types";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export type MapMarker = {
  coords: LatLngTuple;
  popup: ReactNode;
};

const greenIcon = L.icon({
  iconUrl: "/leaf-green.png",
  shadowUrl: "/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

export default function Map({
  observations,
}: {
  observations: MinimalObservation[];
}) {
  const center: LatLngTuple = [49.8175, 15.473];

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {observations.map((o) => (
        <Marker key={o._id} position={o.coords} icon={greenIcon}>
          <Popup>
            <div style={{ maxWidth: "200px", lineHeight: "1.4" }}>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "4px",
                  fontWeight: "600",
                }}
              >
                {o.title}
              </h3>

              <p
                style={{ fontSize: "14px", margin: "0 0 6px 0", color: "#666" }}
              >
                {o.animal?.commonName}
              </p>

              {o.description && (
                <p style={{ fontSize: "13px", margin: 0 }}>
                  {o.description.length > 120
                    ? o.description.slice(0, 120) + "…"
                    : o.description}
                </p>
              )}
              <p className="pt-2">
                <Link href={`/observations/${o._id}`}>
                  <span className="flex items-center">
                    View Details <ArrowRightIcon className="w-3 h-3 ml-2" />
                  </span>
                </Link>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

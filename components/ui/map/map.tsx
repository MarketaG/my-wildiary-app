"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { MapIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

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

const markers: MapMarker[] = [
  // test data
  {
    coords: [50.0755, 14.4378],
    popup: (
      <div className="flex items-center gap-2">
        <MapIcon className="w-5 h-5 text-green-500" />
        <span>Observation: Fox in Prague</span>
      </div>
    ),
  },
  {
    coords: [49.1951, 16.6068],
    popup: (
      <div className="flex items-center gap-2">
        <MapIcon className="w-5 h-5 text-green-500" />
        <span>Observation: Deer in Brno</span>
      </div>
    ),
  },
  {
    coords: [49.8175, 15.473],
    popup: (
      <div className="flex items-center gap-2">
        <MapIcon className="w-5 h-5 text-green-500" />
        <span>Observation: Beaver in Vysočina</span>
      </div>
    ),
  },
];

export default function Map() {
  const center: LatLngTuple = [49.8175, 15.473];

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.coords} icon={greenIcon}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

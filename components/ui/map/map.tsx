"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { LatLngTuple } from "leaflet";
import { MapIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

export type MapMarker = {
  coords: LatLngTuple;
  popup: ReactNode;
};

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const markers: MapMarker[] = [
  //static test data
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
        <Marker key={idx} position={marker.coords} icon={customIcon}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

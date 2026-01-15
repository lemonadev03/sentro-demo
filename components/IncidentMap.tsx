"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type IncidentMapProps = {
  center: [number, number];
  label: string;
};

export default function IncidentMap({ center, label }: IncidentMapProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={markerIcon} />
      </MapContainer>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
        {label}
      </div>
    </div>
  );
}

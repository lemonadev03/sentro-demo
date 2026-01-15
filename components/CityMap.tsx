"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const points = [
  { name: "Manila", position: [14.5995, 120.9842] as [number, number] },
  { name: "Quezon City", position: [14.676, 121.0437] as [number, number] },
  { name: "Makati", position: [14.5547, 121.0244] as [number, number] },
  { name: "Pasig", position: [14.5764, 121.0851] as [number, number] },
];

export default function CityMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border">
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <Marker key={point.name} position={point.position} icon={markerIcon}>
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
        City overview
      </div>
    </div>
  );
}

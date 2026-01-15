"use client";

import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Create a custom icon for the responder (blue marker)
const responderIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type RouteMapProps = {
  start: [number, number];
  end: [number, number];
  path: Array<[number, number]>;
  label: string;
  currentPosition?: [number, number];
};

export default function RouteMap({ start, end, path, label, currentPosition }: RouteMapProps) {
  // Use currentPosition if provided, otherwise estimate position along route (about 40% of the way)
  const responderPosition = currentPosition || path[Math.floor(path.length * 0.4)] || path[0];
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border isolate">
      <MapContainer
        center={end}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={path}
          pathOptions={{ color: "#2563eb", weight: 4 }}
        />
        <Marker position={start} icon={markerIcon} />
        <Marker position={responderPosition} icon={responderIcon} />
        <Marker position={end} icon={markerIcon} />
      </MapContainer>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
        {label}
      </div>
    </div>
  );
}

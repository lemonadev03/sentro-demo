import { cn } from "@/lib/utils";
import type { SensorStatus } from "@/lib/monitoring-data";

type Zone = {
  id: string;
  name: string;
  status: SensorStatus;
};

type SensorMarker = {
  id: string;
  x: number;
  y: number;
  status: SensorStatus;
};

type MonitoringMapProps = {
  zones: Zone[];
  sensors: SensorMarker[];
  className?: string;
};

// SVG path data for each barangay zone
const zonePaths: Record<string, string> = {
  "san-roque": "M40,40 L120,30 L130,90 L100,120 L50,100 Z",
  "santa-ana": "M120,30 L200,35 L210,100 L130,90 Z",
  "malanday": "M200,35 L280,50 L270,130 L210,100 Z",
  "tumana": "M280,50 L360,70 L350,160 L270,130 Z",
  "concepcion": "M350,160 L360,70 L400,90 L400,180 L380,200 Z",
};

const getZoneColors = (status: SensorStatus) => {
  switch (status) {
    case "critical":
      return { fill: "#fecaca", stroke: "#ef4444" };
    case "warning":
      return { fill: "#fef08a", stroke: "#eab308" };
    default:
      return { fill: "#bbf7d0", stroke: "#22c55e" };
  }
};

const getSensorColor = (status: SensorStatus) => {
  switch (status) {
    case "critical":
      return "#ef4444";
    case "warning":
      return "#eab308";
    default:
      return "#22c55e";
  }
};

export default function MonitoringMap({
  zones,
  sensors,
  className,
}: MonitoringMapProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-xl border border-border bg-slate-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Barangay Map
        </h3>

        <svg
          viewBox="0 0 440 240"
          className="w-full h-auto"
          style={{ minHeight: "200px" }}
        >
          {/* Background */}
          <rect x="0" y="0" width="440" height="240" fill="#f8fafc" />

          {/* Barangay zones */}
          {zones.map((zone) => {
            const colors = getZoneColors(zone.status);
            const path = zonePaths[zone.id];
            if (!path) return null;

            return (
              <g key={zone.id}>
                <path
                  d={path}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="2"
                  className={cn(
                    "transition-all duration-300",
                    zone.status === "critical" && "animate-pulse"
                  )}
                />
                {/* Zone label - calculate center */}
                <text
                  x={getZoneCenter(zone.id).x}
                  y={getZoneCenter(zone.id).y}
                  textAnchor="middle"
                  className="text-[10px] font-medium fill-slate-600 pointer-events-none"
                >
                  {zone.name}
                </text>
              </g>
            );
          })}

          {/* River path */}
          <path
            d="M20,180 Q80,150 140,130 Q200,110 260,100 Q320,90 380,85 Q420,80 440,75"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M20,180 Q80,150 140,130 Q200,110 260,100 Q320,90 380,85 Q420,80 440,75"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Sensor markers */}
          {sensors.map((sensor) => {
            const color = getSensorColor(sensor.status);
            return (
              <g key={sensor.id}>
                {/* Pulse ring for critical sensors */}
                {sensor.status === "critical" && (
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="16"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}
                {/* Sensor dot */}
                <circle
                  cx={sensor.x}
                  cy={sensor.y}
                  r="8"
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                  className="drop-shadow-md"
                />
                {/* Sensor label */}
                <text
                  x={sensor.x}
                  y={sensor.y + 20}
                  textAnchor="middle"
                  className="text-[8px] font-bold fill-slate-700"
                >
                  {sensor.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Normal (&lt;2.0m)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            Warning (2.0-2.5m)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            Critical (&gt;2.5m)
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper to get zone center for label placement
function getZoneCenter(zoneId: string): { x: number; y: number } {
  const centers: Record<string, { x: number; y: number }> = {
    "san-roque": { x: 85, y: 70 },
    "santa-ana": { x: 165, y: 65 },
    "malanday": { x: 240, y: 80 },
    "tumana": { x: 315, y: 105 },
    "concepcion": { x: 375, y: 140 },
  };
  return centers[zoneId] || { x: 0, y: 0 };
}

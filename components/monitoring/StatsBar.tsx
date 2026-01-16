import { cn } from "@/lib/utils";
import type { SensorStatus } from "@/lib/monitoring-data";
import { Cloud, Droplets, Radio, AlertTriangle } from "lucide-react";

type StatsBarProps = {
  weather: string;
  rainfall: string;
  activeSensors: number;
  alertLevel: SensorStatus;
  className?: string;
};

const alertStyles: Record<SensorStatus, { label: string; className: string }> = {
  normal: {
    label: "Normal",
    className: "bg-emerald-100 text-emerald-700",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-100 text-amber-700",
  },
  critical: {
    label: "CRITICAL",
    className: "bg-red-100 text-red-700 animate-pulse font-bold",
  },
};

export default function StatsBar({
  weather,
  rainfall,
  activeSensors,
  alertLevel,
  className,
}: StatsBarProps) {
  const alertStyle = alertStyles[alertLevel];

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {/* Weather */}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <Cloud className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Weather</p>
          <p className="font-semibold">{weather}</p>
        </div>
      </div>

      {/* Rainfall */}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
          <Droplets className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Rainfall (24h)</p>
          <p className="font-semibold">{rainfall}</p>
        </div>
      </div>

      {/* Active Sensors */}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <Radio className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Active Sensors</p>
          <p className="font-semibold">{activeSensors} Active</p>
        </div>
      </div>

      {/* Alert Level */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border bg-card p-4",
          alertLevel === "critical" && "border-red-300 bg-red-50"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            alertLevel === "normal" && "bg-emerald-100 text-emerald-600",
            alertLevel === "warning" && "bg-amber-100 text-amber-600",
            alertLevel === "critical" && "bg-red-100 text-red-600"
          )}
        >
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Alert Level</p>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
              alertStyle.className
            )}
          >
            {alertStyle.label}
          </span>
        </div>
      </div>
    </div>
  );
}

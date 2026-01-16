import { cn } from "@/lib/utils";
import type { SensorStatus } from "@/lib/monitoring-data";
import { Activity, TrendingUp } from "lucide-react";

type SensorCardProps = {
  id: string;
  name: string;
  waterLevel: number;
  status: SensorStatus;
  rateOfChange?: string;
  onClick?: () => void;
  className?: string;
};

const statusStyles: Record<
  SensorStatus,
  { label: string; badgeClass: string; borderClass: string }
> = {
  normal: {
    label: "Normal",
    badgeClass: "bg-emerald-100 text-emerald-700",
    borderClass: "border-border",
  },
  warning: {
    label: "Warning",
    badgeClass: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-400",
  },
  critical: {
    label: "Critical",
    badgeClass: "bg-red-100 text-red-700 animate-pulse",
    borderClass: "border-red-500",
  },
};

export default function SensorCard({
  id,
  name,
  waterLevel,
  status,
  rateOfChange,
  onClick,
  className,
}: SensorCardProps) {
  const style = statusStyles[status];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl border-2 bg-card p-4 transition-all",
        style.borderClass,
        onClick && "cursor-pointer hover:bg-muted/50",
        status === "critical" && "shadow-lg shadow-red-500/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            status === "normal" && "bg-emerald-100 text-emerald-600",
            status === "warning" && "bg-amber-100 text-amber-600",
            status === "critical" && "bg-red-100 text-red-600"
          )}
        >
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{id}</p>
          <p className="font-medium">{name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xl font-bold tabular-nums">{waterLevel.toFixed(1)}m</p>
          {rateOfChange && (
            <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              {rateOfChange}
            </p>
          )}
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
            style.badgeClass
          )}
        >
          {style.label}
        </span>
      </div>
    </div>
  );
}

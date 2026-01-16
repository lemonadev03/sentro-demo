import { cn } from "@/lib/utils";
import { AlertTriangle, X } from "lucide-react";

type AlertBannerProps = {
  sensorId: string;
  location: string;
  waterLevel: number;
  rateOfChange: string;
  affectedCount: number;
  onDismiss?: () => void;
  className?: string;
};

export default function AlertBanner({
  sensorId,
  location,
  waterLevel,
  rateOfChange,
  affectedCount,
  onDismiss,
  className,
}: AlertBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-red-400 bg-gradient-to-r from-red-600 to-orange-500 p-4 text-white shadow-lg",
        "animate-pulse-slow",
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
          }}
        />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold uppercase tracking-wide">
            Critical Threshold Breached
          </h3>
          <p className="mt-1 text-white/90">
            <span className="font-semibold">{sensorId}</span> ({location}) has
            reached{" "}
            <span className="font-bold text-yellow-200">
              {waterLevel.toFixed(1)}m
            </span>
          </p>
          <p className="mt-0.5 text-sm text-white/80">
            {rateOfChange} increase in the last hour &bull; {affectedCount}{" "}
            downstream barangays at risk
          </p>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

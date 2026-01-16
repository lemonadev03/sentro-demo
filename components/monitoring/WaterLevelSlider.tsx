"use client";

import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

type WaterLevelSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export default function WaterLevelSlider({
  value,
  onChange,
  min = 0,
  max = 4,
  step = 0.1,
  className,
}: WaterLevelSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  // Determine status color for the value display
  const getValueColor = () => {
    if (value >= 2.5) return "text-red-600";
    if (value >= 2.0) return "text-amber-600";
    return "text-emerald-600";
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Water Level Simulation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-bold tabular-nums", getValueColor())}>
            {value.toFixed(1)}m
          </span>
        </div>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Background track with gradient zones */}
        <div className="absolute inset-0 h-3 rounded-full overflow-hidden top-1/2 -translate-y-1/2">
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(to right,
                #10b981 0%,
                #10b981 50%,
                #f59e0b 50%,
                #f59e0b 62.5%,
                #ef4444 62.5%,
                #ef4444 100%
              )`,
            }}
          />
        </div>

        {/* Active track (filled portion) */}
        <div
          className="absolute h-3 rounded-full top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: `${percentage}%`,
            background:
              value >= 2.5
                ? "#ef4444"
                : value >= 2.0
                ? "#f59e0b"
                : "#10b981",
          }}
        />

        {/* Actual slider input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="relative w-full h-3 appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-slate-400
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-slate-400
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:cursor-pointer
          "
        />
      </div>

      {/* Legend */}
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{min}m</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Warning
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Critical
          </span>
        </div>
        <span>{max}m</span>
      </div>
    </div>
  );
}

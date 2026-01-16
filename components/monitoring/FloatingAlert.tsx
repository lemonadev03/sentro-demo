"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Users, ChevronRight, X } from "lucide-react";

type BarangayInfo = {
  name: string;
  residents: number;
};

type FloatingAlertProps = {
  affectedBarangays: BarangayInfo[];
  onSendAlerts: () => void;
  onDismiss?: () => void;
  className?: string;
};

export default function FloatingAlert({
  affectedBarangays,
  onSendAlerts,
  onDismiss,
  className,
}: FloatingAlertProps) {
  const totalResidents = affectedBarangays.reduce(
    (sum, b) => sum + b.residents,
    0
  );

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 w-80",
        className
      )}
      style={{
        animation: "slideInRight 0.3s ease-out",
      }}
    >
      <div className="overflow-hidden rounded-2xl border-2 border-red-400 bg-white shadow-2xl shadow-red-500/20">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <span className="font-bold uppercase tracking-wide">
              Flood Alert
            </span>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-slate-600 mb-3">
            Critical water levels detected. Send evacuation alerts to affected
            barangays:
          </p>

          {/* Barangay list */}
          <div className="space-y-2 mb-4">
            {affectedBarangays.map((barangay) => (
              <div
                key={barangay.name}
                className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2"
              >
                <span className="font-medium text-sm">{barangay.name}</span>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Users className="h-3 w-3" />
                  <span>{barangay.residents.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between text-sm mb-4 px-1">
            <span className="text-slate-500">Total at risk</span>
            <span className="font-bold text-red-600">
              {totalResidents.toLocaleString()} residents
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onSendAlerts}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 active:scale-[0.98] transition-all"
          >
            <AlertTriangle className="h-4 w-4" />
            Send Alerts Now
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

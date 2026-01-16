"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Users, Bell, Truck, Check } from "lucide-react";
import { useState } from "react";

type BarangayOption = {
  id: string;
  name: string;
  residents: number;
  checked: boolean;
};

type ActionPanelProps = {
  barangays: BarangayOption[];
  onBarangayToggle: (id: string) => void;
  onSendAlerts: () => void;
  onDismiss?: () => void;
  className?: string;
};

export default function ActionPanel({
  barangays,
  onBarangayToggle,
  onSendAlerts,
  onDismiss,
  className,
}: ActionPanelProps) {
  const [notifyMDRRMO, setNotifyMDRRMO] = useState(true);
  const [prePositionUnits, setPrePositionUnits] = useState(true);

  const selectedBarangays = barangays.filter((b) => b.checked);
  const totalResidents = selectedBarangays.reduce(
    (sum, b) => sum + b.residents,
    0
  );

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-red-200 bg-red-50 p-5",
        className
      )}
    >
      <div className="flex items-center gap-2 text-red-700">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-bold uppercase tracking-wide">Recommended Actions</h3>
      </div>

      <div className="mt-4 space-y-4">
        {/* Barangay selection */}
        <div>
          <p className="text-sm font-medium text-slate-700">
            Send evacuation alert to:
          </p>
          <div className="mt-2 space-y-2">
            {barangays.map((barangay) => (
              <label
                key={barangay.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                  barangay.checked
                    ? "border-red-300 bg-white"
                    : "border-transparent bg-white/50 hover:bg-white/80"
                )}
              >
                <input
                  type="checkbox"
                  checked={barangay.checked}
                  onChange={() => onBarangayToggle(barangay.id)}
                  className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <div className="flex-1">
                  <span className="font-medium">{barangay.name}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  <span>{barangay.residents.toLocaleString()}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 font-medium">
          <span className="text-slate-600">Total Residents</span>
          <span className="text-lg font-bold text-red-700">
            {totalResidents.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-red-200" />

        {/* Additional options */}
        <div>
          <p className="text-sm font-medium text-slate-700">Also recommended:</p>
          <div className="mt-2 space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-white/50 p-3 hover:bg-white/80">
              <input
                type="checkbox"
                checked={notifyMDRRMO}
                onChange={(e) => setNotifyMDRRMO(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <Bell className="h-4 w-4 text-slate-500" />
              <span>Notify MDRRMO</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-white/50 p-3 hover:bg-white/80">
              <input
                type="checkbox"
                checked={prePositionUnits}
                onChange={(e) => setPrePositionUnits(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <Truck className="h-4 w-4 text-slate-500" />
              <span>Pre-position rescue units</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={onSendAlerts}
            disabled={selectedBarangays.length === 0}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all",
              selectedBarangays.length > 0
                ? "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
                : "cursor-not-allowed bg-slate-300"
            )}
          >
            <AlertTriangle className="h-5 w-5" />
            Send Alerts Now
          </button>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="rounded-xl px-6 py-3 font-medium text-slate-600 hover:bg-white transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

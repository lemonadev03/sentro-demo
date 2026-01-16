"use client";

import { cn } from "@/lib/utils";
import { Users, MapPin, Plus } from "lucide-react";

type Recipient = {
  id: string;
  name: string;
  residents: number;
  evacuationCenter: string;
};

type RecipientListProps = {
  recipients: Recipient[];
  selected: string[];
  onToggle: (id: string) => void;
  className?: string;
};

export default function RecipientList({
  recipients,
  selected,
  onToggle,
  className,
}: RecipientListProps) {
  const totalResidents = recipients
    .filter((r) => selected.includes(r.id))
    .reduce((sum, r) => sum + r.residents, 0);

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Recipients
      </h3>

      <div className="space-y-2">
        {recipients.map((recipient) => {
          const isSelected = selected.includes(recipient.id);
          return (
            <label
              key={recipient.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-slate-300 hover:bg-muted/30"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(recipient.id)}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{recipient.name}</span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {recipient.residents.toLocaleString()} residents
                    </span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{recipient.evacuationCenter}</span>
                </div>
              </div>

              {!isSelected && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggle(recipient.id);
                  }}
                  className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                >
                  <Plus className="h-3 w-3" />
                  Add
                </button>
              )}
            </label>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          Total Recipients
        </span>
        <span className="text-lg font-bold">
          {totalResidents.toLocaleString()} residents
        </span>
      </div>
    </div>
  );
}

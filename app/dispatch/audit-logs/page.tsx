"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";

const auditLogs = [
  {
    id: "audit-1",
    timestamp: "2 min ago",
    actor: "Admin Maria Santos",
    action: "Schedule Changed",
    target: "Unit 14",
    detail: "Changed Unit 14 schedule: Shift moved from 06:00-14:00 to 14:00-22:00",
  },
  {
    id: "audit-2",
    timestamp: "5 min ago",
    actor: "Admin Carlos Reyes",
    action: "Unit Availability Adjusted",
    target: "Available Units",
    detail: "Adjusted available units count: Added Unit 25 and Unit 31 to available pool",
  },
  {
    id: "audit-3",
    timestamp: "8 min ago",
    actor: "Dispatch Operator",
    action: "Assigned",
    target: "Unit 14",
    detail: "Assigned Unit 14 to incident P-2210 (Multi-vehicle collision)",
  },
  {
    id: "audit-4",
    timestamp: "12 min ago",
    actor: "Admin Maria Santos",
    action: "Configuration Updated",
    target: "System Settings",
    detail: "Updated response time threshold from 8 minutes to 6 minutes",
  },
  {
    id: "audit-5",
    timestamp: "15 min ago",
    actor: "Admin Carlos Reyes",
    action: "Schedule Changed",
    target: "Unit 22",
    detail: "Changed Unit 22 schedule: Extended shift by 2 hours due to high demand",
  },
  {
    id: "audit-6",
    timestamp: "18 min ago",
    actor: "Admin Lisa Chen",
    action: "Permission Updated",
    target: "User Permissions",
    detail: "Updated permissions for Dispatch Operator: Added incident editing capabilities",
  },
  {
    id: "audit-7",
    timestamp: "22 min ago",
    actor: "Admin Maria Santos",
    action: "Unit Availability Adjusted",
    target: "Unit 31",
    detail: "Manually set Unit 31 status from Out of service to Available",
  },
  {
    id: "audit-8",
    timestamp: "25 min ago",
    actor: "Dispatch Operator",
    action: "Created",
    target: "Incident P-2209",
    detail: "Created new incident: Residential fire alarm at Katipunan Ave",
  },
  {
    id: "audit-9",
    timestamp: "28 min ago",
    actor: "Admin Carlos Reyes",
    action: "Schedule Changed",
    target: "Medic 7",
    detail: "Changed Medic 7 schedule: Swapped with Medic 5 for next week",
  },
  {
    id: "audit-10",
    timestamp: "32 min ago",
    actor: "Admin Lisa Chen",
    action: "Configuration Updated",
    target: "Notification Settings",
    detail: "Updated email notification preferences: Added escalation alerts for critical incidents",
  },
  {
    id: "audit-11",
    timestamp: "35 min ago",
    actor: "System",
    action: "Updated",
    target: "Unit 22",
    detail: "Unit 22 status changed from Available to En route",
  },
  {
    id: "audit-12",
    timestamp: "38 min ago",
    actor: "Admin Maria Santos",
    action: "Unit Availability Adjusted",
    target: "Engine 3",
    detail: "Adjusted Engine 3 availability: Marked as maintenance required, removed from active pool",
  },
  {
    id: "audit-13",
    timestamp: "42 min ago",
    actor: "Admin Carlos Reyes",
    action: "Schedule Changed",
    target: "Unit 14",
    detail: "Changed Unit 14 schedule: Added overtime coverage for weekend shift",
  },
  {
    id: "audit-14",
    timestamp: "45 min ago",
    actor: "Dispatch Operator",
    action: "Updated",
    target: "Incident P-2208",
    detail: "Updated priority from medium to high for Power outage in Ermita",
  },
  {
    id: "audit-15",
    timestamp: "48 min ago",
    actor: "Admin Lisa Chen",
    action: "Permission Updated",
    target: "User Permissions",
    detail: "Revoked admin access for user John Doe, changed to operator role",
  },
  {
    id: "audit-16",
    timestamp: "52 min ago",
    actor: "Admin Maria Santos",
    action: "Configuration Updated",
    target: "Response Zones",
    detail: "Updated response zone boundaries: Expanded Zone 3 coverage area",
  },
  {
    id: "audit-17",
    timestamp: "55 min ago",
    actor: "Dispatch Operator",
    action: "Assigned",
    target: "Medic 7",
    detail: "Assigned Medic 7 to incident P-2207 (Medical assist requested)",
  },
  {
    id: "audit-18",
    timestamp: "58 min ago",
    actor: "Admin Carlos Reyes",
    action: "Unit Availability Adjusted",
    target: "Unit 25",
    detail: "Adjusted Unit 25 availability: Temporarily removed from rotation for training",
  },
  {
    id: "audit-19",
    timestamp: "1 hour ago",
    actor: "System",
    action: "Updated",
    target: "Unit 31",
    detail: "Unit 31 status changed from En route to On scene",
  },
  {
    id: "audit-20",
    timestamp: "1 hour 5 min ago",
    actor: "Admin Lisa Chen",
    action: "Schedule Changed",
    target: "Unit 22",
    detail: "Changed Unit 22 schedule: Split shift into two 6-hour periods",
  },
  {
    id: "audit-21",
    timestamp: "1 hour 8 min ago",
    actor: "Admin Maria Santos",
    action: "Configuration Updated",
    target: "Priority Rules",
    detail: "Updated priority classification rules: Added new criteria for infrastructure incidents",
  },
  {
    id: "audit-22",
    timestamp: "1 hour 12 min ago",
    actor: "Dispatch Operator",
    action: "Created",
    target: "Incident P-2206",
    detail: "Created new incident: Traffic accident at Roxas Blvd",
  },
  {
    id: "audit-23",
    timestamp: "1 hour 15 min ago",
    actor: "Admin Carlos Reyes",
    action: "Unit Availability Adjusted",
    target: "Available Units",
    detail: "Adjusted available units: Added backup Unit 40 to active rotation",
  },
  {
    id: "audit-24",
    timestamp: "1 hour 18 min ago",
    actor: "Admin Lisa Chen",
    action: "Permission Updated",
    target: "User Permissions",
    detail: "Granted supervisor access to Dispatch Operator Jane Smith",
  },
  {
    id: "audit-25",
    timestamp: "1 hour 22 min ago",
    actor: "Admin Maria Santos",
    action: "Schedule Changed",
    target: "Medic 5",
    detail: "Changed Medic 5 schedule: Shift swap approved with Medic 7",
  },
  {
    id: "audit-26",
    timestamp: "1 hour 25 min ago",
    actor: "Dispatch Operator",
    action: "Updated",
    target: "Incident P-2205",
    detail: "Updated location details and added notes for incident P-2205",
  },
  {
    id: "audit-27",
    timestamp: "1 hour 28 min ago",
    actor: "Admin Carlos Reyes",
    action: "Configuration Updated",
    target: "System Settings",
    detail: "Updated maximum concurrent incidents threshold from 15 to 20",
  },
  {
    id: "audit-28",
    timestamp: "1 hour 32 min ago",
    actor: "System",
    action: "Updated",
    target: "Engine 3",
    detail: "Engine 3 status changed from Available to Out of service",
  },
  {
    id: "audit-29",
    timestamp: "1 hour 35 min ago",
    actor: "Admin Lisa Chen",
    action: "Unit Availability Adjusted",
    target: "Unit 14",
    detail: "Adjusted Unit 14 availability: Extended service hours for emergency coverage",
  },
  {
    id: "audit-30",
    timestamp: "1 hour 38 min ago",
    actor: "Admin Maria Santos",
    action: "Schedule Changed",
    target: "Unit 31",
    detail: "Changed Unit 31 schedule: Modified break times to optimize coverage",
  },
];

const actionStyles: Record<string, string> = {
  Created: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
  Updated: "border-sky-500/40 bg-sky-500/10 text-sky-600",
  Assigned: "border-amber-500/40 bg-amber-500/10 text-amber-600",
  Deleted: "border-red-500/40 bg-red-500/10 text-red-600",
  "Schedule Changed": "border-purple-500/40 bg-purple-500/10 text-purple-600",
  "Unit Availability Adjusted": "border-orange-500/40 bg-orange-500/10 text-orange-600",
  "Configuration Updated": "border-indigo-500/40 bg-indigo-500/10 text-indigo-600",
  "Permission Updated": "border-pink-500/40 bg-pink-500/10 text-pink-600",
};

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) {
      return auditLogs;
    }
    const query = searchQuery.toLowerCase();
    return auditLogs.filter(
      (entry) =>
        entry.actor.toLowerCase().includes(query) ||
        entry.action.toLowerCase().includes(query) ||
        entry.target.toLowerCase().includes(query) ||
        entry.detail.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Audit Logs" backHref="/dispatch" />

      <SectionCard
        title="Activity History"
        description="Complete record of all dispatch actions and system changes."
      >
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing {filteredLogs.length} of {auditLogs.length} entries
            </p>
          )}
        </div>

        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-sm font-semibold text-foreground">
              No results found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredLogs.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-border bg-muted/20 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-foreground">
                      {entry.actor}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${
                        actionStyles[entry.action] ||
                        "border-border text-muted-foreground"
                      }`}
                    >
                      {entry.action}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-foreground">
                      {entry.target}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {entry.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{entry.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </main>
  );
}

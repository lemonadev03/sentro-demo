"use client";

import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";

// Mock data for global analytics
const kpiData = [
  { label: "Total Incidents", value: "47", trend: "+12%", trendLabel: "vs yesterday" },
  { label: "Active Incidents", value: "8", trend: null, trendLabel: "real-time" },
  { label: "Units Deployed", value: "12/27", trend: null, trendLabel: "44% utilization" },
  { label: "Avg Response", value: "5.2 min", trend: "-8%", trendLabel: "vs yesterday" },
  { label: "Resolution Rate", value: "94%", trend: "+2%", trendLabel: "vs yesterday" },
  { label: "Queue Depth", value: "4", trend: null, trendLabel: "pending" },
];

const statusBreakdown = [
  { status: "Pending Assignment", count: 4 },
  { status: "Units En Route", count: 5 },
  { status: "On Scene", count: 3 },
  { status: "Resolved Today", count: 39 },
];

const incidentTypes = [
  { type: "Traffic Collision", count: 18, percentage: 38 },
  { type: "Medical Emergency", count: 12, percentage: 26 },
  { type: "Fire", count: 8, percentage: 17 },
  { type: "Infrastructure", count: 6, percentage: 13 },
  { type: "Other", count: 3, percentage: 6 },
];

const responseTimes = [
  { priority: "Critical", target: "3 min", actual: "2.1 min", met: true },
  { priority: "Major", target: "5 min", actual: "4.3 min", met: true },
  { priority: "Moderate", target: "10 min", actual: "6.8 min", met: true },
  { priority: "Low", target: "15 min", actual: "12.4 min", met: true },
];

const fleetStatus = [
  { role: "Traffic", total: 8, available: 6, busy: 2 },
  { role: "Medical/EMS", total: 7, available: 5, busy: 2 },
  { role: "Fire", total: 5, available: 4, busy: 1 },
  { role: "Hazmat", total: 2, available: 2, busy: 0 },
  { role: "Support", total: 5, available: 4, busy: 1 },
];

const recentIncidents = [
  { id: "INC-2209", type: "Traffic Collision", location: "EDSA & Aurora", status: "On Scene", time: "2m ago" },
  { id: "INC-2208", type: "Fire Alarm", location: "Katipunan Ave", status: "Resolved", time: "5m ago" },
  { id: "INC-2207", type: "Medical Emergency", location: "Roxas Blvd", status: "Resolved", time: "12m ago" },
  { id: "INC-2206", type: "Power Outage", location: "Makati CBD", status: "Resolved", time: "18m ago" },
  { id: "INC-2205", type: "Traffic Accident", location: "C5 Northbound", status: "Resolved", time: "24m ago" },
];

export default function GlobalAnalyticsPage() {
  const fleetTotals = fleetStatus.reduce(
    (acc, item) => ({
      total: acc.total + item.total,
      available: acc.available + item.available,
      busy: acc.busy + item.busy,
    }),
    { total: 0, available: 0, busy: 0 }
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar
        title="Command Center Analytics"
        backHref="/dispatch"
      />
      <p className="-mt-4 text-sm text-muted-foreground px-1">
        System-wide operational metrics and performance overview
      </p>

      {/* Primary KPIs */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-xs font-semibold text-muted-foreground truncate">
              {kpi.label}
            </p>
            <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {kpi.trend && (
                <span className={kpi.trend.startsWith("+") ? "text-emerald-500" : kpi.trend.startsWith("-") ? "text-emerald-500" : ""}>
                  {kpi.trend}{" "}
                </span>
              )}
              {kpi.trendLabel}
            </p>
          </div>
        ))}
      </div>

      {/* Status & Incident Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Status Breakdown" description="Current incident status distribution">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                  <th className="px-4 py-2 text-right font-semibold">Count</th>
                </tr>
              </thead>
              <tbody>
                {statusBreakdown.map((item, idx) => (
                  <tr key={item.status} className={idx !== statusBreakdown.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 py-2.5">{item.status}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold">{item.count}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/30">
                  <td className="px-4 py-2.5 font-semibold">Total Active</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold">
                    {statusBreakdown.slice(0, 3).reduce((acc, item) => acc + item.count, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Incidents by Type" description="Distribution for today">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-right font-semibold">Count</th>
                  <th className="px-4 py-2 text-right font-semibold">%</th>
                </tr>
              </thead>
              <tbody>
                {incidentTypes.map((item, idx) => (
                  <tr key={item.type} className={idx !== incidentTypes.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 py-2.5">{item.type}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{item.count}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Response Times & Fleet Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Response Time Performance" description="Target vs actual by priority">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Priority</th>
                  <th className="px-4 py-2 text-right font-semibold">Target</th>
                  <th className="px-4 py-2 text-right font-semibold">Actual</th>
                  <th className="px-4 py-2 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {responseTimes.map((item, idx) => (
                  <tr key={item.priority} className={idx !== responseTimes.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 py-2.5 font-medium">{item.priority}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{item.target}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold">{item.actual}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${item.met ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}>
                        {item.met ? "✓" : "✗"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Fleet Overview" description="Unit availability by role">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Role</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Avail</th>
                  <th className="px-4 py-2 text-right font-semibold">Busy</th>
                </tr>
              </thead>
              <tbody>
                {fleetStatus.map((item, idx) => (
                  <tr key={item.role} className={idx !== fleetStatus.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 py-2.5">{item.role}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{item.total}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-emerald-500">{item.available}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-amber-500">{item.busy}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/30">
                  <td className="px-4 py-2.5 font-semibold">Total</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold">{fleetTotals.total}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-500">{fleetTotals.available}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-500">{fleetTotals.busy}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Recent Activity Log */}
      <SectionCard title="Recent Incidents" description="Latest activity across all categories">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">ID</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Location</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-right font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map((incident, idx) => (
                <tr key={incident.id} className={idx !== recentIncidents.length - 1 ? "border-b border-border" : ""}>
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold">{incident.id}</td>
                  <td className="px-4 py-2.5">{incident.type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{incident.location}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      incident.status === "On Scene"
                        ? "bg-amber-500/20 text-amber-500"
                        : incident.status === "Resolved"
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{incident.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Quick Access Reports */}
      <SectionCard title="Reports" description="Detailed analytics reports">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/dispatch/analytics/incident"
            className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="font-semibold">Incident Report</p>
              <p className="text-xs text-muted-foreground">Detailed incident metrics</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </Link>
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 px-4 py-3 opacity-60">
            <div>
              <p className="font-semibold">Responder Report</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 px-4 py-3 opacity-60">
            <div>
              <p className="font-semibold">Area Report</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-center">
        <Link
          href="/dispatch"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Back to Dispatch Home
        </Link>
      </div>
    </main>
  );
}

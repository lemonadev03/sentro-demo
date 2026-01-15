"use client";

import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";

export default function IncidentAnalyticsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar
        title="Incident Analytics"
        backHref="/dispatch/analytics"
      />
      <p className="-mt-4 text-sm text-muted-foreground px-1">
        Detailed incident metrics and performance insights
      </p>

      <SectionCard
        title="Overview"
        description="Key performance indicators for today."
      >
        <div className="grid gap-3 text-sm md:grid-cols-4">
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Total Incidents
            </p>
            <p className="text-2xl font-semibold">47</p>
            <p className="mt-1 text-xs text-muted-foreground">+12% vs yesterday</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Avg Response Time
            </p>
            <p className="text-2xl font-semibold">5.2 min</p>
            <p className="mt-1 text-xs text-muted-foreground">-8% vs yesterday</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Resolution Rate
            </p>
            <p className="text-2xl font-semibold">94%</p>
            <p className="mt-1 text-xs text-muted-foreground">+2% vs yesterday</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Active Units
            </p>
            <p className="text-2xl font-semibold">23</p>
            <p className="mt-1 text-xs text-muted-foreground">85% utilization</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Incident Types"
          description="Breakdown by category for today."
        >
          <div className="space-y-3 text-sm">
            {[
              { type: "Traffic Collision", count: 18, percentage: 38 },
              { type: "Medical Emergency", count: 12, percentage: 26 },
              { type: "Fire", count: 8, percentage: 17 },
              { type: "Infrastructure", count: 6, percentage: 13 },
              { type: "Other", count: 3, percentage: 6 },
            ].map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{item.type}</span>
                  <span className="text-muted-foreground">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/40">
                  <div
                    className="h-2 rounded-full bg-[color:var(--dispatch)]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Response Times"
          description="Average time to dispatch by priority level."
        >
          <div className="space-y-4 text-sm">
            {[
              { priority: "Critical", time: "2.1 min", color: "bg-red-500" },
              { priority: "Major", time: "4.3 min", color: "bg-amber-500" },
              { priority: "Moderate", time: "6.8 min", color: "bg-sky-500" },
              { priority: "Low", time: "12.4 min", color: "bg-muted-foreground" },
            ].map((item) => (
              <div key={item.priority} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="font-semibold text-foreground">{item.priority}</span>
                </div>
                <span className="text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recent Resolved Incidents"
        description="Last 5 closed incidents."
      >
        <div className="space-y-3 text-sm">
          {[
            {
              id: "INC-2209",
              title: "Multi-vehicle collision on EDSA",
              type: "Traffic collision",
              resolved: "2 min ago",
              responseTime: "24 min",
            },
            {
              id: "INC-2208",
              title: "Residential fire alarm",
              type: "Fire",
              resolved: "15 min ago",
              responseTime: "18 min",
            },
            {
              id: "INC-2207",
              title: "Medical assist requested",
              type: "Medical emergency",
              resolved: "32 min ago",
              responseTime: "12 min",
            },
            {
              id: "INC-2206",
              title: "Power outage in Ermita",
              type: "Infrastructure",
              resolved: "1 hour ago",
              responseTime: "45 min",
            },
            {
              id: "INC-2205",
              title: "Traffic accident on Roxas Blvd",
              type: "Traffic collision",
              resolved: "1 hour ago",
              responseTime: "28 min",
            },
          ].map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-foreground">{incident.title}</p>
                <p className="text-xs text-muted-foreground">
                  {incident.type} • {incident.id} • Resolved {incident.resolved}
                </p>
              </div>
              <div className="text-right text-xs">
                <p className="font-semibold text-foreground">{incident.responseTime}</p>
                <p className="text-muted-foreground">Total time</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-center">
        <Link
          href="/dispatch/analytics"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Back to Analytics
        </Link>
      </div>
    </main>
  );
}

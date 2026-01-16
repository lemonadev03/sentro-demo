"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderBar from "@/components/HeaderBar";
import ResponderCard from "@/components/ResponderCard";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { assignedResponder, mockIncident } from "@/lib/mock-data";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading route…
    </div>
  ),
});

export default function DispatchMonitoringPage() {
  const routePath: Array<[number, number]> = [
    [14.6208, 121.0531],
    [14.6179, 121.0507],
    [14.6154, 121.0476],
    [14.6126, 121.0434],
    [14.6102, 121.0399],
    [14.6089, 121.0362],
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar
        title="Live monitoring"
        backHref="/dispatch/incident"
        center={
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
            <Link
              href="/dispatch/incident"
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
            >
              Incident details
            </Link>
            <Link
              href="/dispatch/monitoring"
              className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
            >
              Live dispatch monitoring
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex min-h-[500px] flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex-1">
            <RouteMap
              start={routePath[0]}
              end={routePath[routePath.length - 1]}
              path={routePath}
              label="Unit 14 route"
            />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Current route follows EDSA toward Aurora Blvd.
          </div>
        </div>

        <div className="flex flex-col">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Incident status</h2>
                <p className="text-sm text-muted-foreground">
                  {mockIncident.locationLabel}
                </p>
              </div>
              <StatusBadge status="enroute" />
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Unit 14 is en route. Estimated arrival {assignedResponder.eta}.
            </p>
            <div className="border-t border-border pt-6">
              <h3 className="mb-4 text-base font-semibold">Assigned responder</h3>
              <ResponderCard
                name={assignedResponder.name}
                lead={assignedResponder.lead}
                role={assignedResponder.role}
                status="enroute"
                eta={assignedResponder.eta}
                distance={assignedResponder.distance}
                vehicle={assignedResponder.vehicle}
                contact={assignedResponder.contact}
                className="border-0 bg-transparent p-0 shadow-none"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

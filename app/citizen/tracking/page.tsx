"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import TimelineStepper from "@/components/TimelineStepper";
import ResponderCard from "@/components/ResponderCard";
import StatusBadge, { StatusBadgeValue } from "@/components/StatusBadge";
import FloatingActionBar from "@/components/FloatingActionBar";
import { assignedResponder, mockIncident } from "@/lib/mock-data";

const IncidentMap = dynamic(() => import("@/components/IncidentMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading route…
    </div>
  ),
});

const steps = [
  {
    key: "pending",
    label: "Report received",
    description: "Dispatch is reviewing the report.",
  },
  {
    key: "assigned",
    label: "Responder assigned",
    description: "A unit has been selected and briefed.",
  },
  {
    key: "enroute",
    label: "Responder en route",
    description: "Help is on the way.",
  },
  {
    key: "resolved",
    label: "Resolved",
    description: "Incident has been closed.",
  },
];

const statusFallback = ["pending", "assigned", "enroute", "resolved"] as const;

export default function CitizenTrackingPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const status: StatusBadgeValue = statusFallback.includes(
    (statusParam ?? "pending") as (typeof statusFallback)[number]
  )
    ? ((statusParam ?? "pending") as StatusBadgeValue)
    : "pending";

  const showResponder = status === "assigned" || status === "enroute";
  const showResolved = status === "resolved";

  // Route path for responder
  const routePath: Array<[number, number]> = [
    [14.6208, 121.0531],
    [14.6179, 121.0507],
    [14.6154, 121.0476],
    [14.6126, 121.0434],
    [14.6102, 121.0399],
    [14.6089, 121.0362],
  ];
  const incidentLocation: [number, number] = [14.5995, 120.9842];

  return (
    <>
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8 pb-24">
      <HeaderBar title="Tracking" backHref="/citizen" />

      <SectionCard title="Incident status">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={status} />
          <span className="text-sm text-muted-foreground">
            {mockIncident.locationLabel}
          </span>
        </div>
        <TimelineStepper steps={steps} currentKey={status} />
      </SectionCard>

      <SectionCard title="Map view" description="Incident location overview.">
        <div className="flex flex-col">
          <div className="h-[320px] w-full">
            {showResponder ? (
              <RouteMap
                start={routePath[0]}
                end={incidentLocation}
                path={routePath}
                label="Responder route"
                currentPosition={routePath[Math.floor(routePath.length * 0.4)]}
              />
            ) : (
              <IncidentMap center={incidentLocation} label="Incident location" />
            )}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            {showResponder
              ? `${assignedResponder.name} en route • ETA ${assignedResponder.eta}`
              : mockIncident.locationLabel}
          </div>
        </div>
      </SectionCard>

      {showResponder && (
        <SectionCard
          title="Assigned responder"
          description="A unit is on the way. You can message dispatch if needed."
          action={
            <button
              type="button"
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              Message dispatch
            </button>
          }
        >
          <ResponderCard
            name={assignedResponder.name}
            lead={assignedResponder.lead}
            role={assignedResponder.role}
            status="enroute"
            eta={assignedResponder.eta}
            distance={assignedResponder.distance}
            vehicle={assignedResponder.vehicle}
            contact={assignedResponder.contact}
          />
        </SectionCard>
      )}

      {showResolved && (
        <SectionCard
          title="Incident resolved"
          description="Thank you for helping keep your community safe."
        >
          <p className="text-sm text-muted-foreground">
            Responders marked this incident as resolved. Let us know how the
            response went.
          </p>
          <Link
            href="/citizen/resolved"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Leave feedback
          </Link>
        </SectionCard>
      )}

    </main>
    <FloatingActionBar
      onComments={() => console.log("Comments clicked")}
      onGroupChat={() => console.log("Group chat clicked")}
      onCall={() => console.log("Call clicked")}
    />
    </>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import MapPlaceholder from "@/components/MapPlaceholder";
import SectionCard from "@/components/SectionCard";
import TimelineStepper from "@/components/TimelineStepper";
import ResponderCard from "@/components/ResponderCard";
import StatusBadge, { StatusBadgeValue } from "@/components/StatusBadge";
import { assignedResponder, mockIncident } from "@/lib/mock-data";

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

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
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

      <MapPlaceholder
        src={mockIncident.incidentMapUrl}
        alt="Incident map"
        label="Incident map"
      />

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
  );
}

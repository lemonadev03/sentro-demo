"use client";

import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident, assignedResponder, mockResponders } from "@/lib/mock-data";

export default function IncidentRecapPage() {
  const priorityLabel =
    mockIncident.priority.charAt(0).toUpperCase() +
    mockIncident.priority.slice(1);
  const summaryNarrative = `At ${mockIncident.locationLabel}, caller ${mockIncident.callerName} reported a ${mockIncident.type.toLowerCase()} involving two vehicles. ${assignedResponder.name} was dispatched and arrived on scene to secure the area and manage traffic. One driver reported neck pain; medical support staged on standby. Incident was resolved and cleared within 24 minutes with no secondary hazards reported.`;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar
        title="Incident Recap"
        backHref="/dispatch/incident"
        description="Incident resolved and closed"
      />

      <SectionCard
        title="AI Executive Summary (Draft)"
        description="Auto-generated from call intake, unit status updates, and closing notes."
        action={
          <span className="inline-flex items-center rounded-full bg-[color:var(--civic-blue-100)] px-3 py-1 text-xs font-semibold text-[color:var(--civic-blue-600)]">
            Auto-generated
          </span>
        }
      >
        <div className="space-y-4">
          <p className="max-w-[72ch] text-sm leading-relaxed text-foreground">
            {summaryNarrative}
          </p>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Primary call type
              </p>
              <p className="font-semibold text-foreground">
                {mockIncident.type}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Priority level
              </p>
              <p className="font-semibold text-foreground">{priorityLabel}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Primary unit
              </p>
              <p className="font-semibold text-foreground">
                {assignedResponder.name}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Draft for supervisor review. Update if additional notes are received.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title={mockIncident.title}
        description={`${mockIncident.type} • ${mockIncident.locationLabel}`}
        action={<StatusBadge status="resolved" />}
      >
        <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Caller</p>
            <p>{mockIncident.callerName}</p>
            <p>{mockIncident.phone}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
              Incident ID
            </p>
            <p className="font-semibold text-foreground">{mockIncident.id}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Reported</p>
            <p>{mockIncident.reportedAt}</p>
            <p>{mockIncident.address}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
              Resolution time
            </p>
            <p className="font-semibold text-foreground">24 minutes</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 text-sm">
          {mockIncident.description}
        </div>
        <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs uppercase tracking-wide">Priority</p>
            <p className="font-semibold text-foreground">Major</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs uppercase tracking-wide">Units dispatched</p>
            <p className="font-semibold text-foreground">2 units</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs uppercase tracking-wide">Status</p>
            <p className="font-semibold text-foreground">Resolved</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Response Timeline"
        description="Key events and updates from incident creation to resolution."
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <div className="mt-1 h-full w-px bg-border"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">Incident Closed</span>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Incident marked as resolved. All units cleared from scene.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-[color:var(--dispatch)]"></div>
              <div className="mt-1 h-full w-px bg-border"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">Unit 14 On Scene</span>
                <span className="text-xs text-muted-foreground">18 min ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Unit 14 arrived and began traffic control. Scene secured.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-[color:var(--dispatch)]"></div>
              <div className="mt-1 h-full w-px bg-border"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">Unit 14 Assigned</span>
                <span className="text-xs text-muted-foreground">22 min ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Unit 14 assigned and en route. ETA 6 minutes.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">Incident Created</span>
                <span className="text-xs text-muted-foreground">24 min ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Initial report submitted via mobile app. Caller confirmed safe to approach.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Assigned Units"
        description="Units that responded to this incident."
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">{assignedResponder.name}</p>
              <p className="text-xs text-muted-foreground">
                {assignedResponder.lead} • {assignedResponder.role}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Cleared
            </span>
          </div>
          {mockResponders.slice(0, 1).map((responder) => (
            <div
              key={responder.id}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{responder.name}</p>
                <p className="text-xs text-muted-foreground">
                  {responder.lead} • {responder.role}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Cleared
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dispatch"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Back to Main Screen
        </Link>
        <Link
          href="/dispatch/analytics"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[color:var(--dispatch)] px-6 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90 transition-colors"
        >
          View Analytics
        </Link>
      </div>
    </main>
  );
}

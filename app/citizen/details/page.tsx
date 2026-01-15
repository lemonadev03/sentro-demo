"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import { mockIncident } from "@/lib/mock-data";

const IncidentMap = dynamic(() => import("@/components/IncidentMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[240px] items-center justify-center rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

export default function CitizenDetailsPage() {
  const incidentLocation: [number, number] = [14.5995, 120.9842];

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Add details" backHref="/citizen/type" />

      <SectionCard title="Location" description="Confirm the incident location.">
        <div className="space-y-4">
          <div className="h-[240px] w-full overflow-hidden rounded-xl border border-border">
            <IncidentMap center={incidentLocation} label="Current location" zoom={17} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/40 px-4 py-3 text-sm">
            <div>
              <p className="font-semibold">{mockIncident.locationLabel}</p>
              <p className="text-muted-foreground">{mockIncident.address}</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              Edit
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Photo" description="Add a photo to help responders.">
        <div className="grid grid-cols-3 gap-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted/40">
            <img
              src="/photos/vehicle.png"
              alt="Vehicle damage"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted/40">
            <img
              src="/photos/intersection.png"
              alt="Intersection"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted/40">
            <img
              src="/photos/front_car_issue.png"
              alt="Front car issue"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Description"
        description="Share what you see and whether anyone needs help."
      >
        <textarea
          defaultValue={mockIncident.description}
          className="min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </SectionCard>

      <Link
        href="/citizen/tracking?status=pending"
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Submit report
      </Link>
    </main>
  );
}

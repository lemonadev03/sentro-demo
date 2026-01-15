"use client";

import { useState } from "react";
import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderHomePage() {
  const [available, setAvailable] = useState(true);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Sentro</span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            Responder
          </span>
        </div>
        <Link
          href="/responder/alert"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          View alert
        </Link>
      </header>

      <SectionCard title="Availability">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm">
          <div>
            <p className="font-semibold">Status</p>
            <p className="text-muted-foreground">
              {available ? "Available for dispatch" : "Off duty"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAvailable((prev) => !prev)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              available
                ? "bg-[color:var(--success)] text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {available ? "On duty" : "Off duty"}
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Today’s responses" description="Most recent assignment.">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              {mockIncident.id}
            </p>
            <p className="text-base font-semibold">{mockIncident.title}</p>
            <p className="text-sm text-muted-foreground">
              {mockIncident.locationLabel}
            </p>
          </div>
          <StatusBadge status="assigned" />
        </div>
        <Link
          href="/responder/assignment"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
        >
          Open assignment
        </Link>
      </SectionCard>

      <SectionCard title="No active calls">
        <p className="text-sm text-muted-foreground">
          When dispatch assigns a new incident, you will see it here.
        </p>
      </SectionCard>
    </main>
  );
}

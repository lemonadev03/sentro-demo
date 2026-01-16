"use client";

import { useState } from "react";
import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderHomePage() {
  const [available, setAvailable] = useState(true);
  const [showAlert, setShowAlert] = useState(true); // Show alert when there's a new assignment

  return (
    <>
    {/* Alert Popup - Mobile Friendly */}
    {showAlert && (
      <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-80">
        <div className="overflow-hidden rounded-2xl border-2 border-[color:var(--dispatch)] bg-white shadow-2xl shadow-[color:var(--dispatch)]/20 hover:shadow-[color:var(--dispatch)]/30 transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[color:var(--dispatch)] to-blue-600 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <span className="font-bold uppercase tracking-wide text-sm sm:text-base">
                New Assignment
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAlert(false)}
              className="rounded-full bg-white/20 p-1 text-white hover:bg-white/30 transition-colors"
              aria-label="Close alert"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-slate-600 mb-2 font-medium">
              {mockIncident.title}
            </p>
            <p className="text-xs text-slate-500 mb-4">
              {mockIncident.locationLabel} • ETA 6 min
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/responder/assignment"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[color:var(--dispatch)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90 active:scale-[0.98] transition-all"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                View Assignment
              </Link>
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8 pb-24 sm:pb-8">
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
    </>
  );
}

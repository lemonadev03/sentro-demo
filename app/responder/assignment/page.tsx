"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import FloatingActionBar from "@/components/FloatingActionBar";
import { mockIncident } from "@/lib/mock-data";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading route…
    </div>
  ),
});

export default function ResponderAssignmentPage() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [groupChatOpen, setGroupChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  // Route path from responder location to incident
  const routePath: Array<[number, number]> = [
    [14.6208, 121.0531],
    [14.6179, 121.0507],
    [14.6154, 121.0476],
    [14.6126, 121.0434],
    [14.6102, 121.0399],
    [14.6089, 121.0362],
  ];
  const incidentLocation: [number, number] = [14.5995, 120.9842];
  const responderStart: [number, number] = routePath[0];

  return (
    <>
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8 pb-24">
      <HeaderBar title="Assignment detail" backHref="/responder" />

      <SectionCard
        title={mockIncident.title}
        description={mockIncident.locationLabel}
        action={<StatusBadge status="assigned" />}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{mockIncident.description}</p>
          <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm">
            <p className="font-semibold text-foreground">Address</p>
            <p className="text-muted-foreground">{mockIncident.address}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Route overview" description="Navigation to incident location.">
        <div className="flex flex-col">
          <div className="h-[320px] w-full">
            <RouteMap
              start={responderStart}
              end={incidentLocation}
              path={routePath}
              label="Route to incident"
              currentPosition={routePath[Math.floor(routePath.length * 0.2)]}
            />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            ETA: 6 minutes • Distance: 1.4 km
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Photos" description="Incident photos from reporter.">
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

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/responder/navigate"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--dispatch)] px-6 py-3 text-base font-semibold text-white hover:bg-[color:var(--dispatch)]/90 transition-colors"
        >
          Start navigation
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-semibold hover:bg-muted transition-colors"
        >
          Mark en route
        </button>
      </div>

      {/* Comments Panel */}
      {commentsOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCommentsOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Incident comments</p>
              <button
                type="button"
                onClick={() => setCommentsOpen(false)}
                className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">Dispatch</span>
                  <span className="text-xs text-muted-foreground">5 min ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Unit 14 assigned. Please proceed to location.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">System</span>
                  <span className="text-xs text-muted-foreground">6 min ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Incident created. Caller confirmed safe to approach.
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <textarea
                placeholder="Add a comment..."
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--dispatch)]/20"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCommentsOpen(false)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[color:var(--dispatch)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Group Chat Panel */}
      {groupChatOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setGroupChatOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Group chat</p>
                <p className="text-xs text-muted-foreground">
                  Dispatch, Unit 14, Unit 22
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGroupChatOpen(false)}
                className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground max-h-[400px] overflow-y-auto">
              <div className="rounded-xl bg-muted/40 px-3 py-2">
                <span className="font-semibold">Dispatch:</span> Unit 14, please confirm ETA.
              </div>
              <div className="rounded-xl bg-[color:var(--dispatch)]/10 px-3 py-2">
                <span className="font-semibold">Unit 14:</span> ETA 6 minutes, en route.
              </div>
              <div className="rounded-xl bg-muted/40 px-3 py-2">
                <span className="font-semibold">Unit 22:</span> Standing by for backup if needed.
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs"
                placeholder="Send message…"
              />
              <button className="rounded-full bg-[color:var(--dispatch)] px-3 py-2 text-xs font-semibold text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Panel */}
      {callOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCallOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Make a call</p>
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-xs mb-3">
              {[
                { label: "Caller", value: mockIncident.phone },
                { label: "Dispatch", value: "Radio 3A" },
                { label: "Backup unit", value: "+63 2 8550 1234" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/20 px-3 py-2 text-left hover:bg-muted"
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold mb-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    className="rounded-xl border border-border px-3 py-2 hover:bg-muted"
                  >
                    {key}
                  </button>
                )
              )}
            </div>
            <button className="w-full rounded-full bg-[color:var(--dispatch)] px-3 py-2 text-xs font-semibold text-white hover:bg-[color:var(--dispatch)]/90">
              Place call
            </button>
          </div>
        </div>
      )}
    </main>
    <FloatingActionBar
      onComments={() => setCommentsOpen(true)}
      onGroupChat={() => setGroupChatOpen(true)}
      onCall={() => setCallOpen(true)}
      commentsActive={commentsOpen}
      groupChatActive={groupChatOpen}
      callActive={callOpen}
    />
    </>
  );
}

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
import { MessageCircle, MessageSquare, Phone } from "lucide-react";

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

// Mock data for activity log, messages, and calls
const activityLog = [
  {
    id: "log-1",
    time: "6 min ago",
    author: "System",
    detail: "Your report has been received and is being reviewed.",
  },
  {
    id: "log-2",
    time: "4 min ago",
    author: "Dispatch",
    detail: "Incident assigned to Unit 14. Responder is being briefed.",
  },
  {
    id: "log-3",
    time: "2 min ago",
    author: "Dispatch",
    detail: "Unit 14 is en route. Estimated arrival in 6 minutes.",
  },
];

const messageLog = [
  {
    id: "message-1",
    sender: "You",
    time: "5 min ago",
    message: "Is there an update on when help will arrive?",
  },
  {
    id: "message-2",
    sender: "Dispatch",
    time: "4 min ago",
    message: "Yes, Unit 14 has been assigned and is en route. ETA 6 minutes.",
  },
  {
    id: "message-3",
    sender: "You",
    time: "1 min ago",
    message: "Thank you for the update.",
  },
];

const callLog = [
  {
    id: "call-1",
    contact: "Dispatch",
    time: "3 min ago",
    detail: "Called to confirm location. Confirmed safe to approach.",
  },
];

export default function CitizenTrackingPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const status: StatusBadgeValue = statusFallback.includes(
    (statusParam ?? "pending") as (typeof statusFallback)[number]
  )
    ? ((statusParam ?? "pending") as StatusBadgeValue)
    : "pending";

  const [messagesOpen, setMessagesOpen] = useState(false);
  const [callsOpen, setCallsOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

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

    {/* Floating panels for messages, calls, and comments */}
    <div className="fixed bottom-24 right-6 z-30 flex flex-col items-end gap-3">
      {messagesOpen && (
        <div className="w-80 rounded-2xl border border-border bg-card p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Messages</p>
              <p className="text-xs text-muted-foreground">Dispatch</p>
            </div>
            <button
              type="button"
              onClick={() => setMessagesOpen(false)}
              className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
            >
              Close
            </button>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {messageLog.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl px-3 py-2 text-xs ${
                  msg.sender === "You"
                    ? "ml-auto max-w-[80%] bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-[10px] opacity-70">{msg.time}</span>
                </div>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs"
              placeholder="Send message…"
            />
            <button className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
              Send
            </button>
          </div>
        </div>
      )}

      {callsOpen && (
        <div className="w-80 rounded-2xl border border-border bg-card p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Call history</p>
            <button
              type="button"
              onClick={() => setCallsOpen(false)}
              className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
            >
              Close
            </button>
          </div>
          <div className="space-y-3">
            {callLog.map((call) => (
              <div
                key={call.id}
                className="rounded-xl border border-border bg-muted/20 px-3 py-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    {call.contact}
                  </span>
                  <span className="text-muted-foreground">{call.time}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {call.detail}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            Call Dispatch
          </button>
        </div>
      )}

      {commentsOpen && (
        <div className="w-80 rounded-2xl border border-border bg-card p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Activity log</p>
            <button
              type="button"
              onClick={() => setCommentsOpen(false)}
              className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
            >
              Close
            </button>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {activityLog.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">
                    {log.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {log.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <FloatingActionBar
      onComments={() => setCommentsOpen((prev) => !prev)}
      onGroupChat={() => setMessagesOpen((prev) => !prev)}
      onCall={() => setCallsOpen((prev) => !prev)}
      commentsActive={commentsOpen}
      groupChatActive={messagesOpen}
      callActive={callsOpen}
    />
    </>
  );
}

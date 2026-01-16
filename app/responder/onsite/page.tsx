"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MessageCircle, MessageSquare, Phone } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import BottomActionBar from "@/components/BottomActionBar";
import PhotoCaptureContent from "@/components/PhotoCaptureContent";
import { mockIncident } from "@/lib/mock-data";

const checklistItems = [
  { id: "scene-safety", label: "Verify scene safety and traffic control." },
  { id: "injury-check", label: "Check for injuries and request medical support." },
  { id: "traffic-flow", label: "Set perimeter and coordinate traffic flow." },
  { id: "evidence", label: "Collect photos, plate numbers, and witness details." },
  { id: "dispatch-update", label: "Update dispatch with initial assessment." },
];

const activityLog = [
  {
    id: "log-1",
    time: "4 min ago",
    author: "Dispatch",
    detail: "Confirmed multi-vehicle collision, EMS on standby.",
  },
  {
    id: "log-2",
    time: "2 min ago",
    author: "Unit 14",
    detail: "On scene. Setting perimeter and checking injuries.",
  },
  {
    id: "log-3",
    time: "Just now",
    author: "Traffic Ops",
    detail: "Additional unit ETA 6 min. Preparing lane control.",
  },
];

const commentLog = [
  {
    id: "comment-1",
    author: "Sgt. Miguel Reyes",
    time: "1 min ago",
    message: "Two sedans involved, one minor injury reported.",
  },
  {
    id: "comment-2",
    author: "Ofc. Lara Cruz",
    time: "Just now",
    message: "Traffic is building. Recommend cones and detour signage.",
  },
];

const messageLog = [
  {
    id: "message-1",
    channel: "Dispatch",
    time: "2 min ago",
    message: "Send patient status once triage is complete.",
  },
  {
    id: "message-2",
    channel: "Unit 22",
    time: "1 min ago",
    message: "ETA 8 min. Need any additional equipment?",
  },
];

const callLog = [
  {
    id: "call-1",
    contact: "Dispatch Radio 3A",
    time: "5 min ago",
    detail: "Checked in and requested traffic support.",
  },
  {
    id: "call-2",
    contact: "EMS Unit 09",
    time: "2 min ago",
    detail: "Confirmed route and patient status pending.",
  },
];

type PanelKey = "activity" | "comments" | "messages" | "calls" | null;

export default function ResponderOnsitePage() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);

  const togglePanel = (panel: PanelKey) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  return (
    <>
      <main className="page page-content-with-actions mx-auto flex min-h-screen max-w-6xl flex-col gap-5">
        <HeaderBar title="On scene" backHref="/responder/navigate" />

        <SectionCard
          title={mockIncident.title}
          description={mockIncident.locationLabel}
          action={<StatusBadge status="enroute" />}
          className="p-4"
        >
          <p className="text-sm text-muted-foreground">
            Confirm the situation, stabilize the scene, and keep dispatch
            informed.
          </p>
          <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Incident ID
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {mockIncident.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Caller
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {mockIncident.callerName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reported
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {mockIncident.reportedAt}
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionCard
            title="On-site checklist"
            description="Track critical steps before clearing the scene."
            className="p-4"
          >
            <ul className="space-y-2">
              {checklistItems.map((item) => (
                <li key={item.id}>
                  <label
                    htmlFor={`check-${item.id}`}
                    className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground"
                  >
                    <input
                      id={`check-${item.id}`}
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-border accent-[color:var(--dispatch)]"
                    />
                    <span>{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2">
              <input
                className="input input-dense w-full"
                placeholder="Add checklist item"
                aria-label="Add checklist item"
              />
              <button className="btn btn-secondary btn-sm" type="button">
                Add
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="Photos"
            description="Capture evidence and context for the report."
            className="p-4"
          >
            <PhotoCaptureContent />
          </SectionCard>
        </div>

        <Link href="/responder/report" className="btn btn-primary btn-lg w-full">
          Complete report
        </Link>
      </main>

      {activePanel === "activity" && (
        <div
          className="modal-overlay z-[10000]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="modal modal-wide"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-title"
          >
            <div className="modal-header">
              <div>
                <p className="modal-title" id="activity-title">
                  Activity log
                </p>
                <p className="text-xs text-muted-foreground">
                  Recent updates and timestamps.
                </p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => setActivePanel(null)}
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <ul className="space-y-3">
                {activityLog.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-lg border border-border bg-muted/20 px-3 py-2"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {entry.author}
                      </span>
                      <span>{entry.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activePanel === "comments" && (
        <div
          className="modal-overlay z-[10000]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="comments-title"
          >
            <div className="modal-header">
              <div>
                <p className="modal-title" id="comments-title">
                  Comments
                </p>
                <p className="text-xs text-muted-foreground">
                  Responder observations and updates.
                </p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => setActivePanel(null)}
              >
                Close
              </button>
            </div>
            <div className="modal-body space-y-3">
              <ul className="space-y-3">
                {commentLog.map((comment) => (
                  <li
                    key={comment.id}
                    className="rounded-lg border border-border bg-muted/20 px-3 py-2"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {comment.author}
                      </span>
                      <span>{comment.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {comment.message}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <label htmlFor="new-comment" className="form-label">
                  Add comment
                </label>
                <textarea
                  id="new-comment"
                  className="input h-auto min-h-[96px] py-2"
                  placeholder="Document hazards, injuries, or actions taken."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" type="button">
                Save draft
              </button>
              <button className="btn btn-primary btn-sm" type="button">
                Post comment
              </button>
            </div>
          </div>
        </div>
      )}

      {activePanel === "messages" && (
        <div
          className="modal-overlay z-[10000]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="messages-title"
          >
            <div className="modal-header">
              <div>
                <p className="modal-title" id="messages-title">
                  Messages
                </p>
                <p className="text-xs text-muted-foreground">
                  Dispatch and unit coordination.
                </p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => setActivePanel(null)}
              >
                Close
              </button>
            </div>
            <div className="modal-body space-y-3">
              <ul className="space-y-3">
                {messageLog.map((message) => (
                  <li
                    key={message.id}
                    className="rounded-lg border border-border bg-muted/20 px-3 py-2"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {message.channel}
                      </span>
                      <span>{message.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {message.message}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <input
                  className="input input-dense w-full"
                  placeholder="Message dispatch..."
                  aria-label="Message dispatch"
                />
                <button className="btn btn-primary btn-sm" type="button">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePanel === "calls" && (
        <div
          className="modal-overlay z-[10000]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calls-title"
          >
            <div className="modal-header">
              <div>
                <p className="modal-title" id="calls-title">
                  Calls
                </p>
                <p className="text-xs text-muted-foreground">
                  Phone and radio coordination.
                </p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => setActivePanel(null)}
              >
                Close
              </button>
            </div>
            <div className="modal-body space-y-3">
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-secondary btn-sm" type="button">
                  Call dispatch
                </button>
                <button className="btn btn-secondary btn-sm" type="button">
                  Call EMS
                </button>
                <button className="btn btn-ghost btn-sm" type="button">
                  Open radio
                </button>
              </div>
              <ul className="space-y-3">
                {callLog.map((call) => (
                  <li
                    key={call.id}
                    className="rounded-lg border border-border bg-muted/20 px-3 py-2"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {call.contact}
                      </span>
                      <span>{call.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {call.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <BottomActionBar
        items={[
          {
            key: "activity",
            label: "Activity",
            icon: <Clock className="h-4 w-4" />,
            onClick: () => togglePanel("activity"),
            active: activePanel === "activity",
          },
          {
            key: "comments",
            label: "Comments",
            icon: <MessageCircle className="h-4 w-4" />,
            onClick: () => togglePanel("comments"),
            active: activePanel === "comments",
          },
          {
            key: "messages",
            label: "Messages",
            icon: <MessageSquare className="h-4 w-4" />,
            onClick: () => togglePanel("messages"),
            active: activePanel === "messages",
          },
          {
            key: "calls",
            label: "Calls",
            icon: <Phone className="h-4 w-4" />,
            onClick: () => togglePanel("calls"),
            active: activePanel === "calls",
          },
        ]}
      />
    </>
  );
}

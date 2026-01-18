"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  GripVertical,
  Pencil,
  Copy,
  Trash2,
  ShieldAlert,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  getIncidentFlowById,
  flowStatusLabels,
  questionTypeLabels,
  intensityLabels,
  IncidentFlow,
} from "@/lib/mock-incident-flows";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "questions", label: "Questions" },
  { id: "checklist", label: "On-site checklist" },
  { id: "dispatch", label: "Dispatch logic" },
  { id: "preview", label: "Preview" },
];

const checklistCategoryLabels: Record<
  IncidentFlow["checklist"][number]["category"],
  string
> = {
  police: "Police",
  marshal: "Marshals",
  ems: "EMS",
  fire: "Fire",
  traffic: "Traffic",
};

const checklistCategoryClasses: Record<
  IncidentFlow["checklist"][number]["category"],
  string
> = {
  police: "border-blue-500/20 bg-blue-500/10 text-blue-600",
  marshal: "border-amber-500/20 bg-amber-500/10 text-amber-600",
  ems: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
  fire: "border-red-500/20 bg-red-500/10 text-red-600",
  traffic: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600",
};

const intensityBadgeClass = (intensity: IncidentFlow["dispatchRules"][number]["intensity"]) => {
  switch (intensity) {
    case "low":
      return "badge-neutral";
    case "medium":
      return "badge-warning";
    case "high":
      return "badge-danger";
    case "critical":
      return "badge-danger";
    default:
      return "badge-neutral";
  }
};

const statusBadgeClass = (status: IncidentFlow["status"]) => {
  switch (status) {
    case "active":
      return "badge-success";
    case "draft":
      return "badge-warning";
    case "archived":
      return "badge-neutral";
    default:
      return "badge-neutral";
  }
};

export default function IncidentFlowDetailPage() {
  const router = useRouter();
  const params = useParams();
  const flowId = params.id as string;

  const [flow] = useState(() => getIncidentFlowById(flowId));
  const [activeTab, setActiveTab] = useState("overview");

  const checklistByCategory = useMemo(() => {
    if (!flow) return {} as Record<string, typeof flow.checklist>;
    return flow.checklist.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof flow.checklist>);
  }, [flow]);

  const intensitySignals = [
    { id: "s-1", label: "Armed = Yes", points: "+3" },
    { id: "s-2", label: "Immediate danger = Yes", points: "+2" },
    { id: "s-3", label: "3+ people involved", points: "+1" },
  ];

  if (!flow) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Incident flow not found</h2>
          <Link href="/dispatch/manage/incident-flows" className="btn btn-primary">
            Back to Incident Flows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="mb-6">
        <button
          onClick={() => router.push("/dispatch/manage/incident-flows")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Incident Flows
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="page-title">{flow.name}</h1>
              <span className="badge badge-info">{flow.category}</span>
              <span className={`badge ${statusBadgeClass(flow.status)}`}>
                {flowStatusLabels[flow.status]}
              </span>
            </div>
            <p className="page-subtitle">{flow.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-secondary">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </button>
            <button className="btn btn-primary">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Publish updates
            </button>
            <button className="btn btn-ghost text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="tabs mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Flow summary</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Flow ID</p>
                  <p className="font-medium text-foreground">{flow.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-foreground">{flowStatusLabels[flow.status]}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last updated</p>
                  <p className="font-medium text-foreground">{flow.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(flow.tags || ["protocol", "safety"]).map((tag) => (
                      <span key={tag} className="badge badge-neutral">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Flow activity</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Reports (30d)</p>
                  <p className="text-lg font-semibold text-foreground">{flow.usage30d}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Avg handle time</p>
                  <p className="text-lg font-semibold text-foreground">{flow.avgHandleTime}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Questions</p>
                  <p className="text-lg font-semibold text-foreground">{flow.questions.length}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Checklist items</p>
                  <p className="text-lg font-semibold text-foreground">{flow.checklist.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Logic overview</h2>
              <p className="text-sm text-muted-foreground">
                Summaries based on logic rules and intensity scoring.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-semibold">High-risk trigger</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Armed suspect or immediate danger routes to Police and Tactical Support.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-emerald-600" />
                  <p className="text-sm font-semibold">Checklist auto-load</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Marshal coordination and caller safety steps are required for all reports.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-semibold">Escalation path</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  EMS standby is added when immediate danger is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div className="card">
          <div className="card-header flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="card-title">Citizen questions</h2>
              <p className="text-sm text-muted-foreground">
                Drag to reorder questions or add conditional follow-ups.
              </p>
            </div>
            <button className="btn btn-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add question
            </button>
          </div>

          <div className="space-y-3">
            {flow.questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="pt-1 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {index + 1}. {question.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {questionTypeLabels[question.type]}
                          {question.helperText ? ` - ${question.helperText}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge badge-neutral">
                          {question.required ? "Required" : "Optional"}
                        </span>
                        {question.logic && question.logic.length > 0 && (
                          <span className="badge badge-info">Conditional</span>
                        )}
                        <button className="btn btn-ghost btn-sm">
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </button>
                      </div>
                    </div>

                    {question.options && question.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {question.options.map((option) => (
                          <span key={option} className="rounded-full border border-border px-3 py-1 text-xs">
                            {option}
                          </span>
                        ))}
                      </div>
                    )}

                    {question.logic && question.logic.length > 0 && (
                      <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/30 p-3">
                        <p className="text-xs font-semibold text-muted-foreground">Logic</p>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {question.logic.map((rule) => (
                            <li key={rule.id}>{rule.when}: {rule.action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "checklist" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">On-site checklist</h2>
              <p className="text-sm text-muted-foreground">
                Add role-specific reminders for responders.
              </p>
            </div>
            <button className="btn btn-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add checklist item
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {Object.entries(checklistByCategory).map(([category, items]) => (
              <div key={category} className="card">
                <div className="card-header flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        checklistCategoryClasses[category as keyof typeof checklistCategoryClasses]
                      }`}
                    >
                      {checklistCategoryLabels[category as keyof typeof checklistCategoryLabels]}
                    </span>
                    <span className="text-xs text-muted-foreground">{items.length} items</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">Reorder</button>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-3"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground">{item.notes}</p>
                          )}
                        </div>
                      </div>
                      <span className={`badge ${item.required ? "badge-success" : "badge-neutral"}`}>
                        {item.required ? "Required" : "Optional"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "dispatch" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Intensity model</h2>
                <p className="text-sm text-muted-foreground">
                  Signals roll up into incident intensity and dispatch tier.
                </p>
              </div>
              <div className="space-y-3">
                {intensitySignals.map((signal) => (
                  <div
                    key={signal.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <p className="text-sm font-medium text-foreground">{signal.label}</p>
                    <span className="text-xs font-semibold text-foreground">{signal.points}</span>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
                  Low: 0-1 points, Medium: 2-3 points, High: 4+ points
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Dispatch rules</h2>
                <p className="text-sm text-muted-foreground">
                  Configure recommendations based on answers and intensity.
                </p>
              </div>
              <div className="space-y-3">
                {flow.dispatchRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{rule.title}</p>
                        <p className="text-xs text-muted-foreground">{rule.condition}</p>
                      </div>
                      <span className={`badge ${intensityBadgeClass(rule.intensity)}`}>
                        {intensityLabels[rule.intensity]}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {rule.recommendedUnits.map((unit) => (
                        <span key={unit} className="rounded-full border border-border px-3 py-1 text-xs">
                          {unit}
                        </span>
                      ))}
                    </div>
                    {rule.notes && (
                      <p className="mt-2 text-xs text-muted-foreground">{rule.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Auto dispatch guidelines</h2>
              <p className="text-sm text-muted-foreground">
                Control whether the system suggests units automatically or requires dispatcher review.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Police units", status: "Requires review" },
                { label: "Marshal teams", status: "Auto-suggest" },
                { label: "EMS standby", status: "Conditional" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border bg-muted/30 p-3"
                >
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "preview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Citizen form preview</h2>
              <p className="text-sm text-muted-foreground">
                Sample view for a citizen reporting this incident.
              </p>
            </div>
            <div className="space-y-3">
              {flow.questions.map((question, index) => (
                <div key={question.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {index + 1}. {question.label}
                    </p>
                    {question.logic && question.logic.length > 0 && (
                      <span className="badge badge-info">Conditional</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {questionTypeLabels[question.type]} - {question.required ? "Required" : "Optional"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Responder checklist preview</h2>
                <p className="text-sm text-muted-foreground">
                  Checklist grouped by assigned responder role.
                </p>
              </div>
              <div className="space-y-3">
                {Object.entries(checklistByCategory).map(([category, items]) => (
                  <div key={category} className="rounded-lg border border-border p-3">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {checklistCategoryLabels[category as keyof typeof checklistCategoryLabels]}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-foreground">
                      {items.map((item) => (
                        <li key={item.id}>- {item.label}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Dispatch recommendation</h2>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-sm font-semibold text-emerald-700">
                  Scenario: Armed suspect confirmed
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  Recommended units: Police Unit, Tactical Support
                </p>
              </div>
              <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm font-semibold text-amber-700">
                  Scenario: Unarmed, low risk
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  Recommended units: Marshal Team
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

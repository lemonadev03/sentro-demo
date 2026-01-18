"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  MoreVertical,
  Pencil,
  Copy,
  Archive,
  GripVertical,
  Sparkles,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { DataTable, Column } from "@/components/crud";
import {
  mockIncidentFlows,
  flowStatusLabels,
  IncidentFlow,
  mockFlowSuggestions,
} from "@/lib/mock-incident-flows";

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

type FlowRow = IncidentFlow & { order: number };

export default function IncidentFlowsPage() {
  const router = useRouter();
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const flows: FlowRow[] = useMemo(
    () => mockIncidentFlows.map((flow, index) => ({ ...flow, order: index + 1 })),
    []
  );

  const activeCount = flows.filter((flow) => flow.status === "active").length;
  const draftCount = flows.filter((flow) => flow.status === "draft").length;
  const totalReports = flows.reduce((sum, flow) => sum + flow.usage30d, 0);
  const avgQuestions = Math.round(
    flows.reduce((sum, flow) => sum + flow.questions.length, 0) / flows.length
  );

  const columns: Column<FlowRow>[] = [
    {
      key: "order",
      header: "Order",
      className: "w-20",
      render: (flow) => (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GripVertical className="h-4 w-4" />
          <span>{flow.order}</span>
        </div>
      ),
    },
    {
      key: "name",
      header: "Incident flow",
      sortable: true,
      render: (flow) => (
        <div>
          <p className="font-medium text-foreground">{flow.name}</p>
          <p className="text-xs text-muted-foreground">
            {flow.category} - {flow.description}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (flow) => (
        <span className={`badge ${statusBadgeClass(flow.status)}`}>
          {flowStatusLabels[flow.status]}
        </span>
      ),
    },
    {
      key: "questions",
      header: "Questions",
      render: (flow) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {flow.questions.length} total
          </p>
          <p className="text-xs text-muted-foreground">
            {flow.questions.filter((q) => q.required).length} required
          </p>
        </div>
      ),
    },
    {
      key: "checklist",
      header: "Checklist",
      render: (flow) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {flow.checklist.length} items
          </p>
          <p className="text-xs text-muted-foreground">
            {flow.checklist.filter((item) => item.required).length} required
          </p>
        </div>
      ),
    },
    {
      key: "usage30d",
      header: "Usage (30d)",
      sortable: true,
      render: (flow) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {flow.usage30d} reports
          </p>
          <p className="text-xs text-muted-foreground">Avg handle {flow.avgHandleTime}</p>
        </div>
      ),
    },
    {
      key: "lastUpdated",
      header: "Updated",
      sortable: true,
      render: (flow) => (
        <span className="text-sm text-muted-foreground">{flow.lastUpdated}</span>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Incident flows</h1>
          <p className="page-subtitle">
            Build dynamic incident protocols for citizen intake and responder guidance.
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <BookOpen className="h-4 w-4 mr-2" />
            Templates
          </button>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New flow
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Active flows</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{activeCount}</p>
                  <p className="text-xs text-muted-foreground">{draftCount} draft flows</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Avg questions</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{avgQuestions}</p>
                  <p className="text-xs text-muted-foreground">Across active flows</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Reports covered</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{totalReports}</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          <DataTable
            data={flows}
            columns={columns}
            keyExtractor={(flow) => flow.id}
            searchPlaceholder="Search incident flows..."
            searchKeys={["name", "category", "description"]}
            onRowClick={(flow) => router.push(`/dispatch/manage/incident-flows/${flow.id}`)}
            headerActions={
              <button className="btn btn-ghost btn-sm">
                <GripVertical className="h-4 w-4 mr-2" />
                Reorder
              </button>
            }
            filters={
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Draft", value: "draft" },
                  { label: "Archived", value: "archived" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    className={`btn btn-ghost btn-sm ${filter.value === "all" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            }
            actions={(flow) => (
              <div className="relative">
                <button
                  onClick={() =>
                    setActionMenuOpen(actionMenuOpen === flow.id ? null : flow.id)
                  }
                  className="btn btn-ghost p-1.5"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {actionMenuOpen === flow.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActionMenuOpen(null)} />
                    <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[160px]">
                      <button
                        onClick={() => {
                          router.push(`/dispatch/manage/incident-flows/${flow.id}`);
                          setActionMenuOpen(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                      >
                        <Pencil className="h-4 w-4" /> Edit flow
                      </button>
                      <button
                        onClick={() => setActionMenuOpen(null)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" /> Duplicate
                      </button>
                      <button
                        onClick={() => setActionMenuOpen(null)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                      >
                        <Archive className="h-4 w-4" /> Archive
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Flow suggestions
              </h2>
              <p className="text-sm text-muted-foreground">
                Sentro detected emerging incident types based on report volume.
              </p>
            </div>
            <div className="space-y-3">
              {mockFlowSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.reports} reports - {suggestion.rationale}
                      </p>
                    </div>
                    <button className="btn btn-ghost btn-sm">Create flow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent updates</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Suspicious activity",
                  detail: "Added armed suspect follow-up question",
                  time: "2 hours ago",
                },
                {
                  title: "Traffic collision",
                  detail: "Updated checklist for tow coordination",
                  time: "Yesterday",
                },
                {
                  title: "Fire or smoke",
                  detail: "Auto dispatch rule for trapped occupants",
                  time: "2 days ago",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

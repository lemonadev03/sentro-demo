 "use client";

import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import dynamic from "next/dynamic";

const CityMap = dynamic(() => import("@/components/CityMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

const pendingStack = [
  {
    id: "P-2210",
    title: "Multi-vehicle collision",
    type: "Traffic collision",
    locationLabel: "EDSA",
    reportedAt: "3 min ago",
    priority: "critical",
  },
  {
    id: "P-2209",
    title: "Residential fire alarm",
    type: "Fire",
    locationLabel: "Katipunan Ave",
    reportedAt: "7 min ago",
    priority: "high",
  },
  {
    id: "P-2208",
    title: "Power outage in Ermita",
    type: "Infrastructure",
    locationLabel: "Taft Ave",
    reportedAt: "12 min ago",
    priority: "medium",
  },
  {
    id: "P-2207",
    title: "Medical assist requested",
    type: "Medical emergency",
    locationLabel: "Roxas Blvd",
    reportedAt: "17 min ago",
    priority: "medium",
  },
];

const priorityStyles: Record<string, string> = {
  critical: "border-red-500/40 bg-red-500/10 text-red-600",
  high: "border-amber-500/40 bg-amber-500/10 text-amber-600",
  medium: "border-sky-500/40 bg-sky-500/10 text-sky-600",
};

const unitStatus = [
  { id: "Unit 14", status: "Available", detail: "Cubao" },
  { id: "Unit 22", status: "En route", detail: "BGC" },
  { id: "Medic 7", status: "On scene", detail: "Ermita" },
  { id: "Engine 3", status: "Out of service", detail: "Station 3" },
  { id: "Unit 31", status: "Available", detail: "Binondo" },
];

const statusTone: Record<string, string> = {
  Available: "bg-emerald-500",
  "En route": "bg-sky-500",
  "On scene": "bg-amber-500",
  "Out of service": "bg-rose-500",
};

export default function DispatchHomePage() {
  return (
    <>
      <Link
        href="/dispatch/incident"
        className="fixed bottom-6 right-6 z-50 w-80"
        style={{
          animation: "slideInRight 0.3s ease-out",
        }}
      >
        <div className="overflow-hidden rounded-2xl border-2 border-red-400 bg-white shadow-2xl shadow-red-500/20 hover:shadow-red-500/30 transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="font-bold uppercase tracking-wide">
                New Incident
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-slate-600 mb-4">
              A new incident has been reported and requires your attention.
            </p>

            {/* CTA Button */}
            <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer">
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
              View Incident
            </div>
          </div>
        </div>
      </Link>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Sentro</span>
          <span className="rounded-full bg-[color:var(--dispatch)] px-3 py-1 text-xs font-semibold text-white">
            Dispatch
          </span>
        </div>
      </header>

      <SectionCard title="Today" description="Active incidents and response load.">
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Active incidents
            </p>
            <p className="text-2xl font-semibold">8</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Units en route
            </p>
            <p className="text-2xl font-semibold">5</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Average ETA
            </p>
            <p className="text-2xl font-semibold">6 min</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">
        <SectionCard
          title="Pending Stack"
          description="Prioritized queue awaiting assignment."
        >
          <div className="space-y-3">
            {pendingStack.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {incident.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {incident.type} • {incident.locationLabel}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {incident.id} • {incident.reportedAt}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${priorityStyles[incident.priority]}`}
                >
                  {incident.priority}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="CityMap" description="Live incident telemetry.">
          <CityMap />
        </SectionCard>

        <SectionCard
          title="Unit Status Board"
          description="Live availability across assigned teams."
        >
          <div className="space-y-3 text-sm">
            {unitStatus.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-foreground">{unit.id}</p>
                  <p className="text-xs text-muted-foreground">{unit.detail}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusTone[unit.status]}`}
                  />
                  <span>{unit.status}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Command Line"
          description="Dispatch macros and quick actions."
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Last: “Broadcast staging at 3rd & Pine.”</p>
            <input
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
              placeholder="Type a command, e.g. /assign Unit 14 to P-2210"
            />
            <button className="w-full rounded-full border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">
              Send command
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Phone Console"
          description="ANI/ALI verification and queue control."
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border bg-muted/40 px-3 py-2">
              <p className="text-xs uppercase tracking-wide">ANI / ALI</p>
              <p className="font-semibold text-foreground">+63 917 019 4421</p>
              <p>241 Rizal Ave • Apt 8</p>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2">
              <span>Queue depth</span>
              <span className="text-xs font-semibold text-foreground">
                4 callers
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Answer", "Hold", "Transfer"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-border px-2 py-2 text-xs font-semibold hover:bg-muted"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Radio Console"
          description="Active talkgroups and patching."
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Primary talkgroups</p>
            <div className="grid grid-cols-2 gap-2">
              {["Ops 1", "Ops 2", "EMS", "Fire", "Transit", "Citywide"].map(
                (label) => (
                  <button
                    key={label}
                    className="rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-muted"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
            <button className="w-full rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-muted">
              Open patch
            </button>
          </div>
        </SectionCard>
      </div>
    </main>
    </>
  );
}

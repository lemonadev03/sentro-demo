 "use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import ResponderCard from "@/components/ResponderCard";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { assignedResponder, mockIncident, mockResponders } from "@/lib/mock-data";
import { MessageCircle } from "lucide-react";

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

type PhotoItem = {
  label: string;
  image: string;
};

type ChecklistCategory = "police" | "ems" | "traffic" | null;
type UnitAssignment = {
  [category: string]: string[]; // category -> unit IDs
};

export default function DispatchIncidentPage() {
  const router = useRouter();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedChecklistCategory, setSelectedChecklistCategory] = useState<ChecklistCategory>(null);
  const [unitAssignments, setUnitAssignments] = useState<UnitAssignment>({});
  const searchParams = useSearchParams();
  const initialTab = useMemo(
    () => (searchParams.get("tab") === "monitoring" ? "monitoring" : "details"),
    [searchParams]
  );
  const [activeTab, setActiveTab] = useState<"details" | "monitoring">(
    initialTab
  );
  const routePath: Array<[number, number]> = [
    [14.6208, 121.0531],
    [14.6179, 121.0507],
    [14.6154, 121.0476],
    [14.6126, 121.0434],
    [14.6102, 121.0399],
    [14.6089, 121.0362],
  ];

  const photos: PhotoItem[] = [
    { label: "Vehicle damage", image: "/photos/vehicle.png" },
    { label: "Intersection", image: "/photos/intersection.png" },
    { label: "Front view", image: "/photos/front_car_issue.png" },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedPhoto]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <HeaderBar
        title="Incident detail"
        backHref="/dispatch"
        center={
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                activeTab === "details"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Incident details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("monitoring")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                activeTab === "monitoring"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Live dispatch monitoring
            </button>
          </div>
        }
        action={
          <button
            type="button"
            onClick={() => setAiEnabled((prev) => !prev)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              aiEnabled
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                : "border-border text-muted-foreground"
            }`}
          >
            AI Assist {aiEnabled ? "ON" : "OFF"}
          </button>
        }
      />

      {activeTab === "details" ? (
        <>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <SectionCard
              title={mockIncident.title}
              description={`${mockIncident.type} • ${mockIncident.locationLabel}`}
              action={<StatusBadge status="major" />}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">Caller</p>
                      {mockIncident.reporterVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600">
                          Unverified
                        </span>
                      )}
                    </div>
                    <p className="text-base font-medium text-foreground">{mockIncident.callerName}</p>
                    <p className="text-sm text-muted-foreground">{mockIncident.phone}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="h-4 w-4 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-foreground">
                        {mockIncident.reporterRating?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Reporter rating
                    </span>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Callback status
                    </p>
                    <p className="text-sm font-medium text-foreground">Connected • Confirmed safe to approach</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">Reported</p>
                    <p className="text-sm font-medium text-foreground">{mockIncident.reportedAt}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{mockIncident.address}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Location accuracy
                    </p>
                    <p className="text-sm font-medium text-foreground">GPS lock • 14m radius</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {mockIncident.description}
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/30 px-4 py-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority</p>
                  <p className="text-base font-semibold text-foreground">Major</p>
                </div>
                <div className="rounded-xl bg-muted/30 px-4 py-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Injuries</p>
                  <p className="text-base font-semibold text-foreground">1 possible</p>
                </div>
                <div className="rounded-xl bg-muted/30 px-4 py-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Traffic</p>
                  <p className="text-base font-semibold text-foreground">Heavy</p>
                </div>
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Recent Updates
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-[color:var(--dispatch)]"></div>
                      <div className="mt-1 h-full w-px bg-border"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">Dispatch</span>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Unit 14 assigned and en route. ETA 6 minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
                      <div className="mt-1 h-full w-px bg-border"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">System</span>
                        <span className="text-xs text-muted-foreground">5 min ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Incident created. Caller confirmed safe to approach.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">Caller</span>
                        <span className="text-xs text-muted-foreground">6 min ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Initial report submitted via mobile app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Photos" description="Captured by caller or nearby units.">
              <div className="space-y-3">
                {photos.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedPhoto(item)}
                    className="relative w-full h-48 overflow-hidden rounded-xl border border-border bg-muted/40 transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <SectionCard
              title="Incident editor"
              description="Update location, classification, and details."
            >
              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Location
                    </span>
                    <input
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
                      defaultValue={mockIncident.address}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Call type code
                    </span>
                    <input
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
                      defaultValue="TC-312"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Priority
                    </span>
                    <select
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
                      defaultValue="Major"
                    >
                      <option>Critical</option>
                      <option>Major</option>
                      <option>Moderate</option>
                      <option>Low</option>
                    </select>
                  </label>
                </div>
                <label className="flex flex-col space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Initial report
                  </span>
                  <div className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm text-foreground">
                    Caller reports two vehicles blocking lanes, one occupant reporting neck pain. Traffic backing up toward Quezon Ave.
                  </div>
                </label>
              </div>
            </SectionCard>

            <SectionCard title="Map view" description="Incident location overview.">
              <div className="flex h-full flex-col">
                <div className="flex-1 min-h-0">
                  <IncidentMap center={[14.5995, 120.9842]} label="Incident location" />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Nearest landmark: Rizal Park • 0.4 km
                </div>
              </div>
            </SectionCard>
          </div>

      <SectionCard title="CCTV verification" description="Nearby cameras for situational awareness.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "CCTV 12A • EDSA cor. Aurora Blvd, Quezon City", image: "/photos/cctv1.png" },
            { label: "CCTV 09C • 123 Aurora Blvd, Quezon City", image: "/photos/cctv2.png" },
            { label: "CCTV 03B • EDSA cor. Timog Ave, Quezon City", image: "/photos/cctv3.png" },
          ].map(
            (cctv) => (
              <div
                key={cctv.label}
                className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted/40"
              >
                <img
                  src={cctv.image}
                  alt={cctv.label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                  {cctv.label}
                </div>
              </div>
            )
          )}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <SectionCard
            title="AI recommendations"
            description="Triage support and staffing suggestions."
          >
            {aiEnabled ? (
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Summary",
                      value: "Multi-vehicle collision with blocked lanes.",
                    },
                    { title: "Risk flags", value: "Injury potential, congestion." },
                    { title: "Next actions", value: "Stage EMS + traffic." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl bg-muted/40 px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-wide">{item.title}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide">
                    Suggested roles
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      { label: "Traffic control", selected: true },
                      { label: "EMS triage", selected: true },
                      { label: "Fire support", selected: false },
                      { label: "Tow coordination", selected: true },
                    ].map((role) => (
                      <span
                        key={role.label}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          role.selected
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {role.label}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Auto-selected based on incident needs.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                AI assist disabled
              </div>
            )}
          </SectionCard>
          <SectionCard
            title="Response checklist"
            description="Select a category to assign units."
          >
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setSelectedChecklistCategory(selectedChecklistCategory === "police" ? null : "police");
                setSelectedUnit(null);
              }}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                selectedChecklistCategory === "police"
                  ? "border-[color:var(--dispatch)] bg-[color:var(--dispatch)]/10 ring-2 ring-[color:var(--dispatch)]/20"
                  : "border-border bg-muted/40 hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Police</p>
                  <p className="mt-1 text-xs text-muted-foreground">Traffic response & law enforcement</p>
                </div>
                {unitAssignments.police && unitAssignments.police.length > 0 && (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--dispatch)] text-xs font-semibold text-white">
                    {unitAssignments.police.length}
                  </span>
                )}
              </div>
              {unitAssignments.police && unitAssignments.police.length > 0 && (
                <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {unitAssignments.police.map((unitId) => {
                    const unit = mockResponders.find((r) => r.id === unitId);
                    return unit ? (
                      <div key={unitId} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--dispatch)]"></span>
                          <span className="font-medium text-foreground">{unit.name}</span>
                        </div>
                        <span className="text-muted-foreground">{unit.distance} • {unit.eta}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setSelectedChecklistCategory(selectedChecklistCategory === "ems" ? null : "ems");
                setSelectedUnit(null);
              }}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                selectedChecklistCategory === "ems"
                  ? "border-[color:var(--dispatch)] bg-[color:var(--dispatch)]/10 ring-2 ring-[color:var(--dispatch)]/20"
                  : "border-border bg-muted/40 hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">EMS</p>
                  <p className="mt-1 text-xs text-muted-foreground">Medical support & triage</p>
                </div>
                {unitAssignments.ems && unitAssignments.ems.length > 0 && (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--dispatch)] text-xs font-semibold text-white">
                    {unitAssignments.ems.length}
                  </span>
                )}
              </div>
              {unitAssignments.ems && unitAssignments.ems.length > 0 && (
                <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {unitAssignments.ems.map((unitId) => {
                    const unit = mockResponders.find((r) => r.id === unitId);
                    return unit ? (
                      <div key={unitId} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--dispatch)]"></span>
                          <span className="font-medium text-foreground">{unit.name}</span>
                        </div>
                        <span className="text-muted-foreground">{unit.distance} • {unit.eta}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setSelectedChecklistCategory(selectedChecklistCategory === "traffic" ? null : "traffic");
                setSelectedUnit(null);
              }}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                selectedChecklistCategory === "traffic"
                  ? "border-[color:var(--dispatch)] bg-[color:var(--dispatch)]/10 ring-2 ring-[color:var(--dispatch)]/20"
                  : "border-border bg-muted/40 hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Traffic Control</p>
                  <p className="mt-1 text-xs text-muted-foreground">Road management & flow</p>
                </div>
                {unitAssignments.traffic && unitAssignments.traffic.length > 0 && (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--dispatch)] text-xs font-semibold text-white">
                    {unitAssignments.traffic.length}
                  </span>
                )}
              </div>
              {unitAssignments.traffic && unitAssignments.traffic.length > 0 && (
                <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {unitAssignments.traffic.map((unitId) => {
                    const unit = mockResponders.find((r) => r.id === unitId);
                    return unit ? (
                      <div key={unitId} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--dispatch)]"></span>
                          <span className="font-medium text-foreground">{unit.name}</span>
                        </div>
                        <span className="text-muted-foreground">{unit.distance} • {unit.eta}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </button>
          </div>
        </SectionCard>
        </div>

        <SectionCard
          title="Nearby units"
          description={
            selectedChecklistCategory
              ? `Select units to assign to ${selectedChecklistCategory === "police" ? "Police" : selectedChecklistCategory === "ems" ? "EMS" : "Traffic Control"}`
              : "Select a checklist category to assign units."
          }
        >
          {!selectedChecklistCategory ? (
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Select a category from the checklist to view and assign units
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockResponders
                .filter((responder) => {
                  // Filter units based on selected category
                  if (selectedChecklistCategory === "police") {
                    return responder.role.includes("Traffic");
                  } else if (selectedChecklistCategory === "ems") {
                    return responder.role.includes("Medical") || responder.role.includes("EMS");
                  } else if (selectedChecklistCategory === "traffic") {
                    return responder.role.includes("Traffic");
                  }
                  return true;
                })
                .map((responder) => {
                  const isAssignedToSelected = unitAssignments[selectedChecklistCategory]?.includes(responder.id);
                  const assignedToOtherCategory = Object.entries(unitAssignments)
                    .filter(([cat]) => cat !== selectedChecklistCategory)
                    .find(([_, unitIds]) => unitIds.includes(responder.id))?.[0];
                  
                  return (
                    <button
                      key={responder.id}
                      type="button"
                      onClick={() => {
                        setUnitAssignments((prev) => {
                          const categoryUnits = prev[selectedChecklistCategory] || [];
                          const isAssigned = categoryUnits.includes(responder.id);
                          
                          return {
                            ...prev,
                            [selectedChecklistCategory]: isAssigned
                              ? categoryUnits.filter((id) => id !== responder.id)
                              : [...categoryUnits, responder.id],
                          };
                        });
                        setSelectedUnit(responder.id);
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                        isAssignedToSelected
                          ? "border-[color:var(--dispatch)] bg-[color:var(--dispatch)]/20 ring-2 ring-[color:var(--dispatch)]/30"
                          : "border-border bg-muted/30 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {responder.name}
                            </span>
                            {isAssignedToSelected ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--dispatch)] px-2 py-0.5 text-xs font-semibold text-white">
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
                                Assigned
                              </span>
                            ) : assignedToOtherCategory ? (
                              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600">
                                {assignedToOtherCategory === "police" ? "Police" : assignedToOtherCategory === "ems" ? "EMS" : "Traffic"}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {responder.lead} • {responder.role}
                          </p>
                        </div>
                        <div className="ml-4 text-right text-xs">
                          <div className="font-semibold text-foreground">{responder.eta}</div>
                          <div className="text-muted-foreground">{responder.distance}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              {mockResponders.filter((responder) => {
                if (selectedChecklistCategory === "police") {
                  return responder.role.includes("Traffic");
                } else if (selectedChecklistCategory === "ems") {
                  return responder.role.includes("Medical") || responder.role.includes("EMS");
                } else if (selectedChecklistCategory === "traffic") {
                  return responder.role.includes("Traffic");
                }
                return true;
              }).length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
                  No matching units available for {selectedChecklistCategory === "police" ? "Police" : selectedChecklistCategory === "ems" ? "EMS" : "Traffic Control"}
                </div>
              )}
            </div>
          )}
        </SectionCard>
      </div>

      <button
            type="button"
            onClick={() => setActiveTab("monitoring")}
            className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--dispatch)] px-6 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
          >
            Dispatch Unit 14
          </button>
        </>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex min-h-[500px] flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex-1">
                <RouteMap
                  start={routePath[0]}
                  end={routePath[routePath.length - 1]}
                  path={routePath}
                  label="Unit 14 route"
                />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Current route follows EDSA toward Aurora Blvd.
              </div>
            </div>

            <div className="flex flex-col">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Incident status</h2>
                    <p className="text-sm text-muted-foreground">
                      {mockIncident.locationLabel}
                    </p>
                  </div>
                  <StatusBadge status="enroute" />
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  Unit 14 is en route. Estimated arrival {assignedResponder.eta}.
                </p>
                <div className="border-t border-border pt-6">
                  <h3 className="mb-4 text-base font-semibold">Assigned responder</h3>
                  <ResponderCard
                    name={assignedResponder.name}
                    lead={assignedResponder.lead}
                    role={assignedResponder.role}
                    status="enroute"
                    eta={assignedResponder.eta}
                    distance={assignedResponder.distance}
                    vehicle={assignedResponder.vehicle}
                    contact={assignedResponder.contact}
                    className="border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <SectionCard
            title="Dispatch Actions"
            description="Quick actions for incident management."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  label: "Send more responders",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  variant: "primary" as const,
                },
                {
                  label: "Request EMS",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  variant: "danger" as const,
                },
                {
                  label: "Request Fire",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  ),
                  variant: "danger" as const,
                },
                {
                  label: "Request Traffic Control",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                  ),
                  variant: "secondary" as const,
                },
                {
                  label: "Request Backup",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  ),
                  variant: "warning" as const,
                },
                {
                  label: "Escalate Priority",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ),
                  variant: "warning" as const,
                },
                {
                  label: "Broadcast Alert",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  ),
                  variant: "secondary" as const,
                },
                {
                  label: "Request Hazmat",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M2 12h20" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  ),
                  variant: "danger" as const,
                },
                {
                  label: "Close Incident",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ),
                  variant: "secondary" as const,
                  onClick: () => router.push("/dispatch/incident/recap"),
                },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick || undefined}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    action.variant === "primary"
                      ? "border-[color:var(--dispatch)] bg-[color:var(--dispatch)] text-white hover:bg-[color:var(--dispatch)]/90"
                      : action.variant === "danger"
                        ? "border-red-500/40 bg-red-500/10 text-red-600 hover:bg-red-500/20"
                        : action.variant === "warning"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                          : "border-border bg-muted/30 text-foreground hover:bg-muted/50"
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>
        </>
      )}

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {chatOpen ? (
          <div className="w-72 rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Caller chat</p>
                <p className="text-xs text-muted-foreground">
                  {mockIncident.callerName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="rounded-xl bg-muted/40 px-3 py-2">
                Caller: I can see smoke near the curb.
              </div>
              <div className="rounded-xl bg-foreground px-3 py-2 text-background">
                Dispatch: Stay clear and keep a safe distance.
              </div>
              <div className="rounded-xl bg-muted/40 px-3 py-2">
                Caller: Copy, waiting.
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs"
                placeholder="Send message…"
              />
              <button className="rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background">
                Send
              </button>
            </div>
          </div>
        ) : null}

        {callOpen ? (
          <div className="w-72 rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Suggested calls</p>
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="rounded-full border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { label: "Caller", value: mockIncident.phone },
                { label: "On-scene unit", value: "Radio 3A" },
                { label: "Traffic control", value: "+63 2 8550 1234" },
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
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-semibold">
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
            <button className="mt-3 w-full rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background">
              Place call
            </button>
          </div>
        ) : null}

        {commentsOpen ? (
          <div className="w-72 rounded-2xl border border-border bg-card p-4 shadow-xl">
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
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Unit 14 assigned and en route. ETA 6 minutes.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">System</span>
                  <span className="text-xs text-muted-foreground">5 min ago</span>
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
        ) : null}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setChatOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lg hover:bg-foreground/90"
            aria-expanded={chatOpen}
            aria-controls="caller-chat"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.5 8.5 0 1 1-4.8-7.7" />
              <path d="M21 11.5c0 1.6-.5 3.1-1.4 4.4L21 21l-4.1-1.6A8.4 8.4 0 0 1 12.5 21" />
            </svg>
            Chat
          </button>
          <button
            type="button"
            onClick={() => setCallOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-lg hover:bg-muted"
            aria-expanded={callOpen}
            aria-controls="call-panel"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.5a2 2 0 0 1-.5 1.8l-1.6 1.6a16 16 0 0 0 6.9 6.9l1.6-1.6a2 2 0 0 1 1.8-.5l2.5.5a2 2 0 0 1 1.7 2z" />
            </svg>
            Call
          </button>
          <button
            type="button"
            onClick={() => setCommentsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-lg hover:bg-muted"
            aria-expanded={commentsOpen}
            aria-controls="comments-panel"
          >
            <MessageCircle className="h-4 w-4" />
            Comments
          </button>
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -right-12 top-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.label}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/60 px-4 py-2 text-center text-sm font-semibold text-white">
              {selectedPhoto.label}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

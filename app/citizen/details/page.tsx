"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import { mockIncident } from "@/lib/mock-data";
import { FlowQuestion, mockIncidentFlows } from "@/lib/mock-incident-flows";
import { Camera } from "lucide-react";

const IncidentMap = dynamic(() => import("@/components/IncidentMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[240px] items-center justify-center rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

export default function CitizenDetailsPage() {
  const [photosAdded, setPhotosAdded] = useState(false);
  const [yesNoAnswers, setYesNoAnswers] = useState<Record<string, "yes" | "no" | "unsure">>({});
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") ?? "suspicious";
  const incidentLocation: [number, number] = [14.5995, 120.9842];

  const flowIdMap: Record<string, string> = {
    traffic: "FLOW-TRF-001",
    medical: "FLOW-MED-001",
    fire: "FLOW-FIR-001",
    suspicious: "FLOW-SUS-001",
    criminal: "FLOW-CRIM-002",
    infrastructure: "FLOW-INF-001",
    other: "FLOW-GEN-001",
  };

  const selectedFlow = useMemo(() => {
    const flowId = flowIdMap[typeParam];
    return (
      mockIncidentFlows.find((flow) => flow.id === flowId) ||
      mockIncidentFlows.find((flow) => flow.id === "FLOW-SUS-001") ||
      mockIncidentFlows[0]
    );
  }, [typeParam]);

  const dynamicQuestions = useMemo(
    () =>
      selectedFlow.questions.filter(
        (question) => question.type !== "location" && question.type !== "photo"
      ),
    [selectedFlow]
  );

  const armedAnswer = yesNoAnswers["q-sus-3"];
  const dangerAnswer = yesNoAnswers["q-sus-5"];
  const showWeaponQuestion = selectedFlow.id === "FLOW-SUS-001" && armedAnswer === "yes";
  const showHighRiskHint = selectedFlow.id === "FLOW-SUS-001" && (armedAnswer === "yes" || dangerAnswer === "yes");

  const handleYesNoChange = (questionId: string, value: "yes" | "no" | "unsure") => {
    setYesNoAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const renderQuestionInput = (question: FlowQuestion) => {
    switch (question.type) {
      case "yes_no": {
        const currentValue = yesNoAnswers[question.id] ?? "unsure";
        return (
          <div className="flex flex-wrap gap-2">
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unsure", label: "Not sure" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleYesNoChange(question.id, option.value as "yes" | "no" | "unsure")}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  currentValue === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      }
      case "multiple_choice":
        return (
          <div className="grid gap-2 sm:grid-cols-2">
            {question.options?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs"
              >
                <input type="checkbox" className="h-4 w-4" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case "number":
        return (
          <input
            type="number"
            placeholder="Enter a number"
            className="input form-input w-full"
          />
        );
      case "short_text":
        return (
          <textarea
            placeholder="Add a short description"
            className="min-h-[100px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Add details" backHref="/citizen/type" />

      <SectionCard
        title="Incident questions"
        description={`Questions for ${selectedFlow.name}.`}
      >
        <div className="space-y-4">
          {dynamicQuestions.map((question) => {
            if (question.id === "q-sus-4" && !showWeaponQuestion) {
              return null;
            }
            return (
              <div
                key={question.id}
                className="rounded-xl border border-border bg-muted/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{question.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {question.required ? "Required" : "Optional"}
                    </p>
                  </div>
                  {question.logic && question.logic.length > 0 && (
                    <span className="badge badge-info">Conditional</span>
                  )}
                </div>
                <div className="mt-3">{renderQuestionInput(question)}</div>
              </div>
            );
          })}

          {selectedFlow.id === "FLOW-SUS-001" && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                showHighRiskHint
                  ? "border-red-500/30 bg-red-500/10 text-red-700"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
              }`}
            >
              {showHighRiskHint
                ? "Based on your answers, police response is recommended. Stay at a safe distance."
                : "Based on your answers, a marshal team can respond. Keep observing from a safe place."}
            </div>
          )}
        </div>
      </SectionCard>

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
        {!photosAdded ? (
          <button
            type="button"
            onClick={() => setPhotosAdded(true)}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/20 p-12 hover:bg-muted/40 transition-colors"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">Add photos</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap to add photos of the incident
              </p>
            </div>
          </button>
        ) : (
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
        )}
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

import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import { Car, HeartPulse, Flame, Eye, Wrench, FileText, ShieldAlert } from "lucide-react";

const incidentTypes = [
  { 
    label: "Traffic accident", 
    icon: Car, 
    color: "bg-blue-500/10 border-blue-500/20 text-blue-600 hover:bg-blue-500/20 hover:border-blue-500/40",
    questionCount: 4,
    helper: "Most common on main roads",
    tag: "Popular",
    value: "traffic",
  },
  { 
    label: "Medical emergency", 
    icon: HeartPulse, 
    color: "bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20 hover:border-red-500/40",
    questionCount: 4,
    helper: "Quick triage for responders",
    tag: "Priority",
    value: "medical",
  },
  { 
    label: "Fire or smoke", 
    icon: Flame, 
    color: "bg-orange-500/10 border-orange-500/20 text-orange-600 hover:bg-orange-500/20 hover:border-orange-500/40",
    questionCount: 5,
    helper: "Active flames or smoke reports",
    tag: "Priority",
    value: "fire",
  },
  { 
    label: "Suspicious activity", 
    icon: Eye, 
    color: "bg-purple-500/10 border-purple-500/20 text-purple-600 hover:bg-purple-500/20 hover:border-purple-500/40",
    questionCount: 6,
    helper: "May trigger police response",
    tag: "Updated",
    value: "suspicious",
  },
  { 
    label: "Criminal report", 
    icon: ShieldAlert, 
    color: "bg-amber-500/10 border-amber-500/20 text-amber-600 hover:bg-amber-500/20 hover:border-amber-500/40",
    questionCount: 3,
    helper: "Newly added based on reports",
    tag: "Emerging",
    value: "criminal",
  },
  { 
    label: "Infrastructure damage", 
    icon: Wrench, 
    color: "bg-amber-500/10 border-amber-500/20 text-amber-600 hover:bg-amber-500/20 hover:border-amber-500/40",
    questionCount: 4,
    helper: "Roads, power lines, or utilities",
    tag: "Community",
    value: "infrastructure",
  },
  { 
    label: "Other", 
    icon: FileText, 
    color: "bg-gray-500/10 border-gray-500/20 text-gray-600 hover:bg-gray-500/20 hover:border-gray-500/40",
    questionCount: 2,
    helper: "Describe the situation in detail",
    value: "other",
  },
];

export default function CitizenTypePage() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-4xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6">
      <HeaderBar title="Select incident type" backHref="/citizen" />

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">Incident selector</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Flows update based on recent reports and dispatcher feedback.
        </p>
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search incident flows"
            className="input form-input w-full"
          />
        </div>
      </div>

      <div className="grid w-full flex-1 grid-cols-2 gap-2.5 sm:gap-3">
        {incidentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Link
              key={type.label}
              href={`/citizen/details?type=${type.value}`}
              className={`flex flex-col justify-between gap-3 rounded-xl border p-4 text-center transition-colors sm:p-5 ${type.color}`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>{type.questionCount} questions</span>
                {type.tag && (
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase">
                    {type.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                <span className="text-base font-semibold leading-tight sm:text-lg">{type.label}</span>
                <span className="text-xs text-muted-foreground">{type.helper}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

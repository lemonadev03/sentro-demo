import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import { Car, HeartPulse, Flame, Eye, Wrench, FileText } from "lucide-react";

const incidentTypes = [
  { 
    label: "Traffic accident", 
    icon: Car, 
    color: "bg-blue-500/10 border-blue-500/20 text-blue-600 hover:bg-blue-500/20 hover:border-blue-500/40" 
  },
  { 
    label: "Medical emergency", 
    icon: HeartPulse, 
    color: "bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20 hover:border-red-500/40" 
  },
  { 
    label: "Fire or smoke", 
    icon: Flame, 
    color: "bg-orange-500/10 border-orange-500/20 text-orange-600 hover:bg-orange-500/20 hover:border-orange-500/40" 
  },
  { 
    label: "Suspicious activity", 
    icon: Eye, 
    color: "bg-purple-500/10 border-purple-500/20 text-purple-600 hover:bg-purple-500/20 hover:border-purple-500/40" 
  },
  { 
    label: "Infrastructure damage", 
    icon: Wrench, 
    color: "bg-amber-500/10 border-amber-500/20 text-amber-600 hover:bg-amber-500/20 hover:border-amber-500/40" 
  },
  { 
    label: "Other", 
    icon: FileText, 
    color: "bg-gray-500/10 border-gray-500/20 text-gray-600 hover:bg-gray-500/20 hover:border-gray-500/40" 
  },
];

export default function CitizenTypePage() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-4xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6">
      <HeaderBar title="Select incident type" backHref="/citizen" />

      <div className="grid w-full flex-1 grid-cols-2 gap-2.5 sm:gap-3">
        {incidentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Link
              key={type.label}
              href="/citizen/details"
              className={`flex flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center text-base font-semibold transition-colors sm:p-5 sm:text-lg ${type.color}`}
            >
              <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="leading-tight">{type.label}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

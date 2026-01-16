"use client";

import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";
import { useMonitoring } from "@/lib/monitoring-context";
import { barangays, weather, getStatusFromLevel } from "@/lib/monitoring-data";
import { AlertTriangle, MapPin, Phone } from "lucide-react";

export default function CitizenHomePage() {
  const { waterLevel, alertTriggered } = useMonitoring();
  
  // Determine alert status
  const warningTriggered = waterLevel > 2.0 && waterLevel <= 2.5;
  const isCritical = alertTriggered;
  const alertStatus = getStatusFromLevel(waterLevel);
  
  // Get affected barangays (simplified - in real app would be based on user location)
  const affectedBarangays = ["san-roque", "santa-ana", "malanday"];
  const affectedDetails = barangays.filter((b) => affectedBarangays.includes(b.id));

  // Mock citizen name - in real app would come from user context/auth
  const citizenName = "Kai Santos";

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Sentro</span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            Citizen
          </span>
        </div>
        <Link
          href="/citizen/tracking"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          Track report
        </Link>
      </header>

      {/* Personalized Greeting */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-sm font-semibold">{citizenName.charAt(0)}</span>
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">
            Hello, {citizenName}
          </p>
          <p className="text-xs text-muted-foreground">
            How can we help you today?
          </p>
        </div>
      </div>

      {/* Welcome to YourCity Section */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Welcome to YourCity
            </p>
            <p className="text-xs text-muted-foreground">
              Your trusted partner for emergency services and community safety
            </p>
          </div>
        </div>
      </div>

      {/* Flood Alert Banner - Critical */}
      {isCritical && (
        <div className="relative overflow-hidden rounded-xl border-2 border-red-400 bg-gradient-to-r from-red-600 to-orange-500 p-5 text-white shadow-lg">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`,
              }}
            />
          </div>
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                  EVACUATION NOTICE
                </h3>
                <p className="text-white/90 mb-4">
                  Water levels have reached <span className="font-bold text-yellow-200">CRITICAL</span> threshold. 
                  Evacuate to higher ground immediately.
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">Evacuation Centers:</p>
                    <div className="space-y-1.5">
                      {affectedDetails.map((barangay) => (
                        <div key={barangay.id} className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">{barangay.name}:</span>{" "}
                            <span className="text-white/90">{barangay.evacuationCenter}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>For assistance: <strong>911</strong> or <strong>8888</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flood Warning Banner */}
      {warningTriggered && !isCritical && (
        <div className="rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-500 p-5 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                FLOOD WARNING
              </h3>
              <p className="text-white/90 mb-4">
                Water levels are rising and approaching warning threshold. 
                Monitor conditions closely and prepare for possible evacuation.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Evacuation Centers (if needed):</p>
                  <div className="space-y-1.5">
                    {affectedDetails.map((barangay) => (
                      <div key={barangay.id} className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{barangay.name}:</span>{" "}
                          <span className="text-white/90">{barangay.evacuationCenter}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>For assistance: <strong>911</strong> or <strong>8888</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Status Card */}
      {alertStatus === "normal" && (
        <SectionCard
          title="Weather & Flood Monitoring"
          description={`Current water level: ${waterLevel.toFixed(1)}m • ${weather.condition}`}
        >
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-muted-foreground">All systems normal</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">24h rainfall: {weather.rainfall24h}</span>
          </div>
        </SectionCard>
      )}

      <SectionCard
        title="Report an incident"
        description="Start a report in under a minute. Share location, photo, and details."
      >
        <div className="space-y-4">
          <Link
            href="/citizen/type"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            File a Report
          </Link>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 py-6 text-lg font-semibold text-white shadow-lg hover:bg-red-700 transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <Phone className="h-6 w-6" />
            Call Emergency Services
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="My reports"
        description="Recent incident reports submitted from this device."
      >
        <div className="rounded-2xl border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {mockIncident.id}
              </p>
              <p className="text-base font-semibold">{mockIncident.title}</p>
              <p className="text-sm text-muted-foreground">
                {mockIncident.locationLabel}
              </p>
            </div>
            <StatusBadge status="pending" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Reported {mockIncident.reportedAt}
            </span>
            <Link
              href="/citizen/tracking?status=pending"
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              View status
            </Link>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}

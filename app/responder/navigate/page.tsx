"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Navigation, Volume2, VolumeX, Map, Maximize2, Minimize2 } from "lucide-react";
import { assignedResponder, mockIncident } from "@/lib/mock-data";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
      Loading navigation…
    </div>
  ),
});

const directions = [
  { instruction: "Turn right", street: "onto Aurora Blvd", distance: "0.2 mi", icon: "→" },
  { instruction: "Continue straight", street: "on Aurora Blvd", distance: "0.8 mi", icon: "↑" },
  { instruction: "Turn left", street: "onto EDSA", distance: "0.5 mi", icon: "←" },
  { instruction: "Arrive at destination", street: mockIncident.locationLabel, distance: "", icon: "📍" },
];

export default function ResponderNavigatePage() {
  const [muted, setMuted] = useState(false);
  const [mapView, setMapView] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Route path from responder location to incident
  const routePath: Array<[number, number]> = [
    [14.6208, 121.0531],
    [14.6179, 121.0507],
    [14.6154, 121.0476],
    [14.6126, 121.0434],
    [14.6102, 121.0399],
    [14.6089, 121.0362],
  ];
  const incidentLocation: [number, number] = [14.5995, 120.9842];
  const responderStart: [number, number] = routePath[0];
  const currentPosition = routePath[Math.floor(routePath.length * 0.6)];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <RouteMap
          start={responderStart}
          end={incidentLocation}
          path={routePath}
          label="Navigation"
          currentPosition={currentPosition}
        />
      </div>

      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/responder/assignment"
            className="flex items-center justify-center rounded-full bg-background/90 p-2 backdrop-blur-sm hover:bg-background"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="flex items-center justify-center rounded-full bg-background/90 p-2 backdrop-blur-sm hover:bg-background"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMapView(!mapView)}
              className="flex items-center justify-center rounded-full bg-background/90 p-2 backdrop-blur-sm hover:bg-background"
            >
              {mapView ? <Navigation className="h-5 w-5" /> : <Map className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Turn-by-turn directions card - centered */}
      <div className="absolute top-20 left-1/2 z-10 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
        <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground">Next turn</p>
              <p className="text-lg font-bold">{directions[currentStep].instruction}</p>
              <p className="text-sm text-muted-foreground">{directions[currentStep].street}</p>
            </div>
            <div className="text-3xl ml-4">{directions[currentStep].icon}</div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
            <div className="text-center">
              <span className="text-muted-foreground">ETA</span>
              <p className="font-semibold">{assignedResponder.eta}</p>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground">Distance</span>
              <p className="font-semibold">{directions[currentStep].distance || "Arriving"}</p>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground">Speed</span>
              <p className="font-semibold">45 mph</p>
            </div>
          </div>
        </div>
      </div>

      {/* Directions list (collapsible) - centered */}
      {mapView && (
        <div className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
          <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">Directions</p>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {directions.map((dir, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 rounded-lg p-2 ${
                    index === currentStep ? "bg-primary/10" : ""
                  }`}
                >
                  <span className="text-lg">{dir.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm ${index === currentStep ? "font-semibold" : ""}`}>
                      {dir.instruction}
                    </p>
                    <p className="text-xs text-muted-foreground">{dir.street}</p>
                    {dir.distance && (
                      <p className="text-xs text-muted-foreground">{dir.distance}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom action bar - centered */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl bg-card/95 px-4 py-3 backdrop-blur-sm">
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="text-sm font-semibold">{mockIncident.locationLabel}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-sm font-semibold">1.2 km</p>
            </div>
          </div>
          <Link
            href="/responder/onsite"
            className="flex w-full items-center justify-center rounded-full bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg hover:bg-green-700 transition-colors"
          >
            Arrived on scene
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  sensors as baseSensors,
  barangays,
  weather,
  type SensorStatus,
} from "@/lib/monitoring-data";
import { useMonitoring } from "@/lib/monitoring-context";
import StatsBar from "@/components/monitoring/StatsBar";
import SensorList from "@/components/monitoring/SensorList";
import MonitoringMap from "@/components/monitoring/MonitoringMap";
import AlertBanner from "@/components/monitoring/AlertBanner";
import FloatingAlert from "@/components/monitoring/FloatingAlert";
import WaterLevelSlider from "@/components/monitoring/WaterLevelSlider";

// Sensor positions on the SVG map
const sensorPositions: Record<string, { x: number; y: number }> = {
  "RS-001": { x: 90, y: 155 },
  "RS-002": { x: 160, y: 125 },
  "RS-003": { x: 240, y: 105 },
  "RS-004": { x: 320, y: 92 },
  "RS-005": { x: 390, y: 82 },
};

export default function MonitoringPage() {
  const router = useRouter();
  const {
    waterLevel,
    setWaterLevel,
    bannerDismissed,
    setBannerDismissed,
    floatingAlertDismissed,
    setFloatingAlertDismissed,
    alertTriggered,
  } = useMonitoring();

  // Determine alert level for stats bar
  const alertLevel: SensorStatus = alertTriggered
    ? "critical"
    : waterLevel > 2.0
    ? "warning"
    : "normal";

  // Compute sensor data based on water level
  const sensorsData = useMemo(() => {
    return baseSensors.map((sensor) => {
      if (alertTriggered) {
        // When alert is triggered, show specific alert levels
        if (sensor.id === "RS-001") {
          return {
            ...sensor,
            waterLevel: 2.7,
            status: "critical" as SensorStatus,
            rateOfChange: "+0.5m/hr",
          };
        }
        if (sensor.id === "RS-002") {
          return {
            ...sensor,
            waterLevel: 2.1,
            status: "warning" as SensorStatus,
            rateOfChange: "+0.3m/hr",
          };
        }
      }
      // Normal state
      return {
        ...sensor,
        waterLevel: sensor.normalLevel,
        status: "normal" as SensorStatus,
      };
    });
  }, [alertTriggered]);

  // Compute zone statuses for map
  const zoneStatuses = useMemo(() => {
    return barangays.map((b) => {
      let status: SensorStatus = "normal";
      if (alertTriggered) {
        if (["san-roque", "malanday"].includes(b.id)) {
          status = "critical";
        } else if (b.id === "riverside") {
          status = "warning";
        }
      }
      return { id: b.id, name: b.name, status };
    });
  }, [alertTriggered]);

  // Sensor markers for map
  const sensorMarkers = useMemo(() => {
    return sensorsData.map((s) => ({
      id: s.id,
      x: sensorPositions[s.id]?.x || 0,
      y: sensorPositions[s.id]?.y || 0,
      status: s.status,
    }));
  }, [sensorsData]);

  // Affected barangays for floating alert
  const affectedBarangays = useMemo(() => {
    const affectedIds = ["san-roque", "riverside", "malanday"];
    return barangays
      .filter((b) => affectedIds.includes(b.id))
      .map((b) => ({
        name: b.name,
        residents: b.residents,
      }));
  }, []);

  const handleSendAlerts = () => {
    // Store affected barangay IDs in session storage for compose page
    const affectedIds = ["san-roque", "riverside", "malanday"];
    sessionStorage.setItem("alertBarangays", JSON.stringify(affectedIds));
    router.push("/monitoring/compose");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b px-4 py-4 transition-colors duration-300",
          alertTriggered
            ? "border-red-300 bg-gradient-to-r from-red-600 to-orange-500"
            : "border-border bg-card"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1
            className={cn(
              "text-xl font-bold",
              alertTriggered ? "text-white" : "text-foreground"
            )}
          >
            Weather & Flood Monitoring
          </h1>
          <div
            className={cn(
              "text-sm font-semibold tracking-wide",
              alertTriggered ? "text-white/90" : "text-muted-foreground"
            )}
          >
            SENTRO
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 space-y-4">
        {/* Stats Bar */}
        <StatsBar
          weather={weather.condition}
          rainfall={weather.rainfall24h}
          activeSensors={5}
          alertLevel={alertLevel}
        />

        {/* Alert Banner */}
        {alertTriggered && !bannerDismissed && (
          <AlertBanner
            sensorId="RS-001"
            location="Brgy. San Roque"
            waterLevel={2.7}
            rateOfChange="+0.5m"
            affectedCount={3}
            onDismiss={() => setBannerDismissed(true)}
          />
        )}

        {/* Main Content */}
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Left Panel - Sensor List */}
          <div className="lg:col-span-2">
            <SensorList
              sensors={sensorsData.map((s) => ({
                id: s.id,
                name: s.name,
                waterLevel: s.waterLevel,
                status: s.status,
                rateOfChange: s.rateOfChange,
              }))}
            />
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-3">
            <MonitoringMap zones={zoneStatuses} sensors={sensorMarkers} />
          </div>
        </div>

        {/* Demo Control Slider */}
        <WaterLevelSlider value={waterLevel} onChange={setWaterLevel} />
      </main>

      {/* Floating Alert - appears when alert triggered */}
      {alertTriggered && !floatingAlertDismissed && (
        <FloatingAlert
          affectedBarangays={affectedBarangays}
          onSendAlerts={handleSendAlerts}
          onDismiss={() => setFloatingAlertDismissed(true)}
        />
      )}
    </div>
  );
}

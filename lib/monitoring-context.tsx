"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type MonitoringState = {
  waterLevel: number;
  setWaterLevel: (level: number) => void;
  bannerDismissed: boolean;
  setBannerDismissed: (dismissed: boolean) => void;
  floatingAlertDismissed: boolean;
  setFloatingAlertDismissed: (dismissed: boolean) => void;
  warningAlertDismissed: boolean;
  setWarningAlertDismissed: (dismissed: boolean) => void;
  alertTriggered: boolean;
};

const MonitoringContext = createContext<MonitoringState | null>(null);

const STORAGE_KEY = "monitoring-state";

// Default values - used for both server and initial client render
const DEFAULT_STATE = {
  waterLevel: 1.2,
  bannerDismissed: false,
  floatingAlertDismissed: false,
  warningAlertDismissed: false,
};

export function MonitoringProvider({ children }: { children: ReactNode }) {
  // Always start with defaults to ensure server/client match
  const [waterLevel, setWaterLevel] = useState(DEFAULT_STATE.waterLevel);
  const [bannerDismissed, setBannerDismissed] = useState(
    DEFAULT_STATE.bannerDismissed
  );
  const [floatingAlertDismissed, setFloatingAlertDismissed] = useState(
    DEFAULT_STATE.floatingAlertDismissed
  );
  const [warningAlertDismissed, setWarningAlertDismissed] = useState(
    DEFAULT_STATE.warningAlertDismissed
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.waterLevel !== undefined) {
          setWaterLevel(parsed.waterLevel);
          // If water level is critical, don't load dismissed state for critical alerts
          const isCritical = parsed.waterLevel > 2.5;
          if (isCritical && parsed.floatingAlertDismissed) {
            // Don't load dismissed state when critical - force alert to show
            setFloatingAlertDismissed(false);
          } else if (parsed.floatingAlertDismissed !== undefined) {
            setFloatingAlertDismissed(parsed.floatingAlertDismissed);
          }
        }
        if (parsed.bannerDismissed !== undefined) {
          setBannerDismissed(parsed.bannerDismissed);
        }
        if (parsed.warningAlertDismissed !== undefined) {
          setWarningAlertDismissed(parsed.warningAlertDismissed);
        }
      }
    } catch (error) {
      console.error("Failed to load monitoring state from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist state to localStorage whenever it changes (only after hydration)
  // But don't persist floatingAlertDismissed when alertTriggered is true
  // This ensures critical alerts always show when conditions warrant
  useEffect(() => {
    if (!isHydrated) return;

    try {
      // If water level is critical, don't persist the dismissal state
      // This ensures the alert can show again
      const alertTriggered = waterLevel > 2.5;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          waterLevel,
          bannerDismissed,
          floatingAlertDismissed: alertTriggered ? false : floatingAlertDismissed,
          warningAlertDismissed,
        })
      );
    } catch (error) {
      console.error("Failed to save monitoring state to localStorage:", error);
    }
  }, [waterLevel, bannerDismissed, floatingAlertDismissed, warningAlertDismissed, isHydrated]);

  const alertTriggered = waterLevel > 2.5;

  // Reset critical alert dismissal when water level becomes critical
  // This ensures critical alerts always show when conditions warrant
  useEffect(() => {
    if (alertTriggered && floatingAlertDismissed) {
      // When water level becomes critical, always reset dismissal so alert can show
      setFloatingAlertDismissed(false);
    }
  }, [alertTriggered, floatingAlertDismissed, setFloatingAlertDismissed]);

  return (
    <MonitoringContext.Provider
      value={{
        waterLevel,
        setWaterLevel,
        bannerDismissed,
        setBannerDismissed,
        floatingAlertDismissed,
        setFloatingAlertDismissed,
        warningAlertDismissed,
        setWarningAlertDismissed,
        alertTriggered,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error("useMonitoring must be used within a MonitoringProvider");
  }
  return context;
}

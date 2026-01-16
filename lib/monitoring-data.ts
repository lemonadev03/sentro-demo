// Flood Monitoring Mock Data

export type SensorStatus = "normal" | "warning" | "critical";

export type Sensor = {
  id: string;
  name: string;
  normalLevel: number;
  alertLevel: number;
  status: SensorStatus;
  rateOfChange: string;
  affectedBarangays: string[];
};

export type Barangay = {
  id: string;
  name: string;
  residents: number;
  riskLevel: SensorStatus;
  evacuationCenter: string;
};

export type Weather = {
  condition: string;
  rainfall24h: string;
  forecast: string;
};

export type Thresholds = {
  normal: { max: number; color: string; label: string };
  warning: { min: number; max: number; color: string; label: string };
  critical: { min: number; color: string; label: string };
};

// Sensor data
export const sensors: Sensor[] = [
  {
    id: "RS-001",
    name: "Brgy. San Roque (Upstream)",
    normalLevel: 1.2,
    alertLevel: 2.7,
    status: "normal",
    rateOfChange: "+0.1m/hr",
    affectedBarangays: ["san-roque", "santa-ana", "malanday"],
  },
  {
    id: "RS-002",
    name: "Brgy. Santa Ana (Marikina River)",
    normalLevel: 1.4,
    alertLevel: 2.1,
    status: "normal",
    rateOfChange: "+0.05m/hr",
    affectedBarangays: ["santa-ana", "malanday"],
  },
  {
    id: "RS-003",
    name: "Brgy. Malanday",
    normalLevel: 1.1,
    alertLevel: 1.1,
    status: "normal",
    rateOfChange: "+0.02m/hr",
    affectedBarangays: ["malanday"],
  },
  {
    id: "RS-004",
    name: "Brgy. Tumana (Bridge)",
    normalLevel: 1.3,
    alertLevel: 1.3,
    status: "normal",
    rateOfChange: "+0.03m/hr",
    affectedBarangays: ["tumana", "concepcion"],
  },
  {
    id: "RS-005",
    name: "Brgy. Concepcion (Downstream)",
    normalLevel: 0.9,
    alertLevel: 0.9,
    status: "normal",
    rateOfChange: "+0.01m/hr",
    affectedBarangays: ["concepcion"],
  },
];

// Barangay data
export const barangays: Barangay[] = [
  {
    id: "san-roque",
    name: "San Roque",
    residents: 2450,
    riskLevel: "normal",
    evacuationCenter: "San Roque Elementary School",
  },
  {
    id: "santa-ana",
    name: "Santa Ana",
    residents: 1820,
    riskLevel: "normal",
    evacuationCenter: "Santa Ana Covered Court",
  },
  {
    id: "malanday",
    name: "Malanday",
    residents: 3100,
    riskLevel: "normal",
    evacuationCenter: "Malanday Community Center",
  },
  {
    id: "tumana",
    name: "Tumana",
    residents: 4200,
    riskLevel: "normal",
    evacuationCenter: "Tumana Sports Complex",
  },
  {
    id: "concepcion",
    name: "Concepcion",
    residents: 2800,
    riskLevel: "normal",
    evacuationCenter: "Concepcion Chapel Grounds",
  },
];

// Threshold reference
export const thresholds: Thresholds = {
  normal: { max: 2.0, color: "green", label: "Normal" },
  warning: { min: 2.0, max: 2.5, color: "yellow", label: "Warning" },
  critical: { min: 2.5, color: "red", label: "Critical" },
};

// Weather data (static)
export const weather: Weather = {
  condition: "Light Rain",
  rainfall24h: "32mm",
  forecast: "Heavy rain expected in 2 hours",
};

// Helper to get status from water level
export function getStatusFromLevel(level: number): SensorStatus {
  if (level >= thresholds.critical.min) return "critical";
  if (level >= thresholds.warning.min) return "warning";
  return "normal";
}

// Get affected barangays based on triggered sensors
export function getAffectedBarangays(triggeredSensorIds: string[]): string[] {
  const affected = new Set<string>();
  sensors.forEach((sensor) => {
    if (triggeredSensorIds.includes(sensor.id)) {
      sensor.affectedBarangays.forEach((b) => affected.add(b));
    }
  });
  return Array.from(affected);
}

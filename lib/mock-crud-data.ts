// Types for CRUD entities

export type StationType = "police" | "fire" | "ems" | "mixed";
export type VehicleType = "patrol" | "ambulance" | "firetruck" | "suv" | "motorcycle";
export type VehicleStatus = "available" | "assigned" | "enroute" | "onsite" | "out_of_service";
export type TeamType = "traffic" | "medical" | "fire" | "ems" | "patrol";
export type TeamStatus = "available" | "assigned" | "enroute" | "onsite";
export type UserRole = "admin" | "dispatch" | "responder" | "supervisor";
export type ShiftType = "day" | "night" | "swing" | "on_call";
export type ScheduleStatus = "scheduled" | "active" | "completed" | "cancelled";
export type RequestType = "schedule_change" | "profile_update" | "leave" | "swap" | "equipment";
export type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";
export type RiskLevel = "normal" | "warning" | "critical";

export interface Station {
  id: string;
  name: string;
  code: string;
  type: StationType;
  address: string;
  latitude?: number;
  longitude?: number;
  contactRadio?: string;
  contactPhone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Barangay {
  id: string;
  name: string;
  code: string;
  population: number;
  riskLevel: RiskLevel;
  evacuationCenter?: string;
  createdAt: string;
}

export interface StationBarangayCoverage {
  id: string;
  stationId: string;
  barangayId: string;
  isPrimary: boolean;
}

export interface Vehicle {
  id: string;
  stationId: string;
  name: string;
  code: string;
  type: VehicleType;
  status: VehicleStatus;
  plateNumber?: string;
  capacity: number;
  isActive: boolean;
  createdAt: string;
}

export interface Team {
  id: string;
  stationId: string;
  name: string;
  code: string;
  type: TeamType;
  vehicleId?: string;
  status: TeamStatus;
  rating?: number;
  createdAt: string;
}

export interface User {
  id: string;
  stationId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  rank?: string;
  badgeNumber?: string;
  phone?: string;
  status: "active" | "inactive" | "suspended";
  isVerified: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: "lead" | "member" | "driver" | "medic";
  isActive: boolean;
  assignedAt: string;
}

export interface Schedule {
  id: string;
  userId: string;
  teamId?: string;
  startTime: string;
  endTime: string;
  shiftType: ShiftType;
  status: ScheduleStatus;
  notes?: string;
  createdAt: string;
}

export interface UpdateRequest {
  id: string;
  requesterId: string;
  requestType: RequestType;
  status: RequestStatus;
  title: string;
  description?: string;
  payload?: Record<string, unknown>;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
}

// Mock Data

export const mockStations: Station[] = [
  {
    id: "STN-001",
    name: "Station 3 - Commonwealth",
    code: "QC-STN3",
    type: "mixed",
    address: "123 Commonwealth Ave, Quezon City",
    latitude: 14.6760,
    longitude: 121.0437,
    contactRadio: "Channel 3A",
    contactPhone: "+63 2 8123 4567",
    isActive: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "STN-002",
    name: "Station 7 - Fairview",
    code: "QC-STN7",
    type: "police",
    address: "45 Regalado Ave, Fairview, Quezon City",
    latitude: 14.7011,
    longitude: 121.0543,
    contactRadio: "Channel 7B",
    contactPhone: "+63 2 8234 5678",
    isActive: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "STN-003",
    name: "Fire Station - Novaliches",
    code: "QC-FS1",
    type: "fire",
    address: "78 Quirino Highway, Novaliches, Quezon City",
    latitude: 14.7234,
    longitude: 121.0321,
    contactRadio: "Fire Channel 1",
    contactPhone: "+63 2 8345 6789",
    isActive: true,
    createdAt: "2024-02-01T08:00:00Z",
  },
  {
    id: "STN-004",
    name: "EMS Central - Cubao",
    code: "QC-EMS1",
    type: "ems",
    address: "15 Aurora Blvd, Cubao, Quezon City",
    latitude: 14.6195,
    longitude: 121.0512,
    contactRadio: "EMS Channel 1",
    contactPhone: "+63 2 8456 7890",
    isActive: true,
    createdAt: "2024-02-15T08:00:00Z",
  },
  {
    id: "STN-005",
    name: "Station 12 - Diliman",
    code: "QC-STN12",
    type: "mixed",
    address: "UP Campus, Diliman, Quezon City",
    latitude: 14.6538,
    longitude: 121.0685,
    contactRadio: "Channel 12C",
    contactPhone: "+63 2 8567 8901",
    isActive: false,
    createdAt: "2024-03-01T08:00:00Z",
  },
];

export const mockBarangays: Barangay[] = [
  {
    id: "BRG-001",
    name: "Barangay Commonwealth",
    code: "COM",
    population: 45000,
    riskLevel: "normal",
    evacuationCenter: "Commonwealth Elementary School",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-002",
    name: "Barangay Holy Spirit",
    code: "HSP",
    population: 38000,
    riskLevel: "normal",
    evacuationCenter: "Holy Spirit Covered Court",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-003",
    name: "Barangay Batasan Hills",
    code: "BTH",
    population: 52000,
    riskLevel: "warning",
    evacuationCenter: "Batasan Hills National High School",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-004",
    name: "Barangay Fairview",
    code: "FRV",
    population: 67000,
    riskLevel: "normal",
    evacuationCenter: "Fairview Covered Court",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-005",
    name: "Barangay Novaliches Proper",
    code: "NVP",
    population: 41000,
    riskLevel: "critical",
    evacuationCenter: "Novaliches District Hospital",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-006",
    name: "Barangay Payatas",
    code: "PYT",
    population: 119000,
    riskLevel: "critical",
    evacuationCenter: "Payatas Elementary School",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-007",
    name: "Barangay Bagong Silangan",
    code: "BGS",
    population: 89000,
    riskLevel: "warning",
    evacuationCenter: "Bagong Silangan High School",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "BRG-008",
    name: "Barangay UP Campus",
    code: "UPC",
    population: 12000,
    riskLevel: "normal",
    evacuationCenter: "UP Gym",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const mockStationBarangayCoverage: StationBarangayCoverage[] = [
  { id: "COV-001", stationId: "STN-001", barangayId: "BRG-001", isPrimary: true },
  { id: "COV-002", stationId: "STN-001", barangayId: "BRG-002", isPrimary: true },
  { id: "COV-003", stationId: "STN-001", barangayId: "BRG-003", isPrimary: false },
  { id: "COV-004", stationId: "STN-002", barangayId: "BRG-004", isPrimary: true },
  { id: "COV-005", stationId: "STN-002", barangayId: "BRG-005", isPrimary: true },
  { id: "COV-006", stationId: "STN-003", barangayId: "BRG-005", isPrimary: false },
  { id: "COV-007", stationId: "STN-003", barangayId: "BRG-006", isPrimary: true },
  { id: "COV-008", stationId: "STN-004", barangayId: "BRG-003", isPrimary: true },
  { id: "COV-009", stationId: "STN-005", barangayId: "BRG-008", isPrimary: true },
  { id: "COV-010", stationId: "STN-005", barangayId: "BRG-007", isPrimary: false },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "VEH-001",
    stationId: "STN-001",
    name: "Response SUV 14",
    code: "UNIT-14",
    type: "suv",
    status: "available",
    plateNumber: "QC-1234",
    capacity: 5,
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "VEH-002",
    stationId: "STN-001",
    name: "Patrol Car 22",
    code: "UNIT-22",
    type: "patrol",
    status: "assigned",
    plateNumber: "QC-2234",
    capacity: 4,
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "VEH-003",
    stationId: "STN-001",
    name: "Motorcycle Unit 05",
    code: "MC-05",
    type: "motorcycle",
    status: "available",
    plateNumber: "QC-MC05",
    capacity: 2,
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "VEH-004",
    stationId: "STN-002",
    name: "Patrol Car 31",
    code: "UNIT-31",
    type: "patrol",
    status: "available",
    plateNumber: "QC-3134",
    capacity: 4,
    isActive: true,
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "VEH-005",
    stationId: "STN-003",
    name: "Fire Truck 01",
    code: "FT-01",
    type: "firetruck",
    status: "available",
    plateNumber: "QC-FT01",
    capacity: 6,
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "VEH-006",
    stationId: "STN-004",
    name: "Ambulance 01",
    code: "AMB-01",
    type: "ambulance",
    status: "enroute",
    plateNumber: "QC-AMB1",
    capacity: 4,
    isActive: true,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "VEH-007",
    stationId: "STN-004",
    name: "Ambulance 02",
    code: "AMB-02",
    type: "ambulance",
    status: "available",
    plateNumber: "QC-AMB2",
    capacity: 4,
    isActive: true,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "VEH-008",
    stationId: "STN-002",
    name: "Response SUV 32",
    code: "UNIT-32",
    type: "suv",
    status: "out_of_service",
    plateNumber: "QC-3234",
    capacity: 5,
    isActive: false,
    createdAt: "2024-01-25T00:00:00Z",
  },
];

export const mockTeams: Team[] = [
  {
    id: "TEAM-001",
    stationId: "STN-001",
    name: "Unit 14",
    code: "U14",
    type: "traffic",
    vehicleId: "VEH-001",
    status: "available",
    rating: 4.9,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "TEAM-002",
    stationId: "STN-001",
    name: "Unit 22",
    code: "U22",
    type: "medical",
    vehicleId: "VEH-002",
    status: "assigned",
    rating: 4.7,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "TEAM-003",
    stationId: "STN-001",
    name: "Rapid Response 05",
    code: "RR05",
    type: "patrol",
    vehicleId: "VEH-003",
    status: "available",
    rating: 4.8,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "TEAM-004",
    stationId: "STN-002",
    name: "Unit 31",
    code: "U31",
    type: "patrol",
    vehicleId: "VEH-004",
    status: "available",
    rating: 4.6,
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "TEAM-005",
    stationId: "STN-003",
    name: "Fire Response Alpha",
    code: "FRA",
    type: "fire",
    vehicleId: "VEH-005",
    status: "available",
    rating: 4.9,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "TEAM-006",
    stationId: "STN-004",
    name: "EMS Team 01",
    code: "EMS01",
    type: "ems",
    vehicleId: "VEH-006",
    status: "enroute",
    rating: 4.8,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "TEAM-007",
    stationId: "STN-004",
    name: "EMS Team 02",
    code: "EMS02",
    type: "ems",
    vehicleId: "VEH-007",
    status: "available",
    rating: 4.7,
    createdAt: "2024-02-15T00:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "USR-001",
    stationId: "STN-001",
    email: "miguel.reyes@qcpd.gov.ph",
    firstName: "Miguel",
    lastName: "Reyes",
    role: "responder",
    rank: "Sergeant",
    badgeNumber: "PO3-1234",
    phone: "+63 917 555 0123",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "USR-002",
    stationId: "STN-001",
    email: "lara.cruz@qcpd.gov.ph",
    firstName: "Lara",
    lastName: "Cruz",
    role: "responder",
    rank: "Officer",
    badgeNumber: "PO1-2345",
    phone: "+63 917 555 0234",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "USR-003",
    stationId: "STN-004",
    email: "paolo.lim@qcems.gov.ph",
    firstName: "Paolo",
    lastName: "Lim",
    role: "responder",
    rank: "Paramedic",
    badgeNumber: "EMT-3456",
    phone: "+63 917 555 0345",
    status: "active",
    isVerified: true,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "USR-004",
    stationId: "STN-001",
    email: "maria.santos@qcpd.gov.ph",
    firstName: "Maria",
    lastName: "Santos",
    role: "dispatch",
    rank: "Senior Dispatcher",
    badgeNumber: "DSP-4567",
    phone: "+63 917 555 0456",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "USR-005",
    stationId: "STN-002",
    email: "juan.dela.cruz@qcpd.gov.ph",
    firstName: "Juan",
    lastName: "Dela Cruz",
    role: "responder",
    rank: "Officer",
    badgeNumber: "PO2-5678",
    phone: "+63 917 555 0567",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "USR-006",
    stationId: "STN-003",
    email: "carlos.garcia@qcfd.gov.ph",
    firstName: "Carlos",
    lastName: "Garcia",
    role: "responder",
    rank: "Fire Officer II",
    badgeNumber: "FO2-6789",
    phone: "+63 917 555 0678",
    status: "active",
    isVerified: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "USR-007",
    stationId: "STN-001",
    email: "jose.mendoza@qcpd.gov.ph",
    firstName: "Jose",
    lastName: "Mendoza",
    role: "supervisor",
    rank: "Inspector",
    badgeNumber: "INS-7890",
    phone: "+63 917 555 0789",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "USR-008",
    stationId: "STN-004",
    email: "anna.reyes@qcems.gov.ph",
    firstName: "Anna",
    lastName: "Reyes",
    role: "responder",
    rank: "EMT-Basic",
    badgeNumber: "EMT-8901",
    phone: "+63 917 555 0890",
    status: "inactive",
    isVerified: true,
    createdAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "USR-009",
    stationId: undefined,
    email: "admin@sentro.gov.ph",
    firstName: "System",
    lastName: "Admin",
    role: "admin",
    phone: "+63 2 8111 2222",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const mockTeamMembers: TeamMember[] = [
  { id: "TM-001", teamId: "TEAM-001", userId: "USR-001", role: "lead", isActive: true, assignedAt: "2024-01-20T00:00:00Z" },
  { id: "TM-002", teamId: "TEAM-001", userId: "USR-002", role: "member", isActive: true, assignedAt: "2024-01-20T00:00:00Z" },
  { id: "TM-003", teamId: "TEAM-002", userId: "USR-002", role: "lead", isActive: true, assignedAt: "2024-01-20T00:00:00Z" },
  { id: "TM-004", teamId: "TEAM-004", userId: "USR-005", role: "lead", isActive: true, assignedAt: "2024-01-25T00:00:00Z" },
  { id: "TM-005", teamId: "TEAM-005", userId: "USR-006", role: "lead", isActive: true, assignedAt: "2024-02-01T00:00:00Z" },
  { id: "TM-006", teamId: "TEAM-006", userId: "USR-003", role: "medic", isActive: true, assignedAt: "2024-02-15T00:00:00Z" },
  { id: "TM-007", teamId: "TEAM-007", userId: "USR-008", role: "medic", isActive: false, assignedAt: "2024-02-20T00:00:00Z" },
];

export const mockSchedules: Schedule[] = [
  {
    id: "SCH-001",
    userId: "USR-001",
    teamId: "TEAM-001",
    startTime: "2025-01-18T06:00:00Z",
    endTime: "2025-01-18T18:00:00Z",
    shiftType: "day",
    status: "scheduled",
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "SCH-002",
    userId: "USR-001",
    teamId: "TEAM-001",
    startTime: "2025-01-19T06:00:00Z",
    endTime: "2025-01-19T18:00:00Z",
    shiftType: "day",
    status: "scheduled",
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "SCH-003",
    userId: "USR-001",
    teamId: "TEAM-001",
    startTime: "2025-01-20T18:00:00Z",
    endTime: "2025-01-21T06:00:00Z",
    shiftType: "night",
    status: "scheduled",
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "SCH-004",
    userId: "USR-002",
    teamId: "TEAM-002",
    startTime: "2025-01-18T06:00:00Z",
    endTime: "2025-01-18T18:00:00Z",
    shiftType: "day",
    status: "active",
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "SCH-005",
    userId: "USR-003",
    teamId: "TEAM-006",
    startTime: "2025-01-18T06:00:00Z",
    endTime: "2025-01-18T18:00:00Z",
    shiftType: "day",
    status: "active",
    createdAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "SCH-006",
    userId: "USR-005",
    teamId: "TEAM-004",
    startTime: "2025-01-18T18:00:00Z",
    endTime: "2025-01-19T06:00:00Z",
    shiftType: "night",
    status: "scheduled",
    createdAt: "2025-01-12T00:00:00Z",
  },
  {
    id: "SCH-007",
    userId: "USR-006",
    teamId: "TEAM-005",
    startTime: "2025-01-18T00:00:00Z",
    endTime: "2025-01-18T12:00:00Z",
    shiftType: "day",
    status: "completed",
    createdAt: "2025-01-08T00:00:00Z",
  },
  {
    id: "SCH-008",
    userId: "USR-004",
    teamId: undefined,
    startTime: "2025-01-18T08:00:00Z",
    endTime: "2025-01-18T20:00:00Z",
    shiftType: "day",
    status: "active",
    notes: "Dispatch duty",
    createdAt: "2025-01-10T00:00:00Z",
  },
];

export const mockUpdateRequests: UpdateRequest[] = [
  {
    id: "REQ-001",
    requesterId: "USR-001",
    requestType: "schedule_change",
    status: "pending",
    title: "Request day off on Jan 25",
    description: "Family emergency - need to attend to personal matters.",
    payload: { originalDate: "2025-01-25", reason: "family_emergency" },
    createdAt: "2025-01-17T10:00:00Z",
  },
  {
    id: "REQ-002",
    requesterId: "USR-002",
    requestType: "swap",
    status: "pending",
    title: "Shift swap request with USR-005",
    description: "Would like to swap my Jan 20 day shift with Juan's Jan 21 night shift.",
    payload: { swapWith: "USR-005", myShift: "2025-01-20", theirShift: "2025-01-21" },
    createdAt: "2025-01-16T14:30:00Z",
  },
  {
    id: "REQ-003",
    requesterId: "USR-003",
    requestType: "profile_update",
    status: "approved",
    title: "Update contact number",
    description: "Changed my phone number, please update in the system.",
    payload: { field: "phone", newValue: "+63 917 555 9999" },
    reviewedBy: "USR-004",
    reviewedAt: "2025-01-15T09:00:00Z",
    reviewNotes: "Verified and updated.",
    createdAt: "2025-01-14T16:00:00Z",
  },
  {
    id: "REQ-004",
    requesterId: "USR-005",
    requestType: "leave",
    status: "rejected",
    title: "Vacation leave Feb 1-5",
    description: "Requesting 5 days vacation leave for family trip.",
    payload: { startDate: "2025-02-01", endDate: "2025-02-05", leaveType: "vacation" },
    reviewedBy: "USR-007",
    reviewedAt: "2025-01-13T11:00:00Z",
    reviewNotes: "Insufficient leave credits. Please coordinate with HR.",
    createdAt: "2025-01-12T08:00:00Z",
  },
  {
    id: "REQ-005",
    requesterId: "USR-006",
    requestType: "equipment",
    status: "pending",
    title: "Request for new radio",
    description: "Current radio (Serial: RD-456) has intermittent signal issues.",
    payload: { equipmentType: "radio", currentSerial: "RD-456", issue: "signal_issues" },
    createdAt: "2025-01-17T13:00:00Z",
  },
];

// Helper functions for data lookups

export function getStationById(id: string): Station | undefined {
  return mockStations.find((s) => s.id === id);
}

export function getBarangayById(id: string): Barangay | undefined {
  return mockBarangays.find((b) => b.id === id);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return mockVehicles.find((v) => v.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return mockTeams.find((t) => t.id === id);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getVehiclesByStation(stationId: string): Vehicle[] {
  return mockVehicles.filter((v) => v.stationId === stationId);
}

export function getTeamsByStation(stationId: string): Team[] {
  return mockTeams.filter((t) => t.stationId === stationId);
}

export function getUsersByStation(stationId: string): User[] {
  return mockUsers.filter((u) => u.stationId === stationId);
}

export function getBarangaysByStation(stationId: string): Barangay[] {
  const coverageIds = mockStationBarangayCoverage
    .filter((c) => c.stationId === stationId)
    .map((c) => c.barangayId);
  return mockBarangays.filter((b) => coverageIds.includes(b.id));
}

export function getTeamMembers(teamId: string): (TeamMember & { user: User })[] {
  return mockTeamMembers
    .filter((tm) => tm.teamId === teamId)
    .map((tm) => ({
      ...tm,
      user: getUserById(tm.userId)!,
    }))
    .filter((tm) => tm.user);
}

export function getSchedulesByUser(userId: string): Schedule[] {
  return mockSchedules.filter((s) => s.userId === userId);
}

export function getRequestsByUser(userId: string): UpdateRequest[] {
  return mockUpdateRequests.filter((r) => r.requesterId === userId);
}

export function getPendingRequests(): UpdateRequest[] {
  return mockUpdateRequests.filter((r) => r.status === "pending");
}

// Type labels for display
export const stationTypeLabels: Record<StationType, string> = {
  police: "Police",
  fire: "Fire",
  ems: "EMS",
  mixed: "Mixed",
};

export const vehicleTypeLabels: Record<VehicleType, string> = {
  patrol: "Patrol Car",
  ambulance: "Ambulance",
  firetruck: "Fire Truck",
  suv: "Response SUV",
  motorcycle: "Motorcycle",
};

export const vehicleStatusLabels: Record<VehicleStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  enroute: "En Route",
  onsite: "On Site",
  out_of_service: "Out of Service",
};

export const teamTypeLabels: Record<TeamType, string> = {
  traffic: "Traffic Response",
  medical: "Medical Support",
  fire: "Fire Response",
  ems: "EMS",
  patrol: "Patrol",
};

export const teamStatusLabels: Record<TeamStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  enroute: "En Route",
  onsite: "On Site",
};

export const userRoleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  dispatch: "Dispatcher",
  responder: "Responder",
  supervisor: "Supervisor",
};

export const shiftTypeLabels: Record<ShiftType, string> = {
  day: "Day Shift",
  night: "Night Shift",
  swing: "Swing Shift",
  on_call: "On Call",
};

export const scheduleStatusLabels: Record<ScheduleStatus, string> = {
  scheduled: "Scheduled",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const requestTypeLabels: Record<RequestType, string> = {
  schedule_change: "Schedule Change",
  profile_update: "Profile Update",
  leave: "Leave Request",
  swap: "Shift Swap",
  equipment: "Equipment Request",
};

export const requestStatusLabels: Record<RequestStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export const riskLevelLabels: Record<RiskLevel, string> = {
  normal: "Normal",
  warning: "Warning",
  critical: "Critical",
};

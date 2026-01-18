export type FlowStatus = "active" | "draft" | "archived";
export type QuestionType =
  | "short_text"
  | "multiple_choice"
  | "yes_no"
  | "number"
  | "location"
  | "photo";
export type DispatchIntensity = "low" | "medium" | "high" | "critical";

export interface FlowQuestionLogic {
  id: string;
  when: string;
  action: string;
}

export interface FlowQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  helperText?: string;
  options?: string[];
  logic?: FlowQuestionLogic[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: "police" | "marshal" | "ems" | "fire" | "traffic";
  required: boolean;
  notes?: string;
}

export interface DispatchRule {
  id: string;
  title: string;
  condition: string;
  intensity: DispatchIntensity;
  recommendedUnits: string[];
  notes?: string;
}

export interface IncidentFlow {
  id: string;
  name: string;
  category: string;
  description: string;
  status: FlowStatus;
  lastUpdated: string;
  usage30d: number;
  avgHandleTime: string;
  questions: FlowQuestion[];
  checklist: ChecklistItem[];
  dispatchRules: DispatchRule[];
  tags?: string[];
}

export const flowStatusLabels: Record<FlowStatus, string> = {
  active: "Active",
  draft: "Draft",
  archived: "Archived",
};

export const questionTypeLabels: Record<QuestionType, string> = {
  short_text: "Short text",
  multiple_choice: "Multiple choice",
  yes_no: "Yes or no",
  number: "Number",
  location: "Location",
  photo: "Photo",
};

export const intensityLabels: Record<DispatchIntensity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const mockIncidentFlows: IncidentFlow[] = [
  {
    id: "FLOW-TRF-001",
    name: "Traffic collision",
    category: "Traffic",
    description: "Multi-vehicle accidents, road hazards, and blocked lanes.",
    status: "active",
    lastUpdated: "2024-05-21",
    usage30d: 214,
    avgHandleTime: "6m 12s",
    tags: ["priority", "road safety"],
    questions: [
      {
        id: "q-trf-1",
        label: "Where did the collision occur?",
        type: "location",
        required: true,
      },
      {
        id: "q-trf-2",
        label: "How many vehicles are involved?",
        type: "number",
        required: true,
        helperText: "Estimate if unsure.",
      },
      {
        id: "q-trf-3",
        label: "Is anyone injured?",
        type: "yes_no",
        required: true,
        logic: [
          {
            id: "q-trf-3-1",
            when: "If yes",
            action: "Show injury details question",
          },
        ],
      },
      {
        id: "q-trf-4",
        label: "Is traffic fully blocked?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-trf-5",
        label: "Share a photo of the scene",
        type: "photo",
        required: false,
      },
    ],
    checklist: [
      {
        id: "c-trf-1",
        label: "Secure traffic perimeter",
        category: "traffic",
        required: true,
      },
      {
        id: "c-trf-2",
        label: "Coordinate towing support",
        category: "traffic",
        required: true,
      },
      {
        id: "c-trf-3",
        label: "Check for secondary hazards",
        category: "police",
        required: false,
      },
      {
        id: "c-trf-4",
        label: "Prepare EMS triage",
        category: "ems",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-trf-1",
        title: "High impact or injuries",
        condition: "Injuries = Yes or 3+ vehicles",
        intensity: "high",
        recommendedUnits: ["Traffic Unit", "EMS Unit", "Police Unit"],
      },
      {
        id: "r-trf-2",
        title: "Minor collision",
        condition: "No injuries and 1-2 vehicles",
        intensity: "medium",
        recommendedUnits: ["Traffic Unit"],
      },
    ],
  },
  {
    id: "FLOW-FIR-001",
    name: "Fire or smoke",
    category: "Fire",
    description: "Structure fires, smoke reports, and electrical hazards.",
    status: "active",
    lastUpdated: "2024-05-16",
    usage30d: 92,
    avgHandleTime: "5m 02s",
    tags: ["hazmat", "priority"],
    questions: [
      {
        id: "q-fir-1",
        label: "Where is the fire located?",
        type: "location",
        required: true,
      },
      {
        id: "q-fir-2",
        label: "Do you see active flames?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-fir-3",
        label: "Is anyone trapped inside?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-fir-4",
        label: "Type of structure",
        type: "multiple_choice",
        required: true,
        options: ["Residential", "Commercial", "Industrial", "Outdoor"],
      },
      {
        id: "q-fir-5",
        label: "Share a photo if safe to do so",
        type: "photo",
        required: false,
      },
    ],
    checklist: [
      {
        id: "c-fir-1",
        label: "Confirm hydrant access",
        category: "fire",
        required: true,
      },
      {
        id: "c-fir-2",
        label: "Establish evacuation perimeter",
        category: "fire",
        required: true,
      },
      {
        id: "c-fir-3",
        label: "Coordinate EMS standby",
        category: "ems",
        required: true,
      },
    ],
    dispatchRules: [
      {
        id: "r-fir-1",
        title: "Visible flames or trapped occupants",
        condition: "Flames = Yes or Trapped = Yes",
        intensity: "critical",
        recommendedUnits: ["Fire Engine", "EMS Unit", "Police Unit"],
      },
      {
        id: "r-fir-2",
        title: "Smoke only",
        condition: "Flames = No",
        intensity: "medium",
        recommendedUnits: ["Fire Engine"],
      },
    ],
  },
  {
    id: "FLOW-SUS-001",
    name: "Suspicious activity",
    category: "Security",
    description: "Unknown persons, stalking, or possible break-ins.",
    status: "active",
    lastUpdated: "2024-05-28",
    usage30d: 136,
    avgHandleTime: "4m 18s",
    tags: ["emerging", "safety"],
    questions: [
      {
        id: "q-sus-1",
        label: "Where is the suspicious activity happening?",
        type: "location",
        required: true,
      },
      {
        id: "q-sus-2",
        label: "Describe what you are seeing",
        type: "short_text",
        required: true,
        helperText: "Include clothing, vehicle, or behavior.",
      },
      {
        id: "q-sus-3",
        label: "Does the person appear armed?",
        type: "yes_no",
        required: true,
        logic: [
          {
            id: "q-sus-3-1",
            when: "If yes",
            action: "Show weapon type question",
          },
        ],
      },
      {
        id: "q-sus-4",
        label: "Type of weapon",
        type: "multiple_choice",
        required: false,
        options: ["Firearm", "Knife", "Unknown"],
        logic: [
          {
            id: "q-sus-4-1",
            when: "Only when armed = yes",
            action: "Increase intensity score",
          },
        ],
      },
      {
        id: "q-sus-5",
        label: "Is anyone in immediate danger?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-sus-6",
        label: "How many people are involved?",
        type: "number",
        required: false,
      },
    ],
    checklist: [
      {
        id: "c-sus-1",
        label: "Confirm caller safety and distance",
        category: "police",
        required: true,
      },
      {
        id: "c-sus-2",
        label: "Coordinate with barangay marshals",
        category: "marshal",
        required: true,
      },
      {
        id: "c-sus-3",
        label: "Identify escape routes",
        category: "police",
        required: false,
      },
      {
        id: "c-sus-4",
        label: "EMS standby if threat escalates",
        category: "ems",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-sus-1",
        title: "Armed suspect",
        condition: "Armed = Yes",
        intensity: "high",
        recommendedUnits: ["Police Unit", "Tactical Support"],
        notes: "Prioritize rapid response and safe perimeter.",
      },
      {
        id: "r-sus-2",
        title: "Unarmed, low risk",
        condition: "Armed = No and Immediate danger = No",
        intensity: "medium",
        recommendedUnits: ["Marshal Team"],
      },
      {
        id: "r-sus-3",
        title: "Immediate danger",
        condition: "Immediate danger = Yes",
        intensity: "critical",
        recommendedUnits: ["Police Unit", "EMS Unit"],
      },
    ],
  },
  {
    id: "FLOW-MED-001",
    name: "Medical emergency",
    category: "Medical",
    description: "Collapsed individuals, urgent medical aid requests.",
    status: "active",
    lastUpdated: "2024-05-10",
    usage30d: 188,
    avgHandleTime: "5m 40s",
    tags: ["priority"],
    questions: [
      {
        id: "q-med-1",
        label: "Where is the patient located?",
        type: "location",
        required: true,
      },
      {
        id: "q-med-2",
        label: "What is the primary symptom?",
        type: "short_text",
        required: true,
      },
      {
        id: "q-med-3",
        label: "Is the patient conscious?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-med-4",
        label: "Approximate age group",
        type: "multiple_choice",
        required: true,
        options: ["Child", "Adult", "Senior"],
      },
    ],
    checklist: [
      {
        id: "c-med-1",
        label: "Provide CPR guidance if needed",
        category: "ems",
        required: true,
      },
      {
        id: "c-med-2",
        label: "Confirm nearest access point",
        category: "ems",
        required: true,
      },
      {
        id: "c-med-3",
        label: "Coordinate traffic support",
        category: "traffic",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-med-1",
        title: "Unconscious patient",
        condition: "Conscious = No",
        intensity: "critical",
        recommendedUnits: ["EMS Unit", "Police Unit"],
      },
      {
        id: "r-med-2",
        title: "Conscious patient",
        condition: "Conscious = Yes",
        intensity: "medium",
        recommendedUnits: ["EMS Unit"],
      },
    ],
  },
  {
    id: "FLOW-INF-001",
    name: "Infrastructure damage",
    category: "Infrastructure",
    description: "Road hazards, fallen poles, or damaged utilities.",
    status: "active",
    lastUpdated: "2024-05-18",
    usage30d: 64,
    avgHandleTime: "4m 36s",
    tags: ["utilities", "traffic"],
    questions: [
      {
        id: "q-inf-1",
        label: "Where is the damage located?",
        type: "location",
        required: true,
      },
      {
        id: "q-inf-2",
        label: "What type of damage do you see?",
        type: "multiple_choice",
        required: true,
        options: ["Road crack", "Fallen pole", "Water leak", "Other"],
      },
      {
        id: "q-inf-3",
        label: "Is there an immediate safety hazard?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-inf-4",
        label: "Share a photo of the damage",
        type: "photo",
        required: false,
      },
    ],
    checklist: [
      {
        id: "c-inf-1",
        label: "Secure the perimeter",
        category: "traffic",
        required: true,
      },
      {
        id: "c-inf-2",
        label: "Notify utility provider",
        category: "traffic",
        required: true,
      },
      {
        id: "c-inf-3",
        label: "Document hazard details",
        category: "police",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-inf-1",
        title: "Immediate hazard",
        condition: "Safety hazard = Yes",
        intensity: "high",
        recommendedUnits: ["Traffic Unit", "Police Unit"],
      },
      {
        id: "r-inf-2",
        title: "Non-urgent damage",
        condition: "Safety hazard = No",
        intensity: "low",
        recommendedUnits: ["Marshal Team"],
      },
    ],
  },
  {
    id: "FLOW-GEN-001",
    name: "General report",
    category: "General",
    description: "Catch-all incident flow for uncommon events.",
    status: "active",
    lastUpdated: "2024-05-06",
    usage30d: 28,
    avgHandleTime: "3m 40s",
    tags: ["catch-all"],
    questions: [
      {
        id: "q-gen-1",
        label: "Where is the incident happening?",
        type: "location",
        required: true,
      },
      {
        id: "q-gen-2",
        label: "Describe the situation",
        type: "short_text",
        required: true,
      },
      {
        id: "q-gen-3",
        label: "Is anyone in immediate danger?",
        type: "yes_no",
        required: true,
      },
      {
        id: "q-gen-4",
        label: "Share a photo if available",
        type: "photo",
        required: false,
      },
    ],
    checklist: [
      {
        id: "c-gen-1",
        label: "Capture caller details",
        category: "police",
        required: true,
      },
      {
        id: "c-gen-2",
        label: "Confirm safe approach",
        category: "marshal",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-gen-1",
        title: "Immediate danger",
        condition: "Immediate danger = Yes",
        intensity: "high",
        recommendedUnits: ["Police Unit", "EMS Unit"],
      },
      {
        id: "r-gen-2",
        title: "Standard report",
        condition: "Immediate danger = No",
        intensity: "low",
        recommendedUnits: ["Marshal Team"],
      },
    ],
  },
  {
    id: "FLOW-CRIM-002",
    name: "Criminal report",
    category: "Security",
    description: "Reports of theft, burglary, or property crimes.",
    status: "draft",
    lastUpdated: "2024-05-30",
    usage30d: 41,
    avgHandleTime: "3m 55s",
    tags: ["suggested"],
    questions: [
      {
        id: "q-crim-1",
        label: "Where did the crime occur?",
        type: "location",
        required: true,
      },
      {
        id: "q-crim-2",
        label: "What type of incident is this?",
        type: "multiple_choice",
        required: true,
        options: ["Theft", "Burglary", "Vandalism", "Other"],
      },
      {
        id: "q-crim-3",
        label: "Is the suspect still nearby?",
        type: "yes_no",
        required: true,
      },
    ],
    checklist: [
      {
        id: "c-crim-1",
        label: "Preserve scene for evidence",
        category: "police",
        required: true,
      },
      {
        id: "c-crim-2",
        label: "Collect witness statements",
        category: "police",
        required: false,
      },
    ],
    dispatchRules: [
      {
        id: "r-crim-1",
        title: "Suspect nearby",
        condition: "Suspect nearby = Yes",
        intensity: "high",
        recommendedUnits: ["Police Unit"],
      },
      {
        id: "r-crim-2",
        title: "Report after incident",
        condition: "Suspect nearby = No",
        intensity: "medium",
        recommendedUnits: ["Marshal Team"],
      },
    ],
  },
];

export const mockFlowSuggestions = [
  {
    id: "SUG-001",
    title: "Street harassment",
    reports: 27,
    rationale: "Repeated reports over the last 14 days.",
  },
  {
    id: "SUG-002",
    title: "Illegal parking",
    reports: 19,
    rationale: "Top 5 call driver for traffic control teams.",
  },
  {
    id: "SUG-003",
    title: "Flooded roadway",
    reports: 16,
    rationale: "Spikes during heavy rain alerts.",
  },
];

export const getIncidentFlowById = (id: string) =>
  mockIncidentFlows.find((flow) => flow.id === id);

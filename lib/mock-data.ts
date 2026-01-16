export type IncidentStatus =
  | "pending"
  | "assigned"
  | "enroute"
  | "resolved"
  | "major";

export type ResponderStatus = "available" | "assigned" | "enroute" | "onsite";

export const mockIncident = {
  id: "INC-2209",
  title: "Multi-vehicle collision on EDSA",
  type: "Traffic collision",
  description:
    "Two vehicles collided at the intersection. One driver is reporting neck pain.",
  locationLabel: "EDSA & Aurora Blvd",
  address: "EDSA corner Aurora Blvd, Quezon City, Metro Manila",
  reportedAt: "2 min ago",
  status: "pending" as IncidentStatus,
  priority: "major",
  callerName: "Kai Santos",
  phone: "+63 917 555 0184",
  photoUrl: "/demo/accident.jpg",
  incidentMapUrl: "/demo/map-incident.png",
  reporterRating: 4.7,
  reporterVerified: true,
};

export const mockResponders = [
  {
    id: "UNIT-14",
    name: "Unit 14",
    lead: "Sgt. Miguel Reyes",
    role: "Traffic Response",
    status: "available" as ResponderStatus,
    eta: "6 min",
    distance: "1.4 km",
  },
  {
    id: "UNIT-22",
    name: "Unit 22",
    lead: "Ofc. Lara Cruz",
    role: "Medical Support",
    status: "available" as ResponderStatus,
    eta: "8 min",
    distance: "2.2 km",
  },
  {
    id: "UNIT-09",
    name: "Unit 09",
    lead: "Paramedic Paolo Lim",
    role: "EMS",
    status: "assigned" as ResponderStatus,
    eta: "10 min",
    distance: "2.8 km",
  },
];

export const assignedResponder = {
  id: "UNIT-14",
  name: "Unit 14",
  lead: "Sgt. Miguel Reyes",
  role: "Traffic Response",
  status: "enroute" as ResponderStatus,
  eta: "5 min",
  distance: "1.2 km",
  vehicle: "Response SUV 14",
  contact: "Radio 3A",
  rating: 4.9,
};

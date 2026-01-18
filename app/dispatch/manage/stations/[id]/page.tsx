"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Trash2,
  Car,
  Users,
  MapPin,
  Phone,
  Radio,
  MapPinned,
} from "lucide-react";
import { FormModal, DeleteConfirmDialog } from "@/components/crud";
import { StationForm } from "@/components/forms/StationForm";
import {
  getStationById,
  getVehiclesByStation,
  getTeamsByStation,
  getBarangaysByStation,
  Station,
  stationTypeLabels,
  vehicleStatusLabels,
  teamStatusLabels,
  riskLevelLabels,
} from "@/lib/mock-crud-data";

type TabType = "overview" | "vehicles" | "teams" | "barangays";

export default function StationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stationId = params.id as string;

  const [station, setStation] = useState(() => getStationById(stationId));
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!station) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Station not found</h2>
          <p className="text-muted-foreground mb-4">
            The station you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/dispatch/manage/stations" className="btn btn-primary">
            Back to Stations
          </Link>
        </div>
      </div>
    );
  }

  const vehicles = getVehiclesByStation(stationId);
  const teams = getTeamsByStation(stationId);
  const barangays = getBarangaysByStation(stationId);

  const handleEdit = (data: Omit<Station, "id" | "createdAt">) => {
    setStation({ ...station, ...data });
    setShowEditModal(false);
  };

  const handleDelete = () => {
    // In a real app, this would delete from the database
    router.push("/dispatch/manage/stations");
  };

  const tabs = [
    { id: "overview" as TabType, label: "Overview" },
    { id: "vehicles" as TabType, label: `Vehicles (${vehicles.length})` },
    { id: "teams" as TabType, label: `Teams (${teams.length})` },
    { id: "barangays" as TabType, label: `Barangays (${barangays.length})` },
  ];

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case "available":
        return "badge-success";
      case "assigned":
      case "enroute":
        return "badge-warning";
      case "onsite":
        return "badge-info";
      case "out_of_service":
        return "badge-danger";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dispatch/manage/stations"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Stations
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{station.name}</h1>
              <span className={`badge ${station.isActive ? "badge-success" : "badge-neutral"}`}>
                {station.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              {station.code} &bull; {stationTypeLabels[station.type]}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="btn btn-secondary"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="btn btn-ghost text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Station Info */}
          <div className="card">
            <h3 className="font-semibold mb-4">Station Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{station.address || "Not specified"}</p>
                </div>
              </div>

              {station.latitude && station.longitude && (
                <div className="flex items-start gap-3">
                  <MapPinned className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Coordinates</p>
                    <p className="font-medium">
                      {station.latitude}, {station.longitude}
                    </p>
                  </div>
                </div>
              )}

              {station.contactRadio && (
                <div className="flex items-start gap-3">
                  <Radio className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Radio Channel</p>
                    <p className="font-medium">{station.contactRadio}</p>
                  </div>
                </div>
              )}

              {station.contactPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{station.contactPhone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Vehicles</span>
                </div>
                <p className="text-2xl font-semibold">{vehicles.length}</p>
                <p className="text-xs text-muted-foreground">
                  {vehicles.filter((v) => v.status === "available").length} available
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Teams</span>
                </div>
                <p className="text-2xl font-semibold">{teams.length}</p>
                <p className="text-xs text-muted-foreground">
                  {teams.filter((t) => t.status === "available").length} available
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Coverage Areas</span>
                </div>
                <p className="text-2xl font-semibold">{barangays.length}</p>
                <p className="text-xs text-muted-foreground">barangays covered</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "vehicles" && (
        <div className="card p-0 overflow-hidden">
          {vehicles.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Car className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No vehicles assigned to this station</p>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Plate</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dispatch/manage/vehicles/${vehicle.id}`)}
                  >
                    <td>
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.code}</p>
                    </td>
                    <td className="capitalize">{vehicle.type}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass(vehicle.status)}`}>
                        {vehicleStatusLabels[vehicle.status]}
                      </span>
                    </td>
                    <td>{vehicle.plateNumber || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "teams" && (
        <div className="card p-0 overflow-hidden">
          {teams.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No teams assigned to this station</p>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr
                    key={team.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dispatch/manage/teams/${team.id}`)}
                  >
                    <td>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-xs text-muted-foreground">{team.code}</p>
                    </td>
                    <td className="capitalize">{team.type}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass(team.status)}`}>
                        {teamStatusLabels[team.status]}
                      </span>
                    </td>
                    <td>{team.rating ? `${team.rating} / 5` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "barangays" && (
        <div className="card p-0 overflow-hidden">
          {barangays.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No barangays covered by this station</p>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Barangay</th>
                  <th>Population</th>
                  <th>Risk Level</th>
                  <th>Evacuation Center</th>
                </tr>
              </thead>
              <tbody>
                {barangays.map((barangay) => (
                  <tr
                    key={barangay.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dispatch/manage/barangays/${barangay.id}`)}
                  >
                    <td>
                      <p className="font-medium">{barangay.name}</p>
                      <p className="text-xs text-muted-foreground">{barangay.code}</p>
                    </td>
                    <td>{barangay.population.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          barangay.riskLevel === "critical"
                            ? "badge-danger"
                            : barangay.riskLevel === "warning"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {riskLevelLabels[barangay.riskLevel]}
                      </span>
                    </td>
                    <td className="text-sm">{barangay.evacuationCenter || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <FormModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Station"
        description="Update station information"
        size="wide"
      >
        <StationForm
          station={station}
          onSubmit={handleEdit}
          onCancel={() => setShowEditModal(false)}
        />
      </FormModal>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Station"
        itemName={station.name}
        description={`This will permanently delete "${station.name}" and may affect ${vehicles.length} vehicles and ${teams.length} teams.`}
      />
    </div>
  );
}

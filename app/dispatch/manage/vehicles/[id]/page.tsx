"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash2, Building2, Users, Gauge } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/crud";
import {
  getVehicleById,
  getStationById,
  mockTeams,
  vehicleTypeLabels,
  vehicleStatusLabels,
  VehicleStatus,
} from "@/lib/mock-crud-data";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const [vehicle] = useState(() => getVehicleById(vehicleId));
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!vehicle) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Vehicle not found</h2>
          <Link href="/dispatch/manage/vehicles" className="btn btn-primary">
            Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const station = getStationById(vehicle.stationId);
  const assignedTeam = mockTeams.find((t) => t.vehicleId === vehicle.id);

  const statusBadgeClass = (status: VehicleStatus) => {
    switch (status) {
      case "available": return "badge-success";
      case "assigned":
      case "enroute": return "badge-warning";
      case "onsite": return "badge-info";
      case "out_of_service": return "badge-danger";
      default: return "badge-neutral";
    }
  };

  return (
    <div className="page">
      <div className="mb-6">
        <Link
          href="/dispatch/manage/vehicles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Vehicles
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{vehicle.name}</h1>
              <span className={`badge ${statusBadgeClass(vehicle.status)}`}>
                {vehicleStatusLabels[vehicle.status]}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              {vehicle.code} &bull; {vehicleTypeLabels[vehicle.type]}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/dispatch/manage/vehicles?edit=${vehicle.id}`)}
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Vehicle Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Station</p>
                <p className="font-medium">{station?.name || "Unassigned"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Plate Number</p>
                <p className="font-medium">{vehicle.plateNumber || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">{vehicle.capacity} persons</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Assigned Team</h3>
          {assignedTeam ? (
            <div
              onClick={() => router.push(`/dispatch/manage/teams/${assignedTeam.id}`)}
              className="p-4 rounded-lg border border-border hover:bg-muted cursor-pointer"
            >
              <p className="font-medium">{assignedTeam.name}</p>
              <p className="text-sm text-muted-foreground">{assignedTeam.code}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No team assigned to this vehicle</p>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => router.push("/dispatch/manage/vehicles")}
        title="Delete Vehicle"
        itemName={vehicle.name}
      />
    </div>
  );
}

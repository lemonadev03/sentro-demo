"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import { DataTable, Column, FormModal, DeleteConfirmDialog } from "@/components/crud";
import {
  mockVehicles,
  mockStations,
  Vehicle,
  VehicleType,
  VehicleStatus,
  vehicleTypeLabels,
  vehicleStatusLabels,
  getStationById,
} from "@/lib/mock-crud-data";

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

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

  const columns: Column<Vehicle>[] = [
    {
      key: "name",
      header: "Vehicle",
      sortable: true,
      render: (vehicle) => (
        <div>
          <p className="font-medium">{vehicle.name}</p>
          <p className="text-xs text-muted-foreground">{vehicle.code}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (vehicle) => vehicleTypeLabels[vehicle.type],
    },
    {
      key: "stationId",
      header: "Station",
      render: (vehicle) => {
        const station = getStationById(vehicle.stationId);
        return station?.name || "-";
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (vehicle) => (
        <span className={`badge ${statusBadgeClass(vehicle.status)}`}>
          {vehicleStatusLabels[vehicle.status]}
        </span>
      ),
    },
    {
      key: "plateNumber",
      header: "Plate",
      render: (vehicle) => vehicle.plateNumber || "-",
    },
  ];

  const handleCreate = (data: Omit<Vehicle, "id" | "createdAt">) => {
    const newVehicle: Vehicle = {
      ...data,
      id: `VEH-${String(vehicles.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setVehicles([...vehicles, newVehicle]);
    setShowCreateModal(false);
  };

  const handleEdit = (data: Omit<Vehicle, "id" | "createdAt">) => {
    if (!editingVehicle) return;
    setVehicles(vehicles.map((v) => v.id === editingVehicle.id ? { ...v, ...data } : v));
    setEditingVehicle(null);
  };

  const handleDelete = () => {
    if (!deletingVehicle) return;
    setVehicles(vehicles.filter((v) => v.id !== deletingVehicle.id));
    setDeletingVehicle(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vehicles</h1>
          <p className="page-subtitle">Manage response vehicles</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </button>
      </div>

      <DataTable
        data={vehicles}
        columns={columns}
        keyExtractor={(vehicle) => vehicle.id}
        searchPlaceholder="Search vehicles..."
        searchKeys={["name", "code", "plateNumber"]}
        onRowClick={(vehicle) => router.push(`/dispatch/manage/vehicles/${vehicle.id}`)}
        emptyState={{
          title: "No vehicles yet",
          description: "Add your first vehicle to get started.",
          action: { label: "Add Vehicle", onClick: () => setShowCreateModal(true) },
        }}
        actions={(vehicle) => (
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === vehicle.id ? null : vehicle.id)}
              className="btn btn-ghost p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {actionMenuOpen === vehicle.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActionMenuOpen(null)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  <button
                    onClick={() => { router.push(`/dispatch/manage/vehicles/${vehicle.id}`); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                  <button
                    onClick={() => { setEditingVehicle(vehicle); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => { setDeletingVehicle(vehicle); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      />

      <FormModal
        open={showCreateModal || !!editingVehicle}
        onClose={() => { setShowCreateModal(false); setEditingVehicle(null); }}
        title={editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        size="wide"
      >
        <VehicleForm
          vehicle={editingVehicle || undefined}
          onSubmit={editingVehicle ? handleEdit : handleCreate}
          onCancel={() => { setShowCreateModal(false); setEditingVehicle(null); }}
        />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deletingVehicle}
        onClose={() => setDeletingVehicle(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        itemName={deletingVehicle?.name}
      />
    </div>
  );
}

function VehicleForm({
  vehicle,
  onSubmit,
  onCancel,
}: {
  vehicle?: Vehicle;
  onSubmit: (data: Omit<Vehicle, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: vehicle?.name || "",
    code: vehicle?.code || "",
    stationId: vehicle?.stationId || mockStations[0]?.id || "",
    type: vehicle?.type || ("patrol" as VehicleType),
    status: vehicle?.status || ("available" as VehicleStatus),
    plateNumber: vehicle?.plateNumber || "",
    capacity: vehicle?.capacity?.toString() || "4",
    isActive: vehicle?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      code: formData.code,
      stationId: formData.stationId,
      type: formData.type,
      status: formData.status,
      plateNumber: formData.plateNumber || undefined,
      capacity: parseInt(formData.capacity) || 4,
      isActive: formData.isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Vehicle Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., Response SUV 14"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="input form-input w-full"
            placeholder="e.g., UNIT-14"
            required
          />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Station <span className="text-red-500">*</span></label>
          <select
            value={formData.stationId}
            onChange={(e) => setFormData({ ...formData, stationId: e.target.value })}
            className="input form-input w-full"
            required
          >
            {mockStations.filter(s => s.isActive).map((station) => (
              <option key={station.id} value={station.id}>{station.name}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Type <span className="text-red-500">*</span></label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as VehicleType })}
            className="input form-input w-full"
          >
            {Object.entries(vehicleTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as VehicleStatus })}
            className="input form-input w-full"
          >
            {Object.entries(vehicleStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Plate Number</label>
          <input
            type="text"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., QC-1234"
          />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            className="input form-input w-full"
            min="1"
          />
        </div>
        <div className="form-field flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm">Vehicle is active</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">{vehicle ? "Save Changes" : "Create Vehicle"}</button>
      </div>
    </form>
  );
}

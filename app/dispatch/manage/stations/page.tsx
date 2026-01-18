"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import { DataTable, Column, FormModal, DeleteConfirmDialog } from "@/components/crud";
import { StationForm } from "@/components/forms/StationForm";
import {
  mockStations,
  Station,
  stationTypeLabels,
  getVehiclesByStation,
  getTeamsByStation,
} from "@/lib/mock-crud-data";

export default function StationsPage() {
  const router = useRouter();
  const [stations, setStations] = useState(mockStations);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [deletingStation, setDeletingStation] = useState<Station | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const columns: Column<Station>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (station) => (
        <div>
          <p className="font-medium">{station.name}</p>
          <p className="text-xs text-muted-foreground">{station.code}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (station) => (
        <span className="badge badge-info">{stationTypeLabels[station.type]}</span>
      ),
    },
    {
      key: "vehicles",
      header: "Vehicles",
      render: (station) => {
        const vehicles = getVehiclesByStation(station.id);
        const available = vehicles.filter((v) => v.status === "available").length;
        return (
          <span className="text-sm">
            {available} / {vehicles.length}
          </span>
        );
      },
    },
    {
      key: "teams",
      header: "Teams",
      render: (station) => {
        const teams = getTeamsByStation(station.id);
        const available = teams.filter((t) => t.status === "available").length;
        return (
          <span className="text-sm">
            {available} / {teams.length}
          </span>
        );
      },
    },
    {
      key: "isActive",
      header: "Status",
      sortable: true,
      render: (station) => (
        <span className={`badge ${station.isActive ? "badge-success" : "badge-neutral"}`}>
          {station.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleCreate = (data: Omit<Station, "id" | "createdAt">) => {
    const newStation: Station = {
      ...data,
      id: `STN-${String(stations.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setStations([...stations, newStation]);
    setShowCreateModal(false);
  };

  const handleEdit = (data: Omit<Station, "id" | "createdAt">) => {
    if (!editingStation) return;
    setStations(
      stations.map((s) =>
        s.id === editingStation.id ? { ...s, ...data } : s
      )
    );
    setEditingStation(null);
  };

  const handleDelete = () => {
    if (!deletingStation) return;
    setStations(stations.filter((s) => s.id !== deletingStation.id));
    setDeletingStation(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stations</h1>
          <p className="page-subtitle">
            Manage command centers and outposts
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Station
        </button>
      </div>

      <DataTable
        data={stations}
        columns={columns}
        keyExtractor={(station) => station.id}
        searchPlaceholder="Search stations..."
        searchKeys={["name", "code", "address"]}
        onRowClick={(station) => router.push(`/dispatch/manage/stations/${station.id}`)}
        emptyState={{
          title: "No stations yet",
          description: "Create your first station to get started.",
          action: {
            label: "Add Station",
            onClick: () => setShowCreateModal(true),
          },
        }}
        actions={(station) => (
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === station.id ? null : station.id)}
              className="btn btn-ghost p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {actionMenuOpen === station.id && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setActionMenuOpen(null)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  <button
                    onClick={() => {
                      router.push(`/dispatch/manage/stations/${station.id}`);
                      setActionMenuOpen(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingStation(station);
                      setActionMenuOpen(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeletingStation(station);
                      setActionMenuOpen(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      />

      {/* Create Modal */}
      <FormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add Station"
        description="Create a new command center or outpost"
        size="wide"
      >
        <StationForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </FormModal>

      {/* Edit Modal */}
      <FormModal
        open={!!editingStation}
        onClose={() => setEditingStation(null)}
        title="Edit Station"
        description="Update station information"
        size="wide"
      >
        {editingStation && (
          <StationForm
            station={editingStation}
            onSubmit={handleEdit}
            onCancel={() => setEditingStation(null)}
          />
        )}
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingStation}
        onClose={() => setDeletingStation(null)}
        onConfirm={handleDelete}
        title="Delete Station"
        itemName={deletingStation?.name}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import { DataTable, Column, FormModal, DeleteConfirmDialog } from "@/components/crud";
import {
  mockBarangays,
  Barangay,
  RiskLevel,
  riskLevelLabels,
} from "@/lib/mock-crud-data";

export default function BarangaysPage() {
  const router = useRouter();
  const [barangays, setBarangays] = useState(mockBarangays);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBarangay, setEditingBarangay] = useState<Barangay | null>(null);
  const [deletingBarangay, setDeletingBarangay] = useState<Barangay | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const columns: Column<Barangay>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (barangay) => (
        <div>
          <p className="font-medium">{barangay.name}</p>
          <p className="text-xs text-muted-foreground">{barangay.code}</p>
        </div>
      ),
    },
    {
      key: "population",
      header: "Population",
      sortable: true,
      render: (barangay) => barangay.population.toLocaleString(),
    },
    {
      key: "riskLevel",
      header: "Risk Level",
      sortable: true,
      render: (barangay) => (
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
      ),
    },
    {
      key: "evacuationCenter",
      header: "Evacuation Center",
      render: (barangay) => barangay.evacuationCenter || "-",
    },
  ];

  const handleCreate = (data: Omit<Barangay, "id" | "createdAt">) => {
    const newBarangay: Barangay = {
      ...data,
      id: `BRG-${String(barangays.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setBarangays([...barangays, newBarangay]);
    setShowCreateModal(false);
  };

  const handleEdit = (data: Omit<Barangay, "id" | "createdAt">) => {
    if (!editingBarangay) return;
    setBarangays(
      barangays.map((b) =>
        b.id === editingBarangay.id ? { ...b, ...data } : b
      )
    );
    setEditingBarangay(null);
  };

  const handleDelete = () => {
    if (!deletingBarangay) return;
    setBarangays(barangays.filter((b) => b.id !== deletingBarangay.id));
    setDeletingBarangay(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Barangays</h1>
          <p className="page-subtitle">
            Manage coverage areas and jurisdictions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Barangay
        </button>
      </div>

      <DataTable
        data={barangays}
        columns={columns}
        keyExtractor={(barangay) => barangay.id}
        searchPlaceholder="Search barangays..."
        searchKeys={["name", "code", "evacuationCenter"]}
        onRowClick={(barangay) => router.push(`/dispatch/manage/barangays/${barangay.id}`)}
        emptyState={{
          title: "No barangays yet",
          description: "Add your first barangay to get started.",
          action: {
            label: "Add Barangay",
            onClick: () => setShowCreateModal(true),
          },
        }}
        actions={(barangay) => (
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === barangay.id ? null : barangay.id)}
              className="btn btn-ghost p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {actionMenuOpen === barangay.id && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setActionMenuOpen(null)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  <button
                    onClick={() => {
                      router.push(`/dispatch/manage/barangays/${barangay.id}`);
                      setActionMenuOpen(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingBarangay(barangay);
                      setActionMenuOpen(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeletingBarangay(barangay);
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

      {/* Create/Edit Modal */}
      <FormModal
        open={showCreateModal || !!editingBarangay}
        onClose={() => {
          setShowCreateModal(false);
          setEditingBarangay(null);
        }}
        title={editingBarangay ? "Edit Barangay" : "Add Barangay"}
        description={editingBarangay ? "Update barangay information" : "Add a new coverage area"}
        size="wide"
      >
        <BarangayForm
          barangay={editingBarangay || undefined}
          onSubmit={editingBarangay ? handleEdit : handleCreate}
          onCancel={() => {
            setShowCreateModal(false);
            setEditingBarangay(null);
          }}
        />
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingBarangay}
        onClose={() => setDeletingBarangay(null)}
        onConfirm={handleDelete}
        title="Delete Barangay"
        itemName={deletingBarangay?.name}
      />
    </div>
  );
}

// Inline form component
function BarangayForm({
  barangay,
  onSubmit,
  onCancel,
}: {
  barangay?: Barangay;
  onSubmit: (data: Omit<Barangay, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: barangay?.name || "",
    code: barangay?.code || "",
    population: barangay?.population?.toString() || "",
    riskLevel: barangay?.riskLevel || ("normal" as RiskLevel),
    evacuationCenter: barangay?.evacuationCenter || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      code: formData.code,
      population: parseInt(formData.population) || 0,
      riskLevel: formData.riskLevel,
      evacuationCenter: formData.evacuationCenter || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label className="form-label">
          Barangay Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input form-input w-full"
          placeholder="e.g., Barangay Commonwealth"
          required
        />
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="input form-input w-full"
            placeholder="e.g., COM"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Population <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.population}
            onChange={(e) => setFormData({ ...formData, population: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., 45000"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Risk Level</label>
        <select
          value={formData.riskLevel}
          onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as RiskLevel })}
          className="input form-input w-full"
        >
          {Object.entries(riskLevelLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Evacuation Center</label>
        <input
          type="text"
          value={formData.evacuationCenter}
          onChange={(e) => setFormData({ ...formData, evacuationCenter: e.target.value })}
          className="input form-input w-full"
          placeholder="e.g., Commonwealth Elementary School"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {barangay ? "Save Changes" : "Create Barangay"}
        </button>
      </div>
    </form>
  );
}

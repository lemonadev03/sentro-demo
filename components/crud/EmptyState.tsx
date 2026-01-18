"use client";

import { LucideIcon, FileX2 } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon = FileX2,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <Icon className="empty-state-icon" />
      <h3 className="empty-state-title">{title}</h3>
      {description && (
        <p className="empty-state-description">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary empty-state-action"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronLeft, Clock, Check, X, AlertCircle, Plus } from "lucide-react";
import {
  mockUpdateRequests,
  RequestStatus,
  requestTypeLabels,
  requestStatusLabels,
} from "@/lib/mock-crud-data";

// Simulate current logged-in responder
const currentUserId = "USR-001";

export default function RequestHistoryPage() {
  // Get requests for current user
  const myRequests = mockUpdateRequests.filter((r) => r.requesterId === currentUserId);

  const statusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending": return <Clock className="h-5 w-5 text-yellow-500" />;
      case "approved": return <Check className="h-5 w-5 text-green-500" />;
      case "rejected": return <X className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const statusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case "pending": return "badge-warning";
      case "approved": return "badge-success";
      case "rejected": return "badge-danger";
      default: return "badge-neutral";
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/responder"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="page-title">My Requests</h1>
            <p className="page-subtitle">View the status of your submitted requests</p>
          </div>
          <Link href="/responder/request" className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Link>
        </div>
      </div>

      {/* Request List */}
      {myRequests.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-4">You haven&apos;t submitted any requests yet</p>
          <Link href="/responder/request" className="btn btn-primary">
            Submit a Request
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myRequests.map((request) => (
            <div key={request.id} className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{statusIcon(request.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold">{request.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {requestTypeLabels[request.requestType]}
                      </p>
                    </div>
                    <span className={`badge ${statusBadgeClass(request.status)}`}>
                      {requestStatusLabels[request.status]}
                    </span>
                  </div>

                  {request.description && (
                    <p className="text-sm text-muted-foreground mt-2">{request.description}</p>
                  )}

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>
                      Submitted:{" "}
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {request.reviewedAt && (
                      <span>
                        Reviewed:{" "}
                        {new Date(request.reviewedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {request.reviewNotes && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Review Notes
                      </p>
                      <p className="text-sm">{request.reviewNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

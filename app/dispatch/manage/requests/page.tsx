"use client";

import { useState } from "react";
import { Inbox, Check, X, Clock, AlertCircle, Filter } from "lucide-react";
import {
  mockUpdateRequests,
  UpdateRequest,
  RequestStatus,
  requestTypeLabels,
  requestStatusLabels,
  getUserById,
} from "@/lib/mock-crud-data";

export default function RequestsPage() {
  const [requests, setRequests] = useState(mockUpdateRequests);
  const [filter, setFilter] = useState<RequestStatus | "all">("all");
  const [selectedRequest, setSelectedRequest] = useState<UpdateRequest | null>(null);

  const filteredRequests = filter === "all"
    ? requests
    : requests.filter((r) => r.status === filter);

  const handleApprove = (requestId: string) => {
    setRequests(requests.map((r) =>
      r.id === requestId
        ? { ...r, status: "approved" as RequestStatus, reviewedAt: new Date().toISOString() }
        : r
    ));
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map((r) =>
      r.id === requestId
        ? { ...r, status: "rejected" as RequestStatus, reviewedAt: new Date().toISOString() }
        : r
    ));
    setSelectedRequest(null);
  };

  const statusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved": return <Check className="h-4 w-4 text-green-500" />;
      case "rejected": return <X className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
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

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Inbox className="h-6 w-6" />
            Update Requests
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </h1>
          <p className="page-subtitle">Review requests from responders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filter === status
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {status === "all" ? "All" : requestStatusLabels[status]}
            {status === "pending" && pendingCount > 0 && (
              <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Request List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="card text-center py-12">
              <Inbox className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const requester = getUserById(request.requesterId);
              const isSelected = selectedRequest?.id === request.id;

              return (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`card cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-primary" : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {statusIcon(request.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {requester?.firstName} {requester?.lastName} &bull;{" "}
                            {requestTypeLabels[request.requestType]}
                          </p>
                        </div>
                        <span className={`badge ${statusBadgeClass(request.status)} flex-shrink-0`}>
                          {requestStatusLabels[request.status]}
                        </span>
                      </div>
                      {request.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {request.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(request.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Request Detail */}
        <div className="lg:col-span-1">
          {selectedRequest ? (
            <div className="card sticky top-4">
              <h3 className="font-semibold mb-4">Request Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{selectedRequest.title}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{requestTypeLabels[selectedRequest.requestType]}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Requester</p>
                  <p className="font-medium">
                    {getUserById(selectedRequest.requesterId)?.firstName}{" "}
                    {getUserById(selectedRequest.requesterId)?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={`badge ${statusBadgeClass(selectedRequest.status)}`}>
                    {requestStatusLabels[selectedRequest.status]}
                  </span>
                </div>

                {selectedRequest.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{selectedRequest.description}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-sm">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>

                {selectedRequest.reviewedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Reviewed</p>
                    <p className="text-sm">
                      {new Date(selectedRequest.reviewedAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedRequest.reviewNotes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Review Notes</p>
                    <p className="text-sm">{selectedRequest.reviewNotes}</p>
                  </div>
                )}

                {selectedRequest.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="btn btn-primary flex-1"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      className="btn btn-danger flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <Filter className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-sm">
                Select a request to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

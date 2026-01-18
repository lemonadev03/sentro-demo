"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  MapPin,
  Car,
  Users,
  UserCircle,
  Calendar,
  Inbox,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { getPendingRequests } from "@/lib/mock-crud-data";

const navItems = [
  { href: "/dispatch/manage", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dispatch/manage/incident-flows", label: "Incident Flows", icon: ClipboardList },
  { href: "/dispatch/manage/stations", label: "Stations", icon: Building2 },
  { href: "/dispatch/manage/barangays", label: "Barangays", icon: MapPin },
  { href: "/dispatch/manage/vehicles", label: "Vehicles", icon: Car },
  { href: "/dispatch/manage/teams", label: "Teams", icon: Users },
  { href: "/dispatch/manage/responders", label: "Responders", icon: UserCircle },
  { href: "/dispatch/manage/schedules", label: "Schedules", icon: Calendar },
  { href: "/dispatch/manage/requests", label: "Requests", icon: Inbox, badge: true },
];

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingCount = getPendingRequests().length;

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-ghost p-2"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold">Resource Management</span>
          <Link href="/dispatch" className="btn btn-ghost p-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50 lg:z-0
            h-screen w-64 bg-background border-r border-border
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border">
              <Link
                href="/dispatch"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Back to Dispatch</span>
              </Link>
              <h1 className="mt-3 font-semibold text-lg">Resource Management</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        nav-item
                        ${active ? "active" : ""}
                      `}
                    >
                      <Icon className="nav-icon" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && pendingCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {pendingCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

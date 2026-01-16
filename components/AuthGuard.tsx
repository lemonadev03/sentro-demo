"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);

    // Don't protect the login page
    if (pathname === "/login") {
      setIsChecking(false);
      // If already authenticated and on login page, redirect to home
      if (authStatus) {
        router.push("/");
      }
      return;
    }

    // Check authentication for protected routes
    if (!authStatus) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [router, pathname]);

  // Show loading state while checking (only for protected routes)
  if (isChecking && pathname !== "/login") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

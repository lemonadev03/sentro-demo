"use client";

const USERNAME = "bscale";
const PASSWORD = "bscalelabs123";
const AUTH_KEY = "sentro_auth";

export function login(username: string, password: string): boolean {
  if (username === USERNAME && password === PASSWORD) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "authenticated");
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(AUTH_KEY) === "authenticated";
}

export function checkAuth(): boolean {
  return isAuthenticated();
}

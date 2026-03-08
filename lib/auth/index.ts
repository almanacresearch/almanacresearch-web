"use client";

export {
  signInWithGoogle,
  connectGoogleAccount,
  onAuthSuccess,
  cleanupAuthListeners,
} from "./google";
export type { User } from "./types";
export { UserProvider, useUser } from "./context";

import type { User } from "./types";

let userCache: { user: User | null; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Auto-refresh timer
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export async function signOut(): Promise<void> {
  try {
    stopAutoRefresh();
    await fetch("/api/auth/signout", { method: "POST" });
  } finally {
    userCache = null;
    window.location.href = "/";
  }
}

/**
 * Refresh the access token using the refresh token
 * Call this when you get a 401 from Google APIs
 * Returns true if refresh was successful
 */
export async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      clearUserCache();
      stopAutoRefresh();
      return false;
    }

    const data = await response.json();
    
    // Schedule next refresh based on new token expiry
    if (data.expiresIn) {
      scheduleAutoRefresh(data.expiresIn);
    }

    clearUserCache();
    return true;
  } catch {
    return false;
  }
}

/**
 * Schedule automatic token refresh before expiry
 * @param expiresInSeconds - Seconds until access token expires
 */
function scheduleAutoRefresh(expiresInSeconds: number): void {
  stopAutoRefresh();
  
  // Refresh 5 minutes before expiry, minimum 30 seconds
  const refreshInMs = Math.max(
    (expiresInSeconds - 5 * 60) * 1000,
    30 * 1000
  );
  
  refreshTimer = setTimeout(async () => {
    const success = await refreshToken();
    if (!success) {
      console.warn("Auto-refresh failed, user may need to sign in again");
    }
  }, refreshInMs);
}

/**
 * Stop the auto-refresh timer
 */
function stopAutoRefresh(): void {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

export async function getUser(): Promise<User | null> {
  if (typeof window === "undefined") return null;

  if (userCache && Date.now() - userCache.timestamp < CACHE_TTL) {
    return userCache.user;
  }

  try {
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!response.ok) {
      userCache = { user: null, timestamp: Date.now() };
      stopAutoRefresh();
      return null;
    }

    const data = await response.json();

    if (data.authenticated && data.user) {
      userCache = { user: data.user, timestamp: Date.now() };
      
      // Auto-refresh: if access token is missing or about to expire, refresh it
      if (data.shouldRefreshAccessToken) {
        refreshToken(); // Don't await, do it in background
      } else if (data.accessTokenExpiresIn > 0) {
        // Schedule refresh before token expires
        scheduleAutoRefresh(data.accessTokenExpiresIn);
      }
      
      return data.user;
    }

    userCache = { user: null, timestamp: Date.now() };
    stopAutoRefresh();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAccount(
  confirm: boolean = false
): Promise<{ success: boolean; error?: string }> {
  if (!confirm) {
    return { success: false, error: "Please confirm account deletion" };
  }

  try {
    const response = await fetch("/api/auth/delete-account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ confirm: true }),
    });

    const result = await response.json();

    if (result.success) {
      userCache = null;
      window.location.href = "/";
    }

    return result;
  } catch {
    return { success: false, error: "Failed to delete account" };
  }
}

export function clearUserCache(): void {
  userCache = null;
}

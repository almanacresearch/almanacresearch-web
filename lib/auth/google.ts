"use client";

import { clearUserCache, getUser } from "./index";

// Support multiple auth success listeners
const authSuccessCallbacks = new Set<() => void>();
let cleanupFunctions: (() => void)[] = [];

export function onAuthSuccess(callback: () => void): () => void {
  authSuccessCallbacks.add(callback);
  return () => {
    authSuccessCallbacks.delete(callback);
  };
}

function notifyAuthSuccess(): void {
  if (authSuccessCallbacks.size > 0) {
    authSuccessCallbacks.forEach((callback) => callback());
  } else {
    window.location.reload();
  }
}

export function cleanupAuthListeners(): void {
  cleanupFunctions.forEach((cleanup) => cleanup());
  cleanupFunctions = [];
}

export function signInWithGoogle(customReturnUrl?: string): void {
  cleanupAuthListeners();

  // Store current URL so callback can redirect back
  const returnUrl = encodeURIComponent(customReturnUrl || window.location.href);

  // Handle auth success via postMessage (works on mobile)
  const handleMessage = (event: MessageEvent) => {
    // Validate origin to prevent malicious websites from faking auth success
    if (event.origin !== window.location.origin) {
      return;
    }
    if (event.data?.type === "AUTH_SUCCESS") {
      clearUserCache();
      cleanupAuthListeners();
      notifyAuthSuccess();
    }
  };

  // Fallback: Also check on focus (for desktop popup close)
  const handleFocus = async () => {
    clearUserCache();
    const user = await getUser();
    if (user) {
      cleanupAuthListeners();
      notifyAuthSuccess();
    }
  };

  // Fallback: Check on visibility change (for mobile tab switch)
  const handleVisibilityChange = async () => {
    if (document.visibilityState === "visible") {
      clearUserCache();
      const user = await getUser();
      if (user) {
        cleanupAuthListeners();
        notifyAuthSuccess();
      }
    }
  };

  window.addEventListener("message", handleMessage);
  window.addEventListener("focus", handleFocus);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  cleanupFunctions = [
    () => window.removeEventListener("message", handleMessage),
    () => window.removeEventListener("focus", handleFocus),
    () => document.removeEventListener("visibilitychange", handleVisibilityChange),
  ];

  // Use server endpoint for OAuth initiation (single source of truth)
  const authUrl = `/api/auth/google?returnUrl=${returnUrl}`;

  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    authUrl,
    "google-auth",
    `width=${width},height=${height},left=${left},top=${top},popup=yes`
  );
}

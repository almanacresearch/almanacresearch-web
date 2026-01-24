"use client";

import { clearUserCache, getUser } from "./index";

// Support multiple auth success listeners
const authSuccessCallbacks = new Set<() => void>();
let focusEventCleanup: (() => void) | null = null;

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
  if (focusEventCleanup) {
    focusEventCleanup();
    focusEventCleanup = null;
  }
}

export function signInWithGoogle(customReturnUrl?: string): void {
  cleanupAuthListeners();

  // Store current URL so callback can redirect back
  const returnUrl = encodeURIComponent(customReturnUrl || window.location.href);

  const handleFocus = async () => {
    clearUserCache();
    const user = await getUser();
    if (user) {
      cleanupAuthListeners();
      notifyAuthSuccess();
    }
  };

  window.addEventListener("focus", handleFocus);
  focusEventCleanup = () => {
    window.removeEventListener("focus", handleFocus);
  };

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

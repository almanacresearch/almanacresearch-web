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
  const returnUrl = encodeURIComponent(customReturnUrl || window.location.href);
  openAuthPopup(`/api/auth/google?returnUrl=${returnUrl}`, "google-auth");
}

/**
 * Open a popup to connect an additional Google account.
 * The user must already be signed in. The callback will link the new
 * Google account to the existing user instead of creating a new one.
 *
 * @param options.scopes - Pass "gmail" to request Gmail + Calendar scopes
 * @param options.returnUrl - URL to redirect to after connecting
 */
export function connectGoogleAccount(options?: {
  scopes?: "gmail";
  returnUrl?: string;
}): void {
  const returnUrl = encodeURIComponent(
    options?.returnUrl || window.location.href,
  );

  let authUrl = `/api/auth/google?flow=connect&returnUrl=${returnUrl}`;
  if (options?.scopes) {
    authUrl += `&scopes=${options.scopes}`;
  }

  openAuthPopup(authUrl, "google-connect");
}

/**
 * Shared popup helper
 */
function openAuthPopup(url: string, popupName: string): void {
  cleanupAuthListeners();

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === "AUTH_SUCCESS") {
      clearUserCache();
      cleanupAuthListeners();
      notifyAuthSuccess();
    }
  };

  const handleFocus = async () => {
    clearUserCache();
    const user = await getUser();
    if (user) {
      cleanupAuthListeners();
      notifyAuthSuccess();
    }
  };

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
    () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange),
  ];

  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    url,
    popupName,
    `width=${width},height=${height},left=${left},top=${top},popup=yes`,
  );
}

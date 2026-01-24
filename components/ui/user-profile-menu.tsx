"use client";

import { useEffect, useState } from "react";
import { X, User } from "lucide-react";
import { colors } from "@/lib/constants/theme";
import { signInWithGoogle, signOut, useUser } from "@/lib/auth";

interface UserProfileMenuProps {
  variant?: "dark" | "light";
  className?: string;
  showSignIn?: boolean;
  signInText?: string;
}

export function UserProfileMenu({
  variant = "dark",
  className = "",
  showSignIn = true,
  signInText = "Sign in",
}: UserProfileMenuProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = variant === "dark";

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as HTMLElement;
      const isInsideProfileDropdown = target.closest("[data-profile-dropdown]");
      if (!isInsideProfileDropdown) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  const profileButtonClass = `flex items-center justify-center w-8 h-8 rounded-full border-2 border-amber-900/20 cursor-pointer transition-all duration-200 ease-out hover:scale-105 ${
    isDark ? "bg-amber-50 text-amber-900" : "bg-amber-900 text-amber-50"
  }`;

  const signInButtonClass = `transition font-medium px-3 py-1 rounded-lg border border-amber-900/10 cursor-pointer hover:scale-105 ${
    isDark
      ? "text-amber-50 hover:text-amber-100"
      : "text-amber-900 hover:text-amber-900"
  }`;

  // User not signed in
  if (!user) {
    return showSignIn ? (
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className={`${signInButtonClass} ${className}`}
      >
        {signInText}
      </button>
    ) : null;
  }

  // User signed in - show profile dropdown
  return (
    <div className={`relative ${className}`} data-profile-dropdown>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={profileButtonClass}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <User className="w-4 h-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors z-10"
            aria-label="Close menu"
          >
            <X className="w-3 h-3" aria-hidden="true" />
          </button>

          {/* User info */}
          <div className="px-5 pt-4 pb-3 text-center">
            <p
              className="text-sm font-medium truncate"
              style={{ color: colors.primary.darkBrown }}
            >
              {user.name}
            </p>

            <p className="mt-0.5 text-[11px] text-neutral-500 truncate">
              {user.email}
            </p>

            {user.invited && (
              <p className="mt-1 text-[11px] text-neutral-400 tracking-wide">
                Invited member!
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="px-5 pt-4 pb-4 text-center">
            <button
              type="button"
              onClick={handleSignOut}
              className="text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

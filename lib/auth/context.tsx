"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User } from "./types";
import { getUser, onAuthSuccess } from "./index";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user on mount if no initialUser provided
  useEffect(() => {
    if (!initialUser) {
      refreshUser();
    }
  }, [initialUser, refreshUser]);

  // Listen for auth success events (e.g., after OAuth callback)
  useEffect(() => {
    const unsubscribe = onAuthSuccess(() => {
      refreshUser();
    });
    return () => unsubscribe();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

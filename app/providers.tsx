"use client";

import { UserProvider } from "@/lib/auth";
import { User } from "@/lib/auth/types";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function Providers({ children, initialUser = null }: ProvidersProps) {
  return <UserProvider initialUser={initialUser}>{children}</UserProvider>;
}

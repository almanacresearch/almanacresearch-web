import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlmanacAI",
  description: "AlmanacAI | Almanac Research",
};

export default function AppSubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

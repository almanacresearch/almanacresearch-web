import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlmanacAI Mail",
  description: "AlmanacAI Mail | Almanac Research",
};

export default function AppMvpSubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

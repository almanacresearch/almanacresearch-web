import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs | Almanac Research",
  description: "Documentation for AlmanacAI by Almanac Research",
};

export default function DocsSubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Almanac Research",
  openGraph: {
    title: "About Us",
    description: "Learn about Almanac Research",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

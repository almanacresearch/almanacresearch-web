import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Almanac Research Terms of Service",
  openGraph: {
    title: "Terms of Service",
    description: "Almanac Research Terms of Service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

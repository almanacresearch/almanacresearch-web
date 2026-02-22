import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Almanac Research Privacy Policy",
  openGraph: {
    title: "Privacy Policy",
    description: "Almanac Research Privacy Policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

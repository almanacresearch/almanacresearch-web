import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth/session";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;

  // Only allow valid sources
  if (source !== "chrome") {
    redirect("/");
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIES.SESSION)?.value;

  if (sessionToken) {
    const session = verifySessionToken(sessionToken);
    if (session) {
      // Has valid session → redirect to platform-specific token endpoint
      redirect(`/api/auth/token/${source}`);
    }
  }

  // No session → redirect to Google OAuth with Gmail scopes, then come back here
  const returnUrl = encodeURIComponent(`/connect?source=${source}`);
  redirect(`/api/auth/google?returnUrl=${returnUrl}&source=${source}`);
}

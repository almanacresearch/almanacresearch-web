import { cookies } from "next/headers";
import { verifySessionToken } from "./session";
import { AUTH_COOKIES } from "./cookies";
import { User } from "./types";

/**
 * Get user from session cookie on the server.
 * Returns null if not authenticated.
 */
export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIES.SESSION)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = verifySessionToken(sessionToken);
  if (!session) {
    return null;
  }

  return {
    userId: session.userId,
    email: session.email,
    name: session.name,
    picture: session.picture,
    invited: session.invited,
  };
}

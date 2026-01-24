import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSubdomainConfig } from "@/lib/config/subdomains";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

function extractSubdomain(host: string): string | null {
  const hostname = host.split(":")[0];
  const parts = hostname.split(".");

  // Handle localhost for development
  if (parts.length === 2 && parts[1] === "localhost") {
    return parts[0] === "localhost" ? null : parts[0];
  }

  if (parts.length <= 2) {
    return null;
  }

  if (parts[0] === "www") {
    return null;
  }

  return parts[0];
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  const subdomain = extractSubdomain(host);
  if (!subdomain) {
    return NextResponse.next();
  }

  const config = getSubdomainConfig(subdomain);
  if (!config) {
    return NextResponse.next();
  }

  // Check authentication if required for this subdomain
  if (config.requireAuth) {
    const session = request.cookies.get(AUTH_COOKIES.SESSION)?.value;

    if (!session) {
      const redirectUrl = config.authRedirectUrl || "/";
      const mainDomain = host.split(".").slice(1).join(".");
      const protocol = request.headers.get("x-forwarded-proto") || "https";

      return NextResponse.redirect(
        new URL(redirectUrl, `${protocol}://${mainDomain}`)
      );
    }
  }

  // Already on the correct internal route
  if (url.pathname.startsWith(config.route)) {
    return NextResponse.next();
  }

  // Rewrite to internal subdomain route
  url.pathname = `${config.route}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|animations).*)"],
};

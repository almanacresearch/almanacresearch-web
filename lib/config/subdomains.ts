export interface SubdomainConfig {
  route: string;
  requireAuth?: boolean;
  authRedirectUrl?: string;
}

export const SUBDOMAINS: Record<string, SubdomainConfig> = {
  app: {
    route: "/app-subdomain",
  },
  appmvp: {
    route: "/appmvp-subdomain",
  },
  docs: {
    route: "/docs-subdomain",
  },
} as const;

export function getSubdomainConfig(subdomain: string): SubdomainConfig | null {
  return SUBDOMAINS[subdomain] || null;
}

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in SUBDOMAINS;
}

export function getConfiguredSubdomains(): string[] {
  return Object.keys(SUBDOMAINS);
}

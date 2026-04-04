/**
 * GoHighLevel API Helper
 * Uses Private Integration Token (PIT) for authentication
 * 
 * Scopes available: locations.search, locations.get, locations.update
 * Most other scopes require re-generating the PIT with broader permissions
 * 
 * Usage (backend only):
 *   import { ghlApi } from '@/lib/ghl-api';
 *   const locations = await ghlApi.listLocations();
 *   const location = await ghlApi.getLocation('UieaWEUbKDNaOwxSd9gQ');
 */

const GHL_CONFIG = {
  baseUrl: 'https://services.leadconnectorhq.com',
  pitToken: process.env.GHL_PIT_TOKEN || 'pit-45f047eb-5a56-4231-abb9-b09b5de10c3c',
  companyId: process.env.GHL_COMPANY_ID || 'd8zUt0YHNNBNhakhzJxS',
  locationId: process.env.GHL_LOCATION_ID || 'UieaWEUbKDNaOwxSd9gQ',
  version: '2021-07-28',
};

interface GHLResponse<T> {
  data?: T;
  location?: T;
  locations?: T[];
  message?: string;
  statusCode?: number;
  traceId?: string;
}

async function ghlRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
  } = {}
): Promise<GHLResponse<T>> {
  const { method = 'GET', body, params } = options;

  const url = new URL(`${GHL_CONFIG.baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${GHL_CONFIG.pitToken}`,
    'Accept': 'application/json',
    'Version': GHL_CONFIG.version,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
}

interface GHLLocation {
  id: string;
  companyId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  website: string;
  timezone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  logoUrl: string;
  domain: string;
  currency: string;
  dateAdded: string;
  dateUpdated: string;
  permissions: Record<string, boolean>;
  business: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    website: string;
    email: string;
    logoUrl: string;
  };
  social: Record<string, string>;
}

export const ghlApi = {
  /** List all sub-accounts (locations) in the agency */
  async listLocations(): Promise<GHLLocation[]> {
    const res = await ghlRequest<GHLLocation[]>('/locations/search');
    return res.locations || [];
  },

  /** Get a specific sub-account by ID */
  async getLocation(locationId?: string): Promise<GHLLocation | null> {
    const id = locationId || GHL_CONFIG.locationId;
    const res = await ghlRequest<GHLLocation>(`/locations/${id}`);
    return res.location || null;
  },

  /** Update sub-account information */
  async updateLocation(
    data: {
      name?: string;
      website?: string;
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      domain?: string;
      phone?: string;
      email?: string;
    },
    locationId?: string
  ): Promise<GHLLocation | null> {
    const id = locationId || GHL_CONFIG.locationId;
    const res = await ghlRequest<GHLLocation>(`/locations/${id}`, {
      method: 'PUT',
      body: data,
    });
    return res.location || null;
  },

  /** Get the configured company ID */
  get companyId(): string {
    return GHL_CONFIG.companyId;
  },

  /** Get the configured location ID (SC Enterprises) */
  get locationId(): string {
    return GHL_CONFIG.locationId;
  },

  /** Get the config for debugging */
  get config() {
    return {
      baseUrl: GHL_CONFIG.baseUrl,
      companyId: GHL_CONFIG.companyId,
      locationId: GHL_CONFIG.locationId,
      version: GHL_CONFIG.version,
    };
  },
};

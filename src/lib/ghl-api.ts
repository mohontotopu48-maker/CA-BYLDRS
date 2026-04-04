/**
 * GoHighLevel (GHL) API Helper
 * =============================
 * Server-side GHL API wrapper using Private Integration Token (PIT).
 *
 * IMPORTANT: The current PIT token has LIMITED scopes (locations only).
 * To enable contact creation, pipelines, tags, etc., regenerate the PIT
 * in GHL Settings → Private Integrations with these scopes:
 *   - contacts.readwrite
 *   - calendars.readonly
 *   - pipelines.readonly
 *   - tags.readonly
 *   - workflows.readonly
 *
 * Usage (backend only):
 *   import { ghlApi } from '@/lib/ghl-api';
 *   const location = await ghlApi.getLocation();
 *   const contact = await ghlApi.createContact({ firstName: 'John', email: 'john@test.com' });
 */

const GHL_CONFIG = {
  baseUrl: 'https://services.leadconnectorhq.com',
  pitToken: process.env.GHL_PIT_TOKEN || '',
  companyId: process.env.GHL_COMPANY_ID || 'd8zUt0YHNNBNhakhzJxS',
  locationId: process.env.GHL_LOCATION_ID || 'UieaWEUbKDNaOwxSd9gQ',
  version: '2021-07-28',
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface GHLContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  locationId?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  dateAdded?: string;
  dateUpdated?: string;
  customFields?: Array<{ id: string; field_value: string }>;
}

interface GHLOpportunity {
  id?: string;
  contactId?: string;
  pipelineId?: string;
  pipelineStageId?: string;
  title?: string;
  name?: string;
  monetaryValue?: number;
  status?: string;
  assignedTo?: string;
}

interface GHLPipeline {
  id: string;
  name: string;
  stages: Array<{ id: string; name: string }>;
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

interface GHLCalendarService {
  id: string;
  name: string;
  locationId: string;
  calendarId: string;
  description?: string;
  isActive: boolean;
  meetingDuration: number;
}

interface GHLTag {
  id: string;
  name: string;
}

// ─── Core Request Helper ────────────────────────────────────────────────────

interface GHLRequestOptions {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface GHLResponse<T> {
  data?: T;
  location?: T;
  locations?: T[];
  contacts?: T[];
  contact?: T;
  tags?: T[];
  pipelines?: T[];
  calendars?: T[];
  calendarServices?: T[];
  message?: string;
  statusCode?: number;
  traceId?: string;
}

async function ghlRequest<T>(
  endpoint: string,
  options: GHLRequestOptions = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  const { method = 'GET', body, headers: extraHeaders, params } = options;

  if (!GHL_CONFIG.pitToken) {
    return { data: null, error: 'GHL_PIT_TOKEN not configured', status: 401 };
  }

  const url = new URL(`${GHL_CONFIG.baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${GHL_CONFIG.pitToken}`,
    Accept: 'application/json',
    Version: GHL_CONFIG.version,
    ...extraHeaders,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: data.message || `HTTP ${res.status}`,
        status: res.status,
      };
    }

    return { data: data as T, error: null, status: res.status };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Network error',
      status: 0,
    };
  }
}

// ─── Scope Detection ────────────────────────────────────────────────────────

type GHLScopeStatus = 'available' | 'unauthorized' | 'unknown';

interface GHLScopeReport {
  contacts: GHLScopeStatus;
  calendars: GHLScopeStatus;
  pipelines: GHLScopeStatus;
  tags: GHLScopeStatus;
  workflows: GHLScopeStatus;
  locations: GHLScopeStatus;
}

const scopeCache: { report: GHLScopeReport | null; timestamp: number } = {
  report: null,
  timestamp: 0,
};

async function checkScopes(): Promise<GHLScopeReport> {
  // Cache for 5 minutes
  if (scopeCache.report && Date.now() - scopeCache.timestamp < 300000) {
    return scopeCache.report;
  }

  const report: GHLScopeReport = {
    contacts: 'unknown',
    calendars: 'unknown',
    pipelines: 'unknown',
    tags: 'unknown',
    workflows: 'unknown',
    locations: 'unknown',
  };

  // Test each scope with lightweight requests
  const checks: Array<{ key: keyof GHLScopeReport; endpoint: string; method?: string }> = [
    { key: 'locations', endpoint: `/locations/${GHL_CONFIG.locationId}` },
    { key: 'contacts', endpoint: '/contacts/', method: 'POST' },
    { key: 'calendars', endpoint: '/calendars/services/' },
    { key: 'pipelines', endpoint: '/pipelines/' },
    { key: 'tags', endpoint: '/tags/' },
    { key: 'workflows', endpoint: '/workflows/' },
  ];

  const results = await Promise.allSettled(
    checks.map(async ({ key, endpoint, method }) => {
      if (method === 'POST') {
        // For POST endpoints, we just want to check auth, not create data
        // Use GET with a unique path to trigger a scope check
        const res = await ghlRequest(endpoint, { method: 'GET' });
        if (res.error?.includes('not authorized')) return 'unauthorized';
        if (res.status === 404 || res.status === 200) return 'available';
        return 'unknown';
      }
      const res = await ghlRequest(endpoint);
      if (res.error?.includes('not authorized')) return 'unauthorized';
      if (res.data) return 'available';
      if (res.status === 404) return 'available'; // endpoint exists but maybe empty
      return 'unknown';
    })
  );

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      report[checks[i].key] = result.value;
    }
  });

  scopeCache.report = report;
  scopeCache.timestamp = Date.now();
  return report;
}

// ─── Exported API ────────────────────────────────────────────────────────────

export const ghlApi = {
  // ─── Location / Sub-Account ────────────────────────────────────────────

  /** Get the configured sub-account info */
  async getLocation(locationId?: string) {
    const id = locationId || GHL_CONFIG.locationId;
    const res = await ghlRequest<{ location: GHLLocation }>(`/locations/${id}`);
    return res.data?.location || null;
  },

  /** Update sub-account info */
  async updateLocation(
    data: {
      name?: string;
      website?: string;
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      phone?: string;
      email?: string;
    },
    locationId?: string
  ) {
    const id = locationId || GHL_CONFIG.locationId;
    const res = await ghlRequest<GHLLocation>(`/locations/${id}`, {
      method: 'PUT',
      body: data,
    });
    return res.data || null;
  },

  // ─── Contacts ──────────────────────────────────────────────────────────

  /**
   * Create a contact in GHL
   * Requires PIT scope: contacts.readwrite
   */
  async createContact(contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    tags?: string[];
    source?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    customFields?: Array<{ id: string; field_value: string }>;
  }): Promise<{ contact: GHLContact | null; error: string | null }> {
    const res = await ghlRequest<{ contact: GHLContact }>('/contacts/', {
      method: 'POST',
      body: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        name: `${contact.firstName} ${contact.lastName}`.trim(),
        locationId: GHL_CONFIG.locationId,
        tags: contact.tags || ['website-lead'],
        source: contact.source || 'CA BYLDRS Website',
        city: contact.city,
        state: contact.state,
        postalCode: contact.postalCode,
        country: contact.country,
        ...(contact.customFields?.length
          ? { customFields: contact.customFields }
          : {}),
      },
    });

    return {
      contact: res.data?.contact || null,
      error: res.error,
    };
  },

  /**
   * Search for a contact by email
   * Requires PIT scope: contacts.readonly
   */
  async searchContactByEmail(email: string) {
    const res = await ghlRequest<{ contacts: GHLContact[] }>(
      '/contacts/',
      {
        params: { query: email, locationId: GHL_CONFIG.locationId },
      }
    );
    return res.data?.contacts || [];
  },

  /**
   * Update an existing contact
   * Requires PIT scope: contacts.readwrite
   */
  async updateContact(contactId: string, data: Partial<GHLContact>) {
    const res = await ghlRequest<{ contact: GHLContact }>(
      `/contacts/${contactId}`,
      { method: 'PUT', body: data }
    );
    return res.data?.contact || null;
  },

  // ─── Pipelines & Opportunities ─────────────────────────────────────────

  /**
   * Get all pipelines for the sub-account
   * Requires PIT scope: pipelines.readonly
   */
  async getPipelines(): Promise<GHLPipeline[]> {
    const res = await ghlRequest<{ pipelines: GHLPipeline[] }>(
      '/pipelines/',
      {
        headers: { LocationId: GHL_CONFIG.locationId },
      }
    );
    return res.data?.pipelines || [];
  },

  /**
   * Create an opportunity in a pipeline
   * Requires PIT scope: opportunities.readwrite
   */
  async createOpportunity(opportunity: {
    contactId: string;
    pipelineId: string;
    pipelineStageId: string;
    title: string;
    monetaryValue?: number;
    assignedTo?: string;
  }): Promise<{ opportunity: GHLOpportunity | null; error: string | null }> {
    const res = await ghlRequest<{ opportunity: GHLOpportunity }>(
      '/opportunities/',
      {
        method: 'POST',
        headers: { LocationId: GHL_CONFIG.locationId },
        body: {
          ...opportunity,
          locationId: GHL_CONFIG.locationId,
          status: 'open',
        },
      }
    );
    return {
      opportunity: res.data?.opportunity || null,
      error: res.error,
    };
  },

  // ─── Tags ──────────────────────────────────────────────────────────────

  /**
   * Get all tags
   * Requires PIT scope: tags.readonly
   */
  async getTags(): Promise<GHLTag[]> {
    const res = await ghlRequest<{ tags: GHLTag[] }>('/tags/', {
      headers: { LocationId: GHL_CONFIG.locationId },
    });
    return res.data?.tags || [];
  },

  /**
   * Add a tag to a contact
   * Requires PIT scope: contacts.readwrite
   */
  async addTagToContact(contactId: string, tag: string) {
    const res = await ghlRequest<{ contact: GHLContact }>(
      `/contacts/${contactId}/tags`,
      {
        method: 'POST',
        body: { tags: [tag] },
      }
    );
    return res.data?.contact || null;
  },

  // ─── Calendars ─────────────────────────────────────────────────────────

  /**
   * Get calendar services
   * Requires PIT scope: calendars.readonly
   */
  async getCalendarServices(): Promise<GHLCalendarService[]> {
    const res = await ghlRequest<{ calendarServices: GHLCalendarService[] }>(
      '/calendars/services/',
      {
        headers: { LocationId: GHL_CONFIG.locationId },
      }
    );
    return res.data?.calendarServices || [];
  },

  // ─── Utility / Diagnostics ─────────────────────────────────────────────

  /** Check GHL API connection and report available scopes */
  async getStatus() {
    const [location, scopes] = await Promise.all([
      this.getLocation(),
      checkScopes(),
    ]);

    return {
      connected: !!location,
      location: location
        ? {
            id: location.id,
            name: location.name,
            email: location.email,
            phone: location.phone,
            website: location.website,
            domain: location.domain,
            city: location.city,
            state: location.state,
          }
        : null,
      scopes,
      pitConfigured: !!GHL_CONFIG.pitToken,
    };
  },

  /** Get configured IDs */
  get companyId(): string {
    return GHL_CONFIG.companyId;
  },

  get locationId(): string {
    return GHL_CONFIG.locationId;
  },

  get config() {
    return {
      baseUrl: GHL_CONFIG.baseUrl,
      companyId: GHL_CONFIG.companyId,
      locationId: GHL_CONFIG.locationId,
      version: GHL_CONFIG.version,
      pitConfigured: !!GHL_CONFIG.pitToken,
    };
  },
};

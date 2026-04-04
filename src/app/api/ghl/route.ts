import { NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_COMPANY_ID = process.env.GHL_COMPANY_ID;

const GHL_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  Version: '2021-07-28',
};

function authHeaders(token?: string): Record<string, string> {
  const t = token ?? GHL_PIT;
  if (!t) return GHL_HEADERS;
  return { ...GHL_HEADERS, Authorization: `Bearer ${t}` };
}

// ─── Helper: Quick scope test ───────────────────────────────────────────────

async function testScope(endpoint: string): Promise<'available' | 'unauthorized' | 'error'> {
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com${endpoint}`,
      { headers: authHeaders() }
    );
    const data = await res.json().catch(() => null);
    if (res.ok) return 'available';
    if (data?.message?.includes('not authorized') || res.status === 401) return 'unauthorized';
    if (data?.message?.includes('LocationId')) return 'available'; // needs LocationId but endpoint works
    if (res.status === 404) return 'available'; // exists, maybe empty
    return 'error';
  } catch {
    return 'error';
  }
}

// ─── GET /api/ghl - Full GHL status check ───────────────────────────────────

export async function GET() {
  try {
    if (!GHL_PIT) {
      return NextResponse.json({
        status: 'not_configured',
        message: 'GHL API key is not set',
        actionNeeded: 'Add GHL_API_KEY to your .env.local',
      });
    }

    // 1. Get location info
    let location: Record<string, unknown> | null = null;
    try {
      const res = await fetch(
        `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
        { headers: authHeaders() }
      );
      const data = await res.json();
      if (res.ok && data.location) {
        const loc = data.location;
        location = {
          id: loc.id,
          name: loc.name,
          email: loc.email,
          phone: loc.phone,
          website: loc.website,
          domain: loc.domain || '(not set)',
          city: loc.city,
          state: loc.state,
          postalCode: loc.postalCode,
          address: loc.address,
          logoUrl: loc.logoUrl,
        };
      }
    } catch {
      // location check failed
    }

    // 2. Test API scopes in parallel
    const [contacts, calendars, pipelines, tags, workflows, locationsScope] = await Promise.all([
      testScope(`/contacts/?limit=1&locationId=${GHL_LOCATION_ID}`),
      testScope(`/calendars/services/?locationId=${GHL_LOCATION_ID}`),
      testScope(`/pipelines/?locationId=${GHL_LOCATION_ID}`),
      testScope(`/tags/?locationId=${GHL_LOCATION_ID}`),
      testScope(`/workflows/?locationId=${GHL_LOCATION_ID}`),
      testScope(`/locations/${GHL_LOCATION_ID}`),
    ]);

    // 3. Build recommendations
    const unavailableScopes: string[] = [];
    const scopeMap: Record<string, { key: string; name: string; status: string }> = {
      contacts: { key: 'contacts', name: 'Contacts (Lead Capture)', status: contacts },
      calendars: { key: 'calendars', name: 'Calendars (Booking)', status: calendars },
      pipelines: { key: 'pipelines', name: 'Pipelines (CRM)', status: pipelines },
      tags: { key: 'tags', name: 'Tags', status: tags },
      workflows: { key: 'workflows', name: 'Workflows (Automations)', status: workflows },
      locations: { key: 'locations', name: 'Locations (Profile)', status: locationsScope },
    };

    const recommendations: string[] = [];
    for (const [, info] of Object.entries(scopeMap)) {
      if (info.status === 'unauthorized') {
        unavailableScopes.push(info.name);
      }
    }

    if (unavailableScopes.length > 0) {
      recommendations.push(
        'To enable all features, regenerate your PIT token in GHL Settings → Private Integrations with these scopes: contacts.readwrite, calendars.readonly, pipelines.readonly, tags.readonly, workflows.readonly'
      );
    }

    if (!location?.domain || location.domain === '(not set)') {
      recommendations.push(
        'Custom domain not set. Go to GHL Settings → Domains to connect hello.nxlbyldr.com (CNAME to brand.ludicrous.cloud, proxy OFF)'
      );
    }

    return NextResponse.json({
      status: location ? 'connected' : 'error',
      pitConfigured: true,
      location,
      scopes: Object.fromEntries(
        Object.entries(scopeMap).map(([key, val]) => [key, val.status])
      ),
      unavailableFeatures: unavailableScopes.length > 0 ? unavailableScopes : undefined,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      config: {
        companyId: GHL_COMPANY_ID,
        locationId: GHL_LOCATION_ID,
        websiteUrl: 'https://cabyldrs.com',
        trackingId: 'tk_10e022fb5c9f4ebea7a518b61fa81171',
        bookingId: '4TnklQgWAtDSES0CaoDc',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ─── POST /api/ghl - Update GHL location info ───────────────────────────────

export async function POST(request: Request) {
  try {
    if (!GHL_PIT) {
      return NextResponse.json(
        { status: 'error', message: 'GHL API key not configured' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'update-info') {
      const { name, website, address, city, state, postalCode, country, phone, email } = body;
      const updateData: Record<string, string> = {};
      if (name) updateData.name = name;
      if (website) updateData.website = website;
      if (address) updateData.address = address;
      if (city) updateData.city = city;
      if (state) updateData.state = state;
      if (postalCode) updateData.postalCode = postalCode;
      if (country) updateData.country = country;
      if (phone) updateData.phone = phone;
      if (email) updateData.email = email;

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { status: 'error', message: 'No fields to update' },
          { status: 400 }
        );
      }

      const res = await fetch(
        `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
        {
          method: 'PUT',
          headers: { ...authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        return NextResponse.json({
          status: 'success',
          message: 'Location updated successfully',
          location: data.location,
        });
      }
      return NextResponse.json({
        status: 'error',
        message: data.message || 'Failed to update',
        statusCode: res.status,
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid action. Supported: "update-info". Note: Custom domain must be set via GHL UI (Settings → Domains).',
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

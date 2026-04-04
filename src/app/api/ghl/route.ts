import { NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_PIT_TOKEN || 'pit-45f047eb-5a56-4231-abb9-b09b5de10c3c';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'UieaWEUbKDNaOwxSd9gQ';

const GHL_HEADERS = {
  'Authorization': `Bearer ${GHL_PIT}`,
  'Accept': 'application/json',
  'Version': '2021-07-28',
};

// GET /api/ghl - Check GHL connection and location info
export async function GET() {
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
      { headers: GHL_HEADERS }
    );

    const data = await res.json();
    const location = data.location || data;

    return NextResponse.json({
      status: 'connected',
      location: {
        id: location.id,
        name: location.name,
        website: location.website,
        domain: location.domain,
        email: location.email,
        phone: location.phone,
        address: location.address,
        city: location.city,
        state: location.state,
        postalCode: location.postalCode,
        country: location.country,
        logoUrl: location.logoUrl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/ghl - Set custom domain or update location info
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain, action } = body;

    if (action === 'set-domain' && domain) {
      const res = await fetch(
        `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
        {
          method: 'PUT',
          headers: { ...GHL_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        return NextResponse.json({
          status: 'success',
          message: `Domain ${domain} set successfully`,
          location: data.location,
        });
      } else {
        return NextResponse.json({
          status: 'error',
          message: data.message || data.response?.message || 'Failed to set domain',
          statusCode: res.status,
        });
      }
    }

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

      const res = await fetch(
        `https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`,
        {
          method: 'PUT',
          headers: { ...GHL_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        return NextResponse.json({
          status: 'success',
          message: 'Location info updated',
          location: data.location,
        });
      } else {
        return NextResponse.json({
          status: 'error',
          message: data.message || 'Failed to update',
        });
      }
    }

    return NextResponse.json(
      { status: 'error', message: 'Invalid action. Use "set-domain" or "update-info".' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

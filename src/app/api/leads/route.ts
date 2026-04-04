import { NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

/**
 * POST /api/leads - Capture a homeowner service request
 *
 * Priority:
 * 1. Create contact in GHL via API (requires contacts.readwrite scope)
 * 2. Save to local DB (fallback for when GHL scope is unavailable)
 * 3. GHL client-side tracking fires independently from the form component
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, serviceType, county, city, message, urgency } = body;

    // Validation
    if (!fullName || !email || !phone || !serviceType || !county) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, phone, serviceType, county' },
        { status: 400 }
      );
    }

    const nameParts = String(fullName).trim().split(/\s+/);
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.slice(1).join(' ') || 'Lead';
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();

    // ─── Attempt 1: Create GHL Contact via API ────────────────────────
    let ghlContactCreated = false;
    if (GHL_PIT) {
      try {
        const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${GHL_PIT}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            name: String(fullName).trim(),
            email: cleanEmail,
            phone: cleanPhone,
            locationId: GHL_LOCATION_ID,
            tags: ['website-lead', `service:${String(serviceType)}`, `county:${String(county)}`],
            source: 'CA BYLDRS Website',
            city: city ? String(city).trim() : undefined,
            state: 'CA',
            country: 'US',
            postalCode: '92835',
          }),
        });

        if (ghlRes.ok) {
          ghlContactCreated = true;
          console.log('✅ Lead created in GHL:', { fullName, email, serviceType });
        } else {
          const errData = await ghlRes.json().catch(() => ({}));
          console.warn('⚠️ GHL contact creation failed (scope may be limited):', errData.message || ghlRes.status);
        }
      } catch (ghlErr) {
        console.warn('⚠️ GHL API call failed:', ghlErr instanceof Error ? ghlErr.message : ghlErr);
      }
    }

    // ─── Attempt 2: Save to local DB (fallback/storage) ────────────────
    let dbSaved = false;
    try {
      const { db } = await import('@/lib/db');
      await db.lead.create({
        data: {
          fullName: String(fullName).trim(),
          email: cleanEmail,
          phone: cleanPhone,
          serviceType: String(serviceType),
          county: String(county),
          city: city ? String(city).trim() : null,
          message: message ? String(message).trim() : null,
          urgency: urgency || 'routine',
        },
      });
      dbSaved = true;
    } catch (dbError) {
      console.log('ℹ️ Local DB unavailable (serverless):', { fullName, email });
    }

    // ─── Response ─────────────────────────────────────────────────────
    const methods: string[] = [];
    if (ghlContactCreated) methods.push('GHL Contact API');
    if (dbSaved) methods.push('Local DB');
    if (methods.length === 0) methods.push('GHL Client Tracking (form fires trackFormSubmit)');

    return NextResponse.json(
      {
        success: true,
        message: 'Service request submitted successfully!',
        captureMethod: methods.join(' + '),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

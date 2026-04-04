import { NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

/**
 * POST /api/partners - Capture a contractor/partner application
 *
 * Priority:
 * 1. Create contact in GHL via API (requires contacts.readwrite scope)
 * 2. Save to local DB (fallback for when GHL scope is unavailable)
 * 3. GHL client-side tracking fires independently from the form component
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      serviceCategories,
      licenseNumber,
      serviceAreas,
      yearsInBusiness,
      notes,
    } = body;

    // Validation
    if (!companyName || !contactName || !email || !phone || !serviceCategories || !serviceAreas) {
      return NextResponse.json(
        { error: 'Missing required fields: companyName, contactName, email, phone, serviceCategories, serviceAreas' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const nameParts = String(contactName).trim().split(/\s+/);
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.slice(1).join(' ') || 'Contact';
    const servicesStr = Array.isArray(serviceCategories)
      ? serviceCategories.join(', ')
      : String(serviceCategories);
    const areasStr = Array.isArray(serviceAreas)
      ? serviceAreas.join(', ')
      : String(serviceAreas);

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
            name: String(contactName).trim(),
            email: cleanEmail,
            phone: cleanPhone,
            locationId: GHL_LOCATION_ID,
            tags: ['partner-application', 'contractor', `services:${servicesStr}`],
            source: 'CA BYLDRS Partner Page',
            country: 'US',
            state: 'CA',
          }),
        });

        if (ghlRes.ok) {
          ghlContactCreated = true;
          console.log('✅ Partner contact created in GHL:', { companyName, email });
        } else {
          const errData = await ghlRes.json().catch(() => ({}));
          console.warn('⚠️ GHL partner contact creation failed:', errData.message || ghlRes.status);
        }
      } catch (ghlErr) {
        console.warn('⚠️ GHL API call failed:', ghlErr instanceof Error ? ghlErr.message : ghlErr);
      }
    }

    // ─── Attempt 2: Save to local DB (fallback/storage) ────────────────
    let dbSaved = false;
    try {
      const { db } = await import('@/lib/db');
      await db.partner.create({
        data: {
          companyName: String(companyName).trim(),
          contactName: String(contactName).trim(),
          email: cleanEmail,
          phone: cleanPhone,
          serviceCategories: servicesStr,
          licenseNumber: licenseNumber ? String(licenseNumber).trim() : null,
          serviceAreas: areasStr,
          yearsInBusiness: yearsInBusiness || null,
          notes: notes ? String(notes).trim() : null,
        },
      });
      dbSaved = true;
    } catch (dbError) {
      console.log('ℹ️ Local DB unavailable (serverless):', { companyName, email });
    }

    // ─── Response ─────────────────────────────────────────────────────
    const methods: string[] = [];
    if (ghlContactCreated) methods.push('GHL Contact API');
    if (dbSaved) methods.push('Local DB');
    if (methods.length === 0) methods.push('GHL Client Tracking (form fires trackFormSubmit)');

    return NextResponse.json(
      {
        success: true,
        message: 'Partner application submitted successfully!',
        captureMethod: methods.join(' + '),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Partner submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

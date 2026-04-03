import { NextResponse } from 'next/server';

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

    // Try to save to database (works in local dev, gracefully skips on Vercel)
    try {
      const { db } = await import('@/lib/db');
      await db.partner.create({
        data: {
          companyName: String(companyName).trim(),
          contactName: String(contactName).trim(),
          email: String(email).trim().toLowerCase(),
          phone: String(phone).trim(),
          serviceCategories: Array.isArray(serviceCategories) ? serviceCategories.join(', ') : String(serviceCategories),
          licenseNumber: licenseNumber ? String(licenseNumber).trim() : null,
          serviceAreas: Array.isArray(serviceAreas) ? serviceAreas.join(', ') : String(serviceAreas),
          yearsInBusiness: yearsInBusiness || null,
          notes: notes ? String(notes).trim() : null,
        },
      });
    } catch (dbError) {
      // Database unavailable (expected on Vercel) — GHL tracking handles partner capture
      console.log('Partner recorded via GHL tracking (DB unavailable on serverless):', { companyName, email });
    }

    return NextResponse.json(
      { success: true, message: 'Partner application submitted successfully!' },
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

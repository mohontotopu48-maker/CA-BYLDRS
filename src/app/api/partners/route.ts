import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    const partner = await db.partner.create({
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

    return NextResponse.json(
      { success: true, id: partner.id, message: 'Partner application submitted successfully!' },
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

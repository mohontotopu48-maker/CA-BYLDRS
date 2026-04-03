import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    const lead = await db.lead.create({
      data: {
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        serviceType: String(serviceType),
        county: String(county),
        city: city ? String(city).trim() : null,
        message: message ? String(message).trim() : null,
        urgency: urgency || 'routine',
      },
    });

    return NextResponse.json(
      { success: true, id: lead.id, message: 'Service request submitted successfully!' },
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

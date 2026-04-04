import { NextResponse } from 'next/server';

/**
 * GHL Webhook Endpoint
 * ====================
 * Receive real-time events from GoHighLevel.
 *
 * Setup in GHL:
 *   1. Go to Settings → Integrations → Webhooks
 *   2. Add webhook URL: https://ca-byldrs.vercel.app/api/webhooks/ghl
 *   3. Subscribe to events: contact.created, contact.updated, form.submitted, appointment.booked
 *
 * Supported events:
 *   - contact.created   → New lead captured
 *   - contact.updated   → Lead information updated
 *   - form.submitted    → Form submission from GHL funnel
 *   - appointment.booked → Calendar booking completed
 *   - pipeline.stage.changed → Opportunity stage change
 */

interface GHLWebhookEvent {
  event: string;
  contact?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    tags?: string[];
    source?: string;
    dateAdded?: string;
  };
  appointment?: {
    id: string;
    contactId: string;
    calendarId: string;
    startTime: string;
    endTime: string;
    title?: string;
    status?: string;
  };
  form?: {
    id: string;
    name?: string;
    contactId: string;
    fields?: Array<{ name: string; value: string }>;
  };
  opportunity?: {
    id: string;
    contactId: string;
    pipelineId: string;
    pipelineStageId: string;
    title: string;
    status: string;
    monetaryValue?: number;
  };
  timestamp?: string;
}

export async function POST(request: Request) {
  try {
    const body: GHLWebhookEvent = await request.json();
    const { event } = body;

    // Log the webhook event for monitoring
    console.log(`🔔 GHL Webhook: ${event}`, {
      contactId: body.contact?.id,
      email: body.contact?.email,
      timestamp: body.timestamp,
    });

    // Handle different event types
    switch (event) {
      case 'contact.created':
        console.log(`📬 New contact created: ${body.contact?.firstName} ${body.contact?.lastName} (${body.contact?.email})`);
        console.log(`   Source: ${body.contact?.source || 'unknown'}, Tags: ${body.contact?.tags?.join(', ') || 'none'}`);
        break;

      case 'contact.updated':
        console.log(`✏️ Contact updated: ${body.contact?.id} (${body.contact?.email})`);
        break;

      case 'form.submitted':
        console.log(`📝 Form submitted: ${body.form?.name || body.form?.id}`);
        if (body.form?.fields?.length) {
          console.log(`   Fields: ${body.form.fields.map(f => `${f.name}=${f.value}`).join(', ')}`);
        }
        break;

      case 'appointment.booked':
        console.log(`📅 Appointment booked: ${body.appointment?.title || body.appointment?.id}`);
        console.log(`   Time: ${body.appointment?.startTime} → ${body.appointment?.endTime}`);
        break;

      case 'pipeline.stage.changed':
        console.log(`🔄 Pipeline stage changed: ${body.opportunity?.title} → ${body.opportunity?.status}`);
        if (body.opportunity?.monetaryValue) {
          console.log(`   Value: $${body.opportunity.monetaryValue}`);
        }
        break;

      default:
        console.log(`❓ Unhandled GHL event: ${event}`);
    }

    // Return 200 to acknowledge receipt (GHL expects quick responses)
    return NextResponse.json({ received: true, event });
  } catch (error) {
    console.error('GHL Webhook error:', error);
    // Still return 200 so GHL doesn't retry
    return NextResponse.json(
      { received: true, error: 'Processing error' },
      { status: 200 }
    );
  }
}

// GET /api/webhooks/ghl - Webhook status/health check
export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/ghl',
    supportedEvents: [
      'contact.created',
      'contact.updated',
      'form.submitted',
      'appointment.booked',
      'pipeline.stage.changed',
    ],
    setupInstructions: {
      step1: 'Go to GHL Settings → Integrations → Webhooks',
      step2: 'Add webhook URL: https://ca-byldrs.vercel.app/api/webhooks/ghl',
      step3: 'Subscribe to events listed above',
    },
    note: 'GHL tracking script is also active site-wide (tk_10e022fb5c9f4ebea7a518b61fa81171)',
  });
}

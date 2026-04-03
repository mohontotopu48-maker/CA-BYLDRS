/**
 * GoHighLevel Tracking Utility
 * 
 * Provides functions to track page visits, form submissions, 
 * phone clicks, email clicks, and button interactions
 * via the GoHighLevel external tracking script.
 * 
 * The GHL script automatically tracks page views for real URLs.
 * Since we use client-side SPA routing (no URL changes), we fire
 * custom events that GHL picks up via its global event listeners.
 */

declare global {
  interface Window {
    ghl?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
  }
}

/* Fire a GHL track event if the SDK is loaded */
function ghlTrack(event: string, data?: Record<string, unknown>) {
  try {
    // Push to GHL's dataLayer if available
    if (typeof window !== 'undefined') {
      // Standard GHL tracking approach
      (window as unknown as Record<string, unknown>).__ghlTrack = event;
      
      // Also try the global function
      const w = window as Window;
      if (w.ghl?.track) {
        w.ghl.track(event, data);
      }

      // Dispatch custom event for any additional listeners
      window.dispatchEvent(
        new CustomEvent('ghl:event', { detail: { event, data, timestamp: Date.now() } })
      );
    }
  } catch {
    // Silently fail — tracking should never break the app
  }
}

/* ── Page Visit Tracking ── */
export function trackPageView(pageName: string, pageTitle: string) {
  ghlTrack('page_view', {
    page: pageName,
    title: pageTitle,
    url: `${window.location.origin}/${pageName}`,
    referrer: document.referrer,
  });

  // Also update document title for GHL's automatic tracking
  if (typeof document !== 'undefined') {
    document.title = `${pageTitle} | CA BYLDRS`;
  }
}

/* ── Form Submission Tracking ── */
export function trackFormSubmit(formType: 'lead' | 'partner' | 'booking', data?: Record<string, string>) {
  ghlTrack('form_submit', {
    form_type: formType,
    ...data,
  });
}

/* ── Phone Call Tracking ── */
export function trackPhoneClick(phoneNumber: string, source?: string) {
  ghlTrack('phone_click', {
    phone: phoneNumber,
    source: source || 'unknown',
  });
}

/* ── Email Click Tracking ── */
export function trackEmailClick(email: string, source?: string) {
  ghlTrack('email_click', {
    email: email,
    source: source || 'unknown',
  });
}

/* ── Button/CTA Click Tracking ── */
export function trackCTAClick(ctaName: string, destination?: string) {
  ghlTrack('cta_click', {
    cta: ctaName,
    destination: destination || 'unknown',
  });
}

/* ── WhatsApp Click Tracking ── */
export function trackWhatsAppClick(source?: string) {
  ghlTrack('whatsapp_click', {
    source: source || 'unknown',
  });
}

/* ── Service Selection Tracking ── */
export function trackServiceView(serviceName: string, serviceSlug: string) {
  ghlTrack('service_view', {
    service_name: serviceName,
    service_slug: serviceSlug,
  });
}

/* ── County/Location View Tracking ── */
export function trackLocationView(countyName: string, countySlug: string) {
  ghlTrack('location_view', {
    county_name: countyName,
    county_slug: countySlug,
  });
}

/* ── Booking Calendar Tracking ── */
export function trackBookingView(source?: string) {
  ghlTrack('booking_view', {
    source: source || 'unknown',
  });
}

/* ── Emergency Page Tracking ── */
export function trackEmergencyView() {
  ghlTrack('emergency_view');
}

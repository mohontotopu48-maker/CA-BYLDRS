'use client';

import { Calendar, Shield, Zap, CheckCircle2, Phone, Mail, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { trackBookingView } from '@/lib/ghl-tracking';

export default function BookingCalendar() {
  const { navigate } = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Track booking view in GHL
  useEffect(() => {
    trackBookingView('homepage_booking_section');
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="booking-section" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0906] via-[#1a120b] to-[#0d0906]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4" />
            <span>Book Your Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f2f5] mb-4">
            Book Your Appointment
          </h2>
          <p className="text-lg text-[#9ba1a6] max-w-2xl mx-auto">
            Pick a date and time that works for you. We&apos;ll confirm and connect you with a verified professional.
          </p>
        </AnimatedSection>

        {/* Main Calendar Card */}
        <AnimatedSection delay={0.15}>
          <div className="relative">
            {/* Animated glow border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#FF6B00] via-[#FF9F1C] to-[#FF6B00] rounded-3xl opacity-30 blur-sm animate-pulse-glow" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF6B00] via-[#FF9F1C] to-[#FF6B00] rounded-3xl opacity-60" />

            <div className="relative bg-[#1a120b] rounded-3xl shadow-2xl shadow-[#FF6B00]/5 overflow-hidden">
              {/* Card header accent */}
              <div className="h-1.5 bg-gradient-to-r from-[#FF6B00] via-[#FF9F1C] to-[#FF6B00]" />

              <div className="p-4 sm:p-6 md:p-8">
                {/* Calendar heading inside card */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF6B00]/30">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f0f2f5]">Select Your Date & Time</h3>
                    <p className="text-sm text-[#9ba1a6]">Choose a convenient slot below</p>
                  </div>
                </div>

                {/* iframe booking calendar */}
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0d0906]">
                  <iframe
                    ref={iframeRef}
                    src="https://services.leadconnectorhq.com/widget/booking/4TnklQgWAtDSES0CaoDc"
                    style={{ width: '100%', minHeight: '620px', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    loading="lazy"
                    id="4TnklQgWAtDSES0CaoDc_1775250579603"
                    title="CA BYLDRS Booking Calendar"
                    allow="clipboard-write"
                  />
                </div>

                {/* Bottom note */}
                <div className="mt-6 p-4 bg-[#FF6B00]/10 rounded-xl border border-[#FF6B00]/20">
                  <p className="text-sm text-[#FF9F1C] text-center">
                    <strong>Note:</strong> After booking, our team will review your request and connect you with the best available professional in your area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Options Row */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <a
              href="tel:+15629440500"
              className="flex items-center gap-3 p-4 rounded-xl bg-[#1a120b] border border-white/[0.06] hover:border-[#FF6B00]/30 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                <Phone className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f0f2f5]">Call Us</p>
                <p className="text-sm text-[#9ba1a6]">+1 562-944-0500</p>
              </div>
            </a>

            <a
              href="mailto:hello@nxlbyldr.com"
              className="flex items-center gap-3 p-4 rounded-xl bg-[#1a120b] border border-white/[0.06] hover:border-[#FF6B00]/30 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f0f2f5]">Email Us</p>
                <p className="text-sm text-[#9ba1a6]">hello@nxlbyldr.com</p>
              </div>
            </a>

            <Button
              onClick={() => navigate('contact')}
              size="lg"
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF6B00] text-white font-bold py-4 text-base rounded-xl shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 cursor-pointer h-auto"
            >
              Request Service
              <ChevronRight className="size-5 ml-2" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

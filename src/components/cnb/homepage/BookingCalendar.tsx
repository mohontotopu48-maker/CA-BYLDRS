'use client';

import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { useEffect, useRef } from 'react';

export default function BookingCalendar() {
  const { navigate } = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Dynamically inject the booking form script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4" />
            <span>Book Your Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Schedule Your Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick a date and time that works for you. Our team will confirm your booking and connect you with a verified local professional.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-orange-500" />
              <span>No Commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-orange-500" />
              <span>Free Consultation</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Calendar Card */}
        <AnimatedSection delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-3xl opacity-20 blur-xl" />

            <div className="relative bg-card rounded-2xl md:rounded-3xl border border-orange-200/50 dark:border-orange-800/30 shadow-2xl shadow-orange-900/10 overflow-hidden">
              {/* Card header accent */}
              <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

              <div className="p-4 sm:p-6 md:p-8">
                {/* Calendar heading inside card */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Book Your Service Now</h3>
                    <p className="text-sm text-muted-foreground">Select your preferred date and time below</p>
                  </div>
                </div>

                {/* iframe booking calendar */}
                <div className="rounded-xl overflow-hidden border border-border bg-white">
                  <iframe
                    ref={iframeRef}
                    src="https://api.leadconnectorhq.com/widget/booking/4TnklQgWAtDSES0CaoDc"
                    style={{ width: '100%', minHeight: '620px', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    id="4TnklQgWAtDSES0CaoDc_1775250579603"
                    title="CA BYLDRS Booking Calendar"
                  />
                </div>

                {/* Bottom note */}
                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <p className="text-sm text-orange-700 dark:text-orange-300 text-center">
                    <strong>Note:</strong> After booking, our team will review your request and connect you with the best available professional in your area. You&apos;ll receive a confirmation within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

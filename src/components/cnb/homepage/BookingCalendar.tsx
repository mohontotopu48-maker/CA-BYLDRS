'use client';

import { Calendar, Clock, ArrowRight, Shield, Zap, CheckCircle2, Phone, Mail, ChevronRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const STEPS = [
  { num: 1, label: 'Choose Date', icon: Calendar, desc: 'Pick your preferred day' },
  { num: 2, label: 'Pick Time', icon: Clock, desc: 'Select a convenient slot' },
  { num: 3, label: 'Get Confirmed', icon: CheckCircle2, desc: 'We connect you fast' },
];

const TRUST_BADGES = [
  { icon: Zap, label: 'Instant Booking', desc: 'No waiting around' },
  { icon: Shield, label: 'No Fees', desc: 'Always free for homeowners' },
  { icon: CheckCircle2, label: 'Instant Confirmation', desc: 'Get matched right away' },
  { icon: CheckCircle2, label: 'Verified Pros', desc: 'Licensed & background-checked' },
];

export default function BookingCalendar() {
  const { navigate } = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    <section id="booking" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#FF7B00]/5 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#FF7B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#FF9F1C]/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#FF7B00]/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7B00]/10 text-[#FF7B00] text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4" />
            <span>Book Your Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Schedule Your Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick a date and time that works for you. Our team will confirm your booking and connect you with a verified local professional.
          </p>
        </AnimatedSection>

        {/* Step Indicators */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF7B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF7B00]/30">
                      <StepIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-bold text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                    <span className="sm:hidden text-sm font-bold text-foreground">{step.label}</span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <>
                      <ArrowRight className="h-5 w-5 text-[#FF7B00] mx-1 sm:mx-2 hidden sm:block" />
                      <div className="sm:hidden w-6 h-0.5 bg-[#FF7B00] mx-1" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Trust Badges */}
        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
            {TRUST_BADGES.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-xl glass-card hover:shadow-md transition-shadow"
                >
                  <BadgeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF7B00] shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{badge.label}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Main Content: Calendar + Contact Options */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Calendar Card */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Animated glow border */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-[#FF7B00] via-[#FF9F1C] to-[#FF7B00] rounded-3xl opacity-30 blur-sm animate-pulse-glow" />
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF7B00] via-[#FF9F1C] to-[#FF7B00] rounded-3xl opacity-60" />

              <div className="relative bg-card rounded-3xl shadow-2xl shadow-[#FF7B00]/5 overflow-hidden">
                {/* Card header accent */}
                <div className="h-1.5 bg-gradient-to-r from-[#FF7B00] via-[#FF9F1C] to-[#FF7B00]" />

                <div className="p-4 sm:p-6 md:p-8">
                  {/* Calendar heading inside card */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF7B00]/30">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Book Your Service Now</h3>
                      <p className="text-sm text-muted-foreground">Select your preferred date and time below</p>
                    </div>
                  </div>

                  {/* iframe booking calendar */}
                  <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#0f1117]">
                    <iframe
                      ref={iframeRef}
                      src="https://api.leadconnectorhq.com/widget/booking/4TnklQgWAtDSES0CaoDc"
                      style={{ width: '100%', minHeight: '620px', border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      loading="lazy"
                      id="4TnklQgWAtDSES0CaoDc_1775250579603"
                      title="CA BYLDRS Booking Calendar"
                      allow="clipboard-write"
                    />
                  </div>

                  {/* Bottom note */}
                  <div className="mt-6 p-4 bg-[#FF7B00]/10 rounded-xl">
                    <p className="text-sm text-[#FF9F1C] text-center">
                      <strong>Note:</strong> After booking, our team will review your request and connect you with the best available professional in your area. You&apos;ll receive a confirmation within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Sidebar */}
          <AnimatedSection delay={0.3} direction="right">
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Glowing CTA */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7B00] to-[#FF9F1C] rounded-2xl opacity-40 blur-md animate-pulse-glow" />
                <Button
                  onClick={() => navigate('contact')}
                  size="lg"
                  className="relative w-full bg-gradient-to-r from-[#FF7B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF7B00] text-white font-bold py-6 text-base rounded-2xl shadow-xl transition-all duration-300 cursor-pointer h-auto"
                >
                  Book Now
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              </div>

              {/* Phone Option */}
              <a
                href="tel:+15629440500"
                className="flex items-center gap-3 p-4 rounded-2xl glass-card hover:shadow-md hover:border-[#FF7B00]/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Call Us Directly</p>
                  <p className="text-sm text-muted-foreground">+1 (562) 944-0500</p>
                </div>
              </a>

              {/* Email Option */}
              <a
                href="mailto:hello@nxlbyldr.com"
                className="flex items-center gap-3 p-4 rounded-2xl glass-card hover:shadow-md hover:border-[#FF7B00]/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email Us</p>
                  <p className="text-sm text-muted-foreground">hello@nxlbyldr.com</p>
                </div>
              </a>

              {/* Quick Info */}
              <div className="p-4 rounded-2xl bg-[#FF7B00]/5 border border-[rgba(255,255,255,0.06)]">
                <p className="text-xs text-[#FF7B00] font-semibold uppercase tracking-wider mb-2">
                  Quick Info
                </p>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p>✓ Free consultation, no commitment</p>
                  <p>✓ 1-3 verified pros, not 5+</p>
                  <p>✓ Response within 24 hours</p>
                  <p>✓ Serving OC & LA County</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

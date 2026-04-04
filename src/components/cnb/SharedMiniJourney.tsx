'use client';

import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import {
  Search,
  ClipboardList,
  UserCheck,
  CalendarCheck,
  Shield,
  Zap,
  CheckCircle2,
  Phone,
  ArrowRight,
} from 'lucide-react';

interface JourneyStep {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

type JourneyType = 'customer' | 'contractor' | 'emergency';

const JOURNEYS: Record<JourneyType, JourneyStep[]> = {
  customer: [
    { icon: Search, title: 'Discover', subtitle: 'Find your service' },
    { icon: ClipboardList, title: 'Submit Request', subtitle: 'Quick form' },
    { icon: UserCheck, title: 'Get Matched', subtitle: '1-3 verified pros' },
    { icon: CalendarCheck, title: 'Book & Done', subtitle: 'Schedule & relax' },
  ],
  contractor: [
    { icon: Search, title: 'Apply', subtitle: 'Quick signup' },
    { icon: Shield, title: 'Get Verified', subtitle: 'License check' },
    { icon: Zap, title: 'Receive Leads', subtitle: 'Qualified jobs' },
    { icon: CheckCircle2, title: 'Deliver & Grow', subtitle: 'Build reviews' },
  ],
  emergency: [
    { icon: Phone, title: 'Call or Submit', subtitle: 'Reach us 24/7' },
    { icon: Zap, title: 'Instant Match', subtitle: 'Priority dispatch' },
    { icon: UserCheck, title: 'Pro Responds', subtitle: 'Within minutes' },
    { icon: CheckCircle2, title: 'Problem Solved', subtitle: 'Fast resolution' },
  ],
};

const LABELS: Record<JourneyType, { badge: string; title: string }> = {
  customer: { badge: 'For Homeowners', title: 'How It Works' },
  contractor: { badge: 'For Contractors', title: 'Partner Process' },
  emergency: { badge: 'Emergency', title: 'Emergency Process' },
};

interface SharedMiniJourneyProps {
  type?: JourneyType;
}

export default function SharedMiniJourney({ type = 'customer' }: SharedMiniJourneyProps) {
  const steps = JOURNEYS[type];
  const label = LABELS[type];

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B00]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-semibold mb-3">
            {type === 'emergency' ? (
              <Zap className="h-3.5 w-3.5" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            <span>{label.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {label.title}
          </h2>
        </AnimatedSection>

        {/* Horizontal Steps - Desktop */}
        <AnimatedSection delay={0.1}>
          <div className="hidden sm:flex items-center justify-center gap-0">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-40">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF6B00]/20 mb-3 group-hover:scale-110 transition-transform">
                      <StepIcon className="h-6 w-6 text-foreground" />
                    </div>
                    <p className="text-sm font-bold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex items-center mx-3 mb-5">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#FF6B00]/60 to-[#FF6B00] rounded-full" />
                      <ArrowRight className="h-4 w-4 text-[#FF6B00] -ml-1.5 -mr-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vertical Steps - Mobile */}
          <div className="sm:hidden flex flex-col items-center gap-0 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-[#FF6B00]/40 via-[#FF6B00] to-[#FF6B00]/80 rounded-full" />

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.title} className="flex items-start gap-4 w-full relative">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF6B00]/20">
                      <StepIcon className="h-6 w-6 text-foreground" />
                    </div>
                    {/* Connector dot */}
                    {!isLast && (
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF6B00]/60" />
                    )}
                  </div>
                  <div className="flex-1 pt-2 pb-6">
                    <p className="text-sm font-bold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

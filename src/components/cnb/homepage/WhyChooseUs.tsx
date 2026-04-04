'use client';

import {
  Shield,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';

const features = [
  {
    icon: Shield,
    title: 'No Shared Leads',
    description:
      'Your request goes to 1-3 pros, not sold to 5+ companies. You stay in control.',
  },
  {
    icon: ShieldCheck,
    title: 'Every Pro is Verified',
    description:
      'License, insurance, and background check required. No exceptions.',
  },
  {
    icon: MapPin,
    title: 'Local Experts Only',
    description:
      'Serving Orange County & Los Angeles County with professionals who know your area.',
  },
  {
    icon: CheckCircle2,
    title: "It's Always Free",
    description:
      'No fees, no credit card required. Submit a request and get matched — completely free.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[#0d0906]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Title + Description */}
          <AnimatedSection direction="left">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#FF6B00] mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f2f5] leading-tight mb-6">
              Why Choose CA BYLDRS?
            </h2>
            <p className="text-[#9ba1a6] text-lg leading-relaxed mb-8">
              We built CA BYLDRS on trust and transparency. Unlike other platforms, 
              we never sell your information. Every professional in our network is 
              vetted, licensed, and ready to deliver quality work.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20">
              <Shield className="h-8 w-8 text-[#FF6B00] shrink-0" />
              <div>
                <p className="font-semibold text-[#f0f2f5]">500+ Happy Homeowners</p>
                <p className="text-sm text-[#9ba1a6]">Trusted by families across Orange County & Los Angeles County</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Feature List */}
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {features.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-4 bg-[#1a120b] rounded-xl border border-white/[0.06] p-5 hover:border-[#FF6B00]/30 hover:shadow-lg hover:shadow-[#FF6B00]/5 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF6B00]/10 flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors">
                    <item.icon className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f0f2f5] mb-1 text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#9ba1a6] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

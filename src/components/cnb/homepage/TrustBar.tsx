'use client';

import { Shield, BadgeCheck, Zap, Users, MapPin, Star } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';

export default function TrustBar() {
  const trustPoints = [
    {
      icon: Shield,
      label: 'Never Shared Leads',
      description: 'Your request → 1-3 pros only',
      highlight: true,
    },
    {
      icon: BadgeCheck,
      label: '3-Step Verified',
      description: 'License + Insurance + Background',
      highlight: false,
    },
    {
      icon: MapPin,
      label: '100% Local',
      description: 'OC & LA County only',
      highlight: false,
    },
    {
      icon: Users,
      label: '500+ Customers',
      description: '4.9★ average rating',
      highlight: false,
    },
    {
      icon: Zap,
      label: 'Match in < 5 Min',
      description: 'Average response time',
      highlight: true,
    },
    {
      icon: Star,
      label: 'Always Free',
      description: 'No fees, no credit card',
      highlight: false,
    },
  ];

  return (
    <section className="relative bg-[#1a120b] border-y border-white/[0.06]">
      <AnimatedSection delay={0.1}>
        <StaggerContainer
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          staggerDelay={0.08}
        >
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <StaggerItem key={point.label}>
                <div className="flex items-center gap-3 group">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    point.highlight
                      ? 'bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] shadow-md shadow-[#FF6B00]/20'
                      : 'bg-[#2a1f14] group-hover:bg-[#2a1f14]/80 border border-white/[0.06]'
                  }`}>
                    <Icon className={`size-5 ${point.highlight ? 'text-white' : 'text-[#FF6B00]'}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#f0f2f5] truncate">
                      {point.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#9ba1a6] truncate">
                      {point.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </AnimatedSection>
    </section>
  );
}

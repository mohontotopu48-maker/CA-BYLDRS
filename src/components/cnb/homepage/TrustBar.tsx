'use client';

import { Shield, BadgeCheck, Zap, Heart } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';

export default function TrustBar() {
  const trustPoints = [
    {
      icon: Shield,
      label: 'Licensed Service Network',
      description: 'Every provider is fully licensed',
    },
    {
      icon: BadgeCheck,
      label: 'Verified Local Providers',
      description: 'Background-checked professionals',
    },
    {
      icon: Zap,
      label: 'Fast Lead Response',
      description: 'Get quotes within minutes',
    },
    {
      icon: Heart,
      label: 'Built for Homeowners',
      description: 'Designed with your needs first',
    },
  ];

  return (
    <section className="relative bg-orange-50/50 dark:bg-orange-900/10 border-t border-b border-orange-200/50 dark:border-orange-800/20">
      <AnimatedSection delay={0.1}>
        <StaggerContainer
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          staggerDelay={0.1}
        >
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <StaggerItem key={point.label}>
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors duration-300">
                    <Icon className="size-5 sm:size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                      {point.label}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
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

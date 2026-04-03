'use client';

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import { ClipboardList, Users, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: 'Submit Your Request',
    description:
      "Tell us what service you need, your location, and when you'd like it done. It only takes a minute.",
  },
  {
    number: 2,
    icon: Users,
    title: 'We Match You With the Right Pro',
    description:
      'We connect you with verified, local professionals who specialize in your specific service need.',
  },
  {
    number: 3,
    icon: CheckCircle2,
    title: 'Move Forward with Confidence',
    description:
      'Review your matches, choose the professional that\'s right for you, and get the job done.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-orange-50/30 dark:bg-orange-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Get Connected in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Our streamlined process makes it easy to find the right professional
            for your home service needs.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative"
          staggerDelay={0.2}
        >
          {/* Connecting line between steps (visible on md+) */}
          <div className="hidden md:block absolute top-1/2 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 -translate-y-1/2">
            <div className="w-full h-full border-t-2 border-dashed border-orange-300 dark:border-orange-700/50" />
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.number}>
                <div className="relative bg-white dark:bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm text-center">
                  {/* Number Badge */}
                  <div className="mx-auto mb-5 w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-orange-500/25">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

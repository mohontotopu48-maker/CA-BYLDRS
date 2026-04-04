'use client';

import { Search, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from '@/lib/router-store';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import { motion } from 'framer-motion';

const steps = [
  {
    num: 1,
    icon: Search,
    title: 'Tell Us What You Need',
    description: 'Describe your project and location. It takes less than 60 seconds to submit your request.',
    gradient: 'from-[#FF6B00] to-[#FF9F1C]',
  },
  {
    num: 2,
    icon: Users,
    title: 'Get Matched',
    description: 'We connect you with 1-3 verified pros in your area who are ready to help with your project.',
    gradient: 'from-[#FF9F1C] to-[#FF6B00]',
  },
  {
    num: 3,
    icon: CheckCircle2,
    title: 'Get It Done',
    description: 'Choose your pro, schedule your service, and get the job done right. It\'s that simple.',
    gradient: 'from-[#FF6B00] to-[#FF9F1C]',
  },
];

export default function ServiceJourney() {
  const { navigate } = useRouter();

  return (
    <section id="journey-section" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0906] via-[#1a120b]/50 to-[#0d0906]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#FF9F1C]/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f2f5] mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-[#9ba1a6] max-w-2xl mx-auto leading-relaxed">
            Get matched with the right professional in 3 simple steps.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer className="relative" staggerDelay={0.15}>
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-[#FF6B00]/40 via-[#FF9F1C]/60 to-[#FF6B00]/40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <StaggerItem key={step.num}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative group"
                  >
                    <div className="bg-[#1a120b] rounded-2xl border border-white/[0.06] p-8 text-center hover:border-[#FF6B00]/30 hover:shadow-lg hover:shadow-[#FF6B00]/5 transition-all duration-300">
                      {/* Step Number Circle */}
                      <div className="relative inline-flex items-center justify-center mb-6">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-[#FF6B00]/20`}>
                          <StepIcon className="w-9 h-9 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#2a1f14] border-2 border-[#FF6B00] flex items-center justify-center">
                          <span className="text-sm font-bold text-[#FF6B00]">{step.num}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#f0f2f5] mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#9ba1a6] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow connector (mobile only) */}
                    {idx < steps.length - 1 && (
                      <div className="flex justify-center mt-4 lg:hidden">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-[#FF6B00]/40 to-[#FF6B00]/10" />
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <button
            onClick={() => navigate('contact')}
            className="cta-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF6B00] text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

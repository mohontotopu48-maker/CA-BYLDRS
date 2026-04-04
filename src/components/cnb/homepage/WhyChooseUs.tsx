'use client';

import {
  Users,
  Shield,
  ShieldCheck,
  MapPin,
  Heart,
  MessageCircle,
} from 'lucide-react';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';

const differentiators = [
  {
    icon: Users,
    title: 'Your Lead, Your Choice',
    description:
      "Unlike other platforms that sell your info to 5+ companies, we match you with 1-3 verified pros. You choose who contacts you — no surprises.",
  },
  {
    icon: Shield,
    title: 'Zero Spam, Zero Pressure',
    description:
      'Submit your request without fear. No shared lead lists, no unwanted calls. Just quality connections with professionals who actually want your job.',
  },
  {
    icon: ShieldCheck,
    title: 'Licensed, Insured & Background-Checked',
    description:
      'Every professional in our network passes our 3-step verification: valid California license, active insurance, and clean background check. No exceptions.',
  },
  {
    icon: MapPin,
    title: 'Hyper-Local Matching',
    description:
      'We only serve Orange County & Los Angeles County. This means deeper local knowledge, faster response times, and pros who understand your neighborhood.',
  },
  {
    icon: Heart,
    title: 'Free for Homeowners. Always.',
    description:
      'No hidden fees, no membership charges, no credit card required. Submit a request, get matched, choose your pro — completely free.',
  },
  {
    icon: MessageCircle,
    title: 'Community-Driven & Transparent',
    description:
      'Join our WhatsApp community of 500+ local homeowners. Read real reviews, get recommendations, and connect with your neighbors.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-stone-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-600 dark:text-orange-400 mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-foreground max-w-2xl mx-auto leading-tight">
            Why Homeowners Choose CA BYLDRS
          </h2>
          <p className="mt-4 text-stone-500 dark:text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We built CA BYLDRS on trust and transparency — a platform where
            homeowners stay in control and every professional is held to the
            highest standard.
          </p>
        </AnimatedSection>

        {/* 6-Card Grid: 1 col → md:2 cols → lg:3 cols */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-white dark:bg-card rounded-2xl border border-stone-200/70 dark:border-border p-6 h-full hover:shadow-lg dark:hover:shadow-orange-900/10 hover:border-orange-200/80 dark:hover:border-orange-800/40 transition-all duration-300 group">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-sm">
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-stone-900 dark:text-foreground mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-stone-500 dark:text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

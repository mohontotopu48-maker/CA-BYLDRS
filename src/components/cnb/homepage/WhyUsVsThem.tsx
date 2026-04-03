'use client';

import { CheckCircle2, XCircle, Shield, Users, MapPin, BadgeDollarSign, ShieldAlert, Megaphone } from 'lucide-react';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';

interface ComparisonRow {
  feature: string;
  icon: React.ElementType;
  others: string;
  us: string;
}

const comparisons: ComparisonRow[] = [
  {
    feature: 'Lead Sharing',
    icon: Users,
    others: 'Sold to 5+ contractors',
    us: 'Matched to 1-3 verified pros only',
  },
  {
    feature: 'Spam & Noise',
    icon: Megaphone,
    others: 'Flooded with calls & emails',
    us: 'Zero spam guarantee',
  },
  {
    feature: 'Verification',
    icon: Shield,
    others: 'Basic or none',
    us: 'License + Insurance + Background check',
  },
  {
    feature: 'Local Expertise',
    icon: MapPin,
    others: 'National generic matching',
    us: 'Deep OC & LA County focus',
  },
  {
    feature: 'Cost for Homeowners',
    icon: BadgeDollarSign,
    others: 'Free but you pay in spam',
    us: 'Always free, no strings',
  },
  {
    feature: 'Cost for Contractors',
    icon: ShieldAlert,
    others: '$180-200 per lead',
    us: 'No upfront costs',
  },
];

const competitorNames = ['Angi', 'Thumbtack', 'HomeAdvisor', 'Porch', 'Others'];

export default function WhyUsVsThem() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-orange-100/40 dark:bg-orange-900/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-emerald-100/30 dark:bg-emerald-900/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/40">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </div>
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300 tracking-wide">
              Why Homeowners Switch to CA BYLDRS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            See the{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We&apos;re not just another lead marketplace. Here&apos;s how CA BYLDRS compares
            to the big national platforms.
          </p>
        </AnimatedSection>

        {/* Competitor logos strip */}
        <AnimatedSection delay={0.15} className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {competitorNames.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/50"
              >
                <XCircle className="w-3 h-3 text-red-400" />
                {name}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Desktop: Comparison Table */}
        <div className="hidden md:block">
          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700/60 overflow-hidden bg-white dark:bg-stone-900/80 backdrop-blur-sm shadow-xl shadow-stone-200/50 dark:shadow-stone-900/50">
              {/* Table Header */}
              <div className="grid grid-cols-[1.2fr_1fr_1.3fr] bg-gradient-to-r from-stone-800 to-stone-900 dark:from-stone-800 dark:to-stone-800">
                <div className="px-6 py-4 text-sm font-semibold text-stone-300 uppercase tracking-wider border-r border-stone-700/50">
                  Feature
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider border-r border-stone-700/50">
                  <span className="text-red-300/80">Other Platforms</span>
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-bold">
                    CA BYLDRS
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              <StaggerContainer staggerDelay={0.08} className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {comparisons.map((row, index) => {
                  const Icon = row.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <StaggerItem key={row.feature}>
                      <div
                        className={`group grid grid-cols-[1.2fr_1fr_1.3fr] items-center transition-all duration-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 ${
                          isEven ? 'bg-stone-50/50 dark:bg-stone-800/20' : 'bg-white dark:bg-stone-900/40'
                        }`}
                      >
                        {/* Feature Name */}
                        <div className="px-6 py-5 flex items-center gap-3 border-r border-stone-100 dark:border-stone-800/40">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            isEven
                              ? 'bg-orange-100 dark:bg-orange-900/30'
                              : 'bg-orange-50 dark:bg-orange-900/20'
                          } group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40`}>
                            <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-semibold text-foreground text-sm">
                            {row.feature}
                          </span>
                        </div>

                        {/* Other Platforms */}
                        <div className="px-6 py-5 border-r border-stone-100 dark:border-stone-800/40">
                          <div className="flex items-center justify-center gap-2">
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <span className="text-sm text-stone-500 dark:text-stone-400 text-center leading-snug">
                              {row.others}
                            </span>
                          </div>
                        </div>

                        {/* CA BYLDRS */}
                        <div className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-stone-800 dark:text-stone-200 text-center leading-snug">
                              {row.us}
                            </span>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Table Footer */}
              <div className="bg-gradient-to-r from-emerald-50 to-orange-50 dark:from-emerald-950/30 dark:to-orange-950/30 px-6 py-4 border-t border-stone-200 dark:border-stone-700/50">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Every feature built for trust. Every lead hand-verified.
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden">
          <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
            {comparisons.map((row) => {
              const Icon = row.icon;
              return (
                <StaggerItem key={row.feature}>
                  <div className="rounded-xl border border-stone-200 dark:border-stone-700/60 bg-white dark:bg-stone-900/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                    {/* Feature Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-100 dark:border-stone-800/40">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {row.feature}
                      </h3>
                    </div>

                    {/* Comparison Content */}
                    <div className="divide-y divide-stone-100 dark:divide-stone-800/40">
                      {/* Others */}
                      <div className="flex items-start gap-3 px-4 py-3">
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500/80 block mb-0.5">
                            Other Platforms
                          </span>
                          <span className="text-sm text-stone-500 dark:text-stone-400 leading-snug">
                            {row.others}
                          </span>
                        </div>
                      </div>

                      {/* CA BYLDRS */}
                      <div className="flex items-start gap-3 px-4 py-3 bg-emerald-50/40 dark:bg-emerald-950/20">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-0.5">
                            CA BYLDRS
                          </span>
                          <span className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug">
                            {row.us}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Bottom Trust Message */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 py-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700/60 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>No hidden fees, ever</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-stone-200 dark:bg-stone-700" />
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Real humans verify every lead</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-stone-200 dark:bg-stone-700" />
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>100% local to OC &amp; LA</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

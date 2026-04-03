'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import {
  ChevronRight,
  CheckCircle2,
  Users,
  TrendingUp,
  MapPin,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

const painPoints = [
  {
    icon: Users,
    title: 'Tired of Paying for Garbage Leads?',
    description: 'Stop spending $180-200 per lead on platforms that sell the same lead to 5+ competitors. CA BYLDRS sends you qualified, exclusive leads — and you pay nothing upfront.',
  },
  {
    icon: TrendingUp,
    title: 'Ready to Grow the Right Way?',
    description: 'No monthly minimums. No hidden cancellation fees. No aggressive sales calls. Just a fair platform that connects you with homeowners who want YOUR specific service.',
  },
];

const benefits = [
  'Exclusive leads — not shared with 5+ competitors',
  'Zero upfront costs, no monthly minimums',
  'Only receive leads matching your service area & expertise',
  'Join 200+ verified local contractors in our network',
  'Free WhatsApp community for peer networking & support',
];

const statCards = [
  { icon: TrendingUp, value: '500+', label: 'Leads / Month' },
  { icon: Users, value: '200+', label: 'Partners' },
  { icon: MapPin, value: '2', label: 'Counties' },
];

export default function ContractorCTA() {
  const { navigate } = useRouter();

  return (
    <section className="w-full bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 md:items-start">
          {/* ── Left: Copy & CTA ── */}
          <div className="flex-1 space-y-8">
            <StaggerContainer>
              <StaggerItem>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Built by Contractors, for Contractors
                </span>
              </StaggerItem>

              <StaggerItem>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Other Platforms Are Rigged Against You.
                  <span className="block mt-1 text-orange-600">We&apos;re Different.</span>
                </h2>
              </StaggerItem>

              {/* Pain points */}
              {painPoints.map((pp) => {
                const PpIcon = pp.icon;
                return (
                  <StaggerItem key={pp.title}>
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-neutral-800 border border-border shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <PpIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{pp.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pp.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}

              {/* Benefits */}
              <StaggerItem>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              {/* CTA */}
              <StaggerItem>
                <button
                  onClick={() => navigate('partner')}
                  className="group cta-glow mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:from-orange-600 hover:to-orange-700"
                >
                  Apply to Join — Free
                  <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* ── Right: Social Proof & Stats ── */}
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-80">
            <AnimatedSection delay={0.2} direction="right">
              {/* Contractor testimonial card */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    MR
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Mike R.</p>
                    <p className="text-xs text-muted-foreground">Licensed Plumber, Fullerton</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;My close rate went from 15% to 60% after switching. CA BYLDRS sends real leads from homeowners who actually want my service.&rdquo;
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="right">
              {/* WhatsApp community card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Join Our WhatsApp Community</p>
                    <p className="text-xs text-muted-foreground">500+ local professionals</p>
                  </div>
                </div>
                <a
                  href="https://chat.whatsapp.com/DUd7H5GOSO3Al5KsTPt1oj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 transition-colors"
                >
                  Join Now
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.45} direction="right">
              {/* Stat row */}
              <div className="grid grid-cols-3 gap-3">
                {statCards.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-dark rounded-2xl p-4 text-center"
                  >
                    <stat.icon className="mx-auto mb-2 h-5 w-5 text-orange-500" />
                    <p className="text-xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

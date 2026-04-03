'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import {
  ChevronRight,
  CheckCircle2,
  Users,
  TrendingUp,
  MapPin,
  Building2,
} from 'lucide-react';

const benefits = [
  'Receive qualified local leads',
  'Grow your customer base in OC & LA',
  'No upfront costs to join',
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
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 md:items-center">
          {/* ── Left: Copy & CTA ── */}
          <div className="flex-1 space-y-6">
            <StaggerContainer>
              <StaggerItem>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Grow Your Business
                </span>
              </StaggerItem>

              <StaggerItem>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Are You a Licensed Local Contractor?
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="max-w-lg text-muted-foreground leading-relaxed">
                  Join CA BYLDRS and receive local lead
                  opportunities in your service category. We handle the marketing
                  — you focus on what you do best.
                </p>
              </StaggerItem>

              {/* Benefits */}
              <StaggerItem>
                <ul className="space-y-3 pt-2">
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
                  Become a Partner
                  <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* ── Right: Stat Cards ── */}
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-80">
            <AnimatedSection delay={0.2} direction="right">
              {/* Top card */}
              <div className="glass-dark rounded-2xl p-6 animate-float">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                    <Building2 className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      Local Focus
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Orange County &amp; LA
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="right">
              {/* Stat row */}
              <div className="grid grid-cols-2 gap-4">
                {statCards.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-dark animate-float-delayed rounded-2xl p-5 text-center"
                  >
                    <stat.icon className="mx-auto mb-2 h-6 w-6 text-orange-500" />
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
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

'use client';

import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { ChevronRight, ShieldCheck, Clock, Phone } from 'lucide-react';

export default function HighIntentCTA() {
  const { navigate } = useRouter();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-orange-400/10 blur-xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm mb-6">
              <ShieldCheck className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">Trusted by 500+ OC & LA Homeowners</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Find a Pro You Can
              <span className="block mt-1">Actually Trust?</span>
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Stop scrolling through endless listings and worrying about who&apos;s going to show up.
              Tell us what you need — we&apos;ll match you with 1-3 verified local experts. No spam. No surprises.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="group cta-glow inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-orange-600 shadow-lg transition-all duration-200 hover:bg-orange-50 hover:shadow-xl text-base"
            >
              Get Matched Now — It&apos;s Free
              <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a
              href="tel:+15629440500"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/50 text-base"
            >
              <Phone className="h-5 w-5" />
              Call +1 (562) 944-0500
            </a>
          </div>
        </AnimatedSection>

        {/* Trust micro-bar */}
        <AnimatedSection delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-200" />
              <span>No shared leads</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-200" />
              <span>Match in &lt; 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-200" />
              <span>100% free for homeowners</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

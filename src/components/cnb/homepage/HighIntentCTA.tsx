'use client';

import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { ChevronRight, Phone } from 'lucide-react';

export default function HighIntentCTA() {
  const { navigate } = useRouter();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-20">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            {/* Decorative phone icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Phone className="h-8 w-8 text-white" />
            </div>

            {/* Copy */}
            <div className="flex-1 space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Need Help Fast?
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-white/90">
                Tell us what service you need and we&apos;ll help connect you
                with the right local professional.
              </p>
            </div>

            {/* CTA button */}
            <div className="shrink-0">
              <button
                onClick={() => navigate('contact')}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-orange-600 shadow-lg transition-all duration-200 hover:bg-orange-50 hover:shadow-xl"
              >
                Request Service Now
                <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

'use client';

import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { counties } from '@/lib/data';
import { useRouter } from '@/lib/router-store';
import {
  AnimatedSection,
} from '@/components/cnb/AnimatedSection';

const countyGradientAccent: Record<string, string> = {
  'orange-county': 'from-[#FF6B00] to-[#FF9F1C]',
  'los-angeles-county': 'from-[#FF6B00] to-[#ef4444]',
};

const directions: Record<string, 'left' | 'right'> = {
  'orange-county': 'left',
  'los-angeles-county': 'right',
};

export default function CountyCoverage() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 md:py-28 bg-[#0d0906]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#FF6B00] mb-3">
            Our Service Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f2f5] max-w-2xl mx-auto leading-tight">
            Areas We Serve
          </h2>
        </div>

        {/* County Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {counties.map((county) => {
            const gradient = countyGradientAccent[county.slug] ?? 'from-[#FF6B00] to-[#FF9F1C]';
            const direction = directions[county.slug] ?? 'left';

            return (
              <AnimatedSection key={county.slug} direction={direction}>
                <button
                  onClick={() => navigate(county.slug as 'orange-county' | 'los-angeles-county')}
                  className="group w-full text-left bg-[#1a120b] rounded-2xl border border-white/[0.06] overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:shadow-[#FF6B00]/5 hover:border-[#FF6B00]/30 transition-all duration-300"
                >
                  {/* Gradient Accent Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                  <div className="p-8">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#FF6B00]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#f0f2f5]">
                        {county.name}
                      </h3>
                    </div>

                    <p className="text-[#9ba1a6] text-sm mb-6 leading-relaxed">
                      {county.tagline}
                    </p>

                    {/* Cities */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9ba1a6]">
                          Cities We Serve
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {county.cities.map((city) => (
                          <span
                            key={city}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#2a1f14] border border-white/[0.06] text-xs font-medium text-[#f0f2f5]"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B00] group-hover:text-[#FF9F1C] transition-colors duration-200">
                      View {county.name} Services
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

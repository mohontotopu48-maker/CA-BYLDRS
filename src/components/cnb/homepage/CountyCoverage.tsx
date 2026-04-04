'use client';

import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { counties } from '@/lib/data';
import { useRouter } from '@/lib/router-store';
import {
  AnimatedSection,
} from '@/components/cnb/AnimatedSection';

const highlightCities: Record<string, string[]> = {
  'orange-county': [
    'Anaheim',
    'Irvine',
    'Santa Ana',
    'Huntington Beach',
    'Costa Mesa',
    'Fullerton',
    'Newport Beach',
  ],
  'los-angeles-county': [
    'Los Angeles',
    'Long Beach',
    'Pasadena',
    'Glendale',
    'Torrance',
    'Inglewood',
    'Santa Clarita',
  ],
};

const countyGradientAccent: Record<string, string> = {
  'orange-county': 'bg-gradient-to-r from-orange-500 to-amber-400',
  'los-angeles-county': 'bg-gradient-to-r from-orange-500 to-red-400',
};

const countyIconBg: Record<string, string> = {
  'orange-county': 'bg-orange-100 text-orange-600',
  'los-angeles-county': 'bg-orange-100 text-orange-600',
};

const directions: Record<string, 'left' | 'right'> = {
  'orange-county': 'left',
  'los-angeles-county': 'right',
};

export default function CountyCoverage() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-600 dark:text-orange-400 mb-3">
            Our Service Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-foreground max-w-2xl mx-auto leading-tight">
            Proudly Serving Orange County &amp; Los Angeles County
          </h2>
        </div>

        {/* County Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {counties.map((county) => {
            const cities = highlightCities[county.slug] ?? county.cities;
            const gradient = countyGradientAccent[county.slug] ?? 'bg-gradient-to-r from-orange-500 to-amber-400';
            const iconBg = countyIconBg[county.slug] ?? 'bg-orange-100 text-orange-600';
            const direction = directions[county.slug] ?? 'left';

            return (
              <AnimatedSection key={county.slug} direction={direction}>
                <div className="group bg-white dark:bg-card rounded-2xl border border-stone-200/80 dark:border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-orange-900/10 transition-all duration-300">
                  {/* Gradient Accent Bar */}
                  <div className={`h-1.5 ${gradient}`} />

                  <div className="p-8">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-foreground">
                        {county.name}
                      </h3>
                    </div>

                    <p className="text-stone-500 dark:text-muted-foreground text-sm mb-6 leading-relaxed">
                      {county.tagline}
                    </p>

                    {/* Cities */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-muted-foreground">
                          Areas We Serve
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cities.map((city) => (
                          <span
                            key={city}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-50 dark:bg-muted border border-stone-200/70 dark:border-border text-xs font-medium text-stone-600 dark:text-foreground"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => navigate(county.slug as 'orange-county' | 'los-angeles-county')}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 group/link"
                    >
                      View {county.name} Services
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

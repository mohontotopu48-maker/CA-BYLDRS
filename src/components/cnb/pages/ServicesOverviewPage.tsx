'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { services } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

export default function ServicesOverviewPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-background dark:from-orange-900/20 dark:to-background pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button onClick={() => navigate('home')} className="hover:text-orange-600 transition-colors">Home</button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">Services</span>
            </nav>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                All Services
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Professional Home Services
              </h1>
              <p className="text-lg text-muted-foreground">
                From plumbing to painting, we connect you with verified local professionals across Orange County and Los Angeles County for every home service need.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="customer" />

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.slug}>
                  <button
                    onClick={() => navigate(`service/${service.slug}`)}
                    className="w-full text-left bg-card rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 group hover:border-orange-200 dark:hover:border-orange-800 transition-all hover:shadow-md"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                      <Icon className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all shrink-0 hidden md:block" />
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See What You Need?
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Contact us and we&apos;ll help connect you with the right professional for any home service need.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
            >
              Contact Us
              <ChevronRight className="h-5 w-5" />
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

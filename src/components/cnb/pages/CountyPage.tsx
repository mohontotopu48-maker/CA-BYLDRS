'use client';

import { counties, countyServices, services } from '@/lib/data';
import { useRouter } from '@/lib/router-store';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, ArrowLeft, Building2 } from 'lucide-react';
import type { PageKey } from '@/lib/router-store';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

interface CountyPageProps {
  slug: string;
}

export default function CountyPage({ slug }: CountyPageProps) {
  const { navigate } = useRouter();
  const county = counties.find((c) => c.slug === slug);

  if (!county) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <AnimatedSection direction="up">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🗺️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              County Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find the county you&apos;re looking for. Please check the URL or browse our available locations.
            </p>
            <Button onClick={() => navigate('home')} className="cta-glow">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-950 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm">
            <button
              onClick={() => navigate('home')}
              className="text-muted-foreground hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium">{county.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {county.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium mb-4">
              {county.tagline}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {county.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="customer" />

      {/* Cities Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Areas We Serve in {county.name}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Professional home services available in these cities
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {county.cities.map((city) => (
                <div
                  key={city}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/40 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-sm font-medium"
                >
                  <MapPin className="size-3.5" />
                  {city}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Services Available in {county.name}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose from our full range of professional home services
              </p>
            </div>
          </AnimatedSection>
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            staggerDelay={0.08}
          >
            {countyServices.map((cs) => {
              const serviceData = services.find((s) => s.slug === cs.slug);
              if (!serviceData) return null;

              const ServiceIcon = serviceData.icon;

              return (
                <StaggerItem key={cs.slug}>
                  <Card className="h-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border-gray-200 dark:border-gray-700">
                    <CardContent className="pt-2 pb-2 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                          <ServiceIcon className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {cs.service}
                          </h3>
                          {(
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {serviceData.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button
                          onClick={() =>
                            navigate(`county/${county.slug}/service/${cs.slug}` as PageKey)
                          }
                          variant="outline"
                          className="w-full group"
                        >
                          View Services
                          <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Need Service in {county.name}?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get connected with licensed, verified professionals in {county.name}. Fast response times and guaranteed quality workmanship.
              </p>
              <Button
                onClick={() => navigate('contact')}
                size="lg"
                className="cta-glow text-base px-8"
              >
                Get a Free Quote
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

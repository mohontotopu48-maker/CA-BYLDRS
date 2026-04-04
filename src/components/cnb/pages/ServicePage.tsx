'use client';

import { services, counties } from '@/lib/data';
import { useRouter } from '@/lib/router-store';
import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2, ArrowLeft, MapPin } from 'lucide-react';
import type { PageKey } from '@/lib/router-store';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

interface ServicePageProps {
  slug: string;
}

export default function ServicePage({ slug }: ServicePageProps) {
  const { navigate } = useRouter();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0d0906] flex flex-col items-center justify-center px-4 py-20">
        <AnimatedSection direction="up">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Service Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find the service you&apos;re looking for. It may have been removed or the URL might be incorrect.
            </p>
            <Button onClick={() => navigate('services')} className="cta-glow">
              <ArrowLeft className="size-4" />
              Browse All Services
            </Button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-[#0d0906]">
      {/* Breadcrumb */}
      <div className="bg-[#1a120b] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm">
            <button
              onClick={() => navigate('home')}
              className="text-muted-foreground hover:text-[#FF6B00] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <button
              onClick={() => navigate('services')}
              className="text-muted-foreground hover:text-[#FF6B00] transition-colors"
            >
              Services
            </button>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1a120b] border border-[#FF6B00]/20 shadow-lg flex items-center justify-center mx-auto mb-6">
              <ServiceIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF6B00]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {service.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {service.shortDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="customer" />

      {/* Description Section */}
      <section className="py-12 sm:py-16 bg-[#0d0906]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card className="max-w-4xl mx-auto bg-[#1a120b] border border-[#FF6B00]/15">
              <CardContent className="pt-2 pb-2">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 items-center justify-center shrink-0 mt-1">
                    <ServiceIcon className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      About Our {service.name} Services
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-[#2a1f14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                What&apos;s Included
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need for professional {service.name.toLowerCase()} services
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <AnimatedSection delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#1a120b] border border-border"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span className="text-foreground/90 text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-16 bg-[#0d0906]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Common questions about our {service.name.toLowerCase()} services
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline sm:text-base font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* County Service Links */}
      <section className="py-12 sm:py-16 bg-[#2a1f14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Available in Your Area
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find {service.name.toLowerCase()} services in your county
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-6">
            {counties.map((county, index) => (
              <AnimatedSection key={county.slug} delay={0.1 * (index + 1)}>
                <Card className="bg-[#1a120b] border border-border hover:border-[#FF6B00]/30 transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{county.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {county.cities.length} cities served
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate(`county/${county.slug}/service/${slug}` as PageKey)}
                        className="cta-glow shrink-0"
                      >
                        View in {county.name}
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="-mt-2">
                    <div className="flex flex-wrap gap-2">
                      {county.cities.map((city) => (
                        <span
                          key={city}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20"
                        >
                          <MapPin className="size-3" />
                          {city}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-[#0d0906]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Need {service.name}?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get connected with verified, licensed {service.name.toLowerCase()} professionals in your area. Fast response, fair pricing, guaranteed quality.
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

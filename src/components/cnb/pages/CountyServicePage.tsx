'use client';

import { ArrowLeft, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { useRouter, type PageKey } from '@/lib/router-store';
import { services, counties } from '@/lib/data';

interface CountyServicePageProps {
  countySlug: string;
  serviceSlug: string;
}

export default function CountyServicePage({ countySlug, serviceSlug }: CountyServicePageProps) {
  const { navigate } = useRouter();
  const county = counties.find((c) => c.slug === countySlug);
  const service = services.find((s) => s.slug === serviceSlug);

  if (!county || !service) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-[#0d0906]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The service or county you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => navigate('home')} className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white hover:opacity-90">Back to Home</Button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <button onClick={() => navigate('home')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="h-3 w-3" />
              <button onClick={() => navigate(countySlug as PageKey)} className="hover:text-white transition-colors">{county.name}</button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{service.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  {service.name} in {county.name}
                </h1>
                <p className="text-lg text-white/80 max-w-2xl">
                  {service.shortDescription} Serving homeowners throughout {county.name}, including {county.cities.slice(0, 4).join(', ')}{county.cities.length > 4 ? ', and more' : ''}.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[#0d0906]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Professional {service.name} in {county.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 p-4 bg-[#FF6B00]/10 rounded-xl border border-[#FF6B00]/15">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#FF9F1C]">
                        Our verified {service.name.toLowerCase()} professionals serve all areas of {county.name}, including{' '}
                        {county.cities.join(', ')}.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-2xl font-bold mb-6 text-foreground">What&apos;s Included</h2>
                <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <StaggerItem key={feature}>
                      <div className="flex items-start gap-3 bg-card rounded-xl border border-border p-4">
                        <CheckCircle2 className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq) => (
                    <div key={faq.q} className="bg-card rounded-xl border border-border p-6">
                      <h3 className="font-semibold mb-2 text-foreground">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] rounded-2xl p-6 text-white sticky top-24">
                  <h3 className="text-xl font-bold mb-2">
                    Need {service.name} in {county.name}?
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Get connected with a verified {service.name.toLowerCase()} professional in {county.name} today.
                  </p>
                  <Button
                    onClick={() => navigate('contact')}
                    className="w-full bg-[#1a120b] text-white hover:bg-[#2a1f14] font-semibold"
                    size="lg"
                  >
                    Request Service
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    onClick={() => navigate('emergency')}
                    variant="outline"
                    className="w-full mt-3 border-white/30 text-white hover:bg-white/10"
                    size="lg"
                  >
                    Emergency Help
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.1}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h4 className="font-semibold mb-4 text-foreground">Areas We Serve in {county.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {county.cities.map((city) => (
                      <span
                        key={city}
                        className="px-3 py-1.5 bg-[#FF6B00]/10 text-[#FF6B00] rounded-lg text-xs font-medium"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h4 className="font-semibold mb-4 text-foreground">Other Services in {county.name}</h4>
                  <div className="space-y-2">
                    {services
                      .filter((s) => s.slug !== serviceSlug)
                      .map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => navigate(`county/${countySlug}/service/${s.slug}`)}
                          className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-[#FF6B00]/20 transition-colors group"
                        >
                          <s.icon className="h-4 w-4 text-[#FF6B00]" />
                          <span className="text-sm flex-1 text-foreground">{s.name}</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Request {service.name} service in {county.name} and get connected with a verified professional today.
            </p>
            <Button
              onClick={() => navigate('contact')}
              size="lg"
              className="bg-[#1a120b] text-white hover:bg-[#2a1f14] font-semibold px-8 shadow-lg"
            >
              Request Service Now
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

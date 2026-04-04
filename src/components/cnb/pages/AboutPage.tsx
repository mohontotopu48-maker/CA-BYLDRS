'use client';

import { useRouter } from '@/lib/router-store';
import { counties } from '@/lib/data';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Shield,
  Clock,
  LayoutGrid,
  Building2,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

const differentiators = [
  {
    icon: MapPin,
    title: 'County-Focused Matching',
    description:
      'We specialize in Orange County and Los Angeles County, giving us deep local expertise.',
  },
  {
    icon: Shield,
    title: 'Verified Professionals',
    description:
      'Every professional in our network is licensed, insured, and background-checked.',
  },
  {
    icon: Clock,
    title: 'Fast Response',
    description:
      'We prioritize speed so you can get help when you need it most.',
  },
  {
    icon: LayoutGrid,
    title: 'Structured Process',
    description:
      'Our matching system ensures quality connections, not random listings.',
  },
];

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => navigate('home')}
              className="hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#FF9F1C]/15 blur-xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              About CA BYLDRS
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for connecting with verified home service professionals in Southern California.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="customer" />

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <AnimatedSection>
          <Card className="glass-card shadow-lg border-0 shadow-[#FF6B00]/5">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                  <Building2 className="size-5 text-[#FF6B00]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CA BYLDRS is a local service lead acquisition, qualification, and routing platform built specifically for Orange County and Los Angeles County homeowners.
                </p>
                <p>
                  Our platform bridges the gap between homeowners who need reliable home services and the professionals who can deliver them. We understand the frustration of searching through endless listings, reading reviews of questionable authenticity, and hoping the contractor you pick will show up on time and do quality work. That&apos;s why we built a system that takes the guesswork out of finding help.
                </p>
                <p>
                  We focus on connecting homeowners with verified professionals who are licensed, insured, and background-checked. Our county-based matching ensures you get matched with local experts who understand the specific needs and regulations of your community. Whether you&apos;re in Anaheim, Irvine, Long Beach, or Pasadena, we&apos;ve got you covered.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* Our Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium mb-4 border border-[#FF6B00]/20">
              <Heart className="size-4" />
              Our Mission
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Making Home Services Simple & Trustworthy
            </h2>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Card className="glass-card shadow-lg border border-[#FF6B00]/20 bg-gradient-to-br from-[#1a120b] to-[#2a1f14]">
            <CardContent className="p-6 sm:p-8 text-center">
              <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed italic">
                &ldquo;To make finding reliable home services simple, fast, and trustworthy for every homeowner in Southern California.&rdquo;
              </blockquote>
              <div className="mt-6 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C]" />
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>

      {/* What Makes Us Different */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Makes Us Different
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not just another directory. We&apos;re a focused, trust-driven platform designed for Southern California homeowners.
            </p>
          </div>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full glass-card shadow-md border border-[#FF6B00]/20 hover:border-[#FF6B00]/30 hover:shadow-lg hover:shadow-[#FF6B00]/5 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6B00]/20 transition-colors">
                    <item.icon className="size-7 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Our Service Areas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 mb-12">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Our Service Areas
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We proudly serve homeowners across two of Southern California&apos;s most vibrant counties.
            </p>
          </div>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {counties.map((county) => (
            <StaggerItem key={county.slug}>
              <Card className="h-full glass-card shadow-md border border-[#FF6B00]/20 hover:border-[#FF6B00]/30 hover:shadow-lg hover:shadow-[#FF6B00]/5 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                      <MapPin className="size-5 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {county.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {county.description}
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Cities We Serve
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {county.cities.map((city) => (
                        <span
                          key={city}
                          className="px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium border border-[#FF6B00]/20"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Let us connect you with the right professional for your home service needs. It&apos;s fast, free, and commitment-free.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-[#0d0906] text-[#FF6B00] hover:bg-[#1a120b] font-semibold px-8 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('contact')}
              >
                Contact Us Today
                <ChevronRight className="size-5 ml-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

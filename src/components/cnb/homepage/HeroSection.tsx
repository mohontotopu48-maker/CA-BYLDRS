'use client';

import { Shield, MapPin, ChevronRight, Phone, Users } from 'lucide-react';
import { useRouter } from '@/lib/router-store';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient bg-[#0d0906]">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FF6B00]/5 blur-2xl animate-float" />
        <div className="absolute -top-10 right-10 w-56 h-56 rounded-full bg-[#2a1f14] blur-xl animate-float-delayed" />
        <div className="absolute bottom-32 -left-10 w-40 h-40 rounded-full glass animate-float-slow" />
        <div className="absolute -bottom-16 right-20 w-64 h-64 rounded-full bg-[#FF6B00]/5 blur-2xl animate-float" />
        <div className="absolute top-1/3 right-0 w-32 h-32 rounded-full glass animate-float-delayed opacity-60" />
        <div className="absolute top-20 left-1/4 w-3 h-3 rounded-full bg-white/20 animate-float" />
        <div className="absolute top-40 right-1/3 w-2 h-2 rounded-full bg-white/15 animate-float-delayed" />
        <div className="absolute bottom-40 left-1/3 w-4 h-4 rounded-full bg-white/10 animate-float-slow" />
        <div className="absolute top-1/2 left-10 w-2 h-2 rounded-full bg-[#FF6B00]/20 animate-float-delayed" />
        <div className="absolute bottom-1/4 right-12 w-3 h-3 rounded-full bg-[#FF6B00]/15 animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Logo */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div aria-hidden="true">
                  <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-[#FF6B00]/20 blur-3xl animate-pulse-glow" />
                  <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-[#FF6B00]/15 blur-2xl animate-float" />
                </div>
                <img
                  src="/logo.png"
                  alt="CA BYLDRS - Trusted Local Home Services"
                  width={256} height={256}
                  className="relative h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain drop-shadow-2xl"
                />
                {/* Animated orbit ring */}
                <div className="absolute -inset-10 rounded-full border-2 border-dashed border-[#FF6B00]/20 animate-[spin_20s_linear_infinite]" />
              </div>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
              California&apos;s Most Trusted
              <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C]">
                Contractor Network
              </span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection delay={0.25}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#9ba1a6] max-w-3xl mx-auto leading-relaxed">
              Connect with verified, licensed professionals for your home projects. No lead farms. No spam. Just real local contractors who show up and deliver quality work.
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.4}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="cta-glow bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white hover:from-[#FF9F1C] hover:to-[#FF6B00] font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('contact')}
              >
                Get Free Quotes
                <ChevronRight className="size-5 ml-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-red-500 text-red-400 bg-transparent hover:bg-red-500/10 hover:border-red-400 hover:text-red-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('journey')}
              >
                How It Works
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/[0.06] text-white bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('partner')}
              >
                <Users className="size-5 mr-2" />
                Join Our Network
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust Badges */}
          <AnimatedSection delay={0.55}>
            <StaggerContainer
              className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
              staggerDelay={0.12}
            >
              <StaggerItem>
                <div className="glass-card rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/[0.06] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FF6B00]/10 flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors">
                    <Shield className="size-5 text-[#FF6B00]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-[#f0f2f5]">1-3 Matched Pros</p>
                    <p className="text-xs text-[#9ba1a6] hidden sm:block">Never shared with 5+ companies</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass-card rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/[0.06] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FF6B00]/10 flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors">
                    <Shield className="size-5 text-[#FF6B00]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-[#f0f2f5]">Zero Lead Sharing</p>
                    <p className="text-xs text-[#9ba1a6] hidden sm:block">Your info stays private</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass-card rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/[0.06] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FF6B00]/10 flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors">
                    <MapPin className="size-5 text-[#FF6B00]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-[#f0f2f5]">Licensed & Insured</p>
                    <p className="text-xs text-[#9ba1a6] hidden sm:block">Verified pros in OC & LA only</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0906] to-transparent pointer-events-none" />
    </section>
  );
}

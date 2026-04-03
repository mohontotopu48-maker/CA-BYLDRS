'use client';

import { Shield, MapPin, ChevronRight, Phone, Users } from 'lucide-react';
import { useRouter } from '@/lib/router-store';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-2xl animate-float" />
        <div className="absolute -top-10 right-10 w-56 h-56 rounded-full bg-white/15 blur-xl animate-float-delayed" />
        <div className="absolute bottom-32 -left-10 w-40 h-40 rounded-full glass animate-float-slow" />
        <div className="absolute -bottom-16 right-20 w-64 h-64 rounded-full bg-orange-300/10 blur-2xl animate-float" />
        <div className="absolute top-1/3 right-0 w-32 h-32 rounded-full glass animate-float-delayed opacity-60" />
        <div className="absolute top-20 left-1/4 w-3 h-3 rounded-full bg-white/40 animate-float" />
        <div className="absolute top-40 right-1/3 w-2 h-2 rounded-full bg-white/30 animate-float-delayed" />
        <div className="absolute bottom-40 left-1/3 w-4 h-4 rounded-full bg-white/25 animate-float-slow" />
        <div className="absolute top-1/2 left-10 w-2 h-2 rounded-full bg-orange-200/40 animate-float-delayed" />
        <div className="absolute bottom-1/4 right-12 w-3 h-3 rounded-full bg-orange-300/30 animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Logo with eye-catching glow */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div aria-hidden="true">
                  <div className="absolute -inset-4 rounded-full bg-white/20 blur-2xl animate-float" />
                  <div className="absolute -inset-2 rounded-full bg-white/10 blur-lg animate-float-delayed" />
                </div>
                <div className="relative rounded-2xl p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-orange-500/10">
                  <img
                    src="https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png"
                    alt="CA BYLDRS"
                    className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
              Trust Your Local Pro
              <span className="block mt-2 sm:mt-3">
                Not a Lead Farm
              </span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection delay={0.25}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Unlike Angi or HomeAdvisor, we never sell your info to 5+ contractors. Your request goes to only 1-3 community-trusted, licensed professionals in Orange County &amp; Los Angeles County. No spam. No shared leads. Just real local experts who show up.
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.4}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="cta-glow bg-white text-orange-700 hover:bg-orange-50 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('contact')}
              >
                Request Service
                <ChevronRight className="size-5 ml-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('emergency')}
              >
                <Phone className="size-5 mr-2" />
                Emergency Help
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer h-auto"
                onClick={() => navigate('partner')}
              >
                <Users className="size-5 mr-2" />
                Become a Partner
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
                <div className="glass rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Shield className="size-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-white">Never Shared Leads</p>
                    <p className="text-xs text-white/60 hidden sm:block">Your request goes to 1-3 pros, not 5+</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Shield className="size-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-white">Zero Spam Guarantee</p>
                    <p className="text-xs text-white/60 hidden sm:block">No unwanted calls or emails</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <MapPin className="size-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-semibold text-white">100% Local &amp; Verified</p>
                    <p className="text-xs text-white/60 hidden sm:block">Licensed pros in OC &amp; LA only</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-50 dark:from-[#1a0f05] to-transparent pointer-events-none" />
    </section>
  );
}

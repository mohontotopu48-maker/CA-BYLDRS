'use client';

import { services } from '@/lib/data';
import { Zap } from 'lucide-react';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { motion } from 'framer-motion';

export default function ServicesGrid() {
  const { navigate } = useRouter();

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0906] via-[#1a120b]/50 to-[#0d0906]" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#FF9F1C]/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            Expert Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f2f5] mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-[#9ba1a6] text-lg max-w-2xl mx-auto leading-relaxed">
            Quality home services from verified professionals. Tap any service to learn more.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto"
          staggerDelay={0.06}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <motion.button
                  onClick={() => navigate(`service/${service.slug}`)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative w-full text-left rounded-2xl p-6 sm:p-8 
                    bg-[#1a120b] backdrop-blur-md 
                    border border-white/[0.06]
                    shadow-sm hover:shadow-xl hover:shadow-[#FF6B00]/10
                    hover:border-[#FF6B00]/30
                    transition-all duration-300 cursor-pointer"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF6B00]/0 to-[#FF9F1C]/0 group-hover:from-[#FF6B00]/5 group-hover:to-[#FF9F1C]/5 transition-all duration-500 pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#FF6B00]/20 group-hover:shadow-[#FF6B00]/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>

                  {/* Service Name */}
                  <h3 className="relative font-bold text-[#f0f2f5] text-sm sm:text-base group-hover:text-[#FF6B00] transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="relative mt-2 text-sm text-[#9ba1a6] leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] group-hover:w-2/3 transition-all duration-500 rounded-full" />
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

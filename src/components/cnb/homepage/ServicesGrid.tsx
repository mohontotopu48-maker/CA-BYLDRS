'use client';

import { services } from '@/lib/data';
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-100/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            Expert Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Professional home services for every aspect of your home. Tap any service to learn more.
          </p>
        </AnimatedSection>

        {/* Services Grid - matching reference glass-card style */}
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto"
          staggerDelay={0.06}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <motion.button
                  onClick={() => navigate(`service/${service.slug}`)}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative w-full text-center rounded-2xl p-6 sm:p-8 md:p-10 
                    bg-white/70 dark:bg-white/5 backdrop-blur-md 
                    border border-orange-200/40 dark:border-orange-500/20
                    shadow-sm hover:shadow-xl hover:shadow-orange-500/10
                    transition-all duration-300 cursor-pointer"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500" />
                  
                  {/* Icon */}
                  <div className="relative mx-auto mb-4 sm:mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>

                  {/* Service Name */}
                  <h3 className="relative font-bold text-foreground text-sm sm:text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-2/3 transition-all duration-500 rounded-full" />
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Zap(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

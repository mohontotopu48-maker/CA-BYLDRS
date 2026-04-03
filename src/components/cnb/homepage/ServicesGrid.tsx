'use client';

import { services } from '@/lib/data';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import { useRouter } from '@/lib/router-store';
import { ChevronRight } from 'lucide-react';

export default function ServicesGrid() {
  const { navigate } = useRouter();

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Professional Home Services You Can Trust
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            From plumbing to painting, we connect you with verified local
            professionals for every home service need.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          staggerDelay={0.08}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <button
                  onClick={() => navigate(`service/${service.slug}`)}
                  className="group relative w-full text-left bg-white dark:bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border/50 hover:shadow-lg orange-glow transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {/* Chevron */}
                  <ChevronRight className="absolute top-5 md:top-6 right-5 md:right-6 w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

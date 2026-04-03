'use client';

import { Search, Zap, LayoutGrid, MapPin, Award } from 'lucide-react';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';

const features = [
  {
    icon: Search,
    title: 'Better Than Random Search',
    description:
      'Stop scrolling through unverified listings. We match you with pre-screened, licensed professionals.',
  },
  {
    icon: Zap,
    title: 'Faster Than Going Alone',
    description:
      'Skip the hours of research and phone calls. We handle the matching process for you.',
  },
  {
    icon: LayoutGrid,
    title: 'More Organized Than Directories',
    description:
      'Structured service matching by category and county means better results every time.',
  },
  {
    icon: MapPin,
    title: 'Local & County-Focused',
    description:
      'We serve Orange County and Los Angeles County exclusively — deep local expertise.',
  },
  {
    icon: Award,
    title: 'Designed for Quality',
    description:
      'Our vetting process ensures you only connect with professionals who meet our standards.',
  },
];

export default function WhyChooseUs() {
  const leftFeatures = features.slice(0, 2);
  const rightFeatures = features.slice(2);

  return (
    <section className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-600 mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 max-w-2xl mx-auto leading-tight">
            Built for Trust, Speed &amp; Better Local Service
          </h2>
        </div>

        {/* Features Grid — asymmetric 2-col: 2 left, 3 right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column — 2 items */}
          <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.12}>
            {leftFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="bg-white rounded-2xl border border-stone-200/70 p-6 h-full hover:shadow-lg hover:border-stone-300/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-stone-500 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Right Column — 3 items */}
          <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.12}>
            {rightFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="bg-white rounded-2xl border border-stone-200/70 p-6 h-full hover:shadow-lg hover:border-stone-300/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-stone-500 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

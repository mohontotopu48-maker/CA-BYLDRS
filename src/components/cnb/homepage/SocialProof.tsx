'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  Users,
  HardHat,
  type LucideIcon,
} from 'lucide-react';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';

/* ────────────────────────────────────────
   Data Types
   ──────────────────────────────────────── */

interface Testimonial {
  id: number;
  name: string;
  location: string;
  stars: number;
  quote: string;
  serviceBadge: string;
  initials: string;
  gradient: string;
  badgeIcon?: LucideIcon;
}

/* ────────────────────────────────────────
   Testimonials Data
   ──────────────────────────────────────── */

const homeownerTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria G.',
    location: 'Anaheim, CA',
    stars: 5,
    quote:
      "After getting flooded with 8 calls from Angi contractors within minutes, I switched to CA BYLDRS. They matched me with ONE verified plumber who showed up same day. No spam, no pressure. This is how it should work.",
    serviceBadge: 'Plumbing',
    initials: 'MG',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    id: 2,
    name: 'David L.',
    location: 'Irvine, CA',
    stars: 5,
    quote:
      "I was skeptical after bad experiences with other platforms. CA BYLDRS connected me with an HVAC tech who was actually licensed and knew the Irvine building codes. Saved me $400 compared to other quotes.",
    serviceBadge: 'HVAC',
    initials: 'DL',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    name: 'Sarah K.',
    location: 'Huntington Beach, CA',
    stars: 5,
    quote:
      "The difference is night and day. With other sites, contractors would show up unannounced. CA BYLDRS let me choose who to talk to, on my schedule. Professional from start to finish.",
    serviceBadge: 'Roofing',
    initials: 'SK',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const contractorTestimonials: Testimonial[] = [
  {
    id: 4,
    name: 'Mike R.',
    location: 'Licensed Plumber, Fullerton',
    stars: 5,
    quote:
      "I was paying $180 per lead on HomeAdvisor and getting garbage. CA BYLDRS sends me actual qualified leads from homeowners who want MY service. Quality over quantity — my close rate went from 15% to 60%.",
    serviceBadge: 'Licensed Plumber',
    initials: 'MR',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    id: 5,
    name: 'James T.',
    location: 'Electrician, Long Beach',
    stars: 5,
    quote:
      "No upfront costs, no monthly minimums, and I only get leads that match my service area and expertise. This is what a fair lead platform looks like. Finally.",
    serviceBadge: 'Electrician',
    initials: 'JT',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 6,
    name: 'Ana P.',
    location: 'Cleaning Business Owner, Santa Ana',
    stars: 5,
    quote:
      "I joined 3 months ago and already have 40+ new clients. The WhatsApp community is also great for networking with other local professionals. CA BYLDRS actually cares about its partners.",
    serviceBadge: 'Cleaning Services',
    initials: 'AP',
    gradient: 'from-emerald-400 to-teal-500',
  },
];

/* ────────────────────────────────────────
   Sub-component: Star Rating
   ──────────────────────────────────────── */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────
   Sub-component: Testimonial Card
   ──────────────────────────────────────── */

function TestimonialCard({
  testimonial,
  isContractor,
}: {
  testimonial: Testimonial;
  isContractor: boolean;
}) {
  return (
    <div className="group min-w-[320px] sm:min-w-[340px] lg:min-w-0 snap-center">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative h-full bg-white dark:bg-neutral-900 rounded-2xl border border-orange-100 dark:border-orange-900/30 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Top accent gradient bar */}
        <div
          className={`h-1 bg-gradient-to-r ${
            isContractor
              ? 'from-teal-400 to-cyan-500'
              : 'from-orange-400 to-amber-500'
          }`}
        />

        <div className="p-6 flex flex-col h-full">
          {/* Quote Icon */}
          <div className="mb-4">
            <Quote
              className={`w-8 h-8 ${
                isContractor
                  ? 'text-teal-300 dark:text-teal-700'
                  : 'text-orange-300 dark:text-orange-700'
              }`}
            />
          </div>

          {/* Star Rating */}
          <StarRating count={testimonial.stars} />

          {/* Quote Text */}
          <p className="mt-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Bottom: Avatar + Info */}
          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
            {/* Avatar with initials */}
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shrink-0 shadow-md`}
            >
              <span className="text-white text-sm font-bold">
                {testimonial.initials}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                {testimonial.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {testimonial.location}
              </p>
            </div>
          </div>

          {/* Service Badge */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                isContractor
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/30'
                  : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-800/30'
              }`}
            >
              {isContractor ? (
                <HardHat className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3" />
              )}
              {testimonial.serviceBadge}
            </span>
          </div>
        </div>

        {/* Hover glow */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
            isContractor
              ? 'shadow-[inset_0_0_30px_rgba(20,184,166,0.08)]'
              : 'shadow-[inset_0_0_30px_rgba(249,115,22,0.08)]'
          }`}
        />
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────
   Main Component
   ──────────────────────────────────────── */

export default function SocialProof() {
  const [activeTab, setActiveTab] = useState<'homeowners' | 'contractors'>(
    'homeowners'
  );

  const isContractor = activeTab === 'contractors';
  const testimonials = isContractor
    ? contractorTestimonials
    : homeownerTestimonials;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/30 to-background" />
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-orange-100/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />

      {/* Decorative floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 right-20 w-2.5 h-2.5 rounded-full bg-orange-300/40 animate-float" />
        <div className="absolute top-32 left-16 w-3 h-3 rounded-full bg-amber-200/30 animate-float-delayed" />
        <div className="absolute bottom-24 right-1/4 w-2 h-2 rounded-full bg-orange-300/30 animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Testimonials</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Trusted by OC &amp; LA Homeowners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real stories from real people who found the right professional —
            and contractors who found the right clients — through CA BYLDRS.
          </p>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={0.15} className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-muted/80 border border-border backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('homeowners')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isContractor
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {!isContractor && (
                <motion.div
                  layoutId="testimonial-tab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Users className="w-4 h-4" />
                Homeowners
              </span>
            </button>
            <button
              onClick={() => setActiveTab('contractors')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isContractor
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isContractor && (
                <motion.div
                  layoutId="testimonial-tab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <HardHat className="w-4 h-4" />
                Contractors
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Testimonial Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Mobile: Horizontal Scroll */}
            <div className="lg:hidden">
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isContractor={isContractor}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: 3-column Grid */}
            <div className="hidden lg:block">
              <StaggerContainer
                className="grid grid-cols-3 gap-6"
                staggerDelay={0.12}
              >
                {testimonials.map((testimonial) => (
                  <StaggerItem key={testimonial.id}>
                    <TestimonialCard
                      testimonial={testimonial}
                      isContractor={isContractor}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Trust Indicator */}
        <AnimatedSection delay={0.3} className="text-center mt-14">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border border-orange-100 dark:border-orange-900/20 shadow-sm">
            <div className="flex -space-x-2">
              {homeownerTestimonials.map((t) => (
                <div
                  key={t.id}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center border-2 border-white dark:border-neutral-900`}
                >
                  <span className="text-white text-[10px] font-bold">
                    {t.initials}
                  </span>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center border-2 border-white dark:border-neutral-900">
                <span className="text-white text-[10px] font-bold">+</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                500+ Happy Customers
              </p>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                  4.9 average rating
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

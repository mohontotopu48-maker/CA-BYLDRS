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
      "After getting flooded with 8 calls from Angi contractors within minutes, I switched to CA BYLDRS. They matched me with ONE verified plumber who showed up same day. No spam, no pressure.",
    serviceBadge: 'Plumbing',
    initials: 'MG',
    gradient: 'from-[#FF6B00] to-[#FF9F1C]',
  },
  {
    id: 2,
    name: 'David L.',
    location: 'Irvine, CA',
    stars: 5,
    quote:
      "I was skeptical after bad experiences with other platforms. CA BYLDRS connected me with an HVAC tech who was actually licensed and knew the Irvine building codes. Saved me $400.",
    serviceBadge: 'HVAC',
    initials: 'DL',
    gradient: 'from-[#FF9F1C] to-[#ef4444]',
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
    gradient: 'from-[#FF6B00] to-[#FF9F1C]',
  },
];

const contractorTestimonials: Testimonial[] = [
  {
    id: 4,
    name: 'Mike R.',
    location: 'Licensed Plumber, Fullerton',
    stars: 5,
    quote:
      "I was paying $180 per lead on HomeAdvisor and getting garbage. CA BYLDRS sends me actual qualified leads from homeowners who want MY service. My close rate went from 15% to 60%.",
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
              : 'fill-[#2a1f14] text-[#2a1f14]'
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
        className="relative h-full bg-[#1a120b] rounded-2xl border border-white/[0.06] shadow-sm hover:shadow-xl hover:shadow-[#FF6B00]/5 hover:border-[#FF6B00]/20 transition-all duration-300 overflow-hidden"
      >
        {/* Top accent gradient bar */}
        <div
          className={`h-1 bg-gradient-to-r ${
            isContractor
              ? 'from-teal-400 to-cyan-500'
              : 'from-[#FF6B00] to-[#FF9F1C]'
          }`}
        />

        <div className="p-6 flex flex-col h-full">
          {/* Quote Icon */}
          <div className="mb-4">
            <Quote
              className={`w-8 h-8 ${
                isContractor
                  ? 'text-teal-500/30'
                  : 'text-[#FF6B00]/30'
              }`}
            />
          </div>

          {/* Star Rating */}
          <StarRating count={testimonial.stars} />

          {/* Quote Text */}
          <p className="mt-4 text-sm sm:text-base text-[#9ba1a6] leading-relaxed flex-1">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Bottom: Avatar + Info */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center gap-3">
            {/* Avatar with initials */}
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shrink-0 shadow-md`}
            >
              <span className="text-white text-sm font-bold">
                {testimonial.initials}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#f0f2f5] truncate">
                {testimonial.name}
              </p>
              <p className="text-xs text-[#9ba1a6] truncate">
                {testimonial.location}
              </p>
            </div>
          </div>

          {/* Service Badge */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                isContractor
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                  : 'bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20'
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0906] via-[#1a120b]/50 to-[#0d0906]" />
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-[#FF9F1C]/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-semibold mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Testimonials</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f2f5] mb-4 tracking-tight">
            Trusted by OC &amp; LA Homeowners
          </h2>
          <p className="text-lg text-[#9ba1a6] max-w-2xl mx-auto leading-relaxed">
            Real stories from real people who found the right professional —
            and contractors who found the right clients — through CA BYLDRS.
          </p>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={0.15} className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#1a120b] border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('homeowners')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isContractor
                  ? 'text-white'
                  : 'text-[#9ba1a6] hover:text-[#f0f2f5]'
              }`}
            >
              {!isContractor && (
                <motion.div
                  layoutId="testimonial-tab"
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] rounded-xl shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
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
                  : 'text-[#9ba1a6] hover:text-[#f0f2f5]'
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
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#1a120b] border border-white/[0.06] shadow-sm">
            <div className="flex -space-x-2">
              {homeownerTestimonials.map((t) => (
                <div
                  key={t.id}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center border-2 border-[#1a120b]`}
                >
                  <span className="text-white text-[10px] font-bold">
                    {t.initials}
                  </span>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9F1C] flex items-center justify-center border-2 border-[#1a120b]">
                <span className="text-white text-[10px] font-bold">+</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#f0f2f5]">
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
                <span className="text-xs text-[#9ba1a6] ml-1">
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

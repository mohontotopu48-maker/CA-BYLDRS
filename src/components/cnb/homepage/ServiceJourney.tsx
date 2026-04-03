'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/lib/router-store';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/cnb/AnimatedSection';
import {
  Search,
  FileText,
  Users,
  Star,
  Calendar,
  CheckCircle2,
  Rocket,
  Shield,
  Settings,
  Bell,
  Briefcase,
  TrendingUp,
  Globe,
  MessageCircle,
  Heart,
  Zap,
  MapPin,
  Phone,
  Clock,
  Award,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react';

/* ────────────────────────────────────────
   Data: Customer Journey Stages
   ──────────────────────────────────────── */

interface Branch {
  icon: LucideIcon;
  label: string;
  color?: string;
}

interface JourneyStage {
  id: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  glowColor: string;
  branches: Branch[];
  stat?: string;
  statLabel?: string;
}

const customerJourney: JourneyStage[] = [
  {
    id: 1,
    icon: Search,
    title: 'Discover',
    subtitle: 'Find CA BYLDRS',
    description:
      'Homeowners find us through Google search, social media ads, our WhatsApp group, or word-of-mouth referrals from neighbors.',
    gradient: 'from-amber-400 to-orange-500',
    glowColor: 'rgba(251, 191, 36, 0.25)',
    branches: [
      { icon: Globe, label: 'Google Search', color: 'text-blue-500' },
      { icon: Zap, label: 'Social Ads', color: 'text-purple-500' },
      { icon: MessageCircle, label: 'WhatsApp', color: 'text-green-500' },
      { icon: Heart, label: 'Referral', color: 'text-rose-500' },
    ],
  },
  {
    id: 2,
    icon: FileText,
    title: 'Submit Request',
    subtitle: 'Tell Us What You Need',
    description:
      'Fill out a simple form — service type, your county and city, urgency level, and a brief description. Takes less than 60 seconds.',
    gradient: 'from-orange-400 to-orange-600',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    branches: [
      { icon: Settings, label: 'Service Type', color: 'text-orange-500' },
      { icon: MapPin, label: 'Location', color: 'text-emerald-500' },
      { icon: Clock, label: 'Urgency', color: 'text-red-500' },
    ],
  },
  {
    id: 3,
    icon: Users,
    title: 'Smart Matching',
    subtitle: 'AI-Powered Verification',
    description:
      'Our system matches your request with verified, licensed professionals in your specific service category and geographic area.',
    gradient: 'from-orange-500 to-amber-600',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    stat: '< 5 min',
    statLabel: 'Average Match Time',
    branches: [
      { icon: Shield, label: 'Licensed Pros', color: 'text-orange-600' },
      { icon: MapPin, label: 'Local Area', color: 'text-emerald-600' },
      { icon: Award, label: 'Top Rated', color: 'text-amber-600' },
    ],
  },
  {
    id: 4,
    icon: Star,
    title: 'Review & Choose',
    subtitle: 'Compare & Decide',
    description:
      'Review matched professionals, compare quotes, read reviews, and choose the expert that feels right for your project.',
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    branches: [
      { icon: FileText, label: 'Compare Quotes', color: 'text-blue-600' },
      { icon: Star, label: 'Read Reviews', color: 'text-amber-500' },
      { icon: Phone, label: 'Ask Questions', color: 'text-green-600' },
    ],
  },
  {
    id: 5,
    icon: Calendar,
    title: 'Book & Schedule',
    subtitle: 'Pick Your Perfect Time',
    description:
      'Schedule your appointment through our booking calendar. Get instant confirmation and preparation tips for your service visit.',
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(239, 68, 68, 0.2)',
    stat: '24h',
    statLabel: 'Confirmation',
    branches: [
      { icon: Calendar, label: 'Pick Date/Time', color: 'text-orange-600' },
      { icon: Bell, label: 'Get Confirmed', color: 'text-blue-500' },
      { icon: FileText, label: 'Prep Tips', color: 'text-purple-500' },
    ],
  },
  {
    id: 6,
    icon: CheckCircle2,
    title: 'Service Complete',
    subtitle: 'Job Done & Reviewed',
    description:
      'Your verified professional completes the work. Rate their service, leave a review, and share your experience with the community.',
    gradient: 'from-emerald-400 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    branches: [
      { icon: ThumbsUp, label: 'Rate Service', color: 'text-green-500' },
      { icon: Star, label: 'Leave Review', color: 'text-amber-500' },
      { icon: Heart, label: 'Share & Refer', color: 'text-rose-500' },
    ],
  },
];

const contractorJourney: JourneyStage[] = [
  {
    id: 1,
    icon: Rocket,
    title: 'Apply to Join',
    subtitle: 'Start Your Partnership',
    description:
      'Licensed contractors and service professionals apply through our partner portal. Quick signup process with basic business info.',
    gradient: 'from-teal-400 to-cyan-500',
    glowColor: 'rgba(20, 184, 166, 0.25)',
    branches: [
      { icon: FileText, label: 'Application Form', color: 'text-teal-500' },
      { icon: Briefcase, label: 'Business Info', color: 'text-blue-500' },
      { icon: Settings, label: 'Service Areas', color: 'text-orange-500' },
    ],
  },
  {
    id: 2,
    icon: Shield,
    title: 'Verification',
    subtitle: 'Trust & Safety Check',
    description:
      'We verify your license, insurance, background, and professional credentials. Only qualified pros make it into our network.',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    stat: '100%',
    statLabel: 'Vetted & Verified',
    branches: [
      { icon: Shield, label: 'License Check', color: 'text-cyan-600' },
      { icon: Award, label: 'Insurance', color: 'text-blue-600' },
      { icon: Users, label: 'Background', color: 'text-purple-600' },
    ],
  },
  {
    id: 3,
    icon: Settings,
    title: 'Profile Setup',
    subtitle: 'Showcase Your Business',
    description:
      'Create a compelling profile with your services, service areas, availability, portfolio photos, and customer reviews.',
    gradient: 'from-blue-400 to-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    branches: [
      { icon: Globe, label: 'Service List', color: 'text-blue-500' },
      { icon: MapPin, label: 'Coverage Map', color: 'text-green-500' },
      { icon: Clock, label: 'Availability', color: 'text-orange-500' },
    ],
  },
  {
    id: 4,
    icon: Bell,
    title: 'Receive Leads',
    subtitle: 'Qualified Job Opportunities',
    description:
      'Get notified of new local leads matching your services and area. Accept or decline based on your schedule and expertise.',
    gradient: 'from-indigo-400 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    stat: '500+',
    statLabel: 'Monthly Leads',
    branches: [
      { icon: Bell, label: 'Push Alerts', color: 'text-indigo-500' },
      { icon: MapPin, label: 'Local Leads', color: 'text-emerald-500' },
      { icon: Zap, label: 'Instant Match', color: 'text-amber-500' },
    ],
  },
  {
    id: 5,
    icon: Briefcase,
    title: 'Deliver Service',
    subtitle: 'Professional Execution',
    description:
      'Connect with the customer, provide quotes, schedule the job, and deliver excellent professional service on-site.',
    gradient: 'from-purple-400 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    branches: [
      { icon: Phone, label: 'Connect', color: 'text-purple-500' },
      { icon: FileText, label: 'Send Quote', color: 'text-blue-500' },
      { icon: CheckCircle2, label: 'Complete Job', color: 'text-green-500' },
    ],
  },
  {
    id: 6,
    icon: TrendingUp,
    title: 'Grow Business',
    subtitle: 'Scale Your Revenue',
    description:
      'Build your reputation with 5-star reviews, gain repeat clients, unlock premium lead tiers, and grow your business sustainably.',
    gradient: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    stat: '3x',
    statLabel: 'Revenue Growth',
    branches: [
      { icon: Star, label: 'Build Reviews', color: 'text-amber-500' },
      { icon: TrendingUp, label: 'Premium Leads', color: 'text-emerald-500' },
      { icon: Users, label: 'Referral Network', color: 'text-blue-500' },
    ],
  },
];

/* ────────────────────────────────────────
   Sub-component: Journey Node Card
   ──────────────────────────────────────── */

function JourneyNode({
  stage,
  index,
  isContractor,
}: {
  stage: JourneyStage;
  index: number;
  isContractor: boolean;
}) {
  const Icon = stage.icon;
  const isLeft = index % 2 === 0;

  return (
    <StaggerItem>
      <div
        className={`flex items-start gap-4 lg:gap-6 ${
          isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}
      >
        {/* Node Card */}
        <div className="flex-1 group">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative bg-card rounded-2xl border border-border shadow-sm overflow-hidden
              transition-shadow duration-300 hover:shadow-xl`}
          >
            {/* Top gradient accent bar */}
            <div
              className={`h-1.5 bg-gradient-to-r ${stage.gradient}`}
            />

            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Step Number + Icon */}
                <div className="relative shrink-0">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 4px 20px ${stage.glowColor}` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-neutral-800 border-2 border-orange-400 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-orange-600">
                      {stage.id}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stage.subtitle}
                  </p>
                </div>

                {/* Stat badge */}
                {stage.stat && (
                  <div className="shrink-0 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200/50 dark:border-orange-800/30">
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400 leading-none">
                      {stage.stat}
                    </p>
                    <p className="text-[10px] text-orange-500 dark:text-orange-400/70 mt-0.5">
                      {stage.statLabel}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {stage.description}
              </p>

              {/* Branch Tags (Mind Map Branches) */}
              <div className="flex flex-wrap gap-2">
                {stage.branches.map((branch, bi) => {
                  const BranchIcon = branch.icon;
                  return (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + bi * 0.08 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 hover:bg-muted border border-border/50 transition-colors group/branch"
                    >
                      <BranchIcon
                        className={`w-3.5 h-3.5 ${
                          branch.color || 'text-orange-500'
                        }`}
                      />
                      <span className="text-xs font-medium text-foreground/80">
                        {branch.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Hover glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              style={{
                boxShadow: `inset 0 0 30px ${stage.glowColor}`,
              }}
            />
          </motion.div>
        </div>

        {/* Connector: visible only on lg+ */}
        <div className="hidden lg:flex flex-col items-center shrink-0 w-16 relative">
          {/* Connecting line */}
          <div className="absolute top-7 w-full">
            <svg
              width="100%"
              height="40"
              viewBox="0 0 64 40"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d={isLeft ? 'M 0 20 Q 32 20 64 20' : 'M 0 20 Q 32 20 64 20'}
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
                className={`text-orange-300 dark:text-orange-700/50`}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              />
              <motion.circle
                cx={isLeft ? 56 : 8}
                cy="20"
                r="4"
                fill="currentColor"
                className="text-orange-400 dark:text-orange-500"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                  delay: 0.5 + index * 0.1,
                }}
              />
            </svg>
          </div>
        </div>

        {/* Center Timeline Dot: visible only on lg+ */}
        <div className="hidden lg:flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 15,
              delay: 0.1 + index * 0.08,
            }}
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-lg relative z-10`}
            style={{
              boxShadow: `0 0 20px ${stage.glowColor}, 0 4px 12px rgba(0,0,0,0.1)`,
            }}
          >
            <span className="text-white font-bold text-lg">{stage.id}</span>
          </motion.div>
          {/* Vertical connecting line to next dot */}
          {index < (isContractor ? contractorJourney : customerJourney).length - 1 && (
            <div className="w-0.5 h-12 bg-gradient-to-b from-orange-300 to-orange-200 dark:from-orange-700/40 dark:to-orange-800/20 mt-2" />
          )}
        </div>
      </div>
    </StaggerItem>
  );
}

/* ────────────────────────────────────────
   Sub-component: Mobile Timeline
   ──────────────────────────────────────── */

function MobileTimeline({
  stages,
  isContractor,
}: {
  stages: JourneyStage[];
  isContractor: boolean;
}) {
  return (
    <div className="lg:hidden relative">
      {/* Vertical center line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-400 to-emerald-400 dark:from-orange-700 dark:via-orange-600 dark:to-emerald-700" />

      <div className="space-y-8">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative pl-16"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                  delay: 0.1 + index * 0.05,
                }}
                className={`absolute left-2.5 top-4 w-7 h-7 rounded-full bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-md z-10`}
              >
                <span className="text-white text-xs font-bold">{stage.id}</span>
              </motion.div>

              {/* Card */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden group">
                <div className={`h-1 bg-gradient-to-r ${stage.gradient}`} />
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-base">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {stage.subtitle}
                      </p>
                    </div>
                    {stage.stat && (
                      <div className="px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 text-xs font-bold">
                        {stage.stat}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {stage.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.branches.map((branch, bi) => {
                      const BranchIcon = branch.icon;
                      return (
                        <div
                          key={bi}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 text-[10px] font-medium text-foreground/70"
                        >
                          <BranchIcon
                            className={`w-3 h-3 ${
                              branch.color || 'text-orange-500'
                            }`}
                          />
                          {branch.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   Main Component
   ──────────────────────────────────────── */

export default function ServiceJourney() {
  const [activeTab, setActiveTab] = useState<'customer' | 'contractor'>(
    'customer'
  );
  const { navigate } = useRouter();

  const isContractor = activeTab === 'contractor';
  const stages = isContractor ? contractorJourney : customerJourney;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/40 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-cyan-100/20 blur-3xl pointer-events-none" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-orange-300/40 animate-float" />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-cyan-300/40 animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 rounded-full bg-orange-200/30 animate-float-slow" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 rounded-full bg-emerald-300/30 animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
            <Zap className="h-4 w-4" />
            <span>Service Journey Map</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            How It All Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See the complete journey — from first discovery to a job well done.
            Whether you&apos;re a homeowner needing service or a contractor looking
            to grow, we&apos;ve mapped out every step.
          </p>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={0.15} className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-muted/80 border border-border backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('customer')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isContractor
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {!isContractor && (
                <motion.div
                  layoutId="journey-tab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Users className="w-4 h-4" />
                Customer Journey
              </span>
            </button>
            <button
              onClick={() => setActiveTab('contractor')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isContractor
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isContractor && (
                <motion.div
                  layoutId="journey-tab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Contractor Journey
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Journey Visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Desktop Mind Map (lg+) */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Center vertical timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
                  <div
                    className={`w-full h-full bg-gradient-to-b ${
                      isContractor
                        ? 'from-teal-300 via-cyan-400 to-emerald-400 dark:from-teal-700 dark:via-cyan-700 dark:to-emerald-700'
                        : 'from-orange-300 via-orange-400 to-emerald-400 dark:from-orange-700 dark:via-orange-600 dark:to-emerald-700'
                    } opacity-50`}
                  />
                </div>

                <StaggerContainer
                  className="space-y-8"
                  staggerDelay={0.12}
                >
                  {stages.map((stage, index) => (
                    <JourneyNode
                      key={stage.id}
                      stage={stage}
                      index={index}
                      isContractor={isContractor}
                    />
                  ))}
                </StaggerContainer>
              </div>
            </div>

            {/* Mobile Timeline */}
            <MobileTimeline
              stages={stages}
              isContractor={isContractor}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="cta-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Users className="w-5 h-5" />
              Get Started as Customer
            </button>
            <button
              onClick={() => navigate('partner')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
              }}
            >
              <Briefcase className="w-5 h-5" />
              Join as Contractor
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router-store';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/cnb/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  TrendingUp,
  MapPin,
  Award,
  CheckCircle2,
  Building2,
  Briefcase,
  ChevronRight,
  Home,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackFormSubmit } from '@/lib/ghl-tracking';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

const SERVICE_CATEGORIES = [
  'Plumbing',
  'Roofing',
  'Cleaning',
  'Pest Control',
  'HVAC',
  'Electrical',
  'Handyman',
  'Painting',
  'Junk Removal',
] as const;

const SERVICE_AREAS = ['Orange County', 'Los Angeles County'] as const;

const YEARS_OPTIONS = [
  { value: '0-2', label: '0 – 2 years' },
  { value: '3-5', label: '3 – 5 years' },
  { value: '6-10', label: '6 – 10 years' },
  { value: '10+', label: '10+ years' },
] as const;

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Receive Qualified Leads',
    description: 'Get connected with homeowners actively looking for your services.',
  },
  {
    icon: MapPin,
    title: 'Grow in OC & LA Counties',
    description: 'Access the two largest home service markets in Southern California.',
  },
  {
    icon: TrendingUp,
    title: 'No Upfront Costs',
    description: 'You only pay for leads that match your service area and expertise.',
  },
  {
    icon: Award,
    title: 'Build Your Reputation',
    description: 'Collect reviews and build trust through our platform.',
  },
];

export default function PartnerPage() {
  const { navigate } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    yearsInBusiness: '',
    notes: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function toggleArea(area: string) {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.companyName || !form.contactName || !form.email || !form.phone) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one service category.');
      return;
    }

    if (selectedAreas.length === 0) {
      toast.error('Please select at least one service area.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceCategories: selectedCategories,
          serviceAreas: selectedAreas,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit application');
      }

      toast.success('Application submitted! We\'ll be in touch soon.');

      // Track form submission in GHL
      trackFormSubmit('partner', {
        company_name: form.companyName,
        contact_name: form.contactName,
        email: form.email,
        phone: form.phone,
        license_number: form.licenseNumber,
        years_in_business: form.yearsInBusiness,
        service_categories: selectedCategories.join(', '),
        service_areas: selectedAreas.join(', '),
      });

      // Reset form
      setForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        yearsInBusiness: '',
        notes: '',
      });
      setSelectedCategories([]);
      setSelectedAreas([]);
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => navigate('home')}
            className="hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Home className="size-3.5" />
            Home
          </button>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">Become a Partner</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Users className="size-5 text-white" />
              <span className="text-sm font-semibold text-white">Contractor Network</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
              Join Our Network
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Licensed local contractors — grow your business with qualified leads
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-600 mb-3">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Why Partner With Us?
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="bg-white rounded-2xl border border-stone-200/70 p-6 h-full hover:shadow-lg hover:border-stone-300/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <b.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 mb-1">{b.title}</h3>
                      <p className="text-stone-500 leading-relaxed text-sm">{b.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="contractor" />

      {/* ── Contractor Signup Form ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-600 mb-3">
                Apply Now
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Contractor Application
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Fill out the form below and our team will review your application within 2 business days.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-stone-200/70 p-6 sm:p-8 md:p-10 space-y-8"
            >
              {/* ── Company Info Row ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="size-4 text-orange-500" />
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Home Services"
                    value={form.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="flex items-center gap-2">
                    <Users className="size-4 text-orange-500" />
                    Contact Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="John Smith"
                    value={form.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ── Contact Info Row ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Briefcase className="size-4 text-orange-500" />
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@acme.com"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Briefcase className="size-4 text-orange-500" />
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (562) 944-0500"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ── Service Categories ── */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="size-4 text-orange-500" />
                  Service Categories
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 text-sm ${
                        selectedCategories.includes(cat)
                          ? 'bg-orange-50 border-orange-300 text-orange-700 font-medium'
                          : 'bg-white border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      <Checkbox
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* ── License & Years Row ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="flex items-center gap-2">
                    <Award className="size-4 text-orange-500" />
                    License Number
                  </Label>
                  <Input
                    id="licenseNumber"
                    placeholder="CA LIC #1234567"
                    value={form.licenseNumber}
                    onChange={(e) => updateField('licenseNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="size-4 text-orange-500" />
                    Years in Business
                  </Label>
                  <Select
                    value={form.yearsInBusiness}
                    onValueChange={(val) => updateField('yearsInBusiness', val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ── Service Areas ── */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <MapPin className="size-4 text-orange-500" />
                  Service Areas
                </Label>
                <div className="flex flex-wrap gap-4">
                  {SERVICE_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <Checkbox
                        checked={selectedAreas.includes(area)}
                        onCheckedChange={() => toggleArea(area)}
                      />
                      <span className="text-stone-700">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Additional Notes ── */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Tell us anything else about your business, certifications, or specialties..."
                  rows={4}
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="resize-none"
                />
              </div>

              {/* ── Submit ── */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto cta-glow bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-6 rounded-xl text-base transition-all duration-300 h-auto cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply to Join
                      <ChevronRight className="size-5 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from '@/lib/router-store';
import { services } from '@/lib/data';
import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
} from 'lucide-react';
import { trackFormSubmit } from '@/lib/ghl-tracking';
import SharedMiniJourney from '@/components/cnb/SharedMiniJourney';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  county: string;
  city: string;
  message: string;
  urgency: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  serviceType: '',
  county: '',
  city: '',
  message: '',
  urgency: '',
};

export default function ContactPage() {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!formData.serviceType) {
      toast.error('Please select a service type.');
      return;
    }
    if (!formData.county) {
      toast.error('Please select your county.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit request.');
      }

      toast.success('Your service request has been submitted successfully! We\'ll be in touch shortly.');
      // Track form submission in GHL
      trackFormSubmit('lead', {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.serviceType,
        county: formData.county,
        city: formData.city,
        urgency: formData.urgency,
      });
      setFormData(initialFormData);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => navigate('home')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Request Service
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Tell us what you need and we&apos;ll connect you with the right verified professional in your area.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mini Journey */}
      <SharedMiniJourney type="customer" />

      {/* Two-column layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Info */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Get in Touch
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Whether you need a plumber, electrician, cleaner, or any other home service professional, we&apos;re here to help. Fill out the form and we&apos;ll match you with a verified local expert.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        <a href="tel:+15629440500" className="hover:text-orange-600 transition-colors">+1 (562) 944-0500</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        <a href="mailto:info.vsualdm@gmail.com" className="hover:text-orange-600 transition-colors">info.vsualdm@gmail.com</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        3400 Twilight Dr. Fullerton, CA 92835
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Mon – Fri: 8:00 AM – 6:00 PM<br />
                        Sat: 9:00 AM – 3:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Side - Form */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            <Card className="shadow-lg border-0 shadow-orange-900/5">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Send className="size-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Service Request Form
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (562) 944-0500"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Service Type & County */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>
                        Service Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(val) => handleChange('serviceType', val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.slug} value={s.slug}>
                              {s.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        County <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.county}
                        onValueChange={(val) => handleChange('county', val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your county" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orange-county">Orange County</SelectItem>
                          <SelectItem value="los-angeles-county">Los Angeles County</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="e.g. Irvine, Anaheim, Long Beach"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Description</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your service needs in detail..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label>Urgency Level</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(val) => handleChange('urgency', val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="within-a-week">Within a Week</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-5 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-auto mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="size-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to be contacted by verified service professionals matched to your request.
                  </p>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

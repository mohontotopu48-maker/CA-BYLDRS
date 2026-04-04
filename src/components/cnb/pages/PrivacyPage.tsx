'use client';

import { useRouter } from '@/lib/router-store';
import { AnimatedSection } from '@/components/cnb/AnimatedSection';
import { Home, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => navigate('home')}
            className="hover:text-[#FF6B00] transition-colors cursor-pointer flex items-center gap-1"
          >
            <Home className="size-3.5" />
            Home
          </button>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">Privacy Policy</span>
        </nav>
      </div>

      {/* ── Content ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-10 text-stone-800 dark:text-stone-200">
              {/* Header */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
                  Privacy Policy
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  Last Updated: January 1, 2025
                </p>
              </div>

              {/* Intro */}
              <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                At CA BYLDRS, we are committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our lead-matching services. Please
                read this policy carefully. By using our services, you consent to the data
                practices described in this policy.
              </p>

              {/* 1. Information We Collect */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  1. Information We Collect
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  We may collect the following types of information when you use our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-stone-600 dark:text-stone-300 pl-2">
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Personal Information:</strong>{' '}
                    Your name, email address, phone number, and physical address when you submit
                    a service request or create an account.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Service Requests:</strong>{' '}
                    Details about the home service you need, including service category, preferred
                    timeline, project description, and any photos or files you upload.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Usage Data:</strong>{' '}
                    Information about how you interact with our website, including pages visited,
                    time spent on pages, browser type, device information, and IP address.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Communication Data:</strong>{' '}
                    Records of communications between you and our team or matched service
                    providers through our platform.
                  </li>
                </ul>
              </div>

              {/* 2. How We Use Your Information */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  2. How We Use Your Information
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-stone-600 dark:text-stone-300 pl-2">
                  <li>
                    To match you with qualified, licensed service providers in your area who can
                    fulfill your home service request.
                  </li>
                  <li>
                    To communicate with you about your service request, application status, and
                    important platform updates.
                  </li>
                  <li>
                    To improve our website, services, and user experience based on usage patterns
                    and feedback.
                  </li>
                  <li>
                    To send you relevant information about our services, promotions, or local
                    service tips (with your consent where required).
                  </li>
                  <li>
                    To detect, prevent, and address fraud, security issues, or violations of our
                    terms of service.
                  </li>
                </ul>
              </div>

              {/* 3. Information Sharing */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  3. Information Sharing
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  We take your privacy seriously and are transparent about how your information
                  may be shared:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-stone-600 dark:text-stone-300 pl-2">
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Service Providers:</strong>{' '}
                    Your service request details (name, contact info, project description) will be
                    shared only with the matched service providers relevant to your request.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Never Sold:</strong>{' '}
                    We will never sell your personal information to third-party marketers,
                    advertisers, or data brokers.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Legal Requirements:</strong>{' '}
                    We may disclose information if required by law, court order, or government
                    regulation.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Service Providers:</strong>{' '}
                    We may share information with trusted third-party services that help us
                    operate our platform (e.g., hosting, email delivery), subject to
                    confidentiality agreements.
                  </li>
                </ul>
              </div>

              {/* 4. Data Security */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  4. Data Security
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  We implement industry-standard security measures to protect your personal
                  information from unauthorized access, alteration, disclosure, or destruction.
                  These measures include encrypted data transmission (SSL/TLS), secure server
                  infrastructure, regular security audits, and restricted access to personal
                  information. While we strive to protect your data, no method of transmission over
                  the Internet or electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </div>

              {/* 5. Your Rights */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  5. Your Rights
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-stone-600 dark:text-stone-300 pl-2">
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Access:</strong>{' '}
                    You may request a copy of the personal information we hold about you.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Correction:</strong>{' '}
                    You may request that we correct any inaccurate or incomplete information.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Deletion:</strong>{' '}
                    You may request that we delete your personal information, subject to certain
                    legal exceptions.
                  </li>
                  <li>
                    <strong className="text-stone-800 dark:text-stone-200">Opt-Out:</strong>{' '}
                    You may opt out of marketing communications at any time by clicking the
                    unsubscribe link in our emails or contacting us directly.
                  </li>
                </ul>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  To exercise any of these rights, please contact us using the information
                  provided below. We will respond to your request within 30 days.
                </p>
              </div>

              {/* 6. Contact Us */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                  6. Contact Us
                </h2>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  If you have any questions, concerns, or requests regarding this Privacy Policy
                  or our data practices, please reach out to us:
                </p>
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-6 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  <p>
                    <strong className="text-stone-900 dark:text-stone-100">CA BYLDRS</strong>
                  </p>
                  <p>Email: privacy@cabyldrs.com</p>
                  <p>Address: 3400 Twilight Dr. Fullerton, CA 92835, United States</p>
                  <p>Phone: +1 (562) 944-0500</p>
                </div>
              </div>

              {/* Closing */}
              <p className="text-base leading-relaxed text-stone-500 dark:text-stone-400 pt-4 border-t border-stone-200 dark:border-stone-700">
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated &quot;Last Updated&quot; date. Your continued use of our
                services after changes are posted constitutes your acceptance of the revised
                policy.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

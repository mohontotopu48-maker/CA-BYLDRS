'use client';

import { Phone, Mail, MapPin, ChevronRight, Shield, Clock, Users } from 'lucide-react';
import { useRouter } from '@/lib/router-store';
import { footerLinks } from '@/lib/data';

export function Footer() {
  const { navigate } = useRouter();

  const handleNav = (href: string) => {
    navigate(href as any);
  };

  return (
    <footer className="bg-[#050608] text-[#9ba1a6]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="relative inline-flex">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#FF7B00] to-[#FF9F1C] opacity-30 blur-md" />
              <img
                src="https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png"
                alt="CA BYLDRS Logo"
                width={192} height={64}
                className="relative h-16 w-auto object-contain rounded-lg brightness-0 invert"
              />
            </div>
            <p className="text-sm text-[#9ba1a6] mb-6 leading-relaxed">
              Connecting Orange County &amp; Los Angeles County homeowners with verified, licensed local professionals. Built for trust, speed, and quality service matching.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#9ba1a6]">
                <MapPin className="h-4 w-4 text-[#FF7B00] shrink-0" />
                <span>Serving all of Orange &amp; LA Counties</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9ba1a6]">
                <Phone className="h-4 w-4 text-[#FF7B00] shrink-0" />
                <a href="tel:+15629440500" className="hover:text-[#FF7B00] transition-colors">+1 (562) 944-0500</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9ba1a6]">
                <MapPin className="h-4 w-4 text-[#FF7B00] shrink-0" />
                <span>3400 Twilight Dr. Fullerton, CA 92835</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9ba1a6]">
                <Mail className="h-4 w-4 text-[#FF7B00] shrink-0" />
                <a href="mailto:info.vsualdm@gmail.com" className="hover:text-[#FF7B00] transition-colors">info.vsualdm@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-[#f0f2f5] font-semibold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-[#9ba1a6] hover:text-[#FF7B00] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="text-[#f0f2f5] font-semibold text-sm uppercase tracking-wider mb-5">
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-[#9ba1a6] hover:text-[#FF7B00] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-[#f0f2f5] font-semibold text-sm uppercase tracking-wider mt-8 mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-[#9ba1a6] hover:text-[#FF7B00] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & CTA Column */}
          <div>
            <h3 className="text-[#f0f2f5] font-semibold text-sm uppercase tracking-wider mb-5">
              Why Homeowners Trust Us
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#FF7B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#f0f2f5] font-medium">Licensed &amp; Verified</p>
                  <p className="text-xs text-[#9ba1a6]">Every pro is background-checked</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#FF7B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#f0f2f5] font-medium">Fast Response</p>
                  <p className="text-xs text-[#9ba1a6]">Quick matching &amp; follow-up</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#FF7B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#f0f2f5] font-medium">Local Matching</p>
                  <p className="text-xs text-[#9ba1a6]">County-based service matching</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNav('partner')}
              className="w-full bg-gradient-to-r from-[#FF7B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF7B00] text-white text-sm font-semibold py-3 px-5 rounded-xl transition-all cta-glow"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9ba1a6]">
            &copy; {new Date().getFullYear()} CA BYLDRS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="text-xs text-[#9ba1a6] hover:text-[#f0f2f5] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('terms')}
              className="text-xs text-[#9ba1a6] hover:text-[#f0f2f5] transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

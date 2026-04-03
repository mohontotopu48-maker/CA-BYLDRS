'use client';

import { useEffect } from 'react';
import { RouterProvider, useRouter, parsePageKey } from '@/lib/router-store';
import { Navbar } from '@/components/cnb/Navbar';
import { Footer } from '@/components/cnb/Footer';

// Homepage sections
import HeroSection from '@/components/cnb/homepage/HeroSection';
import TrustBar from '@/components/cnb/homepage/TrustBar';
import ServicesGrid from '@/components/cnb/homepage/ServicesGrid';
import ServiceJourney from '@/components/cnb/homepage/ServiceJourney';
import WhyChooseUs from '@/components/cnb/homepage/WhyChooseUs';
import CountyCoverage from '@/components/cnb/homepage/CountyCoverage';
import HighIntentCTA from '@/components/cnb/homepage/HighIntentCTA';
import ContractorCTA from '@/components/cnb/homepage/ContractorCTA';
import BookingCalendar from '@/components/cnb/homepage/BookingCalendar';

// Inner pages
import ServicePage from '@/components/cnb/pages/ServicePage';
import ServicesOverviewPage from '@/components/cnb/pages/ServicesOverviewPage';
import CountyPage from '@/components/cnb/pages/CountyPage';
import CountyServicePage from '@/components/cnb/pages/CountyServicePage';
import AboutPage from '@/components/cnb/pages/AboutPage';
import ContactPage from '@/components/cnb/pages/ContactPage';
import EmergencyPage from '@/components/cnb/pages/EmergencyPage';
import PartnerPage from '@/components/cnb/pages/PartnerPage';
import PrivacyPage from '@/components/cnb/pages/PrivacyPage';
import TermsPage from '@/components/cnb/pages/TermsPage';
import { WhatsAppButton } from '@/components/cnb/WhatsAppButton';

function BookingPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    navigate('home');
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [navigate]);

  return <HomePage />;
}

function JourneyPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    navigate('home');
    setTimeout(() => {
      const el = document.getElementById('journey-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [navigate]);

  return <HomePage />;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <div id="journey-section">
        <ServiceJourney />
      </div>
      <WhyChooseUs />
      <CountyCoverage />
      <div id="booking-section">
        <BookingCalendar />
      </div>
      <HighIntentCTA />
      <ContractorCTA />
    </>
  );
}

function PageRouter() {
  const { currentPage } = useRouter();
  const parsed = parsePageKey(currentPage);

  switch (parsed.type) {
    case 'service':
      return <ServicePage slug={parsed.slug} />;
    case 'county-service':
      return (
        <CountyServicePage
          countySlug={parsed.countySlug}
          serviceSlug={parsed.serviceSlug}
        />
      );
    case 'page':
      switch (parsed.key) {
        case 'home':
          return <HomePage />;
        case 'services':
          return <ServicesOverviewPage />;
        case 'orange-county':
          return <CountyPage slug="orange-county" />;
        case 'los-angeles-county':
          return <CountyPage slug="los-angeles-county" />;
        case 'about':
          return <AboutPage />;
        case 'contact':
          return <ContactPage />;
        case 'emergency':
          return <EmergencyPage />;
        case 'partner':
          return <PartnerPage />;
        case 'privacy':
          return <PrivacyPage />;
        case 'terms':
          return <TermsPage />;
        case 'booking':
          return <BookingPage />;
        case 'journey':
          return <JourneyPage />;
        default:
          return <HomePage />;
      }
    default:
      return <HomePage />;
  }
}

export default function Home() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </RouterProvider>
  );
}

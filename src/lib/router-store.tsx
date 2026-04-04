'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { trackPageView } from '@/lib/ghl-tracking';

export type PageKey =
  | 'home'
  | 'services'
  | `service/${string}`
  | 'orange-county'
  | 'los-angeles-county'
  | `county/${string}/service/${string}`
  | 'about'
  | 'contact'
  | 'emergency'
  | 'partner'
  | 'journey'
  | 'booking'
  | 'privacy'
  | 'terms';

interface NavigateOptions {
  scroll?: boolean;
}

interface RouterState {
  currentPage: PageKey;
  navigate: (page: PageKey, options?: NavigateOptions) => void;
  goBack: () => void;
  history: PageKey[];
}

const RouterContext = createContext<RouterState | null>(null);

/* Map page keys to human-readable titles for GHL tracking */
const pageTitles: Record<string, string> = {
  home: 'Home',
  services: 'All Services',
  'orange-county': 'Orange County Services',
  'los-angeles-county': 'Los Angeles County Services',
  about: 'About CA BYLDRS',
  contact: 'Request Service',
  emergency: 'Emergency Help',
  partner: 'Become a Partner',
  journey: 'How It Works',
  booking: 'Book Appointment',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

function getPageTitle(key: string): string {
  if (pageTitles[key]) return pageTitles[key];
  if (key.startsWith('service/')) {
    const slug = key.replace('service/', '');
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  if (key.includes('county/') && key.includes('/service/')) {
    const parts = key.replace('county/', '').split('/service/');
    const county = parts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const service = parts[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `${service} in ${county}`;
  }
  return 'CA BYLDRS';
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [history, setHistory] = useState<PageKey[]>(['home']);

  const navigate = useCallback((page: PageKey, options?: NavigateOptions) => {
    setCurrentPage(page);
    setHistory((prev) => [...prev, page]);

    // Only scroll to top if not explicitly disabled (e.g. for section scroll)
    if (options?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Track virtual pageview in GHL
    trackPageView(page, getPageTitle(page));
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        const prevPage = newHistory[newHistory.length - 1];
        setCurrentPage(prevPage);

        // Track virtual pageview in GHL
        trackPageView(prevPage, getPageTitle(prevPage));

        return newHistory;
      }
      setCurrentPage('home');
      trackPageView('home', 'Home');
      return ['home'];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Track initial page load
  useEffect(() => {
    trackPageView('home', 'Home');
  }, []);

  // Listen for browser back button
  useEffect(() => {
    const handlePopState = () => {
      goBack();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [goBack]);

  return (
    <RouterContext.Provider value={{ currentPage, navigate, goBack, history }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function parsePageKey(key: PageKey) {
  if (key.startsWith('service/')) {
    return { type: 'service' as const, slug: key.replace('service/', '') };
  }
  if (key.startsWith('county/') && key.includes('/service/')) {
    const parts = key.replace('county/', '').split('/service/');
    return { type: 'county-service' as const, countySlug: parts[0], serviceSlug: parts[1] };
  }
  return { type: 'page' as const, key };
}

'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

type PageKey =
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
  | 'privacy'
  | 'terms';

interface RouterState {
  currentPage: PageKey;
  navigate: (page: PageKey) => void;
  goBack: () => void;
  history: PageKey[];
}

const RouterContext = createContext<RouterState | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [history, setHistory] = useState<PageKey[]>(['home']);

  const navigate = useCallback((page: PageKey) => {
    setCurrentPage(page);
    setHistory((prev) => [...prev, page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        setCurrentPage(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      setCurrentPage('home');
      return ['home'];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

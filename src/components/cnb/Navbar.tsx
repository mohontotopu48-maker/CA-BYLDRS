'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useRouter } from '@/lib/router-store';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { currentPage, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    navigate(href as any);
    setMobileOpen(false);
  };

  const isHome = currentPage === 'home';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-sm border-b border-orange-100/50 dark:border-orange-900/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-orange-300/50 transition-shadow">
              <span className="text-white font-black text-lg leading-none">CN</span>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-bold text-base leading-tight transition-colors',
                  scrolled || !isHome ? 'text-foreground' : 'text-white'
                )}
              >
                California
              </span>
              <span
                className={cn(
                  'font-semibold text-xs leading-tight transition-colors',
                  scrolled || !isHome ? 'text-orange-600 dark:text-orange-400' : 'text-orange-200'
                )}
              >
                Next Builder
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  'px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  currentPage === link.href
                    ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : scrolled || !isHome
                    ? 'text-foreground/70 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNav('emergency')}
              className={cn(
                'gap-1.5',
                scrolled || !isHome ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-white hover:bg-white/10'
              )}
            >
              <Phone className="h-4 w-4" />
              Emergency
            </Button>
            <Button
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg cta-glow transition-all"
            >
              Request Service
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNav('emergency')}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    scrolled || !isHome ? 'text-foreground' : 'text-white'
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white font-black text-base leading-none">CN</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">California Next Builder</p>
                        <p className="text-xs text-muted-foreground">Trusted Local Home Services</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNav(link.href)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all',
                          currentPage === link.href
                            ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                        )}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border space-y-3">
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleNav('emergency')}
                    >
                      <Phone className="h-4 w-4" />
                      Emergency Help
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      onClick={() => handleNav('contact')}
                    >
                      Request Service
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

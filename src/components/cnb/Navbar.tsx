'use client';

import { useState, useEffect } from 'react';
import { Menu, Phone, ChevronRight } from 'lucide-react';
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
    navigate(href as import('@/lib/router-store').PageKey);
    setMobileOpen(false);
  };

  const isHome = currentPage === 'home';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-gradient-to-r from-[#1a120b]/95 to-[#2a1f14]/95 backdrop-blur-xl shadow-sm border-b border-white/[0.06]'
          : 'bg-gradient-to-r from-[#1a120b] to-[#2a1f14]'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center group"
          >
            <img
              src="/logo.png"
              alt="CA BYLDRS Logo"
              width={48} height={48}
              className="h-10 lg:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.href;
              const isHowItWorks = link.href === 'journey';

              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
                      : isHowItWorks
                      ? 'border-2 border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300'
                      : 'text-white/80 hover:text-white hover:bg-white/[0.05]'
                  )}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNav('contact')}
              className="gap-1.5 text-white/80 hover:text-white hover:bg-white/[0.05]"
            >
              <Phone className="h-4 w-4" />
              +1 562-944-0500
            </Button>
            <Button
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF6B00] text-white shadow-md hover:shadow-lg cta-glow transition-all"
            >
              Get Free Quotes
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNav('contact')}
              className="text-[#FF6B00] hover:bg-[#FF6B00]/10"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/[0.05]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-[#1a120b] border-white/[0.06]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <img
                        src="/logo.png"
                        alt="CA BYLDRS Logo"
                        width={48} height={48}
                        className="h-12 w-auto object-contain drop-shadow-lg"
                      />
                      <div>
                        <p className="font-bold text-sm text-white">CA BYLDRS</p>
                        <p className="text-xs text-[#9ba1a6]">Trusted Local Home Services</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navLinks.map((link) => {
                      const isActive = currentPage === link.href;
                      const isHowItWorks = link.href === 'journey';

                      return (
                        <button
                          key={link.href}
                          onClick={() => handleNav(link.href)}
                          className={cn(
                            'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all',
                            isActive
                              ? 'bg-[#FF6B00] text-white'
                              : isHowItWorks
                              ? 'border-2 border-red-500 text-red-400 hover:bg-red-500/10'
                              : 'text-[#9ba1a6] hover:text-white hover:bg-white/[0.05]'
                          )}
                        >
                          {link.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-white/[0.06] space-y-3">
                    <a
                      href="tel:+15629440500"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.06] text-sm font-medium text-white hover:bg-white/[0.05] transition-all"
                    >
                      <Phone className="h-4 w-4" />
                      +1 562-944-0500
                    </a>
                    <Button
                      className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] hover:from-[#FF9F1C] hover:to-[#FF6B00] text-white"
                      onClick={() => handleNav('contact')}
                    >
                      Get Free Quotes
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

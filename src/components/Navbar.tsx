import React, { useState } from 'react';
import { PageView } from '../types';
import { Sun, Moon, Menu, X, User, Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenTrialModal: () => void;
  onOpenAuthModal: () => void;
  onOpenAdmin: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenTrialModal,
  onOpenAuthModal,
  onOpenAdmin,
  theme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Overview', page: 'home' },
    { label: 'Programs', page: 'programs' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'Transformations', page: 'transformations' },
    { label: 'Membership', page: 'membership' },
    { label: 'Schedule', page: 'schedule' },
    { label: 'Coach', page: 'about' },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-neutral-950/90 dark:bg-neutral-950/90 light:bg-white/90 border-b border-neutral-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase">
            Raqib Aalam
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`relative py-1 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-300" />}
          </button>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-400 hover:text-neutral-950 hover:bg-amber-400 bg-neutral-900 border border-amber-400/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Open Admin Control Center"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Panel</span>
          </button>

          <button
            onClick={onOpenAuthModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5" />
            <span>Member Portal</span>
          </button>

          <button
            onClick={onOpenTrialModal}
            className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-amber-500/20"
          >
            Claim 1-Day Pass
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800/80 bg-neutral-950 px-4 py-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-amber-400 font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-900/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 mt-2 border-t border-neutral-900 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-bold text-amber-400 bg-neutral-900 hover:bg-neutral-800 border border-amber-400/30"
              >
                Admin Panel Command
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800"
              >
                Member Portal Access
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300"
              >
                Claim 1-Day Trial Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

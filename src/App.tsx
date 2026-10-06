import React, { useState, useEffect } from 'react';
import { PageView, Program } from './types';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProgramsView } from './views/ProgramsView';
import { MembershipView } from './views/MembershipView';
import { TransformationsView } from './views/TransformationsView';
import { FacilitiesView } from './views/FacilitiesView';
import { ScheduleView } from './views/ScheduleView';
import { ContactView } from './views/ContactView';
import { PortalView } from './views/PortalView';
import { AdminView } from './views/AdminView';
import { TrialModal } from './components/TrialModal';
import { AuthModal } from './components/AuthModal';
import { ProgramModal } from './components/ProgramModal';
import { LegalModal } from './views/LegalModal';

function AppContent() {
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState<string | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Initialize theme from localStorage or default dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('raqib_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('raqib_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    showToast({
      type: 'info',
      title: `${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode Enabled`,
    });
  };

  const handleOpenTrial = (programTitle?: string) => {
    setPreselectedProgram(programTitle);
    setTrialModalOpen(true);
  };

  const handleLoginSuccess = (name: string, email: string) => {
    setCurrentUser({ name, email });
    setCurrentPage('portal');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been safely signed out of your athlete portal.'
    });
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-400 ${
      theme === 'dark' 
        ? 'bg-neutral-950 text-neutral-100' 
        : 'bg-neutral-900 text-neutral-100'
    }`}>
      {/* Top Bar strictly obeying Top Bar Contract (hidden on dedicated admin page for fullscreen command) */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenTrialModal={() => handleOpenTrial()}
          onOpenAuthModal={() => {
            if (currentUser) {
              navigateTo('portal');
            } else {
              setAuthModalOpen(true);
            }
          }}
          onOpenAdmin={() => navigateTo('admin')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {currentPage === 'admin' && (
          <AdminView onBackToWebsite={() => navigateTo('home')} />
        )}
        {currentPage === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onOpenTrialModal={handleOpenTrial}
            onOpenProgramModal={(prog) => setSelectedProgram(prog)}
          />
        )}
        {currentPage === 'about' && (
          <AboutView onOpenTrialModal={() => handleOpenTrial('Coach Raqib Consultation')} />
        )}
        {currentPage === 'programs' && (
          <ProgramsView
            onOpenProgramModal={(prog) => setSelectedProgram(prog)}
            onOpenTrialModal={handleOpenTrial}
          />
        )}
        {currentPage === 'membership' && (
          <MembershipView onOpenTrialModal={handleOpenTrial} />
        )}
        {currentPage === 'transformations' && (
          <TransformationsView onOpenTrialModal={() => handleOpenTrial('Transformation Trial')} />
        )}
        {currentPage === 'facilities' && (
          <FacilitiesView onOpenTrialModal={() => handleOpenTrial('Floor Pass')} />
        )}
        {currentPage === 'schedule' && (
          <ScheduleView onOpenTrialModal={() => handleOpenTrial('Class Pass')} />
        )}
        {currentPage === 'contact' && (
          <ContactView onOpenTrialModal={() => handleOpenTrial('Contact Inquiry')} />
        )}
        {currentPage === 'portal' && (
          <PortalView
            userName={currentUser?.name || 'Karanveer Malhotra'}
            userEmail={currentUser?.email || 'karanveer.m@outlook.com'}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Quiet Footer (hidden on admin page) */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
          onOpenLegal={(type) => setLegalType(type)}
        />
      )}

      {/* Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        preselectedProgram={preselectedProgram}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onBookPass={(title) => handleOpenTrial(title)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

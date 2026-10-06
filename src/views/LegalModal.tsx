import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative text-neutral-100 max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Legal Document</span>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-4">
          {type === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Membership'}
        </h2>

        {type === 'privacy' ? (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            <p>
              At Raqib Aalam Athletic Club & Performance (&quot;Club&quot;, &quot;we&quot;, &quot;our&quot;), we treat your physiological and biometric data with medical-grade discretion. This policy outlines how information gathered through our InBody 770 composition analyzers, membership registrations, and coaching forms is stored.
            </p>
            <h4 className="text-white font-semibold text-sm">1. Biometric & Health Data</h4>
            <p>
              Biometric metrics including body mass, visceral fat indices, skeletal muscle mass, and ultrasound skinfold recordings are collected exclusively for programming your periodized strength and nutrition regimens. This data is never sold, leased, or transmitted to third-party advertisers.
            </p>
            <h4 className="text-white font-semibold text-sm">2. Video & Movement Screening</h4>
            <p>
              Lifting videos recorded on the gym floor for barbell bar-path velocity analysis are retained securely and only viewed by Coach Raqib Aalam and his certified coaching staff.
            </p>
            <h4 className="text-white font-semibold text-sm">3. Communications</h4>
            <p>
              Phone and WhatsApp contact details are used strictly for appointment reminders, emergency gym announcements, and weekly nutrition check-ins. You may opt out at any time.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            <p>
              Welcome to Raqib Aalam Athletic Club. By using our training facilities, enrolling in programs, or attending trial sessions, you agree to comply with our athletic standards:
            </p>
            <h4 className="text-white font-semibold text-sm">1. Facility Etiquette & Safety</h4>
            <p>
              All members are required to re-rack calibrated Eleiko plates and dumbbells immediately following set completion. Chalk is provided and encouraged, but liquid spillages must be sanitized.
            </p>
            <h4 className="text-white font-semibold text-sm">2. Physical Readiness</h4>
            <p>
              Members confirm they have received medical clearance for high-intensity resistance training. A signed Physical Activity Readiness Questionnaire (PAR-Q) is mandatory prior to using the barbell platforms or 4°C cold plunge suite.
            </p>
            <h4 className="text-white font-semibold text-sm">3. Membership Freezes & Cancellations</h4>
            <p>
              Memberships can be frozen according to plan terms (up to 21 days for Quarterly and 60 days for Annual). Refunds are governed by our 14-day transition policy.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PageView } from '../types';
import { MapPin, Phone, Mail, Instagram, Youtube, Send, Check } from 'lucide-react';
import { useToast } from './Toast';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast({
        type: 'error',
        title: 'Valid email required',
        message: 'Please provide a valid email to receive weekly training notes.'
      });
      return;
    }
    setIsSubscribed(true);
    showToast({
      type: 'success',
      title: 'Subscribed to Coach Raqib’s Field Notes',
      message: 'Weekly biomechanics breakdown & nutrition insights delivered to your inbox.'
    });
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display font-black text-2xl text-white tracking-tight uppercase">
              Raqib Aalam
            </span>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              India’s high-performance strength and body transformation institution. Dedicated to Olympic barbell mechanics, periodized hypertrophy, metabolic recomposition, and elite physical conditioning.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp Club Desk</span>
              </a>
            </div>
          </div>

          {/* Nav Col */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-200">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors cursor-pointer">
                  Training Programs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-white transition-colors cursor-pointer">
                  Floor & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('transformations')} className="hover:text-white transition-colors cursor-pointer">
                  Case Studies & Proof
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-white transition-colors cursor-pointer">
                  Membership Tiers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('schedule')} className="hover:text-white transition-colors cursor-pointer">
                  Weekly Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-200">Flagship Clubs</p>
            <div className="space-y-3 text-xs text-neutral-400 leading-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-300 block">Delhi NCR</strong>
                  <span>M-Block, Greater Kailash II, New Delhi</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-300 block">Mumbai</strong>
                  <span>Pali Hill, Bandra West, Mumbai</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>concierge@raqibaalam.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Field Notes */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-200">Coach’s Field Notes</p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated Sunday email detailing biomechanical cues, protein syntheses, and strength periodization.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded text-xs font-bold flex items-center justify-center transition-colors"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[11px] text-neutral-500 block">Zero spam. Unsubscribe at any time.</span>
            </form>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-12 mt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Raqib Aalam Athletic Club & Performance. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <span>Made for Serious Athletes in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

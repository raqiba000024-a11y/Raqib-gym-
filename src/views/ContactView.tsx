import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '../components/Toast';

interface ContactViewProps {
  onOpenTrialModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenTrialModal }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Delhi NCR (Greater Kailash II)',
    inquiryType: 'Personal Training Mentorship',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = '10-digit phone number is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details on your background or goals';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast({
        type: 'success',
        title: 'Inquiry Dispatched!',
        message: 'Coach Raqib’s concierge will reach out within 4 business hours via WhatsApp & phone.'
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <span>Concierge & Inquiries</span>
          <span aria-hidden="true">·</span>
          <span>India Flagships</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          Connect with the Performance Desk
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Whether you are seeking direct 1-on-1 mentorship with Coach Raqib, corporate team conditioning, or a tour of our Olympic barbell platforms, our team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-display font-bold text-2xl text-white">Send Direct Message</h3>
              <p className="text-xs text-neutral-400">
                Fields indicated with <span className="text-amber-400">*</span> are mandatory for scheduling consultations.
              </p>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Singhania"
                  className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@corp.in"
                    className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone / WhatsApp <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Flagship Branch</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Delhi NCR (Greater Kailash II)">Delhi NCR (Greater Kailash II)</option>
                    <option value="Mumbai (Bandra West)">Mumbai (Bandra West)</option>
                    <option value="Bengaluru (Indiranagar)">Bengaluru (Indiranagar)</option>
                    <option value="Global Online Mentorship">Global Online Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Inquiry Focus</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Personal Training Mentorship">Coach Raqib 1-on-1 Mentorship</option>
                    <option value="Pro Performance Membership">Pro Performance Club Membership</option>
                    <option value="Corporate Executive Wellness">Corporate Executive Wellness</option>
                    <option value="Post-Rehab / Medical Physio">Post-Injury Rehabilitation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Goals, History & Training Timeline <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your current training routine, injury history, and what you aim to achieve in the next 12 weeks..."
                  className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-50 shadow-md shadow-amber-500/20"
              >
                {loading ? 'Transmitting to Concierge...' : 'Submit Inquiry'}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Responses strictly handled within 4 business hours</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h3 className="font-display font-bold text-2xl text-white">Inquiry Received</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, {formData.name}. Coach Raqib’s team has received your details and will get in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          )}
        </div>

        {/* Right Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Connect */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Direct Fast Track
            </span>
            <h4 className="font-display font-bold text-xl text-white">WhatsApp Club Desk</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Prefer instant messaging? Chat directly with Coach Raqib’s concierge for live trial slot availability and membership inquiries.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Raqib%20Aalam%20Club,%20I%20am%20interested%20in%20a%20consultation"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors"
            >
              <span>Message +91 98765 43210</span>
            </a>
          </div>

          {/* Physical Locations */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h4 className="font-display font-bold text-xl text-white">Physical Flagships in India</h4>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">New Delhi (Flagship)</strong>
                  <span className="text-neutral-400">M-24, Main Commercial Complex, Greater Kailash II, New Delhi - 110048</span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">Ph: +91 11 4982 3000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Mumbai</strong>
                  <span className="text-neutral-400">Level 3, The Titanium Centre, Perry Cross Road, Bandra West, Mumbai - 400050</span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">Ph: +91 22 6120 4000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Bengaluru</strong>
                  <span className="text-neutral-400">100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038</span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">Ph: +91 80 4390 1000</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4 text-neutral-500" />
                <span>concierge@raqibaalam.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>Mon - Sat: 05:30 - 22:30 | Sun: 07:00 - 20:00</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

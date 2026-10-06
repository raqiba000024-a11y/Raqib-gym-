import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useToast } from './Toast';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, preselectedProgram }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'Delhi NCR (Greater Kailash II)',
    slot: 'Morning (06:00 - 10:00 AM)',
    goal: preselectedProgram || 'Strength & Hypertrophy',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = '10-digit mobile number required (+91)';
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
        title: 'Trial Pass Confirmed!',
        message: `Welcome, ${formData.name}. Your pass has been sent via SMS & WhatsApp.`
      });
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-modal-title"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-neutral-100"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Complimentary Pass
              </span>
              <h2 id="trial-modal-title" className="font-display font-extrabold text-2xl text-white mt-1">
                Claim Your 1-Day Performance Pass
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Experience the Eleiko platforms, coaching oversight, InBody 770 composition assessment, and Finnish sauna. No payment details required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Malhotra"
                  className={`w-full bg-neutral-950 border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@example.com"
                    className={`w-full bg-neutral-950 border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Phone Number (WhatsApp) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-neutral-950 border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Flagship Club
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Delhi NCR (Greater Kailash II)">Delhi NCR (Greater Kailash II)</option>
                    <option value="Mumbai (Bandra West)">Mumbai (Bandra West)</option>
                    <option value="Bengaluru (Indiranagar)">Bengaluru (Indiranagar)</option>
                    <option value="Global Digital Mentorship">Global Digital Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Early Bird (06:00 - 08:30 AM)">Early Bird (06:00 - 08:30 AM)</option>
                    <option value="Mid-Day (11:00 AM - 02:00 PM)">Mid-Day (11:00 AM - 02:00 PM)</option>
                    <option value="Prime Evening (05:30 - 08:30 PM)">Prime Evening (05:30 - 08:30 PM)</option>
                    <option value="Night Owl (08:30 - 10:30 PM)">Night Owl (08:30 - 10:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Primary Transformation Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Strength & Hypertrophy">Strength & Hypertrophy (Muscle Gain)</option>
                  <option value="Metabolic Fat Loss">Metabolic Recomposition & Fat Loss</option>
                  <option value="1-on-1 Raqib Mentorship">Direct 1-on-1 Raqib Mentorship</option>
                  <option value="Posture & Rehab">Postural Correction & Spinal Rehab</option>
                  <option value="Athletic Speed">Athletic Speed & Turf Conditioning</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md shadow-amber-500/20"
                >
                  {loading ? 'Confirming Your Pass...' : 'Confirm Free 1-Day Pass'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero obligations · 100% complimentary · Strict privacy</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">Pass Activated!</h3>
            <p className="text-sm text-neutral-300 mt-2">
              Your 1-Day Performance Pass for <span className="text-white font-medium">{formData.name}</span> has been confirmed.
            </p>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 my-6 text-left text-xs space-y-2 text-neutral-400">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-neutral-200 font-medium">{formData.branch}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Window:</span>
                <span className="text-neutral-200 font-medium">{formData.slot}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Lead:</span>
                <span className="text-amber-400 font-semibold">Coach Raqib Floor Team</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919876543210?text=Hi%20Coach%20Raqib,%20I%20just%20claimed%20my%201-Day%20Pass%20for%20${encodeURIComponent(formData.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Notify via WhatsApp</span>
              </a>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

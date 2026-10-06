import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useToast } from './Toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('karanveer.m@outlook.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({
        type: 'error',
        title: 'Missing credentials',
        message: 'Please provide both email and password to continue.'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const memberName = tab === 'register' && name ? name : 'Karanveer Malhotra';
      onLoginSuccess(memberName, email);
      showToast({
        type: 'success',
        title: tab === 'login' ? 'Welcome back, Athlete!' : 'Member Profile Created!',
        message: 'Logged into the Raqib Aalam Athlete Dashboard.'
      });
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-neutral-100"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
            Raqib Aalam Club
          </span>
          <p className="text-xs text-neutral-400 mt-1">
            {tab === 'login' ? 'Access your training logs, check-ins & macro sheets' : 'Begin your journey with Raqib Aalam Athletic Club'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-950 p-1 rounded-xl mb-6 border border-neutral-800">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              tab === 'login' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Member Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              tab === 'register' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karanveer Malhotra"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@example.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {tab === 'login' && (
            <div className="text-[11px] text-neutral-400 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
              <span className="text-amber-400 font-semibold">Demo Member:</span> Click submit to sign into sample athlete dashboard (Karanveer Malhotra, Pro Performance).
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Dashboard' : 'Create Member Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

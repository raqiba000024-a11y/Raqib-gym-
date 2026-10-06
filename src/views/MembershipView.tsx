import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/gymData';
import { Check, ShieldCheck, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface MembershipViewProps {
  onOpenTrialModal: (planName?: string) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onOpenTrialModal }) => {
  const [cycle, setCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');

  const comparisonRows = [
    { feature: 'Olympic Eleiko Platforms & Barbells', standard: true, pro: true, vip: true },
    { feature: '30-Meter Indoor Sprint Turf & Sleds', standard: true, pro: true, vip: true },
    { feature: 'Cardio Loft & Concept2 Rowers', standard: true, pro: true, vip: true },
    { feature: 'Clinical InBody 770 Composition Scan', standard: 'Monthly', pro: 'Bi-Weekly', vip: 'Unlimited' },
    { feature: 'Finnish Sauna & 4°C Ice Cold Plunge', standard: false, pro: true, vip: true },
    { feature: 'Dedicated CSCS Floor Coach Supervision', standard: 'General', pro: 'Dedicated Group', vip: 'Direct 1-on-1' },
    { feature: 'Indian High-Protein Macro Blueprint', standard: false, pro: true, vip: true },
    { feature: 'Direct 1-on-1 Sessions with Coach Raqib', standard: false, pro: false, vip: true },
    { feature: 'WhatsApp Concierge & Daily Food Log Review', standard: false, false: false, pro: false, vip: true },
    { feature: 'Membership Freeze Grace Period', standard: '7 Days', pro: '21 Days', vip: '60 Days' },
    { feature: 'Executive Valet & Private Locker Suite', standard: false, pro: false, vip: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <span>Direct Investment</span>
          <span aria-hidden="true">·</span>
          <span>Zero Long-Term Lockins</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          Select Your Membership Tier
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Straightforward pricing in Indian Rupees (₹). Every plan delivers Olympic hardware, clean air-conditioned facilities, and verified coaching oversight.
        </p>

        {/* Cycle Toggle */}
        <div className="inline-flex bg-neutral-900 p-1.5 rounded-xl border border-neutral-800 mt-4">
          <button
            onClick={() => setCycle('monthly')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              cycle === 'monthly' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle('quarterly')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              cycle === 'quarterly' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Quarterly (Save 15%)
          </button>
          <button
            onClick={() => setCycle('annual')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              cycle === 'annual' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Annual (Save 25%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = cycle === 'monthly'
            ? plan.monthlyPrice
            : cycle === 'quarterly'
            ? Math.round(plan.quarterlyPrice / 3)
            : Math.round(plan.annualPrice / 12);

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10'
                  : 'bg-neutral-900/60 border border-neutral-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-neutral-950 text-[11px] font-bold px-3.5 py-0.5 rounded-full uppercase tracking-wider">
                  Club Favorite Choice
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-2xl text-white">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 min-h-[36px] leading-relaxed">{plan.tagline}</p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-neutral-400 font-semibold">₹</span>
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-white font-mono tabular-nums">
                      {price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400">/ mo</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    {cycle === 'quarterly'
                      ? `Billed quarterly at ₹${plan.quarterlyPrice.toLocaleString('en-IN')}`
                      : cycle === 'annual'
                      ? `Billed annually at ₹${plan.annualPrice.toLocaleString('en-IN')}`
                      : 'Billed monthly'}
                  </span>
                </div>

                <div className="space-y-3 pt-5 border-t border-neutral-800">
                  {plan.features.map((feat, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 text-xs ${
                        feat.included ? 'text-neutral-200' : 'text-neutral-500 line-through'
                      }`}
                    >
                      {feat.included ? (
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-4 h-4 text-center text-neutral-600 font-bold shrink-0">×</span>
                      )}
                      <span>{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onOpenTrialModal(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-500/20'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Detailed Audit
          </span>
          <h2 className="font-display font-bold text-2xl text-white mt-1">
            Membership Feature Matrix
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Compare all features across Standard, Pro, and Raqib Mentorship tiers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                <th className="py-3 pr-4 font-semibold">Tier Feature</th>
                <th className="py-3 px-4 font-semibold text-center">Club Athlete</th>
                <th className="py-3 px-4 font-semibold text-center text-amber-400">Pro Performance</th>
                <th className="py-3 pl-4 font-semibold text-center text-white">VIP Mentorship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-950/40 transition-colors">
                  <td className="py-3.5 pr-4 font-medium text-white">{row.feature}</td>
                  
                  {/* Standard col */}
                  <td className="py-3.5 px-4 text-center font-mono">
                    {typeof row.standard === 'boolean' ? (
                      row.standard ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-neutral-600">—</span>
                    ) : (
                      <span>{row.standard}</span>
                    )}
                  </td>

                  {/* Pro col */}
                  <td className="py-3.5 px-4 text-center font-mono text-amber-300">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-neutral-600">—</span>
                    ) : (
                      <span>{row.pro}</span>
                    )}
                  </td>

                  {/* VIP col */}
                  <td className="py-3.5 pl-4 text-center font-mono font-bold text-white">
                    {typeof row.vip === 'boolean' ? (
                      row.vip ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-neutral-600">—</span>
                    ) : (
                      <span>{row.vip}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corporate & Executive Retainers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-950 border border-neutral-800 p-8 rounded-3xl">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Corporate Wellness
          </span>
          <h3 className="font-display font-bold text-2xl text-white">
            Executive Teams & Venture Backed Cohorts
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            We provide group biometric health audits and private team training blocks for high-growth tech companies and leadership teams in NCR, Mumbai, and Bengaluru.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <button
            onClick={() => onOpenTrialModal('Corporate Inquiry')}
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Request Corporate Briefing
          </button>
          <a
            href="https://wa.me/919876543210?text=Hello%20Raqib%20Club,%20inquiring%20about%20Corporate%20Executive%20tier"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center justify-center transition-colors"
          >
            Chat Corporate Desk
          </a>
        </div>
      </div>

    </div>
  );
};

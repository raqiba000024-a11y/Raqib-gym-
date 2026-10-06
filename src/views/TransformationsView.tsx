import React, { useState } from 'react';
import { TRANSFORMATIONS } from '../data/gymData';
import { ArrowRight, CheckCircle2, TrendingUp, Award, Quote } from 'lucide-react';

interface TransformationsViewProps {
  onOpenTrialModal: () => void;
}

export const TransformationsView: React.FC<TransformationsViewProps> = ({ onOpenTrialModal }) => {
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All'
    ? TRANSFORMATIONS
    : TRANSFORMATIONS.filter(t => t.goal === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Verified Case Studies</span>
            <span aria-hidden="true">·</span>
            <span>Clinical InBody Validation</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Proof of Biological Adaptation
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Real metrics from executives, surgeons, and competitive athletes trained under Coach Raqib’s progressive overload and Indian nutrition protocols.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start md:self-auto">
          {['All', 'Fat Loss', 'Muscle Hypertrophy', 'Athletic Performance', 'Executive Health'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transformations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-7 sm:p-9 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200"
          >
            <div>
              {/* Client Profile Header */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-700/20 border border-amber-500/30 flex items-center justify-center font-display font-bold text-amber-400 text-lg">
                    {client.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{client.name}</h3>
                    <p className="text-xs text-neutral-400">{client.profession} · Age {client.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-amber-400 font-bold block">{client.duration}</span>
                  <span className="text-[10px] text-neutral-500 uppercase">{client.goal}</span>
                </div>
              </div>

              {/* Empirical Metrics Matrix */}
              <div className="grid grid-cols-3 gap-2.5 my-6">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase block">Scale Delta</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tabular-nums block mt-0.5">
                    {client.weightChange}
                  </span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase block">Body Fat Ratio</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono tabular-nums block mt-0.5">
                    {client.bodyFatChange}
                  </span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase block">Strength Milestone</span>
                  <span className="text-xs sm:text-sm font-bold text-sky-400 font-mono tabular-nums block mt-0.5 truncate">
                    {client.strengthGain}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed relative pl-4 border-l-2 border-neutral-700">
                &ldquo;{client.quote}&rdquo;
              </blockquote>
            </div>

            {/* Coach's Physiological Review */}
            <div className="mt-6 pt-5 border-t border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                Coach Raqib Intervention Notes:
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {client.coachNotes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Clinical Accountability
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            How Every Milestone is Validated
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            We never rely on deceitful before-and-after lighting tricks or deceptive angle poses. Every transformation is audited through three clinical checkpoints:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. Dual-Frequency Bio-Impedance</h4>
            <p className="text-xs text-neutral-400">InBody 770 scan every 14 days measuring lean segmental mass down to grams.</p>
          </div>
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">2. Digital Video Bar-Path Velocity</h4>
            <p className="text-xs text-neutral-400">Verifying that squats, benches, and deadlifts meet strict competition depths.</p>
          </div>
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">3. Fasting Metabolic Bio-Markers</h4>
            <p className="text-xs text-neutral-400">Monitoring resting heart rate, sleep quality scores, and blood glucose stability.</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={onOpenTrialModal}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            Start Your Own 90-Day Transformation
          </button>
        </div>
      </div>

    </div>
  );
};

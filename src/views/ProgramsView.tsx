import React, { useState } from 'react';
import { Program } from '../types';
import { PROGRAMS } from '../data/gymData';
import { Check, ArrowRight, Clock, Flame, Award, Dumbbell, Shield } from 'lucide-react';

interface ProgramsViewProps {
  onOpenProgramModal: (prog: Program) => void;
  onOpenTrialModal: (programTitle: string) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ onOpenProgramModal, onOpenTrialModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPrograms = selectedCategory === 'All'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Specialized Pathways</span>
            <span aria-hidden="true">·</span>
            <span>Periodized Curriculum</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Comprehensive Training Programs
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Every athlete trains on a structured mesocycle with defined progressive overload, recovery protocols, and biometric InBody assessments.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start md:self-auto">
          {['All', 'Strength', 'Conditioning', 'Personal', 'Rehab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{prog.category}</span>
                <span className="text-neutral-400 font-mono tabular-nums">{prog.duration}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                {prog.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-2 min-h-[32px] leading-relaxed">
                {prog.tagline}
              </p>

              <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    Intensity
                  </span>
                  <span className="text-white font-medium block mt-0.5">{prog.intensity}</span>
                </div>
                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Format
                  </span>
                  <span className="text-white font-medium block mt-0.5 truncate">{prog.schedule.split('(')[0]}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Core Inclusions
                </span>
                {prog.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center gap-3">
              <button
                onClick={() => onOpenProgramModal(prog)}
                className="flex-1 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Full Syllabus
              </button>
              <button
                onClick={() => onOpenTrialModal(prog.title)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Trial Pass
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sample 4-Day Barbell Mesocycle Split Breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Behind the Scenes
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Example 4-Day Hypertrophy & Strength Split
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            A look into how Coach Raqib balances mechanical tension, metabolic stress, and central nervous recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">Day 01 · Mon</span>
            <h4 className="text-sm font-bold text-white">Squat & Knee Dominance</h4>
            <ul className="text-xs text-neutral-400 space-y-1 pt-1 font-mono">
              <li>· Eleiko Back Squat (5x5 @ RPE 8)</li>
              <li>· Romanian Deadlift (3x8)</li>
              <li>· Leg Press Drop-set (3x12)</li>
              <li>· Standing Calf Raises (4x15)</li>
            </ul>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">Day 02 · Tue</span>
            <h4 className="text-sm font-bold text-white">Bench & Upper Push/Pull</h4>
            <ul className="text-xs text-neutral-400 space-y-1 pt-1 font-mono">
              <li>· Flat Competition Bench (4x6)</li>
              <li>· Seal Rows (Pendlay style 4x8)</li>
              <li>· Overhead Press Barbell (3x8)</li>
              <li>· Incline Dumbbell Flies (3x12)</li>
            </ul>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Day 03 · Thu</span>
            <h4 className="text-sm font-bold text-white">Posterior Chain & Deadlift</h4>
            <ul className="text-xs text-neutral-400 space-y-1 pt-1 font-mono">
              <li>· Conventional Deadlift (3x3 @ 85%)</li>
              <li>· Bulgarian Split Squat (3x10/leg)</li>
              <li>· Hamstring GHR Curls (3x12)</li>
              <li>· Sled Push Turf Sprints (6x30m)</li>
            </ul>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Day 04 · Fri</span>
            <h4 className="text-sm font-bold text-white">Hypertrophy Delts & Arms</h4>
            <ul className="text-xs text-neutral-400 space-y-1 pt-1 font-mono">
              <li>· Cable Lateral Raises (4x15)</li>
              <li>· Weighted Dips (3x8-10)</li>
              <li>· Barbell Preacher Curls (4x10)</li>
              <li>· Cold Plunge + Sauna (20 min)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

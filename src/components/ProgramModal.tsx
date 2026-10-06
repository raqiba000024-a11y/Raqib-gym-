import React from 'react';
import { Program } from '../types';
import { X, Check, Flame, Clock, Award } from 'lucide-react';

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onBookPass: (programTitle: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose, onBookPass }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative text-neutral-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>{program.category} Pathway</span>
          <span aria-hidden="true">·</span>
          <span>{program.duration}</span>
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1.5">
          {program.title}
        </h2>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          {program.tagline}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Duration
            </span>
            <p className="text-xs font-bold text-white mt-0.5">{program.duration}</p>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              Intensity
            </span>
            <p className="text-xs font-bold text-white mt-0.5">{program.intensity}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-400" />
              Format
            </span>
            <p className="text-xs font-bold text-white mt-0.5">{program.schedule}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Biomechanical Architecture & Methodology
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
              {program.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Key Inclusions & Protocols
            </h4>
            <div className="space-y-2">
              {program.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs text-neutral-400">
            <strong className="text-neutral-200 block mb-0.5">Ideal Profile:</strong>
            <span>{program.idealFor}</span>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[11px] text-neutral-500 block">Trial Availability</span>
            <span className="text-xs text-emerald-400 font-semibold">1-Day Platform Pass Eligible</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onBookPass(program.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Claim 1-Day Trial in this Program
          </button>
        </div>
      </div>
    </div>
  );
};

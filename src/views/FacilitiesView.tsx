import React, { useState } from 'react';
import { FACILITY_ZONES } from '../data/gymData';
import { ShieldCheck, Droplets, Dumbbell, Activity, Check, ArrowRight } from 'lucide-react';

interface FacilitiesViewProps {
  onOpenTrialModal: () => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onOpenTrialModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredZones = selectedCategory === 'All'
    ? FACILITY_ZONES
    : FACILITY_ZONES.filter(z => z.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Facility Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Zero Compromises</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            The Performance Sanctum
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Constructed across 14,000 square feet of shock-absorbing acoustic rubber, featuring Olympic-certified Eleiko competition platforms and Scandinavian thermal recovery suites.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start md:self-auto">
          {['All', 'Strength', 'Recovery', 'Conditioning', 'Coaching'].map((cat) => (
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

      {/* Facility Zones Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredZones.map((zone) => (
          <div
            key={zone.id}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-7 sm:p-9 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-amber-400 font-mono font-bold uppercase tracking-wider">{zone.category} Department</span>
                <span className="text-neutral-500 font-mono">Zone Verified</span>
              </div>

              <h2 className="font-display font-bold text-2xl text-white">
                {zone.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                {zone.headline}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
                {zone.specs.map((spec, i) => (
                  <div key={i} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-xs text-neutral-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Equipment list */}
              <div className="space-y-2 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Hardware & Certified Machinery
                </span>
                {zone.equipment.map((eq, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
              <span className="truncate pr-2">Acoustic profile: {zone.ambiance}</span>
              <button
                onClick={onOpenTrialModal}
                className="text-amber-400 hover:text-white font-semibold transition-colors cursor-pointer shrink-0"
              >
                Tour Zone →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Member Amenities Grid */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Executive Hospitality
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Locker & Hospitality Amenities
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Designed for busy founders, corporate leaders, and athletes transitioning directly into business meetings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Private Changing Suites</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Individual rain showers, organic botanical shampoos, and plush terry towels provided complimentary.</p>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Digital Concierge Lockers</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Keyless RFID lockers with integrated phone charging docks and suit steaming service on request.</p>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Cold Hydration Bar</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Reverse-osmosis mineral-enriched alkaline water and Himalayan pink salt electrolyte stations.</p>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Espresso & Nutrition Bar</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Single-origin Indian Arabica pre-workout espresso and freshly mixed isolate protein shakes.</p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onOpenTrialModal}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            Claim 1-Day Facility Pass
          </button>
        </div>
      </div>

    </div>
  );
};

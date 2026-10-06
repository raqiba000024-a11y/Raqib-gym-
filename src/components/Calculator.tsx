import React, { useState } from 'react';
import { Calculator as CalcIcon, Flame, Dumbbell, Activity, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';

interface CalculatorProps {
  onSelectProgram: (programId: string) => void;
}

export const PerformanceCalculator: React.FC<CalculatorProps> = ({ onSelectProgram }) => {
  const { showToast } = useToast();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // Moderate (3-5 sessions)
  const [goal, setGoal] = useState<'fat_loss' | 'hypertrophy' | 'strength'>('fat_loss');

  // Mifflin-St Jeor Equation for BMR
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activityLevel);

  let targetCalories = tdee;
  let targetProteinGrams = Math.round(weightKg * 2.2); // 2.2g per kg
  let recommendedProgramId = 'metabolic-recomp';
  let recommendedProgramName = 'Metabolic Recomposition & Fat Loss';

  if (goal === 'fat_loss') {
    targetCalories = Math.round(tdee - 500);
    targetProteinGrams = Math.round(weightKg * 2.4); // higher in deficit to preserve muscle
    recommendedProgramId = 'metabolic-recomp';
    recommendedProgramName = 'Metabolic Recomposition & Fat Loss';
  } else if (goal === 'hypertrophy') {
    targetCalories = Math.round(tdee + 300);
    targetProteinGrams = Math.round(weightKg * 2.2);
    recommendedProgramId = 'hypertrophy-strength';
    recommendedProgramName = 'Olympic Strength & Functional Hypertrophy';
  } else {
    targetCalories = tdee;
    targetProteinGrams = Math.round(weightKg * 2.0);
    recommendedProgramId = 'private-coaching';
    recommendedProgramName = 'Raqib Aalam Private Mentorship';
  }

  // Macro distribution
  const proteinCals = targetProteinGrams * 4;
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.max(50, Math.round((targetCalories - proteinCals - (fatGrams * 9)) / 4));

  const handleCopyPlan = () => {
    navigator.clipboard?.writeText(
      `Raqib Aalam Metabolic Target:\nCalories: ${targetCalories} kcal/day\nProtein: ${targetProteinGrams}g\nCarbs: ${carbGrams}g\nFats: ${fatGrams}g\nProgram: ${recommendedProgramName}`
    );
    showToast({
      type: 'success',
      title: 'Biometric Targets Copied!',
      message: 'Macro prescription saved to clipboard for logging.'
    });
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl text-neutral-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <CalcIcon className="w-4 h-4" />
            <span>Interactive Biometric Engine</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-white mt-1">
            Calculate Your Metabolic & Macro Blueprint
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Input your biological baseline to receive immediate daily caloric targets, clinical protein requirements, and Raqib’s recommended training pathway.
          </p>
        </div>

        <button
          onClick={handleCopyPlan}
          className="px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Export Targets
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Input Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sex & Goal Segmented buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">Biological Sex</label>
              <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    gender === 'male' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    gender === 'female' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">Primary Objective</label>
              <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setGoal('fat_loss')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    goal === 'fat_loss' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Fat Loss
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('hypertrophy')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    goal === 'hypertrophy' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Hypertrophy
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('strength')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    goal === 'strength' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Strength
                </button>
              </div>
            </div>
          </div>

          {/* Numeric Sliders / Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-neutral-400">Current Weight</span>
                <span className="font-mono tabular-nums font-bold text-amber-400 text-sm">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="45"
                max="140"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-neutral-400">Height</span>
                <span className="font-mono tabular-nums font-bold text-amber-400 text-sm">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="145"
                max="210"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-neutral-400">Age</span>
                <span className="font-mono tabular-nums font-bold text-amber-400 text-sm">{age} yrs</span>
              </div>
              <input
                type="range"
                min="16"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Activity Level Selector */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">Weekly Training Frequency</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value={1.2}>Sedentary (Office desk, 0-1 workouts / week)</option>
              <option value={1.375}>Lightly Active (1-2 gym sessions / week)</option>
              <option value={1.55}>Moderately Active (3-4 focused barbell sessions / week)</option>
              <option value={1.725}>Very Active (5-6 high intensity sessions / week)</option>
              <option value={1.9}>Elite Athlete / Double Sessions (Daily heavy training)</option>
            </select>
          </div>
        </div>

        {/* Output Metrics Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950 p-6 rounded-xl border border-neutral-800">
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
              Calculated Daily Prescriptions
            </span>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display font-extrabold text-4xl text-white font-mono tabular-nums">
                {targetCalories.toLocaleString()}
              </span>
              <span className="text-xs text-amber-400 font-semibold uppercase">kcal / day</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Estimated Maintenance: <span className="text-neutral-300 font-mono tabular-nums">{tdee} kcal</span>
            </p>

            {/* Macro Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-neutral-800/80">
              <div className="bg-neutral-900/80 p-2.5 rounded-lg text-center border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Protein</span>
                <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">{targetProteinGrams}g</span>
                <span className="text-[9px] text-neutral-500 block">4 cals/g</span>
              </div>
              <div className="bg-neutral-900/80 p-2.5 rounded-lg text-center border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Carbs</span>
                <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">{carbGrams}g</span>
                <span className="text-[9px] text-neutral-500 block">4 cals/g</span>
              </div>
              <div className="bg-neutral-900/80 p-2.5 rounded-lg text-center border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Healthy Fats</span>
                <span className="text-sm font-bold text-sky-400 font-mono tabular-nums">{fatGrams}g</span>
                <span className="text-[9px] text-neutral-500 block">9 cals/g</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800">
            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
              Optimal Training Pathway
            </span>
            <p className="text-xs font-bold text-white mt-1">{recommendedProgramName}</p>
            <button
              onClick={() => onSelectProgram(recommendedProgramId)}
              className="mt-3 w-full py-2 bg-amber-400/10 hover:bg-amber-400 text-amber-400 hover:text-neutral-950 border border-amber-400/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore This Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

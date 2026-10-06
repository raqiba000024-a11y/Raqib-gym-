import React, { useState } from 'react';
import { SAMPLE_MEMBER } from '../data/gymData';
import { Dumbbell, Flame, CheckCircle, Clock, Calendar, TrendingDown, LogOut, Award, User } from 'lucide-react';
import { useToast } from '../components/Toast';

interface PortalViewProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export const PortalView: React.FC<PortalViewProps> = ({ userName, userEmail, onLogout }) => {
  const { showToast } = useToast();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [streak, setStreak] = useState(SAMPLE_MEMBER.currentStreak);

  const member = {
    ...SAMPLE_MEMBER,
    name: userName || SAMPLE_MEMBER.name,
    email: userEmail || SAMPLE_MEMBER.email,
  };

  const toggleExercise = (index: number, exerciseName: string) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(prev => prev.filter(i => i !== index));
    } else {
      setCompletedExercises(prev => [...prev, index]);
      showToast({
        type: 'success',
        title: 'Set Logged!',
        message: `Completed ${exerciseName}. Progression saved to profile.`
      });
      if (completedExercises.length + 1 === member.todayWorkout.length) {
        setStreak(s => s + 1);
        showToast({
          type: 'success',
          title: 'Daily Protocol Complete!',
          message: 'Streak updated! Rest and hydrate for optimal recovery.'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-neutral-100">
      
      {/* Athlete Header Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-neutral-950 font-display font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {member.name}
              </h1>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {member.membershipTier} · Supervised by {member.trainer}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              showToast({
                type: 'info',
                title: 'Check-In Logged',
                message: 'Your presence on Platform 3 has been marked in the coach ledger.'
              });
            }}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Floor Check-In
          </button>
          <button
            onClick={onLogout}
            className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Athlete Vitals Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
          <span className="text-[11px] text-neutral-400 uppercase font-mono block">Active Training Streak</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-black text-3xl text-amber-400 font-mono tabular-nums">{streak}</span>
            <span className="text-xs text-neutral-400">days unbroken</span>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
          <span className="text-[11px] text-neutral-400 uppercase font-mono block">Completed Blocks</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-black text-3xl text-white font-mono tabular-nums">{member.sessionsCompleted}</span>
            <span className="text-xs text-neutral-400">sessions</span>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
          <span className="text-[11px] text-neutral-400 uppercase font-mono block">Latest Scale Mass</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-black text-3xl text-emerald-400 font-mono tabular-nums">79.5</span>
            <span className="text-xs text-neutral-400">kg (-9.0 kg total)</span>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
          <span className="text-[11px] text-neutral-400 uppercase font-mono block">Next Coaching Audit</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-white block">InBody 770 Scan</span>
            <span className="text-xs text-neutral-400">Thursday, 07:00 AM</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Today's Workout + Biometric Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Today's Prescribed Training Routine (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Today’s Prescription</span>
              <h3 className="font-display font-bold text-xl text-white mt-0.5">
                Lower Body Hypertrophy & Posterior Power
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400 tabular-nums">
              {completedExercises.length} / {member.todayWorkout.length} Done
            </span>
          </div>

          <div className="space-y-3">
            {member.todayWorkout.map((item, idx) => {
              const isChecked = completedExercises.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleExercise(idx, item.exercise)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isChecked
                      ? 'bg-neutral-950/80 border-emerald-500/40 text-neutral-400'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-neutral-950'
                          : 'border-neutral-700 hover:border-amber-400'
                      }`}
                    >
                      {isChecked && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isChecked ? 'line-through text-neutral-400' : 'text-white'}`}>
                        {item.exercise}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                        {item.sets} · {item.reps} · <span className="text-amber-400">{item.targetWeight}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                    {isChecked ? 'Logged' : 'Tap to Log'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Coach's Notes Box */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
              Coach Raqib Aalam Direct Cue:
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              &ldquo;On the competition squats today, maintain rigid abdominal pressure during the ascent. Do not cut depth short. Finish immediately with the 4-minute 4°C cold plunge to kickstart recovery.&rdquo;
            </p>
          </div>
        </div>

        {/* Right: Progress Tracking & Biometrics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-display font-bold text-lg text-white">Body Mass Progression</h3>
              <span className="text-xs text-emerald-400 font-mono font-semibold">-9.0 kg Deficit</span>
            </div>

            <div className="space-y-2">
              {member.weightProgress.map((pt, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-800/40 last:border-0">
                  <span className="font-mono text-neutral-400">{pt.week} Audit</span>
                  <span className="font-mono font-bold text-white tabular-nums">{pt.weight} kg</span>
                  <div className="w-24 bg-neutral-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${Math.max(20, (pt.weight / 90) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  showToast({
                    type: 'info',
                    title: 'InBody PDF Requested',
                    message: 'Latest complete body impedance composition report sent to your email.'
                  });
                }}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Download Full InBody 770 Clinical PDF
              </button>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <h4 className="font-display font-bold text-base text-white">Daily Macro Adherence</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Target Cals</span>
                <span className="font-bold text-white font-mono">2,350</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Protein</span>
                <span className="font-bold text-emerald-400 font-mono">180g</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Water</span>
                <span className="font-bold text-cyan-400 font-mono">4.5 L</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

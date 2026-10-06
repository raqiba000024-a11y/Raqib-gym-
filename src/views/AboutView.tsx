import React from 'react';
import { Award, ShieldCheck, Dumbbell, HeartPulse, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onOpenTrialModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenTrialModal }) => {
  const staff = [
    {
      name: 'Raqib Aalam',
      role: 'Head Performance Coach & Founder',
      creds: 'CSCS · Master of Biomechanics · USAW L2',
      focus: 'Periodized Hypertrophy, Heavy Barbell Waves & Spine Kinematics',
      bio: 'Over 12 years directing elite physical transformations for executives, powerlifters, and national athletes across India and internationally.'
    },
    {
      name: 'Dr. Tariq Anwar',
      role: 'Director of Sports Physiotherapy',
      creds: 'MPT (Sports Rehab) · Dry Needling Specialist',
      focus: 'Spinal Decompression, Rotator Cuff & Knee Post-Op Recovery',
      bio: 'Specialist in restoring joint range of motion and correcting anterior pelvic tilt in desk-bound corporate professionals.'
    },
    {
      name: 'Kavita Singh',
      role: 'Lead Conditioning & Turf Coach',
      creds: 'NSCA-CPT · EXOS Performance Specialist',
      focus: 'Metabolic Sprint Intervals, VO2 Max & Lactate Clearance',
      bio: 'Former national sprint athlete coaching high-density functional power on our 30-meter indoor astroturf.'
    },
    {
      name: 'Sameer Sheikh',
      role: 'Olympic Weightlifting Technical Lead',
      creds: 'Senior National Medalist · IWF Certified',
      focus: 'Snatch, Clean & Jerk Precision, Barbell Velocity Tracking',
      bio: 'Coaches technical barbell fluidity and explosive hip extension mechanics on competition Eleiko platforms.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 text-neutral-100">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <span>Leadership & Philosophy</span>
          <span aria-hidden="true">·</span>
          <span>Raqib Aalam Athletic Club</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
          Strength is Not a Genetic Lottery. It is Engineered.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Founded by Coach Raqib Aalam in New Delhi, the club was created with a solitary mandate: to eradicate unscientific fitness trends and provide serious athletes with clinical coaching, Olympic hardware, and uncompromising accountability.
        </p>
      </div>

      {/* Story & Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Visual Box */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-display font-black text-3xl shadow-xl mb-6">
            RA
          </div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            The Founder’s Code
          </span>
          <h2 className="font-display font-bold text-2xl text-white mt-1">
            Coach Raqib Aalam
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Head Coach · Delhi · Mumbai · Bengaluru
          </p>

          <div className="space-y-3 my-6 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>12+ Years Direct Private Mentorship Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>1,420+ Documented High-Performance Transformations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>NSCA CSCS (Certified Strength & Conditioning Specialist)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>InBody Clinical Biometric Master Practitioner</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenTrialModal}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Consult with Coach Raqib
            </button>
          </div>
        </div>

        {/* Narrative & Principles */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            The Problem with Modern Fitness & Why We Are Different
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            In standard commercial gyms across India, members are handed generic photocopied workout routines, left alone on vibrating treadmills, or pushed into reckless HIIT classes that prioritize exhaustion over adaptation.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Coach Raqib founded this institution to bring the standards of elite collegiate strength training and professional sports facilities to everyday executives, athletes, and fitness enthusiasts. We do not count how much you sweat; we measure how many kilograms of skeletal muscle you build and how your neuromuscular coordination adapts over 12-week mesocycles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Zero Guesswork Nutrition
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We formulate macro prescriptions tailored to authentic Indian meal patterns, making high-protein eating sustainable for life.
              </p>
            </div>
            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Joint Longevity First
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every lift is assessed against individual biomechanical levers to protect shoulders, knees, and lumbar vertebrae.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Senior Coaching Roster */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Floor Supervision
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white mt-1">
            Meet the Senior Performance Faculty
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Our floor is never unsupervised. Every coach holds internationally recognized sports science certifications and adheres to Coach Raqib’s lifting curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staff.map((coach, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{coach.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{coach.role}</p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">{coach.creds}</span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs text-neutral-300 leading-relaxed">{coach.bio}</p>
                  <p className="text-xs text-neutral-400">
                    <strong className="text-neutral-300">Special Focus: </strong>{coach.focus}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Floor Coach Active
                </span>
                <button
                  onClick={onOpenTrialModal}
                  className="text-xs text-amber-400 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  Book Session with {coach.name.split(' ')[0]} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities & Equipment Standards */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Hardware Integrity
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Why We Exclusively Choose Eleiko Sweden
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
            The world’s best lifters train on Eleiko. From our 20kg competition power bars with calibrated knurling to cast-iron disc weights certified to ±10 grams, your nervous system experiences the purest barbell physics available.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Eleiko Competition Racks</h4>
            <p className="text-xs text-neutral-400">Precision pin adjustments with heavy-duty safety strap systems for max attempts without fear.</p>
          </div>
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">InBody 770 Clinical Unit</h4>
            <p className="text-xs text-neutral-400">Multi-frequency segment impedance calculating exact extracellular water ratio and visceral fat area.</p>
          </div>
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Cold Plunge at 4°C</h4>
            <p className="text-xs text-neutral-400">Continuous ozone-filtered chilled water tub for systemic anti-inflammatory nervous recovery.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { PageView, Program, Transformation, PricingPlan, FAQItem } from '../types';
import { CLUB_STATS, PROGRAMS, TRANSFORMATIONS, PRICING_PLANS, FAQ_LIST, FACILITY_ZONES } from '../data/gymData';
import { PerformanceCalculator } from '../components/Calculator';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Dumbbell, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Award,
  Zap,
  TrendingUp,
  Clock,
  HeartPulse,
  Droplets
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onOpenTrialModal: (program?: string) => void;
  onOpenProgramModal: (program: Program) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenTrialModal,
  onOpenProgramModal,
}) => {
  const [transformationFilter, setTransformationFilter] = useState<string>('All');
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const filteredTransformations = transformationFilter === 'All'
    ? TRANSFORMATIONS
    : TRANSFORMATIONS.filter(t => t.goal === transformationFilter);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle dark ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Clean unboxed editorial kicker without pill tags */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span>Raqib Aalam Performance</span>
                <span aria-hidden="true">·</span>
                <span>Elite Athletic Club & Strength Sanctum</span>
                <span aria-hidden="true">·</span>
                <span>India</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tight text-white leading-[1.08] text-balance">
                Transformational Strength. Engineered by Science.
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                Founded by Coach Raqib Aalam, India’s premier strength and functional hypertrophy sanctum pairs Olympic-grade Eleiko platforms with clinical biomechanics, medical InBody analysis, and periodized metabolic conditioning.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onOpenTrialModal()}
                  className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Claim 1-Day Platform Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 rounded-lg text-sm font-semibold transition-colors cursor-pointer text-center"
                >
                  Explore Training Programs
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 border-t border-neutral-900/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Eleiko Certified Floor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>CSCS & Biomechanics Led</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>4°C Cold Plunge & Cedar Sauna</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Interactive Stage (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">Real-Time Floor Status</span>
                    <span className="text-sm font-bold text-white">Main Barbell Deck & Platforms</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open & Supervised</span>
                  </div>
                </div>

                {/* Hero Showcase Center Graphic / Atmospheric Texture */}
                <div className="my-5 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800/80 p-5 relative overflow-hidden">
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                          <Dumbbell className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Barbell Heavy Compound Split</p>
                          <p className="text-[11px] text-neutral-400">Platform 2 · Low Bar Squats & Cleans</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-amber-400 font-bold tabular-nums">06:00 - 22:30</span>
                    </div>

                    {/* Telemetry Bar */}
                    <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-neutral-400">Platform Capacity</span>
                        <span className="text-neutral-200 font-mono tabular-nums">12 / 16 Racks Active</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-3/4 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-400 block uppercase">Sauna Temp</span>
                        <span className="text-sm font-bold text-orange-400 font-mono tabular-nums">88°C</span>
                      </div>
                      <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-400 block uppercase">Ice Plunge</span>
                        <span className="text-sm font-bold text-cyan-400 font-mono tabular-nums">4.2°C</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenTrialModal('Direct 1-on-1 Consultation')}
                    className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Book InBody Biometric Consultation Today</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST & STATS SECTION */}
      <section className="border-y border-neutral-900 bg-neutral-950/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {CLUB_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white font-mono tabular-nums">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm font-bold text-amber-400">{stat.label}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT COACH RAQIB AALAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coach Bio Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-display font-black text-2xl shadow-lg">
                RA
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Head Coach & Founder
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                  Coach Raqib Aalam
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  CSCS · Master of Biomechanics · 12+ Years Coaching Indian & International Athletes
                </p>
              </div>

              <blockquote className="border-l-2 border-amber-400 pl-4 py-1 text-sm text-neutral-300 italic leading-relaxed">
                &ldquo;True strength is not accidental. We replace guesswork, fitness fads, and starvation diets with progressive mechanical overload and metabolic precision.&rdquo;
              </blockquote>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Credentials</span>
                  <span className="text-neutral-200 font-semibold">NSCA CSCS & USAW Level 2</span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Specialization</span>
                  <span className="text-neutral-200 font-semibold">Spine & Compound Biomechanics</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('about')}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Read Raqib’s Full Coaching Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Core Coaching Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                The Raqib Aalam Standard
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Engineered for Long-Term Athletic Longevity
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                We reject the high-injury bootcamps and generic franchise gym models. Every athlete at our club trains under a four-pillar physiological framework:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">01. Biomechanical Alignment</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Individual femur length, hip socket depth, and scapular kinematics determine your custom squat and press bar paths.
                </p>
              </div>

              <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">02. Periodized Hypertrophy</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Progressive overload structured in 4-to-6-week mesocycles with planned deloads to prevent central nervous exhaustion.
                </p>
              </div>

              <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">03. Indian Macronutrient Science</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Macro targets designed around real Indian diets (paneer, dal, chicken, rice) without bland, unsustainable meal mandates.
                </p>
              </div>

              <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">04. Cold & Thermal Regeneration</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Daily 4°C cold plunge and 90°C Finnish sauna sessions to reduce delayed-onset muscle soreness and boost heart rate variability.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TRAINING PROGRAMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Curated Pathways
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
              Select Your Performance Pathway
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Every program includes tailored lifting architecture, nutritional guidelines, and InBody composition tracking.
            </p>
          </div>
          <button
            onClick={() => onNavigate('programs')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All 6 Programs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span className="text-amber-400 font-semibold">{prog.category}</span>
                  <span className="font-mono tabular-nums">{prog.duration}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {prog.description}
                </p>

                <div className="space-y-2 my-5 pt-4 border-t border-neutral-800/80">
                  {prog.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center gap-3">
                <button
                  onClick={() => onOpenProgramModal(prog)}
                  className="flex-1 py-2 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenTrialModal(prog.title)}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Trial Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE PERFORMANCE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PerformanceCalculator 
          onSelectProgram={(id) => {
            const found = PROGRAMS.find(p => p.id === id);
            if (found) onOpenProgramModal(found);
            else onNavigate('programs');
          }} 
        />
      </section>

      {/* 6. REAL TRANSFORMATIONS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Empirical Results
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
              Documented Client Transformations
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Real metrics from busy professionals, doctors, and competitive lifters coached under Raqib’s methodology.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start md:self-auto">
            {['All', 'Fat Loss', 'Muscle Hypertrophy', 'Executive Health'].map((category) => (
              <button
                key={category}
                onClick={() => setTransformationFilter(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  transformationFilter === category
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTransformations.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-amber-400 text-sm">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-neutral-400">{item.profession}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 tabular-nums">{item.duration}</span>
                </div>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2 my-5">
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-center">
                    <span className="text-[10px] text-neutral-500 uppercase block">Scale Mass</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono tabular-nums">{item.weightChange}</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-center">
                    <span className="text-[10px] text-neutral-500 uppercase block">Body Fat</span>
                    <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">{item.bodyFatChange}</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-center">
                    <span className="text-[10px] text-neutral-500 uppercase block">Performance</span>
                    <span className="text-xs font-bold text-sky-400 font-mono tabular-nums truncate">{item.strengthGain}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <span className="text-amber-400 font-semibold">Coach Raqib Protocol: </span>
                <span>{item.coachNotes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FACILITIES & ZONES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              State-of-the-Art Sanctuary
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
              Tour the Flagship Facilities
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Engineered with zero commercial gym compromises: Olympic steel, Finnish saunas, sprint turf, and private biometric labs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('facilities')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore Floor Layout & Equipment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FACILITY_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  {zone.category} Zone
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {zone.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {zone.headline}
                </p>

                <div className="my-4 space-y-1.5">
                  {zone.equipment.slice(0, 3).map((eq, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                <span>Ambiance: {zone.ambiance}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MEMBERSHIP & PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Investment in Longevity
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Transparent Club Memberships
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            All tiers include Olympic floor access, InBody 770 composition scans, and locker services. No hidden initiation fees.
          </p>

          {/* Pricing cycle toggle */}
          <div className="inline-flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 mt-2">
            <button
              onClick={() => setPricingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                pricingCycle === 'monthly' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPricingCycle('quarterly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                pricingCycle === 'quarterly' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Quarterly (Save 15%)
            </button>
            <button
              onClick={() => setPricingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                pricingCycle === 'annual' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Annual (Save 25%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = pricingCycle === 'monthly'
              ? plan.monthlyPrice
              : pricingCycle === 'quarterly'
              ? Math.round(plan.quarterlyPrice / 3)
              : Math.round(plan.annualPrice / 12);

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  plan.popular
                    ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10'
                    : 'bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-neutral-950 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="font-display font-bold text-xl text-white">{plan.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{plan.tagline}</p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-neutral-400 font-semibold">₹</span>
                      <span className="font-display font-extrabold text-4xl text-white font-mono tabular-nums">
                        {price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400">/ month</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      {pricingCycle === 'quarterly'
                        ? `Billed quarterly at ₹${plan.quarterlyPrice.toLocaleString('en-IN')}`
                        : pricingCycle === 'annual'
                        ? `Billed annually at ₹${plan.annualPrice.toLocaleString('en-IN')}`
                        : 'Billed monthly on recurring cycle'}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-neutral-800">
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
                    className={`w-full py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Clarity & Guidance
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-400">
            Everything you need to know about starting your training with Coach Raqib Aalam.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((faq) => {
            const isOpen = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/80 transition-colors"
                >
                  <span className="text-sm font-bold text-neutral-100">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Limited Membership Intake
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
              Ready to Build the Strongest Version of Yourself?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Book a complimentary 1-Day Performance Pass or consult directly with Coach Raqib’s senior floor staff on WhatsApp. No commitment required.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => onOpenTrialModal()}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20 text-center"
              >
                Claim Free 1-Day Performance Pass
              </button>
              <a
                href="https://wa.me/919876543210?text=Hello%20Coach%20Raqib,%20I%20would%20like%20to%20learn%20more%20about%20membership"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-emerald-400 border border-neutral-800 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Chat on WhatsApp (+91 98765 43210)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

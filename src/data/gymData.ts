import { Program, Transformation, PricingPlan, FacilityZone, ScheduleClass, FAQItem, MemberUser } from '../types';

export const CLUB_STATS = [
  { value: '1,420+', label: 'Active Club Athletes', detail: 'Members across 3 physical flagships & digital programs' },
  { value: '12+', label: 'Years Coaching Mastery', detail: 'Founded & directed by Head Coach Raqib Aalam' },
  { value: '98.4%', label: 'Transformation Rate', detail: 'Scientifically validated biometric milestones in 90 days' },
  { value: '18', label: 'Certified CSCS Coaches', detail: 'Strict 1:6 coach-to-athlete supervision on the floor' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'private-coaching',
    title: 'Raqib Aalam Private Mentorship',
    tagline: 'Direct 1-on-1 bespoke biomechanics & physical transformation',
    category: 'Personal',
    duration: '12 to 24 Weeks',
    intensity: 'Customized',
    description: 'An elite personal coaching pathway reserved for clients requiring maximum precision. Raqib personally designs your periodized training splits, reviews video lifts frame-by-frame, and adjusts nutrition weekly according to blood markers.',
    features: [
      'Direct 1-on-1 private lifting sessions with Coach Raqib',
      'Continuous metabolic & macro nutrition recalibration',
      'Bi-weekly InBody 770 clinical body composition audit',
      'Spinal biomechanics & joint mobility optimization',
      'Unlimited recovery suite & infrared sauna access'
    ],
    schedule: 'Flexible 4-5 private slots / week',
    idealFor: 'Executives, competitive lifters, and individuals seeking definitive results',
    badge: 'Flagship Mentorship'
  },
  {
    id: 'hypertrophy-strength',
    title: 'Olympic Strength & Functional Hypertrophy',
    tagline: 'Progressive overload engineered for dense, athletic muscle mass',
    category: 'Strength',
    duration: '16 Weeks Block',
    intensity: 'Very High',
    description: 'A scientifically structured hypertrophy system that eliminates junk volume. Train on calibrated Eleiko competition bars, calibrated plates, and precision mechanical drop-sets designed to increase cross-sectional muscle area while boosting squat, bench, and deadlift numbers.',
    features: [
      'Full access to Eleiko Olympic lifting platforms',
      'Periodized RPE & percentage-based lifting protocols',
      'Technique clinics on barbell compound mechanics',
      'Daily protein & caloric deficit/surplus roadmaps',
      'Post-workout electrolyte and recovery bar access'
    ],
    schedule: 'Mon / Tue / Thu / Fri / Sat (06:00 - 21:00)',
    idealFor: 'Intermediate to advanced trainees plateaued on standard bodybuilding routines'
  },
  {
    id: 'metabolic-recomp',
    title: 'Metabolic Recomposition & Fat Loss Protocol',
    tagline: 'Shed stubborn visceral fat while preserving lean muscular density',
    category: 'Conditioning',
    duration: '12 Weeks',
    intensity: 'High',
    description: 'Built for rapid fat oxidation without cardiovascular exhaustion or muscle wasting. Combines targeted high-density resistance circuits, lactate threshold conditioning on the sprint turf, and structured carb-cycling nutrition.',
    features: [
      'Heart-rate zoned sled pushes, assault bikes, and kettlebell complexes',
      'Personalized Indian macronutrient meal plans (Vegetarian & Non-Veg)',
      'Cortisol and sleep rhythm management protocol',
      'Weekly progress tracking with circumference & ultrasound calipering',
      'Access to private cold plunge bath at 4°C'
    ],
    schedule: 'Daily morning & evening slots',
    idealFor: 'Anyone targeting single-digit or athletic body-fat percentages in 90 days'
  },
  {
    id: 'athletic-conditioning',
    title: 'Athletic Speed & Turf Conditioning',
    tagline: 'Power, sprint velocity, and multidirectional agility for sports',
    category: 'Conditioning',
    duration: 'Ongoing / 8-Week Cycles',
    intensity: 'Very High',
    description: 'Develop the reactive tendon stiffness, sprint mechanics, and rotational power seen in international athletes. Conducted on our 30-meter indoor astroturf using plyometric boxes, trap bars, and velocity-based measurement sensors.',
    features: [
      '30-meter acceleration and deceleration mechanics',
      'Rotational power training with medicine balls and landmines',
      'Aerobic capacity testing with VO2 threshold tracking',
      'Hamstring & ACL injury prevention protocols',
      'Open sprint track and functional rig access'
    ],
    schedule: 'Mon / Wed / Fri (07:00 & 18:30)',
    idealFor: 'Cricket, football, martial arts athletes and high-energy conditioning seekers'
  },
  {
    id: 'posture-rehab',
    title: 'Musculoskeletal Rehabilitation & Posture Reset',
    tagline: 'Eliminate chronic back, neck, and shoulder dysfunction permanently',
    category: 'Rehab',
    duration: '8 to 12 Weeks',
    intensity: 'Moderate',
    description: 'Developed in consultation with leading sports physiotherapists to reverse the postural decay of sedentary desk work. We address anterior pelvic tilt, thoracic kyphosis, rotator cuff impingement, and lumbar compression.',
    features: [
      'Postural grid assessment & dynamic gait analysis',
      'Thoracic spine and hip capsule decompression exercises',
      'Deep stabilizer reactivation (transverse abdominis & gluteus medius)',
      'Percussion massage and active release therapy',
      'Customized ergonomic desk guidance'
    ],
    schedule: 'Tuesday & Thursday or 1-on-1 by appointment',
    idealFor: 'Desk-bound tech leaders, corporate professionals, and post-injury returnees'
  },
  {
    id: 'executive-protocol',
    title: 'Executive High-Performance Protocol',
    tagline: 'Maximum biological efficiency in 45-minute structured sessions',
    category: 'Personal',
    duration: 'Quarterly Retainer',
    intensity: 'High',
    description: 'Created for founders, CXOs, and medical practitioners with demanding schedules. High-density, high-impact sessions accompanied by concierge locker amenities, travel workout routines, and executive meal prep delivery integration.',
    features: [
      '45-minute zero-wasted-minute training architecture',
      'Priority reservation on private training decks',
      'Travel hotel workout programs with minimal equipment',
      'Executive biomarker tracking (sleep score, HRV, resting pulse)',
      'Executive private changing suites & espresso lounge'
    ],
    schedule: 'Priority booking 05:30 - 22:30 daily',
    idealFor: 'Time-constrained professionals wanting peak physical energy without friction'
  }
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: 't-1',
    name: 'Arjun Sharma',
    age: 34,
    profession: 'Software Engineering Director, Gurugram',
    goal: 'Fat Loss',
    duration: '16 Weeks',
    weightChange: '-18.4 kg (94.2 kg → 75.8 kg)',
    bodyFatChange: '29.5% → 13.2%',
    strengthGain: 'Deadlift: 90 kg → 175 kg',
    quote: 'I had been going to commercial gyms for five years without seeing my abs. Coach Raqib took one look at my biomechanics and diet logging, restructured my training to 4 heavy compound sessions, and held me strictly accountable. The transformation was dramatic.',
    coachNotes: 'Client suffered from anterior pelvic tilt and erratic carb spikes. Replaced treadmill jogging with progressive barbell squats and calibrated Indian high-protein meal planning.',
    initials: 'AS',
    accentColor: 'from-amber-500/20 to-amber-700/10'
  },
  {
    id: 't-2',
    name: 'Priyanshi Verma',
    age: 28,
    profession: 'Architectural Consultant, New Delhi',
    goal: 'Muscle Hypertrophy',
    duration: '20 Weeks',
    weightChange: '+4.5 kg Lean Muscle Mass',
    bodyFatChange: '23.0% → 17.5%',
    strengthGain: 'Hip Thrust: 50 kg → 130 kg (3x10)',
    quote: 'Women in India are often discouraged from lifting heavy. Raqib completely shattered that myth for me. Under his instruction, I learned to deadlift double my bodyweight with flawless form. I have never felt stronger or more energetic.',
    coachNotes: 'Structured an upper/lower specialization block focusing on posterior chain development and metabolic conditioning. Client gained measurable glute and lat hypertrophy.',
    initials: 'PV',
    accentColor: 'from-emerald-500/20 to-emerald-700/10'
  },
  {
    id: 't-3',
    name: 'Rohan Mehta',
    age: 41,
    profession: 'Founding Partner, Venture Capital, Mumbai',
    goal: 'Executive Health',
    duration: '24 Weeks',
    weightChange: '-14.0 kg (86 kg → 72 kg)',
    bodyFatChange: '27.8% → 14.1%',
    strengthGain: 'Resting Heart Rate: 78 bpm → 52 bpm',
    quote: 'With 60-hour workweeks and frequent cross-border flights, I thought peak fitness was impossible. Raqib designed 45-minute morning protocols and hotel routines that fit seamlessly into my calendar. My energy in boardroom meetings is unrecognizable.',
    coachNotes: 'Executive Protocol with focus on VO2 Max intervals, lumbar decompression, and alcohol-free business dinner strategies.',
    initials: 'RM',
    accentColor: 'from-blue-500/20 to-blue-700/10'
  },
  {
    id: 't-4',
    name: 'Dr. Aisha Khan',
    age: 32,
    profession: 'Cardiothoracic Surgeon, New Delhi',
    goal: 'Athletic Performance',
    duration: '12 Weeks',
    weightChange: '-6.2 kg Body Fat + 3.8 kg Muscle',
    bodyFatChange: '25.2% → 16.0%',
    strengthGain: 'Barbell Back Squat: 40 kg → 95 kg',
    quote: 'Standing on my feet for 8 hours in surgery caused agonizing lower back spasm. The posture reset and posterior chain work with Coach Raqib eradicated my pain in 4 weeks. He understands human anatomy better than most clinical fitness instructors.',
    coachNotes: 'Addressed thoracic spine stiffness and gluteal amnesia through banded hip hinges and Romanian deadlifts. Full pain resolution.',
    initials: 'AK',
    accentColor: 'from-orange-500/20 to-orange-700/10'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Club Athlete Access',
    tagline: 'Full access to state-of-the-art strength floor & cardio loft',
    monthlyPrice: 4999,
    quarterlyPrice: 12999,
    annualPrice: 44999,
    features: [
      { included: true, text: 'Unlimited access to all Olympic Eleiko barbell platforms' },
      { included: true, text: 'Full cardio loft & 30m indoor astroturf track' },
      { included: true, text: 'Monthly InBody 770 composition scan' },
      { included: true, text: 'Digital workout logging via Raqib Club App' },
      { included: true, text: 'Locker, filtered hydration & towel service' },
      { included: false, text: 'Direct 1-on-1 private coaching sessions' },
      { included: false, text: 'Finnish sauna & 4°C ice cold plunge suite' }
    ],
    ctaText: 'Select Club Pass'
  },
  {
    id: 'pro-performance',
    name: 'Pro Performance Tier',
    tagline: 'Our flagship membership with coach supervision & recovery suite',
    monthlyPrice: 8499,
    quarterlyPrice: 22499,
    annualPrice: 74999,
    popular: true,
    features: [
      { included: true, text: 'Everything in Club Athlete Access' },
      { included: true, text: 'Unlimited Finnish cedar sauna & ice cold plunge suite' },
      { included: true, text: 'Floor supervision with dedicated CSCS assistant coaches' },
      { included: true, text: 'Customized Indian high-protein nutrition framework' },
      { included: true, text: 'Bi-weekly InBody 770 body composition analysis' },
      { included: true, text: 'Priority access to weekly group strength & agility clinics' },
      { included: false, text: 'Direct 1-on-1 exclusive mentorship with Raqib' }
    ],
    ctaText: 'Claim Pro Membership'
  },
  {
    id: 'raqib-private',
    name: 'Raqib Aalam VIP Mentorship',
    tagline: 'Exclusive personal coaching with Coach Raqib Aalam himself (Limited to 15 Athletes)',
    monthlyPrice: 18999,
    quarterlyPrice: 49999,
    annualPrice: 169999,
    features: [
      { included: true, text: 'Direct 1-on-1 training sessions with Coach Raqib' },
      { included: true, text: 'Micro-periodized training programming updated weekly' },
      { included: true, text: 'Daily WhatsApp concierge for meal reviews & form checks' },
      { included: true, text: 'Unlimited private recovery suite & cold plunge reservations' },
      { included: true, text: 'Executive travel workout & dining blueprint' },
      { included: true, text: 'Quarterly comprehensive blood panel analysis guidance' },
      { included: true, text: 'Dedicated personal locker with monogrammed gear' }
    ],
    ctaText: 'Apply for Mentorship'
  }
];

export const FACILITY_ZONES: FacilityZone[] = [
  {
    id: 'strength-floor',
    title: 'The Iron Sanctum & Olympic Floor',
    category: 'Strength',
    headline: 'Heavy calibrated steel, precision knurling, and zero noise restrictions',
    specs: ['6,500 sq.ft shock-absorbing virgin rubber flooring', '8 Eleiko Olympic competition power racks', 'Calibrated steel and bumper plates up to 500 kg per rack'],
    equipment: [
      'Eleiko IPF approved power bars & calibrated discs',
      'Hammer Strength plate-loaded iso-lateral machines',
      'Watson pro dumbbells up to 70 kg in 2 kg increments',
      'Glute ham developers, reverse hyperextensions & belt squat machines'
    ],
    ambiance: 'Directional focused amber illumination, raw industrial concrete, acoustics tuned for heavy lifts.'
  },
  {
    id: 'recovery-suite',
    title: 'Cryo & Nordic Recovery Suite',
    category: 'Recovery',
    headline: 'Accelerate muscular repair and central nervous system decompression',
    specs: ['Dedicated quiet thermal zone', 'Filtered 4°C continuous circulation ice plunge', 'Dry Finnish cedar sauna operating at 90°C'],
    equipment: [
      'High-capacity stainless steel chilled ice baths',
      'Handcrafted Finnish cedar dry heat sauna',
      'Hyperice percussion therapy guns & Normatec compression boots',
      'Acoustic meditation lounge with ergonomic zero-gravity recliners'
    ],
    ambiance: 'Soft recessed warm lighting, calming cedar aroma, whisper-quiet relaxation.'
  },
  {
    id: 'turf-agility',
    title: 'The Sprint Turf & Functional Loft',
    category: 'Conditioning',
    headline: '30-meter high-density athletic turf for explosive power & metabolic output',
    specs: ['30-meter sprint track with yardage markings', 'Heavy-duty ceiling-mounted suspension rigging', 'High-velocity ventilation system'],
    equipment: [
      'Rogue Dog Sleds with rubber ski runners',
      'Assault Fitness AirBikes and Concept2 Rowers & SkiErgs',
      'Cast iron Russian kettlebells from 8 kg to 48 kg',
      'Plyometric soft foam drop boxes and heavy slam balls'
    ],
    ambiance: 'High-energy natural light, crisp air circulation, performance-driven pacing.'
  },
  {
    id: 'biometric-lab',
    title: 'The Biometric Assessment Studio',
    category: 'Coaching',
    headline: 'Where your transformation is measured with clinical bio-impedance accuracy',
    specs: ['Private climate-controlled consultation suite', 'Medical calibration standards', 'Secure digital client profile synchronization'],
    equipment: [
      'InBody 770 multi-frequency body composition analyzer',
      'High-speed motion capture cameras for barbell bar-path velocity',
      'Harpenden skinfold calipers and tape anthropometry tools',
      'Biomechanical posture grid and inclinometers'
    ],
    ambiance: 'Clinical minimalism, private executive consultations, complete data confidentiality.'
  }
];

export const SCHEDULE_CLASSES: ScheduleClass[] = [
  {
    id: 's-1',
    time: '06:00 - 07:15',
    title: 'Barbell Mastery: Heavy Compound Waves',
    coach: 'Coach Raqib Aalam',
    category: 'Powerlifting',
    duration: '75 min',
    capacity: 10,
    spotsLeft: 2,
    day: 'Mon'
  },
  {
    id: 's-2',
    time: '07:30 - 08:30',
    title: 'Metabolic Sprint & Turf Conditioning',
    coach: 'Kavita Singh (CSCS)',
    category: 'Conditioning',
    duration: '60 min',
    capacity: 14,
    spotsLeft: 4,
    day: 'Mon'
  },
  {
    id: 's-3',
    time: '18:00 - 19:15',
    title: 'Hypertrophy Architecture: Upper Body Push',
    coach: 'Coach Raqib Aalam',
    category: 'Strength',
    duration: '75 min',
    capacity: 12,
    spotsLeft: 1,
    day: 'Mon'
  },
  {
    id: 's-4',
    time: '06:30 - 07:30',
    title: 'Spinal Decompression & Mobility Flow',
    coach: 'Dr. Tariq Anwar (Physio)',
    category: 'Mobility',
    duration: '60 min',
    capacity: 12,
    spotsLeft: 5,
    day: 'Tue'
  },
  {
    id: 's-5',
    time: '18:30 - 19:45',
    title: 'Squat & Posterior Chain Specialization',
    coach: 'Coach Raqib Aalam',
    category: 'Strength',
    duration: '75 min',
    capacity: 10,
    spotsLeft: 3,
    day: 'Tue'
  },
  {
    id: 's-6',
    time: '07:00 - 08:15',
    title: 'Olympic Weightlifting: Snatch & Clean',
    coach: 'Raqib Aalam & Staff',
    category: 'Powerlifting',
    duration: '75 min',
    capacity: 8,
    spotsLeft: 2,
    day: 'Wed'
  },
  {
    id: 's-7',
    time: '19:00 - 20:00',
    title: 'High-Lactate Anaerobic Threshold Circuit',
    coach: 'Kavita Singh (CSCS)',
    category: 'Conditioning',
    duration: '60 min',
    capacity: 14,
    spotsLeft: 6,
    day: 'Wed'
  },
  {
    id: 's-8',
    time: '08:00 - 09:30',
    title: 'Weekend Strength Syndicate (Open Platform)',
    coach: 'Coach Raqib Aalam',
    category: 'Strength',
    duration: '90 min',
    capacity: 16,
    spotsLeft: 3,
    day: 'Sat'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Training',
    question: 'I am a complete beginner. Is the Raqib Aalam Athletic Club too advanced for me?',
    answer: 'Not at all. More than 40% of our members began with zero prior barbell or gym experience. Every new member undergoes a thorough Movement & Posture Screening where we test joint mobility, spine health, and baseline strength before prescribing any heavy load. Our coach-to-member ratio on the floor ensures you are never lifting unguided.'
  },
  {
    id: 'faq-2',
    category: 'Membership',
    question: 'What is included in the Complimentary 1-Day Trial Pass?',
    answer: 'Your trial pass includes a full 90-minute session: 15 minutes of dynamic mobility screening, 45 minutes of customized supervised lifting or metabolic conditioning with a coach, and full access to our recovery suite (Finnish sauna & cold plunge) plus an InBody 770 composition scan report.'
  },
  {
    id: 'faq-3',
    category: 'Nutrition',
    question: 'Do you provide dietary support for strict Indian vegetarian diets?',
    answer: 'Absolutely. Coach Raqib has extensive experience tailoring high-protein dietary blueprints for Indian vegetarian, vegan, and traditional home-cooked meal patterns (utilizing paneer, Greek yogurt, lentils, sprouted legumes, seitan, and clean whey supplements). We never force unsustainable Western meal plans.'
  },
  {
    id: 'faq-4',
    category: 'Training',
    question: 'How does Coach Raqib’s 1-on-1 Mentorship differ from regular gym trainers?',
    answer: 'In typical commercial gyms, trainers stand by checking their phones. In Raqib’s mentorship, you receive medical-grade coaching: biomechanical angle checks, weekly periodization sheets, progressive overload logs, direct WhatsApp contact for daily food logs, and proactive physiological adjustments.'
  },
  {
    id: 'faq-5',
    category: 'Membership',
    question: 'Can I freeze my membership if I travel for business or vacation?',
    answer: 'Yes. All Quarterly members can freeze their membership for up to 21 days, and Annual members can freeze for up to 60 days without penalty. In addition, Coach Raqib provides digital travel workout routines to maintain your momentum abroad.'
  },
  {
    id: 'faq-6',
    category: 'Facilities',
    question: 'Where are your physical gym locations in India?',
    answer: 'Our flagship clubs are located in Greater Kailash II (New Delhi), Bandra West (Mumbai), and Indiranagar (Bengaluru). For athletes outside these cities, Coach Raqib runs the Global Digital Athletic Mentorship with clients in the UK, UAE, USA, and Singapore.'
  }
];

export const SAMPLE_MEMBER: MemberUser = {
  name: 'Karanveer Malhotra',
  email: 'karanveer.m@outlook.com',
  membershipTier: 'Pro Performance Member',
  activeSince: 'August 2025',
  trainer: 'Coach Raqib Aalam',
  currentStreak: 18,
  sessionsCompleted: 84,
  nextSession: 'Tomorrow, 06:30 AM (Strength Floor Platform 3)',
  weightProgress: [
    { week: 'W1', weight: 88.5 },
    { week: 'W3', weight: 86.8 },
    { week: 'W6', weight: 84.4 },
    { week: 'W9', weight: 82.7 },
    { week: 'W12', weight: 81.1 },
    { week: 'W16', weight: 79.5 },
  ],
  todayWorkout: [
    { exercise: 'Eleiko Competition Low-Bar Squat', sets: '4 sets', reps: '6 reps', targetWeight: '135 kg (RPE 8)' },
    { exercise: 'Romanian Deadlift (Clean Grip)', sets: '3 sets', reps: '8 reps', targetWeight: '110 kg' },
    { exercise: 'Hammer Strength Bulgarian Split Squat', sets: '3 sets', reps: '10 reps/side', targetWeight: '32 kg DBs' },
    { exercise: 'Standing Calf Raise on Platform', sets: '4 sets', reps: '12 reps', targetWeight: '90 kg' },
    { exercise: 'Ice Cold Plunge Bath (Recovery)', sets: '1 session', reps: '4 minutes', targetWeight: '4°C Temp' }
  ]
};

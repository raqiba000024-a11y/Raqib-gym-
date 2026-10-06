export type PageView = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'membership' 
  | 'transformations' 
  | 'facilities' 
  | 'schedule' 
  | 'contact' 
  | 'portal';

export interface Program {
  id: string;
  title: string;
  tagline: string;
  category: 'Strength' | 'Conditioning' | 'Personal' | 'Rehab';
  duration: string;
  intensity: 'High' | 'Very High' | 'Customized' | 'Moderate';
  description: string;
  features: string[];
  schedule: string;
  idealFor: string;
  badge?: string;
}

export interface Transformation {
  id: string;
  name: string;
  age: number;
  profession: string;
  goal: 'Fat Loss' | 'Muscle Hypertrophy' | 'Athletic Performance' | 'Executive Health';
  duration: string;
  weightChange: string;
  bodyFatChange: string;
  strengthGain: string;
  quote: string;
  coachNotes: string;
  initials: string;
  accentColor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: {
    included: boolean;
    text: string;
  }[];
  ctaText: string;
}

export interface FacilityZone {
  id: string;
  title: string;
  category: 'Strength' | 'Recovery' | 'Cardio' | 'Coaching' | 'Conditioning';
  headline: string;
  specs: string[];
  equipment: string[];
  ambiance: string;
}

export interface ScheduleClass {
  id: string;
  time: string;
  title: string;
  coach: string;
  category: 'Strength' | 'Conditioning' | 'Mobility' | 'Powerlifting';
  duration: string;
  capacity: number;
  spotsLeft: number;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Membership' | 'Training' | 'Nutrition' | 'Facilities';
}

export interface MemberUser {
  name: string;
  email: string;
  membershipTier: string;
  activeSince: string;
  trainer: string;
  currentStreak: number;
  sessionsCompleted: number;
  nextSession: string;
  weightProgress: { week: string; weight: number }[];
  todayWorkout: { exercise: string; sets: string; reps: string; targetWeight: string }[];
}

export type PageView = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'membership' 
  | 'transformations' 
  | 'facilities' 
  | 'schedule' 
  | 'contact' 
  | 'portal'
  | 'admin';

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

export interface LeadTrial {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  slot: string;
  goal: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Attended' | 'Converted';
  notes?: string;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Club Athlete' | 'Pro Performance' | 'VIP Mentorship';
  status: 'Active' | 'Frozen' | 'Expired';
  joinedDate: string;
  assignedCoach: string;
  streakDays: number;
  lastCheckIn: string;
  monthlyFee: number;
}

export interface InBodyScanRecord {
  id: string;
  memberName: string;
  date: string;
  weightKg: number;
  skeletalMuscleKg: number;
  bodyFatPercent: number;
  visceralFatLevel: number;
  coachRemarks: string;
}


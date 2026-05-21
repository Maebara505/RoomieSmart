export interface Demographics {
  age: number;
  originCity: string;
  occupation: 'STUDENT_ONLY' | 'WORKING_ONLY' | 'STUDENT_AND_WORKING';
  hobbies: string[];
  musicalTastes: string[];
  hasVehicle: 'CAR' | 'MOTORCYCLE' | 'NONE';
}

export interface LifestylePreferences {
  maxBudget: number;
  cleanlinessLevel: 'IMMACULATE' | 'MODERATE' | 'RELAXED';
  petTolerance: 'PET_FRIENDLY' | 'NO_PETS';
  studySchedule: 'EARLY_BIRD' | 'NIGHT_OWL' | 'FLEXIBLE';
  socialHabits: 'PARTY_HOUSE' | 'OCCASIONAL_GUESTS' | 'STRICTLY_PRIVATE'; 
  smokingHabits: 'SMOKER' | 'OUTSIDE_ONLY' | 'NON_SMOKER';
  foodSharing: 'SHARE_EVERYTHING' | 'SHARE_BASICS' | 'STRICTLY_SEPARATE';
  noiseTolerance: 'SILENCE_NEEDED' | 'MODERATE_NOISE' | 'LOUD_OK';
  homeTime: 'STAYS_ALL_DAY' | 'ONLY_NIGHTS' | 'BALANCED';
}

export interface TenantOnboardingPayload {
  fullName: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  demographics: Demographics;
  preferences: LifestylePreferences;
}

export interface TenantLoginPayload {
  email: string;
  passwordHash: string;
}
export interface Demographics {
  age: number;
  originCity: string;
  occupation: 'STUDENT_ONLY' | 'WORKING_ONLY' | 'STUDENT_AND_WORKING';
  hobbies: string[];
  musicalTastes: string[]; // <-- Nuevo
  hasVehicle: 'CAR' | 'MOTORCYCLE' | 'NONE'; // <-- Nuevo
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
  homeTime: 'STAYS_ALL_DAY' | 'ONLY_NIGHTS' | 'BALANCED'; // <-- Nueva sugerencia importante
}

export interface TenantOnboardingPayload {
  email: string;
  passwordHash: string;
  phoneNumber: string; // <-- Nuevo (Dato de contacto directo)
  demographics: Demographics;
  preferences: LifestylePreferences;
}

export interface TenantLoginPayload {
  email: string;
  passwordHash: string;
}
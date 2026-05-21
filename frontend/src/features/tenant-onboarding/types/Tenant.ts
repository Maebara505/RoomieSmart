export interface LifestylePreferences {
  maxBudget: number;
  cleanlinessLevel: 'IMMACULATE' | 'MODERATE' | 'RELAXED';
  petTolerance: 'PET_FRIENDLY' | 'NO_PETS';
  studySchedule: 'EARLY_BIRD' | 'NIGHT_OWL' | 'FLEXIBLE';
}

export interface TenantOnboardingPayload {
  email: string;
  passwordHash: string;
  preferences: LifestylePreferences;
}

export interface TenantLoginPayload {
  email: string;
  passwordHash: string;
}
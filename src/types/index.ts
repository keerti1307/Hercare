export type NavigationTab = 
  | 'landing'
  | 'dashboard'
  | 'my-health'
  | 'cycle'
  | 'wellness'
  | 'nutrition'
  | 'activity'
  | 'insights'
  | 'reports'
  | 'profile';

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'difficult';

export interface DailyCheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodType;
  moodScore: number; // 1-10
  stress: number; // 1-10
  energy: number; // 1-10
  sleepHours: number;
  symptoms: string[];
  notes?: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  startingWeightKg: number;
  focusAreas: string[];
  goals: string[];
  cycleLengthDays: number;
  periodLengthDays: number;
  lastPeriodDate: string; // YYYY-MM-DD
  hasOnboarded: boolean;
  waterGlassesGoal: number;
  weeklyActivityGoalMinutes: number;
}

export interface ActivityEntry {
  id: string;
  date: string;
  type: 'walking' | 'running' | 'yoga' | 'gym' | 'cycling' | 'home workout' | 'pilates' | 'swimming';
  durationMinutes: number;
  intensity: 'light' | 'moderate' | 'vigorous';
  caloriesBurned?: number;
  notes?: string;
}

export interface MealItem {
  id: string;
  title: string;
  category: 'protein' | 'vegetables' | 'fruits' | 'grains' | 'healthy-fats';
  portion?: string;
}

export interface MealLog {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  description: string;
  categories: string[];
  time: string;
}

export interface SymptomLog {
  id: string;
  date: string;
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'cycle' | 'wellness' | 'habit' | 'privacy';
}

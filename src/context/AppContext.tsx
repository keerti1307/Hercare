import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
  UserProfile,
  DailyCheckIn,
  ActivityEntry,
  MealLog,
  SymptomLog,
  NotificationItem,
} from '../types';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  checkIns: DailyCheckIn[];
  todayCheckIn: DailyCheckIn | undefined;
  addCheckIn: (checkIn: Omit<DailyCheckIn, 'id' | 'timestamp'>) => void;
  waterGlasses: number;
  incrementWater: () => void;
  decrementWater: () => void;
  activities: ActivityEntry[];
  addActivity: (activity: Omit<ActivityEntry, 'id'>) => void;
  meals: MealLog[];
  addMeal: (meal: Omit<MealLog, 'id'>) => void;
  symptoms: SymptomLog[];
  addSymptom: (symptom: Omit<SymptomLog, 'id'>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  isCheckInModalOpen: boolean;
  setIsCheckInModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  exportDataJSON: () => void;
  resetAllData: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Elena Vance',
  email: 'elena.vance@example.com',
  age: 28,
  heightCm: 165,
  weightKg: 58.4,
  startingWeightKg: 61.0,
  targetWeightKg: 57.0,
  focusAreas: ['Menstrual health', 'PCOS/PCOD wellness', 'Mental wellness', 'Nutrition'],
  goals: ['Understand my health', 'Build healthier habits', 'Track my cycle', 'Monitor my progress'],
  cycleLengthDays: 29,
  periodLengthDays: 5,
  lastPeriodDate: '2026-09-15',
  hasOnboarded: true,
  waterGlassesGoal: 8,
  weeklyActivityGoalMinutes: 150,
};

const INITIAL_CHECKINS: DailyCheckIn[] = [
  {
    id: 'ci-1',
    date: '2026-09-24',
    mood: 'good',
    moodScore: 7,
    stress: 4,
    energy: 7,
    sleepHours: 7.5,
    symptoms: ['Mild fatigue'],
    notes: 'Took a morning walk in the park. Felt calm.',
    timestamp: 1790250000000,
  },
  {
    id: 'ci-2',
    date: '2026-09-25',
    mood: 'great',
    moodScore: 8,
    stress: 3,
    energy: 8,
    sleepHours: 8.0,
    symptoms: [],
    notes: 'Great energy today. Balanced lunch.',
    timestamp: 1790336400000,
  },
  {
    id: 'ci-3',
    date: '2026-09-26',
    mood: 'okay',
    moodScore: 6,
    stress: 6,
    energy: 6,
    sleepHours: 6.8,
    symptoms: ['Bloating', 'Mild headache'],
    notes: 'Busy workday, had to stretch in the evening.',
    timestamp: 1790422800000,
  },
  {
    id: 'ci-4',
    date: '2026-09-27',
    mood: 'good',
    moodScore: 7,
    stress: 5,
    energy: 7,
    sleepHours: 7.2,
    symptoms: ['Fatigue'],
    notes: 'Yoga class helped with lower back tension.',
    timestamp: 1790509200000,
  },
  {
    id: 'ci-5',
    date: '2026-09-28',
    mood: 'okay',
    moodScore: 6,
    stress: 5,
    energy: 6,
    sleepHours: 6.5,
    symptoms: ['Cramps'],
    notes: 'Drank chamomile tea before bed.',
    timestamp: 1790595600000,
  },
  {
    id: 'ci-6',
    date: '2026-09-29',
    mood: 'good',
    moodScore: 7,
    stress: 4,
    energy: 7,
    sleepHours: 7.33, // 7h 20m
    symptoms: ['Mild bloating'],
    notes: 'Clear mind and positive outlook today.',
    timestamp: 1790682000000,
  },
];

const INITIAL_ACTIVITIES: ActivityEntry[] = [
  {
    id: 'act-1',
    date: '2026-09-29',
    type: 'walking',
    durationMinutes: 32,
    intensity: 'moderate',
    caloriesBurned: 145,
    notes: 'Morning nature stroll around the neighborhood.',
  },
  {
    id: 'act-2',
    date: '2026-09-27',
    type: 'yoga',
    durationMinutes: 40,
    intensity: 'light',
    caloriesBurned: 120,
    notes: 'Gentle restorative yoga for cycle phase.',
  },
  {
    id: 'act-3',
    date: '2026-09-25',
    type: 'pilates',
    durationMinutes: 35,
    intensity: 'moderate',
    caloriesBurned: 180,
    notes: 'Core stability and posture alignment.',
  },
];

const INITIAL_MEALS: MealLog[] = [
  {
    id: 'm-1',
    date: '2026-09-29',
    mealType: 'breakfast',
    description: 'Chia seed pudding with fresh blueberries, pumpkin seeds, and almond milk',
    categories: ['protein', 'fruits', 'healthy-fats'],
    time: '08:30 AM',
  },
  {
    id: 'm-2',
    date: '2026-09-29',
    mealType: 'lunch',
    description: 'Warm quinoa bowl with roasted sweet potato, kale, avocado, and turmeric tahini',
    categories: ['whole-grains', 'vegetables', 'healthy-fats'],
    time: '01:15 PM',
  },
  {
    id: 'm-3',
    date: '2026-09-29',
    mealType: 'snacks',
    description: 'Handful of raw walnuts and chamomile infusion',
    categories: ['healthy-fats', 'hydration'],
    time: '04:45 PM',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Hydration reminder',
    description: 'You are 3 glasses away from your gentle daily goal of 8 glasses.',
    timestamp: '20 min ago',
    read: false,
    type: 'habit',
  },
  {
    id: 'notif-2',
    title: 'Cycle milestone: Ovulation window',
    description: 'Based on your 29-day rhythm, you are currently around Day 14.',
    timestamp: '2 hours ago',
    read: false,
    type: 'cycle',
  },
  {
    id: 'notif-3',
    title: 'Weekly wellness trend ready',
    description: 'Your sleep and activity correlation insights have been updated.',
    timestamp: 'Yesterday',
    read: true,
    type: 'wellness',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>(() => {
    const saved = localStorage.getItem('herwell_tab');
    return (saved as NavigationTab) || 'dashboard';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('herwell_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>(() => {
    const saved = localStorage.getItem('herwell_checkins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CHECKINS;
  });

  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('herwell_water');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [activities, setActivities] = useState<ActivityEntry[]>(() => {
    const saved = localStorage.getItem('herwell_activities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ACTIVITIES;
  });

  const [meals, setMeals] = useState<MealLog[]>(() => {
    const saved = localStorage.getItem('herwell_meals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MEALS;
  });

  const [symptoms, setSymptoms] = useState<SymptomLog[]>(() => {
    const saved = localStorage.getItem('herwell_symptoms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'sym-1', date: '2026-09-29', symptom: 'Mild bloating', severity: 'mild' },
      { id: 'sym-2', date: '2026-09-28', symptom: 'Cramps', severity: 'moderate' },
      { id: 'sym-3', date: '2026-09-26', symptom: 'Mild headache', severity: 'mild' },
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('herwell_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('herwell_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('herwell_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('herwell_checkins', JSON.stringify(checkIns));
  }, [checkIns]);

  useEffect(() => {
    localStorage.setItem('herwell_water', waterGlasses.toString());
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem('herwell_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('herwell_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('herwell_symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  useEffect(() => {
    localStorage.setItem('herwell_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const todayCheckIn = checkIns.find((c) => c.date === '2026-09-29');

  const addCheckIn = (newEntry: Omit<DailyCheckIn, 'id' | 'timestamp'>) => {
    const entry: DailyCheckIn = {
      ...newEntry,
      id: `ci-${Date.now()}`,
      timestamp: Date.now(),
    };
    setCheckIns((prev) => {
      // replace if exists for same date
      const filtered = prev.filter((c) => c.date !== entry.date);
      return [...filtered, entry].sort((a, b) => a.date.localeCompare(b.date));
    });

    // Also update symptom entries if any
    if (entry.symptoms.length > 0) {
      const newSyms: SymptomLog[] = entry.symptoms.map((s, idx) => ({
        id: `sym-${Date.now()}-${idx}`,
        date: entry.date,
        symptom: s,
        severity: 'mild',
      }));
      setSymptoms((prev) => [...newSyms, ...prev]);
    }
  };

  const incrementWater = () => {
    setWaterGlasses((prev) => Math.min(prev + 1, 16));
  };

  const decrementWater = () => {
    setWaterGlasses((prev) => Math.max(prev - 1, 0));
  };

  const addActivity = (act: Omit<ActivityEntry, 'id'>) => {
    const entry: ActivityEntry = {
      ...act,
      id: `act-${Date.now()}`,
    };
    setActivities((prev) => [entry, ...prev]);
  };

  const addMeal = (m: Omit<MealLog, 'id'>) => {
    const entry: MealLog = {
      ...m,
      id: `m-${Date.now()}`,
    };
    setMeals((prev) => [entry, ...prev]);
  };

  const addSymptom = (s: Omit<SymptomLog, 'id'>) => {
    const entry: SymptomLog = {
      ...s,
      id: `sym-${Date.now()}`,
    };
    setSymptoms((prev) => [entry, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const exportDataJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      profile,
      checkIns,
      activities,
      meals,
      symptoms,
      waterGlasses,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `herwell-health-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    localStorage.clear();
    setProfile({ ...DEFAULT_PROFILE, hasOnboarded: false });
    setCheckIns([]);
    setWaterGlasses(0);
    setActivities([]);
    setMeals([]);
    setSymptoms([]);
    setNotifications([]);
    setCurrentTab('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        profile,
        updateProfile,
        checkIns,
        todayCheckIn,
        addCheckIn,
        waterGlasses,
        incrementWater,
        decrementWater,
        activities,
        addActivity,
        meals,
        addMeal,
        symptoms,
        addSymptom,
        notifications,
        markNotificationAsRead,
        isCheckInModalOpen,
        setIsCheckInModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        exportDataJSON,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

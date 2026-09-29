import React, { useState } from 'react';
import {
  Scale,
  Flame,
  Activity,
  Plus,
  TrendingDown,
  Dumbbell,
  CheckCircle2,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityEntry } from '../../types';

export const FitnessWeightView: React.FC = () => {
  const { profile, updateProfile, activities, addActivity } = useApp();

  const [showLogActivityModal, setShowLogActivityModal] = useState(false);
  const [showUpdateWeightModal, setShowUpdateWeightModal] = useState(false);

  // Form states
  const [activityType, setActivityType] = useState<ActivityEntry['type']>('walking');
  const [durationMins, setDurationMins] = useState<number>(30);
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'vigorous'>('moderate');
  const [activityNotes, setActivityNotes] = useState('');

  const [newWeight, setNewWeight] = useState<number>(profile.weightKg || 58.4);

  // Calculate totals
  const weeklyTotalMins = activities.reduce((sum, a) => sum + a.durationMinutes, 32);
  const weeklyGoalMins = profile.weeklyActivityGoalMinutes || 150;
  const weeklyGoalPct = Math.min(Math.round((weeklyTotalMins / weeklyGoalMins) * 100), 100);

  const weightChange = (profile.startingWeightKg - profile.weightKg).toFixed(1);

  // Clean weight trend history points
  const weightTrend = [
    { date: 'Aug 15', weight: 61.0 },
    { date: 'Aug 29', weight: 60.2 },
    { date: 'Sep 10', weight: 59.5 },
    { date: 'Sep 20', weight: 58.9 },
    { date: 'Sep 29', weight: 58.4 },
  ];

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      date: '2026-09-29',
      type: activityType,
      durationMinutes: Number(durationMins),
      intensity,
      caloriesBurned: durationMins * (intensity === 'light' ? 3.5 : intensity === 'moderate' ? 5 : 7),
      notes: activityNotes,
    });
    setShowLogActivityModal(false);
    setActivityNotes('');
  };

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ weightKg: Number(newWeight) });
    setShowUpdateWeightModal(false);
  };

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Your Progress
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Gentle, sustainable health milestones focused on strength, vitality, and well-being.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowUpdateWeightModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Scale className="h-3.5 w-3.5" />
            <span>Update Weight</span>
          </button>
          <button
            onClick={() => setShowLogActivityModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Log Activity</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Current Weight</span>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
            {profile.weightKg} kg
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            -{weightChange} kg from start
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Starting Weight</span>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
            {profile.startingWeightKg} kg
          </div>
          <span className="text-[11px] text-slate-500">Recorded August 15</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Comfort Goal</span>
          <div className="mt-1 font-mono text-2xl font-bold text-purple-900 tabular-nums">
            {profile.targetWeightKg} kg
          </div>
          <span className="text-[11px] text-purple-700 font-medium">
            1.4 kg to gentle target
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Weekly Movement</span>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-900 tabular-nums">
            {weeklyTotalMins} / {weeklyGoalMins} m
          </div>
          <span className="text-[11px] text-amber-700 font-medium">
            {weeklyGoalPct}% of target reached
          </span>
        </div>
      </div>

      {/* Main Grid: Clean Weight Trend Graph & Weekly Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Weight Trend Graph */}
        <div className="lg:col-span-7 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                Weight Trend
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gentle curve over the past 6 weeks (fluctuations are natural)
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <TrendingDown className="h-4 w-4" />
              <span>-2.6 kg (Sustainable)</span>
            </div>
          </div>

          {/* Clean line / area graph */}
          <div className="mt-8">
            <div className="flex items-end justify-between gap-4 h-48 px-2">
              {weightTrend.map((pt, idx) => {
                // map 57kg -> 0%, 62kg -> 100%
                const heightPct = Math.round(((pt.weight - 57) / 5) * 100);
                const isLatest = idx === weightTrend.length - 1;
                return (
                  <div key={pt.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="font-mono text-xs font-bold text-slate-800 tabular-nums">
                      {pt.weight}
                    </span>
                    <div className="w-full max-w-[28px] rounded-t-lg bg-slate-100 h-full flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isLatest ? 'bg-purple-700' : 'bg-purple-200'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isLatest ? 'font-bold text-purple-900' : 'text-slate-500'}`}>
                      {pt.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <strong>Healthy perspective:</strong> Weight naturally shifts by 1–2 kg across your menstrual cycle due to temporary water retention during the luteal phase.
          </div>
        </div>

        {/* Right (5 cols): Activity Goal & Logged Workouts */}
        <div className="lg:col-span-5 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                Weekly Activity Goal
              </h2>
              <span className="font-mono text-xs font-bold text-purple-700">
                {weeklyTotalMins} / 150 min
              </span>
            </div>

            {/* Circular / Bar progress summary */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
                <span>Moderate Cardio & Strength</span>
                <span>{weeklyGoalPct}% completed</span>
              </div>
              <div className="h-3 w-full rounded-full bg-amber-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${weeklyGoalPct}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-amber-800">
                You're just 43 minutes of light movement away from this week's baseline!
              </p>
            </div>

            {/* Recent Workouts list */}
            <div className="mt-5 space-y-2.5">
              <span className="text-xs font-bold text-slate-700">Recent Movement</span>
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#FAF8F5] p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 capitalize">
                        {act.type}
                      </div>
                      <div className="text-[10px] text-slate-500">{act.date} · {act.intensity} intensity</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-slate-800">{act.durationMinutes} min</div>
                    {act.caloriesBurned && (
                      <div className="text-[10px] text-slate-400 font-mono">~{Math.round(act.caloriesBurned)} kcal</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Log Activity Modal */}
      {showLogActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC]">
            <h3 className="font-editorial text-xl font-bold text-slate-900">Log Activity</h3>
            <p className="text-xs text-slate-500 mt-0.5">Celebrate every minute of movement</p>

            <form onSubmit={handleSaveActivity} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Activity Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['walking', 'running', 'yoga', 'gym', 'cycling', 'home workout', 'pilates', 'swimming'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActivityType(type)}
                      className={`rounded-xl py-2 px-2 text-xs capitalize transition-colors text-center ${
                        activityType === type
                          ? 'bg-purple-700 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  required
                  min="5"
                  max="240"
                  value={durationMins}
                  onChange={(e) => setDurationMins(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'moderate', 'vigorous'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setIntensity(lvl)}
                      className={`rounded-xl py-2 px-2 text-xs capitalize ${
                        intensity === lvl
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  value={activityNotes}
                  onChange={(e) => setActivityNotes(e.target.value)}
                  placeholder="e.g. Scenic nature trail, felt energized"
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLogActivityModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-700 px-5 py-2 text-xs font-bold text-white hover:bg-purple-800"
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Weight Modal */}
      {showUpdateWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC]">
            <h3 className="font-editorial text-xl font-bold text-slate-900">Record Current Weight</h3>
            <p className="text-xs text-slate-500 mt-0.5">Focus on consistency and feeling good</p>

            <form onSubmit={handleSaveWeight} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weight in kilograms (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-lg font-mono font-bold text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowUpdateWeightModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-700 px-5 py-2 text-xs font-bold text-white hover:bg-purple-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

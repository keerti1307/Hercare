import React from 'react';
import {
  Smile,
  Moon,
  Flame,
  Droplets,
  CalendarHeart,
  Scale,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Heart,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    profile,
    todayCheckIn,
    waterGlasses,
    incrementWater,
    decrementWater,
    setIsCheckInModalOpen,
    setCurrentTab,
    activities,
  } = useApp();

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Elena';

  // Metrics calculation
  const sleepDisplay = todayCheckIn?.sleepHours
    ? `${Math.floor(todayCheckIn.sleepHours)}h ${Math.round((todayCheckIn.sleepHours % 1) * 60)}m`
    : '7h 20m';
  const moodScore = todayCheckIn?.moodScore || 7;
  const moodEmoji = todayCheckIn?.mood === 'great' ? '😄' : todayCheckIn?.mood === 'okay' ? '😐' : '🙂';

  const todayActivityMins = activities
    .filter((a) => a.date === '2026-09-29')
    .reduce((sum, a) => sum + a.durationMinutes, 32);

  // Today's Wellness progress calculations
  const sleepPct = Math.min(Math.round(((todayCheckIn?.sleepHours || 7.33) / 8) * 100), 100);
  const waterPct = Math.min(Math.round((waterGlasses / (profile.waterGlassesGoal || 8)) * 100), 100);
  const activityPct = Math.min(Math.round((todayActivityMins / 45) * 100), 100);
  const moodPct = Math.min(moodScore * 10, 100);

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Good morning, {firstName} 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Here’s your wellness overview for today. Take gentle care of yourself.
          </p>
        </div>

        {/* Daily Check-in CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCheckInModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-purple-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>{todayCheckIn ? 'Update Check-in' : 'Daily Check-in'}</span>
          </button>
        </div>
      </div>

      {/* Top 6 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Mood */}
        <div
          onClick={() => setCurrentTab('wellness')}
          className="group cursor-pointer rounded-2xl border border-[#EAE4DC] bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Mood</span>
            <span className="text-lg">{moodEmoji}</span>
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">
            {moodScore}/10
          </div>
          <div className="mt-1 text-[11px] text-purple-700 font-medium">
            {todayCheckIn?.mood ? todayCheckIn.mood : 'Balanced'}
          </div>
        </div>

        {/* Sleep */}
        <div
          onClick={() => setCurrentTab('wellness')}
          className="group cursor-pointer rounded-2xl border border-[#EAE4DC] bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Sleep</span>
            <Moon className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">
            {sleepDisplay}
          </div>
          <div className="mt-1 text-[11px] text-indigo-700 font-medium">Restorative</div>
        </div>

        {/* Activity */}
        <div
          onClick={() => setCurrentTab('activity')}
          className="group cursor-pointer rounded-2xl border border-[#EAE4DC] bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Activity</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">
            {todayActivityMins} min
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">On track</div>
        </div>

        {/* Water */}
        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Water</span>
            <Droplets className="h-4 w-4 text-teal-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">
            {waterGlasses} / {profile.waterGlassesGoal || 8}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <button
              onClick={decrementWater}
              className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              title="Remove glass"
            >
              <Minus className="h-3 w-3" />
            </button>
            <button
              onClick={incrementWater}
              className="flex-1 flex h-6 items-center justify-center gap-1 rounded-lg bg-teal-600 text-white text-[11px] font-bold hover:bg-teal-700"
              title="Add glass"
            >
              <Plus className="h-3 w-3" />
              <span>Glass</span>
            </button>
          </div>
        </div>

        {/* Cycle */}
        <div
          onClick={() => setCurrentTab('cycle')}
          className="group cursor-pointer rounded-2xl border border-[#EAE4DC] bg-white p-4 transition-all hover:border-rose-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Cycle</span>
            <CalendarHeart className="h-4 w-4 text-rose-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">Day 14</div>
          <div className="mt-1 text-[11px] text-rose-700 font-medium">Ovulatory Phase</div>
        </div>

        {/* Weight */}
        <div
          onClick={() => setCurrentTab('activity')}
          className="group cursor-pointer rounded-2xl border border-[#EAE4DC] bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Weight</span>
            <Scale className="h-4 w-4 text-purple-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900 tabular-nums">
            {profile.weightKg} kg
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Stable & healthy</div>
        </div>
      </div>

      {/* Main Grid: Today's Wellness Rings/Bars + Today's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Today's Wellness Visual Bars */}
        <div className="lg:col-span-7 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                Today's Wellness
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gentle progress across your key pillars
              </p>
            </div>
            <span className="text-xs text-purple-700 font-medium">
              Synchronized today
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {/* Sleep Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  <span className="font-semibold text-slate-800">Sleep</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{sleepDisplay} / 8h goal</span>
                </div>
                <span className="font-mono font-bold text-indigo-900">{sleepPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${sleepPct}%` }}
                />
              </div>
            </div>

            {/* Hydration Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-teal-500" />
                  <span className="font-semibold text-slate-800">Hydration</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    {waterGlasses} of {profile.waterGlassesGoal || 8} glasses
                  </span>
                </div>
                <span className="font-mono font-bold text-teal-900">{waterPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-500 transition-all duration-500"
                  style={{ width: `${waterPct}%` }}
                />
              </div>
            </div>

            {/* Activity Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span className="font-semibold text-slate-800">Activity</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{todayActivityMins} / 45 min target</span>
                </div>
                <span className="font-mono font-bold text-amber-900">{activityPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${activityPct}%` }}
                />
              </div>
            </div>

            {/* Mood Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Smile className="h-4 w-4 text-purple-500" />
                  <span className="font-semibold text-slate-800">Mood & Balance</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{moodScore} of 10</span>
                </div>
                <span className="font-mono font-bold text-purple-900">{moodPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-500"
                  style={{ width: `${moodPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick shortcuts row */}
          <div className="mt-8 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2">
            <button
              onClick={() => setCurrentTab('nutrition')}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-center hover:bg-white hover:border-purple-200 transition-colors"
            >
              <span className="block text-xs font-semibold text-slate-800">Log Meal</span>
              <span className="text-[10px] text-slate-500">Record wholesome food</span>
            </button>
            <button
              onClick={() => setCurrentTab('activity')}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-center hover:bg-white hover:border-purple-200 transition-colors"
            >
              <span className="block text-xs font-semibold text-slate-800">Log Workout</span>
              <span className="text-[10px] text-slate-500">Yoga, walking, gym</span>
            </button>
            <button
              onClick={() => setCurrentTab('cycle')}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-center hover:bg-white hover:border-purple-200 transition-colors"
            >
              <span className="block text-xs font-semibold text-slate-800">Cycle Log</span>
              <span className="text-[10px] text-slate-500">Phase & symptoms</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Today's Focus & Insights */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-5">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="h-4 w-4 text-purple-700" />
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                Today's Focus
              </h2>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Consistent Movement</h4>
                  <p className="mt-0.5 text-xs text-emerald-800 leading-relaxed">
                    “Your activity has been consistent this week.”
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3.5 flex items-start gap-3">
                <Moon className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-indigo-950">Sleep Regularity</h4>
                  <p className="mt-0.5 text-xs text-indigo-800 leading-relaxed">
                    “Your recorded sleep was lower yesterday. Consider maintaining a regular sleep schedule.”
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-3.5 flex items-start gap-3">
                <CalendarHeart className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-rose-950">Cycle Awareness</h4>
                  <p className="mt-0.5 text-xs text-rose-800 leading-relaxed">
                    “Remember to log today's cycle symptoms.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick interactive link */}
          <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-purple-950">Detailed Correlations</p>
                <p className="text-[11px] text-purple-800 mt-0.5">
                  See how sleep and stress interact with your cycle.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('insights')}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-700 text-white hover:bg-purple-800 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Info,
  Moon,
  Smile,
  Flame,
  Scale,
  CalendarHeart,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InsightsView: React.FC = () => {
  const { checkIns, profile } = useApp();

  // Multi-day comparative data
  const correlationData = [
    { date: 'Sep 24', sleep: 7.5, stress: 4, mood: 7, activity: 30 },
    { date: 'Sep 25', sleep: 8.0, stress: 3, mood: 8, activity: 45 },
    { date: 'Sep 26', sleep: 6.8, stress: 6, mood: 6, activity: 20 },
    { date: 'Sep 27', sleep: 7.2, stress: 5, mood: 7, activity: 40 },
    { date: 'Sep 28', sleep: 6.5, stress: 5, mood: 6, activity: 25 },
    { date: 'Sep 29', sleep: 7.3, stress: 4, mood: 7, activity: 32 },
  ];

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Your Health Insights
          </h1>
          <span className="rounded-xl bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
            Self-Reported Patterns
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Discover meaningful connections between sleep, stress, activity, and hormonal phases.
        </p>
      </div>

      {/* Observational Non-Medical Disclaimer */}
      <div className="rounded-2xl border border-slate-200 bg-[#FAF8F5] p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-purple-700 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Personal observations:</strong> These patterns reflect relationships in your self-reported logs over time. They are intended for lifestyle awareness and informed conversations with your physician, not clinical diagnosis.
        </p>
      </div>

      {/* Highlighted Key Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pattern 1 */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                Sleep & Stress Correlation
              </span>
              <div className="flex items-center text-xs font-bold text-emerald-700 gap-1">
                <ArrowDownRight className="h-4 w-4" />
                <span>Strong Pattern</span>
              </div>
            </div>

            <h3 className="font-editorial text-xl font-bold text-slate-900">
              “Your recorded stress was higher on days when your sleep duration was lower.”
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              When sleep logged was under 7.0 hours, next-day stress averaged <strong>5.8/10</strong> compared to <strong>3.5/10</strong> on nights with 7.5+ hours of rest.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Recommended focus: 15-minute earlier wind-down</span>
            <Moon className="h-4 w-4 text-indigo-500" />
          </div>
        </div>

        {/* Pattern 2 */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Activity & Vitality
              </span>
              <div className="flex items-center text-xs font-bold text-emerald-700 gap-1">
                <ArrowUpRight className="h-4 w-4" />
                <span>+24% Consistency</span>
              </div>
            </div>

            <h3 className="font-editorial text-xl font-bold text-slate-900">
              “Your activity level has increased over the last four weeks.”
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              You averaged <strong>135 active minutes</strong> per week in September compared to 108 minutes in August, with yoga and brisk walking driving the growth.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Progress: On track for 150 min goal</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Visual Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Sleep vs Stress Dual Trend */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Sleep Duration vs. Stress Level
              </h3>
              <p className="text-xs text-slate-500">Notice the inverse relationship</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600">Sleep (hrs)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="text-slate-600">Stress (1-10)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-end justify-between gap-3 h-48 px-2">
            {correlationData.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="flex items-end gap-1 w-full justify-center h-full">
                  {/* Sleep bar */}
                  <div
                    className="w-3 rounded-t-md bg-indigo-500"
                    style={{ height: `${(d.sleep / 10) * 100}%` }}
                    title={`Sleep: ${d.sleep}h`}
                  />
                  {/* Stress bar */}
                  <div
                    className="w-3 rounded-t-md bg-rose-400"
                    style={{ height: `${(d.stress / 10) * 100}%` }}
                    title={`Stress: ${d.stress}/10`}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{d.date.slice(4)}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Observation: Nights with 7.5+ hours of sleep immediately precede calmer reported days.
          </p>
        </div>

        {/* Chart 2: Mood Trend Across Days */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Daily Mood Trajectory
              </h3>
              <p className="text-xs text-slate-500">Emotional energy stability score (1–10)</p>
            </div>
            <span className="font-mono text-xs font-bold text-purple-700">7.0 average</span>
          </div>

          <div className="pt-4 flex items-end justify-between gap-3 h-48 px-2">
            {correlationData.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="font-mono text-[11px] font-bold text-slate-700">{d.mood}</span>
                <div className="w-full max-w-[28px] rounded-t-lg bg-slate-100 h-full flex items-end">
                  <div
                    className="w-full rounded-t-lg bg-purple-600 transition-all duration-500"
                    style={{ height: `${(d.mood / 10) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{d.date.slice(4)}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Observation: Mood scores are highest during the ovulatory window (Days 12–15).
          </p>
        </div>
      </div>

      {/* Additional Observational Patterns */}
      <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-editorial text-xl font-bold text-slate-900">
          More Personal Patterns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-100 bg-[#FAF8F5] p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-purple-900">
              <CalendarHeart className="h-4 w-4 text-rose-500" />
              <span>Cycle & Energy Link</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Energy levels peak consistently during days 10–14 of your cycle, which aligns with peak estrogen production.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-[#FAF8F5] p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-teal-900">
              <Smile className="h-4 w-4 text-teal-500" />
              <span>Hydration & Headaches</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Mild headache symptoms were logged only on the two days when hydration fell below 5 glasses.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-[#FAF8F5] p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900">
              <Moon className="h-4 w-4 text-indigo-500" />
              <span>Evening Relaxation</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Logging wind-down routines directly corresponded to 38 minutes more recorded deep sleep duration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

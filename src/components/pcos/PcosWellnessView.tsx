import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  Moon,
  Smile,
  Apple,
  Scale,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PcosWellnessView: React.FC = () => {
  const { profile, checkIns } = useApp();

  const [activeTab, setActiveTab] = useState<'pcos' | 'thyroid'>('pcos');

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            {activeTab === 'pcos' ? 'PCOS & PCOD Wellness' : 'Thyroid Health Tracking'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Track your symptoms, lifestyle habits, and personal patterns in one place.
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab('pcos')}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'pcos'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PCOS / PCOD Support
          </button>
          <button
            onClick={() => setActiveTab('thyroid')}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'thyroid'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Thyroid Health Rhythm
          </button>
        </div>
      </div>

      {/* Prominent Medical Reassurance Banner */}
      <div className="rounded-3xl border border-purple-200 bg-purple-50/70 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
            Safe Lifestyle Companion
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-purple-900 leading-relaxed font-medium">
            “Lifestyle tracking can help you understand your personal patterns. For diagnosis or treatment decisions, consult a qualified healthcare professional.”
          </p>
          <p className="mt-1 text-[11px] text-purple-700">
            HerWell provides supportive lifestyle and habit logging. We never diagnose conditions, prescribe medications, or make unverified curative claims.
          </p>
        </div>
      </div>

      {/* Key Tracker Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Cycle Patterns</span>
            <Calendar className="h-4 w-4 text-purple-600" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">29 Days</div>
          <p className="mt-1 text-[11px] text-slate-500">Natural variation ± 2 days</p>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Weight Trend</span>
            <Scale className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">58.4 kg</div>
          <p className="mt-1 text-[11px] text-emerald-700">Steady & sustainable</p>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Movement Regularity</span>
            <Activity className="h-4 w-4 text-amber-600" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">4 days / wk</div>
          <p className="mt-1 text-[11px] text-slate-500">Low-cortisol walks & yoga</p>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Sleep Consistency</span>
            <Moon className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">7.2 hrs avg</div>
          <p className="mt-1 text-[11px] text-indigo-700">Supports hormone balance</p>
        </div>
      </div>

      {/* Main Section: Your Recent Patterns */}
      <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900">
              Your Recent Patterns
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Correlations observed from your logged lifestyle habits
            </p>
          </div>
          <span className="text-xs text-purple-700 font-semibold">Updated weekly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h4 className="text-xs font-bold">Activity Progress</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              “Your activity has increased over the past 3 weeks.”
            </p>
            <p className="text-[11px] text-slate-500">
              Consistent low-impact resistance training and daily steps support healthy cellular glucose uptake.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <Moon className="h-4 w-4 text-indigo-600" />
              <h4 className="text-xs font-bold">Sleep Observation</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              “Your recorded sleep has varied this month.”
            </p>
            <p className="text-[11px] text-slate-500">
              On nights with less than 6.5 hours of sleep, you logged slightly higher sweet cravings the following afternoon.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <Apple className="h-4 w-4 text-teal-600" />
              <h4 className="text-xs font-bold">Morning Protein Habit</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              “Starting breakfast with 25g+ of clean protein correlates with sustained 2:00 PM energy.”
            </p>
            <p className="text-[11px] text-slate-500">
              Balanced morning plates help maintain comfortable blood sugar stability.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <Smile className="h-4 w-4 text-purple-600" />
              <h4 className="text-xs font-bold">Cortisol Management</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              “Days with evening wind-down rituals show lower next-morning resting tension.”
            </p>
            <p className="text-[11px] text-slate-500">
              10 minutes of journaling or herbal tea provides a gentle bridge to restorative deep sleep.
            </p>
          </div>
        </div>
      </div>

      {/* Gentle Lifestyle Suggestions (Wellness-focused, no claims) */}
      <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Supportive Lifestyle Practices
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-slate-600">
          <div className="rounded-2xl border border-slate-200 p-4">
            <h5 className="font-bold text-slate-800 mb-1">Nourishing Movement</h5>
            <p className="text-[11px] leading-relaxed">
              Prioritize walking, Pilates, and resistance training. High-intensity cardio can sometimes elevate stress hormones when fatigue is present.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <h5 className="font-bold text-slate-800 mb-1">Plate Balance</h5>
            <p className="text-[11px] leading-relaxed">
              Incorporate fiber-dense greens, healthy omega-3 fats (chia seeds, walnuts, wild fish), and unrefined whole grains.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <h5 className="font-bold text-slate-800 mb-1">Rest & Nervous System</h5>
            <p className="text-[11px] leading-relaxed">
              Create an unhurried morning routine and limit blue light exposure 45 minutes before sleep to support melatonin production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

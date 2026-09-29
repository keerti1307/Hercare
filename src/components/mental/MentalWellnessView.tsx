import React, { useState, useEffect } from 'react';
import {
  Smile,
  Zap,
  Moon,
  Wind,
  BookOpen,
  Coffee,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MentalWellnessView: React.FC = () => {
  const { todayCheckIn } = useApp();

  const [activeActivity, setActiveActivity] = useState<'breathing' | 'meditation' | 'journaling' | 'sleepRoutine' | null>(null);

  // Breathing tool state (Box breathing: Inhale 4s -> Hold 4s -> Exhale 4s -> Rest 4s)
  const [breathingRunning, setBreathingRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCounter, setBreathCounter] = useState(4);

  // Journaling state
  const [journalNote, setJournalNote] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  // Sleep wind-down checklist state
  const [sleepChecks, setSleepChecks] = useState<{ [key: string]: boolean }>({
    tea: true,
    dimLights: true,
    screensOff: false,
    stretching: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingRunning) {
      timer = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingRunning]);

  const weeklyMoodData = [
    { day: 'Mon', score: 6, label: 'Balanced' },
    { day: 'Tue', score: 7, label: 'Calm' },
    { day: 'Wed', score: 5, label: 'Tired' },
    { day: 'Thu', score: 8, label: 'Energized' },
    { day: 'Fri', score: 7, label: 'Grounded' },
    { day: 'Sat', score: 8, label: 'Playful' },
    { day: 'Sun', score: 7, label: 'Reflective' },
  ];

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Your Mental Wellness
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Gentle awareness for emotional clarity, stress balance, and calm presence.
        </p>
      </div>

      {/* Top 4 Mental Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Current Mood</span>
            <Smile className="h-4 w-4 text-purple-600" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">
            {todayCheckIn?.moodScore || 7} / 10
          </div>
          <span className="text-[11px] text-purple-700 font-medium capitalize">
            {todayCheckIn?.mood || 'Good'}
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Stress</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">
            {todayCheckIn?.stress || 4} / 10
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Mild & manageable</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Energy</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">
            {todayCheckIn?.energy || 7} / 10
          </div>
          <span className="text-[11px] text-amber-700 font-medium">Good daytime stamina</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Sleep</span>
            <Moon className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">7h 20m</div>
          <span className="text-[11px] text-indigo-700 font-medium">91% sleep quality</span>
        </div>
      </div>

      {/* Weekly Mood Graph & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mood Graph (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                Weekly Mood Graph
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Self-reported mood trend over the past 7 days</p>
            </div>
            <span className="text-xs font-mono font-semibold text-purple-700">7.0 / 10 avg</span>
          </div>

          <div className="mt-8 flex items-end justify-between gap-3 h-48 px-2">
            {weeklyMoodData.map((item) => {
              const heightPct = (item.score / 10) * 100;
              const isToday = item.day === 'Tue';
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="font-mono text-xs font-bold text-slate-700">{item.score}</span>
                  <div className="w-full max-w-[36px] rounded-t-xl bg-slate-100 h-full flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        isToday ? 'bg-purple-700' : 'bg-purple-300'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${isToday ? 'text-purple-800' : 'text-slate-500'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Weekly observation: Mood peaked Thursday & Saturday during relaxed social downtime.</span>
          </div>
        </div>

        {/* Quick Wellness Activities (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900">
              Quick Wellness Activities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Supportive micro-practices to ground your nervous system
            </p>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => setActiveActivity('breathing')}
                className={`w-full flex items-center justify-between rounded-2xl p-3 border text-left transition-all ${
                  activeActivity === 'breathing'
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Wind className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Box Breathing (4-4-4)</div>
                    <div className="text-[11px] text-slate-500">2 min vagus nerve reset</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-purple-700">Open</span>
              </button>

              <button
                onClick={() => setActiveActivity('journaling')}
                className={`w-full flex items-center justify-between rounded-2xl p-3 border text-left transition-all ${
                  activeActivity === 'journaling'
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Mindful Journaling</div>
                    <div className="text-[11px] text-slate-500">Reflective prompt of the day</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-purple-700">Open</span>
              </button>

              <button
                onClick={() => setActiveActivity('sleepRoutine')}
                className={`w-full flex items-center justify-between rounded-2xl p-3 border text-left transition-all ${
                  activeActivity === 'sleepRoutine'
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Evening Wind-Down</div>
                    <div className="text-[11px] text-slate-500">Rituals for deep restorative rest</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-purple-700">Open</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Non-clinical self-care resources. If you are experiencing distress, reach out to a trusted professional.
          </div>
        </div>
      </div>

      {/* Interactive Activity Tool Section */}
      {activeActivity === 'breathing' && (
        <div className="rounded-3xl border border-purple-200 bg-purple-50/50 p-6 sm:p-8 text-center animate-in fade-in duration-200">
          <div className="max-w-md mx-auto space-y-4">
            <span className="text-xs font-bold text-purple-800 tracking-wider">BOX BREATHING TOOL</span>
            <h3 className="font-editorial text-2xl font-bold text-slate-900">
              Calm Your Nervous System
            </h3>
            <p className="text-xs text-slate-600">
              Follow the rhythmic circle: 4s Inhale · 4s Hold · 4s Exhale · 4s Rest
            </p>

            {/* Breathing Animation Circle */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div
                className={`relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md border-4 border-purple-300 transition-all duration-1000 ${
                  breathingRunning && breathPhase === 'Inhale'
                    ? 'scale-125 border-purple-600'
                    : breathingRunning && breathPhase === 'Exhale'
                    ? 'scale-90 border-purple-200'
                    : 'scale-105'
                }`}
              >
                <div className="text-center">
                  <div className="font-editorial text-lg font-bold text-purple-900">{breathPhase}</div>
                  <div className="font-mono text-2xl font-bold text-purple-700">{breathCounter}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setBreathingRunning(!breathingRunning)}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-800"
              >
                {breathingRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{breathingRunning ? 'Pause Exercise' : 'Start Breathing'}</span>
              </button>
              <button
                onClick={() => {
                  setBreathingRunning(false);
                  setBreathPhase('Inhale');
                  setBreathCounter(4);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeActivity === 'journaling' && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-rose-800 tracking-wider">DAILY JOURNAL PROMPT</span>
          <h3 className="font-editorial text-xl font-bold text-slate-900 mt-1">
            “What does my body need to feel at ease today?”
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Write without editing yourself. These entries remain stored only on your device.
          </p>

          <textarea
            rows={4}
            value={journalNote}
            onChange={(e) => {
              setJournalNote(e.target.value);
              setJournalSaved(false);
            }}
            placeholder="Today I am noticing tension in my shoulders... I want to drink more warm tea and take a 15-minute screen break."
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-800 focus:border-rose-400 focus:outline-none"
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {journalSaved ? 'Saved to your private journal ✓' : 'Unsaved changes'}
            </span>
            <button
              onClick={() => setJournalSaved(true)}
              className="rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white hover:bg-purple-800"
            >
              Save Reflection
            </button>
          </div>
        </div>
      )}

      {activeActivity === 'sleepRoutine' && (
        <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6 animate-in fade-in duration-200 max-w-xl mx-auto">
          <span className="text-xs font-bold text-indigo-900 tracking-wider">EVENING SLEEP SANCTUARY</span>
          <h3 className="font-editorial text-xl font-bold text-slate-900 mt-1">
            Restful Evening Checklist
          </h3>
          <div className="mt-4 space-y-2 text-xs">
            {[
              { id: 'tea', label: 'Herbal chamomile or magnesium beverage' },
              { id: 'dimLights', label: 'Dim bright overhead lights 1 hour before bed' },
              { id: 'screensOff', label: 'Put phone into Do Not Disturb on charger away from bed' },
              { id: 'stretching', label: 'Gentle legs-up-the-wall stretch or 5 minutes of deep breathing' },
            ].map((check) => (
              <label
                key={check.id}
                onClick={() =>
                  setSleepChecks((prev) => ({ ...prev, [check.id]: !prev[check.id] }))
                }
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 cursor-pointer hover:bg-slate-50"
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                    sleepChecks[check.id] ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {sleepChecks[check.id] && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className={sleepChecks[check.id] ? 'line-through text-slate-400' : 'text-slate-800'}>
                  {check.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

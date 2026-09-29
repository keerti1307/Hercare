import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Moon, Zap, Smile } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MoodType } from '../../types';

export const DailyCheckInModal: React.FC = () => {
  const { isCheckInModalOpen, setIsCheckInModalOpen, addCheckIn, todayCheckIn } = useApp();

  const [mood, setMood] = useState<MoodType>(todayCheckIn?.mood || 'good');
  const [stress, setStress] = useState<number>(todayCheckIn?.stress || 4);
  const [energy, setEnergy] = useState<number>(todayCheckIn?.energy || 7);
  const [sleepHours, setSleepHours] = useState<number>(todayCheckIn?.sleepHours || 7.5);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(todayCheckIn?.symptoms || ['Mild bloating']);
  const [notes, setNotes] = useState<string>(todayCheckIn?.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isCheckInModalOpen) return null;

  const moodList: { type: MoodType; emoji: string; label: string; score: number }[] = [
    { type: 'great', emoji: '😄', label: 'Great', score: 9 },
    { type: 'good', emoji: '🙂', label: 'Good', score: 7 },
    { type: 'okay', emoji: '😐', label: 'Okay', score: 5 },
    { type: 'low', emoji: '😔', label: 'Low', score: 3 },
    { type: 'difficult', emoji: '😣', label: 'Difficult', score: 2 },
  ];

  const symptomOptions = [
    'Cramps',
    'Headache',
    'Bloating',
    'Fatigue',
    'Acne',
    'Mood changes',
    'Tender breasts',
    'Lower back tension',
    'Cold sensitivity',
    'Sweet cravings',
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMoodObj = moodList.find((m) => m.type === mood);
    addCheckIn({
      date: '2026-09-29',
      mood,
      moodScore: selectedMoodObj?.score || 7,
      stress,
      energy,
      sleepHours,
      symptoms: selectedSymptoms,
      notes,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsCheckInModalOpen(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] p-6 sm:p-7 shadow-2xl border border-[#EAE4DC] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE4DC]">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-slate-800">
              How are you feeling today?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Tuesday, September 29 · Daily check-in</p>
          </div>
          <button
            onClick={() => setIsCheckInModalOpen(false)}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
            </div>
            <h4 className="mt-4 font-editorial text-xl font-bold text-slate-800">
              Your check-in has been recorded.
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Thank you for listening to your body today. Your insights are updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-4 space-y-5">
            {/* Mood selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Overall Mood
              </label>
              <div className="grid grid-cols-5 gap-2">
                {moodList.map((item) => {
                  const isSelected = mood === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setMood(item.type)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-2.5 transition-all ${
                        isSelected
                          ? 'border-2 border-purple-700 bg-purple-100/70 shadow-sm scale-105'
                          : 'border border-slate-200 bg-white hover:border-purple-200'
                      }`}
                    >
                      <span className="text-2xl mb-1">{item.emoji}</span>
                      <span
                        className={`text-[11px] font-medium ${
                          isSelected ? 'text-purple-950 font-bold' : 'text-slate-600'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders: Stress, Energy, Sleep */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
              {/* Stress Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Stress Level</span>
                  </div>
                  <span className="font-mono text-purple-800 font-bold">{stress} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stress}
                  onChange={(e) => setStress(Number(e.target.value))}
                  className="mt-2 w-full accent-purple-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Peaceful (1)</span>
                  <span>Moderate (5)</span>
                  <span>High Stress (10)</span>
                </div>
              </div>

              {/* Energy Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    <span>Energy Level</span>
                  </div>
                  <span className="font-mono text-purple-800 font-bold">{energy} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="mt-2 w-full accent-purple-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Drained (1)</span>
                  <span>Balanced (5)</span>
                  <span>Energized (10)</span>
                </div>
              </div>

              {/* Sleep Hours Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Moon className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Sleep Duration</span>
                  </div>
                  <span className="font-mono text-purple-800 font-bold">
                    {Math.floor(sleepHours)}h {Math.round((sleepHours % 1) * 60)}m
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.25"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="mt-2 w-full accent-purple-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>4 hrs</span>
                  <span>8 hrs (Ideal)</span>
                  <span>12 hrs</span>
                </div>
              </div>
            </div>

            {/* Symptoms Checklist */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Physical & Emotional Symptoms
              </label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`rounded-xl px-3 py-1.5 text-xs transition-colors ${
                        isChecked
                          ? 'bg-purple-700 text-white font-medium shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes / reflections */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reflections or notes (optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What felt nourishing today? Any particular bodily sensations?"
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EAE4DC]">
              <button
                type="button"
                onClick={() => setIsCheckInModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-purple-700 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
              >
                Save Check-in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

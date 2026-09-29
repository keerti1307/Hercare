import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  Activity,
  Smile,
  Moon,
  Apple,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, profile, updateProfile, setCurrentTab } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: profile.name || 'Elena Vance',
    age: profile.age || 28,
    heightCm: profile.heightCm || 165,
    weightKg: profile.weightKg || 58.4,
    focusAreas: [...profile.focusAreas],
    goals: [...profile.goals],
  });

  if (!isOnboardingOpen) return null;

  const focusOptions = [
    { id: 'Menstrual health', desc: 'Predict periods, ovulation & cycle symptoms' },
    { id: 'PCOS/PCOD wellness', desc: 'Track lifestyle patterns, breakouts & energy' },
    { id: 'Thyroid health tracking', desc: 'Monitor cold sensitivity, fatigue & rhythm' },
    { id: 'Mental wellness', desc: 'Mood, stress balance & mindfulness rituals' },
    { id: 'Weight management', desc: 'Healthy, sustainable physical progress' },
    { id: 'Nutrition', desc: 'Balanced plates, wholesome habits & hydration' },
    { id: 'Fitness', desc: 'Gentle, enjoyable movement & strength' },
    { id: 'Sleep', desc: 'Restful sleep duration & bedtime habits' },
    { id: 'General wellness', desc: 'Holistic daily check-ins and body awareness' },
  ];

  const goalOptions = [
    'Understand my health',
    'Build healthier habits',
    'Track my cycle',
    'Manage my lifestyle',
    'Improve fitness',
    'Monitor my progress',
  ];

  const toggleFocus = (item: string) => {
    setFormData((prev) => {
      const exists = prev.focusAreas.includes(item);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((f) => f !== item)
          : [...prev.focusAreas, item],
      };
    });
  };

  const toggleGoal = (item: string) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(item);
      return {
        ...prev,
        goals: exists ? prev.goals.filter((g) => g !== item) : [...prev.goals, item],
      };
    });
  };

  const handleFinish = () => {
    updateProfile({
      name: formData.name,
      age: formData.age,
      heightCm: formData.heightCm,
      weightKg: formData.weightKg,
      focusAreas: formData.focusAreas,
      goals: formData.goals,
      hasOnboarded: true,
    });
    setIsOnboardingOpen(false);
    setCurrentTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl border border-[#EAE4DC] overflow-hidden">
        {/* Step indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-900">Step {step} of 4</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">
              {step === 1 && 'Personal Info'}
              {step === 2 && 'Focus Areas'}
              {step === 3 && 'Health Goals'}
              {step === 4 && 'Personalize & Privacy'}
            </span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  step >= i ? 'bg-purple-700' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-800">
                  Tell us about yourself
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  This baseline helps calibrate your hydration targets and cycle estimates.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Preferred Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    placeholder="e.g. Elena"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-800">
                  What would you like to focus on?
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Select all that resonate. You can refine these preferences at any time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {focusOptions.map((opt) => {
                  const isSelected = formData.focusAreas.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleFocus(opt.id)}
                      className={`cursor-pointer rounded-2xl p-3 border transition-all ${
                        isSelected
                          ? 'border-purple-700 bg-purple-50/70 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{opt.id}</span>
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                            isSelected ? 'bg-purple-700 border-purple-700 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500 leading-snug">{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-800">
                  What is your primary goal?
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Choose the intentions guiding your wellness journey right now.
                </p>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {goalOptions.map((goal) => {
                  const isSelected = formData.goals.includes(goal);
                  return (
                    <div
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`cursor-pointer flex items-center justify-between rounded-xl px-4 py-3 border transition-all ${
                        isSelected
                          ? 'border-purple-700 bg-purple-50 text-purple-900 font-semibold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">{goal}</span>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                          isSelected ? 'bg-purple-700 border-purple-700 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-800">
                  Your personalized sanctuary is ready
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  We have tailored your dashboard around your selected focuses:
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {formData.focusAreas.map((f) => (
                  <span
                    key={f}
                    className="rounded-lg bg-purple-100/80 px-2.5 py-1 text-xs font-medium text-purple-800"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Privacy Reassurance Banner */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
                <div className="flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold">Privacy & Control First</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-emerald-800">
                  “Your health information is personal. We prioritize privacy and give you control over what you track.”
                </p>
                <p className="mt-1 text-[11px] text-emerald-700">
                  Your records remain stored locally on your device. You can download or delete your data anytime from your profile.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EAE4DC]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => setIsOnboardingOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Skip for now
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-800 transition-colors"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-800 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Enter My Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

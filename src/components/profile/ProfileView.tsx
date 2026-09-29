import React, { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Download,
  Trash2,
  Bell,
  Lock,
  Heart,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import userAvatarImg from '../../assets/images/user_avatar_elena_1790695706428.jpg';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, exportDataJSON, resetAllData } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    age: profile.age,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    cycleLengthDays: profile.cycleLengthDays,
    periodLengthDays: profile.periodLengthDays,
    waterGlassesGoal: profile.waterGlassesGoal,
    weeklyActivityGoalMinutes: profile.weeklyActivityGoalMinutes,
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [cycleReminder, setCycleReminder] = useState(true);
  const [hydrationReminder, setHydrationReminder] = useState(true);
  const [eveningReflection, setEveningReflection] = useState(true);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      heightCm: Number(formData.heightCm),
      weightKg: Number(formData.weightKg),
      cycleLengthDays: Number(formData.cycleLengthDays),
      periodLengthDays: Number(formData.periodLengthDays),
      waterGlassesGoal: Number(formData.waterGlassesGoal),
      weeklyActivityGoalMinutes: Number(formData.weeklyActivityGoalMinutes),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-7 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Profile & Privacy
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Manage your personal health preferences and control your private records.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-7">
        {/* Section 1: Personal Information */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <img
              src={userAvatarImg}
              alt={profile.name}
              className="h-16 w-16 rounded-2xl object-cover ring-4 ring-purple-100"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="font-editorial text-xl font-bold text-slate-900">{profile.name}</h2>
              <p className="text-xs text-slate-500">{profile.email}</p>
              <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>On-device private storage active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={formData.heightCm}
                  onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cycle Length (days)</label>
                <input
                  type="number"
                  value={formData.cycleLengthDays}
                  onChange={(e) => setFormData({ ...formData, cycleLengthDays: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Period Length (days)</label>
                <input
                  type="number"
                  value={formData.periodLengthDays}
                  onChange={(e) => setFormData({ ...formData, periodLengthDays: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Health Focus & Goals */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-editorial text-xl font-bold text-slate-900">
            Health Focus & Goals
          </h2>
          <div>
            <span className="text-xs font-semibold text-slate-700">Active Focus Areas</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.focusAreas.map((f) => (
                <span
                  key={f}
                  className="rounded-xl bg-purple-100/80 px-3 py-1.5 text-xs font-semibold text-purple-900 border border-purple-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-700">Primary Intentions</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.goals.map((g) => (
                <span
                  key={g}
                  className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700 border border-slate-200"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Notifications & Reminders */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-700" />
            <h2 className="font-editorial text-xl font-bold text-slate-900">
              Supportive Reminders
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Cycle Phase Alerts</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Gentle nudges before predicted period and ovulation window</p>
              </div>
              <input
                type="checkbox"
                checked={cycleReminder}
                onChange={() => setCycleReminder(!cycleReminder)}
                className="h-4 w-4 accent-purple-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Hydration Checks</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Midday reminder to sip water and refresh</p>
              </div>
              <input
                type="checkbox"
                checked={hydrationReminder}
                onChange={() => setHydrationReminder(!hydrationReminder)}
                className="h-4 w-4 accent-purple-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Evening Reflection Prompt</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Soft prompt to log daily mood and wind down</p>
              </div>
              <input
                type="checkbox"
                checked={eveningReflection}
                onChange={() => setEveningReflection(!eveningReflection)}
                className="h-4 w-4 accent-purple-700"
              />
            </label>
          </div>
        </div>

        {/* Section 4: Privacy & Data Sovereignty */}
        <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-700" />
            <h2 className="font-editorial text-xl font-bold text-slate-900">
              Privacy & Data Sovereignty
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your health information is strictly your own. We do not sell your personal data or transmit it to third-party ad networks. You maintain absolute control to export or erase your data at any second.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={exportDataJSON}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="h-4 w-4 text-purple-700" />
              <span>Download My Data (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete My Data</span>
            </button>
          </div>
        </div>

        {/* Save button bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Preferences saved successfully</span>
            </span>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC] text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-slate-900">
              Are you completely sure?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will permanently wipe all your logged check-ins, cycles, symptoms, meals, and preferences from this device. This action cannot be undone.
            </p>

            <div className="pt-3 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmDelete(false);
                  resetAllData();
                }}
                className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

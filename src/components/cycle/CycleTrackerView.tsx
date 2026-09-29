import React, { useState } from 'react';
import {
  CalendarHeart,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Info,
  Droplets,
  Heart,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CycleTrackerView: React.FC = () => {
  const { profile, updateProfile, symptoms, addSymptom } = useApp();

  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDay, setSelectedDay] = useState<number>(29);
  const [showLogPeriodModal, setShowLogPeriodModal] = useState(false);
  const [showLogSymptomModal, setShowLogSymptomModal] = useState(false);

  // Period log form state
  const [flowIntensity, setFlowIntensity] = useState<'spotting' | 'light' | 'medium' | 'heavy'>('medium');
  const [newSymptomText, setNewSymptomText] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');

  // Days in September 2026: 30 days. Sep 1, 2026 is Tuesday (day 2 of week).
  const year = 2026;
  const month = 8; // September
  const daysInMonth = 30;
  const startDayOfWeek = 2; // Tuesday: 0=Sun, 1=Mon, 2=Tue...

  // Cycle phase dates for Elena (Last period Sep 15 to Sep 19)
  // Current date: Sep 29 (Day 15 of cycle; ovulatory peak)
  const isPeriodDay = (day: number) => day >= 15 && day <= 19;
  const isOvulationDay = (day: number) => day >= 27 && day <= 30;
  const isPredictedNextPeriod = (day: number) => day >= 14 && day <= 18; // In October

  const handleSavePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLogPeriodModal(false);
  };

  const handleSaveSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptomText) return;
    addSymptom({
      date: `2026-09-${String(selectedDay).padStart(2, '0')}`,
      symptom: newSymptomText,
      severity: symptomSeverity,
    });
    setNewSymptomText('');
    setShowLogSymptomModal(false);
  };

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Cycle Tracker
            </h1>
            <span className="rounded-lg bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-800">
              Day 14
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Tune into your natural rhythm, hormonal phases, and body signs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowLogSymptomModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Log Symptoms</span>
          </button>

          <button
            onClick={() => setShowLogPeriodModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 active:scale-95 transition-all"
          >
            <Droplets className="h-3.5 w-3.5" />
            <span>Log Period</span>
          </button>
        </div>
      </div>

      {/* Summary 4-Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Current Cycle</span>
          <div className="mt-1 font-mono text-2xl font-bold text-rose-900 tabular-nums">
            Day 14
          </div>
          <span className="text-[11px] text-purple-700 font-medium">Ovulatory Phase</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Average Cycle</span>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
            {profile.cycleLengthDays || 29} days
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Consistent rhythm</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Last Period</span>
          <div className="mt-1 font-mono text-xl font-bold text-slate-900">
            Sept 15, 2026
          </div>
          <span className="text-[11px] text-slate-500">5 days duration</span>
        </div>

        <div className="rounded-2xl border border-[#EAE4DC] bg-white p-4">
          <span className="text-xs text-slate-500 font-medium">Next Period (Predicted)</span>
          <div className="mt-1 font-mono text-xl font-bold text-rose-800">
            in 15 days
          </div>
          <span className="text-[11px] text-slate-500">Estimated Oct 14</span>
        </div>
      </div>

      {/* Main Cycle Calendar & Phase Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Large Interactive Calendar */}
        <div className="lg:col-span-8 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-rose-600" />
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                September 2026
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-slate-700 px-2">Current Month</span>
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mt-4">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Days matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty leading padding days */}
              {Array.from({ length: startDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-transparent" />
              ))}

              {/* September Days 1-30 */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const isSelected = selectedDay === day;
                const isPeriod = isPeriodDay(day);
                const isOvulation = isOvulationDay(day);
                const isToday = day === 29;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative flex flex-col items-center justify-between rounded-2xl p-1.5 transition-all text-left ${
                      isSelected
                        ? 'ring-2 ring-purple-600 shadow-sm'
                        : 'border border-slate-100 hover:border-slate-300'
                    } ${
                      isPeriod
                        ? 'bg-rose-50/90 text-rose-950 font-bold'
                        : isOvulation
                        ? 'bg-purple-50/70 text-purple-950'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-xs">
                      <span className={`font-mono ${isToday ? 'rounded-full bg-purple-700 text-white px-1.5 py-0.5 text-[10px]' : ''}`}>
                        {day}
                      </span>
                      {isPeriod && <Droplets className="h-3 w-3 text-rose-600 shrink-0" />}
                    </div>

                    <div className="w-full text-center mt-1">
                      {isPeriod && (
                        <span className="text-[9px] text-rose-700 font-semibold block leading-tight">
                          Period
                        </span>
                      )}
                      {isOvulation && !isPeriod && (
                        <span className="text-[9px] text-purple-700 font-semibold block leading-tight">
                          Ovulate
                        </span>
                      )}
                      {!isPeriod && !isOvulation && day < 15 && (
                        <span className="text-[9px] text-slate-400 block leading-tight">
                          Follicular
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-rose-100 border border-rose-300" />
              <span>Period Days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-purple-100 border border-purple-300" />
              <span>Ovulation Window</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md border border-dashed border-rose-300 bg-rose-50/40" />
              <span>Predicted Period</span>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Day Inspector & Cycle Phase Guide */}
        <div className="lg:col-span-4 space-y-5">
          {/* Day Detail Card */}
          <div className="rounded-3xl border border-[#EAE4DC] bg-white p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider">
              DAY DETAILS
            </h3>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-editorial text-2xl font-bold text-slate-900">
                Sept {selectedDay}, 2026
              </span>
              <span className="text-xs font-mono font-semibold text-purple-700">
                {selectedDay === 29 ? 'Today' : `Cycle Day ${selectedDay - 14 > 0 ? selectedDay - 14 : 29 - (14 - selectedDay)}`}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-xl bg-purple-50/60 p-3 border border-purple-100">
                <span className="text-xs font-bold text-purple-900">Hormonal Phase: Ovulatory</span>
                <p className="text-[11px] text-purple-800 leading-relaxed mt-0.5">
                  Estrogen and LH levels reach their peak. Energy and social confidence tend to feel higher.
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700">Logged Symptoms</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {symptoms
                    .filter((s) => s.date === `2026-09-${String(selectedDay).padStart(2, '0')}`)
                    .map((s) => (
                      <span
                        key={s.id}
                        className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                      >
                        {s.symptom} ({s.severity})
                      </span>
                    ))}
                  {symptoms.filter((s) => s.date === `2026-09-${String(selectedDay).padStart(2, '0')}`).length === 0 && (
                    <span className="text-xs text-slate-400 italic">No symptoms logged for this day.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cycle Phases Overview */}
          <div className="rounded-3xl border border-[#EAE4DC] bg-white p-5 shadow-xs space-y-3">
            <h3 className="font-editorial text-base font-bold text-slate-900">
              Understanding the 4 Phases
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-100">
                <div className="font-bold text-rose-900">1. Menstrual Phase (Days 1–5)</div>
                <p className="text-[11px] text-rose-800 mt-0.5">Focus on rest, warmth, and iron-rich meals.</p>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="font-bold text-emerald-900">2. Follicular Phase (Days 6–13)</div>
                <p className="text-[11px] text-emerald-800 mt-0.5">Rising estrogen, renewed stamina, and creative focus.</p>
              </div>

              <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                <div className="font-bold text-purple-900">3. Ovulatory Phase (Days 14–17)</div>
                <p className="text-[11px] text-purple-800 mt-0.5">Peak vitality, gentle strength workouts, and clarity.</p>
              </div>

              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                <div className="font-bold text-amber-900">4. Luteal Phase (Days 18–29)</div>
                <p className="text-[11px] text-amber-800 mt-0.5">Progesterone rises. Prioritize magnesium and restorative movement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Transparency Note */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Responsible Tracking:</strong> Cycle predictions are observational estimates calculated from your logged dates. They should not be used as guaranteed contraception or clinical certainty. Every body fluctuates naturally with travel, stress, and lifestyle shifts.
        </p>
      </div>

      {/* Log Period Modal */}
      {showLogPeriodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC]">
            <h3 className="font-editorial text-xl font-bold text-slate-900">Log Period Flow</h3>
            <p className="text-xs text-slate-500 mt-0.5">For September {selectedDay}, 2026</p>

            <form onSubmit={handleSavePeriod} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Flow Intensity</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['spotting', 'light', 'medium', 'heavy'] as const).map((flow) => (
                    <button
                      key={flow}
                      type="button"
                      onClick={() => setFlowIntensity(flow)}
                      className={`rounded-xl py-2 px-2 text-xs capitalize transition-colors ${
                        flowIntensity === flow
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {flow}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLogPeriodModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  Record Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Symptoms Modal */}
      {showLogSymptomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC]">
            <h3 className="font-editorial text-xl font-bold text-slate-900">Log Specific Symptom</h3>
            <p className="text-xs text-slate-500 mt-0.5">Add to September {selectedDay}, 2026</p>

            <form onSubmit={handleSaveSymptom} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Symptom Name</label>
                <input
                  type="text"
                  required
                  value={newSymptomText}
                  onChange={(e) => setNewSymptomText(e.target.value)}
                  placeholder="e.g. Lower abdominal cramps, tender breasts"
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'moderate', 'severe'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSymptomSeverity(sev)}
                      className={`rounded-xl py-2 px-2 text-xs capitalize ${
                        symptomSeverity === sev
                          ? 'bg-purple-700 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLogSymptomModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-700 px-5 py-2 text-xs font-bold text-white hover:bg-purple-800"
                >
                  Save Symptom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

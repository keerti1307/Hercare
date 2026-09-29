import React, { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Printer,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { profile, checkIns, activities, symptoms, waterGlasses } = useApp();

  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sections user can toggle when sharing with a doctor
  const [shareConfig, setShareConfig] = useState<{ [key: string]: boolean }>({
    cycle: true,
    symptoms: true,
    sleep: true,
    activity: true,
    weight: true,
    nutrition: false,
    moodNotes: false, // private notes excluded by default for privacy
  });

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleShareLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              September Wellness Report
            </h1>
            <span className="rounded-xl bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
              Sept 1 – Sept 30, 2026
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            A comprehensive, patient-empowered summary of your self-reported logs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrintOrDownload}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Report (PDF)</span>
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share with Healthcare Professional</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 sm:p-8 shadow-xs space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Patient / User Info Header in Report */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-3">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-slate-900">{profile.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>Age: {profile.age}</span>
              <span>·</span>
              <span>Height: {profile.heightCm} cm</span>
              <span>·</span>
              <span>Current Weight: {profile.weightKg} kg</span>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Report Generated: Sept 29, 2026</div>
            <div className="font-medium text-emerald-700">Self-Reported Health Record</div>
          </div>
        </div>

        {/* Section 1: Cycle Summary */}
        <div className="space-y-3">
          <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>1. Menstrual Cycle Summary</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500 block">Average Cycle Length</span>
              <span className="font-mono text-base font-bold text-slate-900 mt-1 block">29 Days</span>
              <span className="text-[10px] text-slate-400">Regular rhythm</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500 block">Period Duration</span>
              <span className="font-mono text-base font-bold text-slate-900 mt-1 block">5 Days</span>
              <span className="text-[10px] text-slate-400">Medium flow average</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500 block">Last Recorded Period</span>
              <span className="font-mono text-base font-bold text-slate-900 mt-1 block">Sept 15, 2026</span>
              <span className="text-[10px] text-slate-400">On schedule</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500 block">Cycle Day on Report</span>
              <span className="font-mono text-base font-bold text-purple-900 mt-1 block">Day 14 (Ovulatory)</span>
              <span className="text-[10px] text-purple-700">LH peak window</span>
            </div>
          </div>
        </div>

        {/* Section 2: Mood & Mental Summary */}
        <div className="space-y-3">
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            2. Mood & Stress Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500">Average Mood Score</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">7.0 / 10</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Reported positive & stable</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500">Average Stress Level</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">4.5 / 10</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Mild work-related peaks mid-week</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500">Mindfulness Practice</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">12 Sessions</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Box breathing & evening tea</p>
            </div>
          </div>
        </div>

        {/* Section 3: Sleep & Rest Summary */}
        <div className="space-y-3">
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            3. Sleep & Rest Summary
          </h3>
          <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-slate-100 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Average Monthly Sleep Duration:</span>
              <span className="font-mono font-bold text-slate-900">7 hours 18 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Bedtime Consistency:</span>
              <span className="font-medium text-slate-900">10:45 PM – 11:30 PM window</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              Observation: Restorative sleep duration strongly protected daytime energy and lessened premenstrual tension.
            </p>
          </div>
        </div>

        {/* Section 4: Activity & Weight Trend */}
        <div className="space-y-3">
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            4. Activity & Weight Trend
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500">Activity Regularity</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">135 min / week average</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Pilates, gentle yoga, and daily walking</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-100">
              <span className="text-slate-500">Weight Progression</span>
              <div className="font-mono text-base font-bold text-emerald-800 mt-1">61.0 kg → 58.4 kg (-2.6 kg)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Healthy, sustainable, and gradual progress</p>
            </div>
          </div>
        </div>

        {/* Section 5: Logged Physical Symptoms */}
        <div className="space-y-3">
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            5. Logged Physical Symptoms
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {symptoms.map((s) => (
              <span
                key={s.id}
                className="rounded-xl border border-slate-200 bg-[#FAF8F5] px-3 py-1.5 text-slate-700 font-medium"
              >
                {s.symptom} · {s.severity} ({s.date})
              </span>
            ))}
          </div>
        </div>

        {/* Section 6: Personal Insights for Clinical Collaboration */}
        <div className="space-y-2 rounded-2xl border border-purple-200 bg-purple-50/50 p-4 text-xs">
          <h4 className="font-bold text-purple-950">Patient-Provided Context for Clinical Care</h4>
          <p className="text-purple-900 leading-relaxed">
            “Logged data reflects higher sleep sensitivity in the luteal phase, mild bloating preceding menstruation, and excellent tolerance to low-impact strength exercise. Sharing this data to facilitate open discussion during consultation.”
          </p>
        </div>
      </div>

      {/* Share with Healthcare Professional Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-[#FAF8F5] p-6 sm:p-7 shadow-2xl border border-[#EAE4DC]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-700" />
                <h3 className="font-editorial text-xl font-bold text-slate-900">
                  Share with Healthcare Professional
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              You have complete control over which records are included in the physician export. Select only the data you wish to share:
            </p>

            <div className="mt-4 space-y-2 text-xs">
              {[
                { id: 'cycle', label: 'Menstrual Cycle History & Length' },
                { id: 'symptoms', label: 'Logged Symptoms & Severity (cramps, headaches)' },
                { id: 'sleep', label: 'Sleep Durations & Consistency' },
                { id: 'activity', label: 'Activity Logs & Workout Types' },
                { id: 'weight', label: 'Weight Progression History' },
                { id: 'nutrition', label: 'Nutrition Habits & Meal Logs' },
                { id: 'moodNotes', label: 'Private Journal Reflections (Optional)' },
              ].map((item) => (
                <label
                  key={item.id}
                  onClick={() =>
                    setShareConfig((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-purple-50/40"
                >
                  <span className="text-slate-800 font-medium">{item.label}</span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                      shareConfig[item.id]
                        ? 'bg-purple-700 border-purple-700 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {shareConfig[item.id] && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <span>{copiedLink ? 'Link Copied ✓' : 'Copy Secure Summary Link'}</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                  setShowShareModal(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white hover:bg-purple-800"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Export Selected PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

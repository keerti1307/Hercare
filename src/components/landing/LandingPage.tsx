import React from 'react';
import {
  Sparkles,
  CalendarHeart,
  Smile,
  HeartPulse,
  Scale,
  Apple,
  Moon,
  LineChart,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Droplets,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import heroImg from '../../assets/images/hero_wellness_lifestyle_1790695679507.jpg';

export const LandingPage: React.FC = () => {
  const { setCurrentTab, setIsOnboardingOpen } = useApp();

  const features = [
    {
      title: 'Cycle & Period Tracking',
      desc: 'Predict cycles with natural rhythm awareness, log flow intensity, ovulation windows, and symptoms without clinical anxiety.',
      icon: CalendarHeart,
      tab: 'cycle' as const,
      color: 'bg-rose-50 text-rose-700 border-rose-100',
    },
    {
      title: 'Mental Wellness',
      desc: 'Track daily mood fluctuations, stress levels, and ground yourself with guided box breathing and soothing micro-meditations.',
      icon: Smile,
      tab: 'wellness' as const,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      title: 'PCOS/PCOD Wellness Support',
      desc: 'Understand non-linear patterns, insulin-sensitivity habits, and skin-cycle correlations in a safe, non-diagnostic space.',
      icon: HeartPulse,
      tab: 'my-health' as const,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      title: 'Weight Management',
      desc: 'Celebrate sustainable, holistic progress that honors hormonal fluctuations rather than punitive restrictions.',
      icon: Scale,
      tab: 'activity' as const,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Nutrition & Balance',
      desc: 'Log colorful, blood-sugar conscious meals and stay effortlessly hydrated with gentle one-tap water tallies.',
      icon: Apple,
      tab: 'nutrition' as const,
      color: 'bg-teal-50 text-teal-700 border-teal-100',
    },
    {
      title: 'Activity & Sleep',
      desc: 'Sync workouts with your cycle phases—from high-energy follicular days to restorative luteal movement.',
      icon: Moon,
      tab: 'activity' as const,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      title: 'Personalized Insights',
      desc: 'Spot real connections: discover how 8 hours of sleep or morning hydration directly calms cycle cravings and stress.',
      icon: LineChart,
      tab: 'insights' as const,
      color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-xs font-semibold text-purple-800">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>A compassionate space for your whole rhythm</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Understand your health. Build healthier habits. Feel your best.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance">
              A personalized wellness platform that brings women's health, mental well-being,
              lifestyle tracking, and meaningful insights together in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-purple-800 active:scale-98 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setCurrentTab('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Explore Features</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>100% Private on-device data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Zero clinical judgment or fear-mongering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & App Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft decorative glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-200/50 via-rose-100/40 to-emerald-100/50 blur-2xl -z-10" />

              {/* Laptop / Tablet Device Mockup */}
              <div className="overflow-hidden rounded-3xl border border-[#EAE4DC] bg-white shadow-2xl">
                {/* Mockup Top Window Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-[#F6F3EE] px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="rounded-md bg-white px-3 py-0.5 text-[10px] font-medium text-slate-500 shadow-2xs">
                    herwell.app/my-dashboard
                  </div>
                  <div className="h-2.5 w-2.5" />
                </div>

                {/* Visual Imagery + Preview Cards */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl">
                    <img
                      src={heroImg}
                      alt="Woman enjoying holistic morning wellness"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-[11px] font-semibold text-purple-200">Today's Rhythm</p>
                      <h4 className="font-editorial text-base sm:text-lg font-bold">
                        Cycle Day 14 · Natural Ovulatory Energy
                      </h4>
                    </div>
                  </div>

                  {/* Interactive Micro Mockup Cards */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="rounded-xl border border-slate-100 bg-purple-50/50 p-2.5">
                      <div className="text-[10px] text-slate-500 font-medium">Mood</div>
                      <div className="font-mono text-base font-bold text-purple-900">7 / 10</div>
                      <div className="text-[9px] text-purple-700">Calm & Clear</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-rose-50/50 p-2.5">
                      <div className="text-[10px] text-slate-500 font-medium">Sleep</div>
                      <div className="font-mono text-base font-bold text-rose-900">7h 20m</div>
                      <div className="text-[9px] text-rose-700">Restorative</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-teal-50/50 p-2.5">
                      <div className="text-[10px] text-slate-500 font-medium">Water</div>
                      <div className="font-mono text-base font-bold text-teal-900">5 / 8</div>
                      <div className="text-[9px] text-teal-700">62% Reached</div>
                    </div>
                  </div>

                  {/* Focus preview quote */}
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-600">Gentle Habit Insight</p>
                      <p className="text-xs text-slate-700">
                        “Your activity has been consistent this week. Keep up the balance!”
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('dashboard')}
                      className="shrink-0 rounded-lg bg-purple-700 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-purple-800"
                    >
                      View Live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#EAE4DC]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            Nourish every dimension of your health
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Designed for women's bodies, hormonal cycles, and real everyday lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                onClick={() => setCurrentTab(f.tab)}
                className="group cursor-pointer rounded-3xl border border-[#EAE4DC] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${f.color} mb-4 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-purple-700 group-hover:text-purple-900">
                  <span>Explore {f.title}</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Architectural Section: "Your health is more than one number." */}
      <section className="py-16 bg-[#F3EFEA] border-y border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-800 tracking-wider">
              HOLISTIC WELLNESS PERSPECTIVE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              “Your health is more than one number.”
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Standard apps isolate your weight or your period onto separate islands. HerWell weaves
              sleep, mood, activity, nutrition, cycle patterns, and daily habits into one clear, connected tapestry.
            </p>
          </div>

          {/* Interconnected Wheel/Grid Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { label: 'Sleep Rhythm', value: '7h 20m average', detail: 'Restores nervous system', icon: Moon },
              { label: 'Daily Mood', value: '7 / 10 positivity', detail: 'Tracks emotional energy', icon: Smile },
              { label: 'Activity & Movement', value: '150 min goal', detail: 'Low-impact consistency', icon: HeartPulse },
              { label: 'Nourishing Food', value: 'Whole food plates', detail: 'Stabilizes blood sugar', icon: Apple },
              { label: 'Cycle Phase', value: 'Day 14 Ovulation', detail: 'Natural hormonal energy', icon: CalendarHeart },
              { label: 'Hydration', value: '8 glasses daily', detail: 'Lymphatic & cellular health', icon: Droplets },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center transition-all hover:border-purple-300 hover:shadow-sm"
                >
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <Icon className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{node.label}</h4>
                  <p className="mt-1 font-mono text-[11px] font-semibold text-purple-800">{node.value}</p>
                  <p className="mt-1 text-[10px] text-slate-500 leading-tight">{node.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-purple-200 bg-white/90 p-5 text-center max-w-xl mx-auto">
            <p className="text-xs text-slate-700 leading-relaxed">
              “When you track habits gently without judgment, you start noticing correlations that empower you to take compassionate care of yourself.”
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Non-Clinical Care Statement */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <ShieldCheck className="h-6 w-6 stroke-[2]" />
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900">
          Private, gentle, and always in your control
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We do not diagnose medical conditions or promise false miracles. HerWell is your private lifestyle companion: helping you spot patterns, communicate clearly with your doctor, and build lasting, healthy habits.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-purple-700 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-purple-800 transition-all"
          >
            <span>Start Your Personalized Journey</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EAE4DC] py-8 text-center text-xs text-slate-500">
        <p>© 2026 HerWell · Women's Health & Wellness Companion. All rights reserved.</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Informational & lifestyle tracking only. Always consult a qualified healthcare professional for medical diagnoses.
        </p>
      </footer>
    </div>
  );
};

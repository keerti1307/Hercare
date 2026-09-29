import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarHeart,
  Smile,
  LineChart,
  UserCheck,
  Menu,
  X,
  HeartPulse,
  Apple,
  Dumbbell,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'cycle', label: 'Cycle', icon: CalendarHeart },
    { id: 'wellness', label: 'Wellness', icon: Smile },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const secondaryTabs: { id: NavigationTab; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'my-health', label: 'My Health', desc: 'PCOS/PCOD & Thyroid tracking', icon: HeartPulse },
    { id: 'nutrition', label: 'Nutrition', desc: 'Meals, food balance & hydration', icon: Apple },
    { id: 'activity', label: 'Activity & Weight', desc: 'Workouts, movement & goals', icon: Dumbbell },
    { id: 'reports', label: 'Reports', desc: 'Monthly summary & doctor export', icon: FileText },
  ];

  return (
    <>
      {/* Slide-out Drawer for extra tabs */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-[#FAF8F5] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-editorial text-lg font-bold text-slate-800">Explore More</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
              {secondaryTabs.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all ${
                      isActive
                        ? 'bg-purple-700 text-white'
                        : 'bg-white text-slate-800 border border-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-purple-700'}`} />
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-slate-500'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Private & On-Device Storage</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EAE4DC] bg-[#FAF8F5]/95 backdrop-blur-md md:hidden px-2 py-1.5">
        <div className="flex items-center justify-around">
          {mainTabs.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 transition-colors ${
                  isActive ? 'text-purple-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-purple-800 stroke-[2.2]' : 'text-slate-500'}`} />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
          {/* More Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 text-slate-500 hover:text-slate-800"
          >
            <Menu className="h-5 w-5 text-slate-500" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};

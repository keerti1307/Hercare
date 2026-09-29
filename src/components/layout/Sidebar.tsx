import React, { useState } from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  CalendarHeart,
  Smile,
  Apple,
  Dumbbell,
  LineChart,
  FileText,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface NavItem {
  id: NavigationTab;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-health', label: 'My Health', badge: 'PCOS/Thyroid', icon: HeartPulse },
    { id: 'cycle', label: 'Cycle', icon: CalendarHeart },
    { id: 'wellness', label: 'Wellness', icon: Smile },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'activity', label: 'Activity', icon: Dumbbell },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-[#EAE4DC] bg-[#FAF8F5] transition-all duration-200 z-20 shrink-0 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand area */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-[#EAE4DC]/80">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-700 text-white shadow-sm">
              <span className="font-editorial text-lg font-bold">H</span>
            </div>
            <div>
              <span className="font-editorial text-lg font-bold tracking-tight text-slate-800">
                HerWell
              </span>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Women's Health</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-purple-700 text-white shadow-sm">
            <span className="font-editorial text-lg font-bold">H</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-purple-50/80 hover:text-purple-900'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-700'
                }`}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[10px] font-normal text-purple-700/80">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Privacy Reassurance */}
      <div className="p-3 border-t border-[#EAE4DC]/80">
        {!collapsed ? (
          <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/60 p-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-xs font-semibold">Private & Safe</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-emerald-700/90">
              Your health logs remain stored privately on your device.
            </p>
          </div>
        ) : (
          <div className="flex justify-center text-emerald-600" title="Private & Encrypted Storage">
            <ShieldCheck className="h-5 w-5" />
          </div>
        )}
      </div>
    </aside>
  );
};

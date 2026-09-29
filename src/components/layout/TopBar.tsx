import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Plus,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  User,
  CheckCircle2,
  Calendar,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import userAvatarImg from '../../assets/images/user_avatar_elena_1790695706428.jpg';

export const TopBar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    profile,
    notifications,
    markNotificationAsRead,
    setIsCheckInModalOpen,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#E8E2D9] bg-[#FAF8F5]/90 backdrop-blur-md px-4 sm:px-6">
      <div className="flex h-full items-center justify-between">
        {/* Left: Brand / Section indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('landing')}
            className="group flex items-center gap-2 text-left focus:outline-none"
            title="Go to Landing Page"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-transform group-hover:scale-105">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-purple-600"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-slate-800">
                HerWell
              </span>
            </div>
          </button>

          <div className="hidden h-5 w-px bg-slate-300 sm:block mx-1" />

          {/* Quick Context Pill */}
          <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Today: Tuesday, Sept 29</span>
            <span>·</span>
            <span className="text-purple-700 font-medium">Cycle Day 14 (Ovulatory)</span>
          </div>
        </div>

        {/* Right Zone: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Landing / Dashboard Mode Toggle */}
          {currentTab === 'landing' ? (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50/70 px-3 py-1.5 text-xs font-semibold text-purple-800 hover:bg-purple-100 transition-colors"
            >
              <span>Go to App Dashboard</span>
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentTab('landing')}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Landing Page</span>
            </button>
          )}

          {/* Daily Check-in CTA Button */}
          <button
            onClick={() => setIsCheckInModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-800 active:scale-95 transition-all"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="whitespace-nowrap">Daily Check-in</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">Supportive Nudges</span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] text-purple-700 font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => notifications.forEach((n) => markNotificationAsRead(n.id))}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="mt-2 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`cursor-pointer rounded-xl p-2.5 transition-colors ${
                        n.read ? 'bg-slate-50/60' : 'bg-purple-50/50 border border-purple-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl p-1 hover:bg-white/80 transition-colors"
            >
              <img
                src={userAvatarImg}
                alt={profile.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-purple-200"
                referrerPolicy="no-referrer"
              />
              <span className="hidden text-xs font-semibold text-slate-800 md:inline-block">
                {profile.name.split(' ')[0]}
              </span>
              <ChevronDown className="hidden h-3 w-3 text-slate-400 md:inline-block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">{profile.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentTab('profile');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <User className="h-3.5 w-3.5 text-slate-500" />
                    <span>My Profile & Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('reports');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>Monthly Health Reports</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('landing');
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                    <span>Landing Page Tour</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] text-emerald-700 font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Private & On-Device Storage</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

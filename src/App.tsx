import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { CycleTrackerView } from './components/cycle/CycleTrackerView';
import { PcosWellnessView } from './components/pcos/PcosWellnessView';
import { MentalWellnessView } from './components/mental/MentalWellnessView';
import { FitnessWeightView } from './components/fitness/FitnessWeightView';
import { NutritionView } from './components/nutrition/NutritionView';
import { InsightsView } from './components/insights/InsightsView';
import { ReportsView } from './components/reports/ReportsView';
import { ProfileView } from './components/profile/ProfileView';
import { DailyCheckInModal } from './components/checkin/DailyCheckInModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

const MainAppContent: React.FC = () => {
  const { currentTab } = useApp();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardView />;
      case 'cycle':
        return <CycleTrackerView />;
      case 'my-health':
        return <PcosWellnessView />;
      case 'wellness':
        return <MentalWellnessView />;
      case 'nutrition':
        return <NutritionView />;
      case 'activity':
        return <FitnessWeightView />;
      case 'insights':
        return <InsightsView />;
      case 'reports':
        return <ReportsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  if (currentTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        <TopBar />
        <LandingPage />
        <DailyCheckInModal />
        <OnboardingModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col selection:bg-purple-100 selection:text-purple-900">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar on desktop */}
        <Sidebar />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 mb-16 md:mb-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <DailyCheckInModal />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

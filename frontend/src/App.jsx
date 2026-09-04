import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SideDrawer } from './components/navigation/SideDrawer';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { PlaceDetailScreen } from './components/screens/PlaceDetailScreen';
import { RouteNavigationScreen } from './components/screens/RouteNavigationScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { NewBookingModal } from './components/modals/NewBookingModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { FilterModal } from './components/modals/FilterModal';
import { QuickEmergencyModal } from './components/common/QuickEmergencyModal';
import { Smartphone, Monitor } from 'lucide-react';

function AppContent() {
  const { 
    currentScreen, 
    isMobileFrame, 
    setIsMobileFrame, 
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen 
  } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'place-detail':
        return <PlaceDetailScreen />;
      case 'route-map':
        return <RouteNavigationScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'bookings':
        return <BookingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <OnboardingScreen />;
    }
  };

  const showBottomNav = currentScreen !== 'onboarding' && currentScreen !== 'auth';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Top Device View Toggle Bar */}
      <div className="fixed top-2 right-2 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs shadow-xl hidden sm:flex">
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
            isMobileFrame ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Prototipo Móvil"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Móvil</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
            !isMobileFrame ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Pantalla Completa"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Expandida</span>
        </button>
      </div>

      {/* Main Container Wrapper */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-md my-4 sm:my-6 rounded-[36px] border-4 border-slate-800 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden bg-slate-950 relative min-h-[840px] flex flex-col justify-between'
          : 'max-w-3xl min-h-screen flex flex-col justify-between'
      }`}>
        {/* Dynamic Screen Content */}
        <div className="flex-grow flex flex-col">
          {renderActiveScreen()}
        </div>

        {/* Bottom Navigation Bar (Hidden on Onboarding & Auth) */}
        {showBottomNav && <BottomNavBar />}
      </div>

      {/* Side Drawer & Global Modals */}
      <SideDrawer />
      <NewBookingModal />
      <EditProfileModal />
      <NotificationModal />
      <FilterModal />
      <QuickEmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

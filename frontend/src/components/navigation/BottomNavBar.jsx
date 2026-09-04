import React from 'react';
import { Home, Compass, Heart, User, CalendarDays } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BottomNavBar() {
  const { currentScreen, navigateTo, favoriteIds } = useApp();

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'bookings', label: 'Reservas', icon: CalendarDays },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoriteIds.length },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  // Don't render on onboarding or auth screen
  if (currentScreen === 'onboarding') return null;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 w-full bg-slate-950/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'explore' && (currentScreen === 'place-detail' || currentScreen === 'route-map'));

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] animate-pulse-subtle' : 'stroke-[1.75px]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5 shadow-sm shadow-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

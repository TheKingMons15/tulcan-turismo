import React from 'react';
import { Menu, CalendarDays, Heart, User, Settings, LogOut, ChevronRight, ShieldAlert, Sparkles, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProfileScreen() {
  const { 
    user, 
    setUser, 
    navigateTo, 
    setIsSideDrawerOpen, 
    setIsEditProfileModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const handleLogout = () => {
    setUser({
      name: 'Invitado',
      email: '',
      isAuthenticated: false
    });
    navigateTo('onboarding');
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Header: Menu icon + "Mi perfil" (Screen 9 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Mi perfil
          </h2>
        </div>
      </div>

      {/* User Card: Avatar, Name (Yohana), Email (Screen 9 Card) */}
      <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center gap-4 shadow-xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/40 shadow-lg shrink-0"
        />
        <div className="flex-grow min-w-0">
          <h3 className="text-base font-extrabold text-white truncate">{user.name}</h3>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 mt-1.5">
            Explorador Carchense
          </span>
        </div>
      </div>

      {/* Menu Options List with Chevrons (Screen 9 Menu List) */}
      <div className="flex flex-col gap-2">
        {/* Mis reservas */}
        <button
          onClick={() => navigateTo('bookings')}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <CalendarDays className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis reservas</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Mis favoritos */}
        <button
          onClick={() => navigateTo('favorites')}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis favoritos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Mis datos */}
        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis datos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Configuración */}
        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Settings className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Configuración</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-rose-500/40 hover:bg-rose-950/20 transition group text-rose-400 mt-2"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm">Cerrar sesión</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 transition" />
        </button>
      </div>
    </div>
  );
}

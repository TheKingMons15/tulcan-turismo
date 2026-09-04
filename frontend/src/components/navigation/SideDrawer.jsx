import React from 'react';
import { X, Home, Compass, CalendarDays, Heart, MessageSquare, Settings, HelpCircle, LogOut, ShieldAlert, Sparkles, ChevronRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SideDrawer() {
  const { 
    isSideDrawerOpen, 
    setIsSideDrawerOpen, 
    navigateTo, 
    user, 
    setUser,
    setIsAuthModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  if (!isSideDrawerOpen) return null;

  const handleLinkClick = (screen) => {
    setIsSideDrawerOpen(false);
    if (screen === 'emergency') {
      setIsEmergencyModalOpen(true);
      return;
    }
    navigateTo(screen);
  };

  const handleLogout = () => {
    setUser({
      name: 'Invitado',
      email: '',
      isAuthenticated: false
    });
    setIsSideDrawerOpen(false);
    navigateTo('onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in bg-black/75 backdrop-blur-sm">
      {/* Drawer Container (Slide from left) */}
      <div className="relative w-full max-w-xs h-full bg-slate-950/95 border-r border-white/10 text-slate-100 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-sm">
                  TC
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-tight">TURISMO CONECTA</h3>
                <p className="text-[10px] text-emerald-400 font-medium">Tulcán, Carchi</p>
              </div>
            </div>

            <button
              onClick={() => setIsSideDrawerOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card in Drawer */}
          {user.isAuthenticated ? (
            <div 
              onClick={() => handleLinkClick('profile')}
              className="my-5 p-3.5 rounded-2xl glass-panel-subtle border border-white/10 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition">{user.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{user.email}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
            </div>
          ) : (
            <div className="my-5 p-4 rounded-2xl glass-panel-subtle border border-white/10 flex flex-col gap-2">
              <p className="text-xs text-slate-300 font-semibold">¿Tienes cuenta?</p>
              <button
                onClick={() => {
                  setIsSideDrawerOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Iniciar sesión / Registrarse
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5 mt-2">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleLinkClick('explore')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explorar</span>
            </button>

            <button
              onClick={() => handleLinkClick('bookings')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <CalendarDays className="w-4 h-4 text-amber-400" />
              <span>Mis reservas</span>
            </button>

            <button
              onClick={() => handleLinkClick('favorites')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Favoritos</span>
            </button>

            <button
              onClick={() => handleLinkClick('profile')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>Mi Perfil & Datos</span>
            </button>

            <button
              onClick={() => handleLinkClick('emergency')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Ayuda & Emergencias (ECU 911)</span>
            </button>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          {user.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          )}
          <p className="text-[10px] text-slate-500 px-3">
            Turismo Conecta Tulcán v1.2 • Carchi, Ecuador
          </p>
        </div>
      </div>

      {/* Dimmed backdrop area that closes drawer on click */}
      <div 
        onClick={() => setIsSideDrawerOpen(false)}
        className="flex-grow cursor-pointer"
      />
    </div>
  );
}

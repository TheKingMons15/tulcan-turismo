import React, { useState } from 'react';
import { Compass, MapPin, Heart, ShieldAlert, Route, Search, Menu, X, Sparkles, Navigation } from 'lucide-react';

export function Navbar({ 
  onOpenSearch, 
  onOpenFavorites, 
  favoritesCount = 0,
  onOpenEmergency,
  onNavigateToSection,
  activeSection,
  onOpenRouteBuilder,
  userLocation,
  onRequestLocation,
  isLocating
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'mapa', label: 'Mapa Interactivo' },
    { id: 'lugares', label: 'Explorar Lugares' },
    { id: 'rutas', label: 'Rutas Turísticas' },
    { id: 'servicios', label: 'Servicios & Salud' },
  ];

  const handleNavClick = (id) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto rounded-2xl glass-panel border border-white/10 px-4 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-2xl">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
              <Compass className="w-6 h-6 text-emerald-400 animate-spin-slow group-hover:rotate-45 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-lg font-space">TULCÁN</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">CARCHI</span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">Centinela del Norte • 2.980 m</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* GPS Location Button */}
          <button
            onClick={onRequestLocation}
            title={userLocation ? "Ubicación GPS activa" : "Activar mi ubicación"}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
              userLocation 
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40 shadow-sm shadow-sky-500/20' 
                : 'glass-panel-subtle text-slate-300 hover:text-white hover:border-emerald-500/40'
            }`}
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin text-sky-400' : ''}`} />
            <span className="hidden xl:inline">{userLocation ? 'GPS Activo' : 'Cerca de mí'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl glass-panel-subtle text-slate-300 hover:text-white hover:border-emerald-500/40 transition flex items-center gap-2 text-xs"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline text-slate-400">Buscar...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-white/10 text-slate-400">Ctrl+K</kbd>
          </button>

          {/* Route Builder Trigger */}
          <button
            onClick={onOpenRouteBuilder}
            className="p-2 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition flex items-center gap-1.5 text-xs font-medium"
          >
            <Route className="w-4 h-4" />
            <span className="hidden sm:inline">Armar Ruta</span>
          </button>

          {/* Favorites Drawer Trigger */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl glass-panel-subtle text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition"
            title="Mis lugares guardados"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-lg animate-bounce">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Emergency Hotline Button */}
          <button
            onClick={onOpenEmergency}
            className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white transition shadow-sm"
            title="Emergencias y Salud"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel-subtle text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col gap-2 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                activeSection === item.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

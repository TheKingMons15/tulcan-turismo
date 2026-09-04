import os

# 1. screens/OnboardingScreen.jsx (PANTALLA 1)
with open("frontend/src/components/screens/OnboardingScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { Menu, Bell, MapPin, Compass, ArrowRight, Sparkles, Mountain } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function OnboardingScreen() {
  const { navigateTo, setIsAuthModalOpen, setAuthMode, setIsSideDrawerOpen, setIsNotificationModalOpen } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Conoce, disfruta y conecta con lo mejor de cada destino",
      subtitle: "Descubre Tulcán: la capital del Carchi a 2.980 m.s.n.m., famosa por su arte en ciprés y gastronomía andina.",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "El Camposanto de Esculturas de Ciprés",
      subtitle: "Patrimonio Cultural del Ecuador con más de 8 hectáreas de figuras talladas de culturas precolombinas.",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Páramo de Frailejones & Aguas Termales",
      subtitle: "Senderos mágicos en la Reserva El Ángel y termales volcánicas medicinales a los pies del Volcán Chiles.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Image with Ambient Glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${slides[activeSlide].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950"></div>
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      {/* Top App Header (Screen 1 header from wireframe) */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <button 
          onClick={() => setIsSideDrawerOpen(true)}
          className="p-3 rounded-2xl glass-panel-subtle text-slate-200 hover:text-white hover:border-emerald-500/40 transition shadow-lg"
          title="Abrir menú lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setIsNotificationModalOpen(true)}
          className="p-3 rounded-2xl glass-panel-subtle text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition shadow-lg relative"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      </div>

      {/* Central Brand Illustration & Tagline */}
      <div className="relative z-10 max-w-sm mx-auto my-auto text-center flex flex-col items-center gap-6">
        {/* Mountain & Location Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-1 shadow-2xl shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950/90 rounded-[22px] flex flex-col items-center justify-center p-3 backdrop-blur-md">
              <Mountain className="w-10 h-10 text-emerald-400" />
              <MapPin className="w-4 h-4 text-white -mt-2 drop-shadow" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white font-space">
            TURISMO<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              CONECTA
            </span>
          </h1>
          <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block mt-1">
            Tulcán • Carchi
          </span>
        </div>

        {/* Dynamic Tagline */}
        <div className="px-4 min-h-[70px]">
          <p className="text-sm font-medium text-slate-200 leading-relaxed drop-shadow">
            {slides[activeSlide].title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {slides[activeSlide].subtitle}
          </p>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx 
                  ? 'w-6 bg-emerald-400 shadow-sm shadow-emerald-400' 
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 max-w-sm mx-auto w-full flex flex-col gap-3 pb-6">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Explorar</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setAuthMode('login');
            setIsAuthModalOpen(true);
          }}
          className="w-full py-3 text-center text-xs font-semibold text-slate-300 hover:text-emerald-400 transition"
        >
          ¿Ya tienes cuenta? <span className="underline">Iniciar sesión</span>
        </button>
      </div>
    </div>
  );
}
''')

# 2. screens/AuthModal.jsx (PANTALLA 2)
with open("frontend/src/components/screens/AuthModal.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setUser, navigateTo } = useApp();
  const [email, setEmail] = useState('maria.lopez@gmail.com');
  const [password, setPassword] = useState('tulcan2026');
  const [name, setName] = useState('María López');
  const [message, setMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: name || 'Viajero',
      email: email || 'usuario@turismo.ec',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      phone: '+593 99 876 5432',
      isAuthenticated: true,
      memberSince: 'Septiembre 2026'
    });
    setMessage(`¡Bienvenido de vuelta, ${name || 'Viajero'}!`);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage('');
      navigateTo('home');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setUser({
      name: 'María López (Google)',
      email: 'maria.lopez@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isAuthenticated: true,
      memberSince: 'Septiembre 2026'
    });
    setMessage('Autenticado con Google con éxito');
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage('');
      navigateTo('home');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950/95 text-slate-100 p-6 sm:p-8 shadow-2xl my-auto">
        {/* Back Arrow */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 left-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Profile Avatar Icon (Wireframe element) */}
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-emerald-500/40 flex items-center justify-center shadow-xl shadow-emerald-500/10 mb-3">
            <User className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {authMode === 'login' ? 'Iniciar sesión' : 'Crear tu cuenta'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Accede a tus reservas y favoritos en Tulcán</p>
        </div>

        {/* Tabs: Iniciar sesión | Registrarse */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'register'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {authMode === 'register' && (
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
              />
            </div>
          )}

          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
            />
          </div>

          {authMode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-[11px] text-emerald-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {message && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-[1.02] transition"
          >
            {authMode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        {/* Separator "o" */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute px-3 bg-slate-950 text-slate-400 text-xs">o</span>
        </div>

        {/* Continuar con Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-white/25 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continuar con Google</span>
        </button>
      </div>
    </div>
  );
}
''')

# 3. screens/HomeScreen.jsx (PANTALLA 3)
with open("frontend/src/components/screens/HomeScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { Menu, Bell, Search, MapPin, Star, Heart, Navigation, ArrowRight, Utensils, Mountain, Church, Bed, Landmark, Trees, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';

export function HomeScreen() {
  const { 
    user, 
    places, 
    navigateTo, 
    setSelectedCategory, 
    setIsSideDrawerOpen, 
    setIsNotificationModalOpen,
    isFavorite,
    toggleFavorite,
    userLocation
  } = useApp();

  const categoryCards = [
    { id: 'turismo', label: 'Atracciones', icon: Landmark, color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-400' },
    { id: 'restaurantes', label: 'Restaurantes', icon: Utensils, color: 'from-orange-500 to-amber-600', iconColor: 'text-orange-400' },
    { id: 'naturaleza', label: 'Actividades', icon: Mountain, color: 'from-cyan-500 to-blue-600', iconColor: 'text-cyan-400' },
    { id: 'hoteles', label: 'Hospedaje', icon: Bed, color: 'from-blue-500 to-indigo-600', iconColor: 'text-blue-400' },
    { id: 'iglesias', label: 'Iglesias & Fe', icon: Church, color: 'from-purple-500 to-pink-600', iconColor: 'text-purple-400' },
  ];

  const recommendedDestinations = [
    {
      id: "dest-tulcan",
      name: "Tulcán",
      tagline: "Centinela del Norte",
      price: "$1.00",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "cementerio-municipal-jose-maria-azael-franco"
    },
    {
      id: "dest-ipiales",
      name: "Ipiales / Rumichaca",
      tagline: "Paso Binacional & Las Lajas",
      price: "$0.00",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "puente-internacional-rumichaca"
    },
    {
      id: "dest-tufino",
      name: "Tufiño (Termas)",
      tagline: "Aguas Hediondas 50°C",
      price: "$2.50",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "complejo-termal-aguas-hediondas"
    },
    {
      id: "dest-el-angel",
      name: "El Ángel",
      tagline: "Bosque de Frailejones",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "reserva-ecologica-el-angel"
    }
  ];

  const popularPlaces = places.slice(0, 5);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('explore');
  };

  const handleDestinationClick = (placeId) => {
    const p = places.find(item => item.id === placeId);
    if (p) {
      navigateTo('place-detail', { place: p });
    } else {
      navigateTo('explore');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100">
      {/* Header Greeting & Notifications (Screen 3 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
              ¡Hola, {user.name ? user.name.split(' ')[0] : 'viajero'}! 👋
            </h2>
            <p className="text-xs text-slate-400">¿A dónde quieres ir hoy?</p>
          </div>
        </div>

        <button
          onClick={() => setIsNotificationModalOpen(true)}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-emerald-400 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      </div>

      {/* Quick Search Bar (Clicks into Explore screen) */}
      <div 
        onClick={() => navigateTo('explore')}
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl glass-input cursor-pointer border border-white/10 hover:border-emerald-500/40 transition shadow-lg shadow-black/20"
      >
        <Search className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-xs sm:text-sm text-slate-400 font-medium truncate">
          Buscar lugares, actividades...
        </span>
      </div>

      {/* Categories Horizontal List (Screen 3 Categories) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Categorías</h3>
          <button onClick={() => navigateTo('explore')} className="text-[11px] text-emerald-400 hover:underline">
            Ver todas
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:scale-105 transition min-w-[76px] shrink-0"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200 text-center line-clamp-1">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinos Recomendados (Screen 3 Destinos) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Destinos recomendados</h3>
          <span className="text-[10px] text-slate-400">Carchi & Frontera</span>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {recommendedDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest.targetPlaceId)}
              className="relative w-44 h-48 rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-emerald-500/40 transition shrink-0 cursor-pointer group shadow-xl"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Price badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-emerald-300">
                {dest.price}
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition truncate">
                  {dest.name}
                </h4>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">{dest.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atractivos Populares */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lugares Populares</h3>
          <button onClick={() => navigateTo('explore')} className="text-[11px] text-emerald-400 hover:underline">
            Explorar mapa
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {popularPlaces.map((place) => {
            const dist = userLocation
              ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
              : null;

            return (
              <div
                key={place.id}
                onClick={() => navigateTo('place-detail', { place })}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-lg"
              >
                <img
                  src={place.images && place.images[0]}
                  alt={place.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition truncate">
                    {place.shortName || place.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block truncate">{place.categoryLabel}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                    {dist !== null && (
                      <span className="text-[10px] text-sky-400 font-medium">
                        • {formatDistance(dist)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place.id);
                  }}
                  className="p-2 rounded-xl glass-panel-subtle text-slate-400 hover:text-rose-400 transition shrink-0"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(place.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
''')

# 4. screens/ExploreScreen.jsx (PANTALLA 4)
with open("frontend/src/components/screens/ExploreScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Star, Heart, MapPin, Layers, Map as MapIcon, ListFilter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';
import { InteractiveMap } from '../map/InteractiveMap';

export function ExploreScreen() {
  const { 
    places, 
    navigateTo, 
    goBack,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filterChip,
    setFilterChip,
    isFavorite,
    toggleFavorite,
    userLocation,
    setIsFilterModalOpen
  } = useApp();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [activePlace, setActivePlace] = useState(null);

  const chips = [
    { id: 'todos', label: 'Todos' },
    { id: 'precio', label: 'Precio' },
    { id: 'distancia', label: 'Distancia' },
    { id: 'popular', label: 'Popular' },
  ];

  // Filtering & Sorting logic
  const filteredPlaces = useMemo(() => {
    let list = [...places];

    if (selectedCategory && selectedCategory !== 'todos') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort by chip
    if (filterChip === 'popular') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filterChip === 'distancia' && userLocation) {
      list.sort((a, b) => {
        const dA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) || 999;
        const dB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) || 999;
        return dA - dB;
      });
    } else if (filterChip === 'precio') {
      list.sort((a, b) => (a.price || '').localeCompare(b.price || ''));
    }

    return list;
  }, [places, selectedCategory, searchQuery, filterChip, userLocation]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Top Search & Filter Bar (Screen 4 Header) */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={goBack}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          title="Regresar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative flex-grow flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full py-2.5 pl-10 pr-3 rounded-2xl glass-input text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Filter Dialog Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40"
          title="Opciones de filtro"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips row (Screen 4 Chips) */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilterChip(chip.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterChip === chip.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'glass-panel-subtle text-slate-300 hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* View mode toggle button */}
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="p-1.5 rounded-xl glass-panel-subtle border border-white/10 text-emerald-400 hover:bg-white/10 transition shrink-0"
          title={viewMode === 'list' ? "Ver en Mapa" : "Ver en Lista"}
        >
          {viewMode === 'list' ? <MapIcon className="w-4 h-4" /> : <ListFilter className="w-4 h-4" />}
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>{filteredPlaces.length} lugares encontrados en Tulcán</span>
        {selectedCategory !== 'todos' && (
          <button 
            onClick={() => setSelectedCategory('todos')} 
            className="text-emerald-400 hover:underline"
          >
            Limpiar categoría ({selectedCategory})
          </button>
        )}
      </div>

      {/* Map View */}
      {viewMode === 'map' ? (
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[480px]">
          <InteractiveMap
            places={filteredPlaces}
            activePlace={activePlace}
            onSelectPlace={(place) => setActivePlace(place)}
            onShowDetails={(place) => navigateTo('place-detail', { place })}
            userLocation={userLocation}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      ) : (
        /* List View (Screen 4 Cards from wireframe) */
        <div className="flex flex-col gap-3.5">
          {filteredPlaces.length === 0 ? (
            <div className="p-8 text-center rounded-3xl glass-panel border border-white/10 my-4 text-slate-400 text-xs">
              No se encontraron lugares para esta búsqueda.
            </div>
          ) : (
            filteredPlaces.map((place) => {
              const dist = userLocation
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
                : null;

              return (
                <div
                  key={place.id}
                  onClick={() => navigateTo('place-detail', { place })}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-xl"
                >
                  <img
                    src={place.images && place.images[0]}
                    alt={place.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition"
                  />
                  
                  <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition truncate">
                        {place.shortName || place.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 block truncate">{place.categoryLabel}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{place.rating}</span>
                      </div>

                      {dist !== null && (
                        <span className="text-[11px] font-medium text-slate-300 bg-slate-900 px-2 py-0.5 rounded-lg">
                          {formatDistance(dist)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(place.id);
                    }}
                    className="p-2.5 rounded-2xl glass-panel-subtle text-slate-400 hover:text-rose-400 transition shrink-0"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(place.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
''')

print("Screens 1, 2, 3, 4 generated successfully.")
